import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../Utils/api";

export default function PublicRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        api.get("/auth/me")
            .then((res) => setUser(res.data.user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return user ? <Navigate to="/" replace /> : children;
}