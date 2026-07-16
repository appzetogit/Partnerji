import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell, TopBar } from "@/components/MobileShell";
import { formatINR } from "@/lib/mock-data";
import { useState } from "react";

// Route configuration moved to pages/Provider
function Withdraw() {
  const [amt, setAmt] = useState("5000");
  const [mode, setMode] = useState("instant");
  return (
    <MobileShell hideNav>
      <TopBar title="Withdraw Earnings" back backTo="/Provider/earnings" />
      <div className="px-5 pt-4 pb-8 space-y-4">
        <div className="gradient-primary rounded-2xl p-5 text-white shadow-card-lg">
          <p className="text-white/80 text-xs font-semibold">AVAILABLE TO WITHDRAW</p>
          <p className="text-4xl font-extrabold mt-1">{formatINR(9920)}</p>
          <p className="text-white/70 text-xs mt-1">Min withdrawal: ₹500</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-card">
          <label className="text-xs font-semibold text-muted-foreground">ENTER AMOUNT</label>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-3xl font-bold text-primary">₹</span>
            <input value={amt} onChange={e => setAmt(e.target.value)} className="flex-1 text-3xl font-bold text-foreground outline-none" />
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide">
            {["500", "1000", "2000", "5000", "All"].map(v => (
              <button key={v} onClick={() => setAmt(v === "All" ? "9920" : v)} className="px-3 h-8 rounded-full bg-mint text-primary text-xs font-bold whitespace-nowrap">
                {v === "All" ? "All" : `₹${v}`}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border-l-4 border-primary p-4 shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-mint flex items-center justify-center">🏦</div>
            <div className="flex-1">
              <p className="font-bold text-foreground text-sm">HDFC Bank</p>
              <p className="text-xs text-muted-foreground">Savings ****4521 · Priya Sharma</p>
            </div>
          </div>
          <button className="mt-3 text-primary text-sm font-semibold">Change bank account →</button>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-card space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">ARRIVAL</p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setMode("instant")} className={`p-3 rounded-xl border-2 text-left ${mode === "instant" ? "border-primary bg-mint" : "border-border bg-white"}`}>
              <p className="font-bold text-sm text-foreground">⚡ Instant</p>
              <p className="text-[11px] text-muted-foreground">UPI · Free</p>
            </button>
            <button onClick={() => setMode("neft")} className={`p-3 rounded-xl border-2 text-left ${mode === "neft" ? "border-primary bg-mint" : "border-border bg-white"}`}>
              <p className="font-bold text-sm text-foreground">📅 NEFT</p>
              <p className="text-[11px] text-muted-foreground">1–2 days · Free</p>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-card space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Withdrawal amount</span><span className="font-semibold">{formatINR(parseInt(amt) || 0)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Processing fee</span><span className="font-semibold text-primary">FREE</span></div>
          <div className="h-px bg-border" />
          <div className="flex justify-between"><span className="font-bold">You'll receive</span><span className="font-extrabold text-primary text-lg">{formatINR(parseInt(amt) || 0)}</span></div>
        </div>

        <button className="w-full h-14 bg-primary rounded-2xl text-white font-bold shadow-card">Withdraw Now</button>

        <div>
          <h3 className="font-bold text-foreground mb-2 text-sm">Withdrawal History</h3>
          <div className="bg-white rounded-2xl shadow-card divide-y divide-border">
            {[{ d: "15 May", a: 5000 }, { d: "1 May", a: 3000 }].map((w, i) => (
              <div key={i} className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{w.d} · {formatINR(w.a)}</p>
                  <p className="text-[11px] text-muted-foreground">HDFC ****4521</p>
                </div>
                <span className="text-xs font-bold text-primary">✅ Settled</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileShell>
  );
}

export default Withdraw;
