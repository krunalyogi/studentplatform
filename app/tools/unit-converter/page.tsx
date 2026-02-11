'use client';

import { useState } from 'react';
import { Ruler, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function UnitConverter() {
    const [value, setValue] = useState('');
    const [fromUnit, setFromUnit] = useState('meters');
    const [toUnit, setToUnit] = useState('feet');
    const [category, setCategory] = useState('length');
    const [result, setResult] = useState<number | null>(null);

    const units = {
        length: {
            meters: 1,
            kilometers: 0.001,
            centimeters: 100,
            millimeters: 1000,
            miles: 0.000621371,
            yards: 1.09361,
            feet: 3.28084,
            inches: 39.3701,
        },
        weight: {
            kilograms: 1,
            grams: 1000,
            milligrams: 1000000,
            pounds: 2.20462,
            ounces: 35.274,
        },
        temperature: {
            celsius: 'C',
            fahrenheit: 'F',
            kelvin: 'K',
        },
    };

    const convert = () => {
        const inputValue = parseFloat(value);

        if (isNaN(inputValue)) {
            alert('Please enter a valid number');
            return;
        }

        if (category === 'temperature') {
            let celsius = 0;

            // Convert to Celsius first
            if (fromUnit === 'celsius') celsius = inputValue;
            else if (fromUnit === 'fahrenheit') celsius = (inputValue - 32) * 5 / 9;
            else if (fromUnit === 'kelvin') celsius = inputValue - 273.15;

            // Convert from Celsius to target unit
            if (toUnit === 'celsius') setResult(celsius);
            else if (toUnit === 'fahrenheit') setResult(celsius * 9 / 5 + 32);
            else if (toUnit === 'kelvin') setResult(celsius + 273.15);
        } else {
            const categoryUnits = category === 'length' ? units.length : units.weight;
            const fromFactor = categoryUnits[fromUnit as keyof typeof categoryUnits] as number;
            const toFactor = categoryUnits[toUnit as keyof typeof categoryUnits] as number;

            const baseValue = inputValue / fromFactor;
            const convertedValue = baseValue * toFactor;
            setResult(convertedValue);
        }
    };

    const handleCategoryChange = (newCategory: string) => {
        setCategory(newCategory);
        setResult(null);

        if (newCategory === 'length') {
            setFromUnit('meters');
            setToUnit('feet');
        } else if (newCategory === 'weight') {
            setFromUnit('kilograms');
            setToUnit('pounds');
        } else if (newCategory === 'temperature') {
            setFromUnit('celsius');
            setToUnit('fahrenheit');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/tools"
                    className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 mb-6 font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <Ruler className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Unit Converter</h1>
                            <p className="text-gray-600">Convert between different units of measurement</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Category Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Category
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {['length', 'weight', 'temperature'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => handleCategoryChange(cat)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all ${category === cat
                                                ? 'bg-violet-600 text-white shadow-lg'
                                                : 'bg-gray-100 text-gray-700 hover:bg-violet-50'
                                            }`}
                                    >
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Value Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Value
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Enter value"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-violet-500 focus:outline-none text-lg"
                            />
                        </div>

                        {/* Unit Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    From
                                </label>
                                <select
                                    value={fromUnit}
                                    onChange={(e) => setFromUnit(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-violet-500 focus:outline-none"
                                >
                                    {Object.keys(units[category as keyof typeof units]).map((unit) => (
                                        <option key={unit} value={unit}>
                                            {unit}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    To
                                </label>
                                <select
                                    value={toUnit}
                                    onChange={(e) => setToUnit(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-violet-500 focus:outline-none"
                                >
                                    {Object.keys(units[category as keyof typeof units]).map((unit) => (
                                        <option key={unit} value={unit}>
                                            {unit}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={convert}
                            className="w-full px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-lg hover:from-violet-600 hover:to-purple-600 transition-all shadow-lg"
                        >
                            Convert
                        </button>

                        {result !== null && (
                            <div className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border-2 border-violet-200 animate-fade-in">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Result:</h3>
                                <p className="text-4xl font-bold text-violet-600">
                                    {result.toFixed(4)} {toUnit}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
