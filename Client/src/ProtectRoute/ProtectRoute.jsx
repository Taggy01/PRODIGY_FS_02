import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../Utils/api';

export default function ProtectRoute({children}) {
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/auth/me')
            .then(()=> setUser(true))
            .catch(()=> setUser(false))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className='flex items-center justify-center bg-base-300'>Loading...</div>;

    return user ? children : <Navigate to="/login" />;
}