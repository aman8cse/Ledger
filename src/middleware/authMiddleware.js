import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { blacklistModel } from "../models/blacklistModel.js";

async function authMiddleware(req, res, next) {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized User"
            })
        }

        const isBlacklisted = await blacklistModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(200).json({
                message: "Invalid token"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.userId);
        req.user = user;

        return next();

    } catch (err) {
        res.status(409).json({
            message: err.message
        })
    }
}

async function superAuthMiddleware(req, res, next) {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized User"
            })
        }

        const isBlacklisted = await blacklistModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(200).json({
                message: "Invalid token"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.userId).select("+superUser");
        if (!user.superUser) {
            return res.status(401).json({
                message: "Not authorized for this route, STEP BACK"
            })
        }

        req.user = user;
        req.user.funding = 1000;

        return next();

    } catch (err) {
        res.status(409).json({
            message: err.message
        })
    }
}

export { authMiddleware, superAuthMiddleware }