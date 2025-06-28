import { findUserByEmail } from '../dao/user.dao.js';
import jwt from 'jsonwebtoken';

export const signJWT = (userId) => {
    // Generate JWT token
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
    return token;
}

export const checkExistingUser = async (studentEmail) => {
    // Check if user already exists
    const existingUser = await findUserByEmail(studentEmail);
    if (existingUser) {
        throw new Error("User already exists");
    }
}
