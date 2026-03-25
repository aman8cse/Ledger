import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createAccount } from '../controllers/accountController.js';

const router = express.Router();

router.post("/createNew", authMiddleware, createAccount)

export default router;