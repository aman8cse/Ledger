import mongoose from "mongoose";

function connectDB() {
    mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => {
        console.log("Server connected to DB");
    })
    .catch(err => {
        console.log("Err connecting to DB");
        process.exit(1);
    })
}

export {connectDB};