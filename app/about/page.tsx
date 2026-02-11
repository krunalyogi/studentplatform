import { BookOpen, Target, Users, Heart } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">About Student Platform</h1>
                    <p className="text-xl text-gray-600">
                        Empowering students to achieve academic excellence
                    </p>
                </div>

                {/* Mission Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                            <Target className="w-6 h-6 text-primary-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                        Student Platform was created with a simple yet powerful mission: to provide students with free,
                        high-quality educational resources and tools that make learning easier and more effective. We believe
                        that every student deserves access to comprehensive study materials, expert guidance, and practical
                        tools that support their academic journey.
                    </p>
                </div>

                {/* What We Offer */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-secondary-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">What We Offer</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">📚 Comprehensive Study Notes</h3>
                            <p className="text-gray-700">
                                Access detailed notes across various subjects including Programming, Mathematics, Science, and more.
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">✍️ Expert Blog Articles</h3>
                            <p className="text-gray-700">
                                Read insightful articles on career guidance, study hacks, productivity tips, and academic success strategies.
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">🛠️ Powerful Student Tools</h3>
                            <p className="text-gray-700">
                                Use 10+ free calculators and utilities including GPA calculator, attendance tracker, word counter, and more.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Our Values */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                            <Heart className="w-6 h-6 text-accent-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Our Values</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border-l-4 border-primary-500 bg-primary-50">
                            <h3 className="font-semibold text-gray-900 mb-2">Quality</h3>
                            <p className="text-gray-700 text-sm">We provide accurate, well-researched content that students can trust.</p>
                        </div>
                        <div className="p-4 border-l-4 border-secondary-500 bg-secondary-50">
                            <h3 className="font-semibold text-gray-900 mb-2">Accessibility</h3>
                            <p className="text-gray-700 text-sm">All our resources are completely free and accessible to everyone.</p>
                        </div>
                        <div className="p-4 border-l-4 border-accent-500 bg-accent-50">
                            <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
                            <p className="text-gray-700 text-sm">We continuously develop new tools and features to support modern learning.</p>
                        </div>
                        <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                            <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
                            <p className="text-gray-700 text-sm">We build a supportive community where students can learn and grow together.</p>
                        </div>
                    </div>
                </div>

                {/* Team */}
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl shadow-lg p-8 text-white text-center">
                    <Users className="w-12 h-12 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
                    <p className="text-white/90 mb-6">
                        Thousands of students are already using our platform to excel in their studies.
                        Join us today and take your learning to the next level!
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        Get In Touch
                    </a>
                </div>
            </div>
        </div>
    );
}
