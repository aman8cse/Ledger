import mongoose from "mongoose";
import { LedgerModel } from "./ledgerModel.js";

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Account must be associated with an user"]
    },
    status: {
        type: String,
        enum: {
            values: ["ACTIVE", "FROZEN", "CLOSED"],
            message: "Status can be either ACTIVE, FROZEN or CLOSED",
        },
        default: "ACTIVE"
    },
    currency: {
        type: String,
        required: [true, "Currency is required for creating an Account"],
        default: "INR"
    }
}, {
    timestamps: true
})

accountSchema.index({user: 1, status: 1})

accountSchema.methods.getBalance = async function () {
    const balanceData = await LedgerModel.aggregate([
        { $match: { account: this._id } },
        {
            $group: {
                _id: null,
                totalDebit: {
                    $sum: {
                        $cond: [
                            { $eq: ["$type", "DEBIT"] },
                            "$amount",
                            0
                        ]
                    }
                },
                totalCredit: {
                    $sum: {
                        $cond: [
                            { $eq: ["$type", "CREDIT"] },
                            "$amount",
                            0
                        ]
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                balance: {
                    $subtract: ["$totalCredit", "$totalDebit"]
                }
            }
        }
    ]);

    return balanceData[0]?.balance || 0;
};

const accountModel = mongoose.model("Account", accountSchema);

export { accountModel }