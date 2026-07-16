import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  LogOut,
  Calendar,
  Settings,
  Ban,
  Landmark,
  FileText,
  Percent,
  ShieldAlert,
  ShieldCheck,
  ClipboardList,
  HelpCircle,
  MessageSquare,
  Edit3,
  Lock
} from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import profilePriya from "@/assest/profile_priya.png";

// Route configuration moved to pages/Provider
const sections = [
  {
    title: "Bookings", items: [
      { icon: Calendar, label: "My Availability", to: "/Provider/availability" },
      { icon: Ban, label: "Blocked Customers", to: "/Provider/blocked-customers" },
    ]
  },
  {
    title: "Earnings", items: [
      { icon: Landmark, label: "Bank Accounts", to: "/Provider/bank-accounts" },
      { icon: Percent, label: "Commission Details", to: "/Provider/commission-details" },
    ]
  },
  {
    title: "Safety", items: [
      { icon: ShieldAlert, label: "Emergency Contacts", to: "/Provider/emergency-contacts" },
      { icon: ShieldCheck, label: "Safety Guidelines", to: "/Provider/safety-guidelines" },
      { icon: ClipboardList, label: "Code of Conduct", to: "/Provider/code-of-conduct" },
    ]
  },
  {
    title: "Support", items: [
      { icon: HelpCircle, label: "Help Center", to: "/Provider/help-center" },
      { icon: Edit3, label: "Send Feedback", to: "/Provider/feedback" },
    ]
  },
  {
    title: "Legal", items: [
      { icon: FileText, label: "Terms for Companions", to: "/Provider/terms" },
      { icon: Lock, label: "Privacy Policy", to: "/Provider/privacy" },
    ]
  },
];

function More() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user_role");
    navigate({ to: "/login" });
  };

  return (
    <MobileShell>
      <div className="bg-white min-h-full pb-6 flex flex-col">
        {/* Top Header / Profile Info */}
        <div className="px-5 pt-5 pb-4 flex items-center gap-4 border-b border-slate-100">
          <img
            src={profilePriya}
            alt="Profile"
            className="w-[60px] h-[60px] rounded-full object-cover border-2 border-primary/20"
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-black text-slate-800 leading-tight">Priya Sharma</h1>
            <div className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-2">
              <span className="text-primary font-bold">● Online</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-400">⭐ 4.9 Rating</span>
            </div>
          </div>
          <Link
            to="/Provider/profile"
            className="text-primary text-xs font-bold border border-primary/20 px-3 py-1.5 rounded-lg hover:bg-primary/5 transition-colors"
          >
            View →
          </Link>
        </div>

        {/* List of menu options */}
        <div className="mt-2 flex-1">
          <div className="divide-y divide-slate-100 px-5">
            {sections
              .flatMap((sec) => sec.items)
              .map((it, i) => {
                const Icon = it.icon;
                const inner = (
                  <div className="flex items-center justify-between py-3.5 group cursor-pointer">
                    <div className="flex items-center gap-3.5">
                      <Icon size={18} className="text-slate-700 group-hover:text-primary transition-colors" />
                      <span className="text-[13px] font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                        {it.label}
                      </span>
                    </div>
                    <ChevronRight size={15} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </div>
                );
                return it.to ? (
                  <Link key={i} to={it.to as any} className="block">
                    {inner}
                  </Link>
                ) : (
                  <div key={i} className="block">
                    {inner}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Logout & App Version Info */}
        <div className="px-5 mt-8 mb-4">
          <button
            onClick={handleLogout}
            className="h-10 w-full rounded-xl border border-red-200 text-red-500 font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut size={14} /> Logout
          </button>
          <div className="text-center text-[9px] text-slate-400 mt-4 font-bold">Partnerji v1.0.0</div>
        </div>
      </div>
    </MobileShell>
  );
}

export default More;
