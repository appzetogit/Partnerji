import { MobileShell, TopBar } from "@/components/MobileShell";

function Terms() {
  const termsList = [
    {
      title: "1. Professional Conduct",
      desc: "Companions must maintain absolute professionalism at all times. Any form of unprofessional behavior, harassment, or misconduct will lead to immediate permanent termination from the Partnerji platform.",
    },
    {
      title: "2. Services and Limits",
      desc: "Our platform offers social companionship services only (e.g. shopping assistant, dining companion, gym partner). Under no circumstances are physical intimacy, commercial romance, or illegal activities permitted or tolerated.",
    },
    {
      title: "3. Safety & Emergency Protocols",
      desc: "Always check-in and check-out of bookings using the app. In case of safety concerns, use the SOS / Emergency contact features instantly. Do not meet users in non-public spaces.",
    },
    {
      title: "4. Fees and Payment",
      desc: "All payments must be processed securely through the Partnerji application. Directly asking for cash, extra payments, tips, or off-platform transactions from clients is strictly prohibited and violates terms of use.",
    },
    {
      title: "5. Cancellation Policy",
      desc: "Companions should minimize cancellations. Frequent cancellations or failing to show up for scheduled sessions without 2 hours prior notice may attract account penalties or temporary suspension.",
    },
  ];

  return (
    <MobileShell hideNav>
      <TopBar title="Terms for Companions" back backTo="/Provider/more" />
      <div className="px-5 pt-4 pb-8 space-y-4">
        <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
          <p className="text-primary font-bold text-sm">Last Updated: July 15, 2026</p>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            Please read these terms carefully before offering services as a Companion. By continuing, you agree to comply fully with our community guidelines.
          </p>
        </div>

        <div className="space-y-3">
          {termsList.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-card">
              <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {t.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {t.desc}
              </p>
            </div>
          ))}
        </div>


      </div>
    </MobileShell>
  );
}

export default Terms;
