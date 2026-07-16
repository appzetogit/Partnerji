import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, ClipboardList, Wallet, User } from "lucide-react";
import ChatBot from "./ChatBot";

const tabs = [
  { to: "/home", label: "Home", Icon: Home },
  { to: "/explore", label: "Explore", Icon: Search },
  { to: "/bookings", label: "Bookings", Icon: ClipboardList },
  { to: "/wallet", label: "Wallet", Icon: Wallet },
  { to: "/profile", label: "Profile", Icon: User },
] as const;

export function BottomNav() {
  const path = useRouterState({ select: s => s.location.pathname });
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-30 bg-white border-t border-border px-2 pt-2 pb-3"
         style={{ boxShadow: "0 -4px 20px rgba(108,63,232,0.06)" }}>
      <div className="flex items-center justify-around">
        {tabs.map(({ to, label, Icon }) => {
          const active = path === to;
          return (
            <Link key={to} to={to} className="flex flex-col items-center gap-1 px-3 py-1 min-w-[56px]">
              <Icon size={22} className={active ? "text-primary" : "text-muted-foreground"}
                strokeWidth={active ? 2.4 : 2} />
              <span className={`text-[10px] font-semibold ${active ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function MobileFrame({
  children,
  withNav = false,
  className = "bg-gradient-to-br from-violet-50 via-slate-50 to-violet-100",
  frameClassName = "bg-background shadow-2xl"
}: {
  children: React.ReactNode;
  withNav?: boolean;
  className?: string;
  frameClassName?: string;
}) {
  return (
    <div className={`min-h-screen w-full flex justify-center ${className}`}>
      <div className={`relative w-full max-w-[420px] h-screen flex flex-col overflow-hidden ${frameClassName}`}>
        <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
        {withNav && <BottomNav />}
        <ChatBot withNav={withNav} />
      </div>
    </div>
  );
}

export function Avatar({ name, color, size = 48, ring = false }: { name: string; color?: string; size?: number; ring?: boolean }) {
  const inits = name.split(" ").map(n => n[0]).slice(0,2).join("").toUpperCase();
  return (
    <div
      className={`relative shrink-0 rounded-full bg-gradient-to-br ${color ?? "from-violet-400 to-purple-600"} flex items-center justify-center text-white font-bold ${ring ? "ring-4 ring-white shadow-soft" : ""}`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {inits}
    </div>
  );
}

export function OnlineDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-block w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white text-emerald-500 ${className}`}>
      <span className="pulse-dot" />
    </span>
  );
}

export function VerifiedBadge() {
  return (
    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] font-black">✓</span>
  );
}
