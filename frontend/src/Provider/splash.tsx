import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

// Route configuration moved to pages/Provider
function Splash() {
  return (
    <MobileShell hideNav noPadding>
      <div className="relative h-dvh flex flex-col gradient-primary overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-white/10 blur-2xl" />

        <div className="flex-1 flex flex-col items-center justify-center px-8 z-10">
          {/* Logo */}
          <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center shadow-card-lg mb-6 relative">
            <span className="text-primary text-4xl font-extrabold">M</span>
            <div className="absolute -bottom-1.5 -right-1.5 w-9 h-9 rounded-xl gradient-amber flex items-center justify-center shadow-card">
              <Briefcase className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
          </div>

          <h1 className="text-white text-[34px] font-extrabold tracking-tight">Partnerji</h1>
          <div className="mt-2 px-4 py-1 rounded-full bg-white/20 backdrop-blur border border-white/30">
            <span className="text-white text-xs font-semibold tracking-wide">FOR COMPANIONS</span>
          </div>
          <p className="text-white/70 text-center text-base mt-4 max-w-[260px]">
            Earn on your schedule. Be someone's perfect mate.
          </p>

          {/* Floating stat cards */}
          <div className="relative mt-10 w-full h-44">
            <div className="absolute left-2 top-0 bg-white rounded-2xl shadow-card px-4 py-2.5 animate-float">
              <p className="text-primary font-bold text-sm">₹48,200 earned</p>
              <p className="text-muted-foreground text-[11px]">This month</p>
            </div>
            <div className="absolute right-2 top-10 bg-white rounded-2xl shadow-card px-4 py-2.5 animate-float-delay">
              <p className="text-primary font-bold text-sm">4.9 ⭐ Rating</p>
              <p className="text-muted-foreground text-[11px]">124 reviews</p>
            </div>
            <div className="absolute left-6 top-24 bg-white rounded-2xl shadow-card px-4 py-2.5 animate-float-delay-2">
              <p className="text-primary font-bold text-sm">248 Bookings</p>
              <p className="text-muted-foreground text-[11px]">Completed</p>
            </div>
          </div>
        </div>

        {/* Bottom panel */}
        <div className="bg-white rounded-t-[32px] px-6 pt-7 pb-8 z-10">
          <Link
            to="/Provider/auth/phone"
            className="block w-full gradient-amber rounded-2xl h-14 flex items-center justify-center text-white font-bold text-base shadow-card"
          >
            Start Earning
          </Link>
          <Link
            to="/Provider/auth/phone"
            className="block text-center mt-4 text-primary font-semibold text-sm"
          >
            Already a companion? Sign In
          </Link>
        </div>
      </div>
    </MobileShell>
  );
}

export default Splash;
