import getRelativeTimeString from '@/utils/getRelativeTimeString'
import { Smartphone } from 'lucide-react'
import React from 'react'

export default function DealComponent({ deal }: { deal: any }) {
    return (
        <div
            className="flex items-center justify-between p-5 bg-white hover:bg-gray-50 cursor-pointer"
        >
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0">
                    <img
                        className="w-16 h-16 rounded-full object-cover bg-gray-200"
                        src={deal.company.logo || "https://img.freepik.com/premium-vector/business-man-avatar-vector_1133257-2430.jpg?semt=ais_hybrid"}
                        alt="company-logo"
                    />
                </div>

                <div className="min-w-0">
                    <h3 className="text-lg font-bold text-gray-500 truncate">
                        {deal.title || deal.company.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <p className="font-semibold bg-green-200 px-2.5 py-1 text-green-800 rounded-full text-sm">
                            ${deal.amount.toLocaleString()}
                        </p>
                        <p className="text-sm font-medium text-gray-500">
                            Closing {getRelativeTimeString(deal.closed_on)}
                        </p>
                        {deal.interactions?.length > 0 && (
                            <p className="text-sm font-medium text-gray-600 flex items-center gap-1">
                                <Smartphone className="h-4 w-4" />
                                {deal.interactions.length} interaction{deal.interactions.length !== 1 ? 's' : ''}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex-shrink-0 ml-4">
                <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${deal.status === "CLOSED_WON"
                        ? "bg-green-100 text-green-800"
                        : deal.status === "CLOSED_LOST"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                >
                    {deal.status.split('_').join(' ')}
                </span>
            </div>
        </div>
    )
}
