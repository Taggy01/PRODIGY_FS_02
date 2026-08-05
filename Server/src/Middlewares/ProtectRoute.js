import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Models/user.js";

dotenv.config();

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const decoded = jwt.verify(token, process.env.JWTTOKEN);

        const user = await User.findById(decoded.userid).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
};

export default protectRoute;