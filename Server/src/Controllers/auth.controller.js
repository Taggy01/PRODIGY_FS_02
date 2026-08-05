import User from '../Models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();


const generateToken = (userid, res) => {
    const jwtToken = process.env.JWTTOKEN;

    if (!jwtToken) throw new Error("jwtToken is Missing.");

    const token = jwt.sign({ userid }, jwtToken, { expiresIn: "1d" });
    const ONE_DAY = 1 * 24 * 60 * 60 * 1000;

    res.cookie('token', token, {
        maxAge: ONE_DAY,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: '/'
    })
}

export const getMe = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (error) {
        console.error("Get Me Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error in Get Me Controller"
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({
            success: false,
            message: "All Fields are Required"
        });

        const normalizedEmail = email.trim().toLowerCase();

        const requiredUser = await User.findOne({ email: normalizedEmail }).select('+password');
        if (!requiredUser) return res.status(400).json({
            success: false,
            message: "Invalid Credentials"
        });

        const isPasswordCorrect = await bcrypt.compare(password, requiredUser.password);
        if (!isPasswordCorrect) return res.status(400).json({
            success: false,
            message: "Invalid Credentials"
        });

        generateToken(requiredUser._id, res);

        const { password: _, ...savedUser } = requiredUser.toObject();

        return res.status(200).json({
            success: true,
            message: "Logged in Successfully",
            user: savedUser
        });

    } catch (error) {
        console.error("Login Error", error);
        return res.status(500).json({
            success: false,
            message: "Error in Login Controller"
        });
    }
}

export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: '/'
    });

    return res.status(200).json({
        success: true,
        message: "Logged out Successfully."
    });
};