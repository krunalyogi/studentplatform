'use client';

import { useState } from 'react';
import { FileText, Copy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EssayGenerator() {
    const [topic, setTopic] = useState('');
    const [paragraphs, setParagraphs] = useState('3');
    const [essay, setEssay] = useState('');

    const generateEssay = () => {
        if (!topic.trim()) {
            alert('Please enter a topic');
            return;
        }

        const numParagraphs = parseInt(paragraphs) || 3;

        const introduction = `Introduction:\n\nThe topic of "${topic}" has gained significant attention in recent years. This essay explores various aspects of ${topic}, examining its importance, implications, and potential impact on society. Understanding ${topic} is crucial for students and professionals alike, as it plays a vital role in shaping our perspectives and decisions.`;

        const bodyParagraphs = [];
        const aspects = [
            'Historical Context and Background',
            'Current Trends and Developments',
            'Key Challenges and Opportunities',
            'Future Implications',
            'Practical Applications',
        ];

        for (let i = 0; i < Math.min(numParagraphs - 2, aspects.length); i++) {
            bodyParagraphs.push(
                `\n\n${aspects[i]}:\n\nWhen discussing ${topic}, it is essential to consider ${aspects[i].toLowerCase()}. This aspect reveals important insights into how ${topic} affects various stakeholders. Research suggests that understanding this dimension can lead to more informed decision-making and better outcomes. The significance of this cannot be overstated, as it forms the foundation for further exploration.`
            );
        }

        const conclusion = `\n\nConclusion:\n\nIn conclusion, ${topic} represents a multifaceted subject that requires careful consideration and analysis. Through examining its various dimensions, we gain valuable insights into its significance and potential impact. As we move forward, it is imperative that we continue to study and understand ${topic} to make informed decisions and contribute positively to society. Further research and discussion on this topic will undoubtedly yield additional valuable perspectives.`;

        const fullEssay = introduction + bodyParagraphs.join('') + conclusion;
        setEssay(fullEssay);
    };

    const copyEssay = () => {
        navigator.clipboard.writeText(essay);
        alert('Essay copied to clipboard!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/tools"
                    className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 mb-6 font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                            <FileText className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Essay Generator</h1>
                            <p className="text-gray-600">Generate essay outlines and structures</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Essay Topic
                            </label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g., Impact of Technology on Education"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none text-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Number of Body Paragraphs
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={paragraphs}
                                onChange={(e) => setParagraphs(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none text-lg"
                            />
                        </div>

                        <button
                            onClick={generateEssay}
                            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg"
                        >
                            Generate Essay
                        </button>

                        {essay && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200 max-h-96 overflow-y-auto">
                                    <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-sans">
                                        {essay}
                                    </pre>
                                </div>

                                <button
                                    onClick={copyEssay}
                                    className="w-full px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
                                >
                                    <Copy className="w-5 h-5" />
                                    Copy Essay
                                </button>

                                <div className="p-4 bg-yellow-50 rounded-lg">
                                    <p className="text-sm text-gray-700">
                                        <strong>Note:</strong> This is a basic essay structure generator. Please customize and expand the content with your own research and insights for academic work.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
