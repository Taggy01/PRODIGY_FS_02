import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../Models/user.js";
import connectDB from "../Db/db.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        const AdminName = process.env.ADMIN_NAME || "Admin";
        const AdminEmail = process.env.ADMIN_EMAIL || "Admin.ems@ems.com"
        const AdminPassword = process.env.ADMIN_PASSWORD || "ChangePassword@123";

        const existingAdmin = await User.findOne({
            email: AdminEmail.toLowerCase()
        });

        if (existingAdmin) {
            console.log("Admin already exists.");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(AdminPassword, 10);

        const admin = await User.create({
            username: AdminName.trim(),
            email: AdminEmail.trim().toLowerCase(),
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin created successfully.");
        console.log(admin);

    } catch (error) {
        console.error("Seed Error:", error);
    } finally{
        await mongoose.connection.close();
        process.exit(0);
    }
};

seedAdmin();