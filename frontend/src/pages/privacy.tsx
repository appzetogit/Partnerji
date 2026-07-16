import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/Partnerji/Shell";
import { ArrowLeft, Shield } from "lucide-react";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });

function PrivacyPage() {
  const privacyList = [
    {
      title: "1. Privacy Commitment",
      desc: "At Partnerji, we respect your privacy and are committed to protecting your personal data. This policy explains how we collect and manage your information.",
    },
    {
      title: "2. Information Collection",
      desc: "We collect basic profile information (name, phone number, location, etc.) and booking preferences. We use this data strictly to match you with suitable partners and process requests.",
    },
    {
      title: "3. Location Sharing & Safety",
      desc: "For user and companion safety, we access real-time location data only during active bookings. This coordinates meeting points and powers emergency SOS alerts.",
    },
    {
      title: "4. Data Protection & Sharing",
      desc: "Your data is encrypted in transit and at rest. We never sell your personal information or transaction history to third-party marketing companies.",
    },
    {
      title: "5. Your Rights",
      desc: "You can update your personal information, delete active logs, or request complete account deletion at any time by contacting our support desk.",
    },
  ];

  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6 bg-[#fdfdfd]">
        <header className="px-5 pt-6 pb-3 flex items-center gap-3 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur z-10">
          <Link to="/profile" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
            <ArrowLeft size={20} className="text-slate-700" />
          </Link>
          <h1 className="text-lg font-bold flex-1 text-slate-800">Privacy Policy</h1>
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Shield size={18} />
          </div>
        </header>

        <div className="px-5 pt-4 space-y-4">
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5">
            <p className="text-emerald-600 font-bold text-sm">Effective Date: July 15, 2026</p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              We value your privacy. Learn how we handle your personal data and maintain a secure service ecosystem.
            </p>
          </div>

          <div className="space-y-3">
            {privacyList.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {p.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center space-y-3">
            <p className="text-xs text-slate-500">
              Want more clarity on our privacy architecture? Contact our security officer.
            </p>
            <Link to="/profile" className="w-full h-11 bg-primary text-white rounded-xl font-bold text-xs shadow-soft flex items-center justify-center transition-all hover:bg-primary/95">
              Back to Profile
            </Link>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}
