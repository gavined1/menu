import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Privacy Policy | Angkor Menu',
    description: 'Privacy Policy for Angkor Menu - Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
    const lastUpdated = 'December 2, 2024';

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white">
                <div className="max-w-4xl mx-auto px-6 py-6">
                    <Link
                        href="/"
                        className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="prose prose-slate max-w-none">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
                    <p className="text-slate-500 mb-8">Last updated: {lastUpdated}</p>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">1. Introduction</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Welcome to Angkor Menu ("we," "our," or "us"). We are committed to protecting your privacy
                            and ensuring the security of your personal information. This Privacy Policy explains how we
                            collect, use, disclose, and safeguard your information when you use our digital menu and
                            catalog platform services.
                        </p>
                        <p className="text-slate-600 leading-relaxed mt-4">
                            By accessing or using Angkor Menu, you agree to the terms of this Privacy Policy. If you
                            do not agree with our policies and practices, please do not use our services.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">2. Information We Collect</h2>

                        <h3 className="text-xl font-medium text-slate-800 mt-6 mb-3">2.1 Information You Provide</h3>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, phone number, and business information.</li>
                            <li><strong>Business Data:</strong> Information about your business including business name, address, logo, and menu/catalog items.</li>
                            <li><strong>Payment Information:</strong> If applicable, payment details processed through secure third-party payment processors.</li>
                            <li><strong>Communications:</strong> Records of your communications with us, including support requests and feedback.</li>
                        </ul>

                        <h3 className="text-xl font-medium text-slate-800 mt-6 mb-3">2.2 Information Collected Automatically</h3>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li><strong>Usage Data:</strong> Information about how you interact with our platform, including pages visited, features used, and time spent.</li>
                            <li><strong>Device Information:</strong> Device type, operating system, browser type, and unique device identifiers.</li>
                            <li><strong>Location Data:</strong> General geographic location based on IP address.</li>
                            <li><strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking technologies to enhance your experience.</li>
                        </ul>

                        <h3 className="text-xl font-medium text-slate-800 mt-6 mb-3">2.3 Information from End Users</h3>
                        <p className="text-slate-600 leading-relaxed">
                            When customers view your digital menu or catalog, we may collect anonymous usage statistics
                            to help you understand customer behavior. We do not collect personal information from your
                            customers unless they voluntarily provide it.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">3. How We Use Your Information</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">We use the collected information for the following purposes:</p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>To provide, maintain, and improve our services</li>
                            <li>To process transactions and manage your account</li>
                            <li>To communicate with you about updates, features, and support</li>
                            <li>To personalize your experience on our platform</li>
                            <li>To analyze usage patterns and improve our platform</li>
                            <li>To detect, prevent, and address technical issues and security threats</li>
                            <li>To comply with legal obligations</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">4. Information Sharing and Disclosure</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">We do not sell your personal information. We may share your information in the following circumstances:</p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li><strong>Service Providers:</strong> With trusted third-party vendors who assist us in operating our platform (e.g., hosting, analytics, payment processing).</li>
                            <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority.</li>
                            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
                            <li><strong>With Your Consent:</strong> When you have given us explicit permission to share your information.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">5. Data Security</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We implement industry-standard security measures to protect your information, including:
                        </p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                            <li>Encryption of data in transit using SSL/TLS</li>
                            <li>Secure data storage with access controls</li>
                            <li>Regular security assessments and updates</li>
                            <li>Row Level Security (RLS) for database access</li>
                        </ul>
                        <p className="text-slate-600 leading-relaxed mt-4">
                            While we strive to protect your information, no method of transmission over the Internet
                            is 100% secure. We cannot guarantee absolute security.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">6. Data Retention</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We retain your information for as long as your account is active or as needed to provide
                            you services. We may retain certain information as required by law or for legitimate
                            business purposes, such as resolving disputes and enforcing our agreements.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">7. Your Rights and Choices</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">You have the following rights regarding your personal information:</p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li><strong>Access:</strong> Request access to your personal information we hold.</li>
                            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
                            <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal requirements.</li>
                            <li><strong>Data Portability:</strong> Request a copy of your data in a portable format.</li>
                            <li><strong>Opt-out:</strong> Opt out of marketing communications at any time.</li>
                        </ul>
                        <p className="text-slate-600 leading-relaxed mt-4">
                            To exercise these rights, please contact us at{' '}
                            <a href="mailto:hello@gavined.com" className="text-orange-600 hover:text-orange-700">
                                hello@gavined.com
                            </a>.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">8. Cookies Policy</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            We use cookies and similar technologies to:
                        </p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>Remember your preferences and settings</li>
                            <li>Understand how you use our platform</li>
                            <li>Improve our services based on usage patterns</li>
                            <li>Provide personalized content</li>
                        </ul>
                        <p className="text-slate-600 leading-relaxed mt-4">
                            You can control cookies through your browser settings. Note that disabling cookies may
                            affect the functionality of our platform.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">9. International Data Transfers</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Our services are primarily operated from Cambodia. If you access our services from outside
                            Cambodia, your information may be transferred to and processed in Cambodia or other
                            countries where our service providers are located. By using our services, you consent to
                            such transfers.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">10. Children's Privacy</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Our services are not directed to individuals under the age of 18. We do not knowingly
                            collect personal information from children. If we become aware that we have collected
                            personal information from a child, we will take steps to delete such information.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">11. Changes to This Policy</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of any material
                            changes by posting the new Privacy Policy on this page and updating the "Last updated"
                            date. We encourage you to review this Privacy Policy periodically.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">12. Contact Us</h2>
                        <p className="text-slate-600 leading-relaxed">
                            If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                        </p>
                        <ul className="list-none pl-0 text-slate-600 space-y-2 mt-4">
                            <li><strong>Email:</strong>{' '}
                                <a href="mailto:hello@gavined.com" className="text-orange-600 hover:text-orange-700">
                                    hello@gavined.com
                                </a>
                            </li>
                            <li><strong>Telegram:</strong>{' '}
                                <a href="https://t.me/gavined" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700">
                                    @gavined
                                </a>
                            </li>
                        </ul>
                    </section>

                    <div className="border-t border-slate-200 pt-8 mt-12">
                        <p className="text-slate-500 text-sm">
                            © {new Date().getFullYear()} Angkor Menu. All rights reserved.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

