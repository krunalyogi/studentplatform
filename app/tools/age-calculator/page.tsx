'use client';

import { useState } from 'react';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AgeCalculator() {
    const [birthDate, setBirthDate] = useState('');
    const [age, setAge] = useState<{
        years: number;
        months: number;
        days: number;
        totalDays: number;
        nextBirthday: string;
    } | null>(null);

    const calculateAge = () => {
        if (!birthDate) {
            alert('Please select your birth date');
            return;
        }

        const birth = new Date(birthDate);
        const today = new Date();

        if (birth > today) {
            alert('Birth date cannot be in the future');
            return;
        }

        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        // Calculate total days
        const diffTime = Math.abs(today.getTime() - birth.getTime());
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Calculate next birthday
        const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        setAge({
            years,
            months,
            days,
            totalDays,
            nextBirthday: `${daysToNextBirthday} days`,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/tools"
                    className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6 font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                            <Calendar className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Age Calculator</h1>
                            <p className="text-gray-600">Calculate your exact age in years, months, and days</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
                            />
                        </div>

                        <button
                            onClick={calculateAge}
                            className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
                        >
                            Calculate Age
                        </button>

                        {age && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Your Age:</h3>
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <p className="text-3xl font-bold text-orange-600">{age.years}</p>
                                            <p className="text-sm text-gray-600">Years</p>
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold text-orange-600">{age.months}</p>
                                            <p className="text-sm text-gray-600">Months</p>
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold text-orange-600">{age.days}</p>
                                            <p className="text-sm text-gray-600">Days</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <p className="text-sm text-gray-600">Total Days Lived</p>
                                        <p className="text-2xl font-bold text-blue-600">{age.totalDays.toLocaleString()}</p>
                                    </div>
                                    <div className="p-4 bg-green-50 rounded-lg">
                                        <p className="text-sm text-gray-600">Next Birthday In</p>
                                        <p className="text-2xl font-bold text-green-600">{age.nextBirthday}</p>
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
