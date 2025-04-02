"use client";
import React, { useState, useEffect } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import appwriteService from '@/lib/appwrite/functions';
import { useRouter } from 'next/navigation';
import { Loader, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { loginReducer } from '@/lib/redux/slices/auth/AuthSlice';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
    });

    const [isValidUsername, setIsValidUsername] = useState<null | boolean>(null);
    const [isValidating, setIsValidating] = useState(false)
    const [isCreating, setIsCreating] = useState(false)
    const debouncedUsername = useDebounce(formData.username, 500);
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        const validateUsername = async () => {
            setIsValidating(true)
            if (debouncedUsername) {
                const isAvailable = await appwriteService.validateNewUsername(debouncedUsername);
                setIsValidUsername(!!isAvailable);
                setErrors((prev) => ({
                    ...prev,
                    username: isAvailable ? '' : 'Username is already taken.',
                }));
            } else {
                setIsValidUsername(null)
            }
            setIsValidating(false)
        };
        validateUsername();
    }, [debouncedUsername]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { name: '', email: '', username: '', password: '' };

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required.';
            valid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
            valid = false;
        }
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required.';
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
        setIsCreating(true)
        if (validateForm() && isValidUsername) {
            console.log('Form submitted:', formData);
            const response = await appwriteService.createAccount(formData)

            if (response) {
                dispatch(loginReducer(response))
                return router.push('/')
            }
        }
        setIsCreating(false)
    };

    return (
        <div className="w-full max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-extrabold mb-2 text-start">Sign Up</h2>
            <p className="text-sm text-gray-600 mb-6">
                Welcome! Please fill in the form below to create your account.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                        required
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
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
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                        required
                    />
                    {
                        isValidating && (
                            <div className='flex items-center gap-1'>
                                <LoaderCircle className='w-8 h-8 text-gray-600 py-2 animate-spin' />
                                <p className='text-sm text-gray-600'>Please wait</p>
                            </div>
                        )
                    }
                    {isValidUsername === false && (
                        <p className="text-sm pt-2 text-gray-600">Username is already taken.</p>
                    )}
                    {isValidUsername === true && (
                        <p className="text-sm pt-2 text-gray-600">Username is available.</p>
                    )}
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
                    disabled={isCreating}
                    className="w-full py-3 px-4 bg-black text-white font-semibold rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black disabled:bg-black/80"
                >
                    {
                        isCreating ? (
                            <div className='flex items-center justify-center gap-3 text-gray-200 '>
                                <Loader className='w-6 h-6 animate-spin' />
                                <p>Please wait</p>
                            </div>
                        ) : (
                            <p className='font-bold text-gray-200 antialiased'>Create Account</p>
                        )
                    }
                </button>
            </form>
            <p className="mt-4 text-start text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-black hover:underline font-bold">
                    Log in
                </Link>
            </p>
        </div>
    );
}
