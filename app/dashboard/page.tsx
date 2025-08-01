'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '@/utils/storage';
import styles from './Dashboard.module.scss';

export default function DashboardPage() {
    const router = useRouter();
    const user = getUser();

    useEffect(() => {
        if (!user) {
            router.push('/auth');
        }
    }, [user, router]);

    if (!user) {
        return null;
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Welcome to the Dashboard, {user.name.first} {user.name.last}!
            </h1>
        </div>
    );
}