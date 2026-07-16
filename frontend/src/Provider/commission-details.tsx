import { useState } from "react";
import { MobileShell, TopBar } from "@/components/MobileShell";
import { Coins, Percent, ArrowRightLeft, Info, HelpCircle } from "lucide-react";

function CommissionDetails() {
  const commissionRate = 15; // 15%
  const [calcAmount, setCalcAmount] = useState<number>(2000);

  const platformFee = (calcAmount * commissionRate) / 100;
  const netEarnings = calcAmount - platformFee;

  const faqs = [
    {
      q: "Why does Partnerji charge a commission?",
      a: "The 15% service fee helps us cover payment processing fees, 24/7 background trust & safety vetting, emergency SOS response dispatch, and platform server maintenance costs."
    },
    {
      q: "Are there any hidden charges?",
      a: "No. There are no registration fees, monthly subscription fees, or hidden transaction charges. You only pay when you make successful bookings."
    },
    {
      q: "How are tips/bonuses calculated?",
      a: "Any tips or voluntary cash bonuses given by customers are 100% yours to keep. Partnerji takes 0% commission on client tips."
    }
  ];

  return (
    <MobileShell hideNav>
      <TopBar title="Commission Details" back backTo="/Provider/more" />

      <div className="px-5 pt-4 pb-8 space-y-4 bg-[#F8F9FA] min-h-[calc(100vh-60px)]">
        {/* Main Stats Header */}
        <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-50 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PLATFORM COMMISSION</p>
            <h2 className="text-3xl font-black text-slate-800 mt-1">{commissionRate}%</h2>
            <p className="text-xs text-muted-foreground mt-1">Deducted per completed session</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Coins className="w-7 h-7 text-primary" />
          </div>
        </div>

        {/* Calculation Calculator */}
        <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100 space-y-4">
          <div>
            <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-primary" /> Earnings Calculator
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">Estimate your net payout for a booking rate</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">BOOKING AMOUNT (₹)</label>
              <input
                type="number"
                value={calcAmount}
                onChange={(e) => setCalcAmount(Math.max(0, Number(e.target.value)))}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm font-bold focus:outline-primary bg-slate-50"
              />
            </div>

            <div className="h-px bg-slate-100 my-2" />

            <div className="space-y-2 text-xs font-semibold">
              <div className="flex justify-between text-slate-500">
                <span>Client Paid Amount</span>
                <span>₹{calcAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>Partnerji Commission ({commissionRate}%)</span>
                <span>- ₹{platformFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-primary font-bold text-sm border-t border-slate-50 pt-2">
                <span>Your Net Payout</span>
                <span>₹{netEarnings.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Why fee info card */}
        <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 flex gap-3">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Your net payouts are calculated dynamically and transferred to your linked bank account automatically. There are no manual withdraw limits or delays.
          </p>
        </div>

        {/* FAQs list */}
        <div className="space-y-2.5">
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-1">
            FREQUENTLY ASKED QUESTIONS
          </p>

          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-card border border-slate-50 space-y-1.5">
              <h4 className="font-extrabold text-xs text-slate-800 flex items-start gap-1.5 leading-snug">
                <HelpCircle className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                {faq.q}
              </h4>
              <p className="text-[11px] text-muted-foreground pl-5 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}

export default CommissionDetails;
