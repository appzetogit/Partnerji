import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell, TopBar } from "@/components/MobileShell";
import { useState } from "react";

// Route configuration moved to pages/Provider
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const slots = ["Morning\n6AM–12PM", "Afternoon\n12PM–6PM", "Evening\n6PM–12AM"];
const init: Record<string, boolean[]> = {
  Mon: [true, true, true], Tue: [true, true, false], Wed: [true, true, true],
  Thu: [false, false, false], Fri: [true, true, true], Sat: [true, true, false], Sun: [false, false, false],
};

function Availability() {
  const [grid, setGrid] = useState(init);
  const [instant, setInstant] = useState(true);
  const [scheduled, setScheduled] = useState(true);
  const blocked = [3, 14, 22];

  return (
    <MobileShell hideNav>
      <TopBar title="Set Availability" back backTo="/Provider/profile" />
      <div className="px-5 pt-4 pb-8 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-card space-y-3">
          <Toggle on={instant} onChange={setInstant} title="Accept instant bookings" sub="Customers book without approval" />
          <div className="h-px bg-border" />
          <Toggle on={scheduled} onChange={setScheduled} title="Accept scheduled bookings" sub="Customers can pre-book" />
        </div>

        <div className="bg-white rounded-2xl p-3 shadow-card">
          <p className="text-xs font-semibold text-muted-foreground px-1 mb-2">WEEKLY AVAILABILITY</p>
          <div className="grid grid-cols-4 gap-1.5 mb-2">
            <div />
            {slots.map(s => <div key={s} className="text-[9px] font-semibold text-muted-foreground text-center whitespace-pre-line leading-tight">{s}</div>)}
          </div>
          {days.map(d => (
            <div key={d} className="grid grid-cols-4 gap-1.5 mb-1.5">
              <div className="text-xs font-semibold text-foreground flex items-center">{d}</div>
              {(grid[d] || [false, false, false]).map((on, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const next = { ...grid, [d]: [...(grid[d] || [false, false, false])] };
                    next[d][i] = !on;
                    setGrid(next);
                  }}
                  className={`h-10 rounded-lg text-xs font-bold transition ${on ? "bg-primary text-white" : "bg-mint text-muted-foreground"}`}
                >
                  {on ? "ON" : "OFF"}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-card">
          <p className="font-bold text-foreground text-sm">Block Specific Dates</p>
          <div className="mt-3 grid grid-cols-7 gap-1.5">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i} className="text-[10px] font-semibold text-muted-foreground text-center">{d}</div>)}
            {Array.from({ length: 31 }).map((_, i) => {
              const n = i + 1;
              const isBlocked = blocked.includes(n);
              return (
                <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-xs font-semibold ${isBlocked ? "bg-destructive text-white" : "bg-mint text-foreground"}`}>
                  {n}
                </div>
              );
            })}
          </div>
          <button className="mt-3 w-full h-10 bg-mint rounded-xl text-primary font-semibold text-sm">+ Block Date</button>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-card">
          <p className="text-xs font-semibold text-muted-foreground">ADVANCE BOOKING WINDOW</p>
          <select className="mt-2 w-full h-11 rounded-xl bg-mint border border-border px-3 font-semibold text-foreground">
            <option>Same day</option><option>1 day ahead</option><option>3 days</option><option>1 week</option><option>2 weeks</option>
          </select>
        </div>

        <Link to="/Provider/profile" className="block w-full h-14 bg-primary rounded-2xl flex items-center justify-center text-white font-bold shadow-card">
          Save Availability
        </Link>
      </div>
    </MobileShell>
  );
}

function Toggle({ on, onChange, title, sub }: { on: boolean; onChange: (b: boolean) => void; title: string; sub: string }) {
  return (
    <div className="flex items-center">
      <div className="flex-1">
        <p className="font-semibold text-foreground text-sm">{title}</p>
        <p className="text-[11px] text-muted-foreground">{sub}</p>
      </div>
      <button onClick={() => onChange(!on)} className={`w-12 h-7 rounded-full p-0.5 transition ${on ? "bg-primary" : "bg-border"}`}>
        <div className={`w-6 h-6 rounded-full bg-white shadow transition ${on ? "translate-x-5" : ""}`} />
      </button>
    </div>
  );
}

export default Availability;
