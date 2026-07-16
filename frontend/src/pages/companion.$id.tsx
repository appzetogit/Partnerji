import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame, Avatar, VerifiedBadge } from "@/components/Partnerji/Shell";
import { getCompanion } from "@/lib/Partnerji-data";
import { getHomeServiceById, type HomeService, formatReviews } from "@/lib/services-data";
import { ArrowLeft, Share2, Heart, Star, MapPin, Award, Languages, Calendar, ShieldCheck, CheckCircle2, MessageSquare, Clock, Wrench } from "lucide-react";
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

// Most booked images imports for gallery
import mb1 from "../assest/mostbooked/1726211292907-df8c23.jpeg";
import mb2 from "../assest/mostbooked/1745582697138-89345d.jpeg";
import mb3 from "../assest/mostbooked/1770722101450-6e4f86.jpeg";
import mb4 from "../assest/mostbooked/1770722132353-ee56c6.jpeg";

const galleryPhotos = [mb1, mb2, mb3, mb4];

export const Route = createFileRoute("/companion/$id")({ component: CompanionProfile });

function CompanionProfile() {
  const { id } = Route.useParams();

  const service = getHomeServiceById(id);
  if (service) {
    return <HomeServiceDetailsView service={service} />;
  }

  const c = getCompanion(id);
  const [liked, setLiked] = useState(() => {
    return localStorage.getItem(`fav_${c.id}`) === "true";
  });

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${c.name} - Companion Profile`,
          text: `Check out ${c.name}'s profile on Partnerji!`,
          url: window.location.href,
        });
      } else {
        throw new Error("Web Share not supported");
      }
    } catch (err) {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const toggleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    if (newLiked) {
      localStorage.setItem(`fav_${c.id}`, "true");
    } else {
      localStorage.removeItem(`fav_${c.id}`);
    }
  };

  const imgUrl = photoMap[c.photo];

  return (
    <MobileFrame className="bg-gradient-to-br from-violet-100 via-slate-50 to-indigo-100">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 bg-slate-50/50">
        
        {/* Hero Cover Header */}
        <div className="relative h-[220px] bg-slate-900 overflow-hidden">
          {imgUrl && (
            <img 
              src={imgUrl} 
              alt={c.name} 
              className="w-full h-full object-cover opacity-80 scale-105" 
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
          
          {/* Header Action Buttons */}
          <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
            <Link 
              to="/explore" 
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur border border-white/10 flex items-center justify-center text-white transition-all active:scale-90"
              title="Go back"
            >
              <ArrowLeft size={18} />
            </Link>
            <div className="flex gap-2">
              <button 
                onClick={handleShare}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur border border-white/10 flex items-center justify-center text-white transition-all active:scale-90"
                title="Share profile"
              >
                <Share2 size={16} />
              </button>
              <button 
                onClick={toggleLike} 
                className={`w-9 h-9 rounded-full backdrop-blur border flex items-center justify-center transition-all active:scale-90 ${
                  liked 
                    ? "bg-rose-500 border-rose-500 text-white shadow shadow-rose-500/25" 
                    : "bg-white/20 hover:bg-white/30 border-white/10 text-white"
                }`}
                title={liked ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={16} className={liked ? "fill-white" : ""} />
              </button>
            </div>
          </div>
          
          {/* Hero Companion Overlays */}
          <div className="absolute bottom-5 left-5 right-5 text-white z-10">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[8px] font-black tracking-wider bg-white/25 backdrop-blur text-white px-2 py-0.5 rounded border border-white/15 uppercase">
                {c.category}
              </span>
              {c.online && (
                <span className="text-[8px] font-black tracking-wider bg-emerald-500/25 backdrop-blur text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/35 uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2 mt-2">
              <h1 className="text-xl font-extrabold tracking-tight">{c.name}</h1>
              {c.verified && <VerifiedBadge />}
            </div>
          </div>
        </div>

        {/* Profile Picture Overlay & Core Stats row */}
        <div className="relative -mt-8 px-5 flex items-end justify-between z-10">
          {/* Simple compact stats (left-aligned) */}
          <div className="flex gap-4 pb-1 translate-y-2">
            <div className="flex flex-col items-start">
              <span className="text-secondary font-black text-lg">₹{c.price}</span>
              <span className="text-[9px] text-slate-400 font-bold mt-0.5">Price / Hour</span>
            </div>
            <div className="w-[1px] h-8 bg-slate-200 self-center" />
            <div className="flex flex-col items-start">
              <span className="text-slate-800 font-black text-lg">{c.experience}</span>
              <span className="text-[9px] text-slate-400 font-bold mt-0.5">Experience</span>
            </div>
          </div>

          {/* Profile Picture Overlay (right-aligned) */}
          <div className="relative">
            {imgUrl ? (
              <img 
                src={imgUrl} 
                alt={c.name} 
                className="w-20 h-20 rounded-full object-cover border-4 border-slate-50 shadow-lg" 
              />
            ) : (
              <div className="w-20 h-20 rounded-full border-4 border-slate-50 shadow-lg bg-white overflow-hidden flex items-center justify-center">
                <Avatar name={c.name} color={c.color} size={72} />
              </div>
            )}
          </div>
        </div>

        {/* 3-Column Metric Summary Banner */}
        <div className="px-5 mt-5">
          <div className="grid grid-cols-3 gap-2.5 bg-white border border-slate-100 shadow-soft rounded-2xl p-3">
            {[
              { 
                Icon: Star, 
                v: `★ ${c.rating}`, 
                l: "Rating", 
                c: "text-amber-500" 
              },
              { 
                Icon: Award, 
                v: `${c.bookings}`, 
                l: "Bookings", 
                c: "text-primary" 
              },
              { 
                Icon: Languages, 
                v: `${c.languages.length} Langs`, 
                l: c.languages.join(", "), 
                c: "text-slate-700", 
                truncate: true 
              },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center">
                <span className={`font-black text-sm tracking-tight ${s.c}`}>{s.v}</span>
                <span className="text-[9px] text-slate-400 font-bold mt-1 truncate w-full" title={s.l}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* About Bio Section */}
        <Section title={`About ${c.name.split(" ")[0]}`}>
          <p className="text-[11.5px] text-slate-500 leading-relaxed font-semibold bg-white border border-slate-100 shadow-soft rounded-2xl p-4">{c.bio}</p>
        </Section>

        {/* Services Offered badges */}
        <Section title="Services Offered">
          <div className="flex flex-wrap gap-1.5">
            {[
              { name: "Shopping Mate", emoji: "🛍️" },
              { name: "Personal Assistant", emoji: "🧑‍💼" },
              { name: "Outdoor Partner", emoji: "🚶" }
            ].map(s => (
              <span 
                key={s.name} 
                className="px-2.5 py-1 rounded-lg bg-violet-50 text-primary border border-violet-100/40 text-[10px] font-bold flex items-center gap-1 shadow-sm"
              >
                <span>{s.emoji}</span>
                <span>{s.name}</span>
              </span>
            ))}
          </div>
        </Section>

        {/* Rebuilt Weekly Availability Grid */}
        <Section title="Availability Schedule">
          <div className="bg-white border border-slate-100 shadow-soft rounded-2xl p-4">
            <div className="grid grid-cols-7 gap-2">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase">{d}</span>
                  <div className="space-y-1.5 w-full flex flex-col items-center">
                    {[
                      { time: "Morning", active: i < 6 },
                      { time: "Afternoon", active: i !== 2 },
                      { time: "Evening", active: i < 5 },
                    ].map((slot, index) => (
                      <span 
                        key={index} 
                        className={`w-3 h-3 rounded-full flex items-center justify-center transition-all border ${
                          slot.active 
                            ? "bg-emerald-500 border-emerald-400 shadow-sm shadow-emerald-500/20" 
                            : "bg-slate-100 border-slate-200"
                        }`}
                        title={`${slot.time}: ${slot.active ? "Available" : "Not Available"}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4 mt-4 pt-3 border-t border-slate-100 text-[9px] text-slate-400 font-bold">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 border border-emerald-400" />
                <span>Available Slot</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-100 border border-slate-200" />
                <span>Unavailable Slot</span>
              </div>
            </div>
          </div>
        </Section>

        {/* Gallery Grid */}
        <Section title="Photo Gallery">
          <div className="grid grid-cols-2 gap-0 border border-slate-200/50 rounded-xl overflow-hidden shadow-sm">
            {galleryPhotos.map((img, i) => (
              <div 
                key={i} 
                className="aspect-square overflow-hidden bg-slate-100"
              >
                <img 
                  src={img} 
                  alt={`Gallery ${i + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-200 hover:scale-105" 
                />
              </div>
            ))}
          </div>
        </Section>

        {/* Reviews Section */}
        <Section title={`Reviews (${c.reviews})`} action="See all">
          <div className="space-y-3">
            {[
              { n: "Ravi K.", c: "from-blue-400 to-indigo-500", s: 5, d: "2 days ago", t: "Priya was amazing! Super punctual and made our shopping trip so fun. Will definitely book again." },
              { n: "Sunita M.", c: "from-pink-400 to-rose-500", s: 5, d: "5 days ago", t: "Very professional and friendly. Helped me navigate the mall and gave great suggestions." },
              { n: "Amit S.", c: "from-emerald-400 to-teal-500", s: 4, d: "1 week ago", t: "Good experience overall. Would recommend for anyone looking for a shopping companion." },
            ].map((r, i) => (
              <div key={i} className="bg-white border border-slate-100/80 rounded-2xl shadow-soft p-4 transition-all duration-200 hover:shadow-md">
                <div className="flex items-center gap-3 mb-2.5">
                  <Avatar name={r.n} color={r.c} size={34} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-extrabold text-slate-800 text-xs truncate">{r.n}</span>
                      <span className="text-[9px] text-slate-400 font-bold">{r.d}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star 
                          key={j} 
                          size={10} 
                          className={j < r.s ? "fill-amber-400 text-amber-400" : "text-slate-200"} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">{r.t}</p>
              </div>
            ))}
          </div>
        </Section>

      </div>

      {/* Sticky Bottom Booking Row */}
      <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-slate-100/85 px-5 py-3.5 flex items-center justify-between shadow-[0_-6px_20px_rgba(0,0,0,0.03)] z-20">
        <div>
          <div className="text-secondary text-lg font-black tracking-tight">
            ₹{c.price}
            <span className="text-[10px] text-slate-400 font-bold"> / hour</span>
          </div>
          <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Minimum 1 hour booking</p>
        </div>
        <Link 
          to="/book/$id" 
          params={{ id: c.id }} 
          className="px-6 h-11 rounded-xl grad-primary text-white font-extrabold text-xs shadow-md shadow-primary/20 flex items-center justify-center transition-all active:scale-[0.97]"
        >
          Book Session
        </Link>
      </div>

    </MobileFrame>
  );
}

function Section({ title, action, children }: { title: string; action?: string; children: React.ReactNode }) {
  return (
    <div className="px-5 mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-extrabold text-xs text-slate-700 uppercase tracking-wider">{title}</h2>
        {action && <span className="text-[10px] text-primary font-bold hover:underline cursor-pointer">{action}</span>}
      </div>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// HomeServiceDetailsView — Details page for Home Services
// ─────────────────────────────────────────────────────────────────

function HomeServiceDetailsView({ service }: { service: HomeService }) {
  const mockReviews = [
    { name: "Aman K.", rating: 5, time: "Yesterday", text: "Excellent service! The technician was very polite and completed the deep cleaning quickly. Highly recommend." },
    { name: "Roochi S.", rating: 5, time: "3 days ago", text: "Very fast installation. Done within 40 minutes and tested everything properly. Extremely professional." },
    { name: "Rahul M.", rating: 4, time: "Last week", text: "Good experience. Precision diagnosis. Fixed the PCB issue successfully." },
  ];

  return (
    <MobileFrame className="bg-white">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 bg-white">
        
        {/* Cover Image / Hero Area */}
        <div className="relative h-[240px] bg-slate-100 overflow-hidden border-b border-slate-100">
          {service.image ? (
            <img 
              src={service.image} 
              alt={service.name} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-400">
              <span className="text-4xl mb-2">🔧</span>
              <span className="text-xs font-bold">No Preview Image</span>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

          {/* Header Action Buttons */}
          <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
            <Link 
              to={`/category/${service.category}`} 
              className="w-9 h-9 rounded-full bg-white/80 hover:bg-white backdrop-blur flex items-center justify-center text-slate-700 shadow transition-all active:scale-90"
              title="Go back"
            >
              <ArrowLeft size={18} />
            </Link>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <span className="bg-emerald-600 text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow">
              {service.category} Services
            </span>
            <h1 className="font-extrabold text-lg mt-1 tracking-tight drop-shadow">{service.name}</h1>
          </div>
        </div>

        {/* Rating and Duration */}
        <div className="px-5 pt-5 flex items-center justify-between">
          <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
            <Star size={12} className="fill-emerald-600 text-emerald-600 mr-0.5" />
            <span className="text-xs font-extrabold text-emerald-700">{service.rating.toFixed(2)}</span>
            <span className="text-[10px] text-emerald-600 font-semibold">Rating</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-50 border border-slate-200/50 px-2.5 py-1 rounded-lg">
            <Clock size={12} className="text-slate-400 mr-0.5" />
            <span>Duration: {service.duration}</span>
          </div>
        </div>

        {/* Overview section */}
        <div className="px-5 mt-5">
          <h2 className="font-black text-xs text-slate-400 uppercase tracking-wider mb-2">Description</h2>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {service.description}
          </p>
        </div>

        {/* Trust Badges section */}
        <div className="px-5 mt-6 pt-5 border-t border-slate-100">
          <h2 className="font-black text-xs text-slate-400 uppercase tracking-wider mb-3">Service Guarantees</h2>
          <div className="grid grid-cols-2 gap-3.5">
            {[
              { icon: <ShieldCheck className="text-primary" size={20} />, title: "Verified Experts", desc: "Background checked" },
              { icon: <CheckCircle2 className="text-emerald-600" size={20} />, title: "100% Quality", desc: "Genuine spare parts" },
              { icon: <Clock className="text-blue-500" size={20} />, title: "On-Time Arrival", desc: "Service on schedule" },
              { icon: <Wrench className="text-amber-500" size={20} />, title: "Free Revisit", desc: "No charge for 15 days" }
            ].map((badge, idx) => (
              <div key={idx} className="flex gap-2.5 items-start p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="mt-0.5">{badge.icon}</div>
                <div>
                  <h4 className="text-[11px] font-extrabold text-slate-800 leading-tight">{badge.title}</h4>
                  <p className="text-[9px] text-slate-400 font-semibold mt-0.5">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mock Reviews */}
        <div className="px-5 mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-xs text-slate-400 uppercase tracking-wider">Customer Reviews</h2>
            <span className="text-[10px] text-primary font-bold">{formatReviews(service.reviews)} reviews</span>
          </div>

          <div className="space-y-4">
            {mockReviews.map((r, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100/50 p-3 rounded-2xl">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[11px] font-black text-slate-700">{r.name}</span>
                  <span className="text-[9px] text-slate-400 font-bold">{r.time}</span>
                </div>
                <div className="flex items-center gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={10} 
                      className={i < r.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"} 
                    />
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Bottom Bar */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-slate-100 px-5 py-3.5 flex items-center justify-between shadow-[0_-6px_20px_rgba(0,0,0,0.03)] z-20">
        <div>
          <div className="text-slate-800 text-lg font-black tracking-tight">
            ₹{service.price.toLocaleString()}
          </div>
          <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Free diagnostic included</p>
        </div>
        <Link 
          to="/book/$id" 
          params={{ id: service.id }} 
          className="px-6 h-11 rounded-xl bg-primary text-white font-extrabold text-xs shadow-md shadow-primary/20 flex items-center justify-center transition-all active:scale-[0.97]"
        >
          Book Now
        </Link>
      </div>

    </MobileFrame>
  );
}
