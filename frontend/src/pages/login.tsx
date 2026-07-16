import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, User, Store } from "lucide-react";
import { MobileFrame } from "@/components/Partnerji/Shell";
import { useState } from "react";
import partnerjilogo from "@/assest/partnerjilogo.png";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const [mode, setMode] = useState<"user" | "Provider">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user_role");
      return (saved === "Provider" ? "Provider" : "user") as "user" | "Provider";
    }
    return "user";
  });
  const [phone, setPhone] = useState("");

  const handleRoleSelection = (selectedMode: "user" | "Provider") => {
    setMode(selectedMode);
    localStorage.setItem("user_role", selectedMode);
  };

  return (
    <MobileFrame className="bg-[#fdfdfd]" frameClassName="bg-[#fdfdfd]">
      <div className="flex-1 flex flex-col px-6 pt-6 pb-6 bg-[#fdfdfd] overflow-hidden justify-between">
        {/* Logo and Brand Header */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-36 h-36 rounded-3xl bg-white shadow-card flex items-center justify-center p-2 border border-slate-100">
            <img src={partnerjilogo} alt="Partnerji Logo" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Sliding Role Switcher Toggle */}
        <div className="p-1 bg-slate-100 rounded-2xl flex gap-1 mb-4 relative">
          <button
            onClick={() => handleRoleSelection("user")}
            className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all relative z-10 cursor-pointer ${mode === "user"
              ? "bg-white text-primary shadow-sm"
              : "text-slate-500 hover:text-slate-700"
              }`}
          >
            <User size={15} />
            Sign in as User
          </button>
          <button
            onClick={() => handleRoleSelection("Provider")}
            className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all relative z-10 cursor-pointer ${mode === "Provider"
              ? "bg-white text-amber-600 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
              }`}
          >
            <Store size={15} />
            Sign in as Provider
          </button>
        </div>

        {/* Dynamic Context Header */}
        <div className="mb-4 text-center flex flex-col justify-center">
          <h2 className="text-xl font-bold text-slate-800 transition-all duration-300">
            {mode === "user" ? "Welcome Back!" : "Partner Workspace"}
          </h2>
          <p className="mt-1 text-xs text-slate-500 max-w-[280px] mx-auto leading-relaxed transition-all duration-300">
            {mode === "user"
              ? "Sign in to connect with trusted local service partners near you."
              : "Access your dashboard, manage jobs, and track your daily earnings."}
          </p>
        </div>

        {/* Mobile Input Field */}
        <div className="space-y-2 mb-4">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Enter Mobile Number
          </label>
          <div className="flex items-center h-[54px] rounded-xl bg-white border border-slate-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 shadow-sm overflow-hidden transition-all">
            <div className="px-5 flex items-center font-bold text-sm text-slate-600 border-r border-slate-200 bg-slate-50/50 h-full">
              +91
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter 10-digit number"
              className="flex-1 h-full bg-transparent px-5 font-bold text-sm outline-none text-slate-800 tracking-wider"
            />
          </div>
        </div>

        {/* Action Button */}
        <Link
          to="/otp"
          onClick={() => {
            // Backup save on submit
            localStorage.setItem("user_role", mode);
            localStorage.setItem("user_phone", phone);
          }}
          className={`h-[54px] rounded-xl text-white font-bold flex items-center justify-center shadow-soft active:scale-[0.98] transition-all cursor-pointer ${mode === "user" ? "grad-primary" : "bg-gradient-to-r from-amber-500 to-orange-500"
            }`}
        >
          Send OTP
        </Link>

        {/* Secure badge */}
        <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Secure Encrypted Login</span>
        </div>

        {/* Footer Policy */}
        <p className="mt-3 text-[10px] text-center text-slate-400 font-semibold leading-relaxed">
          By signing in, you agree to our <br />
          <Link to="/terms" className="text-primary underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary underline">Privacy Policy</Link>
        </p>
      </div>
    </MobileFrame>
  );
}
