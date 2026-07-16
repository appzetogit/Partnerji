import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, ArrowRight, MapPin, AlertCircle } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { provider, upcomingBookings } from "@/lib/mock-data";
import { formatINR } from "@/lib/mock-data";
import { useEffect, useState } from "react";

// Route configuration moved to pages/Provider

export default function Home() {
  const [online, setOnline] = useState(true);
  const [seconds, setSeconds] = useState(8100);
  const [providerName, setProviderName] = useState("Priya");
  const [providerPhoto, setProviderPhoto] = useState<string | null>(null);
  const [kycPending, setKycPending] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("provider_name");
    const savedPhoto = localStorage.getItem("provider_photo");
    const savedKycStatus = localStorage.getItem("provider_kyc_status");

    if (savedName) setProviderName(savedName);
    if (savedPhoto) setProviderPhoto(savedPhoto);
    if (savedKycStatus === "pending") setKycPending(true);
  }, []);

  useEffect(() => {
    if (!online) return;
    const i = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(i);
  }, [online]);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);

  return (
    <MobileShell>
      {/* Top bar */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {providerPhoto ? (
            <img src={providerPhoto} alt={providerName} className="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-sm" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-primary font-bold text-sm">
              {providerName.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-[11px] text-muted-foreground font-semibold tracking-wide">Partnerji</p>
            <p className="font-bold text-foreground -mt-0.5">Hi, {providerName} 👋</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/Provider/notifications" className="relative w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center">
            <Bell className="w-5 h-5" />
            <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-white text-[10px] font-bold flex items-center justify-center">2</div>
          </Link>
        </div>
      </div>

      {/* KYC Warning Banner */}
      {kycPending && (
        <div className="mx-5 mb-2 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-2xl p-4 flex gap-3 shadow-sm animate-fade-in">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-600 shrink-0">
            <AlertCircle className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-amber-800 uppercase tracking-wider">Profile Verification Pending</h4>
            <p className="text-[10px] text-amber-700 font-semibold leading-relaxed mt-1">
              Your profile is currently under review. Verification usually takes 2-4 hours. You'll receive a notification as soon as your account is activated!
            </p>
          </div>
        </div>
      )}

      <div className="px-5 space-y-4">
        {/* Online/Offline Hero */}
        <div className={`rounded-3xl p-5 shadow-card-lg relative overflow-hidden ${online ? "gradient-primary" : "gradient-offline"}`}>
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full bg-white ${online ? "animate-pulse-dot" : ""}`} />
                  <p className="text-white/80 text-xs font-semibold tracking-wider">YOU ARE</p>
                </div>
                <h2 className="text-white text-2xl font-extrabold mt-1">{online ? "ONLINE" : "OFFLINE"}</h2>
              </div>
              <button
                onClick={() => setOnline(!online)}
                className={`w-14 h-8 rounded-full p-1 transition ${online ? "bg-white/30" : "bg-black/20"}`}
              >
                <div className={`w-6 h-6 rounded-full bg-white shadow transition-transform ${online ? "translate-x-6" : ""}`} />
              </button>
            </div>
            <p className="text-white/85 text-sm mt-2">
              {online ? "Customers can discover and book you" : "You won't receive any bookings"}
            </p>
            {online && (
              <p className="text-white/70 text-xs mt-3 font-medium">
                Online for {h}h {m}m
              </p>
            )}
          </div>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Stat icon="💰" value={formatINR(1800, false)} label="Today's Earnings" color="text-primary" prefix="₹" />
          <Stat icon="📋" value="3" label="Bookings Today" color="text-foreground" />
          <Stat icon="⭐" value="4.9" label="Avg Rating" color="text-secondary" />
        </div>

        {/* Active Session Banner */}
        <Link to="/Provider/session" className="block rounded-2xl bg-white border-l-4 border-primary p-4 shadow-card">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
            <span className="text-primary text-xs font-bold tracking-wide">SESSION IN PROGRESS</span>
          </div>
          <p className="font-bold text-foreground mt-2">Ravi Kumar · Shopping Mate</p>
          <p className="text-xs text-muted-foreground mt-0.5">Started 3:00 PM · 45 min elapsed</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-primary text-sm font-bold">View Session</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </div>
        </Link>

        {/* Upcoming */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-foreground">Upcoming Today</h3>
            <Link to="/Provider/bookings" className="text-primary text-sm font-semibold">See all</Link>
          </div>
          <div className="space-y-3">
            {upcomingBookings.slice(0, 2).map((b) => (
              <Link key={b.id} to="/Provider/booking/$id" params={{ id: b.id }} className="block bg-white rounded-2xl p-4 shadow-card">
                <div className="flex gap-4">
                  <div className="text-center min-w-[60px]">
                    <p className="text-primary font-extrabold text-lg leading-tight">{b.time}</p>
                    <p className="text-[10px] text-muted-foreground font-semibold">{b.duration}</p>
                  </div>
                  <div className="flex-1 border-l border-border pl-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-mint flex items-center justify-center text-primary font-bold text-xs">{b.avatar}</div>
                      <p className="font-bold text-sm text-foreground">{b.customer}</p>
                    </div>
                    <p className="text-xs text-foreground mt-1">{b.icon} {b.service}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {b.location}
                    </p>
                    <div className="mt-2 inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                      {b.status}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Performance Card */}
        <div className="bg-white rounded-2xl border-l-4 border-primary p-4 shadow-card">
          <div className="flex items-center justify-between">
            <p className="font-bold text-foreground text-sm">This Week</p>
            <p className="text-xs text-muted-foreground">May 19–25</p>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-lg font-extrabold text-foreground">11</p>
              <p className="text-[10px] text-muted-foreground font-semibold">Bookings</p>
            </div>
            <div>
              <p className="text-lg font-extrabold text-primary">94%</p>
              <p className="text-[10px] text-muted-foreground font-semibold">Accept Rate</p>
            </div>
            <div>
              <p className="text-lg font-extrabold text-foreground">2 min</p>
              <p className="text-[10px] text-muted-foreground font-semibold">Response</p>
            </div>
          </div>
        </div>

        <div className="pt-2" />
      </div>
    </MobileShell>
  );
}

function Stat({ icon, value, label, color, prefix }: { icon: string; value: string; label: string; color: string; prefix?: string }) {
  return (
    <div className="bg-white rounded-2xl p-3 shadow-card">
      <p className="text-lg">{icon}</p>
      <p className={`font-extrabold text-base ${color} mt-1`}>{prefix}{value}</p>
      <p className="text-[10px] text-muted-foreground font-semibold leading-tight mt-0.5">{label}</p>
    </div>
  );
}
