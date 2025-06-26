import mongoose from "mongoose";
import Schema from "mongoose";

const teacherSchema = new Schema({
    teacherName: {
        type: String,
        required: true,
    },
    subjects: [{
        default: [],
        type: Schema.Types.ObjectId,
        ref: "Subject",
    }],
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;