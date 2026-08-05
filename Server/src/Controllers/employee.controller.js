import Employee from "../Models/employee.js";
import { validate } from "deep-email-validator";
import mongoose from "mongoose";

export const addEmployee = async (req, res) => {
    try {
        const { name, email, phone, gender, department, position, salary, joiningDate } = req.body;


        if (!name || !email || !phone || !gender || !department || !position || salary == null || !joiningDate) return res.status(400).json({
            success: false,
            message: "All Fields are Required."
        });

        const normalizedEmail = email.trim().toLowerCase();
        const normalizedName = name.trim();
        const normalizedDepartment = department.trim();
        const normalizedPosition = position.trim();
        const normalizedPhone = String(phone).trim();
        const normalizedGender = gender.trim().toLowerCase();
        const normalizedDate = String(joiningDate).trim();

        if (!normalizedName || !normalizedDepartment || !normalizedPosition) return res.status(400).json({
            success: false,
            message: "Fields cannot be empty."
        });

        const validateEmail = await validate(normalizedEmail);

        if (!validateEmail.valid) return res.status(400).json({
            success: false,
            message: "Email is Not Valid",
            reason: validateEmail.reason
        });

        const existingEmail = await Employee.findOne({ email: normalizedEmail });

        if (existingEmail) return res.status(409).json({
            success: false,
            message: "Email Already Exists for Other Employee"
        });

        if (!/^\d{10}$/.test(normalizedPhone)) return res.status(400).json({
            success: false,
            message: "Phone Number Should be of 10 Digits."
        });

        if (isNaN(salary) || salary <= 0) return res.status(400).json({
            success: false,
            message: "Salary Should be in Positive"
        });

        if (isNaN(Date.parse(normalizedDate))) return res.status(400).json({
            success: false,
            message: "Invalid Date"
        });

        if (!["male", "female"].includes(normalizedGender)) return res.status(400).json({
            success: false,
            message: "Invalid Gender"
        });

        const newEmployee = new Employee({
            name: normalizedName,
            email: normalizedEmail,
            phone: normalizedPhone,
            gender: normalizedGender,
            department: normalizedDepartment,
            position: normalizedPosition,
            salary,
            joiningDate: normalizedDate
        })

        await newEmployee.save();

        return res.status(201).json({
            success: true,
            message: "Employee Created Successfully.",
            employee: newEmployee
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already exists."
            });
        }

        console.error("Add Employee Error", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error in Add Employee Controller"
        });
    }
}

export const getEmployee = async (req, res) => {
    try {
        const allEmployees = await Employee.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: allEmployees.length ? "Employees Fetched Successfully." : "No Employees Found.",
            employees: allEmployees
        });

    } catch (error) {
        console.error("Get Employee Error", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error in Get Employee Controller"
        });
    }
}

export const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({
            success: false,
            message: "Invalid Employee ID"
        });

        const employee = await Employee.findById(id);

        if (!employee) return res.status(404).json({
            success: false,
            message: "No Employee Found With This ID"
        });

        return res.status(200).json({
            success: true,
            message: "Employee Fetched Successfully.",
            employee
        });

    } catch (error) {
        console.error("Get Employee by Id Error", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error in Get Employee by Id Controller"
        });
    }
}