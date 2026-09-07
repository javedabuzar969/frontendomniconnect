// pages/AutomationPage.jsx
import React, { useState } from 'react';
import {
  Workflow,
  Plus,
  Search,
  Zap,
  Tag,
  Key,
  Layers,
  ArrowRight,
  MoreVertical,
  Play,
  CheckCircle,
  X,
} from 'lucide-react';
import {
  WhatsAppBrandIcon,
  InstagramIcon,
  MessengerBrandIcon,
} from '../components/ui/Icons';
import toast from 'react-hot-toast';

const MOCK_FLOWS = [
  {
    id: 'f1',
    name: 'Default Welcome Message',
    channel: 'whatsapp',
    trigger: 'User sends first message',
    runs: 624,
    status: 'Active',
    modified: 'Yesterday',
  },
  {
    id: 'f2',
    name: 'Lead Capture & WhatsApp Opt-in',
    channel: 'instagram',
    trigger: 'User comments "INFO" on IG post',
    runs: 1240,
    status: 'Active',
    modified: '3 days ago',
  },
  {
    id: 'f3',
    name: 'FAQ & Office Hours Bot',
    channel: 'all',
    trigger: 'Keywords: price, hours, location',
    runs: 840,
    status: 'Active',
    modified: '1 week ago',
  },
  {
    id: 'f4',
    name: 'Cart Abandonment Follow-up (24h)',
    channel: 'whatsapp',
    trigger: 'Webhook: checkout.abandoned',
    runs: 154,
    status: 'Paused',
    modified: '2 weeks ago',
  },
];

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState('flows');
  const [flows, setFlows] = useState(MOCK_FLOWS);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [newFlowName, setNewFlowName] = useState('');

  const handleCreateFlow = (e) => {
    e.preventDefault();
    if (!newFlowName.trim()) return;

    const newFlow = {
      id: `f_${Date.now()}`,
      name: newFlowName,
      channel: 'whatsapp',
      trigger: 'Trigger: User says hi',
      runs: 0,
      status: 'Active',
      modified: 'Just now',
    };
    setFlows([newFlow, ...flows]);
    setNewFlowName('');
    setBuilderOpen(false);
    toast.success(`Flow "${newFlow.name}" created and published!`);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fbfbfb] min-h-0 text-slate-800 overflow-y-auto">
      {/* Top Header Title Bar matching Home Page scale */}
      <div className="px-8 sm:px-12 pt-7 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/90 bg-white">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Automation</h1>
          <p className="text-slate-500 text-sm mt-1">Build conversational flows, keyword rules, and trigger sequences</p>
        </div>

        <button
          onClick={() => setBuilderOpen(true)}
          className="px-5 py-2.5 bg-[#007aff] hover:bg-[#0069db] text-white rounded-xl flex items-center gap-2 font-semibold text-sm shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>New Flow</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="px-8 sm:px-12 flex gap-8 border-b border-slate-200/90 bg-white">
        {[
          { id: 'flows', label: 'Flows' },
          { id: 'keywords', label: 'Keywords' },
          { id: 'sequences', label: 'Sequences' },
          { id: 'rules', label: 'Rules' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3.5 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area matching Home Page layout */}
      <div className="w-full max-w-[1400px] px-8 sm:px-12 py-6 space-y-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flows.map((flow) => (
            <div
              key={flow.id}
              className="border border-slate-200/90 hover:border-slate-300 rounded-2xl p-6 bg-white shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-5 group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {flow.channel === 'whatsapp' && <WhatsAppBrandIcon className="w-4 h-4" />}
                    {flow.channel === 'instagram' && <InstagramIcon className="w-4 h-4" />}
                    {flow.channel === 'all' && <Zap size={16} className="text-amber-500" />}
                    <span className="font-bold text-slate-500 text-xs uppercase tracking-wider">
                      {flow.channel}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      flow.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {flow.status}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-blue-600 transition-colors">
                  {flow.name}
                </h3>
                <p className="text-slate-500 text-xs sm:text-[13px] flex items-center gap-1.5">
                  <span className="text-slate-400">Trigger:</span>
                  <span className="text-slate-700 font-medium">{flow.trigger}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-[13px] text-slate-500">
                <span>{flow.runs.toLocaleString()} executions</span>
                <button
                  onClick={() => toast.success(`Testing flow: ${flow.name}`)}
                  className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                >
                  <Play size={13} fill="currentColor" />
                  <span>Test Flow</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Flow Modal */}
      {builderOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl p-7 border border-slate-200 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Create New Flow</h3>
              <button
                onClick={() => setBuilderOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-slate-500 text-sm">
              Give your flow a clear name to organize your conversation steps and logic.
            </p>
            <form onSubmit={handleCreateFlow} className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 text-sm mb-1.5">Flow Name</label>
                <input
                  type="text"
                  value={newFlowName}
                  onChange={(e) => setNewFlowName(e.target.value)}
                  placeholder="e.g. VIP Discount Offer Flow"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:border-blue-500 focus:outline-none"
                  autoFocus
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setBuilderOpen(false)}
                  className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl text-sm font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#007aff] hover:bg-[#0069db] text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  Create & Launch Flow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
