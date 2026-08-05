import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        match: /^\d{10}$/
    },
    gender: {
        type: String,
        enum: ["male","female"],
        required: true
    },
    department: {
        type: String,
        required: true,
        trim:true
    },
    position: {
        type: String,
        required: true,
        trim:true
    },
    salary: {
        type: Number,
        required: true,
        min:1
    },
    joiningDate: {
        type: Date,
        required: true
    }
},{timestamps:true});

const Employee = mongoose.model("Employee", employeeSchema)

export default Employee;