"use client";
import { Box, Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import React from 'react';

export default function Navbar() {

    const userData = useSelector((state: any) => state.authReducer.userData)
    console.log("USERDATA", userData)

    return (
        <nav className="bg-gray-900 shadow-sm py-4 px-6 flex items-center justify-between">
            <div className='flex items-center justify-between container mx-auto'>
                <div className='flex items-center gap-3'>
                    <Box className='text-gray-50 w-8 h-8' />
                    <h1 className="text-2xl font-semibold text-gray-50">
                        CRM Dashboard
                    </h1>
                </div>


                {/* Right side - User profile */}
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                        JS
                    </div>
                    <div className="text-right">
                        <p className="font-semibold text-gray-50">
                            {userData.name}
                        </p>
                        <p className="text-sm font-medium text-gray-100">
                            {userData.username}
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    );
}