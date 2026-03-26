import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createAccount, getAccounts, getAccountBalance } from '../controllers/accountController.js';

const router = express.Router();

router.post("/createNew", authMiddleware, createAccount)
router.get("/accounts", authMiddleware, getAccounts)
router.get("/balance/:accountId", authMiddleware, getAccountBalance)

export default router;