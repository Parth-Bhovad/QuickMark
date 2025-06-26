import mongoose from 'mongoose';
import Schema from 'mongoose';

const userSchema = new Schema({
    rollNo: {
        type: Number,
        required: true,
        unique: true
    },
    studentName: {
        type: String,
        required: true,
    },
    subjects: [{
        default: [],
        type: Schema.Types.ObjectId,
        ref: "Subject",
    }],
})

const User = mongoose.model('User', userSchema);
export default User;