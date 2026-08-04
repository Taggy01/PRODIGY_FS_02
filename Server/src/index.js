import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import AuthRoute from "./Routes/AuthRoute.js";
import EmployeeRoute from "./Routes/EmployeeRoute.js";
import connectDB from "./Db/db.js";


dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  withCredentials: true,
}));
app.use(cookieParser());

app.use("/auth", AuthRoute);
app.use("/employees", EmployeeRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});