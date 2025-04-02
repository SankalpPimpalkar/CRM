import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";
import React from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <Navbar />
            <div className="flex flex-1 overflow-hidden container mx-auto border-x border-gray-200">
                <Sidebar />
                <main className="flex-1 overflow-auto p-4 bg-white">
                    {children}
                </main>
            </div>
        </div>
    );
}
