import mongoose from "mongoose";
import {Schema} from "mongoose";

const teacherSchema = new Schema({
    teacherName: {
        type: String,
        required: true,
        match: [/^[A-Za-z ]+$/, 'Name can only contain alphabets and spaces'],
        unique: true
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