import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Terms of Service | Angkor Menu',
    description: 'Terms of Service for Angkor Menu - Read our terms and conditions for using our digital menu platform.',
};

export default function TermsOfServicePage() {
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
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Terms of Service</h1>
                    <p className="text-slate-500 mb-8">Last updated: {lastUpdated}</p>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">1. Agreement to Terms</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Welcome to Angkor Menu. These Terms of Service ("Terms") govern your access to and use of
                            our website, applications, and services (collectively, the "Services"). By accessing or
                            using our Services, you agree to be bound by these Terms and our Privacy Policy.
                        </p>
                        <p className="text-slate-600 leading-relaxed mt-4">
                            If you are using the Services on behalf of a business or organization, you represent that
                            you have the authority to bind that entity to these Terms.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">2. Description of Services</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Angkor Menu provides a digital menu and catalog platform that allows businesses to create,
                            manage, and share digital menus and product catalogs. Our Services include:
                        </p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                            <li>Digital menu and catalog creation and management</li>
                            <li>Multi-language support (including Khmer and English)</li>
                            <li>Multi-currency display (USD and KHR)</li>
                            <li>QR code generation for easy access</li>
                            <li>Analytics and insights (where available)</li>
                            <li>Social sharing capabilities</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">3. Account Registration</h2>

                        <h3 className="text-xl font-medium text-slate-800 mt-6 mb-3">3.1 Account Creation</h3>
                        <p className="text-slate-600 leading-relaxed">
                            To use certain features of our Services, you must create an account. Account creation is
                            managed through direct contact with our team. You agree to provide accurate, current, and
                            complete information during the registration process.
                        </p>

                        <h3 className="text-xl font-medium text-slate-800 mt-6 mb-3">3.2 Account Security</h3>
                        <p className="text-slate-600 leading-relaxed">
                            You are responsible for maintaining the confidentiality of your account credentials and
                            for all activities that occur under your account. You agree to notify us immediately of
                            any unauthorized use of your account.
                        </p>

                        <h3 className="text-xl font-medium text-slate-800 mt-6 mb-3">3.3 Account Termination</h3>
                        <p className="text-slate-600 leading-relaxed">
                            We reserve the right to suspend or terminate your account at any time for violation of
                            these Terms or for any other reason at our sole discretion.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">4. User Content</h2>

                        <h3 className="text-xl font-medium text-slate-800 mt-6 mb-3">4.1 Your Content</h3>
                        <p className="text-slate-600 leading-relaxed">
                            You retain ownership of all content you upload to our Services ("User Content"), including
                            but not limited to menu items, product descriptions, images, logos, and business information.
                        </p>

                        <h3 className="text-xl font-medium text-slate-800 mt-6 mb-3">4.2 License to Us</h3>
                        <p className="text-slate-600 leading-relaxed">
                            By uploading User Content, you grant us a non-exclusive, worldwide, royalty-free license
                            to use, store, display, reproduce, and distribute your User Content solely for the purpose
                            of providing and improving our Services.
                        </p>

                        <h3 className="text-xl font-medium text-slate-800 mt-6 mb-3">4.3 Content Responsibilities</h3>
                        <p className="text-slate-600 leading-relaxed">You are solely responsible for your User Content and represent that:</p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                            <li>You own or have the necessary rights to use and authorize the use of your User Content</li>
                            <li>Your User Content does not infringe any third-party rights</li>
                            <li>Your User Content complies with all applicable laws and regulations</li>
                            <li>Your User Content is accurate and not misleading</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">5. Prohibited Conduct</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">You agree not to:</p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>Use the Services for any illegal purpose or in violation of any laws</li>
                            <li>Upload content that is defamatory, obscene, or harmful</li>
                            <li>Impersonate any person or entity</li>
                            <li>Interfere with or disrupt the Services or servers</li>
                            <li>Attempt to gain unauthorized access to any part of the Services</li>
                            <li>Use automated means to access the Services without our permission</li>
                            <li>Transmit viruses, malware, or other harmful code</li>
                            <li>Collect or harvest user information without consent</li>
                            <li>Use the Services to send spam or unsolicited communications</li>
                            <li>Reverse engineer or attempt to extract the source code of the Services</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">6. Intellectual Property</h2>

                        <h3 className="text-xl font-medium text-slate-800 mt-6 mb-3">6.1 Our Intellectual Property</h3>
                        <p className="text-slate-600 leading-relaxed">
                            The Services, including all content, features, and functionality (excluding User Content),
                            are owned by Angkor Menu and are protected by copyright, trademark, and other intellectual
                            property laws.
                        </p>

                        <h3 className="text-xl font-medium text-slate-800 mt-6 mb-3">6.2 Limited License</h3>
                        <p className="text-slate-600 leading-relaxed">
                            We grant you a limited, non-exclusive, non-transferable license to access and use the
                            Services for your business purposes in accordance with these Terms.
                        </p>

                        <h3 className="text-xl font-medium text-slate-800 mt-6 mb-3">6.3 Trademarks</h3>
                        <p className="text-slate-600 leading-relaxed">
                            "Angkor Menu" and our logo are trademarks of Angkor Menu. You may not use our trademarks
                            without our prior written consent.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">7. Payment Terms</h2>
                        <p className="text-slate-600 leading-relaxed">
                            If you subscribe to paid features of our Services:
                        </p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                            <li>Fees will be communicated to you before any charges are made</li>
                            <li>Payment terms will be agreed upon during account setup</li>
                            <li>All fees are non-refundable unless otherwise specified</li>
                            <li>We reserve the right to change our pricing with reasonable notice</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">8. Disclaimer of Warranties</h2>
                        <p className="text-slate-600 leading-relaxed">
                            THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
                            EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
                            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                        </p>
                        <p className="text-slate-600 leading-relaxed mt-4">
                            We do not warrant that the Services will be uninterrupted, error-free, or secure. We do
                            not warrant the accuracy, completeness, or usefulness of any information provided through
                            the Services.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">9. Limitation of Liability</h2>
                        <p className="text-slate-600 leading-relaxed">
                            TO THE MAXIMUM EXTENT PERMITTED BY LAW, ANGKOR MENU SHALL NOT BE LIABLE FOR ANY INDIRECT,
                            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR
                            REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL,
                            OR OTHER INTANGIBLE LOSSES.
                        </p>
                        <p className="text-slate-600 leading-relaxed mt-4">
                            Our total liability for any claims arising from or relating to these Terms or the Services
                            shall not exceed the amount you paid us in the twelve (12) months preceding the claim.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">10. Indemnification</h2>
                        <p className="text-slate-600 leading-relaxed">
                            You agree to indemnify, defend, and hold harmless Angkor Menu and its officers, directors,
                            employees, and agents from and against any claims, liabilities, damages, losses, and
                            expenses arising out of or in any way connected with your access to or use of the Services,
                            your User Content, or your violation of these Terms.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">11. Third-Party Services</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Our Services may contain links to or integrate with third-party websites, services, or
                            content. We are not responsible for the content, privacy policies, or practices of any
                            third-party services. Your use of third-party services is at your own risk.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">12. Modifications to Services</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We reserve the right to modify, suspend, or discontinue any part of the Services at any
                            time, with or without notice. We shall not be liable to you or any third party for any
                            modification, suspension, or discontinuation of the Services.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">13. Changes to Terms</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We may update these Terms from time to time. We will notify you of any material changes
                            by posting the new Terms on this page and updating the "Last updated" date. Your continued
                            use of the Services after any changes constitutes your acceptance of the new Terms.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">14. Governing Law</h2>
                        <p className="text-slate-600 leading-relaxed">
                            These Terms shall be governed by and construed in accordance with the laws of the Kingdom
                            of Cambodia, without regard to its conflict of law provisions. Any disputes arising from
                            these Terms shall be resolved in the courts of Cambodia.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">15. Severability</h2>
                        <p className="text-slate-600 leading-relaxed">
                            If any provision of these Terms is found to be unenforceable or invalid, that provision
                            shall be limited or eliminated to the minimum extent necessary, and the remaining
                            provisions shall remain in full force and effect.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">16. Entire Agreement</h2>
                        <p className="text-slate-600 leading-relaxed">
                            These Terms, together with our Privacy Policy, constitute the entire agreement between
                            you and Angkor Menu regarding the Services and supersede all prior agreements and
                            understandings.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">17. Contact Us</h2>
                        <p className="text-slate-600 leading-relaxed">
                            If you have any questions about these Terms of Service, please contact us:
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
                            © 2025 Angkor Menu. All rights reserved.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

