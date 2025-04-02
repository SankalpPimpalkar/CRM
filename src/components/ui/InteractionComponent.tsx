import getRelativeTimeString from '@/utils/getRelativeTimeString'
import { Calendar, FileText, Mail, MessageSquare, Phone } from 'lucide-react'
import React from 'react'

export default function InteractionComponent({ interaction }: { interaction: any }) {
    return (
        <div
            key={interaction.$id}
            className="flex items-center justify-between p-5 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
        >
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0">
                    <div className={`p-3 rounded-full ${getInteractionColor(interaction.type).bg}`}>
                        {getInteractionIcon(interaction.type)}
                    </div>
                </div>

                <div className="min-w-0">
                    <h3 className="text-lg font-bold text-gray-500 truncate">
                        {interaction.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <p className="text-sm font-medium text-gray-500 capitalize">
                            {interaction.type}
                        </p>
                        <p className="text-sm font-medium text-gray-500">
                            {getRelativeTimeString(interaction.$createdAt)}
                        </p>
                        {interaction.deal && (
                            <p className="text-sm font-medium text-gray-600 flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                {interaction.deal.title}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {interaction.deal && (
                <div className="flex-shrink-0 ml-4">
                    <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${interaction.deal.status === "CLOSED_WON"
                            ? "bg-green-100 text-green-800"
                            : interaction.deal.status === "CLOSED_LOST"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                    >
                        {interaction.deal.status.split('_').join(' ')}
                    </span>
                </div>
            )}
        </div>
    )
}


function getInteractionIcon(type: string) {
    const iconProps = { className: "h-5 w-5", strokeWidth: 1.5 };

    switch (type) {
        case 'call':
            return <Phone {...iconProps} />;
        case 'email':
            return <Mail {...iconProps} />;
        case 'meeting':
            return <Calendar {...iconProps} />;
        default:
            return <MessageSquare {...iconProps} />;
    }
}

function getInteractionColor(type: string) {
    switch (type) {
        case 'call':
            return { bg: 'bg-blue-100', text: 'text-blue-600' };
        case 'email':
            return { bg: 'bg-green-100', text: 'text-green-600' };
        case 'meeting':
            return { bg: 'bg-purple-100', text: 'text-purple-600' };
        default:
            return { bg: 'bg-gray-100', text: 'text-gray-600' };
    }
}