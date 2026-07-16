import { MobileShell, TopBar } from "@/components/MobileShell";
import { Shield, MapPin, Eye, PhoneOff, Landmark } from "lucide-react";

function SafetyGuidelines() {
  const guidelines = [
    {
      Icon: MapPin,
      title: "1. Meet in Public Spaces",
      desc: "For your first few bookings with a new client, always arrange the meetup in crowded public settings like cafes, shopping malls, restaurants, or parks. Avoid meeting in private homes or isolated locations.",
    },
    {
      Icon: Eye,
      title: "2. GPS Location Sharing",
      desc: "Always keep your smartphone GPS and Partnerji app location access turned ON. During active bookings, our security desk monitors live location updates to ensure you are safe.",
    },
    {
      Icon: PhoneOff,
      title: "3. Guard Personal Information",
      desc: "Communicate exclusively using the in-app chat and VoIP features. Do not share your personal phone number, private email, social media handles, or home address with clients.",
    },
    {
      Icon: Landmark,
      title: "4. No Direct/Off-App Payments",
      desc: "Refuse any offers for direct cash, bank transfers, or off-app payments from clients. Off-app bookings are not monitored by our safety services and violate platform terms.",
    },
    {
      Icon: Shield,
      title: "5. Trust Your Instincts",
      desc: "If a booking feels unsafe or a client behaves inappropriately, you have the absolute right to cancel the session immediately. Leave the area, seek a safe place, and trigger the SOS emergency help button in the app.",
    },
  ];

  return (
    <MobileShell hideNav>
      <TopBar title="Safety Guidelines" back backTo="/Provider/more" />

      <div className="px-5 pt-4 pb-8 space-y-4 bg-[#F8F9FA] min-h-[calc(100vh-60px)]">
        {/* Intro */}
        <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
          <p className="text-primary font-bold text-xs">YOUR SAFETY IS OUR PRIORITY</p>
          <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed font-medium">
            Please adhere strictly to these platform rules. They are designed to keep you secure before, during, and after your bookings.
          </p>
        </div>

        {/* Guidelines List */}
        <div className="space-y-3.5">
          {guidelines.map((g, i) => {
            const Icon = g.Icon;
            return (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-card border border-slate-50 flex gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-800 leading-snug">{g.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{g.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MobileShell>
  );
}

export default SafetyGuidelines;
