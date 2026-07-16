import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame, Avatar } from "@/components/Partnerji/Shell";
import { getCompanion } from "@/lib/Partnerji-data";
import { ArrowLeft, Zap, Calendar, MapPin, Navigation } from "lucide-react";
import { useState } from "react";

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

export const Route = createFileRoute("/book/$id")({ component: BookPage });

function BookPage() {
  const { id } = Route.useParams();
  const c = getCompanion(id);
  const [mode, setMode] = useState<"instant" | "schedule">("instant");
  const [date, setDate] = useState("Today");
  const [time, setTime] = useState("3:00 PM");
  const [duration, setDuration] = useState(2);

  const base = c.price * duration;
  const fee = 45;
  const tax = Math.round(base * 0.05);
  const total = base + fee + tax;

  const imgUrl = photoMap[c.photo];

  return (
    <MobileFrame className="bg-gradient-to-br from-violet-100 via-slate-50 to-indigo-100">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6 bg-slate-50/50">
        
        {/* Header */}
        <header className="px-5 py-3 flex items-center gap-2.5 bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100/80 shadow-sm">
          <Link 
            to="/companion/$id" 
            params={{ id }}
            className="w-9 h-9 rounded-full bg-white shadow-soft border border-slate-100/85 flex items-center justify-center text-slate-700 transition-all hover:bg-slate-50 active:scale-95"
            title="Go back"
          >
            <ArrowLeft size={16} />
          </Link>
          <h1 className="text-sm font-extrabold text-slate-800 tracking-tight flex-1">Book Session</h1>
        </header>

        {/* Companion Mini Card */}
        <div className="px-5 mt-4">
          <div className="bg-white border border-slate-100 shadow-soft rounded-2xl p-3 flex items-center gap-3">
            {imgUrl ? (
              <img src={imgUrl} alt={c.name} className="w-12 h-12 rounded-full object-cover border-2 border-violet-100" />
            ) : (
              <Avatar name={c.name} color={c.color} size={48} />
            )}
            <div className="flex-1 min-w-0">
              <div className="font-extrabold text-slate-800 text-sm truncate">{c.name}</div>
              <div className="text-[10px] text-primary font-bold mt-0.5">{c.category}</div>
            </div>
            <div className="shrink-0 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-lg flex items-center gap-0.5 text-[10px] font-black text-amber-600">
              <span>★</span>
              <span>{c.rating}</span>
            </div>
          </div>
        </div>

        {/* Booking Type Toggle */}
        <div className="px-5 mt-4">
          <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/40">
            <button 
              onClick={() => setMode("instant")} 
              className={`flex-1 h-8 rounded-lg text-[10px] font-black flex items-center justify-center gap-1 transition-all ${
                mode === "instant" 
                  ? "bg-white shadow-sm text-primary border border-slate-200/20" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Zap size={11} className={mode === "instant" ? "fill-primary/10 text-primary" : ""} /> 
              Instant Booking
            </button>
            <button 
              onClick={() => setMode("schedule")} 
              className={`flex-1 h-8 rounded-lg text-[10px] font-black flex items-center justify-center gap-1 transition-all ${
                mode === "schedule" 
                  ? "bg-white shadow-sm text-primary border border-slate-200/20" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Calendar size={11} className={mode === "schedule" ? "text-primary" : ""} /> 
              Schedule Later
            </button>
          </div>
        </div>

        {/* Schedule Date Selection */}
        {mode === "schedule" && (
          <Block label="Select Date">
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
              {["Today", "Tomorrow", "Mon 26", "Tue 27", "Wed 28", "Thu 29", "Fri 30"].map(d => (
                <button 
                  key={d} 
                  onClick={() => setDate(d)} 
                  className={`shrink-0 px-3.5 h-8 rounded-lg text-[10px] font-bold border transition-all ${
                    date === d 
                      ? "bg-primary border-primary text-white shadow shadow-primary/15" 
                      : "bg-white border-slate-100 text-slate-600 shadow-soft hover:bg-slate-50"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </Block>
        )}

        {/* Start Time Slots Grid */}
        <Block label="Start Time">
          <div className="grid grid-cols-4 gap-1.5">
            {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"].map((t, i) => {
              const disabled = i === 4;
              return (
                <button 
                  key={t} 
                  disabled={disabled} 
                  onClick={() => setTime(t)}
                  className={`h-8 rounded-lg text-[10px] font-bold border transition-all ${
                    disabled 
                      ? "bg-slate-100 border-slate-100 text-slate-350 line-through cursor-not-allowed opacity-50" 
                      : time === t 
                        ? "bg-primary border-primary text-white shadow shadow-primary/15" 
                        : "bg-white border-slate-100 text-slate-600 shadow-soft hover:bg-slate-50"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </Block>

        {/* Duration Selection */}
        <Block label="Duration">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map(h => (
              <button 
                key={h} 
                onClick={() => setDuration(h)} 
                className={`flex-1 h-8 rounded-lg text-[10px] font-black border transition-all ${
                  duration === h 
                    ? "bg-primary border-primary text-white shadow shadow-primary/15" 
                    : "bg-white border-slate-100 text-slate-600 shadow-soft hover:bg-slate-50"
                }`}
              >
                {h} Hr{h > 1 ? "s" : ""}
              </button>
            ))}
            <button className="flex-1 h-8 rounded-lg text-[10px] font-black border bg-white border-slate-100 text-slate-600 shadow-soft hover:bg-slate-50">
              Custom
            </button>
          </div>
        </Block>

        {/* Meeting Location */}
        <Block label="Meeting Location">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-soft p-3">
            <div className="flex items-center gap-2 border border-slate-100 rounded-xl p-2.5 bg-slate-50/50 focus-within:border-primary/50 transition-colors">
              <MapPin size={16} className="text-primary shrink-0" />
              <input 
                defaultValue="DB Mall, Bhopal" 
                className="flex-1 bg-transparent outline-none text-xs font-bold text-slate-700 placeholder-slate-400" 
              />
            </div>
            
            <button className="text-[10px] text-primary font-bold mt-2.5 flex items-center gap-1 hover:underline active:scale-95 transition-transform origin-left">
              <Navigation size={10} className="fill-primary/5" /> Use my current location
            </button>
            
            {/* Compressed Map Preview */}
            <div className="mt-3 h-24 rounded-xl overflow-hidden relative bg-gradient-to-br from-indigo-50 to-blue-50 border border-slate-100 shadow-sm">
              <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 400 200">
                <path d="M0 80 Q100 60 200 90 T400 70" stroke="#9B6DFF" strokeWidth="2.5" fill="none" />
                <path d="M0 140 Q120 120 240 150 T400 130" stroke="#F59E0B" strokeWidth="2" fill="none" />
                <circle cx="200" cy="100" r="45" fill="#6C3FE8" opacity="0.06" />
              </svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-secondary border-3 border-white shadow-md flex items-center justify-center text-xs animate-bounce">
                  📍
                </div>
                <div className="mt-1 bg-white border border-slate-100 rounded-md px-2 py-0.5 text-[8px] font-black text-slate-700 shadow-sm">
                  DB Mall, Bhopal
                </div>
              </div>
            </div>
          </div>
        </Block>

        {/* Special Notes Instructions */}
        <Block label="Special Notes">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-soft p-3">
            <textarea 
              placeholder="Add any special instructions or preferences..." 
              className="w-full h-14 bg-transparent outline-none text-[11px] font-semibold text-slate-600 placeholder-slate-400 resize-none leading-relaxed" 
            />
            <div className="text-right text-[8px] text-slate-400 font-bold mt-1">0/200</div>
          </div>
        </Block>

        {/* Pricing Summary receipt */}
        <div className="px-5 mt-5">
          <div className="bg-white border border-slate-100 shadow-soft rounded-2xl p-4 space-y-2.5">
            <Row k={`Base rate (₹${c.price} × ${duration} hrs)`} v={`₹${base}`} />
            <Row k="Platform fee" v={`₹${fee}`} />
            <Row k="Taxes (5%)" v={`₹${tax}`} />
            
            <div className="border-t border-dashed border-slate-250 pt-2.5 flex justify-between items-center">
              <span className="font-extrabold text-xs text-slate-700 uppercase">Total Amount</span>
              <span className="font-black text-secondary text-base">₹{total}</span>
            </div>
          </div>
        </div>

        {/* Proceed to Payment CTA */}
        <div className="px-5 mt-5">
          <Link 
            to="/payment" 
            className="h-11 grad-primary rounded-xl text-white font-extrabold text-xs flex items-center justify-center shadow-md shadow-primary/20 transition-all hover:brightness-105 active:scale-[0.98]"
          >
            Proceed to Payment
          </Link>
        </div>

      </div>
    </MobileFrame>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="px-5 mt-5">
      <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2.5">{label}</div>
      {children}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between text-[11px] font-bold text-slate-650">
      <span className="text-slate-450">{k}</span>
      <span className="text-slate-800">{v}</span>
    </div>
  );
}
