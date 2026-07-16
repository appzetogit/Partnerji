import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { useState } from "react";

function Stepper({ step, total = 5 }: { step: number; total?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`h-1.5 rounded-full transition-all ${i < step ? "w-8 bg-primary" : "w-4 bg-border"}`} />
      ))}
    </div>
  );
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const slots = ["Morning", "Afternoon", "Evening"];
const initialGrid: Record<string, boolean[]> = {
  Mon: [true, true, true],
  Tue: [true, true, true],
  Wed: [true, true, true],
  Thu: [true, true, true],
  Fri: [true, true, true],
  Sat: [true, true, false],
  Sun: [false, false, false],
};

// Route configuration moved to pages/Provider
function Pricing() {
  const [grid, setGrid] = useState(initialGrid);
  const [minBooking, setMinBooking] = useState("1 Hr");
  const [instant, setInstant] = useState(true);
  return (
    <MobileShell hideNav>
      <div className="px-6 pt-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/Provider/auth/services" className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Stepper step={4} />
          <div className="w-10" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Set your pricing</h1>
        <p className="text-muted-foreground mt-2">Step 4 of 5 — Pricing & Availability</p>

        <div className="mt-6">
          <label className="text-xs font-semibold text-muted-foreground">HOURLY RATE</label>
          <div className="mt-2 bg-white rounded-2xl border border-border p-4 shadow-card flex items-center gap-3">
            <span className="text-3xl font-bold text-primary">₹</span>
            <input defaultValue="450" className="flex-1 text-3xl font-bold text-foreground outline-none w-full" />
            <span className="text-muted-foreground text-sm font-semibold">/ hour</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            💡 Most companions in Bhopal charge <span className="font-semibold text-foreground">₹300–₹800/hr</span>
          </p>
        </div>

        <div className="mt-6">
          <label className="text-xs font-semibold text-muted-foreground">MINIMUM BOOKING</label>
          <div className="mt-2 flex gap-2">
            {["1 Hr", "2 Hrs", "No minimum"].map((o) => (
              <button key={o} onClick={() => setMinBooking(o)} className={`flex-1 h-11 rounded-full text-sm font-semibold border-2 ${minBooking === o ? "bg-primary text-white border-primary" : "bg-white text-foreground border-border"}`}>
                {o}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label className="text-xs font-semibold text-muted-foreground">WEEKLY AVAILABILITY</label>
          <div className="mt-2 bg-white rounded-2xl border border-border p-3 shadow-card">
            <div className="grid grid-cols-4 gap-1.5 mb-2">
              <div></div>
              {slots.map(s => <div key={s} className="text-[10px] font-semibold text-muted-foreground text-center">{s}</div>)}
            </div>
            {days.map(d => (
              <div key={d} className="grid grid-cols-4 gap-1.5 mb-1.5">
                <div className="text-xs font-semibold text-foreground flex items-center">{d}</div>
                {grid[d].map((on, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const next = { ...grid, [d]: [...grid[d]] };
                      next[d][i] = !on;
                      setGrid(next);
                    }}
                    className={`h-9 rounded-lg text-xs font-semibold transition ${on ? "bg-primary text-white" : "bg-mint text-muted-foreground"}`}
                  >
                    {on ? "ON" : "OFF"}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-2xl border border-border p-4 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="font-semibold text-foreground">Accept instant bookings</p>
              <p className="text-xs text-muted-foreground mt-0.5">Customers can book you without waiting for approval</p>
            </div>
            <button onClick={() => setInstant(!instant)} className={`w-12 h-7 rounded-full p-0.5 transition ${instant ? "bg-primary" : "bg-border"}`}>
              <div className={`w-6 h-6 rounded-full bg-white shadow transition ${instant ? "translate-x-5" : ""}`} />
            </button>
          </div>
        </div>

        <Link to="/Provider/auth/verify" className="mt-6 w-full h-14 bg-primary rounded-2xl flex items-center justify-center text-white font-bold shadow-card">
          Continue
        </Link>
      </div>
    </MobileShell>
  );
}

export default Pricing;
