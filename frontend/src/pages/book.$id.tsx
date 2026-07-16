import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame, Avatar } from "@/components/Partnerji/Shell";
import { getCompanion } from "@/lib/Partnerji-data";
import { getHomeServiceById } from "@/lib/services-data";
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

  // Resolve either a service or a companion
  const service = getHomeServiceById(id);
  const companion = !service ? getCompanion(id) : null;

  // Get current date string in YYYY-MM-DD
  const todayStr = (() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  })();

  const [mode, setMode] = useState<"instant" | "schedule">("instant");
  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState("12:00 PM - 01:00 PM");
  const [duration, setDuration] = useState(2);
  const [address, setAddress] = useState("");
  const [issue, setIssue] = useState("");

  const displayName = service ? service.name : (companion ? companion.name : "");
  const displayCategory = service ? `${service.category} Service` : (companion ? companion.category : "");
  const displayRating = service ? service.rating : (companion ? companion.rating : 0);
  const itemPrice = service ? service.price : (companion ? companion.price : 0);
  const imgUrl = service ? service.image : (companion ? photoMap[companion.photo] : undefined);
  const color = companion ? companion.color : "from-emerald-400 to-teal-500";

  const base = itemPrice * duration;
  const fee = 45;
  const tax = Math.round(base * 0.05);
  const total = base + fee + tax;

  // Helper to map slot to start hour (24h)
  const getSlotStartHour = (slot: string): number => {
    if (slot.startsWith("09:")) return 9;
    if (slot.startsWith("10:")) return 10;
    if (slot.startsWith("11:")) return 11;
    if (slot.startsWith("12:")) return 12;
    if (slot.startsWith("02:")) return 14;
    if (slot.startsWith("03:")) return 15;
    if (slot.startsWith("04:")) return 16;
    if (slot.startsWith("05:")) return 17;
    if (slot.startsWith("06:")) return 18;
    if (slot.startsWith("07:")) return 19;
    return 0;
  };

  const isToday = date === todayStr;
  const currentHour = new Date().getHours();

  return (
    <MobileFrame className="bg-gradient-to-br from-violet-100 via-slate-50 to-indigo-100">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6 bg-slate-50/50">

        {/* Header */}
        <header className="px-5 py-3 flex items-center gap-2.5 bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100/80 shadow-sm">
          <Link
            to={service ? `/category/${service.category}` : `/companion/${id}`}
            className="w-9 h-9 rounded-full bg-white shadow-soft border border-slate-100/85 flex items-center justify-center text-slate-700 transition-all hover:bg-slate-50 active:scale-95"
            title="Go back"
          >
            <ArrowLeft size={16} />
          </Link>
          <h1 className="text-sm font-extrabold text-slate-800 tracking-tight flex-1">Book Session</h1>
        </header>

        {/* Companion/Service Mini Card */}
        <div className="px-5 mt-4">
          <div className="bg-white border border-slate-100 shadow-soft rounded-2xl p-3 flex items-center gap-3">
            {imgUrl ? (
              <img src={imgUrl} alt={displayName} className="w-12 h-12 rounded-full object-cover border-2 border-violet-100" />
            ) : (
              <Avatar name={displayName} color={color} size={48} />
            )}
            <div className="flex-1 min-w-0">
              <div className="font-extrabold text-slate-800 text-sm truncate">{displayName}</div>
              <div className="text-[10px] text-primary font-bold mt-0.5">{displayCategory}</div>
            </div>
            <div className="shrink-0 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-lg flex items-center gap-0.5 text-[10px] font-black text-amber-600">
              <span>★</span>
              <span>{displayRating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Select Date Selection */}
        <Block label="Select Date">
          <div className="relative border border-slate-200 rounded-xl p-2.5 bg-white focus-within:border-primary/50 transition-colors shadow-sm">
            <input
              type="date"
              value={date}
              min={todayStr}
              onChange={e => setDate(e.target.value)}
              className="w-full bg-transparent outline-none text-xs font-bold text-slate-700 cursor-pointer"
            />
          </div>
        </Block>

        {/* Start Time Slots Grid (Hourly Ranges) */}
        <Block label="Select Time Slot">
          <div className="grid grid-cols-2 gap-2">
            {[
              "09:00 AM - 10:00 AM",
              "10:00 AM - 11:00 AM",
              "11:00 AM - 12:00 PM",
              "12:00 PM - 01:00 PM",
              "02:00 PM - 03:00 PM",
              "03:00 PM - 04:00 PM",
              "04:00 PM - 05:00 PM",
              "05:00 PM - 06:00 PM",
              "06:00 PM - 07:00 PM",
              "07:00 PM - 08:00 PM"
            ].map((t) => {
              const disabled = isToday && (getSlotStartHour(t) <= currentHour);
              return (
                <button
                  key={t}
                  disabled={disabled}
                  onClick={() => setTime(t)}
                  className={`h-8 px-2 rounded-lg text-[10px] font-bold border transition-all truncate ${disabled
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

        {/* Service Address */}
        <Block label="Service Address">
          <div className="space-y-2">
            <input 
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-slate-250 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-xs font-semibold placeholder-slate-400 transition-all shadow-sm"
            />
            <button className="text-[10px] text-primary font-bold flex items-center gap-1 hover:underline active:scale-95 transition-transform origin-left">
              <Navigation size={10} className="fill-primary/5" /> Use my current location
            </button>
          </div>
        </Block>

        {/* Issue / Requirements description */}
        <Block label="Describe Issue">
          <div className="relative border border-slate-200 rounded-xl p-3 bg-white focus-within:border-primary/50 transition-colors shadow-sm">
            <textarea 
              placeholder="Describe the issue / requirements in detail..." 
              value={issue}
              onChange={e => setIssue(e.target.value)}
              maxLength={200}
              className="w-full h-14 bg-transparent outline-none text-[11px] font-semibold text-slate-600 placeholder-slate-400 resize-none leading-relaxed" 
            />
            <div className="text-right text-[8px] text-slate-400 font-bold mt-1">{issue.length}/200</div>
          </div>
        </Block>

        {/* Pricing Summary receipt */}
        <div className="px-5 mt-5">
          <div className="bg-white border border-slate-150 shadow-soft rounded-2xl p-4 space-y-2.5">
            <Row k="Base rate" v={`₹${itemPrice}`} />
            <Row k="Platform fee" v={`₹${fee}`} />
            <Row k="Taxes (5%)" v={`₹${Math.round(itemPrice * 0.05)}`} />
            
            <div className="border-t border-dashed border-slate-250 pt-2.5 flex justify-between items-center">
              <span className="font-extrabold text-xs text-slate-700 uppercase">Total Amount</span>
              <span className="font-black text-secondary text-base">₹{itemPrice + fee + Math.round(itemPrice * 0.05)}</span>
            </div>
          </div>
        </div>

        {/* Proceed to Payment CTA */}
        <div className="px-5 mt-5">
          <Link 
            to={address.trim() && issue.trim() ? "/payment" : undefined}
            disabled={!address.trim() || !issue.trim()}
            className={`h-11 rounded-xl text-white font-extrabold text-xs flex items-center justify-center shadow-md transition-all active:scale-[0.98] ${
              address.trim() && issue.trim()
                ? "grad-primary shadow-primary/20 hover:brightness-105"
                : "bg-slate-350 cursor-not-allowed opacity-60 pointer-events-none"
            }`}
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
      <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2.5">
        {label} <span className="text-red-500 font-bold">*</span>
      </div>
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
