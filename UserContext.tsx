'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

type User = {
    name: {
        first: string;
        last: string;
    };
    email: string;
    picture: {
        thumbnail: string;
    };
};

type UserContextType = {
    user: User | null;
    login: () => Promise<void>;
    logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async () => {
        try {
            const response = await fetch('https://randomuser.me/api/?results=1&nat=us');
            const data = await response.json();
            const userData = data.results[0];
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}