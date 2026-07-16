import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Camera } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { useState } from "react";

function Stepper({ step, total = 5 }: { step: number; total?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`h-1.5 rounded-full transition-all ${i < step ? "w-8 bg-primary" : "w-4 bg-border"}`} />
      ))}
    </div>
  );
}

// Route configuration moved to pages/Provider
function Details() {
  const [gender, setGender] = useState("Female");
  const cities = ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar"];
  return (
    <MobileShell hideNav>
      <div className="px-6 pt-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/Provider/auth/otp" className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Stepper step={2} />
          <div className="w-10" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Tell us about yourself</h1>
        <p className="text-muted-foreground mt-2">Step 2 of 5 — Personal Details</p>

        {/* Photo upload */}
        <div className="mt-6 flex justify-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-2 border-dashed border-primary/40 bg-mint flex flex-col items-center justify-center text-primary">
              <Camera className="w-7 h-7" />
              <span className="text-[10px] font-semibold mt-1">Upload Photo</span>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">Upload your best photo</p>

        <div className="mt-6 space-y-4">
          <Field label="Full Name" value="Priya Sharma" />
          <div>
            <label className="text-xs font-semibold text-muted-foreground">GENDER</label>
            <div className="mt-2 flex gap-2">
              {["Male", "Female", "Other"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 h-11 rounded-full text-sm font-semibold border-2 transition ${gender === g
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-foreground border-border"
                    }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <Field label="Date of Birth" value="15 Mar 1998" type="date-display" />
          <Field label="Email Address" value="priya.sharma@gmail.com" />
          <div>
            <label className="text-xs font-semibold text-muted-foreground">CITY</label>
            <select className="mt-2 w-full h-12 rounded-xl bg-white border border-border px-4 font-semibold text-foreground outline-none focus:border-primary shadow-card">
              {cities.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <Link to="/Provider/auth/services" className="mt-8 w-full h-14 bg-primary rounded-2xl flex items-center justify-center text-white font-bold shadow-card">
          Continue
        </Link>
      </div>
    </MobileShell>
  );
}

function Field({ label, value, type }: { label: string; value: string; type?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">{label.toUpperCase()}</label>
      <input
        defaultValue={value}
        className="mt-2 w-full h-12 rounded-xl bg-white border border-border px-4 font-semibold text-foreground outline-none focus:border-primary shadow-card"
        readOnly={type === "date-display"}
      />
    </div>
  );
}

export default Details;
