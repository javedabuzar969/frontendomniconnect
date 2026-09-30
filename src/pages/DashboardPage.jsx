// pages/DashboardPage.jsx
import { MessageSquare, Users, TrendingUp, Zap, ArrowUpRight, Activity } from 'lucide-react';

const STATS = [
  {
    label: 'Total Conversations',
    value: '1,284',
    change: '+12%',
    up: true,
    icon: MessageSquare,
    color: 'from-brand-500 to-emerald-400',
  },
  {
    label: 'Active Contacts',
    value: '847',
    change: '+8%',
    up: true,
    icon: Users,
    color: 'from-blue-500 to-cyan-400',
  },
  {
    label: 'Messages Sent',
    value: '6,429',
    change: '+24%',
    up: true,
    icon: TrendingUp,
    color: 'from-violet-500 to-purple-400',
  },
  {
    label: 'Response Rate',
    value: '94.2%',
    change: '+2.1%',
    up: true,
    icon: Activity,
    color: 'from-orange-500 to-amber-400',
  },
];

const RECENT_ACTIVITY = [
  { name: 'Alice Johnson',    action: 'New message received',    time: '2 min ago' },
  { name: 'Bob Martinez',     action: 'Conversation resolved',   time: '15 min ago' },
  { name: 'Priya Sharma',     action: 'Message delivered ✓✓',   time: '1 hr ago' },
  { name: 'Carlos Mendez',    action: 'New conversation started', time: '3 hrs ago' },
];

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 animate-fade-in bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Welcome back! Here's your WhatsApp overview.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-brand-500 shadow-[0_0_6px_rgba(37,211,102,0.6)]" />
          <span className="text-xs font-semibold text-brand-700">WhatsApp Active</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-sm text-white`}
                >
                  <Icon size={18} />
                </div>
                <span className="text-xs font-bold text-brand-600 flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <ArrowUpRight size={12} />
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-black text-slate-900 mb-1">{stat.value}</p>
              <p className="text-xs font-medium text-slate-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Activity */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-slate-900 mb-4">Recent WhatsApp Activity</h2>
          <div className="space-y-2">
            {RECENT_ACTIVITY.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 text-brand-700 flex items-center justify-center text-xs font-bold shrink-0">
                  {item.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.action}</p>
                </div>
                <span className="text-xs font-medium text-slate-400 shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="space-y-2.5">
            {[
              { icon: MessageSquare, label: 'Open WhatsApp Inbox', desc: 'Reply to incoming customer messages', to: '/inbox', color: 'bg-emerald-50 text-brand-600' },
              { icon: Zap, label: 'Connected Platforms', desc: 'Manage WhatsApp Business account', to: '/integrations', color: 'bg-violet-50 text-violet-600' },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <a
                  key={action.label}
                  href={action.to}
                  className="flex items-center gap-3 p-3.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
                >
                  <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center shrink-0`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800 group-hover:text-brand-600 transition-colors">
                      {action.label}
                    </p>
                    <p className="text-xs text-slate-500">{action.desc}</p>
                  </div>
                  <ArrowUpRight size={14} className="text-slate-400 group-hover:text-brand-600 transition-colors" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
