import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Minus, Plus } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { categories } from "@/lib/mock-data";
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

// Route configuration moved to pages/Provider
function Services() {
  const [selected, setSelected] = useState<string[]>(["Shopping Mate", "Gym Partner", "Dining Companion"]);
  const [langs, setLangs] = useState<string[]>(["Hindi", "English"]);
  const [years, setYears] = useState(2);

  const toggle = (s: string) => setSelected((p) => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);
  const toggleLang = (s: string) => setLangs((p) => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

  return (
    <MobileShell hideNav>
      <div className="px-6 pt-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/Provider/auth/details" className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Stepper step={3} />
          <div className="w-10" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">What services will you offer?</h1>
        <p className="text-muted-foreground mt-2">Step 3 of 5 — Select your categories</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {categories.map((c) => {
            const isOn = selected.includes(c.label);
            return (
              <button
                key={c.label}
                onClick={() => toggle(c.label)}
                className={`relative p-3 rounded-2xl border-2 text-left transition ${isOn ? "bg-primary/5 border-primary" : "bg-white border-border"
                  }`}
              >
                <div className="text-2xl">{c.icon}</div>
                <div className="text-sm font-semibold text-foreground mt-1.5">{c.label}</div>
                {isOn && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          <label className="text-xs font-semibold text-muted-foreground">LANGUAGES SPOKEN</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {["Hindi", "English", "Urdu", "Marathi", "Other"].map((l) => {
              const on = langs.includes(l);
              return (
                <button key={l} onClick={() => toggleLang(l)} className={`px-4 h-10 rounded-full text-sm font-semibold border-2 ${on ? "bg-primary text-white border-primary" : "bg-white text-foreground border-border"}`}>
                  {l}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <label className="text-xs font-semibold text-muted-foreground">YEARS OF EXPERIENCE</label>
          <div className="mt-2 flex items-center gap-3 bg-white rounded-xl p-2 border border-border shadow-card w-fit">
            <button onClick={() => setYears(Math.max(0, years - 1))} className="w-10 h-10 rounded-lg bg-mint flex items-center justify-center text-primary">
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-bold text-foreground">{years}</span>
            <button onClick={() => setYears(years + 1)} className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-6">
          <label className="text-xs font-semibold text-muted-foreground">BIO / DESCRIPTION</label>
          <textarea
            defaultValue="Hi! I'm Priya, a cheerful and reliable companion based in Bhopal. I love shopping, fitness, and meeting new people."
            maxLength={300}
            rows={4}
            className="mt-2 w-full rounded-xl bg-white border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary shadow-card resize-none"
          />
          <p className="text-xs text-muted-foreground text-right mt-1">142 / 300</p>
        </div>

        <Link to="/Provider/auth/pricing" className="mt-6 w-full h-14 bg-primary rounded-2xl flex items-center justify-center text-white font-bold shadow-card">
          Continue
        </Link>
      </div>
    </MobileShell>
  );
}

export default Services;
