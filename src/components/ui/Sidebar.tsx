"use client";
import React from 'react';
import {
    Home,
    Briefcase,
    MessageSquare,
    Users,
    Settings
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const menuItems = [
        {
            name: 'Dashboard',
            slug: '/',
            icon: <Home className="w-5 h-5" />,
        },
        {
            name: 'Deals',
            slug: '/deals',
            icon: <Briefcase className="w-5 h-5" />
        },
        {
            name: 'Interactions',
            slug: '/interactions',
            icon: <MessageSquare className="w-5 h-5" />
        },
        {
            name: 'Contacts',
            slug: '/contacts',
            icon: <Users className="w-5 h-5" />
        },
        {
            name: 'Settings',
            slug: '/settings',
            icon: <Settings className="w-5 h-5" />,
            bottom: true
        },
    ];

    const pathname = usePathname()
    console.log(pathname)

    return (
        <div className="h-full w-72 bg-white border-r border-gray-200">
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto py-4">
                    {menuItems.filter(item => !item.bottom).map((item, index) => (
                        <Link
                            href={item.slug}
                            key={index}
                            className={`flex items-center px-6 py-3 mx-2 rounded cursor-pointer transition-colors ${item.slug == pathname ? 'bg-gray-100 text-gray-600' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                </div>

                {/* Bottom settings item */}
                <div className="pb-4 border-t border-gray-100 pt-4">
                    {menuItems.filter(item => item.bottom).map((item, index) => (
                        <Link
                            href={item.slug}
                            key={index}
                            className={`flex items-center px-6 py-3 mx-2 rounded-lg cursor-pointer transition-colors ${item.slug == pathname ? 'bg-gray-50 text-gray-600' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}