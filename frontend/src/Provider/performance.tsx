import { createFileRoute } from "@tanstack/react-router";
import { MobileShell, TopBar } from "@/components/MobileShell";

// Route configuration moved to pages/Provider
const weeks = [6, 8, 5, 9, 11, 7, 10, 11];
const stars = [{ n: 5, c: 89, p: 72 }, { n: 4, c: 28, p: 23 }, { n: 3, c: 5, p: 4 }, { n: 2, c: 2, p: 1 }, { n: 1, c: 0, p: 0 }];

function Performance() {
  const max = Math.max(...weeks);
  return (
    <MobileShell hideNav>
      <TopBar title="My Performance" back backTo="/Provider/home" />
      <div className="px-5 pt-4 pb-8 space-y-4">
        <div className="gradient-primary rounded-2xl p-5 text-white shadow-card-lg text-center">
          <p className="text-white/80 text-xs font-semibold">PERFORMANCE SCORE</p>
          <p className="text-5xl font-extrabold mt-2">94<span className="text-2xl text-white/70">/100</span></p>
          <span className="mt-3 inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold">EXCELLENT</span>
          <p className="text-white/90 text-xs mt-2">🏆 Top 5% of companions in Bhopal</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { i: "⭐", v: "4.9", l: "Rating", sub: "↑ from 4.7", c: "text-secondary" },
            { i: "✅", v: "94%", l: "Acceptance", sub: "Avg: 82%", c: "text-primary" },
            { i: "⚡", v: "2 min", l: "Response", sub: "Excellent", c: "text-primary" },
            { i: "🔄", v: "34%", l: "Repeat", sub: "↑ 8% this month", c: "text-secondary" },
          ].map((m, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-card">
              <p className="text-lg">{m.i}</p>
              <p className={`text-xl font-extrabold mt-1 ${m.c}`}>{m.v}</p>
              <p className="text-xs font-semibold text-foreground">{m.l}</p>
              <p className="text-[10px] text-primary mt-0.5">{m.sub}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-card">
          <p className="font-bold text-foreground text-sm">Booking Trend (8 weeks)</p>
          <div className="mt-4 flex items-end gap-2 h-32">
            {weeks.map((w, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-[9px] font-bold text-foreground">{w}</div>
                <div className="w-full rounded-t-lg gradient-primary-soft" style={{ height: `${(w / max) * 100}%` }} />
                <div className="text-[9px] text-muted-foreground">W{i + 1}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-card">
          <p className="font-bold text-foreground text-sm">Cancellation Analysis</p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div><p className="text-2xl font-extrabold text-foreground">1</p><p className="text-[10px] text-muted-foreground">Total</p></div>
            <div><p className="text-2xl font-extrabold text-primary">0</p><p className="text-[10px] text-muted-foreground">By you</p></div>
            <div><p className="text-2xl font-extrabold text-foreground">1</p><p className="text-[10px] text-muted-foreground">By customer</p></div>
          </div>
          <div className="mt-3 p-3 bg-mint rounded-xl text-xs font-semibold text-primary text-center">✓ Great! Low cancellation rate</div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-card">
          <p className="font-bold text-foreground text-sm">Customer Satisfaction</p>
          <div className="mt-3 space-y-2">
            {stars.map(s => (
              <div key={s.n} className="flex items-center gap-2 text-xs">
                <span className="font-bold w-6 text-foreground">{s.n}⭐</span>
                <div className="flex-1 h-2 rounded-full bg-mint overflow-hidden">
                  <div className="h-full gradient-primary-soft" style={{ width: `${s.p}%` }} />
                </div>
                <span className="font-semibold text-foreground w-16 text-right">{s.c} ({s.p}%)</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-card">
          <p className="font-bold text-foreground text-sm mb-3">Badges Earned</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { i: "🏆", t: "Top Rated", d: "4.9+ for 3 months" },
              { i: "⚡", t: "Quick Responder", d: "<3 min response" },
              { i: "💯", t: "100 Bookings", d: "100+ sessions" },
              { i: "🔥", t: "Trending", d: "Top booked this week" },
            ].map((b, i) => (
              <div key={i} className="bg-mint rounded-xl p-3 text-center">
                <p className="text-2xl">{b.i}</p>
                <p className="font-bold text-xs text-foreground mt-1">{b.t}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileShell>
  );
}

export default Performance;
