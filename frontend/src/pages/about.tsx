import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/Partnerji/Shell";
import { ArrowLeft, Info, HelpCircle, Star, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  const points = [
    {
      Icon: ShieldCheck,
      title: "Vetted Companions",
      desc: "Every companion partner undergoes a robust identity background check, phone verification, and code-of-conduct training before meeting you."
    },
    {
      Icon: Star,
      title: "Platonic Relationships Only",
      desc: "Partnerji is built purely for social matches (e.g. gym partner, business companion, dining, movie outings). We enforce platonic-only policies."
    },
    {
      Icon: HelpCircle,
      title: "24/7 Security Operations",
      desc: "Our dispatch teams monitor live locations and respond immediately to SOS alarms triggered during active companionship events."
    }
  ];

  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6 bg-[#fdfdfd]">
        <header className="px-5 pt-6 pb-3 flex items-center gap-3 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur z-10">
          <Link to="/profile" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
            <ArrowLeft size={20} className="text-slate-700" />
          </Link>
          <h1 className="text-lg font-bold flex-1 text-slate-800">About Partnerji</h1>
          <div className="w-10 h-10 rounded-full bg-violet-50 text-primary flex items-center justify-center">
            <Info size={18} />
          </div>
        </header>

        <div className="px-5 pt-4 space-y-5">
          {/* Logo Brand Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center space-y-2">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto text-xl font-black">
              P
            </div>
            <h2 className="text-lg font-black text-slate-800">Partnerji</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">VERSION 1.0.0 (BUILD 214)</p>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed pt-2">
              Partnerji is a trusted platonic companionship platform matching social seekers with verified local companion partners for dinners, events, or mutual hobbies.
            </p>
          </div>

          {/* Pillars of Partnerji */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-1">
              OUR SERVICE PILLARS
            </p>

            <div className="space-y-3">
              {points.map((p, i) => {
                const Icon = p.Icon;
                return (
                  <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-violet-50 text-primary flex items-center justify-center shrink-0 border border-violet-100">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-xs text-slate-800 leading-snug">{p.title}</h3>
                      <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom message */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center">
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Designed with care in Mumbai, India. <br />
              © 2026 Partnerji Technologies Private Limited. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}

export default AboutPage;
