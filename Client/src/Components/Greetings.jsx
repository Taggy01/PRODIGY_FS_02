import { motion } from "framer-motion";
export function Greetings({ onStart }) {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hero min-h-screen bg-linear-to-t from-primary/10 to-primary/50">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-lg">
                    <h1 className="mb-5 text-5xl font-bold">Welcome to Employee Management System</h1>
                    <p className="mb-5">This is a simple employee management system that allows you to manage your employees easily.</p>
                    <button className="btn btn-soft btn-primary" onClick={onStart}>Get Started</button>
                </div>
            </div>
        </motion.div>
    );
}