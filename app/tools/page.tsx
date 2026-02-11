import Link from 'next/link';
import {
    Calculator,
    Calendar,
    Clock,
    FileText,
    Lightbulb,
    CalendarRange,
    Ruler,
    Type,
    Percent,
    GraduationCap
} from 'lucide-react';

export default function ToolsPage() {
    const tools = [
        {
            id: 1,
            name: 'CGPA Calculator',
            description: 'Convert your CGPA to percentage with standard formulas',
            icon: GraduationCap,
            path: '/tools/cgpa-calculator',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            id: 2,
            name: 'GPA Calculator',
            description: 'Calculate your Grade Point Average across multiple subjects',
            icon: Calculator,
            path: '/tools/gpa-calculator',
            color: 'from-purple-500 to-pink-500',
        },
        {
            id: 3,
            name: 'Attendance Calculator',
            description: 'Track your attendance percentage and classes needed',
            icon: Percent,
            path: '/tools/attendance-calculator',
            color: 'from-green-500 to-emerald-500',
        },
        {
            id: 4,
            name: 'Age Calculator',
            description: 'Calculate your exact age in years, months, and days',
            icon: Calendar,
            path: '/tools/age-calculator',
            color: 'from-orange-500 to-red-500',
        },
        {
            id: 5,
            name: 'Countdown Timer',
            description: 'Set countdown for exams, deadlines, and important events',
            icon: Clock,
            path: '/tools/countdown-timer',
            color: 'from-indigo-500 to-blue-500',
        },
        {
            id: 6,
            name: 'Essay Generator',
            description: 'Generate essay outlines and paragraph structures',
            icon: FileText,
            path: '/tools/essay-generator',
            color: 'from-yellow-500 to-orange-500',
        },
        {
            id: 7,
            name: 'Notes Summarizer',
            description: 'Convert long notes into concise bullet-point summaries',
            icon: Lightbulb,
            path: '/tools/notes-summarizer',
            color: 'from-rose-500 to-pink-500',
        },
        {
            id: 8,
            name: 'Timetable Generator',
            description: 'Create your weekly study schedule automatically',
            icon: CalendarRange,
            path: '/tools/timetable-generator',
            color: 'from-teal-500 to-cyan-500',
        },
        {
            id: 9,
            name: 'Unit Converter',
            description: 'Convert between different units of measurement',
            icon: Ruler,
            path: '/tools/unit-converter',
            color: 'from-violet-500 to-purple-500',
        },
        {
            id: 10,
            name: 'Word Counter',
            description: 'Count words, characters, and estimate reading time',
            icon: Type,
            path: '/tools/word-counter',
            color: 'from-amber-500 to-yellow-500',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full mb-4">
                        <Calculator className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Student Tools</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Powerful calculators and utilities designed to make student life easier
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tools.map((tool) => (
                        <Link key={tool.id} href={tool.path}>
                            <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group card-hover">
                                <div className={`h-2 bg-gradient-to-r ${tool.color}`}></div>
                                <div className="p-6">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <tool.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                        {tool.name}
                                    </h3>
                                    <p className="text-gray-600">{tool.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Need More Tools?
                    </h2>
                    <p className="text-white/90 mb-6 text-lg">
                        We're constantly adding new tools to help students. Have a suggestion?
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
}
