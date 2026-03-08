// src/context/AuthContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

// Mendefinisikan struktur data untuk AuthContext
interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

// Inisialisasi context dengan nilai default undefined
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mendefinisikan tipe properti untuk komponen AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}

// Komponen provider utama untuk mengelola status autentikasi secara global
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // State untuk melacak apakah pengguna memiliki token sesi yang valid di Cookies
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!Cookies.get('token'));

    // Memantau perubahan pada storage (berguna jika user login/logout dari tab browser lain)
    useEffect(() => {
        const handleTokenChange = () => {
            setIsAuthenticated(!!Cookies.get('token'));
        };

        window.addEventListener('storage', handleTokenChange);
        return () => {
            window.removeEventListener('storage', handleTokenChange);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};