'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { storeUser } from '@/utils/storage';
import styles from './Auth.module.scss';
import {ChangeEvent, useRef} from 'react';
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import {useQuery} from "@tanstack/react-query";
import {getRandomUser} from "@/http/user";

const phoneSchema = z.object({
    phone: z.string()
        .min(11, 'Phone number must be 11 digits')
        .max(11, 'Phone number must be 11 digits')
        .startsWith('09', 'Phone number must start with 09'),
});

type PhoneFormData = z.infer<typeof phoneSchema>;

export default function AuthPage() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        watch, setValue,
        formState: { errors },
    } = useForm<PhoneFormData>({
        resolver: zodResolver(phoneSchema),
    });

    const {
        data: user,
    } = useQuery({
        queryKey: ['random-user'],
        queryFn: () =>getRandomUser(),
        select: (data)=>data?.data?.results?.[0]
    });
    const onSubmit =  () => {
        storeUser(user);
        router.push('/dashboard');
    };

    const { ref: hookFormRef, ...rest } = register('phone');

    const handleManualChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (inputRef.current) {
            inputRef.current.value = e.target.value;
            setValue('phone', e.target.value);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Welcome back!</h1>
                <p className={styles.subtitle}>Enter your phone number to sign in</p>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <Input
                        label="Iranian Mobile Number"
                        placeholder="09123456789"
                        error={errors.phone?.message}
                        {...rest}
                        ref={(e) => {
                            hookFormRef(e);
                            if (e) {
                                inputRef.current = e;
                                e.value = watch('phone') || '';
                            }
                        }}
                        onChange={(e) => {
                            handleManualChange(e);
                            rest.onChange?.(e);
                        }}
                    />
                    <Button type="submit" >
                        Continue
                    </Button>
                </form>
            </div>
        </div>
    );
}