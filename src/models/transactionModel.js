import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    fromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: [true, "Transaction must have a origin account"],
        index: true
    },
    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: [true, "Transaction must have a destination account"],
        index: true
    },
    status: {
        type: String,
        enums: ["PENDING", "COMPLETED", "FAILED", "REVERSED"],
        message: "Transaction status can be either PENDING, COMPLETE, FAILED, or REVERSED",
        default: "PENDING"
    },
    amount: {
        type: Number,
        required: [true, "Amount required to initiate transaction"]
    },
    idempotencyKey: {
        type: String,
        required: [true, "Idempotency key is required for creating a transaction"],
        index: true,
        unique: true
    }
}, {
    timestamps: true
})

const transactionModel = mongoose.model("Transaction", transactionSchema);

export default transactionModel