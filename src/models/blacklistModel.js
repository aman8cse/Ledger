import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required to blacklist"],
        unique: [true, "Token already blacklisted"]
    },
}, {
    timestamps: true
})

blacklistSchema.index({ createdAt   : 1}, {
    expireAfterSeconds: 60 * 60 * 24 * 3
})

const blacklistModel = mongoose.model("Blacklist", blacklistSchema);

export { blacklistModel }