import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";

async function authMiddleware(req, res, next) {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if(!token) {
            return res.status(401).json({
                message: "Unauthorized User"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.userId);
        req.user = {
            Id: user._id
        }

        return next();

    } catch(err) {
        res.status(409).json({
            message: err.message
        })
    }
}

export default authMiddleware