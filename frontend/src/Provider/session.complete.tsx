import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Star } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { formatINR } from "@/lib/mock-data";

// Route configuration moved to pages/Provider
function Complete() {
  return (
    <MobileShell hideNav>
      <div className="flex flex-col min-h-dvh">
        {/* Top green */}
        <div className="gradient-primary relative pt-12 pb-16 px-6 flex flex-col items-center text-center overflow-hidden">
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-white/10 blur-2xl" />
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-card-lg z-10">
            <Check className="w-12 h-12 text-primary" strokeWidth={3} />
          </div>
          <h1 className="text-white text-2xl font-extrabold mt-5 z-10">Session Completed! 🎉</h1>
          <p className="text-white/90 mt-1 z-10">Great job, Priya!</p>
        </div>

        {/* Bottom white */}
        <div className="flex-1 bg-background px-5 -mt-8 rounded-t-3xl pt-6 pb-8 space-y-4">
          {/* Summary */}
          <div className="bg-white rounded-2xl p-4 shadow-card">
            <h3 className="font-bold text-foreground mb-3">Session Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Customer</span><span className="font-semibold text-foreground">Ravi Kumar</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-semibold text-foreground">🛍️ Shopping Mate</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-semibold text-foreground">2 hrs 0 min</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-semibold text-foreground">Today · 3:00–5:00 PM</span></div>
            </div>
          </div>

          {/* Earnings */}
          <div className="gradient-primary rounded-2xl p-5 text-white shadow-card-lg">
            <p className="text-white/80 text-xs font-semibold">YOU EARNED</p>
            <p className="text-4xl font-extrabold mt-1">{formatINR(900)}</p>
            <p className="text-white/70 text-xs mt-1">{formatINR(1000)} − {formatINR(100)} commission</p>
            <div className="mt-3 pt-3 border-t border-white/20 flex justify-between items-center">
              <span className="text-white/80 text-xs">Total wallet</span>
              <span className="font-bold">{formatINR(9920)}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="bg-white rounded-2xl p-4 shadow-card border-l-4 border-secondary">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />)}
            </div>
            <p className="font-bold text-foreground mt-2">Ravi gave you 5 stars!</p>
            <p className="text-sm text-foreground italic mt-1">"Priya was amazing! Very helpful and fun."</p>
          </div>

          <div className="space-y-2 pt-2">
            <Link to="/Provider/home" className="block w-full h-14 bg-primary rounded-2xl flex items-center justify-center text-white font-bold shadow-card">
              Go to Home
            </Link>
            <Link to="/Provider/earnings" className="block w-full h-12 bg-white border-2 border-primary rounded-xl flex items-center justify-center text-primary font-semibold">
              View Earnings
            </Link>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}

export default Complete;
