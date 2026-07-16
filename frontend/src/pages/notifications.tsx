import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/Partnerji/Shell";
import { ArrowLeft, Check, IndianRupee, Star, Gift, X, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/notifications")({ component: NotificationsPage });

const filters = ["All", "Bookings", "Payments", "Promotions"] as const;

type N = { Icon: any; bg: string; color: string; title: string; body: string; time: string; unread?: boolean; group: string };

const items: N[] = [
  { Icon: Check, bg: "bg-primary-soft", color: "text-primary", title: "Booking Confirmed", body: "Your booking with Priya Sharma is confirmed for 3:00 PM today", time: "2 min ago", unread: true, group: "Today" },
  { Icon: IndianRupee, bg: "bg-emerald-100", color: "text-emerald-600", title: "Payment Successful", body: "₹992 paid successfully for booking #MBK-20924", time: "1 hr ago", unread: true, group: "Today" },
  { Icon: Star, bg: "bg-amber-100", color: "text-amber-600", title: "Review Request", body: "How was your session with Rahul Mehta? Rate your experience.", time: "Yesterday", group: "Yesterday" },
  { Icon: Gift, bg: "bg-rose-100", color: "text-rose-500", title: "Special Offer!", body: "Book any companion this weekend and get 15% off with code WEEKEND15", time: "Yesterday", group: "Yesterday" },
  { Icon: X, bg: "bg-red-100", color: "text-danger", title: "Booking Cancelled", body: "Your booking with Rohan Das was cancelled. ₹300 refunded.", time: "5 days ago", group: "Earlier" },
  { Icon: CheckCircle2, bg: "bg-emerald-100", color: "text-emerald-600", title: "Session Completed", body: "Your 1.5hr session with Rahul Mehta has ended.", time: "5 days ago", group: "Earlier" },
];

function NotificationsPage() {
  const [filter, setFilter] = useState<string>("All");
  const groups = Array.from(new Set(items.map(i => i.group)));

  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
        <header className="px-5 py-3 flex items-center gap-2.5 bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100/80 shadow-sm">
          <button 
            onClick={() => window.history.back()}
            className="w-9 h-9 rounded-full bg-white shadow-soft border border-slate-100/80 flex items-center justify-center transition-all hover:bg-slate-50 active:scale-95"
            title="Go back"
          >
            <ArrowLeft size={16} className="text-slate-700" />
          </button>
          <h1 className="text-sm font-extrabold text-slate-800 tracking-tight flex-1">Notifications</h1>
          <button className="text-[10px] font-bold text-primary hover:underline">Mark all read</button>
        </header>

        <div className="pl-5 flex gap-2 overflow-x-auto no-scrollbar py-3">
          {filters.map(f => (
            <button 
              key={f} 
              onClick={() => setFilter(f)} 
              className={`shrink-0 px-3 h-7 rounded-full text-[10px] font-bold border transition-all ${
                filter === f 
                  ? "bg-primary text-white border-primary shadow shadow-primary/10" 
                  : "bg-white text-slate-600 border-slate-100 shadow-soft hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="px-5 mt-2">
          {groups.map(g => (
            <div key={g} className="mb-4">
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">{g}</div>
              <div className="space-y-2">
                {items.filter(i => i.group === g).map((n, i) => (
                  <div key={i} className={`rounded-2xl p-3 flex gap-3 ${n.unread ? "bg-[#F3EFFF]" : "bg-white"} shadow-soft`}>
                    <div className={`w-10 h-10 rounded-full ${n.bg} ${n.color} flex items-center justify-center shrink-0`}><n.Icon size={18} /></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-bold text-sm">{n.title}</div>
                        {n.unread && <span className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <div className="text-xs text-muted-foreground leading-snug mt-0.5">{n.body}</div>
                      <div className="text-[10px] text-muted-foreground mt-1">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileFrame>
  );
}
