'use client';

import { useState } from 'react';
import { CalendarRange, Plus, Trash2, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface TimeSlot {
    id: number;
    subject: string;
    startTime: string;
    endTime: string;
}

export default function TimetableGenerator() {
    const [subjects, setSubjects] = useState<string[]>(['']);
    const [timetable, setTimetable] = useState<{ [key: string]: TimeSlot[] }>({});
    const [showTimetable, setShowTimetable] = useState(false);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

    const addSubject = () => {
        setSubjects([...subjects, '']);
    };

    const removeSubject = (index: number) => {
        if (subjects.length > 1) {
            setSubjects(subjects.filter((_, i) => i !== index));
        }
    };

    const updateSubject = (index: number, value: string) => {
        const newSubjects = [...subjects];
        newSubjects[index] = value;
        setSubjects(newSubjects);
    };

    const generateTimetable = () => {
        const validSubjects = subjects.filter(s => s.trim() !== '');

        if (validSubjects.length === 0) {
            alert('Please add at least one subject');
            return;
        }

        const newTimetable: { [key: string]: TimeSlot[] } = {};

        days.forEach(day => {
            newTimetable[day] = [];
            const slotsPerDay = Math.min(4, timeSlots.length - 1);

            for (let i = 0; i < slotsPerDay; i++) {
                const subject = validSubjects[Math.floor(Math.random() * validSubjects.length)];
                newTimetable[day].push({
                    id: Date.now() + i,
                    subject,
                    startTime: timeSlots[i],
                    endTime: timeSlots[i + 1],
                });
            }
        });

        setTimetable(newTimetable);
        setShowTimetable(true);
    };

    const downloadTimetable = () => {
        let text = 'WEEKLY STUDY TIMETABLE\n\n';
        days.forEach(day => {
            text += `\n${day}:\n`;
            timetable[day]?.forEach(slot => {
                text += `  ${slot.startTime} - ${slot.endTime}: ${slot.subject}\n`;
            });
        });

        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'study-timetable.txt';
        a.click();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/tools"
                    className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-6 font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                            <CalendarRange className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Timetable Generator</h1>
                            <p className="text-gray-600">Create your weekly study schedule</p>
                        </div>
                    </div>

                    {!showTimetable ? (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Add Your Subjects
                                </label>
                                <div className="space-y-3">
                                    {subjects.map((subject, index) => (
                                        <div key={index} className="flex gap-3">
                                            <input
                                                type="text"
                                                value={subject}
                                                onChange={(e) => updateSubject(index, e.target.value)}
                                                placeholder={`Subject ${index + 1}`}
                                                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
                                            />
                                            {subjects.length > 1 && (
                                                <button
                                                    onClick={() => removeSubject(index)}
                                                    className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={addSubject}
                                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-teal-500 hover:text-teal-600 transition-colors flex items-center justify-center gap-2"
                            >
                                <Plus className="w-5 h-5" />
                                Add Subject
                            </button>

                            <button
                                onClick={generateTimetable}
                                className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg"
                            >
                                Generate Timetable
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-fade-in">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                                            <th className="p-3 text-left font-semibold">Day</th>
                                            <th className="p-3 text-left font-semibold">Schedule</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {days.map(day => (
                                            <tr key={day} className="border-b border-gray-200 hover:bg-gray-50">
                                                <td className="p-3 font-semibold text-gray-900">{day}</td>
                                                <td className="p-3">
                                                    <div className="space-y-2">
                                                        {timetable[day]?.map((slot, index) => (
                                                            <div key={index} className="flex items-center gap-3">
                                                                <span className="text-sm text-gray-600 font-medium w-24">
                                                                    {slot.startTime} - {slot.endTime}
                                                                </span>
                                                                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-lg text-sm font-medium">
                                                                    {slot.subject}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={downloadTimetable}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg flex items-center justify-center gap-2"
                                >
                                    <Download className="w-5 h-5" />
                                    Download Timetable
                                </button>
                                <button
                                    onClick={() => setShowTimetable(false)}
                                    className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
                                >
                                    Edit Subjects
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
