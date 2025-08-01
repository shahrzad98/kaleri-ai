import {User} from "@/models";

const USER_KEY = 'randomUser';

export const storeUser = (user: User) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
};

export const getUser = (): User | null => {
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    }
    return null;
};

export const clearUser = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(USER_KEY);
    }
};