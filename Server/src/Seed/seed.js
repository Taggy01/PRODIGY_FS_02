import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./Models/user.js"; // Adjust the path if needed

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);

        console.log("MongoDB Connected");

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
            name: AdminName.trim(),
            email: AdminEmail.trim().toLowerCase(),
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin created successfully.");
        console.log(admin);

        await mongoose.connection.close();
        process.exit(0);

    } catch (error) {
        console.error("Seed Error:", error);
        await mongoose.connection.close();
        process.exit(1);
    }
};

seedAdmin();