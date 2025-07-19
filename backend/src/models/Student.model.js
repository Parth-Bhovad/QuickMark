import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema({
    rollNo: {
        type: Number,
        required: true,
        min: 10000,
        max: 99999,
        unique: true,
    },
    studentName: {
        type: String,
        required: true,
        match: [/^[A-Za-z ]+$/, 'Name can only contain alphabets and spaces'],
        unique: true
    },
    studentEmail: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/ // Basic email validation
    },
    studentPassword: {
        type: String,
        required: true,
        minlength: 6 // Minimum length for password
    },
    subjects: [{
        default: [],
        type: Schema.Types.ObjectId,
        ref: "Subject",
        unique: true
    }],
})

const User = mongoose.model('User', userSchema);
export default User;