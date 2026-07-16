import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Phone, MessageCircle, MapPin, Pause, Play, AlertTriangle, AlertOctagon } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { useEffect, useState } from "react";

// Route configuration moved to pages/Provider
const totalSec = 7200;

function Session() {
  const [isPaused, setIsPaused] = useState(false);
  const [elapsed, setElapsed] = useState(5075);
  const [shareLoc, setShareLoc] = useState(true);
  const [showEnd, setShowEnd] = useState(false);
  const [showSOS, setShowSOS] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const i = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(i);
  }, [isPaused]);

  const h = Math.floor(elapsed / 3600);
  const m = Math.floor((elapsed % 3600) / 60);
  const s = elapsed % 60;
  const remaining = Math.max(0, totalSec - elapsed);
  const rm = Math.floor(remaining / 60);
  const rs = remaining % 60;
  const pct = (elapsed / totalSec) * 100;

  // Circle radius 85
  const circ = 2 * Math.PI * 85;
  const dash = circ * (pct / 100);

  return (
    <MobileShell hideNav>
      <div className="px-5 pt-4 pb-4 flex flex-col h-full justify-between">

        {/* Compact Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              to="/Provider/bookings"
              className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors shrink-0 mr-1"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <h1 className="font-bold text-foreground text-sm leading-none">Live Session</h1>
          </div>
          <span className="text-[10px] bg-primary/10 text-primary font-bold px-2.5 py-0.5 rounded-full border border-primary/10">
            IN PROGRESS
          </span>
        </div>

        {/* Compact Customer card */}
        <div className="mt-3.5 bg-white rounded-2xl border border-border/60 p-3 shadow-card flex items-center justify-between gap-3 slide-up">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-extrabold text-sm shadow-sm shrink-0">
              RK
            </div>
            <div>
              <p className="font-bold text-sm text-foreground leading-snug">Ravi Kumar</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">🛍️ Shopping Mate</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.location.href = "tel:+919876543210"}
              className="w-8.5 h-8.5 rounded-xl bg-primary/5 hover:bg-primary/10 flex items-center justify-center text-primary transition-colors duration-200"
            >
              <Phone className="w-3.5 h-3.5" />
            </button>
            <Link
              to="/Provider/chat"
              className="w-8.5 h-8.5 rounded-xl bg-primary flex items-center justify-center text-white shadow-soft hover:shadow-glow transition-all duration-200"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Scaled-down Circular Timer */}
        <div className="mt-4 flex flex-col items-center slide-up">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="85" stroke="rgba(15,155,119,0.06)" strokeWidth="8" fill="none" />
              <circle
                cx="100" cy="100" r="85"
                stroke="url(#sessionGrad)" strokeWidth="8" fill="none"
                strokeDasharray={`${circ}`}
                strokeDashoffset={`${circ - dash}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="sessionGrad" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0F9B77" />
                  <stop offset="100%" stopColor="#34D399" />
                </linearGradient>
              </defs>
            </svg>

            {/* Centered Timer Content */}
            <div className="text-center z-10 flex flex-col items-center">
              <span className="text-[9px] font-bold tracking-wider text-muted-foreground uppercase leading-none">
                {isPaused ? "PAUSED" : "ELAPSED"}
              </span>
              <p className="font-mono font-black text-primary text-3xl tracking-tighter mt-1 leading-none">
                {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1.5">of 2:00:00</p>
              <div className="mt-2 px-2 py-0.5 rounded bg-secondary/10 text-secondary text-[10px] font-bold">
                {rm}m {rs}s left
              </div>
            </div>
          </div>
        </div>

        {/* Mini Map with Location Sharing Overlay (Cards consolidated) */}
        <div className="mt-4 rounded-2xl overflow-hidden shadow-card border border-border/60 relative h-36 slide-up">
          <div className="absolute inset-0 bg-gradient-to-br from-mint via-white to-primary/10" />
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(15,155,119,0.1) 1px, transparent 1px)", backgroundSize: "14px 14px" }} />
          <div className="absolute top-8 left-12 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-primary/20 animate-pulse" />
          <div className="absolute bottom-10 right-14 w-2.5 h-2.5 rounded-full bg-secondary ring-4 ring-secondary/20" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
            <path d="M 60 30 Q 200 100 320 170" stroke="#0F9B77" strokeWidth="2" strokeDasharray="5 3" fill="none" />
          </svg>

          {/* Map Overlays */}
          {/* 1. Location Sharing Status indicator */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-border/60 shadow-soft">
            <span className={`w-1.5 h-1.5 rounded-full ${shareLoc ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground"}`} />
            <span className="text-[10px] font-bold text-foreground">Location Share</span>
          </div>

          {/* 2. Location Sharing Toggle Switch */}
          <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-md p-1 rounded-lg border border-border/60 shadow-soft">
            <button onClick={() => setShareLoc(!shareLoc)} className={`w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 ${shareLoc ? "bg-primary" : "bg-border"}`}>
              <div className={`w-3.5 h-3.5 rounded-full bg-white shadow transition-transform duration-200 ${shareLoc ? "translate-x-3.5" : ""}`} />
            </button>
          </div>

          {/* 3. Distance Pill */}
          <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-md rounded-full px-2.5 py-1 shadow-soft text-[10px] font-bold text-foreground flex items-center gap-1 border border-border/40">
            <span className="text-primary">📍</span> Customer is 180m away
          </div>
        </div>

        {/* Unified Bottom Action Bar */}
        <div className="mt-4 flex gap-2.5 slide-up">
          {/* Pause / Resume Button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`flex-1 h-11 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-bold transition-all duration-200 ${isPaused
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/15"
                : "bg-white border-border hover:bg-muted text-foreground"
              }`}
          >
            {isPaused ? (
              <>
                <Play className="w-4 h-4 fill-emerald-600 text-emerald-600" /> Resume
              </>
            ) : (
              <>
                <Pause className="w-4 h-4 fill-foreground" /> Pause
              </>
            )}
          </button>

          {/* End Session Button */}
          <button
            onClick={() => setShowEnd(true)}
            className="flex-[2] h-11 gradient-amber text-white rounded-xl text-xs font-bold shadow-soft hover:shadow-glow transition-all duration-200"
          >
            End Session
          </button>

          {/* SOS Button */}
          <button
            onClick={() => setShowSOS(true)}
            className="flex-1 h-11 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-glow flex items-center justify-center gap-1 animate-pulse-ring"
          >
            🚨 SOS
          </button>
        </div>
      </div>

      {/* early End confirmation modal */}
      {showEnd && (
        <div className="absolute inset-0 z-50 flex items-center justify-center px-6" onClick={() => setShowEnd(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" />
          <div className="relative w-full bg-white rounded-3xl p-5 shadow-glow animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="w-14 h-14 rounded-full bg-warning/15 mx-auto flex items-center justify-center mb-3">
              <AlertTriangle className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="font-bold text-lg text-center text-foreground">End session early?</h3>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Scheduled end: 5:00 PM · Current time: 4:24 PM
            </p>
            <div className="mt-3 p-3 bg-warning/10 rounded-xl text-center">
              <p className="text-xs font-semibold text-foreground">Remaining: {rm} mins</p>
              <p className="text-[11px] text-muted-foreground">Customer will be charged for full duration</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link to="/Provider/session/complete" className="h-11 gradient-amber rounded-xl text-white font-bold text-sm flex items-center justify-center">End Now</Link>
              <button onClick={() => setShowEnd(false)} className="h-11 bg-primary rounded-xl text-white font-bold text-sm">Continue</button>
            </div>
          </div>
        </div>
      )}

      {/* emergency SOS confirmation modal */}
      {showSOS && (
        <div className="absolute inset-0 z-50 flex items-center justify-center px-6" onClick={() => setShowSOS(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" />
          <div className="relative w-full bg-white rounded-3xl p-5 shadow-glow animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="w-14 h-14 rounded-full bg-red-500/15 mx-auto flex items-center justify-center mb-3">
              <AlertOctagon className="w-7 h-7 text-red-600" />
            </div>
            <h3 className="font-bold text-lg text-center text-foreground">Trigger Emergency SOS?</h3>
            <p className="text-xs text-muted-foreground text-center mt-2 leading-relaxed">
              This will instantly notify our 24/7 safety admin team and alert your emergency contacts with your live GPS location.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowSOS(false)}
                className="h-11 bg-red-600 hover:bg-red-700 rounded-xl text-white font-bold text-xs flex items-center justify-center transition-all duration-200"
              >
                Confirm SOS
              </button>
              <button onClick={() => setShowSOS(false)} className="h-11 bg-muted hover:bg-muted/80 rounded-xl text-foreground font-bold text-xs transition-all duration-200">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </MobileShell>
  );
}

export default Session;
