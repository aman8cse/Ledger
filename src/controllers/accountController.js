import { accountModel } from "../models/accountModel.js";

async function createAccount(req, res) {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "User is missing" })
        }

        const account = await accountModel.create({
            user: user._id
        })

        res.status(201).json({
            account
        })

    } catch (err) {
        return res.status(409).json({
            message: err.message
        })
    }
}

async function getAccounts(req, res) {
    try {
        const userId = req.user._id;

        const accounts = await accountModel.find({ user: userId });
        if (accounts.length === 0) {
            return res.status(404).json({
                message: "No accounts found"
            });
        }

        res.status(200).json({
            accounts,
        })

    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

async function getAccountBalance(req, res) {
    try {
        const accountId = req.params.accountId;

        const account = await accountModel.findOne({
            _id: accountId,
            user: req.user._id
        })
        if(!account) {
            return res.status(404).json({
                message: "Account not found for this user"
            })
        }

        const balance = await account.getBalance();

        return res.status(200).json({
            accountId: account._id,
            balance: balance,
            message: "Balance fetched successfully"
        })

    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

export { createAccount, getAccounts, getAccountBalance }