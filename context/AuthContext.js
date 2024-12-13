// context/AuthContext.js
import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const login = (token, userId, email) => {
        setUser({ token, userId, email });
        router.push('/'); // Redirect to homepage or intended page
    };

    const logout = () => {
        setUser(null);
        router.push('/login'); // Redirect to login page
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
