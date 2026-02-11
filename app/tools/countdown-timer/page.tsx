'use client';

import { useState, useEffect } from 'react';
import { Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CountdownTimer() {
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventName, setEventName] = useState('');
    const [countdown, setCountdown] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning && eventDate && eventTime) {
            interval = setInterval(() => {
                const target = new Date(`${eventDate}T${eventTime}`).getTime();
                const now = new Date().getTime();
                const difference = target - now;

                if (difference > 0) {
                    setCountdown({
                        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                        seconds: Math.floor((difference % (1000 * 60)) / 1000),
                    });
                } else {
                    setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                    setIsRunning(false);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, eventDate, eventTime]);

    const startCountdown = () => {
        if (!eventDate || !eventTime) {
            alert('Please select both date and time');
            return;
        }

        const target = new Date(`${eventDate}T${eventTime}`);
        if (target <= new Date()) {
            alert('Please select a future date and time');
            return;
        }

        setIsRunning(true);
    };

    const reset = () => {
        setIsRunning(false);
        setCountdown(null);
        setEventDate('');
        setEventTime('');
        setEventName('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/tools"
                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6 font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
                            <Clock className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Countdown Timer</h1>
                            <p className="text-gray-600">Count down to your important events</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Event Name
                            </label>
                            <input
                                type="text"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                                placeholder="e.g., Final Exam"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-lg"
                                disabled={isRunning}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Event Date
                                </label>
                                <input
                                    type="date"
                                    value={eventDate}
                                    onChange={(e) => setEventDate(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-lg"
                                    disabled={isRunning}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Event Time
                                </label>
                                <input
                                    type="time"
                                    value={eventTime}
                                    onChange={(e) => setEventTime(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-lg"
                                    disabled={isRunning}
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {!isRunning ? (
                                <button
                                    onClick={startCountdown}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all shadow-lg"
                                >
                                    Start Countdown
                                </button>
                            ) : (
                                <button
                                    onClick={reset}
                                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
                                >
                                    Reset
                                </button>
                            )}
                        </div>

                        {countdown && (
                            <div className="animate-fade-in">
                                {eventName && (
                                    <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
                                        {eventName}
                                    </h3>
                                )}
                                <div className="grid grid-cols-4 gap-4 text-center">
                                    <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl">
                                        <p className="text-4xl font-bold text-indigo-600">{countdown.days}</p>
                                        <p className="text-sm text-gray-600 mt-2">Days</p>
                                    </div>
                                    <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl">
                                        <p className="text-4xl font-bold text-indigo-600">{countdown.hours}</p>
                                        <p className="text-sm text-gray-600 mt-2">Hours</p>
                                    </div>
                                    <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl">
                                        <p className="text-4xl font-bold text-indigo-600">{countdown.minutes}</p>
                                        <p className="text-sm text-gray-600 mt-2">Minutes</p>
                                    </div>
                                    <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl">
                                        <p className="text-4xl font-bold text-indigo-600">{countdown.seconds}</p>
                                        <p className="text-sm text-gray-600 mt-2">Seconds</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
