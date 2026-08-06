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

        // This is For Real Life Email Validator
        // const validateEmail = await validate(normalizedEmail);

        // if (!validateEmail.valid) return res.status(400).json({
        //     success: false,
        //     message: "Email is Not Valid",
        //     reason: validateEmail.reason
        // });

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            return res.status(400).json({
                message: "Invalid Email",
            });
        }

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

export const UpdateEmployee = async (req, res) => {
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

        const allowedFields = ["name", "email", "phone", "gender", "department", "position", "salary", "joiningDate"];

        const updates = Object.keys(req.body);

        if (updates.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one field to update."
            });
        }

        const isValidOperation = updates.every(field => allowedFields.includes(field));

        if (!isValidOperation) return res.status(400).json({
            success: false,
            message: "Invalid Field Provided."
        });

        // Name
        if (req.body.name !== undefined) {
            const normalizedName = req.body.name.trim();

            if (!normalizedName) return res.status(400).json({
                success: false,
                message: "Name Cannot be Empty"
            });

            employee.name = normalizedName;
        }

        // Email
        if (req.body.email !== undefined) {
            const normalizedEmail = req.body.email.trim().toLowerCase();

            if (!normalizedEmail) {
                return res.status(400).json({
                    success: false,
                    message: "Email cannot be empty."
                });
            }

            const validateEmail = await validate(normalizedEmail);

            if (!validateEmail.valid) {
                return res.status(400).json({
                    success: false,
                    message: "Email is not valid.",
                    reason: validateEmail.reason
                });
            }

            const existingEmployee = await Employee.findOne({
                email: normalizedEmail,
                _id: { $ne: id }
            });

            if (existingEmployee) {
                return res.status(409).json({
                    success: false,
                    message: "Email already exists."
                });
            }

            employee.email = normalizedEmail;
        }

        // Phone
        if (req.body.phone !== undefined) {
            const normalizedPhone = String(req.body.phone).trim();

            if (!normalizedPhone) {
                return res.status(400).json({
                    success: false,
                    message: "Phone cannot be empty."
                });
            }

            if (!/^\d{10}$/.test(normalizedPhone)) {
                return res.status(400).json({
                    success: false,
                    message: "Phone Number should be exactly 10 digits."
                });
            }

            employee.phone = normalizedPhone;
        }

        // Gender
        if (req.body.gender !== undefined) {
            const normalizedGender = req.body.gender.trim().toLowerCase();

            if (!["male", "female"].includes(normalizedGender)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Gender"
                });
            }

            employee.gender = normalizedGender;
        }

        // Department
        if (req.body.department !== undefined) {
            const normalizedDepartment = req.body.department.trim();

            if (!normalizedDepartment) {
                return res.status(400).json({
                    success: false,
                    message: "Department cannot be empty."
                });
            }

            employee.department = normalizedDepartment;
        }

        // Position
        if (req.body.position !== undefined) {
            const normalizedPosition = req.body.position.trim();

            if (!normalizedPosition) {
                return res.status(400).json({
                    success: false,
                    message: "Position cannot be empty."
                });
            }

            employee.position = normalizedPosition;
        }

        // Salary
        if (req.body.salary !== undefined) {
            const salary = Number(req.body.salary);

            if (isNaN(salary) || salary <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Salary should be a positive number."
                });
            }

            employee.salary = salary;
        }

        // Joining Date
        if (req.body.joiningDate !== undefined) {
            const normalizedDate = String(req.body.joiningDate).trim();

            if (isNaN(Date.parse(normalizedDate))) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Joining Date"
                });
            }

            employee.joiningDate = normalizedDate;
        }

        await employee.save();

        return res.status(200).json({
            success: true,
            message: "Employee updated successfully.",
            employee
        });

    } catch (error) {

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already exists."
            });
        }

        console.error("Update Employee Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error in Update Employee Controller"
        });
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Employee ID"
            });
        }

        const employee = await Employee.findByIdAndDelete(id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "No Employee Found With This ID"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Employee deleted successfully.",
            employee
        });

    } catch (error) {
        console.error("Delete Employee Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error in Delete Employee Controller"
        });
    }
};