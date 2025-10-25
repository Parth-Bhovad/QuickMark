import mongoose from "mongoose";
import {Schema} from "mongoose";

const attendanceSchema = new Schema({
    isPresent: {
        default: false,
        type: Boolean,
        required: true,
    },
    day: {
        type: String,
        // required: true,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
    date: {
        type: String,
        required: true,
        default: () => {
            const now = new Date();
            return now.toISOString().split("T")[0]; // 'YYYY-MM-DD'
        }
    },
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;