import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email required for creating a User"],
        unique: [true, "Email already exists"],
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"]
    },
    name: {
        type: String,
        required: [true, "Name required to create a new account"]
    },
    password: {
        type: String,
        required: [true, "Password required to create a new account"],
        minlength: [6, "Password should contain 6 or more character"],
        select: false
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const userModel = mongoose.model("User", userSchema);

export { userModel }