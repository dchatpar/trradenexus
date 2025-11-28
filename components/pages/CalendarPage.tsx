
import React from 'react';
import { PageHeader, GlassCard, Button } from '../common/Shared';
import { CalendarIcon } from '../Icons';

const CalendarPage: React.FC = () => {
    // Simple Grid Calendar Mock
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDay = 24; // Mock current day

    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
            <PageHeader title="Schedule & Tasks" subtitle="Manage meetings, calls, and deadlines" action={<Button>Add Event</Button>} />

            <GlassCard className="flex-1 p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <CalendarIcon className="h-6 w-6 text-blue-400" /> October 2023
                    </h2>
                    <div className="flex gap-2">
                        <Button variant="secondary">Month</Button>
                        <Button variant="secondary">Week</Button>
                        <Button variant="secondary">Day</Button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-px bg-gray-700/50 flex-1 border border-gray-700 rounded-lg overflow-hidden">
                    {days.map(d => (
                        <div key={d} className="bg-slate-900 p-3 text-center text-sm font-semibold text-gray-400 uppercase">
                            {d}
                        </div>
                    ))}
                    {Array.from({ length: 35 }).map((_, i) => {
                        const dayNum = i - 2; // Offset for month start
                        const isToday = dayNum === currentDay;
                        const hasEvent = dayNum === 24 || dayNum === 26 || dayNum === 28;

                        return (
                            <div key={i} className={`bg-slate-900 p-2 min-h-[100px] relative hover:bg-slate-800 transition-colors ${dayNum <= 0 ? 'opacity-30' : ''}`}>
                                {dayNum > 0 && dayNum <= 31 && (
                                    <>
                                        <span className={`text-sm ${isToday ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center' : 'text-gray-400'}`}>
                                            {dayNum}
                                        </span>
                                        {hasEvent && (
                                            <div className="mt-2 space-y-1">
                                                <div className="text-xs bg-purple-600/20 text-purple-300 px-1.5 py-0.5 rounded truncate border-l-2 border-purple-500">
                                                    Call: TechGlobal
                                                </div>
                                                {dayNum === 24 && (
                                                    <div className="text-xs bg-green-600/20 text-green-300 px-1.5 py-0.5 rounded truncate border-l-2 border-green-500">
                                                        Demo Meeting
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </GlassCard>
        </div>
    );
};

export default CalendarPage;
