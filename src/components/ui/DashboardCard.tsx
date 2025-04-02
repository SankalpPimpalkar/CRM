import { TrendingUp } from 'lucide-react'
import React from 'react'

export default function DashboardCard() {
    return (
        <div className="border border-gray-300 rounded-lg p-5 w-full">
            <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 font-medium">Total Deals</h3>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold">142</p>
                    <p className="text-sm text-green-500 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +12% from last month
                    </p>
                </div>
            </div>
        </div>
    )
}
