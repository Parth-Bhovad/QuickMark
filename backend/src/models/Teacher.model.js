import mongoose from "mongoose";
import {Schema} from "mongoose";

const teacherSchema = new Schema({
    teacherName: {
        type: String,
        required: true,
    },
    teacherEmail:{
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/ // Basic email validation
    },
    teacherPassword:{
        type: String,
        required: true,
        minlength: 6 // Minimum length for password
    },
    subjects: [{
        default: [],
        type: Schema.Types.ObjectId,
        ref: "Subject",
    }],
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;