import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, ChevronRight, Plus } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { provider, formatINR } from "@/lib/mock-data";
import galleryCafe from "@/assest/gallery_cafe.png";
import galleryGym from "@/assest/gallery_gym.png";
import galleryShopping from "@/assest/gallery_shopping.png";
import profilePriya from "@/assest/profile_priya.png";

// Route configuration moved to pages/Provider
function Profile() {
  const dayDots = [
    { d: "Mon", on: [1, 1, 1] }, { d: "Tue", on: [1, 1, 0] }, { d: "Wed", on: [1, 1, 1] },
    { d: "Thu", on: [0, 0, 0] }, { d: "Fri", on: [1, 1, 1] }, { d: "Sat", on: [1, 1, 0] }, { d: "Sun", on: [0, 0, 0] },
  ];
  return (
    <MobileShell>
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-2xl font-extrabold text-foreground">My Profile</h1>
      </div>

      <div className="px-5 space-y-4">
        {/* Hero */}
        <div className="bg-white rounded-2xl p-5 shadow-card text-center">
          <div className="relative w-24 h-24 mx-auto">
            <img src={profilePriya} alt="Profile" className="w-24 h-24 rounded-full object-cover border-2 border-primary/20" />
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary border-2 border-white flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="font-extrabold text-foreground text-xl mt-3">{provider.name}</p>
          <p className="text-sm text-muted-foreground">📍 {provider.city}</p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 h-7 rounded-full bg-primary/10">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
            <span className="text-primary text-xs font-bold">Online</span>
          </div>
          <div className="mt-3 flex justify-center gap-2">
            <span className="text-[10px] px-2 py-1 rounded-full bg-mint text-primary font-bold">✅ ID Verified</span>
            <span className="text-[10px] px-2 py-1 rounded-full bg-secondary/15 text-secondary font-bold">⭐ Top Rated</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { v: "4.9", l: "Rating", c: "text-secondary" },
            { v: "248", l: "Bookings", c: "text-foreground" },
            { v: formatINR(48200), l: "Earned", c: "text-primary" },
            { v: "🏆", l: "Top", c: "text-secondary" },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-2 shadow-card text-center">
              <p className={`font-extrabold text-sm ${s.c}`}>{s.v}</p>
              <p className="text-[9px] text-muted-foreground font-semibold">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Services */}
        <Section title="My Services">
          <div className="flex flex-wrap gap-2 mt-2">
            {provider.categories.map(c => (
              <span key={c} className="px-3 h-8 rounded-full bg-mint text-primary text-xs font-semibold flex items-center">{c} ×</span>
            ))}
            <button className="px-3 h-8 rounded-full border-2 border-dashed border-primary text-primary text-xs font-semibold flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Hourly rate: <span className="text-foreground font-bold">{formatINR(provider.hourlyRate)}/hr</span></p>
        </Section>

        <Section title="Availability" link="/Provider/availability">
          <div className="mt-3 space-y-1.5">
            {dayDots.map(d => (
              <div key={d.d} className="flex items-center gap-3">
                <span className="text-xs font-semibold text-foreground w-8">{d.d}</span>
                <div className="flex gap-1">
                  {d.on.map((o, i) => (
                    <div key={i} className={`w-2.5 h-2.5 rounded-full ${o ? "bg-primary" : "bg-border"}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="About Me">
          <p className="text-sm text-foreground/80 mt-2 line-clamp-2">{provider.bio}</p>
          <Link to="/Provider/profile" className="text-primary text-xs font-semibold mt-2 inline-block">Edit Bio →</Link>
        </Section>

        <Section title="Languages">
          <div className="flex gap-2 mt-2">
            {provider.languages.map(l => <span key={l} className="px-3 h-8 rounded-full bg-mint text-primary text-xs font-semibold flex items-center">{l}</span>)}
            <button className="px-3 h-8 rounded-full border-2 border-dashed border-primary text-primary text-xs font-semibold">+ Add</button>
          </div>
        </Section>

        <Section title="Photos / Gallery">
          <div className="grid grid-cols-4 gap-2 mt-2">
            <img src={galleryCafe} alt="Cafe" className="aspect-square rounded-xl object-cover w-full" />
            <img src={galleryGym} alt="Gym" className="aspect-square rounded-xl object-cover w-full" />
            <img src={galleryShopping} alt="Shopping" className="aspect-square rounded-xl object-cover w-full" />
            <button className="aspect-square rounded-xl border-2 border-dashed border-primary text-primary flex items-center justify-center"><Plus /></button>
          </div>
        </Section>


      </div>
    </MobileShell>
  );
}

function Section({ title, link, children }: { title: string; link?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-foreground text-sm">{title}</h3>
        {link && <Link to={link as any} className="text-primary text-xs font-semibold flex items-center">Edit <ChevronRight className="w-3 h-3" /></Link>}
      </div>
      {children}
    </div>
  );
}

export default Profile;
