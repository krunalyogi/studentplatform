export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
                    <p className="text-sm text-gray-600 mb-8">Last updated: January 31, 2026</p>

                    <div className="prose prose-lg max-w-none space-y-6">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-700 leading-relaxed">
                                By accessing and using Student Platform, you accept and agree to be bound by the terms and provisions
                                of this agreement. If you do not agree to these terms, please do not use our platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                Permission is granted to temporarily access the materials (information, notes, tools) on Student Platform
                                for personal, non-commercial use only. This license shall automatically terminate if you violate any of
                                these restrictions.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                You may not:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li>Modify or copy the materials</li>
                                <li>Use the materials for commercial purposes</li>
                                <li>Attempt to decompile or reverse engineer any software</li>
                                <li>Remove any copyright or proprietary notations</li>
                                <li>Transfer the materials to another person</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Educational Content</h2>
                            <p className="text-gray-700 leading-relaxed">
                                All notes, articles, and educational content provided on this platform are for informational and
                                educational purposes only. While we strive for accuracy, we make no guarantees about the completeness
                                or accuracy of the content. Users should verify information independently.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Student Tools</h2>
                            <p className="text-gray-700 leading-relaxed">
                                The calculators and tools provided are for general guidance only. Results should be verified independently.
                                We are not responsible for any decisions made based on tool outputs.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User Conduct</h2>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                You agree not to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li>Use the platform for any unlawful purpose</li>
                                <li>Attempt to gain unauthorized access to any systems</li>
                                <li>Interfere with or disrupt the platform's operation</li>
                                <li>Upload malicious code or viruses</li>
                                <li>Impersonate any person or entity</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
                            <p className="text-gray-700 leading-relaxed">
                                The content, organization, graphics, design, and other matters related to Student Platform are protected
                                under applicable copyrights and other proprietary laws. Copying, redistribution, or publication of any
                                such matters is strictly prohibited.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Disclaimer</h2>
                            <p className="text-gray-700 leading-relaxed">
                                The materials on Student Platform are provided on an 'as is' basis. We make no warranties, expressed or
                                implied, and hereby disclaim all other warranties including, without limitation, implied warranties or
                                conditions of merchantability, fitness for a particular purpose, or non-infringement.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitations</h2>
                            <p className="text-gray-700 leading-relaxed">
                                In no event shall Student Platform or its suppliers be liable for any damages (including, without
                                limitation, damages for loss of data or profit, or due to business interruption) arising out of the use
                                or inability to use the materials on this platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Revisions</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We may revise these terms of service at any time without notice. By using this platform, you are agreeing
                                to be bound by the current version of these terms of service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
                            <p className="text-gray-700 leading-relaxed">
                                If you have any questions about these Terms of Service, please contact us at:
                                <a href="mailto:legal@studentplatform.com" className="text-primary-600 hover:underline ml-1">
                                    legal@studentplatform.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
