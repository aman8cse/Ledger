import express from "express";
import { authMiddleware, superAuthMiddleware } from '../middleware/authMiddleware.js'
import { createTransaction } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", authMiddleware, createTransaction);
router.post("/initialFunding", superAuthMiddleware, createTransaction)

export default router;