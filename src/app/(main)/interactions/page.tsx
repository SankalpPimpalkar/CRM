"use client";
import InteractionComponent from '@/components/ui/InteractionComponent'
import { useAppSelector } from '@/lib/redux/store'
import React from 'react'

export default function InteractionsPage() {

    const userData = useAppSelector(state => state.authReducer.userData)


    return (
        <div className='px-5 space-y-4'>
            <div className='flex items-center justify-between border-b border-gray-300 py-5'>
                <h1 className='text-4xl text-gray-600 font-extrabold'>
                    Interactions
                </h1>

                <button className='text-lg bg-gray-900 text-gray-100 px-6 py-2 rounded-md font-semibold'>
                    Add New
                </button>
            </div>

            <div className="divide-y divide-gray-300">
                {userData.interactions.map((interaction) => (
                    <InteractionComponent interaction={interaction} key={interaction.$id} />
                ))}
            </div>
        </div>
    )
}
