import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame, Avatar } from "@/components/Partnerji/Shell";
import { companions } from "@/lib/Partnerji-data";
import { Check, Calendar, Clock, MapPin, Hourglass, Wallet } from "lucide-react";

export const Route = createFileRoute("/confirmed")({ component: ConfirmedPage });

const colors = ["#F59E0B", "#6C3FE8", "#10B981", "#EF4444", "#9B6DFF", "#FBBF24"];

function ConfirmedPage() {
  const c = companions[0];
  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
        <div className="relative h-[42vh] flex flex-col items-center justify-center text-white" style={{ background: "linear-gradient(145deg,#6C3FE8,#9B6DFF)" }}>
          {/* confetti */}
          {[...Array(18)].map((_, i) => (
            <span key={i} className="confetti" style={{
              left: `${(i * 53) % 100}%`, top: `-10px`,
              background: colors[i % colors.length],
              animationDelay: `${(i % 6) * 0.3}s`,
            }} />
          ))}
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-glow slide-up">
            <Check size={56} className="text-primary" strokeWidth={3} />
          </div>
          <h1 className="text-2xl font-extrabold mt-5">Booking Confirmed!</h1>
          <div className="text-sm text-white/80 mt-1">Booking #MBK-20924</div>
        </div>

        <div className="flex-1 bg-white -mt-6 rounded-t-3xl px-5 pt-6 pb-6">
          <div className="bg-primary-soft/50 rounded-2xl p-3 flex items-center gap-3">
            <Avatar name={c.name} color={c.color} size={48} />
            <div className="flex-1">
              <div className="font-bold text-sm">{c.name}</div>
              <div className="text-[11px] text-primary font-semibold">{c.category}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-muted-foreground">Starting in</div>
              <div className="text-secondary font-bold text-sm">12 mins</div>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <Detail Icon={Calendar} label="Date" value="Today, 22 May 2026" />
            <Detail Icon={Clock} label="Time" value="3:00 PM – 5:00 PM" />
            <Detail Icon={MapPin} label="Location" value="DB Mall, Bhopal" />
            <Detail Icon={Hourglass} label="Duration" value="2 Hours" />
            <Detail Icon={Wallet} label="Amount Paid" value="₹992" highlight />
          </div>

          <div className="mt-7 flex flex-col gap-2">
            <Link to="/session" className="h-12 rounded-full grad-primary text-white font-bold flex items-center justify-center">View Booking</Link>
            <Link to="/home" className="h-12 rounded-full border border-primary text-primary font-bold flex items-center justify-center">Go to Home</Link>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}

function Detail({ Icon, label, value, highlight }: { Icon: any; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-primary-soft text-primary flex items-center justify-center"><Icon size={16} /></div>
      <div className="flex-1 text-xs text-muted-foreground">{label}</div>
      <div className={`text-sm font-bold ${highlight ? "text-secondary" : ""}`}>{value}</div>
    </div>
  );
}
