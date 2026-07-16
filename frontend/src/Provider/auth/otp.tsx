import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { useEffect, useState } from "react";

// Route configuration moved to pages/Provider
function OTP() {
  const [timer, setTimer] = useState(45);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  useEffect(() => {
    if (timer === 0) return;
    const i = setInterval(() => setTimer((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(i);
  }, [timer]);

  return (
    <MobileShell hideNav>
      <div className="px-6 pt-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/Provider/auth/phone" className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-10" />
          <div className="w-10" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Verify your number</h1>
        <p className="text-muted-foreground mt-2">
          Code sent to <span className="text-foreground font-semibold">+91 98765 43210</span>
        </p>

        <div className="mt-10 flex justify-between gap-2">
          {otp.map((v, i) => (
            <input
              key={i}
              value={v}
              maxLength={1}
              onChange={(e) => {
                const arr = [...otp];
                arr[i] = e.target.value;
                setOtp(arr);
                if (e.target.value && i < 5) {
                  (document.querySelectorAll<HTMLInputElement>(".otp-input")[i + 1])?.focus();
                }
              }}
              className="otp-input w-12 h-14 rounded-xl bg-white border-2 border-border text-center font-bold text-xl text-foreground outline-none focus:border-primary shadow-card"
            />
          ))}
        </div>

        <div className="mt-6 text-center">
          {timer > 0 ? (
            <p className="text-muted-foreground text-sm">
              Resend in <span className="text-foreground font-semibold">0:{timer.toString().padStart(2, "0")}</span>
            </p>
          ) : (
            <button onClick={() => setTimer(45)} className="text-primary font-semibold text-sm">
              Resend OTP
            </button>
          )}
        </div>

        <Link
          to="/Provider/auth/details"
          className="mt-10 w-full h-14 bg-primary rounded-2xl flex items-center justify-center text-white font-bold shadow-card"
        >
          Verify & Continue
        </Link>

        <div className="mt-6 p-4 bg-mint rounded-2xl">
          <p className="text-xs text-foreground/80 leading-relaxed">
            💡 <span className="font-semibold">Tip:</span> Use the same number on your bank account for faster KYC and instant payouts.
          </p>
        </div>
      </div>
    </MobileShell>
  );
}

export default OTP;
