'use client';

import { useState } from 'react';
import { Calculator, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CGPACalculator() {
    const [cgpa, setCgpa] = useState('');
    const [percentage, setPercentage] = useState<number | null>(null);

    const calculatePercentage = () => {
        const cgpaValue = parseFloat(cgpa);

        if (isNaN(cgpaValue) || cgpaValue < 0 || cgpaValue > 10) {
            alert('Please enter a valid CGPA between 0 and 10');
            return;
        }

        // Standard conversion: Percentage = (CGPA - 0.75) * 10
        const result = (cgpaValue - 0.75) * 10;
        setPercentage(Math.max(0, Math.min(100, result)));
    };

    const reset = () => {
        setCgpa('');
        setPercentage(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/tools"
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                            <Calculator className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">CGPA to Percentage Calculator</h1>
                            <p className="text-gray-600">Convert your CGPA to percentage instantly</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Enter CGPA (0-10 scale)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                max="10"
                                value={cgpa}
                                onChange={(e) => setCgpa(e.target.value)}
                                placeholder="e.g., 8.5"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none text-lg"
                            />
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={calculatePercentage}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg"
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
                            <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 animate-fade-in">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Result:</h3>
                                <p className="text-4xl font-bold text-blue-600">{percentage.toFixed(2)}%</p>
                                <p className="text-sm text-gray-600 mt-2">
                                    Formula used: (CGPA - 0.75) × 10
                                </p>
                            </div>
                        )}

                        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">💡 How it works:</h4>
                            <p className="text-sm text-gray-700">
                                The standard conversion formula is: <strong>Percentage = (CGPA - 0.75) × 10</strong>
                                <br />
                                This is commonly used by Indian universities. Different institutions may use different formulas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
