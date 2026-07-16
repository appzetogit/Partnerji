import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame, Avatar } from "@/components/Partnerji/Shell";
import { companions } from "@/lib/Partnerji-data";
import {
  Phone,
  MessageCircle,
  AlertTriangle,
  Settings,
  MapPin,
  ArrowLeft,
  Shield,
  Clock,
  Compass,
  Share2,
  Navigation,
  ExternalLink,
  ShieldAlert,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { useState, useRef } from "react";

// Companion images imports
import pUntitled from "../assest/peopleimage/Untitled.jpg";
import pImages from "../assest/peopleimage/images.jpg";
import pImages1 from "../assest/peopleimage/images1.jpg";
import pImagesd from "../assest/peopleimage/imagesd.jpg";
import pImagesdd from "../assest/peopleimage/imagesdd.jpg";

const photoMap: Record<string, string> = {
  "images.jpg": pImages,
  "images1.jpg": pImages1,
  "imagesd.jpg": pImagesd,
  "imagesdd.jpg": pImagesdd,
  "Untitled.jpg": pUntitled,
};

export const Route = createFileRoute("/session")({ component: SessionPage });

function SessionPage() {
  const c = companions[0]; // Priya Sharma
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  const startHold = () => {
    setHolding(true);
    let p = 0;
    timerRef.current = window.setInterval(() => {
      p += 4;
      setProgress(p);
      if (p >= 100) {
        clearInterval(timerRef.current!);
        setHolding(false);
        setProgress(0);
        alert("🚨 SOS triggered — emergency contacts & admin alerted.");
      }
    }, 80);
  };
  const cancelHold = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setHolding(false);
    setProgress(0);
  };

  const imgUrl = photoMap[c.photo];

  return (
    <MobileFrame className="bg-gradient-to-br from-violet-100 via-slate-50 to-indigo-100">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-8 bg-slate-50/50">
        
        {/* Sticky-feeling Header */}
        <header className="px-5 py-3 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100/80 shadow-sm">
          <Link 
            to="/bookings" 
            className="w-9 h-9 rounded-full bg-white shadow-soft border border-slate-100/80 flex items-center justify-center transition-all hover:bg-slate-50 hover:shadow-md active:scale-95"
            title="Back to Bookings"
          >
            <ArrowLeft size={16} className="text-slate-700" />
          </Link>
          
          <h1 className="text-sm font-extrabold text-slate-800 tracking-tight">Active Session</h1>
          
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-100/50 shadow-sm">
            <span className="relative w-1 h-1 rounded-full bg-emerald-500">
              <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
            </span>
            LIVE
          </span>
        </header>

        {/* Page Content wrapper */}
        <div className="px-5 pt-5 space-y-5">
          
          {/* Companion Details Card */}
          <div className="bg-white/95 backdrop-blur border border-white shadow-card rounded-2xl p-5 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-4">
              <div className="relative">
                {imgUrl ? (
                  <img 
                    src={imgUrl} 
                    alt={c.name} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 shadow-soft" 
                  />
                ) : (
                  <Avatar name={c.name} color={c.color} size={56} />
                )}
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow shadow-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="font-extrabold text-slate-800 text-base">{c.name}</h2>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                    Connected
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-primary bg-primary-soft/80 border border-primary/10 px-2.5 py-0.5 rounded-full">
                    {c.category}
                  </span>
                  <span className="text-[11px] text-amber-500 font-bold flex items-center gap-0.5">
                    ★ {c.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Premium action buttons with micro-interactions */}
            <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-100">
              {[
                { 
                  Icon: Phone, 
                  label: "Call Companion", 
                  bg: "bg-emerald-50 hover:bg-emerald-100 border-emerald-100 text-emerald-600", 
                  color: "text-emerald-600" 
                },
                { 
                  Icon: MessageCircle, 
                  label: "Open Chat", 
                  bg: "bg-violet-50 hover:bg-violet-100 border-violet-100 text-primary", 
                  color: "text-primary", 
                  to: "/chat" as const 
                },
                { 
                  Icon: AlertTriangle, 
                  label: "Quick SOS", 
                  bg: "bg-rose-50 hover:bg-rose-100 border-rose-100 text-danger", 
                  color: "text-danger" 
                },
              ].map((a, i) => {
                const buttonContent = (
                  <div className="flex flex-col items-center gap-1.5 py-2">
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shadow-sm transition-all duration-200 group-hover:scale-105 active:scale-95 ${a.bg}`}>
                      <a.Icon size={19} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600">{a.label.split(" ")[1]}</span>
                  </div>
                );

                return (
                  <div key={i} className="group">
                    {"to" in a && a.to ? (
                      <Link to={a.to} className="block w-full">{buttonContent}</Link>
                    ) : (
                      <button onClick={a.label.includes("SOS") ? startHold : undefined} className="w-full">{buttonContent}</button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Premium Dashboard Timer Widget */}
          <div className="bg-slate-900 rounded-3xl p-5 shadow-glow relative overflow-hidden text-center border border-slate-800">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1 text-[10px] tracking-widest text-slate-400 font-extrabold uppercase bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700/50">
                <Clock size={10} className="text-primary animate-pulse" /> Time Elapsed
              </span>
              
              <div className="font-mono text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400 tabular-nums tracking-tight mt-3">
                01:24:35
              </div>
              
              <div className="text-[10px] text-slate-400 mt-2 font-medium bg-slate-800/40 py-1.5 px-3 rounded-xl inline-block border border-slate-800/80">
                Session started at <span className="text-white font-bold">3:00 PM</span>
              </div>
            </div>
          </div>

          {/* Trip Timeline & Progress bar */}
          <div className="bg-white/95 backdrop-blur border border-white shadow-card rounded-2xl p-4">
            <div className="flex justify-between items-center text-xs mb-2.5">
              <span className="font-bold text-slate-700">Trip Progress</span>
              <span className="text-slate-500 font-medium">1h 25m of 2h 0m</span>
            </div>
            
            {/* Custom styled slider with internal progress shimmer */}
            <div className="h-3 bg-slate-100/80 rounded-full overflow-hidden p-0.5 border border-slate-200/40">
              <div className="h-full grad-primary rounded-full relative overflow-hidden transition-all duration-500" style={{ width: "70%" }}>
                <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.35)_50%,transparent_100%)] bg-[length:200px_100%] animate-[shimmer_1.8s_infinite]" />
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-400 mt-3 font-semibold">
              <span className="flex items-center gap-1"><Clock size={10} /> 3:00 PM</span>
              <span className="text-primary bg-primary-soft/80 px-2 py-0.5 rounded-md font-bold">35 min remaining</span>
              <span className="flex items-center gap-1"><Clock size={10} /> 5:00 PM</span>
            </div>
          </div>

          {/* Radar Map Component */}
          <div className="h-48 rounded-2xl overflow-hidden relative bg-gradient-to-br from-indigo-50/80 via-slate-100/50 to-blue-50/80 shadow-soft border border-slate-200/50">
            {/* Modern decorative map grid and lines */}
            <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 400 200">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(108,63,232,0.06)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <path d="M0 90 Q120 50 220 100 T400 80" stroke="#9B6DFF" strokeWidth="2.5" strokeDasharray="4 3" fill="none" opacity="0.8" />
              <path d="M0 130 Q140 100 260 160 T400 120" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" fill="none" opacity="0.6" />
            </svg>
            
            {/* Live radar ring pulsing */}
            <div className="absolute left-[30%] top-[45%] flex flex-col items-center">
              <span className="absolute w-12 h-12 rounded-full bg-primary/15 animate-ping" />
              <span className="absolute w-6 h-6 rounded-full bg-primary/30 animate-pulse" />
              <div className="relative w-8 h-8 rounded-full bg-primary border-2 border-white shadow-glow flex items-center justify-center text-white text-[10px] font-extrabold">You</div>
            </div>

            <div className="absolute right-[30%] top-[35%] flex flex-col items-center">
              <span className="absolute w-12 h-12 rounded-full bg-secondary/15 animate-ping" />
              <span className="absolute w-6 h-6 rounded-full bg-secondary/30 animate-pulse" />
              <div className="relative w-8 h-8 rounded-full bg-secondary border-2 border-white shadow-glow flex items-center justify-center text-white text-[10px] font-extrabold">
                {c.name.split(" ")[0][0]}
              </div>
            </div>

            {/* Glassmorphism Floating Info Badge */}
            <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md border border-white/60 rounded-xl p-2.5 flex items-center justify-between shadow-card">
              <div className="flex flex-col">
                <span className="text-[11px] font-extrabold text-slate-800 flex items-center gap-1.5">
                  <MapPin size={13} className="text-primary animate-bounce" /> {c.name.split(" ")[0]} is 200m away
                </span>
                <span className="text-[9px] text-slate-400 font-bold pl-4">Live location • updated just now</span>
              </div>
              <button className="text-[9px] text-primary bg-primary-soft hover:bg-primary/20 px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all active:scale-95">
                Open Maps <ExternalLink size={9} />
              </button>
            </div>
          </div>

          {/* SOS & Safety Block */}
          <div className="bg-white/95 backdrop-blur border border-white shadow-card rounded-2xl p-4 space-y-4">
            <div>
              <button
                onMouseDown={startHold} 
                onMouseUp={cancelHold} 
                onMouseLeave={cancelHold}
                onTouchStart={startHold} 
                onTouchEnd={cancelHold}
                className="relative w-full h-14 rounded-xl bg-danger text-white font-extrabold text-base flex items-center justify-center gap-2 pulse-ring overflow-hidden select-none active:scale-[0.99] transition-transform duration-100"
              >
                {holding && (
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-rose-600 transition-all duration-75" 
                    style={{ width: `${progress}%` }} 
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Shield size={18} className={holding ? "animate-spin" : "animate-pulse"} />
                  {holding ? `HOLDING... ${Math.round(progress)}%` : "Hold 2s for SOS"}
                </span>
              </button>
              <div className="text-center text-[10px] text-slate-400 font-semibold mt-2 flex items-center justify-center gap-1">
                <ShieldAlert size={11} className="text-rose-400" />
                Press & hold 2 seconds to silent-alert emergency contacts
              </div>
            </div>

            {/* Quick Safety Info card */}
            <div className="bg-rose-50/50 border border-rose-100/60 rounded-xl p-3 flex items-start gap-2.5">
              <Shield size={14} className="text-rose-500 mt-0.5 shrink-0" />
              <div className="text-[10px] text-rose-700 leading-relaxed font-semibold">
                Your safety details and live audio are being monitored securely. Feel safe and enjoy your trip!
              </div>
            </div>
          </div>

          {/* Secondary Control Buttons */}
          <div className="pt-2">
            <button className="w-full h-12 rounded-xl border border-rose-200 bg-white hover:bg-rose-50/50 active:scale-98 text-danger font-bold text-sm transition-all duration-200 shadow-sm flex items-center justify-center gap-2">
              <AlertCircle size={16} /> End Session Early
            </button>
          </div>

        </div>
      </div>
    </MobileFrame>
  );
}
