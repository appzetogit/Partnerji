import { Link, useLocation } from "@tanstack/react-router";
import { Home, ClipboardList, Wallet, MoreHorizontal } from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { to: "/Provider/home", label: "Home", icon: Home },
  { to: "/Provider/bookings", label: "Bookings", icon: ClipboardList },
  { to: "/Provider/earnings", label: "Earnings", icon: Wallet },

  { to: "/Provider/more", label: "More", icon: MoreHorizontal },
] as const;

export function MobileShell({
  children,
  hideNav = false,
  noPadding = false,
}: {
  children: ReactNode;
  hideNav?: boolean;
  noPadding?: boolean;
}) {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="theme-Provider min-h-screen w-full flex justify-center bg-[#E8F3EE]">
      <div className="relative w-full max-w-[420px] h-screen bg-background flex flex-col shadow-2xl overflow-hidden">
        <main className={`flex-1 overflow-y-auto no-scrollbar ${noPadding ? "" : ""}`}>
          {children}
        </main>
        {!hideNav && (
          <nav className="bg-white border-t border-border px-2 pt-2 pb-3 z-40">
            <div className="flex items-center justify-between">
              {navItems.map((item) => {
                const active = path.startsWith(item.to);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex-1 flex flex-col items-center gap-1 py-1.5"
                  >
                    <div
                      className={`flex items-center justify-center w-12 h-7 rounded-full transition-all ${active ? "bg-primary/10" : ""
                        }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${active ? "text-primary" : "text-muted-foreground"}`}
                        strokeWidth={active ? 2.5 : 2}
                      />
                    </div>
                    <span
                      className={`text-[11px] font-medium ${active ? "text-primary" : "text-muted-foreground"
                        }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}

export function TopBar({
  title,
  back,
  right,
  backTo = "..",
}: {
  title: string;
  back?: boolean;
  right?: ReactNode;
  backTo?: string;
}) {
  return (
    <div className="sticky top-0 z-30 bg-background/95 backdrop-blur px-4 py-3 flex items-center gap-3 border-b border-border/60">
      {back && (
        <Link
          to={backTo}
          className="w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center text-foreground"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </Link>
      )}
      <h1 className="flex-1 font-bold text-foreground text-lg truncate">{title}</h1>
      {right}
    </div>
  );
}
