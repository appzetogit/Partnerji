import { MobileShell, TopBar } from "@/components/MobileShell";

function Privacy() {
  const privacySections = [
    {
      title: "1. Information We Collect",
      desc: "We collect your profile details (name, email, city, language preferences, profile photo) and GPS location during active bookings to ensure safety and match accuracy. We also verify national ID documents to protect the community.",
    },
    {
      title: "2. How We Use Information",
      desc: "Your data is used to provide matchmaking with clients, display profiles to potential clients, calculate accurate payout rates, process secure withdrawals, and comply with safety regulations.",
    },
    {
      title: "3. Location Sharing",
      desc: "To provide real-time updates and guarantee companion safety, your live location is shared only during active booking hours with the designated client and Partnerji trust & safety team.",
    },
    {
      title: "4. Data Security",
      desc: "All personal details, bank accounts, and photos are encrypted and securely stored. We do not sell or lease your personal information to third-party advertisers or external services.",
    },
    {
      title: "5. User Controls",
      desc: "You can update your availability, services, profile gallery, and language options at any time. To completely delete your companion account and remove all personal records, contact Partnerji support.",
    },
  ];

  return (
    <MobileShell hideNav>
      <TopBar title="Privacy Policy" back backTo="/Provider/more" />
      <div className="px-5 pt-4 pb-8 space-y-4">
        <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
          <p className="text-primary font-bold text-sm">Last Updated: July 15, 2026</p>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            Your privacy is highly important to us. Here is how we collect, protect, and handle your companion data.
          </p>
        </div>

        <div className="space-y-3">
          {privacySections.map((p, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-card">
              <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {p.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}

export default Privacy;
