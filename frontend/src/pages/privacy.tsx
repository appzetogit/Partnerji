import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/Partnerji/Shell";
import { ArrowLeft, Shield } from "lucide-react";
import { getPrivacyContent } from "@/lib/dynamicContent";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });

function PrivacyPage() {
  const content = getPrivacyContent();

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
            <p className="text-emerald-600 font-bold text-sm">Effective Date: {content.effectiveDate}</p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              {content.headerDesc}
            </p>
          </div>

          <div className="space-y-3">
            {content.privacyList.map((p, i) => (
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

export default PrivacyPage;
