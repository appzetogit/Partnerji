import { createFileRoute, Link } from "@tanstack/react-router";
import { Share2, Star, Edit3 } from "lucide-react";
import { MobileShell, TopBar } from "@/components/MobileShell";
import { provider, reviews, formatINR } from "@/lib/mock-data";

// Route configuration moved to pages/Provider
function Preview() {
  return (
    <MobileShell hideNav>
      <TopBar title="Your Public Profile" back backTo="/Provider/profile" right={<button className="w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center"><Share2 className="w-4 h-4" /></button>} />
      <div className="px-5 pt-2 pb-24">
        <div className="bg-secondary/15 border border-secondary/30 rounded-xl px-3 py-2 text-xs font-semibold text-secondary text-center mb-4">
          ⚠️ This is how customers see your profile
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-card text-center">
          <div className="w-28 h-28 rounded-full gradient-primary mx-auto flex items-center justify-center text-white font-bold text-3xl">PS</div>
          <p className="font-extrabold text-xl mt-3 text-foreground flex items-center justify-center gap-1.5">{provider.name} <span className="text-primary text-sm">✓</span></p>
          <p className="text-sm text-muted-foreground">📍 {provider.city}</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {provider.categories.map(c => <span key={c} className="px-3 py-1 rounded-full bg-mint text-primary text-xs font-semibold">{c}</span>)}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <Stat v="4.9" l="Rating" sub="124 reviews" />
            <Stat v="248" l="Bookings" sub="completed" />
            <Stat v="2 yrs" l="Experience" sub="" />
          </div>
          <div className="mt-3 flex gap-1 justify-center">
            {provider.languages.map(l => <span key={l} className="text-[10px] px-2 py-0.5 rounded-full bg-mint text-primary font-semibold">{l}</span>)}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-card mt-3">
          <h3 className="font-bold text-foreground text-sm mb-2">About</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">{provider.bio}</p>
          <p className="mt-3 font-bold text-primary text-lg">{formatINR(provider.hourlyRate)}/hr</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-card mt-3">
          <h3 className="font-bold text-foreground text-sm mb-2">Gallery</h3>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map(i => <div key={i} className="aspect-square rounded-xl gradient-primary opacity-80" style={{ filter: `hue-rotate(${i * 40}deg)` }} />)}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-card mt-3">
          <h3 className="font-bold text-foreground text-sm mb-3">Reviews</h3>
          <div className="space-y-3">
            {reviews.slice(0, 3).map((r, i) => (
              <div key={i} className="border-b border-border last:border-0 pb-3 last:pb-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-mint flex items-center justify-center text-primary text-xs font-bold">{r.avatar}</div>
                  <p className="font-bold text-sm text-foreground flex-1">{r.name}</p>
                  <div className="flex items-center gap-0.5 text-xs text-secondary font-bold"><Star className="w-3 h-3 fill-secondary" /> {r.rating}</div>
                </div>
                <p className="text-xs text-foreground mt-1.5">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>

        <button disabled className="mt-4 w-full h-14 bg-border rounded-2xl text-muted-foreground font-bold">Book Now (Preview Mode)</button>

        <Link to="/Provider/profile" className="fixed bottom-6 right-6 max-w-[calc(420px-3rem)] w-auto bg-primary text-white px-5 h-12 rounded-full shadow-card-lg flex items-center gap-2 font-bold z-50" style={{ position: "absolute" }}>
          <Edit3 className="w-4 h-4" /> Edit Profile
        </Link>
      </div>
    </MobileShell>
  );
}

function Stat({ v, l, sub }: { v: string; l: string; sub: string }) {
  return (
    <div className="bg-mint rounded-xl p-2">
      <p className="font-extrabold text-foreground">{v}</p>
      <p className="text-[10px] text-foreground font-semibold">{l}</p>
      {sub && <p className="text-[9px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

export default Preview;
