import mongoose from "mongoose";

const LedgerSchema = new mongoose.Schema({
    Account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: [true, "Ledger must have a origin account"],
        index: true,
        immutable: true
    },
    amount: {
        type: Number,
        required: [true, "Amount required to initiate Ledger"],
        immutable: true
    },
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
        required: [true, "Ledger must have a transaction"],
        index: true,
        immutable: true
    },
    type: {
        type: String,
        enum: {
            values: ["CREDIT", "DEBIT"],
            message: "Ledger type should be either DEBIT or CREDIT"
        },
        required: true,
        immutable: true
    }
}, {
    timestamps: true
})

function preventLedgerModification() {
    throw new Error("Ledger entries are immutable and can't be DELETED or MODIFIED");
}

LedgerSchema.pre('findOneAndDelete', preventLedgerModification);
LedgerSchema.pre('findOneAndUpdate', preventLedgerModification);
LedgerSchema.pre('updateOne', preventLedgerModification);
LedgerSchema.pre('updateMany', preventLedgerModification);
LedgerSchema.pre('deleteOne', preventLedgerModification);
LedgerSchema.pre('deleteMany', preventLedgerModification);
LedgerSchema.pre('remove', preventLedgerModification);
LedgerSchema.pre('findOneAndReplace', preventLedgerModification);

const LedgerModel = mongoose.model("Ledger", LedgerSchema);

export { LedgerModel }