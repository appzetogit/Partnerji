import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/Partnerji/Shell";
import { ArrowLeft, BookOpen } from "lucide-react";

export const Route = createFileRoute("/terms")({ component: TermsPage });

function TermsPage() {
  const termsList = [
    {
      title: "1. Service Description",
      desc: "Partnerji is a platform connecting users with local service partners and companions. We facilitate the booking process and safe payment transactions, but we do not employ or represent the partners directly.",
    },
    {
      title: "2. User Conduct & Respect",
      desc: "Users must treat all partners with absolute respect. Any form of harassment, abuse, requests for prohibited/illegal activities, or commercial romance will lead to immediate account suspension and potential legal actions.",
    },
    {
      title: "3. Safe Meetings",
      desc: "For your safety, always meet companion partners in well-lit, public spaces. Use the in-app chat features for all communications and follow our safety guidelines at all times.",
    },
    {
      title: "4. Payments & Refund Policy",
      desc: "All booking payments must be made through the Partnerji application. Off-platform transactions are strictly prohibited. Refunds for cancellations are governed by our specific partner cancellation policy.",
    },
    {
      title: "5. Cancellation & No-Show",
      desc: "Cancellations made within 2 hours of the scheduled booking time may attract a cancellation fee to compensate the partner. Frequent no-shows may result in a review and restriction of your account.",
    },
  ];

  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6 bg-[#fdfdfd]">
        <header className="px-5 pt-6 pb-3 flex items-center gap-3 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur z-10">
          <Link to="/profile" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
            <ArrowLeft size={20} className="text-slate-700" />
          </Link>
          <h1 className="text-lg font-bold flex-1 text-slate-800">Terms of Service</h1>
          <div className="w-10 h-10 rounded-full bg-violet-50 text-primary flex items-center justify-center">
            <BookOpen size={18} />
          </div>
        </header>

        <div className="px-5 pt-4 space-y-4">
          <div className="bg-violet-50/50 border border-violet-100 rounded-2xl p-5">
            <p className="text-primary font-bold text-sm">Effective Date: July 15, 2026</p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              By using our service, you agree to these Terms of Service. Please review them carefully before making any bookings.
            </p>
          </div>

          <div className="space-y-3">
            {termsList.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {t.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center space-y-3">
            <p className="text-xs text-slate-500">
              Have questions regarding our Terms of Service? Our support team is available 24/7.
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
