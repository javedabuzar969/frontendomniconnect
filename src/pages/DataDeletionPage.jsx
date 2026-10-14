// pages/DataDeletionPage.jsx — Meta User Data Deletion Instructions
import React, { useState } from 'react';
import LegalLayout from '../components/layout/LegalLayout';
import {
  Trash2,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Copy,
  ExternalLink,
  AlertCircle,
  Clock,
  Send,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function DataDeletionPage() {
  const [email, setEmail] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [copied, setCopied] = useState(false);

  const metaAppId = '1805149667346137';

  const sampleEmailBody = `Subject: OmniConnect User Data Deletion Request

Hello OmniConnect Support,

I am requesting the permanent deletion of all personal data, contact records, messages, and Meta/WhatsApp tokens associated with my account.

Account Details:
- Registered Email: ${email || '[Your Registered Email]'}
- Facebook Page / Instagram / WhatsApp ID: ${identifier || '[Your Page ID or Phone Number]'}

Please confirm once the data deletion process is complete.

Thank you.`;

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(sampleEmailBody);
    setCopied(true);
    toast.success('Deletion request template copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <LegalLayout
      title="User Data Deletion Instructions"
      subtitle="In compliance with Meta Platform Terms, this page explains how you can remove OmniConnect from your Facebook/Instagram accounts and request the complete deletion of your data from our servers."
      lastUpdated="October 14, 2026"
    >
      <div className="space-y-8">
        {/* Compliance Banner */}
        <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-5 sm:p-6 text-slate-800">
          <div className="flex items-center gap-2.5 font-bold text-emerald-950 text-sm sm:text-base mb-2">
            <ShieldCheck className="text-emerald-600 shrink-0" size={20} />
            <span>Meta Platform Compliance (App ID: {metaAppId})</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            OmniConnect respects your data privacy. In accordance with Facebook Platform Rules and GDPR/CCPA guidelines, you have the right to request the complete erasure of all personal data, Facebook Page access tokens, Instagram chat logs, and WhatsApp message histories collected through our service.
          </p>
        </div>

        {/* Step-by-Step Instructions */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
              1
            </span>
            How to Disconnect OmniConnect from Meta (Facebook & Instagram)
          </h2>

          <div className="space-y-4 text-sm text-slate-600">
            <p>
              To revoke OmniConnect's access to your Facebook Pages and Instagram accounts, follow these official Meta steps:
            </p>

            <ol className="list-decimal pl-5 space-y-2 text-slate-700 text-xs sm:text-sm">
              <li>
                Open Facebook in your web browser and click on your profile picture in the top right corner.
              </li>
              <li>
                Select <strong>Settings & Privacy</strong>, then click <strong>Settings</strong>.
              </li>
              <li>
                In the left-hand navigation menu, click on <strong>Apps and Websites</strong> (or visit{' '}
                <a
                  href="https://www.facebook.com/settings?tab=applications"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:underline inline-flex items-center gap-1"
                >
                  Facebook Apps and Websites Settings <ExternalLink size={12} />
                </a>).
              </li>
              <li>
                Locate <strong>OmniConnect</strong> (App ID: <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">{metaAppId}</code>) in the list of active applications.
              </li>
              <li>
                Click <strong>Remove</strong>. You may also select the option to delete all posts, videos, or events OmniConnect may have created on your behalf.
              </li>
              <li>
                Click <strong>Remove</strong> again to confirm. Meta will immediately revoke all access tokens granted to OmniConnect.
              </li>
            </ol>
          </div>
        </section>

        {/* Step 2: Request Deletion from Our Database */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
              2
            </span>
            How to Request Deletion of Your Stored Data from OmniConnect
          </h2>

          <div className="space-y-4 text-sm text-slate-600">
            <p>
              When you disconnect OmniConnect via Facebook, Meta revokes our tokens. To permanently purge all existing contacts, synchronized message threads, and account records from our Supabase database:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Clock size={15} className="text-blue-600" />
                  30-Day Purge SLA
                </div>
                <p className="text-slate-600">
                  All stored messages, customer records, and tokens are permanently erased from our active database within 30 days of receiving your request.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-emerald-600" />
                  Written Confirmation
                </div>
                <p className="text-slate-600">
                  Our team will reply to your request email confirming completion with a confirmation reference code.
                </p>
              </div>
            </div>

            <div className="mt-4 p-5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-semibold text-slate-900 text-sm mb-2 flex items-center gap-2">
                <Mail size={16} className="text-blue-600" />
                Submit a Deletion Request:
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-4">
                Send an email to our verified support address with your account information:
              </p>

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Registered Email (Optional helper):
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. you@example.com"
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Connected Page ID / Phone (Optional helper):
                    </label>
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. Facebook Page ID or WhatsApp number"
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="relative mt-3">
                  <pre className="text-xs bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto font-mono whitespace-pre-wrap">
                    {sampleEmailBody}
                  </pre>
                  <button
                    type="button"
                    onClick={handleCopyTemplate}
                    className="absolute top-3 right-3 px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Copy size={13} />
                    <span>{copied ? 'Copied!' : 'Copy Template'}</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-slate-500">
                    Send to: <strong className="text-slate-800">javedabuzar969@gmail.com</strong>
                  </span>
                  <a
                    href={`mailto:javedabuzar969@gmail.com?subject=OmniConnect%20User%20Data%20Deletion%20Request&body=${encodeURIComponent(
                      sampleEmailBody
                    )}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0066ff] hover:bg-[#0055d4] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Send size={13} />
                    <span>Open in Email Client</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Data Categories Deleted */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
              3
            </span>
            What Data is Erased Upon Deletion
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3">
            <p>Upon receiving and verifying a data deletion request, OmniConnect permanently removes:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs sm:text-sm">
              <li><strong>User Account & Workspace Records:</strong> User email, hashed password, profile information, and workspace configuration.</li>
              <li><strong>Meta & WhatsApp Tokens:</strong> All stored Facebook Page access tokens, user access tokens, and WhatsApp Cloud API system tokens.</li>
              <li><strong>Message Logs & Payloads:</strong> All stored incoming and outgoing Messenger messages, Instagram Direct messages, WhatsApp messages, and raw webhook audit records.</li>
              <li><strong>Contact Records:</strong> All customer contact entries, phone numbers, Page-Scoped IDs (PSID), Instagram-Scoped IDs (IGSID), and assigned tags.</li>
            </ul>
          </div>
        </section>

        {/* Support Contact */}
        <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-slate-700 text-xs sm:text-sm space-y-2">
          <div className="font-bold text-slate-900 text-sm">Need Help with Data Deletion?</div>
          <p>
            For any questions regarding Meta data deletion or to check the status of an existing deletion request, contact lead developer Abuzar Javed at{' '}
            <a href="mailto:javedabuzar969@gmail.com" className="text-blue-600 font-medium hover:underline">
              javedabuzar969@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
