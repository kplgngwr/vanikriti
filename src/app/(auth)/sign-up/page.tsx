'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { signUpSchema } from '@/schemas/signUpSchema';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useDebounceCallback } from 'usehooks-ts'
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';

const Page = () => {

    const [username, setUsername] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const debounced = useDebounceCallback(setUsername, 300);

    const router = useRouter();
    const { toast } = useToast();

    const signUpForm = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: ""
        },
    })

    useEffect(() => {
        const checkUsernameUnique = async () => {
            if (username) {
                setIsCheckingUsername(true);
                setUsernameMessage('');

                try {
                    const response = await axios.get<ApiResponse>(`/api/auth/check-username?username=${username}`)
                    setUsernameMessage(response.data.message);
                } catch (error) {
                    console.log("Error checking username ", error);
                    const axiosError = error as AxiosError<ApiResponse>;
                    setUsernameMessage(axiosError.response?.data.message ?? "Error checking username");
                } finally {
                    setIsCheckingUsername(false);
                }
            }
        }

        checkUsernameUnique();
    }, [username])

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {

        setIsSubmitting(true)
        setIsCheckingUsername(false);

        try {
            const response = await axios.post<ApiResponse>(`/api/auth/sign-up`, data);
            toast({
                title: 'Success',
                description: response.data.message
            })
            router.replace(`/verify/${username}`)
        } catch (error) {
            console.log("Error sign up user ", error);
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: "Sign Up Failed",
                description: axiosError.response?.data.message,
                variant: 'destructive'
            })
        } finally{
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-green-700 pt-20">
            <div className="w-full my-10 max-w-md p-8 space-y-8 bg-white rounded-md shadow-md">
                <div className="flex flex-col items-center space-y-4">
                    <img src="https://indian-oil-admin.pages.dev/assets/favicon-9BK-ZSO9.jpeg" alt="VaniKriti Logo" className="w-20 h-20" />
                    <h2 className="text-2xl font-bold text-center">Create your account</h2>
                    <p className="text-sm text-center text-gray-600">
                        Already have an account?{' '}
                        <Link href="/sign-in" className="text-blue-600">
                            Sign in
                        </Link>
                    </p>
                </div>
                <Form {...signUpForm}>
                    <div>
                        <form onSubmit={signUpForm.handleSubmit(onSubmit)} className="mt-8 space-y-6">
                            <FormField
                                name="name"
                                control={signUpForm.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John Doe"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="username"
                                control={signUpForm.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="any_name"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    debounced(e.target.value)
                                                }}
                                            />
                                        </FormControl>
                                        {isCheckingUsername && <Loader2 className="animate-spin " />}
                                        <p className={`text-sm ${usernameMessage === "Username is available" ? 'text-green-500' : 'text-red-500'}`}>
                                            {username} {usernameMessage}
                                        </p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="email"
                                control={signUpForm.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="example@domain.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="password"
                                control={signUpForm.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="********"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isSubmitting} className='w-full'>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </>
                                ) : 'Sign up'}
                            </Button>
                        </form>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-sm text-gray-600">OR</span>
                    </div>
                    <div>
                        <Button variant="outline" className="w-full">
                            Continue as nursery
                        </Button>
                    </div>
                </Form>
            </div >
        </div >
    )
}

export default Page