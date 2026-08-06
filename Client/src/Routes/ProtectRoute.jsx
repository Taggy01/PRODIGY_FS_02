import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../Utils/api.js';

export default function ProtectRoute({ children }) {
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/auth/me')
            .then(() => setUser(true))
            .catch(() => setUser(false))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return user ? children : <Navigate to="/login" replace/>;
}