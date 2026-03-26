import mongoose from "mongoose";
import { accountModel } from "../models/accountModel.js";
import transactionModel from "../models/transactionModel.js"
import { LedgerModel } from "../models/ledgerModel.js";
import { sendTransactionMail, sendTransactionFailureMail } from "../services/emailService.js";


async function createTransaction(req, res) {
    const { fromAccount, toAccount, amount, idempotencyKey } = req.body;

    try {
        if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
            return res.status(401).json({
                message: "Either of fromAccount, toAccount, amount, idempotencyKey is missing"
            })
        }

        const fromUserAccount = await accountModel.findOne({ _id: fromAccount });
        const toUserAccount = await accountModel.findOne({ _id: toAccount });

        if (!fromUserAccount || !toUserAccount) {
            return res.status(401).json({
                message: "Either of fromAccount or toAccount doesn't exist"
            })
        }

        if (fromUserAccount.status !== "ACTIVE" || toUserAccount.status !== "ACTIVE") {
            return res.status(401).json({
                message: "Either of fromAccount or toAccount isn't ACTIVE"
            })
        }

        const existingTransaction = await transactionModel.findOne({ idempotencyKey: idempotencyKey });

        if (existingTransaction) {
            if (existingTransaction.status === "COMPLETED") {
                return res.status(200).json({
                    message: "Transaction is already processed",
                    transaction: existingTransaction
                })
            }

            if (existingTransaction.status === "PENDING") {
                return res.status(200).json({
                    message: "Transaction is still in process"
                })
            }

            if (existingTransaction.status === "FAILED") {
                return res.status(500).json({
                    message: "Transaction is failed, please retry"
                })
            }

            if (existingTransaction.status === "REVERSED") {
                return res.status(500).json({
                    message: "Transaction was reversed to your account, retry"
                })
            }
        }

        const userFromBalance = req.user.funding || await fromUserAccount.getBalance();

        if (amount > userFromBalance) {
            return res.status(401).json({ message: `Insufficient Funds in your account: current balance: ${userFromBalance}` });
        }

        const session = await mongoose.startSession();
        session.startTransaction();
        console.log({ fromAccount, toAccount });

        const [transaction] = await transactionModel.create([{
            fromAccount,
            toAccount,
            amount,
            idempotencyKey,
            status: "PENDING"
        }], { session })

        const [creditLedgerEntry] = await LedgerModel.create([{
            account: toAccount,
            amount: amount,
            transaction: transaction._id,
            type: "CREDIT"
        }], { session })

        const [debitLedgerEntry] = await LedgerModel.create([{
            account: fromAccount,
            amount: amount,
            transaction: transaction._id,
            type: "DEBIT"
        }], { session })

        transaction.status = "COMPLETED";
        await transaction.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            transaction: transaction,
            message: "Transaction successfull"
        })

        await sendTransactionMail(req.user.email, req.user.name, amount, transaction.type, Date.now(), userFromBalance)

    } catch (err) {
        sendTransactionFailureMail(req.user.email, req.user.name, amount, err.message, Date.now(), "https://aman8cse.vercel.app")

        res.status(409).json({
            message: err.message
        })
    }
}

export { createTransaction }