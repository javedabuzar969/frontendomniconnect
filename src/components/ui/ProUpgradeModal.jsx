// components/ui/ProUpgradeModal.jsx
import React, { useState } from 'react';
import {
  X,
  ChevronLeft,
  Check,
  Bell,
  Star,
  CreditCard,
  Lock,
  Phone,
  Video,
  Sparkles,
  Layers,
  Users,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { WhatsAppBrandIcon } from './Icons';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function ProUpgradeModal({
  isOpen,
  initialStep = 'pitch', // 'pitch' | 'pricing' | 'payment'
  onClose,
  onComplete,
}) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(initialStep); // 'pitch' | 'pricing' | 'payment'
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'

  // Payment form state
  const [email, setEmail] = useState(user?.email || 'user@example.com');
  const [fullName, setFullName] = useState(user?.name || 'Adil Qarnain');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [country, setCountry] = useState('Saudi Arabia');
  const [address, setAddress] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  // Dynamic Dates for Stepper
  const today = new Date();
  const reminderDate = new Date();
  reminderDate.setDate(today.getDate() + 7);
  const chargeDate = new Date();
  chargeDate.setDate(today.getDate() + 14);

  const formatDate = (d) => {
    const month = d.toLocaleDateString('en-US', { month: 'short' });
    const day = d.getDate();
    const suffix =
      day % 10 === 1 && day !== 11
        ? 'st'
        : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
        ? 'rd'
        : 'th';
    return `${month} ${day}${suffix}`;
  };

  const handleStartTrial = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const userKey = user?.email || user?._id || 'default_user';
      localStorage.setItem(`is_pro_${userKey}`, 'true');
      toast.success('🎉 Welcome to OmniConnect Pro! 14 days free trial activated.');
      if (onComplete) onComplete();
      onClose();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          STEP 1: PITCH MODAL ("Go Pro to start conversations...")
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 'pitch' && (
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden relative select-none animate-in zoom-in-95 duration-200 flex flex-col md:flex-row my-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-20 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Left Content */}
          <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Try Pro for free
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 leading-tight tracking-tight">
                Go Pro to start conversations that{' '}
                <span className="text-[#08875d]">actually convert</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
                Ready to see your engagement sky rocket and turn conversations into cash? 🤑 Go Pro to
                send personalized messages and WhatsApp Broadcasts from one of the world's most
                trusted platforms.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Try it for free and <strong className="text-slate-800">cancel anytime</strong> if
                you're not feeling it.
              </p>

              <div className="mt-8">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-3">
                  WhatsApp and Pro do more than you think:
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-slate-800 shrink-0" strokeWidth={2.5} />
                    <span>Schedule promos to reach your audience at scale</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-slate-800 shrink-0" strokeWidth={2.5} />
                    <span>Automate simple and complex conversational logics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-slate-800 shrink-0" strokeWidth={2.5} />
                    <span>Get more customers with Ads that click to WhatsApp</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep('pricing')}
                className="w-auto px-7 py-3 bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Try 14 Days For Free
              </button>
              <p className="text-[11px] text-slate-400 mt-2">Credit card will be needed later</p>
            </div>
          </div>

          {/* Right Phone Mockup with WhatsApp chat */}
          <div className="w-full md:w-1/2 bg-[#bbf7d0]/50 p-6 sm:p-10 flex items-center justify-center relative overflow-hidden">
            {/* Grid Pattern overlay */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(#15803d 1px, transparent 1px), radial-gradient(#15803d 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                backgroundPosition: '0 0, 12px 12px',
              }}
            />

            {/* WhatsApp burst badge */}
            <div className="absolute top-6 left-8 z-10">
              <div className="relative flex items-center justify-center">
                {/* Ray bursts */}
                <div className="absolute -inset-2 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-emerald-600/40 animate-spin-slow" />
                </div>
                <div className="w-12 h-12 rounded-full bg-[#00A884] flex items-center justify-center shadow-lg">
                  <WhatsAppBrandIcon className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            {/* Smartphone Mockup */}
            <div className="w-[270px] sm:w-[290px] bg-[#0c1317] rounded-[38px] p-3 shadow-2xl border-4 border-[#1f2937] relative z-10 select-none">
              {/* Phone Header */}
              <div className="flex items-center justify-between pb-3 pt-1 border-b border-slate-800/80 px-2 text-white">
                <div className="flex items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
                    alt="Mia"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-semibold leading-none">Mia Wallace</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">online</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400">
                  <Video size={14} />
                  <Phone size={14} />
                </div>
              </div>

              {/* Chat Messages */}
              <div className="py-4 space-y-3 px-1 text-[11px] leading-snug">
                {/* Message 1 (Customer) */}
                <div className="flex justify-end">
                  <div className="bg-[#005c4b] text-white px-3 py-2 rounded-2xl rounded-tr-xs max-w-[190px] shadow-xs">
                    Do you have any offers?
                  </div>
                </div>

                {/* Message 2 (Bot) */}
                <div className="flex justify-start">
                  <div className="bg-[#202c33] text-slate-100 px-3 py-2 rounded-2xl rounded-tl-xs max-w-[210px] shadow-xs">
                    Yes! The humans are asleep 💤 but I can help.
                    <br />
                    What are you looking for?
                  </div>
                </div>

                {/* Message 3 (Customer) */}
                <div className="flex justify-end">
                  <div className="bg-[#005c4b] text-white px-3 py-2 rounded-2xl rounded-tr-xs max-w-[190px] shadow-xs">
                    A gift for my GF
                  </div>
                </div>

                {/* Message 4 (Bot with interactive buttons) */}
                <div className="flex justify-start">
                  <div className="bg-[#202c33] text-slate-100 p-3 rounded-2xl rounded-tl-xs max-w-[210px] shadow-xs space-y-2">
                    <div>Yes! Check out our amazing new earrings collection</div>
                    <div className="pt-1 space-y-1.5">
                      <button
                        type="button"
                        className="w-full py-1.5 px-3 bg-[#111b21] hover:bg-[#2a3942] text-[#00a884] rounded-lg text-[10px] font-semibold transition cursor-pointer border border-[#2a3942]"
                      >
                        Shop now
                      </button>
                      <button
                        type="button"
                        className="w-full py-1.5 px-3 bg-[#111b21] hover:bg-[#2a3942] text-[#00a884] rounded-lg text-[10px] font-semibold transition cursor-pointer border border-[#2a3942]"
                      >
                        Create a wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 2: PRICING BREAKDOWN ("More contacts. More channels...")
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 'pricing' && (
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden relative select-none animate-in zoom-in-95 duration-200 flex flex-col md:flex-row my-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-20 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Left Column: Hero Image with Overlay */}
          <div className="w-full md:w-[54%] relative bg-slate-900 text-white min-h-[380px] md:min-h-[520px] flex flex-col justify-between p-8 sm:p-10 overflow-hidden">
            {/* Background image */}
            <img
              src="/pro_upgrade_hero.jpg"
              alt="Pro Upgrade"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/35" />

            {/* Top Text */}
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
                More contacts. More channels. More wins.
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-3 leading-relaxed max-w-md">
                The "not a side hustle anymore" Pro plan helps you grow to up to 2,500 active
                contacts. Go yearly to get 25% off and pay just $29/mo.
              </p>

              {/* Billing Cycle Switcher */}
              <div className="inline-flex p-1 bg-black/60 backdrop-blur-md rounded-full mt-5 border border-white/20">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'bg-white text-slate-900 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                    billingCycle === 'annual'
                      ? 'bg-[#7c3aed] text-white font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Annually (up to 30% off)
                </button>
              </div>
            </div>

            {/* Bottom Feature Pill Badges */}
            <div className="relative z-10 flex flex-col gap-2 mt-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-slate-200 w-fit">
                <Layers size={14} className="text-indigo-400" />
                <span>3 channels</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-slate-200 w-fit">
                <Users size={14} className="text-indigo-400" />
                <span>3 users</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-slate-200 w-fit">
                <Sparkles size={14} className="text-purple-400" />
                <span>OmniConnect AI</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-slate-200 w-fit">
                <MessageSquare size={14} className="text-emerald-400" />
                <span>Automations, Broadcasting and AI-powered convos</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Timeline Breakdown */}
          <div className="w-full md:w-[46%] p-8 sm:p-10 flex flex-col justify-between bg-white">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-6">How the pricing works</h3>

              {/* Timeline Steps */}
              <div className="space-y-6 relative pl-3">
                {/* Connecting Line */}
                <div className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-slate-200" />

                {/* Step 1: Today */}
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-[#7c3aed] text-white flex items-center justify-center shrink-0">
                    <Check size={15} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Today</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Pay nothing today and start using all Pro's features
                    </p>
                  </div>
                </div>

                {/* Step 2: Reminder */}
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-7 h-7 rounded-full border-2 border-[#7c3aed] bg-white text-[#7c3aed] flex items-center justify-center shrink-0">
                    <Bell size={13} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {formatDate(reminderDate)}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      You'll get a trial reminder by email
                    </p>
                  </div>
                </div>

                {/* Step 3: End of trial */}
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-7 h-7 rounded-full border-2 border-[#7c3aed] bg-white text-[#7c3aed] flex items-center justify-center shrink-0">
                    <Star size={13} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {formatDate(chargeDate)}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      The trial ends and your yearly payment for Pro will be charged
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 mb-3">Order Summary</h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Pro Plan</span>
                    <span className="font-semibold text-slate-900">$468.00</span>
                  </div>
                  <div className="flex justify-between text-[#08875d] font-semibold">
                    <span>25% off yearly subscription</span>
                    <span>-$120.00</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900">Today's total</span>
                  <span className="text-base font-extrabold text-slate-900">$0</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep('payment')}
                className="w-full py-3 bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer text-center shadow-xs"
              >
                Start Free Trial
              </button>
              <p className="text-[11px] text-slate-400 mt-2 text-center leading-tight">
                Enjoy a 14 days free trial, cancel at anytime or stay with Pro from $348/year
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 3: PAYMENT DETAILS FORM ("Enter your payment details")
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 'payment' && (
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden relative select-none animate-in zoom-in-95 duration-200 flex flex-col md:flex-row my-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-20 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Left Column: Payment Form */}
          <div className="w-full md:w-[55%] p-8 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100">
            <div>
              {/* Back Button */}
              <button
                type="button"
                onClick={() => setCurrentStep('pricing')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition cursor-pointer mb-5"
              >
                <ChevronLeft size={16} />
                <span>Back</span>
              </button>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-6">
                Enter your payment details
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleStartTrial();
                }}
                className="space-y-4"
              >
                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-medium">
                      Secure email input frame
                    </span>
                  </div>
                </div>

                {/* Card Information Box */}
                <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <CreditCard size={15} className="text-blue-600" />
                      <span>Card</span>
                    </div>
                    {/* Brand Logos */}
                    <div className="flex items-center gap-1 opacity-70">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-900 text-white">VISA</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-600 text-white">MC</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500 text-white">AMEX</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">
                      Card number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 1234 1234 1234"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 mb-1">
                        Expiration date
                      </label>
                      <input
                        type="text"
                        value={expDate}
                        onChange={(e) => setExpDate(e.target.value)}
                        placeholder="MM / YY"
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 mb-1">
                        Security code
                      </label>
                      <input
                        type="text"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        placeholder="CVC"
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={saveInfo}
                      onChange={(e) => setSaveInfo(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-[11px] text-slate-600 select-none">
                      Save my information for faster checkout
                    </span>
                  </label>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Adil Qarnain"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                {/* Country or region */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Country or region
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                  >
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Address line 1
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street address or P.O. Box"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Pricing & Timeline Summary */}
          <div className="w-full md:w-[45%] p-8 sm:p-10 flex flex-col justify-between bg-white">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-6">How the pricing works</h3>

              {/* Timeline Steps */}
              <div className="space-y-6 relative pl-3">
                <div className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-slate-200" />

                {/* Step 1: Today */}
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-[#7c3aed] text-white flex items-center justify-center shrink-0">
                    <Check size={15} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Today</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Pay nothing today and start using all Pro's features
                    </p>
                  </div>
                </div>

                {/* Step 2: Reminder */}
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-7 h-7 rounded-full border-2 border-[#7c3aed] bg-white text-[#7c3aed] flex items-center justify-center shrink-0">
                    <Bell size={13} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {formatDate(reminderDate)}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      You'll get a trial reminder by email
                    </p>
                  </div>
                </div>

                {/* Step 3: End of trial */}
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-7 h-7 rounded-full border-2 border-[#7c3aed] bg-white text-[#7c3aed] flex items-center justify-center shrink-0">
                    <Star size={13} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {formatDate(chargeDate)}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      The trial ends and your yearly payment for Pro will be charged
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 mb-3">Order Summary</h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Pro Plan</span>
                    <span className="font-semibold text-slate-900">$468.00</span>
                  </div>
                  <div className="flex justify-between text-[#08875d] font-semibold">
                    <span>25% off yearly subscription</span>
                    <span>-$120.00</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900">Today's total</span>
                  <span className="text-base font-extrabold text-slate-900">$0</span>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="mt-8 pt-4">
              <button
                type="button"
                onClick={handleStartTrial}
                disabled={submitting}
                className="w-full py-3 bg-[#0066ff] hover:bg-[#0052cc] disabled:opacity-50 text-white text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer text-center shadow-xs flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Start Free Trial</span>
                )}
              </button>
              <p className="text-[11px] text-slate-400 mt-2 text-center leading-tight">
                Enjoy a 14 days free trial, cancel at anytime or stay with Pro from $348/year
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
