import express from "express";
import { login, logout } from "../Controllers/auth.controller.js";
import protectRoute from "../Middlewares/ProtectRoute.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", protectRoute, logout);

export default router;