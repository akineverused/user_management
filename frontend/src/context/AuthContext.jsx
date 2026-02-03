import { createContext, useContext, useState } from 'react';
import {useNavigate} from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem('userId'));
    const navigate = useNavigate();

    const login = (userId) => {
        localStorage.setItem('userId', userId);
        setIsAuth(true);
        navigate("/users")
    };

    const logout = () => {
        localStorage.removeItem('userId');
        setIsAuth(false);
        navigate("/login")
    };

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);