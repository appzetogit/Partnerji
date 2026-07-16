import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock, Bell, MessageCircle } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

// Route configuration moved to pages/Provider
function Approval() {
  const steps = [
    { label: "Mobile verified", done: true },
    { label: "Profile completed", done: true },
    { label: "Documents uploaded", done: true },
    { label: "Bank account added", done: true },
    { label: "Admin review", done: false, pending: true },
  ];
  return (
    <MobileShell hideNav>
      <div className="px-6 pt-8 pb-8 flex flex-col items-center">
        {/* Animated clock */}
        <div className="relative w-36 h-36 mb-2">
          <div className="absolute inset-0 rounded-full gradient-primary opacity-10 animate-pulse" />
          <div className="absolute inset-3 rounded-full gradient-primary flex items-center justify-center">
            <Clock className="w-16 h-16 text-white animate-pulse-dot" />
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-foreground mt-4 text-center">Application Submitted! 🎉</h1>
        <div className="mt-3 px-4 py-1.5 rounded-full bg-warning/15 border border-warning/30">
          <span className="text-secondary text-xs font-bold">⏳ UNDER REVIEW</span>
        </div>
        <p className="text-muted-foreground text-center mt-4 text-sm leading-relaxed max-w-[300px]">
          Our team is reviewing your documents. This usually takes <span className="font-semibold text-foreground">24–48 hours</span>.
        </p>

        {/* Checklist */}
        <div className="mt-6 w-full bg-white rounded-2xl border border-border shadow-card p-4">
          {steps.map((s, i) => (
            <div key={i} className={`flex items-center gap-3 py-2.5 ${i < steps.length - 1 ? "border-b border-border/60" : ""}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${s.done ? "bg-primary" : "bg-warning/20"}`}>
                {s.done ? (
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-warning animate-pulse-dot" />
                )}
              </div>
              <span className={`text-sm font-semibold ${s.done ? "text-foreground" : "text-secondary"}`}>{s.label}</span>
              {s.pending && <span className="ml-auto text-xs text-secondary font-semibold">In progress</span>}
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">We'll notify you once approved</p>

        <button className="mt-5 w-full bg-mint h-12 rounded-xl flex items-center justify-center gap-2 text-primary font-semibold">
          <Bell className="w-4 h-4" />
          Enable Notifications
        </button>

        <Link to="/Provider/auth/details" className="mt-3 text-sm text-muted-foreground font-semibold underline">
          Edit Application
        </Link>

        <div className="mt-6 flex items-center gap-2 text-sm">
          <MessageCircle className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Questions?</span>
          <a className="text-primary font-semibold">Chat with us</a>
        </div>

        {/* Demo: continue to dashboard */}
        <Link to="/Provider/home" className="mt-8 w-full h-12 bg-foreground/5 rounded-xl flex items-center justify-center text-foreground/60 text-sm font-semibold">
          [Demo] Skip to Dashboard →
        </Link>
      </div>
    </MobileShell>
  );
}

export default Approval;
