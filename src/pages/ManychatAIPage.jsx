// pages/ManychatAIPage.jsx
import React, { useState } from 'react';
import {
  Info,
  Plus,
  Heart,
  MessageCircle,
  Send,
  X,
  Sparkles,
  Bot,
  Check,
} from 'lucide-react';
import { InstagramIcon } from '../components/ui/Icons';
import toast from 'react-hot-toast';

export default function ManychatAIPage() {
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [testInput, setTestInput] = useState('Hey, how much does the coaching package cost?');
  const [testHistory, setTestHistory] = useState([
    { role: 'user', text: 'Hey, how much does the coaching package cost?' },
    { role: 'ai', text: 'Our full coaching program is $299, which includes 8 weeks of 1-on-1 mentorship, video access, and live Q&A sessions! Would you like me to send you the full curriculum link? 🚀' },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleRunAITest = (e) => {
    e.preventDefault();
    if (!testInput.trim()) return;

    const userText = testInput;
    setTestHistory((prev) => [...prev, { role: 'user', text: userText }]);
    setTestInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiReply = 'Thanks for your question! With OmniConnect AI, we can automatically route you to the right resource or book a demo call with our team. ✨';
      if (userText.toLowerCase().includes('discount') || userText.toLowerCase().includes('coupon')) {
        aiReply = 'Yes! You can use code SPECIAL15 for 15% off today. Let me know if you need help checkout!';
      } else if (userText.toLowerCase().includes('hours') || userText.toLowerCase().includes('open')) {
        aiReply = 'We are available 24/7 via automated chat and our support team responds between 9 AM - 6 PM EST.';
      }
      setTestHistory((prev) => [...prev, { role: 'ai', text: aiReply }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fbfbfb] min-h-0 text-slate-800 overflow-y-auto">
      {/* Top Header matching Home Page scale */}
      <div className="px-8 sm:px-12 pt-7 pb-4 border-b border-slate-200/90 flex items-center justify-between shrink-0 bg-white">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">OmniConnect AI</h1>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
            <span>BETA for Instagram</span>
            <Info size={14} className="text-slate-400" />
          </div>
        </div>

        <button
          onClick={() => setTestModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#222225] hover:bg-black text-white rounded-xl font-semibold text-sm transition-colors shadow-xs cursor-pointer"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Test AI</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-[1400px] px-8 sm:px-12 py-10 flex flex-col items-center justify-between pb-16">
        <div className="w-full max-w-6xl flex flex-col items-center">
          {/* Welcome & Headline */}
          <div className="text-center mb-12">
            <p className="text-slate-400 text-base font-semibold mb-2.5">Welcome to OmniConnect AI</p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Meet your new social media sidekick
            </h2>
          </div>

          {/* 3 Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
            {/* Card 1: AI Replies */}
            <div className="flex flex-col">
              <div className="h-[400px] bg-[#0c0c0e] rounded-[30px] p-7 flex flex-col justify-center relative overflow-hidden shadow-xl border border-neutral-800/80">
                {/* Visual phone screen content */}
                <div className="space-y-4">
                  {/* User question */}
                  <div className="flex items-start gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-neutral-700"
                    />
                    <div className="bg-[#262629] text-white px-4.5 py-3.5 rounded-2xl text-sm max-w-[250px] leading-relaxed shadow-xs">
                      How long is the course?
                    </div>
                  </div>

                  {/* AI purple reply */}
                  <div className="flex justify-end pt-1">
                    <div className="bg-[#7c3aed] text-white px-5 py-4 rounded-2xl text-sm leading-relaxed max-w-[280px] shadow-md font-medium">
                      8 weeks! 🎉 video lessons + worksheets + lifetime access. You ready??
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 px-1">
                <h3 className="font-bold text-slate-900 text-lg mb-1.5">AI Replies</h3>
                <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                  You share your knowledge, AI uses it to reply for you 24/7
                </p>
              </div>
            </div>

            {/* Card 2: AI Comments */}
            <div className="flex flex-col">
              <div className="h-[400px] bg-[#f0f2f5] rounded-[30px] p-7 flex flex-col justify-between relative overflow-hidden shadow-sm border border-slate-200/90">
                {/* Social media post comment preview */}
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
                        alt="User"
                        className="w-7 h-7 rounded-full object-cover shrink-0"
                      />
                      <span className="text-xs font-bold text-slate-800">creator_daily</span>
                    </div>
                    <p className="text-sm text-slate-800 leading-snug font-medium">
                      Your feedback truly inspires us to keep creating!
                    </p>
                  </div>

                  {/* AI comment reply */}
                  <div className="pl-6">
                    <div className="bg-white/95 p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs text-xs sm:text-[13px] text-slate-800 flex items-center gap-2.5 font-medium">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
                        alt="Reply"
                        className="w-6 h-6 rounded-full object-cover shrink-0"
                      />
                      <span>That means a lot... it spoke to you 💛</span>
                    </div>
                  </div>
                </div>

                {/* IG Action Icons */}
                <div className="flex items-center gap-5 text-slate-700 px-1 pt-3 border-t border-slate-200/80">
                  <Heart size={20} />
                  <MessageCircle size={20} />
                  <Send size={20} />
                </div>
              </div>

              <div className="mt-5 px-1">
                <h3 className="font-bold text-slate-900 text-lg mb-1.5">AI Comments</h3>
                <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                  You set the tone, then AI replies to nice comments like you would
                </p>
              </div>
            </div>

            {/* Card 3: AI Goals */}
            <div className="flex flex-col">
              <div className="h-[400px] bg-[#0c0c0e] rounded-[30px] p-7 flex flex-col justify-between relative overflow-hidden shadow-xl border border-neutral-800/80">
                {/* Header */}
                <div className="flex items-center justify-between text-neutral-300">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop"
                      alt="Jessica Peel"
                      className="w-7 h-7 rounded-full object-cover shrink-0"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-white mr-1.5">Jessica Peel</span>
                      <span className="text-neutral-500">2h</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-neutral-400 font-medium">
                    <Heart size={15} className="text-red-500 fill-red-500" />
                    <span>500</span>
                  </div>
                </div>

                {/* Purple Goal Action Card */}
                <div className="bg-[#7c3aed] text-white p-5 rounded-2xl space-y-3.5 shadow-md">
                  <p className="text-sm leading-snug font-medium">
                    Hey! 😊 Happy to hear you loved it! Would you like to join the session?
                  </p>
                  <button
                    onClick={() => toast.success('Registration goal triggered!')}
                    className="w-full py-2.5 bg-[#6320d6] hover:bg-[#5219b5] text-white text-xs font-bold rounded-xl text-center transition-colors cursor-pointer shadow-xs"
                  >
                    Register now
                  </button>
                </div>
              </div>

              <div className="mt-5 px-1">
                <h3 className="font-bold text-slate-900 text-lg mb-1.5">AI Goals</h3>
                <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                  AI will guide replies to help you hit your goal — leads, followers, clicks, whatever matters most
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setTestModalOpen(true)}
            className="px-10 py-3.5 bg-[#007aff] hover:bg-[#0069db] text-white rounded-xl font-bold text-base transition-all shadow-xs hover:shadow-md active:scale-98 cursor-pointer"
          >
            Get OmniConnect AI
          </button>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-12 mb-3 text-center flex items-center justify-center gap-2 text-slate-400 text-sm">
          <InstagramIcon className="w-4 h-4" />
          <span>
            OmniConnect AI isn't human but it is in Beta. Responses may not always be perfect and features are limited.
          </span>
        </div>
      </div>

      {/* Test AI Interactive Modal */}
      {testModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col h-[560px]">
            {/* Modal Header */}
            <div className="px-7 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <Sparkles size={16} />
                </div>
                <h3 className="font-bold text-slate-900 text-base">OmniConnect AI Simulator</h3>
              </div>
              <button
                onClick={() => setTestModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#fafafa]">
              {testHistory.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${item.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      item.role === 'user'
                        ? 'bg-[#007aff] text-white rounded-tr-xs shadow-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs shadow-xs'
                    }`}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-1.5 text-slate-400 text-xs p-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Modal Input */}
            <form onSubmit={handleRunAITest} className="p-4 border-t border-slate-200 bg-white flex gap-3">
              <input
                type="text"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                placeholder="Ask something to test OmniConnect AI..."
                className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 bg-slate-50"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#007aff] hover:bg-[#0069db] text-white rounded-xl text-sm font-semibold cursor-pointer shadow-xs"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
