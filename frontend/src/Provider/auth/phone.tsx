import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

function Stepper({ step, total = 5 }: { step: number; total?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all ${i < step ? "w-8 bg-primary" : "w-4 bg-border"
            }`}
        />
      ))}
    </div>
  );
}

// Route configuration moved to pages/Provider
function Phone() {
  return (
    <MobileShell hideNav>
      <div className="px-6 pt-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/Provider/splash" className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Stepper step={1} />
          <div className="w-10" />
        </div>
        <h2 className="text-muted-foreground text-sm font-medium mb-1">Join as Companion</h2>
        <h1 className="text-2xl font-bold text-foreground">Enter your mobile number</h1>
        <p className="text-muted-foreground mt-2">We'll send you a verification code</p>

        <div className="mt-8">
          <label className="text-xs font-semibold text-muted-foreground">PHONE NUMBER</label>
          <div className="mt-2 flex gap-2">
            <div className="w-20 h-14 rounded-xl bg-white border border-border flex items-center justify-center font-semibold text-foreground shadow-card">
              +91
            </div>
            <input
              defaultValue="98765 43210"
              className="flex-1 h-14 rounded-xl bg-white border border-border px-4 font-semibold text-foreground outline-none focus:border-primary shadow-card"
            />
          </div>
        </div>

        <Link
          to="/Provider/auth/otp"
          className="mt-8 w-full h-14 bg-primary rounded-2xl flex items-center justify-center text-white font-bold shadow-card"
        >
          Send OTP
        </Link>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground font-medium">OR</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <button className="w-full h-14 bg-white rounded-2xl border border-border flex items-center justify-center gap-3 font-semibold text-foreground shadow-card">
          <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" /><path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" /><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" /><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" /></svg>
          Continue with Google
        </button>

        <p className="text-xs text-muted-foreground text-center mt-8 leading-relaxed">
          By continuing, you agree to Partnerji's <span className="text-primary font-semibold">Terms</span> and <span className="text-primary font-semibold">Privacy Policy</span>
        </p>
      </div>
    </MobileShell>
  );
}

export default Phone;
