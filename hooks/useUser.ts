import {useEffect, useState} from 'react';
import {getUser} from '@/utils/storage';
import {User} from "@/models";

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = getUser();
        setUser(storedUser);
    }, []);

    return {user};
};