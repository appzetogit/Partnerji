import { Route } from "@/pages/Provider/booking.$id";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Share2, Phone, MessageCircle, MapPin, Navigation, Clock, Calendar, Check, AlertTriangle } from "lucide-react";
import { MobileShell, TopBar } from "@/components/MobileShell";
import { upcomingBookings, formatINR } from "@/lib/mock-data";
import { useState } from "react";

// Route configuration moved to pages/Provider
function BookingDetail() {
  const { id } = Route.useParams();
  const b = upcomingBookings.find((x) => x.id === id) ?? upcomingBookings[0];
  const [showCancel, setShowCancel] = useState(false);

  return (
    <MobileShell hideNav>
      <TopBar
        title={`Booking #${b.id}`}
        back
        backTo="/Provider/bookings"
        right={
          <button className="w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center">
            <Share2 className="w-4 h-4" />
          </button>
        }
      />
      <div className="px-5 pt-4 pb-8 space-y-4">
        {/* Status banner */}
        <div className="gradient-primary rounded-2xl p-4 text-white shadow-card-lg">
          <p className="text-xs font-semibold opacity-90 tracking-wide">UPCOMING</p>
          <p className="font-bold text-lg mt-1">{b.date} at {b.time}</p>
        </div>

        {/* Customer */}
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-xl">{b.avatar}</div>
            <div className="flex-1">
              <p className="font-bold text-foreground text-lg">{b.customer}</p>
              <p className="text-xs text-secondary font-semibold">⭐ 4.8 customer rating</p>
              <p className="text-xs text-muted-foreground mt-0.5">12 bookings on Partnerji</p>
              <div className="mt-1.5 flex gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-mint text-primary font-semibold">✓ Mobile</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-mint text-primary font-semibold">✓ Email</span>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button className="h-11 bg-mint rounded-xl flex items-center justify-center gap-2 text-primary font-semibold text-sm">
              <Phone className="w-4 h-4" /> Call
            </button>
            <Link to="/Provider/chat" className="h-11 bg-primary rounded-xl flex items-center justify-center gap-2 text-white font-semibold text-sm">
              <MessageCircle className="w-4 h-4" /> Chat
            </Link>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl p-4 shadow-card space-y-3">
          <h3 className="font-bold text-foreground mb-1">Booking Details</h3>
          <Row icon="📋" label="Service" value={`${b.icon} ${b.service}`} />
          <Row icon={<Calendar className="w-4 h-4 text-primary" />} label="Date" value="Today, 22 May 2026" />
          <Row icon={<Clock className="w-4 h-4 text-primary" />} label="Time" value={`${b.time} – 7:00 PM`} />
          <Row icon="⏱" label="Duration" value={b.duration} />
          <Row icon={<MapPin className="w-4 h-4 text-primary" />} label="Location" value={b.location} />
          <div className="mt-2 rounded-xl overflow-hidden border border-border">
            <div className="h-32 bg-gradient-to-br from-mint to-primary/20 relative flex items-center justify-center">
              <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(15,155,119,0.15) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              <div className="w-10 h-10 rounded-full bg-primary shadow-card-lg flex items-center justify-center text-white">
                <MapPin className="w-5 h-5" />
              </div>
            </div>
            <button className="w-full h-10 bg-white flex items-center justify-center gap-2 text-primary font-semibold text-sm">
              <Navigation className="w-4 h-4" /> Get Directions
            </button>
          </div>
          <div className="mt-3 p-3 bg-mint rounded-xl">
            <p className="text-xs text-muted-foreground font-semibold">📝 CUSTOMER NOTE</p>
            <p className="text-sm text-foreground mt-1 italic">"Please wear formal attire. It's a cultural event."</p>
          </div>
        </div>

        {/* Earnings */}
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <h3 className="font-bold text-foreground mb-3">Earnings Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Booking amount</span><span className="font-semibold text-foreground">{formatINR(1000)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Platform commission (10%)</span><span className="font-semibold text-destructive">-{formatINR(100)}</span></div>
            <div className="h-px bg-border my-1" />
            <div className="flex justify-between"><span className="font-bold text-foreground">Your earnings</span><span className="text-xl font-extrabold text-primary">{formatINR(900)}</span></div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Link to="/Provider/session" className="w-full h-14 bg-primary rounded-2xl flex items-center justify-center text-white font-bold shadow-card-lg">
            Start Session
          </Link>
          <button className="w-full h-12 bg-white border-2 border-primary rounded-xl text-primary font-semibold flex items-center justify-center gap-2">
            <Navigation className="w-4 h-4" /> Get Directions
          </button>
          <button onClick={() => setShowCancel(true)} className="w-full h-12 text-destructive font-semibold text-sm">
            Cancel Booking
          </button>
        </div>
      </div>

      {showCancel && (
        <div className="absolute inset-0 z-50 flex items-center justify-center px-6" onClick={() => setShowCancel(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative w-full bg-white rounded-3xl p-5" onClick={e => e.stopPropagation()}>
            <div className="w-14 h-14 rounded-full bg-destructive/10 mx-auto flex items-center justify-center mb-3">
              <AlertTriangle className="w-7 h-7 text-destructive" />
            </div>
            <h3 className="font-bold text-lg text-center text-foreground">Are you sure?</h3>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Cancelling less than 2 hours before session may affect your rating.
            </p>
            <select className="mt-4 w-full h-11 rounded-xl bg-mint border border-border px-3 text-sm font-semibold">
              <option>Select reason...</option>
              <option>Feeling unwell</option>
              <option>Emergency</option>
              <option>Schedule conflict</option>
            </select>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="h-11 bg-destructive rounded-xl text-white font-bold text-sm">Yes, Cancel</button>
              <button onClick={() => setShowCancel(false)} className="h-11 bg-primary rounded-xl text-white font-bold text-sm">Keep Booking</button>
            </div>
          </div>
        </div>
      )}
    </MobileShell>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-lg bg-mint flex items-center justify-center text-sm">{icon}</div>
      <div className="flex-1">
        <p className="text-[11px] text-muted-foreground font-semibold uppercase">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

export default BookingDetail;
