import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/Partnerji/Shell";
import { ArrowLeft, ChevronDown, Lock } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/payment")({ component: PaymentPage });

const tabs = ["UPI", "Card", "Wallet", "Net Banking"] as const;

function PaymentPage() {
  const [tab, setTab] = useState<typeof tabs[number]>("UPI");
  const [upi, setUpi] = useState("ravi@okaxis");

  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
        <header className="px-5 pt-6 pb-3 flex items-center gap-3">
          <Link to="/book/$id" params={{ id: "priya" }} className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center"><ArrowLeft size={20} /></Link>
          <h1 className="text-lg font-bold">Payment</h1>
        </header>

        <div className="px-5">
          <div className="bg-white rounded-2xl shadow-soft p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Order Summary</div>
              <div className="font-semibold text-sm mt-0.5">Priya Sharma · Shopping Mate · 2 hrs</div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-secondary font-extrabold">₹992</span>
              <ChevronDown size={16} className="text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* tabs */}
        <div className="mt-5 px-5 flex gap-5 border-b border-border">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} className="relative pb-3">
              <span className={`text-sm font-semibold ${tab === t ? "text-primary" : "text-muted-foreground"}`}>{t}</span>
              {tab === t && <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary rounded-full" />}
            </button>
          ))}
        </div>

        <div className="px-5 mt-5">
          {tab === "UPI" && (
            <div className="space-y-3">
              <div className="text-sm font-bold">Saved UPI IDs</div>
              {[
                { name: "GooglePay", id: "ravi@okaxis", color: "bg-blue-100 text-blue-600" },
                { name: "PhonePe", id: "ravi@ybl", color: "bg-purple-100 text-purple-600" },
              ].map(u => (
                <button key={u.id} onClick={() => setUpi(u.id)} className="w-full bg-white rounded-xl shadow-soft p-3 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${u.color} flex items-center justify-center font-bold text-xs`}>{u.name[0]}</div>
                  <div className="flex-1 text-left">
                    <div className="text-xs text-muted-foreground">{u.name}</div>
                    <div className="font-semibold text-sm">{u.id}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 ${upi === u.id ? "border-primary" : "border-border"} flex items-center justify-center`}>
                    {upi === u.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                </button>
              ))}
              <button className="text-sm text-primary font-semibold">+ Add new UPI ID</button>
              <div className="flex gap-2 mt-3">
                <input placeholder="Enter UPI ID" className="flex-1 h-12 rounded-xl bg-white shadow-soft px-4 text-sm outline-none" />
                <button className="px-4 h-12 rounded-xl bg-primary-soft text-primary font-bold text-xs">Verify</button>
              </div>
            </div>
          )}

          {tab === "Card" && (
            <div className="space-y-3">
              <Field label="Card Number" placeholder="1234 5678 9012 3456" />
              <div className="flex gap-2">
                <Field label="Expiry" placeholder="MM/YY" />
                <Field label="CVV" placeholder="123" />
              </div>
              <Field label="Card Holder Name" placeholder="RAVI KUMAR" />
              <label className="flex items-center gap-2 text-xs"><input type="checkbox" /> Save card for future</label>
            </div>
          )}

          {tab === "Wallet" && (
            <div>
              <div className="rounded-2xl p-5 text-white shadow-glow" style={{ background: "linear-gradient(135deg,#6C3FE8,#9B6DFF)" }}>
                <div className="text-xs text-white/70 font-semibold">Partnerji Wallet</div>
                <div className="text-3xl font-extrabold mt-1">₹2,340</div>
                <span className="inline-block mt-2 text-[10px] font-bold bg-emerald-400 text-white px-2 py-1 rounded-full">Sufficient balance ✓</span>
              </div>
              <div className="text-xs text-muted-foreground mt-3 text-center">Remaining after payment: <span className="font-bold text-foreground">₹1,348</span></div>
            </div>
          )}

          {tab === "Net Banking" && (
            <div className="grid grid-cols-2 gap-2">
              {["HDFC", "ICICI", "SBI", "Axis", "Kotak", "Yes Bank"].map(b => (
                <button key={b} className="h-14 rounded-xl bg-white shadow-soft text-sm font-bold">{b}</button>
              ))}
            </div>
          )}
        </div>

        <div className="px-5 mt-6">
          <Link to="/confirmed" className={`h-[54px] ${tab === "Wallet" ? "grad-amber" : "grad-primary"} rounded-full text-white font-bold flex items-center justify-center shadow-soft`}>
            {tab === "Wallet" ? "Pay ₹992 from Wallet" : "Pay ₹992"}
          </Link>
        </div>

        <div className="px-5 mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
          <Lock size={12} /> Payments secured by 256-bit encryption
        </div>
      </div>
    </MobileFrame>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="flex-1">
      <div className="text-[11px] font-semibold text-muted-foreground mb-1">{label}</div>
      <input placeholder={placeholder} className="w-full h-12 rounded-xl bg-white shadow-soft px-4 text-sm outline-none" />
    </div>
  );
}
