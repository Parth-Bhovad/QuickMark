//importing models
import User from '../models/user.model.js';

export const createUser = async (studentName, rollNo, studentEmail, password) => {
    const newUser = new User({ studentName, rollNo, studentEmail, password });
    await newUser.save();
    return newUser;
}

export const findUserByEmail = async (studentEmail) => {
    const user = await User.findOne({ studentEmail });
    return user;
}