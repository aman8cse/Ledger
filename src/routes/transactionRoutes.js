import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createTransaction } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", authMiddleware, createTransaction);

export default router;