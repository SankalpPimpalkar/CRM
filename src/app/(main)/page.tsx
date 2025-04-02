"use client";
import DashboardCard from '@/components/ui/DashboardCard'
import { ToggleContentCard } from '@/components/ui/ToggleContentCard'
import { useAppSelector } from '@/lib/redux/store'
import React from 'react'

export default function DashboardPage() {

    const userData = useAppSelector(state => state.authReducer.userData)

    return (
        <div className='px-5 space-y-4'>
            <div className='flex items-center justify-between border-b border-gray-300 py-5'>
                <h1 className='text-4xl text-gray-600 font-extrabold'>
                    Dashboard
                </h1>

                <button className='text-lg bg-gray-900 text-gray-100 px-6 py-2 rounded-md font-semibold'>
                    Add New
                </button>
            </div>

            <div className='flex items-center gap-4'>
                {
                    [1, 2, 3, 4].map(card => (
                        <DashboardCard key={card} />
                    ))
                }
            </div>

            <div>
                <ToggleContentCard
                    deals={userData.deals}
                    interactions={userData.interactions}
                />
            </div>
        </div>
    )
}
