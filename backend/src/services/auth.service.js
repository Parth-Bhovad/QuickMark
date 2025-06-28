import bcrypt from 'bcrypt';
//importing helpers
import { createUser } from '../dao/user.dao.js';
import { signJWT, checkExistingUser } from '../utils/helper.js';

export const registerUserService = async (studentName, rollNo, studentEmail, password) => {
    // Check if user already exists
    await checkExistingUser(studentEmail);

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const newUser = await createUser(studentName, rollNo, studentEmail, password);

    // Generate JWT token
    const token = signJWT(newUser._id);

    return { user: newUser, token };
}