import { createFileRoute } from "@tanstack/react-router";
import { MobileShell, TopBar } from "@/components/MobileShell";
import { notifications } from "@/lib/mock-data";
import { useState } from "react";

// Route configuration moved to pages/Provider
const filters = ["All", "Bookings", "Earnings", "System"];
const groups = [{ key: "today", label: "Today" }, { key: "yesterday", label: "Yesterday" }, { key: "earlier", label: "Earlier" }];

function Notifications() {
  const [f, setF] = useState("All");
  return (
    <MobileShell hideNav>
      <TopBar title="Notifications" back backTo="/Provider/home" right={<button className="text-primary text-xs font-bold">Mark all read</button>} />
      <div className="px-5 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 py-3">
          {filters.map(t => (
            <button key={t} onClick={() => setF(t)} className={`px-4 h-9 rounded-full text-sm font-semibold whitespace-nowrap ${f === t ? "bg-primary text-white" : "bg-white text-foreground border border-border"}`}>{t}</button>
          ))}
        </div>
      </div>
      <div className="px-5 pb-8 space-y-4">
        {groups.map(g => {
          const items = notifications.filter(n => n.group === g.key);
          if (!items.length) return null;
          return (
            <div key={g.key}>
              <p className="text-xs font-bold text-muted-foreground tracking-wider mb-2">{g.label.toUpperCase()}</p>
              <div className="space-y-2">
                {items.map(n => (
                  <div key={n.id} className={`rounded-2xl p-4 shadow-card ${n.unread ? "bg-mint border-l-4 border-primary" : "bg-white"}`}>
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg shrink-0">{n.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-bold text-sm text-foreground">{n.title}</p>
                          <span className="text-[10px] text-muted-foreground whitespace-nowrap">{n.time}</span>
                        </div>
                        <p className="text-xs text-foreground/80 mt-1">{n.body}</p>
                        {n.action === "request" && (
                          <div className="mt-3 flex gap-2">
                            <button className="flex-1 h-9 bg-primary rounded-lg text-white text-xs font-bold">Accept</button>
                            <button className="flex-1 h-9 bg-white border border-destructive rounded-lg text-destructive text-xs font-bold">Decline</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </MobileShell>
  );
}

export default Notifications;
