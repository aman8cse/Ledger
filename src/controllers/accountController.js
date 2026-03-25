import { accountModel } from "../models/accountModel.js";

async function createAccount (req, res) {
    try {
        const user = req.user;
        if(!user) {
            return res.status(401).json({message: "User is missing"})
        }

        const account = await accountModel.create({
            user: user.Id
        })

        res.status(201).json({
            account
        })
        console.log(account)

    } catch(err) {
        return res.status(409).json({
            message: err.message
        })
    }
}

export {createAccount }