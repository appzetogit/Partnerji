import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MobileFrame } from "@/components/Partnerji/Shell";
import { Plus, ArrowDownLeft, ArrowUpRight, Filter, X } from "lucide-react";

export const Route = createFileRoute("/wallet")({ component: WalletPage });

const txs = [
  { type: "debit", label: "Booking — Priya Sharma (Shopping)", amount: 992, date: "Today, 2:55 PM" },
  { type: "credit", label: "Money Added (UPI)", amount: 2000, date: "22 May" },
  { type: "debit", label: "Booking — Rahul Mehta (Gym)", amount: 525, date: "18 May" },
  { type: "credit", label: "Refund — Rohan Das", amount: 300, date: "17 May" },
  { type: "debit", label: "Booking — Anjali Verma", amount: 1800, date: "15 May" },
  { type: "credit", label: "Cashback — MATE20 promo", amount: 99, date: "15 May" },
];

function WalletPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all"); // "all", "credit", "debit"

  const filteredTxs = txs.filter(t => {
    if (activeFilter === "all") return true;
    return t.type === activeFilter;
  });

  return (
    <MobileFrame withNav>
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/20 relative">
        <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
          <header className="px-5 pt-6 pb-4">
            <h1 className="text-xl font-black text-slate-800 tracking-tight">My Wallet</h1>
          </header>

          {/* Balance Card */}
          <div className="px-5">
            <div className="relative rounded-2xl p-5 text-white shadow-md overflow-hidden" style={{ background: "linear-gradient(135deg,#6C3FE8 0%,#8A5CF5 100%)" }}>
              {/* Background elements */}
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/10 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-purple-400/20 rounded-full blur-xl" />

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-white/70 font-extrabold">Partnerji Wallet</span>
                  <button className="px-3 py-1.5 rounded-xl bg-white text-primary text-[10px] font-extrabold flex items-center gap-1 shadow-sm active:scale-95 transition-all">
                    <Plus size={12} className="stroke-[3]" /> Add Money
                  </button>
                </div>
                <div className="mt-5">
                  <div className="text-3xl font-black tracking-tight tabular-nums">₹2,340<span className="text-lg">.00</span></div>
                  <div className="text-[10px] text-white/80 mt-0.5 font-bold">Available Balance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions Header */}
          <div className="flex items-center justify-between px-5 mt-6 mb-3">
            <h2 className="font-extrabold text-slate-800 text-base tracking-tight">Transactions</h2>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
            >
              <Filter size={13} className="text-primary stroke-[2.5]" /> Filter
            </button>
          </div>

          {/* Transactions List */}
          <div className="px-5">
            <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm divide-y divide-slate-100 overflow-hidden">
              {filteredTxs.length > 0 ? (
                filteredTxs.map((t, i) => (
                  <div key={i} className="flex items-center gap-3.5 p-4 hover:bg-slate-50/50 transition-colors">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${t.type === "debit" ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-600"
                      }`}>
                      {t.type === "debit" ? <ArrowUpRight size={16} className="stroke-[2.5]" /> : <ArrowDownLeft size={16} className="stroke-[2.5]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-800 truncate leading-snug">{t.label}</div>
                      <div className="text-[10px] text-slate-400 font-medium mt-0.5">{t.date}</div>
                    </div>
                    <div className={`font-black text-xs tabular-nums shrink-0 ${t.type === "debit" ? "text-red-500" : "text-emerald-600"
                      }`}>
                      {t.type === "debit" ? "-" : "+"}₹{t.amount.toLocaleString("en-IN")}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs font-medium text-slate-400">No transactions found</div>
              )}
            </div>
          </div>
        </div>

        {/* Filter Modal Overlay */}
        {isFilterOpen && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end justify-center">
            <div className="bg-white w-full rounded-t-2xl p-4 pb-4 shadow-card animate-in slide-in-from-bottom duration-300">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-extrabold text-slate-800 text-xs">Filter Transactions</span>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X size={13} />
                </button>
              </div>

              <div className="mt-3 space-y-3">
                <div>
                  <span className="text-[9px] uppercase font-extrabold text-slate-400 tracking-wider">Transaction Type</span>
                  <div className="flex flex-col gap-1.5 mt-1.5">
                    {[
                      { id: "all", label: "All Transactions" },
                      { id: "credit", label: "Added Money & Refunds (Credits)" },
                      { id: "debit", label: "Bookings (Debits)" },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setActiveFilter(opt.id);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full py-2 px-3 rounded-lg text-left text-xs font-bold transition-all border ${activeFilter === opt.id
                          ? "bg-primary-soft border-primary/20 text-primary"
                          : "bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100"
                          }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </MobileFrame>
  );
}
