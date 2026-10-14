// pages/PrivacyPolicyPage.jsx — OmniConnect Privacy Policy
import React from 'react';
import { Link } from 'react-router-dom';
import LegalLayout from '../components/layout/LegalLayout';
import {
  ShieldCheck,
  Lock,
  Database,
  Globe,
  Trash2,
  Mail,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  Layers,
  MessageSquare,
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="OmniConnect Privacy Policy"
      subtitle="This Privacy Policy describes how OmniConnect collects, uses, stores, and protects personal and messaging data when you use our multi-channel communication platform."
      lastUpdated="October 14, 2026"
    >
      <div className="space-y-8">
        {/* Quick Highlights Card */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 sm:p-6 text-slate-800">
          <div className="flex items-center gap-2.5 font-bold text-blue-900 text-sm sm:text-base mb-3">
            <ShieldCheck className="text-blue-600 shrink-0" size={20} />
            <span>Key Privacy Commitments</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>No Data Selling:</strong> We never sell, rent, or monetize your contact data or message content to advertisers or data brokers.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Encrypted & Protected:</strong> All passwords are salted & hashed with bcrypt, and communication is enforced over TLS/HTTPS.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Full Data Control:</strong> You can disconnect Meta and WhatsApp integrations or request complete data deletion at any time.
              </span>
            </div>
          </div>
        </div>

        {/* Section 1 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
              1
            </span>
            Introduction & Platform Overview
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              OmniConnect ("we", "our", or "us") provides a unified multi-channel messaging inbox and customer relationship management (CRM) application accessible at{' '}
              <a href="https://frontendomniconnect.vercel.app" className="text-blue-600 font-medium hover:underline">
                https://frontendomniconnect.vercel.app
              </a>.
            </p>
            <p>
              OmniConnect connects business communications across three primary channels:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>Facebook Messenger:</strong> Via official Meta Graph API Pages Messaging endpoints.</li>
              <li><strong>Instagram Direct Messaging:</strong> Via official Meta Graph API Instagram Messaging endpoints.</li>
              <li><strong>WhatsApp Cloud API:</strong> Via official Meta WhatsApp Business Platform Cloud API endpoints.</li>
            </ul>
            <p>
              By accessing or using OmniConnect, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
              2
            </span>
            Information We Collect
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-4">
            <p>
              We collect only the information necessary to provide, synchronize, and operate your business messaging services. Specifically:
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <h3 className="font-semibold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
                  <KeyRound size={16} className="text-slate-600" />
                  A. User Account Information
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  When you register for an OmniConnect account, we collect your full name, email address, encrypted password credential (hashed with bcrypt), workspace name, and subscription tier.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <h3 className="font-semibold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
                  <Globe size={16} className="text-blue-600" />
                  B. Meta Platform Data (Facebook Pages & Instagram Accounts)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-2">
                  When you connect a Facebook Page or Instagram Business account using Facebook Login for Business, we request authorization for the following specific Meta permissions:
                </p>
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {[
                    'pages_show_list',
                    'pages_read_engagement',
                    'pages_manage_metadata',
                    'pages_messaging',
                    'instagram_basic',
                    'instagram_manage_messages',
                  ].map((scope) => (
                    <code key={scope} className="text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200 font-mono text-slate-700">
                      {scope}
                    </code>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Through these permissions, we collect:
                </p>
                <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-1 mt-1">
                  <li><strong>Facebook Page Information:</strong> Page ID, Page Name, category, picture URL, and Page Access Tokens required to send and receive Messenger messages.</li>
                  <li><strong>Instagram Professional Information:</strong> Instagram Business Account ID (<code className="font-mono text-xs">ig_...</code>), linked Facebook Page ID, Instagram username (<code className="font-mono text-xs">@username</code>), and profile picture URL.</li>
                  <li><strong>Messages & Inbound Events:</strong> Message IDs (<code className="font-mono text-xs">mid</code>), timestamps, text content, media attachment links (images, videos, audio), sender Page-Scoped IDs (PSID) or Instagram-Scoped User IDs (IGSID), and delivery/read receipts.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <h3 className="font-semibold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
                  <MessageSquare size={16} className="text-emerald-600" />
                  C. WhatsApp Cloud API Data
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  When you configure your WhatsApp Business Account, we store your WhatsApp Business Account ID (WABA ID), Phone Number ID, display phone number, and WhatsApp System User Access Token. We process incoming and outgoing WhatsApp messages, WhatsApp Message IDs (<code className="font-mono text-xs">wamid</code>), message templates, and delivery status receipts (sent, delivered, read, failed).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <h3 className="font-semibold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
                  <Database size={16} className="text-purple-600" />
                  D. CRM Customer & Contact Records
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  To provide contact management, we store customer profile names, phone numbers or platform identifiers, channel attribution (<code className="font-mono text-xs">whatsapp</code>, <code className="font-mono text-xs">facebook</code>, or <code className="font-mono text-xs">instagram</code>), contact tags (e.g., Lead, Customer, VIP), and last interaction timestamps.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
              3
            </span>
            How We Use Your Information
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3">
            <p>We use collected data solely for the following explicit operational purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>Displaying and organizing customer conversations in a real-time unified inbox.</li>
              <li>Sending responses, media messages, and approved broadcast templates through Meta APIs.</li>
              <li>Verifying delivery status and read receipts through Meta webhook notifications.</li>
              <li>Maintaining contact lists, tags, and conversation history for your business team.</li>
              <li>Authenticating user sessions and safeguarding workspace access.</li>
            </ul>
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl text-amber-900 text-xs sm:text-sm mt-3">
              <strong>Strict Data Boundaries:</strong> OmniConnect does not sell, rent, lease, or disclose customer personal data or message content to advertisers, data brokers, or external commercial entities. We do not use customer conversation content to train artificial intelligence or machine learning models without explicit authorization.
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
              4
            </span>
            Data Storage, Protection, and Security
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-4">
            <p>
              We employ strict industry-standard technical and operational safeguards to secure all stored information:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Database size={15} className="text-blue-600" />
                  Database Protection
                </div>
                <p className="text-slate-600">
                  Data is stored in managed PostgreSQL databases hosted on Supabase with Row Level Security (RLS) enforcement.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Lock size={15} className="text-emerald-600" />
                  Password Hashing
                </div>
                <p className="text-slate-600">
                  All user passwords are cryptographically salted and hashed using bcrypt (12 rounds) before storage. Plaintext passwords are never stored.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Layers size={15} className="text-purple-600" />
                  In-Transit Encryption
                </div>
                <p className="text-slate-600">
                  All communication between browser, backend servers, Supabase, and Meta Graph API is encrypted using TLS/HTTPS (SSL).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-amber-600" />
                  HMAC Webhook Verification
                </div>
                <p className="text-slate-600">
                  All Meta webhook payloads are cryptographically verified using HMAC-SHA256 signatures against the Meta App Secret.
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              <strong>Token Isolation:</strong> Access tokens (Page Access Tokens, WhatsApp System User Tokens) are securely stored in server environment variables and database records. Public configuration endpoints never expose application secrets or access tokens to the client browser.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
              5
            </span>
            Data Retention & Deletion
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              We retain account data and message logs only for as long as your workspace account remains active to provide continuous conversation context for your customer service operations.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>Temporary OAuth Sessions:</strong> Temporary OAuth state sessions automatically expire and are purged within 15 minutes.</li>
              <li><strong>Channel Disconnection:</strong> When you disconnect a Facebook Page, Instagram account, or WhatsApp number from OmniConnect Settings, the stored access tokens are immediately deleted from active storage.</li>
              <li><strong>Account Deletion:</strong> When an account is deleted, all associated user data, contacts, and messages are permanently purged from our Supabase database within 30 days.</li>
            </ul>
          </div>
        </section>

        {/* Section 6 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
              6
            </span>
            Third-Party Subprocessors
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              OmniConnect partners with trusted infrastructure providers to deliver its services:
            </p>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-semibold text-slate-900">Meta Platforms, Inc.</span>
                <span className="text-slate-500">Facebook Graph API, Instagram Graph API, WhatsApp Cloud API</span>
              </div>
              <div className="p-3.5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-semibold text-slate-900">Supabase, Inc.</span>
                <span className="text-slate-500">Managed PostgreSQL database hosting and real-time syncing</span>
              </div>
              <div className="p-3.5 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-semibold text-slate-900">Vercel, Inc.</span>
                <span className="text-slate-500">Frontend and serverless cloud deployment infrastructure</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
              7
            </span>
            Meta Platform Compliance & User Data Deletion Instructions
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-4">
            <p>
              In compliance with the Meta Platform Terms, users have full control over their Meta account data connected to OmniConnect (Meta App ID: <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">1805149667346137</code>).
            </p>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                <Trash2 size={16} className="text-red-600" />
                How to Remove OmniConnect and Delete Your Data:
              </h3>
              <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
                <li>Log in to your Facebook account and open <strong>Settings & Privacy &gt; Settings</strong>.</li>
                <li>In the left sidebar, navigate to <strong>Apps and Websites</strong>.</li>
                <li>Find <strong>OmniConnect</strong> in your active apps list and click <strong>Remove</strong>.</li>
                <li>
                  To request complete deletion of any messages, contacts, or tokens stored during your usage, visit our dedicated{' '}
                  <Link to="/data-deletion" className="text-blue-600 font-semibold hover:underline">
                    Meta Data Deletion Instructions page
                  </Link>{' '}
                  or email{' '}
                  <a href="mailto:javedabuzar969@gmail.com" className="text-blue-600 font-medium hover:underline">
                    javedabuzar969@gmail.com
                  </a>{' '}
                  with the subject <em>"Meta Data Deletion Request"</em>.
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Section 8 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
              8
            </span>
            Contact Information & Project Transparency
          </h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-4">
            <p>
              If you have any questions, feedback, or formal data protection requests regarding this Privacy Policy or your personal information, please contact:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm text-slate-800">
              <div><strong>Project Name:</strong> OmniConnect Multi-Channel Messaging Platform</div>
              <div><strong>Lead Developer & Administrator:</strong> Abuzar Javed</div>
              <div>
                <strong>Primary Privacy & Support Email:</strong>{' '}
                <a href="mailto:javedabuzar969@gmail.com" className="text-blue-600 font-medium hover:underline">
                  javedabuzar969@gmail.com
                </a>
              </div>
              <div>
                <strong>Secondary Contact Email:</strong>{' '}
                <a href="mailto:abuzarjaved@gmail.com" className="text-blue-600 font-medium hover:underline">
                  abuzarjaved@gmail.com
                </a>
              </div>
            </div>

            {/* Transparency Note */}
            <div className="flex items-start gap-2.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs">
              <AlertCircle size={16} className="text-slate-400 shrink-0 mt-0.5" />
              <span>
                <strong>Transparency Notice:</strong> OmniConnect is an independent software application developed and maintained by Abuzar Javed. Currently, the project does not have a separate corporate entity, physical headquarters address, or a dedicated Data Protection Officer (DPO). All privacy, deletion, and support requests are processed directly via the verified contact emails listed above.
              </span>
            </div>
          </div>
        </section>
      </div>
    </LegalLayout>
  );
}
