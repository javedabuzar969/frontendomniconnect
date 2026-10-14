// components/layout/LegalLayout.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, FileText, Trash2, ArrowLeft, ExternalLink, Mail } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function LegalLayout({ title, subtitle, lastUpdated, children }) {
  const location = useLocation();
  const { user } = useAuth();

  const navLinks = [
    { to: '/privacy', label: 'Privacy Policy', icon: ShieldCheck },
    { to: '/terms', label: 'Terms of Service', icon: FileText },
    { to: '/data-deletion', label: 'Data Deletion', icon: Trash2 },
  ];

  return (
    <div className="h-full w-full overflow-y-auto bg-[#fafafa] text-slate-900 font-sans selection:bg-[#25D366]/20 selection:text-slate-900">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to={user ? '/home' : '/login'}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <span className="text-[22px] sm:text-[24px] font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                OmniConnect
              </span>
            </Link>
            <span className="hidden sm:inline-block px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 rounded-full border border-slate-200">
              Legal Center
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="hidden md:block h-4 w-px bg-slate-200 mx-1" />

            <Link
              to={user ? '/home' : '/login'}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0066ff] hover:bg-[#0055d4] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <span>{user ? 'Back to App' : 'Sign In'}</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Page Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Title Header Banner */}
        <div className="mb-8 pb-6 border-b border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {title}
            </h1>
            {lastUpdated && (
              <span className="text-xs font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                Last updated: {lastUpdated}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Dynamic Legal Document Content */}
        <div className="prose prose-slate max-w-none">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-sm font-bold text-slate-900 mb-1">OmniConnect Messaging Platform</div>
            <p className="text-xs text-slate-500 max-w-md leading-normal">
              Unified multi-channel CRM connecting Facebook Messenger, Instagram Direct, and WhatsApp Cloud API.
            </p>
            <p className="text-[11px] text-slate-400 mt-2">
              Meta, Facebook, Instagram, and WhatsApp are registered trademarks of Meta Platforms, Inc. OmniConnect is an independent integration platform and is not endorsed or certified by Meta Platforms, Inc.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-medium text-slate-600">
            <Link to="/privacy" className="hover:text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline text-slate-300">•</span>
            <Link to="/terms" className="hover:text-blue-600 hover:underline">
              Terms of Service
            </Link>
            <span className="hidden sm:inline text-slate-300">•</span>
            <Link to="/data-deletion" className="hover:text-blue-600 hover:underline">
              User Data Deletion
            </Link>
            <span className="hidden sm:inline text-slate-300">•</span>
            <a
              href="mailto:javedabuzar969@gmail.com"
              className="flex items-center gap-1 hover:text-blue-600 hover:underline text-slate-700"
            >
              <Mail size={13} />
              <span>Contact Support</span>
            </a>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} OmniConnect. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
