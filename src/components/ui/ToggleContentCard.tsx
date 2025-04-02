"use client";
import { useState } from 'react';
import { MessageSquare, Phone, Mail, Calendar, FileText, Smartphone } from 'lucide-react';
import getRelativeTimeString from '../../utils/getRelativeTimeString';
import DealComponent from './DealComponent';
import InteractionComponent from './InteractionComponent';

export function ToggleContentCard({ deals, interactions }: { deals: any[], interactions: any[] }) {
    const [activeTab, setActiveTab] = useState<'deals' | 'interactions'>('deals');

    return (
        <div className="rounded-lg w-full">
            <div className="flex mb-4 gap-4">
                <button
                    className={`flex items-center justify-center cursor-pointer flex-1 py-3 font-semibold text-lg rounded-md transition-colors ${activeTab === 'deals' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
                    onClick={() => setActiveTab('deals')}
                >
                    Recent Deals
                </button>

                <button
                    className={`flex items-center justify-center cursor-pointer flex-1 py-3 font-semibold text-lg rounded-md transition-colors ${activeTab === 'interactions' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
                    onClick={() => setActiveTab('interactions')}
                >
                    Recent Interactions
                </button>
            </div>

            <div className="py-2">
                {activeTab === 'deals' ? (
                    <div className="divide-y divide-gray-300 border-t border-gray-300">
                        {deals.map((deal) => (
                            <DealComponent deal={deal} key={deal.$id} />
                        ))}
                    </div>
                ) : (
                    <div className="divide-y divide-gray-300 border-t border-gray-300">
                        {interactions.map((interaction) => (
                            <InteractionComponent interaction={interaction} key={interaction.$id} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
