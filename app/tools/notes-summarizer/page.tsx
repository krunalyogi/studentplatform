'use client';

import { useState } from 'react';
import { Lightbulb, Copy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotesSummarizer() {
    const [notes, setNotes] = useState('');
    const [summaryLength, setSummaryLength] = useState('5');
    const [summary, setSummary] = useState<string[]>([]);

    const summarize = () => {
        if (!notes.trim()) {
            alert('Please enter some notes to summarize');
            return;
        }

        const sentences = notes
            .split(/[.!?]+/)
            .map(s => s.trim())
            .filter(s => s.length > 0);

        if (sentences.length === 0) {
            alert('Please enter valid text to summarize');
            return;
        }

        const targetLength = Math.min(parseInt(summaryLength) || 5, sentences.length);

        // Simple summarization: take sentences with key indicators
        const scoredSentences = sentences.map((sentence, index) => {
            let score = 0;

            // Prefer earlier sentences
            if (index < sentences.length * 0.3) score += 2;

            // Prefer sentences with key terms
            const keywords = ['important', 'significant', 'key', 'essential', 'crucial', 'main', 'primary', 'therefore', 'thus', 'conclusion'];
            keywords.forEach(keyword => {
                if (sentence.toLowerCase().includes(keyword)) score += 1;
            });

            // Prefer longer sentences (more information)
            score += sentence.split(' ').length / 10;

            return { sentence, score, index };
        });

        // Sort by score and take top N
        const topSentences = scoredSentences
            .sort((a, b) => b.score - a.score)
            .slice(0, targetLength)
            .sort((a, b) => a.index - b.index)
            .map(item => item.sentence);

        setSummary(topSentences);
    };

    const copySummary = () => {
        const text = summary.map((point, i) => `${i + 1}. ${point}`).join('\n');
        navigator.clipboard.writeText(text);
        alert('Summary copied to clipboard!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/tools"
                    className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 mb-6 font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <Lightbulb className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Notes Summarizer</h1>
                            <p className="text-gray-600">Convert long notes into concise bullet points</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Paste Your Notes
                            </label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Paste your lengthy notes here. The tool will extract key sentences and create a concise summary."
                                className="w-full h-64 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-rose-500 focus:outline-none text-lg resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Summary Length (number of key points)
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="15"
                                value={summaryLength}
                                onChange={(e) => setSummaryLength(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-rose-500 focus:outline-none text-lg"
                            />
                        </div>

                        <button
                            onClick={summarize}
                            className="w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg"
                        >
                            Generate Summary
                        </button>

                        {summary.length > 0 && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl border-2 border-rose-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Key Points Summary:
                                    </h3>
                                    <ul className="space-y-3">
                                        {summary.map((point, index) => (
                                            <li key={index} className="flex gap-3">
                                                <span className="flex-shrink-0 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                                    {index + 1}
                                                </span>
                                                <span className="text-gray-800">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    onClick={copySummary}
                                    className="w-full px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
                                >
                                    <Copy className="w-5 h-5" />
                                    Copy Summary
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
