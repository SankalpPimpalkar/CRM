import React from 'react'
import { Search } from 'lucide-react'

export default function ContactsPage() {
    return (
        <div className='px-5 space-y-4'>
            <div className='flex items-center justify-between border-b border-gray-300 py-5'>
                <h1 className='text-4xl text-gray-600 font-extrabold'>
                    Contacts
                </h1>

                <div className="flex items-center gap-4">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-background pl-10 pr-3 py-2 outline-none ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-gray-500"
                            placeholder="Search contacts..."
                            type="search"
                        />
                    </div>
                    <button className='bg-gray-900 text-gray-100 px-4 py-2 rounded-md font-semibold hover:bg-gray-800 transition-colors'>
                        Add New
                    </button>
                </div>
            </div>
        </div>
    )
}