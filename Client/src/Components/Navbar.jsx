import { useNavigate } from "react-router-dom";
import api from "../Utils/api.js";
import toast from "react-hot-toast";

export function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            toast.success("Logged out successfully");
            navigate("/login", {replace:true});
        } catch (error) {
            console.log("Logout error:", error);
        }
    };
    return (
        <div className="navbar bg-base-300 absolute top-0 right-0 left-0 z-50 rounded-2xl my-5 mx-15 px-10 w-auto">
            <div className="navbar-start">
                <a className="cursor-pointer font-semibold text-2xl">Employee Management System</a>
            </div>
            <div className="navbar-end">
                <button className="btn btn-error btn-soft rounded-2xl" onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    );
}