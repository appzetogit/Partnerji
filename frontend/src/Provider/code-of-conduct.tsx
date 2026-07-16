import { MobileShell, TopBar } from "@/components/MobileShell";
import { BookOpen, UserCheck, ShieldAlert, Award, Star } from "lucide-react";

function CodeOfConduct() {
  const points = [
    {
      Icon: UserCheck,
      title: "Respect and Equality",
      desc: "Treat all clients with dignity, regardless of their gender, age, race, background, or physical ability. Any form of discrimination or offensive comments is strictly prohibited."
    },
    {
      Icon: ShieldAlert,
      title: "Strictly Social Boundaries",
      desc: "Companionship is entirely platonic (e.g., dining, business events, city tours, movie partners). No romantic advances, commercial intimacy, or requests for physical contact are tolerated."
    },
    {
      Icon: Award,
      title: "Professionalism and Punctuality",
      desc: "Show up on time for scheduled bookings. Be presentable, helpful, and courteous. If you expect a delay, communicate with the client through the app chat immediately."
    },
    {
      Icon: Star,
      title: "Platform Trust",
      desc: "Always run check-ins and payments inside the platform. Do not request direct cash payments, additional tips, or off-app bookings. Do not trade personal contact coordinates."
    }
  ];

  return (
    <MobileShell hideNav>
      <TopBar title="Code of Conduct" back backTo="/Provider/more" />

      <div className="px-5 pt-4 pb-8 space-y-4 bg-[#F8F9FA] min-h-[calc(100vh-60px)]">
        {/* Intro Banner */}
        <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 flex gap-3">
          <BookOpen className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="text-xs text-muted-foreground leading-relaxed font-semibold">
            By being a Companion on Partnerji, you commit to maintaining a safe, inclusive, and professional environment.
          </div>
        </div>

        {/* Conduct Rules */}
        <div className="space-y-3.5">
          {points.map((p, i) => {
            const Icon = p.Icon;
            return (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-card border border-slate-50 flex gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-800 leading-snug">{p.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MobileShell>
  );
}

export default CodeOfConduct;
