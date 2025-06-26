import mongoose from 'mongoose';

const mongoUri = `mongodb://localhost:27017/QuickMark`;
const connectDB = () => {
    mongoose.connect(mongoUri)
        .then(() => console.log("MongoDB connected"))
        .catch((error) => console.error("Unable to connect :", error));
}

export default connectDB;