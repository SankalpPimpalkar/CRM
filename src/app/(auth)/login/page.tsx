"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import apprwiteService from '@/lib/appwrite/functions';
import { Loader } from 'lucide-react';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const router = useRouter();
    const [isLogging, setIsLogging] = useState(false)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { email: '', password: '' };

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required.';
            valid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLogging(true)
        if (validateForm()) {
            console.log('Form submitted:', formData);
            const response = await apprwiteService.loginAccount(formData)
            if (response) {
                return router.push('/');
            }
        }
        setIsLogging(false)
    };

    return (
        <div className="w-full max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-extrabold mb-2 text-start">Log In</h2>
            <p className="text-sm text-gray-600 mb-6">
                Welcome back! Please enter your credentials to access your account.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                        required
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <button
                    type="submit"
                    disabled={isLogging}
                    className="w-full py-3 px-4 bg-black text-white font-semibold rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black disabled:bg-black/80"
                >
                    {
                        isLogging ? (
                            <div className='flex items-center justify-center gap-3 text-gray-200 '>
                                <Loader className='w-6 h-6 animate-spin' />
                                <p>Please wait</p>
                            </div>
                        ) : (
                            <p className='font-bold text-gray-200 antialiased'>Log In</p>
                        )
                    }
                </button>
            </form>
            <p className="mt-4 text-start text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/signup" className="text-black hover:underline font-bold">
                    Sign up
                </Link>
            </p>
        </div>
    );
}
