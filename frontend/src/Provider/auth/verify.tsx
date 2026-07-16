import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Upload, Camera, Shield } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

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
function Verify() {
  return (
    <MobileShell hideNav>
      <div className="px-6 pt-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/Provider/auth/pricing" className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Stepper step={5} />
          <div className="w-10" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Verify your identity</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Required for companion approval. Documents are kept secure and private.
        </p>

        <div className="mt-3 flex items-center gap-2 bg-mint rounded-xl p-3">
          <Shield className="w-5 h-5 text-primary" />
          <p className="text-xs text-foreground/80">Bank-grade encryption · Never shared with customers</p>
        </div>

        {/* Government ID */}
        <div className="mt-6">
          <label className="text-xs font-semibold text-muted-foreground">GOVERNMENT ID</label>
          <select className="mt-2 w-full h-12 rounded-xl bg-white border border-border px-4 font-semibold text-foreground shadow-card">
            <option>Aadhaar Card</option>
            <option>PAN Card</option>
            <option>Voter ID</option>
            <option>Driving License</option>
          </select>
          <div className="mt-2 bg-white border-2 border-primary/30 rounded-2xl p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-primary" strokeWidth={3} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">aadhaar_front.jpg</p>
                <p className="text-xs text-muted-foreground">Uploaded · 2.1 MB</p>
              </div>
              <button className="text-primary text-sm font-semibold">Change</button>
            </div>
          </div>
        </div>

        {/* Selfie */}
        <div className="mt-5">
          <label className="text-xs font-semibold text-muted-foreground">SELFIE WITH ID</label>
          <div className="mt-2 bg-white border-2 border-dashed border-primary/40 rounded-2xl p-6 text-center shadow-card">
            <div className="w-16 h-16 rounded-full bg-mint mx-auto flex items-center justify-center mb-2">
              <Camera className="w-7 h-7 text-primary" />
            </div>
            <p className="text-sm font-semibold text-foreground">Take selfie holding your ID</p>
            <p className="text-xs text-muted-foreground mt-1">Face must match ID photo</p>
          </div>
        </div>

        {/* Bank */}
        <div className="mt-6">
          <h3 className="text-sm font-bold text-foreground mb-3">Bank Account Details</h3>
          <div className="space-y-3">
            <Field label="Account Holder Name" value="Priya Sharma" />
            <Field label="Account Number" value="50100123454521" />
            <Field label="Confirm Account Number" value="50100123454521" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="IFSC Code" value="HDFC0001234" />
              <Field label="Bank Name" value="HDFC Bank" readonly />
            </div>
          </div>
          <button className="mt-3 w-full h-12 bg-white border-2 border-primary rounded-xl text-primary font-bold text-sm shadow-card">
            Verify Account (₹1 test deposit)
          </button>
        </div>

        {/* Checkboxes */}
        <div className="mt-6 space-y-3">
          {[
            "I agree to Partnerji's Companion Terms",
            "I confirm all information provided is accurate",
          ].map((t) => (
            <label key={t} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded bg-primary flex items-center justify-center mt-0.5 shrink-0">
                <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
              </div>
              <span className="text-sm text-foreground">{t}</span>
            </label>
          ))}
        </div>

        <Link to="/Provider/approval" className="mt-6 w-full h-14 bg-primary rounded-2xl flex items-center justify-center text-white font-bold shadow-card">
          Submit for Review
        </Link>
      </div>
    </MobileShell>
  );
}

function Field({ label, value, readonly }: { label: string; value: string; readonly?: boolean }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">{label.toUpperCase()}</label>
      <input
        defaultValue={value}
        readOnly={readonly}
        className={`mt-1.5 w-full h-12 rounded-xl bg-white border border-border px-4 font-semibold text-foreground outline-none focus:border-primary shadow-card ${readonly ? "bg-mint" : ""}`}
      />
    </div>
  );
}

export default Verify;
