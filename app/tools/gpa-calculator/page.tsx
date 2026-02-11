'use client';

import { useState } from 'react';
import { Calculator, Plus, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Subject {
    id: number;
    name: string;
    grade: string;
    credits: number;
}

const gradePoints: { [key: string]: number } = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0,
};

export default function GPACalculator() {
    const [subjects, setSubjects] = useState<Subject[]>([
        { id: 1, name: '', grade: 'A', credits: 3 },
    ]);
    const [gpa, setGpa] = useState<number | null>(null);

    const addSubject = () => {
        setSubjects([
            ...subjects,
            { id: Date.now(), name: '', grade: 'A', credits: 3 },
        ]);
    };

    const removeSubject = (id: number) => {
        if (subjects.length > 1) {
            setSubjects(subjects.filter((s) => s.id !== id));
        }
    };

    const updateSubject = (id: number, field: string, value: any) => {
        setSubjects(
            subjects.map((s) =>
                s.id === id ? { ...s, [field]: value } : s
            )
        );
    };

    const calculateGPA = () => {
        let totalPoints = 0;
        let totalCredits = 0;

        subjects.forEach((subject) => {
            const points = gradePoints[subject.grade] || 0;
            totalPoints += points * subject.credits;
            totalCredits += subject.credits;
        });

        const result = totalCredits > 0 ? totalPoints / totalCredits : 0;
        setGpa(result);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/tools"
                    className="inline-flex items-center gap-2 text-secondary-600 hover:text-secondary-700 mb-6 font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <Calculator className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">GPA Calculator</h1>
                            <p className="text-gray-600">Calculate your Grade Point Average (4.0 scale)</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {subjects.map((subject, index) => (
                            <div key={subject.id} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <input
                                        type="text"
                                        value={subject.name}
                                        onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                                        placeholder={`Subject ${index + 1}`}
                                        className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                                    />
                                    <select
                                        value={subject.grade}
                                        onChange={(e) => updateSubject(subject.id, 'grade', e.target.value)}
                                        className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                                    >
                                        {Object.keys(gradePoints).map((grade) => (
                                            <option key={grade} value={grade}>
                                                {grade} ({gradePoints[grade].toFixed(1)})
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={subject.credits}
                                        onChange={(e) => updateSubject(subject.id, 'credits', parseInt(e.target.value) || 1)}
                                        placeholder="Credits"
                                        className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                                    />
                                </div>
                                {subjects.length > 1 && (
                                    <button
                                        onClick={() => removeSubject(subject.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        aria-label="Remove subject"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            onClick={addSubject}
                            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-500 hover:text-purple-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Add Subject
                        </button>

                        <button
                            onClick={calculateGPA}
                            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
                        >
                            Calculate GPA
                        </button>

                        {gpa !== null && (
                            <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 animate-fade-in">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Your GPA:</h3>
                                <p className="text-4xl font-bold text-purple-600">{gpa.toFixed(2)} / 4.0</p>
                                <p className="text-sm text-gray-600 mt-2">
                                    Total Credits: {subjects.reduce((sum, s) => sum + s.credits, 0)}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
