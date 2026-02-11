'use client';

import { useState } from 'react';
import { FileText, Copy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WordCounter() {
    const [text, setText] = useState('');

    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const characterCount = text.length;
    const characterNoSpaces = text.replace(/\s/g, '').length;
    const sentenceCount = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphCount = text.trim() === '' ? 0 : text.split(/\n\n+/).filter(p => p.trim().length > 0).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/minute

    const copyStats = () => {
        const stats = `Words: ${wordCount}\nCharacters: ${characterCount}\nSentences: ${sentenceCount}\nReading Time: ${readingTime} min`;
        navigator.clipboard.writeText(stats);
        alert('Statistics copied to clipboard!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/tools"
                    className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6 font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center">
                            <FileText className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Word Counter</h1>
                            <p className="text-gray-600">Count words, characters, and estimate reading time</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Enter or paste your text
                            </label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Start typing or paste your text here..."
                                className="w-full h-64 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none text-lg resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border-2 border-amber-200">
                                <p className="text-sm text-gray-600">Words</p>
                                <p className="text-3xl font-bold text-amber-600">{wordCount}</p>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
                                <p className="text-sm text-gray-600">Characters</p>
                                <p className="text-3xl font-bold text-blue-600">{characterCount}</p>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                                <p className="text-sm text-gray-600">Characters (no spaces)</p>
                                <p className="text-3xl font-bold text-green-600">{characterNoSpaces}</p>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
                                <p className="text-sm text-gray-600">Sentences</p>
                                <p className="text-3xl font-bold text-purple-600">{sentenceCount}</p>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-rose-50 to-red-50 rounded-lg border-2 border-rose-200">
                                <p className="text-sm text-gray-600">Paragraphs</p>
                                <p className="text-3xl font-bold text-rose-600">{paragraphCount}</p>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border-2 border-indigo-200">
                                <p className="text-sm text-gray-600">Reading Time</p>
                                <p className="text-3xl font-bold text-indigo-600">{readingTime} min</p>
                            </div>
                        </div>

                        <button
                            onClick={copyStats}
                            className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            <Copy className="w-5 h-5" />
                            Copy Statistics
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
