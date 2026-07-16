import { createFileRoute, Link } from "@tanstack/react-router";
import { Filter, Star, MapPin, Phone, MessageCircle, Navigation, MoreHorizontal, Check, X, Clock, Calendar } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { newRequests, upcomingBookings, completedBookings, provider } from "@/lib/mock-data";
import { formatINR } from "@/lib/mock-data";
import { useEffect, useState } from "react";

// Route configuration moved to pages/Provider
const tabs = ["New", "Upcoming", "Active", "Completed", "Cancelled"];

function CountdownTimer({ initial }: { initial: number }) {
  const [s, setS] = useState(initial);
  useEffect(() => {
    if (s <= 0) return;
    const i = setInterval(() => setS((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(i);
  }, [s]);

  const mm = Math.floor(s / 60).toString().padStart(2, "0");
  const ss = (s % 60).toString().padStart(2, "0");
  const pct = (s / initial) * 100;

  return (
    <div className="w-full relative mt-2">
      {/* Sleek top micro-progress bar */}
      <div className="absolute -top-[14px] left-0 right-0 h-0.5 bg-amber-500/10 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-1000" style={{ width: `${pct}%` }} />
      </div>
      <div className="flex items-center justify-between text-[11px] font-semibold text-amber-600 bg-amber-500/5 px-2.5 py-1.5 rounded-lg border border-amber-500/10">
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          Respond within
        </span>
        <span className="font-mono font-bold">00:{mm}:{ss}</span>
      </div>
    </div>
  );
}

function Bookings() {
  const [tab, setTab] = useState("New");
  const [showDecline, setShowDecline] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc">("newest");

  // Sorting logic based on SortBy filter state
  const sortedNewRequests = [...newRequests].sort((a, b) => {
    if (sortBy === "price-asc") return a.earning - b.earning;
    if (sortBy === "price-desc") return b.earning - a.earning;
    return 0; // Default mock data order
  });

  const sortedUpcoming = [...upcomingBookings].sort((a, b) => {
    if (sortBy === "price-asc") return a.earning - b.earning;
    if (sortBy === "price-desc") return b.earning - a.earning;
    return 0; // Default mock data order
  });

  const sortedCompleted = [...completedBookings].sort((a, b) => {
    if (sortBy === "price-asc") return a.earning - b.earning;
    if (sortBy === "price-desc") return b.earning - a.earning;
    return 0; // Default mock data order
  });

  return (
    <MobileShell>
      {/* Premium Header */}
      <header className="px-5 pt-5 pb-3 flex items-center justify-between bg-background sticky top-0 z-30">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-1.5">
            Bookings
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
          </h1>
          <p className="text-[11px] text-muted-foreground font-medium mt-0.5">Manage your client schedules</p>
        </div>
        <button
          onClick={() => setFilterOpen(true)}
          className="w-10 h-10 rounded-xl bg-white border border-border/80 shadow-soft flex items-center justify-center text-foreground hover:scale-105 active:scale-95 transition-all relative"
        >
          <Filter className="w-4.5 h-4.5 text-muted-foreground" />
          {sortBy !== "newest" && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-ping" />
          )}
        </button>
      </header>

      {/* Modern Horizontal Scroll Tabs */}
      <div className="px-5 border-b border-border/40 bg-background/95 backdrop-blur sticky top-[68px] z-20">
        <div className="flex gap-4 overflow-x-auto no-scrollbar py-2.5">
          {tabs.map((t) => {
            const active = tab === t;
            let count = 0;
            if (t === "New") count = newRequests.length;
            else if (t === "Upcoming") count = upcomingBookings.length;
            else if (t === "Active") count = 1; // mock live session
            else if (t === "Completed") count = completedBookings.length;

            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="relative pb-2 shrink-0 flex items-center gap-1.5 group focus:outline-none"
              >
                <span
                  className={`text-[13px] font-bold transition-all ${active
                      ? "text-primary scale-105"
                      : "text-muted-foreground/80 group-hover:text-foreground"
                    }`}
                >
                  {t === "New" ? "New Requests" : t}
                </span>

                {count > 0 && (
                  <span
                    className={`text-[9px] font-black px-1.5 py-0.5 rounded-full transition-all ${active ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {count}
                  </span>
                )}

                {t === "Active" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping absolute -top-0.5 right-0" />
                )}

                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-slide-right" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bookings Content */}
      <div className="px-5 py-4 space-y-3">
        {/* Tab 1: New Requests */}
        {tab === "New" && sortedNewRequests.map((r) => (
          <div key={r.id} className="relative bg-white rounded-2xl border border-border/60 shadow-card hover:border-primary/20 transition-all duration-300 overflow-hidden p-4 pt-4">
            {/* Top row - Status & ID */}
            <div className="flex items-center justify-between text-xs mb-3">
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-extrabold tracking-wider">
                  NEW REQUEST
                </span>
                <span className="text-[10px] text-muted-foreground">{r.timeAgo}</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono">ID: {r.id}</span>
            </div>

            {/* Customer Info & Earnings Row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
                  {r.avatar}
                </div>
                {/* Name and Rating */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-sm text-foreground leading-snug">{r.customer}</p>
                    {r.verified && (
                      <div className="w-3.5 h-3.5 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <Check className="w-2 h-2 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3 h-3 fill-secondary text-secondary" />
                    <span className="text-[11px] text-muted-foreground font-medium">{r.customerRating} Rating</span>
                  </div>
                </div>
              </div>

              {/* Earnings on the Right (Compact format) */}
              <div className="text-right bg-primary-soft/50 border border-primary/5 rounded-xl px-3 py-1.5 min-w-[84px] shadow-sm">
                <p className="text-[9px] text-muted-foreground font-semibold tracking-wider leading-none uppercase">You'll Earn</p>
                <p className="text-base font-extrabold text-primary mt-1 leading-none">{formatINR(r.earning)}</p>
                <p className="text-[8px] text-muted-foreground/80 mt-1 leading-none">After fee</p>
              </div>
            </div>

            {/* Service & Details Grid */}
            <div className="mt-3 bg-muted/30 border border-border/40 rounded-xl p-2.5 space-y-2">
              <div className="flex items-center gap-1.5">
                <span className="text-sm shrink-0">{r.icon}</span>
                <span className="text-xs font-semibold text-foreground">{r.service}</span>
              </div>

              <div className="border-t border-border/40 my-1.5" />

              <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-foreground/80">
                <div className="flex items-start gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">{r.date}</p>
                    <p className="text-muted-foreground text-[10px]">{r.timeRange} ({r.duration})</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5 border-l border-border/60 pl-2">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground truncate max-w-[110px]">{r.location}</p>
                    <p className="text-primary text-[10px] font-bold">{r.distance}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer note */}
            {r.note && (
              <div className="mt-2.5 p-2 bg-secondary/5 border border-dashed border-secondary/20 rounded-xl flex items-start gap-1.5">
                <span className="text-xs shrink-0 mt-0.5">💬</span>
                <p className="text-[11px] text-foreground/90 italic leading-snug">
                  "{r.note}"
                </p>
              </div>
            )}

            {/* Countdown timer */}
            <CountdownTimer initial={r.countdown} />

            {/* Side-by-side action buttons */}
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setShowDecline(true)}
                className="flex-1 h-10 bg-white border border-border hover:bg-red-50 hover:text-destructive hover:border-destructive/30 rounded-xl text-muted-foreground text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200"
              >
                <X className="w-3.5 h-3.5" /> Decline
              </button>
              <button
                className="flex-[2] h-10 bg-primary text-white rounded-xl text-xs font-bold shadow-soft hover:shadow-glow transition-all duration-200 flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Accept Request
              </button>
            </div>
          </div>
        ))}

        {/* Tab 2: Upcoming Bookings */}
        {tab === "Upcoming" && sortedUpcoming.map((b) => (
          <Link
            key={b.id}
            to="/Provider/booking/$id"
            params={{ id: b.id }}
            className="block bg-white rounded-2xl p-4 border border-border/60 shadow-card hover:border-primary/20 transition-all duration-300"
          >
            {/* Header row */}
            <div className="flex items-center justify-between mb-3">
              <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold tracking-wider ${b.status === "Confirmed"
                  ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/15"
                  : "bg-amber-500/10 text-amber-600 border border-amber-500/15"
                }`}>
                {b.status === "Confirmed" ? "CONFIRMED" : "SCHEDULED"}
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">{b.id}</span>
            </div>

            {/* Customer & Earnings */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
                  {b.avatar}
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground leading-snug">{b.customer}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{b.icon} {b.service} · {b.duration}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-extrabold text-primary">{formatINR(b.earning)}</p>
                <p className="text-[9px] text-muted-foreground leading-none mt-0.5">Earning</p>
              </div>
            </div>

            {/* Trip Details Grid */}
            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] font-medium text-foreground/80 bg-muted/20 border border-border/40 rounded-xl p-2.5">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span>{b.date} · {b.time}</span>
              </div>
              <div className="flex items-center gap-1.5 border-l border-border/60 pl-2">
                <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span className="truncate">{b.location}</span>
              </div>
            </div>

            {/* Action Bar (Icon-only circle buttons) */}
            <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2.5">
              <span className="text-[10px] text-muted-foreground">Action items</span>
              <div className="flex gap-1.5">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = `tel:${provider.phone}`;
                  }}
                  className="w-8 h-8 rounded-full bg-primary/5 hover:bg-primary/10 flex items-center justify-center text-primary transition-all duration-200"
                >
                  <Phone className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="w-8 h-8 rounded-full bg-primary/5 hover:bg-primary/10 flex items-center justify-center text-primary transition-all duration-200"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="w-8 h-8 rounded-full bg-primary/5 hover:bg-primary/10 flex items-center justify-center text-primary transition-all duration-200"
                >
                  <Navigation className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="w-8 h-8 rounded-full bg-muted/40 hover:bg-muted/70 flex items-center justify-center text-muted-foreground transition-all duration-200"
                >
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Link>
        ))}

        {/* Tab 3: Active Live Session */}
        {tab === "Active" && (
          <Link
            to="/Provider/session"
            className="block rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-500 p-4 shadow-glow text-white relative overflow-hidden group hover:scale-[1.01] transition-all duration-300"
          >
            {/* Soft background glow circles */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition-all duration-500" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                </span>
                <span className="text-[10px] font-black tracking-wider uppercase opacity-90">SESSION LIVE</span>
              </div>
              <span className="text-[10px] font-mono opacity-80">ID: MBK-20924</span>
            </div>

            <div className="mt-3 flex justify-between items-start">
              <div>
                <p className="font-extrabold text-base leading-snug">Ravi Kumar</p>
                <p className="text-xs text-white/80 mt-0.5 flex items-center gap-1">
                  <span>🛍️ Shopping Mate</span>
                  <span>·</span>
                  <span>Started 3:00 PM</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] uppercase tracking-wider opacity-75 font-semibold leading-none">Elapsed</p>
                <p className="text-base font-bold font-mono mt-0.5 leading-none">01:24:35</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-1.5 w-full bg-white text-emerald-700 rounded-xl h-10 text-xs font-bold shadow-soft hover:bg-emerald-50 transition-all duration-200">
              View Active Session Details <Navigation className="w-3.5 h-3.5" />
            </div>
          </Link>
        )}

        {/* Tab 4: Completed Bookings */}
        {tab === "Completed" && sortedCompleted.map((c, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 border border-border/60 shadow-card hover:border-primary/20 transition-all duration-300"
          >
            {/* Header row */}
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 text-[9px] font-black tracking-wide border border-emerald-500/15">
                COMPLETED ✓
              </span>
              <span className="text-[10px] text-muted-foreground">{c.date}</span>
            </div>

            {/* Customer & Earnings */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-mint flex items-center justify-center text-primary font-bold text-sm shadow-sm shrink-0">
                  {c.avatar}
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground leading-snug">{c.customer}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{c.icon} {c.service} · {c.duration}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-extrabold text-primary">+{formatINR(c.earning)}</p>
                <div className="flex items-center gap-0.5 justify-end mt-0.5">
                  <Star className="w-3 h-3 fill-secondary text-secondary" />
                  <span className="text-[11px] text-foreground font-bold">{c.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>

            {/* Review Box */}
            {c.review && (
              <div className="mt-3 p-2.5 bg-mint rounded-xl border border-primary/5 flex items-start gap-2">
                <span className="text-xs shrink-0 mt-0.5">💬</span>
                <p className="text-[11px] text-foreground/80 italic leading-snug">
                  "{c.review}"
                </p>
              </div>
            )}

            <div className="mt-3 flex justify-between items-center border-t border-border/40 pt-2.5">
              <span className="text-[10px] text-muted-foreground font-mono">Invoice ready</span>
              <button className="text-primary hover:text-primary-dark text-xs font-bold flex items-center gap-0.5">
                View Receipt →
              </button>
            </div>
          </div>
        ))}

        {/* Tab 5: Cancelled Bookings */}
        {tab === "Cancelled" && (
          <div className="bg-white rounded-2xl p-8 text-center border border-border/60 shadow-card">
            <div className="text-3xl mb-2">🎉</div>
            <p className="font-bold text-sm text-foreground">No cancelled bookings</p>
            <p className="text-[11px] text-muted-foreground mt-1">Keep up the great work!</p>
          </div>
        )}
      </div>

      {/* Decline Modal */}
      {showDecline && (
        <div className="absolute inset-0 z-50 flex items-end" onClick={() => setShowDecline(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative w-full bg-white rounded-t-3xl p-5 animate-slide-up shadow-glow" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1.5 rounded-full bg-border mx-auto mb-4" />
            <h3 className="font-bold text-lg text-foreground">Why are you declining?</h3>
            <div className="mt-4 space-y-2">
              {[
                "🕐 Not available at this time",
                "📍 Location too far",
                "📋 Category not comfortable with",
                "🤒 Feeling unwell",
                "✏️ Other reason",
              ].map((o, i) => (
                <label key={o} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-white cursor-pointer hover:bg-muted/10 transition-colors">
                  <div className={`w-5 h-5 rounded-full border-2 ${i === 0 ? "border-primary bg-primary" : "border-border"} flex items-center justify-center`}>
                    {i === 0 && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className="text-sm text-foreground">{o}</span>
                </label>
              ))}
            </div>
            <button className="mt-4 w-full h-12 bg-destructive hover:bg-destructive/90 rounded-xl text-white font-bold transition-all duration-200">Decline Booking</button>
            <button onClick={() => setShowDecline(false)} className="mt-2 w-full h-11 text-muted-foreground hover:text-foreground font-semibold">Cancel</button>
          </div>
        </div>
      )}

      {/* Filter Bottom Sheet Modal */}
      {filterOpen && (
        <div
          className="absolute inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setFilterOpen(false)}
        >
          <div
            className="w-full max-w-[420px] bg-white rounded-t-3xl shadow-glow p-5 flex flex-col gap-4 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <span className="font-bold text-sm text-foreground">Sort & Filter</span>
              <button
                onClick={() => setFilterOpen(false)}
                className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80 transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Sort Options */}
            <div>
              <span className="text-[11px] font-black text-muted-foreground uppercase tracking-wider block mb-2">
                Sort Bookings By
              </span>
              <div className="flex flex-col gap-2">
                {[
                  { value: "newest", label: "Newest First" },
                  { value: "price-asc", label: "Earning: Low to High" },
                  { value: "price-desc", label: "Earning: High to Low" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSortBy(opt.value as "newest" | "price-asc" | "price-desc")}
                    className={`flex items-center justify-between text-xs font-semibold p-3 rounded-xl border transition-all duration-200 ${sortBy === opt.value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-foreground hover:bg-muted/50"
                      }`}
                  >
                    {opt.label}
                    {sortBy === opt.value && <Check size={14} className="text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset and Apply actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setSortBy("newest");
                  setFilterOpen(false);
                }}
                className="flex-1 h-11 rounded-xl border border-border text-muted-foreground hover:text-foreground text-xs font-bold transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => setFilterOpen(false)}
                className="flex-1 h-11 rounded-xl bg-primary text-white text-xs font-bold shadow-soft hover:shadow-glow transition-all"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </MobileShell>
  );
}

export default Bookings;

