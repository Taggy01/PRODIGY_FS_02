import express from "express";
import { getMe, login, logout } from "../Controllers/auth.controller.js";
import protectRoute from "../Middlewares/ProtectRoute.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", protectRoute, logout);
router.get("/me", protectRoute, getMe);

export default router;