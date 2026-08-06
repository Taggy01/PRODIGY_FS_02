import api from "../Utils/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const respond = await api.post("/auth/login", {
                email,
                password
            });

            console.log(respond);
            toast.success("Login successful!");
            navigate("/", { replace: true });
        } catch (error) {
            console.log(error);
            console.log(error.response?.data);
            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    }

    return (
        <div className="flex justify-center items-center">
            <div className="flex-1 md:flex flex-col justify-center min-h-screen bg-base-300 w-1/2 p-8 hidden">
                <h1 className="text-2xl font-bold text-left">Welcome to</h1>
                <h1 className="text-4xl font-bold text-primary text-left">Employee Management System</h1>
                <p className="text-lg text-base-content/70 text-left">A simple and efficient solution for managing your employees.</p>

            </div>
            <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-linear-to-t from-base-300 to-base-200">
                <div className="w-full max-w-md p-10 rounded-2xl border border-base-content/20 bg-base-100">
                    <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">Email</label>
                            <input type="email" id="email" className="input w-full mt-1.5 focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium">Password</label>
                            <input type="password" id="password" className="input w-full mt-1.5 focus:outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="w-full btn btn-soft btn-primary rounded-2xl mt-5">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}