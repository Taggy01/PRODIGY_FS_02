import express from "express";
import {
    addEmployee,
    getEmployee,
    getEmployeeById,
    UpdateEmployee,
    deleteEmployee
} from "../Controllers/employee.controller.js";

import protectRoute from "../Middlewares/ProtectRoute.js";
import adminOnly from "../Middlewares/adminOnly.js";

const router = express.Router();

router.use(protectRoute);
router.use(adminOnly);

router.post("/", addEmployee);
router.get("/", getEmployee);
router.get("/:id", getEmployeeById);
router.put("/:id", UpdateEmployee);
router.delete("/:id", deleteEmployee);

export default router;