import User from '../Models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();


const generateToken = (userid, res) => {
    const jwtToken = process.env.JWTTOKEN; 
    
    if(!jwtToken) throw new Error("jwtToken is Missing.");

    const token = jwt.sign({userid}, jwtToken, {expiresIn: "1d"});

    res.cookie('token',token,{
        maxAge: 1*24*60*60*1000,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    })
}


export const login = async(req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) return res.status(400).json({message:"All Fields are Required"});

        const requiredUser = await User.findOne({email}).select('+password');
        if(!requiredUser) return res.status(400).json({message:"Invaild Credentials"});

        const isPasswordCorrect = await bcrypt.compare(password, requiredUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid Credentials"});

        generateToken(requiredUser._id,res);

        const {password: _, ...savedUser} = requiredUser.toObject();

        return res.status(200).json({
            message:"Successfully Login",
            user: savedUser
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error in Login Controller"});
    }
}