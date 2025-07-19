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
        default: Date.now,
        type: Date,
        required: true
    },
    subjectId: {
        default: [],
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
    studentId: {
        default: [],
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;