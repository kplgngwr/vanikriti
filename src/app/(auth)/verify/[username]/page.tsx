'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { verifySchema } from '@/schemas/verifySchema';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { useToast } from '@/components/ui/use-toast';
import { useParams, useRouter } from 'next/navigation';


const Page = () => {

    const router = useRouter();
    const { toast } = useToast();

    const param = useParams<{ username: string }>();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            verifyCode: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        setIsSubmitting(true);

        try {
            const response = await axios.post<ApiResponse>(`/api/auth/verify-code`, {
                username: param.username,
                code: data.verifyCode
            })

            toast({
                title: 'Success',
                description: response.data.message
            })

            router.replace('/sign-in')

        } catch (error) {
            console.log("Error verifying user ", error);
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: "User Verification failed",
                description: axiosError.response?.data.message,
                variant:'destructive'
            })
        } finally{
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-green-700 pt-20">
            <div className="w-full my-10 max-w-md p-8 space-y-8 bg-white rounded-md shadow-md">
                <div className="flex flex-col items-center space-y-4">
                    <img src="https://indian-oil-admin.pages.dev/assets/favicon-9BK-ZSO9.jpeg" alt="VaniKriti Logo" className="w-20 h-20" />
                    <h2 className="text-2xl font-bold text-center">Verify your account</h2>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <FormField
                                name="verifyCode"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>OTP</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="123456"
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
                                ) : 'Verify'}
                            </Button>
                        </div>
                        <div className="flex items-center justify-between">
                            Don{`'`}t recieve code ?
                            <Link href="#" className="text-sm text-blue-600">
                                Resend Code
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Page;
