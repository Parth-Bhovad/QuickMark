import mongoose from 'mongoose';
import dotenv from "dotenv"
dotenv.config();

const mongoUri = process.env.MONGO_URI;
const connectDB = () => {
    mongoose.connect(mongoUri)
        .then(() => console.log("MongoDB connected"))
        .catch((error) => console.error("Unable to connect :", error));
}

export default connectDB;