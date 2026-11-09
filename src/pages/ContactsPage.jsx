// pages/ContactsPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Tag,
  Mail,
  Phone,
  User,
  X,
  Check,
  Pause,
  Play,
  ChevronDown,
  Clock,
  HelpCircle,
  MessageSquare,
  Layers,
  ShieldCheck,
  ExternalLink,
  Trash2,
} from 'lucide-react';
import {
  WhatsAppBrandIcon,
  InstagramIcon,
  MessengerBrandIcon,
} from '../components/ui/Icons';
import { apiClient } from '../api/client';
import toast from 'react-hot-toast';

const COUNTRY_CODES = [
  { code: 'US', dial: '+1', name: 'United States' },
  { code: 'PK', dial: '+92', name: 'Pakistan' },
  { code: 'GB', dial: '+44', name: 'United Kingdom' },
  { code: 'IN', dial: '+91', name: 'India' },
  { code: 'CA', dial: '+1', name: 'Canada' },
  { code: 'AU', dial: '+61', name: 'Australia' },
  { code: 'AE', dial: '+971', name: 'United Arab Emirates' },
  { code: 'SA', dial: '+966', name: 'Saudi Arabia' },
];

const INITIAL_CONTACTS = [
  {
    id: '1967464879',
    firstName: 'abuzar',
    lastName: 'ahmed',
    name: 'abuzar ahmed',
    gender: 'Male',
    channel: 'whatsapp',
    identifier: '+9203182023581',
    phone: '+9203182023581',
    email: 'javedabuzar969@gmail.com',
    subscribed: '11 seconds ago',
    status: 'Subscribed',
    automationsPaused: false,
    tags: ['WhatsApp Lead'],
    sequences: ['Welcome Sequence'],
    optedInThrough: 'Manually',
    contactTime: 'Unknown',
  },
  {
    id: '1967464880',
    firstName: 'abuzar',
    lastName: 'ahmed',
    name: 'abuzar ahmed',
    gender: 'Male',
    channel: 'whatsapp',
    identifier: '+9203182023581',
    phone: '+9203182023581',
    email: 'javedabuzar969@gmail.com',
    subscribed: '1 minute ago',
    status: 'Subscribed',
    automationsPaused: false,
    tags: ['WhatsApp Lead'],
    sequences: [],
    optedInThrough: 'Manually',
    contactTime: 'Unknown',
  },
];

export default function ContactsPage() {
  const navigate = useNavigate();

  // Contacts state with localStorage fallback
  const [contacts, setContacts] = useState(() => {
    try {
      const saved = localStorage.getItem('omniconnect_contacts');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return INITIAL_CONTACTS;
  });

  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState('all');

  // Selection for bulk actions
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkMenuOpen, setBulkMenuOpen] = useState(false);
  const bulkMenuRef = useRef(null);

  // Modals / Drawers
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Create Contact Form State (Matching Screenshot 1)
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newCountry, setNewCountry] = useState(COUNTRY_CODES[0]);
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newGender, setNewGender] = useState('Male');
  const [consentChecked, setConsentChecked] = useState(true);
  const [phoneError, setPhoneError] = useState(false);

  // New Tag input inside Contact Details Drawer
  const [addingTag, setAddingTag] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');

  // Close bulk menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (bulkMenuRef.current && !bulkMenuRef.current.contains(event.target)) {
        setBulkMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('omniconnect_contacts', JSON.stringify(contacts));
    } catch (e) {
      console.warn(e);
    }
  }, [contacts]);

  // Load backend conversations into contacts if available
  useEffect(() => {
    loadBackendContacts();
  }, []);

  const loadBackendContacts = async () => {
    try {
      const res = await apiClient.get('/api/conversations');
      if (res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
        const mapped = res.data.data.map((c) => {
          const parts = (c.name || 'Contact').split(' ');
          const fName = parts[0] || 'Contact';
          const lName = parts.slice(1).join(' ') || '';
          return {
            id: String(c.id || c._id || Math.floor(1000000000 + Math.random() * 9000000000)),
            firstName: fName,
            lastName: lName,
            name: c.name || `${fName} ${lName}`.trim(),
            gender: 'Male',
            channel: c.channel || 'whatsapp',
            identifier: c.phoneNumber || '+1 555 000 0000',
            phone: c.phoneNumber || '+1 555 000 0000',
            email: c.email || `${fName.toLowerCase()}@example.com`,
            subscribed: c.time || 'Recent',
            status: 'Subscribed',
            automationsPaused: false,
            tags: [c.channel === 'facebook' ? 'Facebook Lead' : 'WhatsApp Lead'],
            sequences: [],
            optedInThrough: 'Manually',
            contactTime: 'Unknown',
          };
        });

        setContacts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const uniqueNew = mapped.filter((m) => !existingIds.has(m.id));
          return [...prev, ...uniqueNew];
        });
      }
    } catch (err) {
      console.warn('Backend contacts fetch failed:', err.message);
    }
  };

  // Filtered contacts
  const filtered = contacts.filter((c) => {
    if (channelFilter !== 'all' && c.channel !== channelFilter) return false;
    if (query) {
      const q = query.toLowerCase();
      const matchName = c.name?.toLowerCase().includes(q);
      const matchPhone = c.phone?.toLowerCase().includes(q) || c.identifier?.toLowerCase().includes(q);
      const matchEmail = c.email?.toLowerCase().includes(q);
      const matchId = String(c.id).includes(q);
      return matchName || matchPhone || matchEmail || matchId;
    }
    return true;
  });

  // Bulk Selection Handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filtered.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Bulk Action Execution (Matching Screenshot 3)
  const handleBulkAction = (action) => {
    setBulkMenuOpen(false);
    if (selectedIds.length === 0) {
      toast.error('No contacts selected');
      return;
    }

    if (action === 'Add Tag') {
      const tag = window.prompt('Enter tag name to add to selected contacts:');
      if (tag && tag.trim()) {
        setContacts((prev) =>
          prev.map((c) =>
            selectedIds.includes(c.id)
              ? { ...c, tags: Array.from(new Set([...c.tags, tag.trim()])) }
              : c
          )
        );
        toast.success(`Tag "${tag.trim()}" added to ${selectedIds.length} contact(s)`);
      }
    } else if (action === 'Remove Tag') {
      const tag = window.prompt('Enter tag name to remove from selected contacts:');
      if (tag && tag.trim()) {
        setContacts((prev) =>
          prev.map((c) =>
            selectedIds.includes(c.id)
              ? { ...c, tags: c.tags.filter((t) => t.toLowerCase() !== tag.trim().toLowerCase()) }
              : c
          )
        );
        toast.success(`Tag "${tag.trim()}" removed from ${selectedIds.length} contact(s)`);
      }
    } else if (action === 'Subscribe to Sequence') {
      const seq = window.prompt('Enter sequence name:', 'Welcome Sequence');
      if (seq && seq.trim()) {
        setContacts((prev) =>
          prev.map((c) =>
            selectedIds.includes(c.id)
              ? { ...c, sequences: Array.from(new Set([...(c.sequences || []), seq.trim()])) }
              : c
          )
        );
        toast.success(`Subscribed ${selectedIds.length} contact(s) to "${seq.trim()}"`);
      }
    } else if (action === 'Unsubscribe from Sequence') {
      setContacts((prev) =>
        prev.map((c) =>
          selectedIds.includes(c.id) ? { ...c, sequences: [] } : c
        )
      );
      toast.success(`Unsubscribed ${selectedIds.length} contact(s) from sequences`);
    } else if (action === 'Pause Automations Forever') {
      setContacts((prev) =>
        prev.map((c) =>
          selectedIds.includes(c.id) ? { ...c, automationsPaused: true } : c
        )
      );
      toast.success(`Paused automations for ${selectedIds.length} contact(s)`);
    } else if (action === 'Resume Automations') {
      setContacts((prev) =>
        prev.map((c) =>
          selectedIds.includes(c.id) ? { ...c, automationsPaused: false } : c
        )
      );
      toast.success(`Resumed automations for ${selectedIds.length} contact(s)`);
    } else if (action === 'Set User Field') {
      const fieldVal = window.prompt('Enter field value (e.g., VIP Lead):');
      if (fieldVal) {
        toast.success(`User field set for ${selectedIds.length} contact(s)`);
      }
    } else if (action === 'Clear User Field') {
      toast.success(`User field cleared for ${selectedIds.length} contact(s)`);
    }
  };

  // Create Contact Handler (Matching Screenshot 1)
  const handleCreateContact = (e) => {
    e.preventDefault();

    if (!newEmail.trim() && !newPhone.trim()) {
      toast.error('To add a contact, you need to add an email or a phone number.');
      return;
    }

    // Phone validation
    const digitsOnly = newPhone.replace(/\D/g, '');
    if (newPhone.trim() && digitsOnly.length < 7) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);

    const formattedPhone = newPhone.trim()
      ? `${newCountry.dial}${newPhone.trim().replace(/^0+/, '')}`
      : '+9203182023581';

    const newContact = {
      id: String(Math.floor(1000000000 + Math.random() * 9000000000)),
      firstName: newFirstName.trim() || 'New',
      lastName: newLastName.trim() || 'Contact',
      name: `${newFirstName.trim()} ${newLastName.trim()}`.trim() || 'New Contact',
      gender: newGender,
      channel: 'whatsapp',
      identifier: formattedPhone,
      phone: formattedPhone,
      email: newEmail.trim() || 'contact@example.com',
      subscribed: 'Just now',
      status: 'Subscribed',
      automationsPaused: false,
      tags: ['New Lead'],
      sequences: [],
      optedInThrough: 'Manually',
      contactTime: 'Unknown',
    };

    setContacts([newContact, ...contacts]);
    setCreateModalOpen(false);

    // Reset form
    setNewFirstName('');
    setNewLastName('');
    setNewPhone('');
    setNewEmail('');
    setNewGender('Male');
    setPhoneError(false);

    toast.success(`Contact ${newContact.name} created!`);
    // Open drawer for the newly created contact
    setSelectedContact(newContact);
  };

  // Toggle Automations for specific contact
  const handleToggleAutomations = (contactId) => {
    setContacts((prev) =>
      prev.map((c) => {
        if (c.id === contactId) {
          const updated = { ...c, automationsPaused: !c.automationsPaused };
          if (selectedContact && selectedContact.id === contactId) {
            setSelectedContact(updated);
          }
          return updated;
        }
        return c;
      })
    );
    toast.success('Automations status updated');
  };

  // Toggle Subscribed Status
  const handleToggleSubscribed = (contactId) => {
    setContacts((prev) =>
      prev.map((c) => {
        if (c.id === contactId) {
          const nextStatus = c.status === 'Subscribed' ? 'Unsubscribed' : 'Subscribed';
          const updated = { ...c, status: nextStatus };
          if (selectedContact && selectedContact.id === contactId) {
            setSelectedContact(updated);
          }
          return updated;
        }
        return c;
      })
    );
    toast.success('Subscription status updated');
  };

  // Add Tag in Drawer
  const handleAddTagInDrawer = () => {
    if (!newTagInput.trim() || !selectedContact) return;
    const tag = newTagInput.trim();
    const updatedTags = Array.from(new Set([...(selectedContact.tags || []), tag]));

    setContacts((prev) =>
      prev.map((c) => (c.id === selectedContact.id ? { ...c, tags: updatedTags } : c))
    );
    setSelectedContact({ ...selectedContact, tags: updatedTags });
    setNewTagInput('');
    setAddingTag(false);
    toast.success(`Tag "${tag}" added`);
  };

  // Remove Tag in Drawer
  const handleRemoveTagInDrawer = (tagToRemove) => {
    if (!selectedContact) return;
    const updatedTags = (selectedContact.tags || []).filter((t) => t !== tagToRemove);

    setContacts((prev) =>
      prev.map((c) => (c.id === selectedContact.id ? { ...c, tags: updatedTags } : c))
    );
    setSelectedContact({ ...selectedContact, tags: updatedTags });
    toast.success(`Tag "${tagToRemove}" removed`);
  };

  const isAllSelected = filtered.length > 0 && selectedIds.length === filtered.length;

  return (
    <div className="flex-1 flex flex-col bg-[#fbfbfb] min-h-0 text-slate-800 overflow-y-auto">
      {/* Top Header Title Bar matching Screenshot 3 */}
      <div className="px-4 sm:px-8 lg:px-12 pt-4 sm:pt-6 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/70 bg-white">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Contacts</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-lg flex items-center justify-center gap-1.5 font-semibold text-xs sm:text-sm shadow-2xs transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Create New Contact</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-[1400px] px-4 sm:px-8 lg:px-12 py-6">
        <div className="space-y-4">
            
            {/* Toolbar: Filter, Search, Bulk Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 border border-slate-200 rounded-xl shadow-2xs">
              
              {/* Left Side: Filter & Search */}
              <div className="flex items-center gap-2 flex-1">
                <button
                  onClick={() => toast('Filter menu opened')}
                  className="px-3 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Filter size={14} className="text-slate-500" />
                  <span>Filter</span>
                </button>

                <div className="relative flex-1 max-w-sm">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Right Side: Bulk Actions Dropdown (Matching Screenshot 3) */}
              <div className="flex items-center gap-3 justify-end relative" ref={bulkMenuRef}>
                {selectedIds.length > 0 && (
                  <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                    {selectedIds.length} selected of {filtered.length} total
                  </span>
                )}

                <button
                  onClick={() => setBulkMenuOpen(!bulkMenuOpen)}
                  disabled={selectedIds.length === 0}
                  className={`px-3 py-2 border rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer ${
                    selectedIds.length > 0
                      ? 'bg-white border-slate-300 text-slate-900 hover:bg-slate-50'
                      : 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Bulk Actions</span>
                  <ChevronDown size={14} />
                </button>

                {/* Bulk Actions Menu (Matching Screenshot 3) */}
                {bulkMenuOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-40 animate-fade-in text-xs font-medium text-slate-700">
                    <button
                      onClick={() => handleBulkAction('Add Tag')}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      Add Tag
                    </button>
                    <button
                      onClick={() => handleBulkAction('Remove Tag')}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      Remove Tag
                    </button>
                    <div className="my-1 border-t border-slate-100" />
                    <button
                      onClick={() => handleBulkAction('Subscribe to Sequence')}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      Subscribe to Sequence
                    </button>
                    <button
                      onClick={() => handleBulkAction('Unsubscribe from Sequence')}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      Unsubscribe from Sequence
                    </button>
                    <div className="my-1 border-t border-slate-100" />
                    <button
                      onClick={() => handleBulkAction('Pause Automations Forever')}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      Pause Automations Forever
                    </button>
                    <button
                      onClick={() => handleBulkAction('Resume Automations')}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      Resume Automations
                    </button>
                    <div className="my-1 border-t border-slate-100" />
                    <button
                      onClick={() => handleBulkAction('Set User Field')}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      Set User Field
                    </button>
                    <button
                      onClick={() => handleBulkAction('Clear User Field')}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      Clear User Field
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Contacts Table (Matching Screenshot 3) */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[650px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-500 font-semibold text-xs">
                      <th className="py-3 px-4 w-10">
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          onChange={handleSelectAll}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </th>
                      <th className="py-3 px-4 w-16">Avatar</th>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Gender</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Subscribed</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filtered.map((c) => {
                      const isSelected = selectedIds.includes(c.id);
                      return (
                        <tr
                          key={c.id}
                          className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                            isSelected ? 'bg-blue-50/40' : ''
                          }`}
                        >
                          {/* Checkbox */}
                          <td
                            className="py-3 px-4"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectRow(c.id);
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(c.id)}
                              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                          </td>

                          {/* Avatar (Matching Screenshot 3 Silhouette) */}
                          <td
                            className="py-3 px-4"
                            onClick={() => setSelectedContact(c)}
                          >
                            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-end justify-center overflow-hidden shrink-0">
                              <svg className="w-8 h-8 text-slate-300" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                              </svg>
                            </div>
                          </td>

                          {/* Name (Clicking opens details drawer) */}
                          <td
                            className="py-3 px-4"
                            onClick={() => setSelectedContact(c)}
                          >
                            <span className="font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                              {c.name}
                            </span>
                          </td>

                          {/* Gender */}
                          <td
                            className="py-3 px-4 text-slate-600"
                            onClick={() => setSelectedContact(c)}
                          >
                            {c.gender || 'Male'}
                          </td>

                          {/* Status */}
                          <td
                            className="py-3 px-4"
                            onClick={() => setSelectedContact(c)}
                          >
                            <span className="text-slate-700 font-medium">
                              {c.status || 'Subscribed'}
                            </span>
                          </td>

                          {/* Subscribed Time */}
                          <td
                            className="py-3 px-4 text-slate-500"
                            onClick={() => setSelectedContact(c)}
                          >
                            {c.subscribed || 'Recent'}
                          </td>

                          {/* Actions Kebab */}
                          <td
                            className="py-3 px-4 text-right"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => setSelectedContact(c)}
                              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                              title="View details"
                            >
                              <MoreHorizontal size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400 text-xs">
                          No contacts found. Click <strong>Create New Contact</strong> to add one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="p-3 px-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Showing {filtered.length} of {contacts.length} contacts</span>
                <span className="font-semibold text-slate-700">Page 1 of 1</span>
              </div>
            </div>

        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. CREATE NEW CONTACT MODAL (Matching Screenshot 1)          */}
      {/* ───────────────────────────────────────────────────────────── */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-[480px] w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]">
            
            {/* Modal Header */}
            <div className="px-6 pt-6 pb-2 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Create New Contact</h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Subtitle */}
            <div className="px-6 pb-4">
              <p className="text-xs text-slate-500">
                To add a contact, you need to add an email or a phone number.
              </p>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateContact} className="px-6 space-y-4 overflow-y-auto flex-1 pb-4">
              
              {/* First Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={newFirstName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                  placeholder="abuzar"
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                  placeholder="ahmed"
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Phone Number with Country Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  {/* Country Selector */}
                  <div className="relative">
                    <select
                      value={newCountry.code}
                      onChange={(e) => {
                        const found = COUNTRY_CODES.find((c) => c.code === e.target.value);
                        if (found) setNewCountry(found);
                      }}
                      className="h-10 px-3 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 appearance-none pr-7 cursor-pointer focus:outline-none focus:border-blue-500"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>

                  {/* Dial Code Prefix Box */}
                  <div className="h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-600 flex items-center justify-center">
                    {newCountry.dial}
                  </div>

                  {/* Phone Input */}
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => {
                      setNewPhone(e.target.value);
                      if (phoneError) setPhoneError(false);
                    }}
                    placeholder="03182023581"
                    className={`flex-1 px-3.5 py-2 bg-white border rounded-lg text-sm text-slate-800 focus:outline-none ${
                      phoneError
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-slate-300 focus:border-blue-500'
                    }`}
                  />
                </div>

                {/* Validation Error Message matching Screenshot 1 */}
                {phoneError && (
                  <p className="text-[11px] text-red-500 mt-1.5 leading-snug">
                    The phone number has an incorrect format. Please enter the full 10 digit number in international format with the country code including &ldquo;+&rdquo;. For example: +15417543010
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="javedabuzar969@gmail.com"
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gender
                </label>
                <div className="relative">
                  <select
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value)}
                    className="w-full h-10 px-3.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 appearance-none pr-8 cursor-pointer focus:outline-none focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Consent Checkbox matching Screenshot 1 */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="consentCheckbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="consentCheckbox" className="text-[11.5px] text-slate-600 leading-snug cursor-pointer select-none">
                  I confirm that we have obtained appropriate consent to send SMS, email, or other types of messages from contact(s) being created or imported in compliance with applicable laws and regulations and Manychat&apos;s{' '}
                  <span className="text-[#0066ff] hover:underline font-medium">Terms of Service</span>
                </label>
              </div>

              {/* Modal Action Buttons matching Screenshot 1 */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!consentChecked}
                  className="px-6 py-2 bg-[#0066ff] hover:bg-blue-700 text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2. CONTACT DETAILS CENTERED MODAL (Matching User Screenshot) */}
      {/* ───────────────────────────────────────────────────────────── */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0"
            onClick={() => setSelectedContact(null)}
          />

          {/* Centered Modal Card */}
          <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] z-10 animate-scale-in">
            
            {/* Top Close Button (top-right corner of the modal) */}
            <button
              onClick={() => setSelectedContact(null)}
              className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer z-20"
              title="Close modal"
            >
              <X size={20} />
            </button>

            {/* Modal Body: Two-Column Grid matching Screenshot */}
            <div className="p-6 pt-7 grid grid-cols-1 md:grid-cols-12 gap-7 overflow-y-auto">
              
              {/* LEFT COLUMN: Avatar, Pause, Status list */}
              <div className="md:col-span-5 space-y-4">
                
                {/* Silhouette Profile Avatar matching screenshot */}
                <div className="w-full aspect-square max-w-[200px] mx-auto rounded-2xl bg-slate-100 border border-slate-200 flex items-end justify-center overflow-hidden shadow-inner">
                  <svg className="w-40 h-40 text-slate-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
                  </svg>
                </div>

                {/* Pause Automations Button */}
                <button
                  onClick={() => handleToggleAutomations(selectedContact.id)}
                  className="w-full py-2 px-3 border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
                >
                  {selectedContact.automationsPaused ? (
                    <>
                      <Play size={14} className="text-emerald-600" />
                      <span>Resume Automations</span>
                    </>
                  ) : (
                    <>
                      <Pause size={14} className="text-slate-600" />
                      <span>Pause Automations</span>
                    </>
                  )}
                </button>

                {/* Status Items matching Screenshot */}
                <div className="space-y-2.5 text-xs text-slate-700 pt-1">
                  
                  {/* Subscribed (Unsubscribe) toggle */}
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-500 shrink-0" strokeWidth={2.5} />
                    <span className="font-semibold text-emerald-700">
                      {selectedContact.status || 'Subscribed'}
                    </span>
                    <button
                      onClick={() => handleToggleSubscribed(selectedContact.id)}
                      className="text-slate-400 hover:text-slate-700 hover:underline cursor-pointer ml-0.5"
                    >
                      ({selectedContact.status === 'Subscribed' ? 'Unsubscribe' : 'Subscribe'})
                    </button>
                  </div>

                  {/* Gender */}
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="text-base leading-none">♂</span>
                    <span>{selectedContact.gender || 'Male'}</span>
                  </div>

                  {/* Contact Time */}
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock size={14} className="text-slate-400 shrink-0" />
                    <span>Contact Time: Unknown</span>
                    <HelpCircle size={13} className="text-slate-400" />
                  </div>

                  {/* Contact ID */}
                  <div className="flex items-center gap-2 text-slate-600 font-mono text-[11px]">
                    <span className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-500 font-bold">
                      ID
                    </span>
                    <span>{selectedContact.id}</span>
                  </div>

                  {/* Opted-in for SMS */}
                  <div className="pt-1.5 space-y-0.5">
                    <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                      <span>↩️ Opted-In for SMS</span>
                    </div>
                    <div className="font-mono text-slate-700 text-xs pl-5">
                      {selectedContact.phone || selectedContact.identifier}
                    </div>
                  </div>

                  {/* Opted-in for WhatsApp */}
                  <div className="pt-0.5 space-y-0.5">
                    <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                      <WhatsAppBrandIcon className="w-3.5 h-3.5" />
                      <span>Opted-In for WhatsApp</span>
                    </div>
                    <div className="font-mono text-slate-700 text-xs pl-5">
                      {selectedContact.phone?.replace('+', '') || '9203182023581'}
                    </div>
                  </div>

                  {/* Opted-in for Email */}
                  <div className="pt-0.5 space-y-0.5">
                    <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                      <Mail size={13} className="text-purple-600" />
                      <span>Opted-In for Email</span>
                    </div>
                    <div className="text-slate-700 text-xs pl-5 truncate">
                      {selectedContact.email || 'javedabuzar969@gmail.com'}
                    </div>
                  </div>
                </div>

                {/* Start Chat Button */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      toast.success(`Opening chat with ${selectedContact.name}`);
                      navigate('/inbox');
                    }}
                    className="w-full py-2 bg-[#0066ff] hover:bg-blue-700 text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare size={13} />
                    <span>Start Chat</span>
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: Contact Name Header, Contact Tags, Sequences, System Fields */}
              <div className="md:col-span-7 space-y-5 pr-2">
                
                {/* Header: Contact Name + Kebab Menu (Matching Screenshot) */}
                <div className="flex items-center justify-between pb-1">
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    {selectedContact.name || `${selectedContact.firstName} ${selectedContact.lastName}`}
                  </h3>
                  <div className="flex items-center gap-1 pr-6">
                    <button
                      onClick={() => toast(`Options for ${selectedContact.name}`)}
                      className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                      title="More options"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>

                {/* Section: Contact Tags matching Screenshot */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">Contact Tags</h4>
                    <button
                      onClick={() => setAddingTag(true)}
                      className="text-xs font-semibold text-[#0066ff] hover:underline cursor-pointer"
                    >
                      + Add Tag
                    </button>
                  </div>

                  {/* Tag Chips */}
                  <div className="flex flex-wrap gap-1.5 min-h-[28px] items-center">
                    {(selectedContact.tags || []).map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
                      >
                        <span>{t}</span>
                        <button
                          onClick={() => handleRemoveTagInDrawer(t)}
                          className="text-slate-400 hover:text-red-500 cursor-pointer"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    {(selectedContact.tags || []).length === 0 && (
                      <span className="text-xs text-slate-400 italic">No tags yet</span>
                    )}
                  </div>

                  {/* Inline Add Tag Input */}
                  {addingTag && (
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        autoFocus
                        value={newTagInput}
                        onChange={(e) => setNewTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddTagInDrawer();
                          if (e.key === 'Escape') setAddingTag(false);
                        }}
                        placeholder="Tag name..."
                        className="px-2.5 py-1 text-xs border border-blue-400 rounded-lg focus:outline-none flex-1"
                      />
                      <button
                        onClick={handleAddTagInDrawer}
                        className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setAddingTag(false)}
                        className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Section: Subscribed to Sequences */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">Subscribed to Sequences</h4>
                    <button
                      onClick={() => {
                        const seq = window.prompt('Enter sequence to subscribe:');
                        if (seq) {
                          const updated = Array.from(new Set([...(selectedContact.sequences || []), seq]));
                          setSelectedContact({ ...selectedContact, sequences: updated });
                          setContacts((prev) =>
                            prev.map((c) => (c.id === selectedContact.id ? { ...c, sequences: updated } : c))
                          );
                          toast.success(`Subscribed to ${seq}`);
                        }
                      }}
                      className="text-xs font-semibold text-[#0066ff] hover:underline cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(selectedContact.sequences || []).map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium rounded-lg"
                      >
                        {s}
                      </span>
                    ))}
                    {(selectedContact.sequences || []).length === 0 && (
                      <span className="text-xs text-slate-400 italic">No sequences</span>
                    )}
                  </div>
                </div>

                {/* Section: Opted In through */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900">Opted In through</h4>
                  <div>
                    <span className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold rounded-lg inline-block">
                      {selectedContact.optedInThrough || 'Manually'}
                    </span>
                  </div>
                </div>

                {/* Section: System Fields matching Screenshot */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900">System Fields</h4>

                  {/* First Name Field Box */}
                  <div className="bg-[#eff6ff] border border-blue-200/90 rounded-xl p-2 px-3.5 space-y-0.5">
                    <span className="text-[11px] text-slate-500 font-medium block">First Name:</span>
                    <span className="text-xs font-semibold text-slate-900 block">
                      {selectedContact.firstName || selectedContact.name?.split(' ')[0] || 'abuzar'}
                    </span>
                  </div>

                  {/* Last Name Field Box */}
                  <div className="bg-[#eff6ff] border border-blue-200/90 rounded-xl p-2 px-3.5 space-y-0.5">
                    <span className="text-[11px] text-slate-500 font-medium block">Last Name:</span>
                    <span className="text-xs font-semibold text-slate-900 block">
                      {selectedContact.lastName || selectedContact.name?.split(' ')[1] || 'ahmed'}
                    </span>
                  </div>

                  {/* Email Field Box */}
                  <div className="bg-[#eff6ff] border border-blue-200/90 rounded-xl p-2 px-3.5 space-y-0.5">
                    <span className="text-[11px] text-slate-500 font-medium block">Email:</span>
                    <span className="text-xs font-semibold text-slate-900 block truncate">
                      {selectedContact.email || 'javedabuzar969@gmail.com'}
                    </span>
                  </div>

                  {/* Phone Field Box */}
                  <div className="bg-[#eff6ff] border border-blue-200/90 rounded-xl p-2 px-3.5 space-y-0.5">
                    <span className="text-[11px] text-slate-500 font-medium block">Phone:</span>
                    <span className="text-xs font-semibold text-slate-900 block font-mono">
                      {selectedContact.phone || selectedContact.identifier || '+9203182023581'}
                    </span>
                  </div>
                </div>

                {/* Section: Custom Fields */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">Custom Fields</h4>
                  <button
                    onClick={() => toast('Manage Custom Fields wizard')}
                    className="text-xs font-semibold text-[#0066ff] hover:underline cursor-pointer"
                  >
                    Manage Custom Fields
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
