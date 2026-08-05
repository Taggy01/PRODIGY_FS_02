import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        match: /^\d{10}$/
    },
    gender: {
        type: String,
        enum: ["male","female"],
        required: true
    },
    department: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    joiningDate: {
        type: Number,
        required: true
    }
},{timestamps:true});

const Employee = mongoose.model("Employee", employeeSchema)