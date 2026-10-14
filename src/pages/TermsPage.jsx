// pages/TermsPage.jsx — OmniConnect Terms of Service
import React from 'react';
import { Link } from 'react-router-dom';
import LegalLayout from '../components/layout/LegalLayout';
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  HelpCircle,
  Mail,
  Scale,
  Ban,
  Clock,
  ExternalLink,
} from 'lucide-react';

export default function TermsPage() {
  return (
    <LegalLayout
      title="OmniConnect Terms of Service"
      subtitle="These Terms of Service govern your access to and use of the OmniConnect platform, including integrations with Facebook Messenger, Instagram Direct, and WhatsApp Cloud API."
      lastUpdated="October 14, 2026"
    >
      <div className="space-y-8">
        {/* Important Warning Banner */}
        <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-5 sm:p-6 text-slate-800">
          <div className="flex items-center gap-2.5 font-bold text-amber-900 text-sm sm:text-base mb-2">
            <AlertTriangle className="text-amber-600 shrink-0" size={20} />
            <span>Important Notice Regarding Messaging Policies & Anti-Spam</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            By using OmniConnect to send messages via WhatsApp, Facebook Messenger, or Instagram, you agree to strictly comply with Meta's official Platform Policies, WhatsApp Business Messaging Policies, and all applicable anti-spam laws. Unsolicited marketing, spam, or non-consensual bulk messaging is strictly prohibited and will result in immediate account termination.
          </p>
        </div>

        {/* Section 1 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
              1
            </span>
            Acceptance of Terms
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              These Terms of Service ("Terms") constitute a legally binding agreement between you ("User", "you", or "your") and OmniConnect ("OmniConnect", "we", "us", or "our"), governing your access to and use of our web application located at{' '}
              <a href="https://frontendomniconnect.vercel.app" className="text-blue-600 font-medium hover:underline">
                https://frontendomniconnect.vercel.app
              </a>{' '}
              and associated backend services.
            </p>
            <p>
              By creating an account, logging in, or using any feature of OmniConnect, you signify your full agreement to these Terms and our{' '}
              <Link to="/privacy" className="text-blue-600 font-semibold hover:underline">
                Privacy Policy
              </Link>. If you do not agree to these Terms, you must not access or use OmniConnect.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
              2
            </span>
            Description of the Service
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              OmniConnect is a cloud-based multi-channel communication platform designed for businesses to manage conversations across:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>WhatsApp Cloud API:</strong> Connecting WhatsApp Business Accounts (WABA) for direct two-way messaging and broadcast campaigns.</li>
              <li><strong>Facebook Messenger:</strong> Connecting authorized Facebook Pages for managing customer inquiries.</li>
              <li><strong>Instagram Direct Messaging:</strong> Connecting authorized Instagram Professional / Business accounts for managing direct message conversations.</li>
              <li><strong>Contacts & CRM:</strong> Centralizing customer records, interaction tags, and multi-channel communication logs.</li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
              3
            </span>
            User Account & Security Responsibilities
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3">
            <p>To use OmniConnect, you must create a registered account. You agree to:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>Provide accurate, current, and complete registration information.</li>
              <li>Maintain the confidentiality of your account password and API access credentials.</li>
              <li>Immediately notify OmniConnect of any unauthorized access or security breach.</li>
              <li>Accept sole responsibility for all activities, messages, and broadcasts initiated under your account credentials.</li>
            </ul>
          </div>
        </section>

        {/* Section 4 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
              4
            </span>
            Meta Platform Adherence & Anti-Spam Compliance
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-4">
            <p>
              OmniConnect interacts with Meta Platforms, Inc. APIs. You explicitly agree to adhere to all governing third-party policies:
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="font-semibold text-slate-900 text-sm mb-1">
                  A. WhatsApp Business Messaging Policy
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  You must obtain prior explicit opt-in consent from recipients before sending business-initiated WhatsApp messages. Outbound messages outside customer-initiated 24-hour service windows must use pre-approved Meta message templates. Sending spam, mass unsolicited marketing, or violating WhatsApp quality rating thresholds is strictly prohibited.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="font-semibold text-slate-900 text-sm mb-1">
                  B. Facebook Messenger 24-Hour Messaging Window
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  In compliance with Meta Messenger policies, standard business responses may only be sent within 24 hours of a customer's last message. Messages sent outside this window must comply with Meta's allowed Message Tags or Sponsored Messages guidelines.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="font-semibold text-slate-900 text-sm mb-1">
                  C. Instagram Messaging Guidelines
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  You agree to use Instagram messaging features in strict compliance with the Instagram Community Guidelines and Meta Developer Policies.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-red-50/70 border border-red-200/80 text-red-950 text-xs sm:text-sm">
              <div className="font-bold flex items-center gap-1.5 mb-1 text-red-900">
                <Ban size={16} className="text-red-600" />
                Prohibited Conduct:
              </div>
              <ul className="list-disc pl-5 space-y-1 text-red-900">
                <li>Sending unsolicited bulk advertisements, deceptive promotions, or spam.</li>
                <li>Transmitting malicious files, viruses, or phishing links.</li>
                <li>Harassing, threatening, or impersonating any person or organization.</li>
                <li>Attempting to bypass OmniConnect contact limits, security mechanisms, or API rate limitations.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
              5
            </span>
            Third-Party Services & Trademark Disclaimers
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              OmniConnect relies on third-party APIs provided by Meta Platforms, Inc. We do not control Meta's infrastructure, uptime, rate limits, or account review decisions. If Meta suspends or restricts your WhatsApp Business Account, Facebook Page, or Instagram account, OmniConnect is not responsible for any resulting service interruption.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 italic">
              Facebook, Messenger, Instagram, and WhatsApp are registered trademarks of Meta Platforms, Inc. OmniConnect is an independent multi-channel tool and is not affiliated with, sponsored by, or endorsed by Meta Platforms, Inc.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
              6
            </span>
            Account Suspension & Termination
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              You may stop using OmniConnect at any time and may request deletion of your account and stored data by contacting support or by visiting our{' '}
              <Link to="/data-deletion" className="text-blue-600 font-semibold hover:underline">
                Data Deletion Instructions page
              </Link>.
            </p>
            <p>
              We reserve the right to suspend or terminate your account immediately, without prior notice, if you breach these Terms, violate Meta platform policies, engage in spamming, or abuse system infrastructure.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
              7
            </span>
            Disclaimer of Warranties & Limitation of Liability
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              OmniConnect is provided on an "AS IS" and "AS AVAILABLE" basis, without express or implied warranties of any kind, including but not limited to merchantability, fitness for a particular purpose, non-infringement, or continuous availability.
            </p>
            <p>
              To the fullest extent permitted by applicable law, OmniConnect, its developers, and contributors shall not be liable for any direct, indirect, incidental, consequential, special, or exemplary damages, including lost profits, data loss, business interruption, or Meta account restrictions resulting from your use of the platform.
            </p>
          </div>
        </section>

        {/* Section 8 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
              8
            </span>
            Contact Information
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3">
            <p>For inquiries, support, or questions regarding these Terms of Service, please reach out directly:</p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-1.5">
              <div><strong>Project:</strong> OmniConnect Platform</div>
              <div><strong>Lead Developer:</strong> Abuzar Javed</div>
              <div>
                <strong>Primary Contact Email:</strong>{' '}
                <a href="mailto:javedabuzar969@gmail.com" className="text-blue-600 font-medium hover:underline">
                  javedabuzar969@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LegalLayout>
  );
}
