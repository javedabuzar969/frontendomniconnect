// pages/ContactsPage.jsx
import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  MoreHorizontal,
  Tag,
  Mail,
  Phone,
  User,
  X,
  Check,
} from 'lucide-react';
import {
  WhatsAppBrandIcon,
  InstagramIcon,
  MessengerBrandIcon,
} from '../components/ui/Icons';
import toast from 'react-hot-toast';

const MOCK_CONTACTS = [
  {
    id: 'c1',
    name: 'Alice Johnson',
    gender: 'Female',
    channel: 'whatsapp',
    identifier: '+1 202 555 0192',
    subscribed: 'Sep 02, 2026',
    status: 'Subscribed',
    tags: ['VIP', 'Customer'],
  },
  {
    id: 'c2',
    name: 'Bob Martinez',
    gender: 'Male',
    channel: 'instagram',
    identifier: '@bob_martinez99',
    subscribed: 'Sep 01, 2026',
    status: 'Subscribed',
    tags: ['Lead', 'Webinar'],
  },
  {
    id: 'c3',
    name: 'Priya Sharma',
    gender: 'Female',
    channel: 'whatsapp',
    identifier: '+91 98765 43210',
    subscribed: 'Aug 28, 2026',
    status: 'Subscribed',
    tags: ['Wholesale'],
  },
  {
    id: 'c4',
    name: 'David Wilson',
    gender: 'Male',
    channel: 'messenger',
    identifier: 'david.wilson.fb',
    subscribed: 'Aug 25, 2026',
    status: 'Subscribed',
    tags: ['Promo20'],
  },
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState(MOCK_CONTACTS);
  const [query, setQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState('all');
  const [newContactModal, setNewContactModal] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactChannel, setNewContactChannel] = useState('whatsapp');

  const filtered = contacts.filter((c) => {
    if (channelFilter !== 'all' && c.channel !== channelFilter) return false;
    if (query) {
      const q = query.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.identifier.toLowerCase().includes(q);
    }
    return true;
  });

  const handleCreateContact = (e) => {
    e.preventDefault();
    if (!newContactName.trim()) return;
    const newC = {
      id: `c_${Date.now()}`,
      name: newContactName,
      gender: 'Other',
      channel: newContactChannel,
      identifier: newContactPhone || '+1 555 000 9999',
      subscribed: 'Just now',
      status: 'Subscribed',
      tags: ['New Lead'],
    };
    setContacts([newC, ...contacts]);
    setNewContactName('');
    setNewContactPhone('');
    setNewContactModal(false);
    toast.success(`Contact ${newC.name} created!`);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fbfbfb] min-h-0 text-slate-800 overflow-y-auto">
      {/* Top Header Title Bar matching Home Page scale */}
      <div className="px-4 sm:px-8 lg:px-12 pt-5 sm:pt-7 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Contacts</h1>
          <p className="text-slate-500 text-sm mt-1">Manage subscribers, customer tags, and channel status</p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={() => toast.success('Exporting contacts to CSV')}
            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 rounded-xl flex items-center gap-1.5 sm:gap-2 font-semibold text-xs sm:text-sm shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <Download size={15} />
            <span>Export</span>
          </button>
          <button
            onClick={() => toast('Import contacts wizard opened')}
            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 rounded-xl flex items-center gap-1.5 sm:gap-2 font-semibold text-xs sm:text-sm shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <Upload size={15} />
            <span>Import</span>
          </button>
          <button
            onClick={() => setNewContactModal(true)}
            className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#007aff] hover:bg-[#0069db] text-white rounded-xl flex items-center gap-1.5 sm:gap-2 font-semibold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>New Contact</span>
          </button>
        </div>
      </div>

      {/* Main Content Area matching Home Page container max-width and padding */}
      <div className="w-full max-w-[1400px] px-4 sm:px-8 lg:px-12 py-3 space-y-6 pb-16">
        {/* Search & Filter Toolbar */}
        <div className="p-3.5 sm:p-4 bg-white border border-slate-200/90 rounded-2xl shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="relative flex-1 max-w-full sm:max-w-md">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, phone or ID..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="text-sm font-semibold text-slate-500 hidden sm:inline">Channel:</span>
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="w-full sm:w-auto border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-slate-700 font-semibold text-sm shadow-2xs cursor-pointer focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Channels ({contacts.length})</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="instagram">Instagram</option>
              <option value="messenger">Messenger</option>
            </select>
          </div>
        </div>

        {/* Contacts Table Card with Horizontal Scroll Container */}
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/90 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                  <th className="py-3.5 sm:py-4 px-4 sm:px-6">Name</th>
                  <th className="py-3.5 sm:py-4 px-4 sm:px-6">Channel</th>
                  <th className="py-3.5 sm:py-4 px-4 sm:px-6">Identifier</th>
                  <th className="py-3.5 sm:py-4 px-4 sm:px-6">Gender</th>
                  <th className="py-3.5 sm:py-4 px-4 sm:px-6">Subscribed</th>
                  <th className="py-3.5 sm:py-4 px-4 sm:px-6">Tags</th>
                  <th className="py-3.5 sm:py-4 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 sm:py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                          {c.name.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-900 text-sm">{c.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 sm:py-4 px-4 sm:px-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                        {c.channel === 'whatsapp' && <WhatsAppBrandIcon className="w-4 h-4" />}
                        {c.channel === 'instagram' && <InstagramIcon className="w-4 h-4" />}
                        {c.channel === 'messenger' && <MessengerBrandIcon className="w-4 h-4" />}
                        <span className="capitalize">{c.channel}</span>
                      </div>
                    </td>
                    <td className="py-3.5 sm:py-4 px-4 sm:px-6 text-slate-700 font-mono text-sm font-medium">{c.identifier}</td>
                    <td className="py-3.5 sm:py-4 px-4 sm:px-6 text-slate-600 text-sm">{c.gender}</td>
                    <td className="py-3.5 sm:py-4 px-4 sm:px-6 text-slate-600 text-sm">{c.subscribed}</td>
                    <td className="py-3.5 sm:py-4 px-4 sm:px-6">
                      <div className="flex gap-1.5 flex-wrap">
                        {c.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-xs"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 sm:py-4 px-4 sm:px-6 text-right">
                      <button
                        onClick={() => toast(`Managing contact: ${c.name}`)}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                        title="More options"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400 text-sm">
                      No contacts found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Summary */}
          <div className="p-3 sm:p-4 px-4 sm:px-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500">
            <span>Showing {filtered.length} of {contacts.length} contacts</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Page 1 of 1</span>
            </div>
          </div>
        </div>
      </div>

      {/* New Contact Modal */}
      {newContactModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Add New Contact</h3>
              <button
                onClick={() => setNewContactModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateContact} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Contact Name
                </label>
                <input
                  type="text"
                  required
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  placeholder="e.g. Sarah Connor"
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Channel
                </label>
                <select
                  value={newContactChannel}
                  onChange={(e) => setNewContactChannel(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                >
                  <option value="whatsapp">WhatsApp</option>
                  <option value="instagram">Instagram</option>
                  <option value="messenger">Facebook Messenger</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Phone / Identifier
                </label>
                <input
                  type="text"
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  placeholder="+1 555 123 4567 or @username"
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#007aff] hover:bg-[#0069db] text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer shadow-xs"
                >
                  Save Contact
                </button>
                <button
                  type="button"
                  onClick={() => setNewContactModal(false)}
                  className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
