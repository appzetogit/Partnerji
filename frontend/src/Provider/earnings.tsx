import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { earningsChart, formatINR, transactions } from "@/lib/mock-data";
import { useState } from "react";

// Route configuration moved to pages/Provider
const periods = ["Today", "This Week", "This Month", "Custom"];

function Earnings() {
  const [p, setP] = useState("This Month");
  const max = Math.max(...earningsChart.map(d => d.amount));
  const W = 320, H = 140, padL = 24, padR = 8, padT = 12, padB = 28;
  const stepX = (W - padL - padR) / (earningsChart.length - 1);
  const points = earningsChart.map((d, i) => ({
    x: padL + i * stepX,
    y: padT + (1 - d.amount / max) * (H - padT - padB),
    d,
  }));
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const area = `${path} L ${points[points.length - 1].x} ${H - padB} L ${points[0].x} ${H - padB} Z`;

  return (
    <MobileShell>
      {/* Premium Header */}
      <header className="px-5 pt-5 pb-3 flex items-center justify-between bg-background sticky top-0 z-30">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-1.5">
            My Earnings
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
          </h1>
          <p className="text-[11px] text-muted-foreground font-medium mt-0.5">Track your service revenue</p>
        </div>
        <button className="w-10 h-10 rounded-xl bg-white border border-border/80 shadow-soft flex items-center justify-center text-foreground hover:scale-105 active:scale-95 transition-all">
          <Download className="w-4.5 h-4.5 text-muted-foreground" />
        </button>
      </header>

      {/* Segmented Period Tabs */}
      <div className="px-5 py-2">
        <div className="flex p-1 bg-muted/40 border border-border/60 rounded-xl">
          {periods.map(t => {
            const active = p === t;
            return (
              <button
                key={t}
                onClick={() => setP(t)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 focus:outline-none ${active
                    ? "bg-white text-primary shadow-soft"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-5 space-y-4">
        {/* Summary Card */}
        <div className="gradient-primary rounded-2xl p-4 text-white shadow-card relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-xl" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-white/80 text-[9px] font-bold tracking-wider uppercase leading-none">{p === "This Month" ? "MAY 2026" : p.toUpperCase()}</p>
              <p className="text-3xl font-black mt-1.5 leading-none">{formatINR(9920)}</p>
              <p className="text-white/70 text-[10px] font-semibold mt-1 leading-none">Net Earnings</p>
            </div>
            <Link
              to="/Provider/withdraw"
              className="gradient-amber px-3 h-8 rounded-lg flex items-center justify-center text-white font-bold text-[11px] shadow-soft hover:shadow-glow active:scale-95 transition-all"
            >
              Withdraw
            </Link>
          </div>

          <div className="relative mt-4 pt-3 border-t border-white/15 grid grid-cols-3 gap-2 text-center text-white">
            <div>
              <p className="text-[9px] text-white/60 font-bold tracking-wider leading-none uppercase">Gross</p>
              <p className="font-extrabold text-xs mt-1 leading-none">{formatINR(12400)}</p>
            </div>
            <div className="border-l border-white/10">
              <p className="text-[9px] text-white/60 font-bold tracking-wider leading-none uppercase">Fee (10%)</p>
              <p className="font-extrabold text-xs mt-1 leading-none">-{formatINR(2480)}</p>
            </div>
            <div className="border-l border-white/10">
              <p className="text-[9px] text-white/60 font-bold tracking-wider leading-none uppercase">Net</p>
              <p className="font-extrabold text-xs mt-1 leading-none">{formatINR(9920)}</p>
            </div>
          </div>
        </div>

        {/* SVG Earnings Chart */}
        <div className="bg-white rounded-2xl p-4 border border-border/60 shadow-card">
          <p className="font-bold text-foreground text-sm mb-3">Weekly Earnings</p>
          <div className="relative">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-40">
              <defs>
                <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0F9B77" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0F9B77" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Background Dotted Grid Lines */}
              <line x1={padL} y1={padT} x2={W - padR} y2={padT} stroke="rgba(15,155,119,0.08)" strokeDasharray="3 3" />
              <line x1={padL} y1={(padT + H - padB) / 2} x2={W - padR} y2={(padT + H - padB) / 2} stroke="rgba(15,155,119,0.08)" strokeDasharray="3 3" />
              <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="rgba(15,155,119,0.08)" strokeDasharray="3 3" />

              {/* Area Under Curve */}
              <path d={area} fill="url(#area)" />

              {/* Soft line glow (behind main line) */}
              <path d={path} stroke="#0F9B77" strokeWidth="5.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-15" />

              {/* Main Chart Line */}
              <path d={path} stroke="#0F9B77" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

              {/* Data points */}
              {points.map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="3.5" fill="#0F9B77" />
                  <circle cx={pt.x} cy={pt.y} r="1.5" fill="white" />
                  <text x={pt.x} y={H - 8} textAnchor="middle" fontSize="9" fill="#9CA3AF" fontWeight="700">{pt.d.day}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Mini icon="📦" value="11" label="Bookings" />
          <Mini icon="⭐" value="4.9" label="Avg Rating" />
          <Mini icon="⏱" value="1.8 hrs" label="Avg Session" />
        </div>

        {/* Transactions */}
        <div className="pb-6">
          <h3 className="font-bold text-foreground mb-3">Recent Transactions</h3>
          <div className="bg-white rounded-2xl border border-border/60 shadow-card divide-y divide-border/60 overflow-hidden">
            {transactions.map((t, i) => {
              const isEarning = t.type === "earning";
              return (
                <div key={i} className="p-3.5 flex items-center gap-3 hover:bg-muted/10 transition-colors duration-150">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isEarning ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-500"
                    }`}>
                    {isEarning ? (
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <ArrowDownLeft className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground text-xs leading-none">{t.customer}</p>
                    <p className="text-[10px] text-muted-foreground mt-1.5 leading-none truncate">
                      {t.service}{t.duration && ` · ${t.duration}`} · {t.date}
                    </p>
                  </div>
                  <p className={`font-extrabold text-sm shrink-0 ${isEarning ? "text-primary" : "text-rose-500"}`}>
                    {isEarning ? "+" : ""}{formatINR(t.amount)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MobileShell>
  );
}

function Mini({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="bg-white rounded-2xl p-3 border border-border/60 shadow-card text-center transition-all hover:scale-[1.02] duration-200">
      <p className="text-xl leading-none">{icon}</p>
      <p className="font-black text-foreground text-sm mt-1.5 leading-none">{value}</p>
      <p className="text-[10px] text-muted-foreground font-semibold mt-1 leading-none">{label}</p>
    </div>
  );
}

export default Earnings;
