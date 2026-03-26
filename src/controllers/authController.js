import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../services/emailService.js";
import { blacklistModel } from "../models/blacklistModel.js";

async function userRegister(req, res) {
    try {
        const { email, name, password } = req.body;

        const alreadyExists = await userModel.findOne({ email: email })

        if (alreadyExists) {
            return res.status(409).json({
                message: "User already exists with this mail",
                status: "failed"
            })
        }

        const user = await userModel.create({
            email, name, password
        })

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.cookie("token", token);

        res.status(201).json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            },
            token
        });

        await sendMail(email, name);

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err.message
        })
    }
}

async function userLogin(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "Email/password is required"
            })
        }

        const user = await userModel.findOne({ email: email }).select("+password");
        if (!user) {
            return res.status(409).json({
                message: "User not found with this mail"
            })
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(409).json({
                message: "Wrong password"
            })
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token);

        res.status(200).json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            },
            token
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function userLogout(req, res) {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(200).json({
                message: "Already logged out"
            })
        }

        const isBlacklisted = await blacklistModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(200).json({
                message: "Invalid token"
            })
        }

        res.cookie("token", "");

        await blacklistModel.create({
            token: token
        })

        res.status(200).json({
            message: "Logged out successfully"
        })

    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

export { userRegister, userLogin, userLogout }