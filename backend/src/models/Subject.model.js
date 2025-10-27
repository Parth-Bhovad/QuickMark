import mongoose from "mongoose";
import {Schema} from "mongoose";

const subjectSchema = new Schema({
    subjectName:{
        type: String,
        required: true,
        unique: true
    },
    teacherId:{
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        default: null
    }
});

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;