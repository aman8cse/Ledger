import { accountModel } from "../models/accountModel.js";
import transactionModel from "../models/transactionModel.js"


async function createTransaction() {
    try {
        const { fromAccount, toAccount, amount, idempotencyKey } = req.body;

        if(!fromAccount || !toAccount || !amount || !idempotencyKey) {
            return res.status(401).json({
                message: "Either of fromAccount, toAccount, amount, idempotencyKey is missing"
            })
        }

        const fromUserAccount = await accountModel.findOne({ _id: fromAccount });
        const toUserAccount = await accountModel.findOne({ _id: toAccount });

        if(!fromUserAccount || !toUserAccount) {
            return res.status(401).json({
                message: "Either of fromAccount or toAccount doesn't exist"
            })
        }

        if(!fromUserAccount.status === 'ACTIVE' || !toUserAccount.status === "ACTIVE") {
            return res.status(401).json({
                message: "Either of fromAccount or toAccount isn't ACTIVE"
            })
        }

        const existingTransaction = await transactionModel.findOne({idempotencyKey: idempotencyKey});

        if(existingTransaction) {
            if(existingTransaction.status === "COMPLETED") {
                return res.status(200).json({
                    message: "Transaction is already processed",
                    transaction: existingTransaction
                })
            }

            if(existingTransaction.status === "PENDING") {
                return res.status(200).json({
                    message: "Transaction is still in process"
                })
            }

            if(existingTransaction.status === "FAILED") {
                return res.status(500).json({
                    message: "Transaction is failed, please retry"
                })
            }

            if(existingTransaction.status === "REVERSED") {
                return res.status(500).json({
                    message: "Transaction was reversed to your account, retry"
                })
            }
        }



    } catch(err) {
        res.status(409).json({
            message: err.message
        })
    }
}

export { createTransaction }