'use client';

import { useState } from 'react';
import { Percent, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AttendanceCalculator() {
    const [attended, setAttended] = useState('');
    const [total, setTotal] = useState('');
    const [targetPercentage, setTargetPercentage] = useState('75');
    const [percentage, setPercentage] = useState<number | null>(null);
    const [classesNeeded, setClassesNeeded] = useState<number | null>(null);

    const calculate = () => {
        const attendedNum = parseInt(attended);
        const totalNum = parseInt(total);
        const targetNum = parseFloat(targetPercentage);

        if (isNaN(attendedNum) || isNaN(totalNum) || totalNum === 0) {
            alert('Please enter valid numbers');
            return;
        }

        if (attendedNum > totalNum) {
            alert('Attended classes cannot be more than total classes');
            return;
        }

        // Calculate current percentage
        const currentPercentage = (attendedNum / totalNum) * 100;
        setPercentage(currentPercentage);

        // Calculate classes needed to reach target
        if (currentPercentage < targetNum) {
            // Formula: (attended + x) / (total + x) = target/100
            // Solving: x = (target * total - 100 * attended) / (100 - target)
            const needed = Math.ceil((targetNum * totalNum - 100 * attendedNum) / (100 - targetNum));
            setClassesNeeded(needed);
        } else {
            setClassesNeeded(0);
        }
    };

    const reset = () => {
        setAttended('');
        setTotal('');
        setPercentage(null);
        setClassesNeeded(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/tools"
                    className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 mb-6 font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                            <Percent className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Attendance Calculator</h1>
                            <p className="text-gray-600">Track your attendance and plan ahead</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Classes Attended
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={attended}
                                    onChange={(e) => setAttended(e.target.value)}
                                    placeholder="e.g., 45"
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Total Classes
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={total}
                                    onChange={(e) => setTotal(e.target.value)}
                                    placeholder="e.g., 60"
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Target Percentage (%)
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={targetPercentage}
                                onChange={(e) => setTargetPercentage(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
                            />
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={calculate}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
                            >
                                Calculate
                            </button>
                            <button
                                onClick={reset}
                                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
                            >
                                Reset
                            </button>
                        </div>

                        {percentage !== null && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Current Attendance:</h3>
                                    <p className="text-4xl font-bold text-green-600">{percentage.toFixed(2)}%</p>
                                </div>

                                {classesNeeded !== null && classesNeeded > 0 && (
                                    <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                            Classes needed to reach {targetPercentage}%:
                                        </h3>
                                        <p className="text-3xl font-bold text-blue-600">{classesNeeded} classes</p>
                                        <p className="text-sm text-gray-600 mt-2">
                                            You need to attend the next {classesNeeded} classes consecutively
                                        </p>
                                    </div>
                                )}

                                {classesNeeded === 0 && (
                                    <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
                                        <p className="text-lg font-semibold text-green-700">
                                            🎉 Great! You've already achieved {targetPercentage}% attendance!
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
