"use client";
import React from 'react'
import { Mail, Phone, User, Briefcase, FileText, Calendar, ChevronRight } from 'lucide-react'
import { useAppSelector } from '@/lib/redux/store'

export default function SettingsPage() {

    const userData = useAppSelector(state => state.authReducer.userData)


    return (
        <div className='px-5 space-y-6'>
            <div className='flex items-center justify-between border-b border-gray-200 pb-5'>
                <h1 className='text-3xl font-bold text-gray-800'>
                    Settings
                </h1>
            </div>

            {/* User Profile Section */}
            <div className='bg-white overflow-hidden'>
                <div className='p-6 flex items-center gap-6 border-b border-gray-100'>
                    <div className='w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden'>
                        <img src={userData.avatar || 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg'} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h2 className='text-xl font-semibold text-gray-800'>{userData.name}</h2>
                        <p className='text-gray-500'>@{userData.username}</p>
                    </div>
                </div>

                <div className='divide-y divide-gray-100'>
                    {/* Personal Information */}
                    <div className='p-6 space-y-4'>
                        <h3 className='text-lg font-medium text-gray-800'>Personal Information</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='flex items-center gap-3'>
                                <Mail className='w-5 h-5 text-gray-400' />
                                <div>
                                    <p className='text-sm text-gray-500'>Email</p>
                                    <p className='font-medium'>{userData.email}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-3'>
                                <Phone className='w-5 h-5 text-gray-400' />
                                <div>
                                    <p className='text-sm text-gray-500'>Phone</p>
                                    <p className='font-medium'>{userData.phone || 'Not provided'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Companies Section */}
                    {userData.companies?.length > 0 && (
                        <div className='p-6 space-y-4'>
                            <h3 className='text-lg font-medium text-gray-800'>Your Companies</h3>
                            <div className='space-y-3'>
                                {userData.companies.map((company: any) => (
                                    <div key={company.$id} className='flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg'>
                                        <div className='flex-shrink-0'>
                                            <img
                                                src={company.logo || 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'}
                                                alt={company.name}
                                                className='w-12 h-12 rounded-full object-cover bg-gray-100'
                                            />
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <h4 className='font-medium text-gray-800 truncate'>{company.name}</h4>
                                            <p className='text-sm text-gray-500 truncate'>{company.email}</p>
                                        </div>
                                        <ChevronRight className='w-5 h-5 text-gray-400' />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Statistics Section */}
                    <div className='p-6 space-y-4'>
                        <h3 className='text-lg font-medium text-gray-800'>Your Activity</h3>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            <div className='border border-gray-300 rounded-lg p-4'>
                                <div className='flex items-center gap-3'>
                                    <Briefcase className='w-5 h-5 text-blue-500' />
                                    <span className='text-sm font-medium text-gray-500'>Companies</span>
                                </div>
                                <p className='text-2xl font-bold mt-2'>{userData.companies?.length || 0}</p>
                            </div>
                            <div className='border border-gray-300 rounded-lg p-4'>
                                <div className='flex items-center gap-3'>
                                    <FileText className='w-5 h-5 text-green-500' />
                                    <span className='text-sm font-medium text-gray-500'>Deals</span>
                                </div>
                                <p className='text-2xl font-bold mt-2'>{userData.deals?.length || 0}</p>
                            </div>
                            <div className='border border-gray-300 rounded-lg p-4'>
                                <div className='flex items-center gap-3'>
                                    <Calendar className='w-5 h-5 text-purple-500' />
                                    <span className='text-sm font-medium text-gray-500'>Interactions</span>
                                </div>
                                <p className='text-2xl font-bold mt-2'>{userData.interactions?.length || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Actions */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
                <div className='p-6 space-y-4'>
                    <h3 className='text-lg font-medium text-gray-800'>Account</h3>
                    <button className='w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg'>
                        <span className='text-red-600 font-medium'>Delete Account</span>
                        <ChevronRight className='w-5 h-5 text-gray-400' />
                    </button>
                </div>
            </div>
        </div>
    )
}