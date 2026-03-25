import express from "express";
import authRouter from './routes/authRoutes.js';
import accountRouter from './routes/accountRoutes.js';
import transactionRouter from './routes/transactionRoutes.js';
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter);
app.use("/api/account", accountRouter);
app.use("/api/transaction", transactionRouter)

app.post('/', (req, res) => {
    res.json({
        message: "Ledger server is running"
    })
})

export { app }