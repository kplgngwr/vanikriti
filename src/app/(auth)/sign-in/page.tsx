'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { signInSchema } from '@/schemas/signInSchema';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';


const Page = () => {

    const router = useRouter();
    const { toast } = useToast();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: '',
            password: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        setIsSubmitting(true);

        const result = await signIn('credentials', {
            redirect: false,
            identifier: data.identifier,
            password: data.password
        });

        if (result?.error) {
            if (result.error === 'CredentialsSignin') {
                toast({
                    title: 'Login Failed',
                    description: 'Incorrect username or password',
                    variant: 'destructive',
                });
            } else {
                toast({
                    title: 'Error',
                    description: result.error,
                    variant: 'destructive',
                });
            }
        }

        setIsSubmitting(false);

        if (result?.url) {
            router.replace(`/dashboard`)
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-green-700 pt-20">
            <div className="w-full my-10 max-w-md p-8 space-y-8 rounded-md shadow-md bg-white">
                <div className="flex flex-col items-center space-y-4">
                    <img src="https://indian-oil-admin.pages.dev/assets/favicon-9BK-ZSO9.jpeg" alt="VaniKriti Logo" className="w-20 h-20" />
                    <h2 className="text-2xl font-bold text-center">Sign in to your account</h2>
                    <p className="text-sm text-center text-gray-600">
                        Don&apos;t have an account?
                        <Link href="/sign-up" className="text-blue-600">
                            Sign up
                        </Link>
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <FormField
                                name="identifier"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username or Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="abc_123 or demo@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <p className={`text-sm text-green-500`}>
                                            Use &apos;testing&apos; as username
                                        </p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="password"
                                                type="password"
                                                autoComplete="current-password"
                                                placeholder="********"
                                                {...field}
                                            />
                                        </FormControl>
                                        <p className={`text-sm text-green-500`}>
                                            Use &apos;Testing@123&apos; as password
                                        </p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Link href="#" className="text-sm text-blue-600">
                                Forgot password?
                            </Link>
                        </div>
                        <div>
                            <Button type="submit" disabled={isSubmitting} className='w-full'>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </>
                                ) : 'Sign in'}
                            </Button>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <span className="text-sm text-gray-600">OR</span>
                        </div>
                        <div>
                            <Button variant="outline" className="w-full">
                                Continue as nursery
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Page;
