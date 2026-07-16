import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Paperclip, Smile, Send } from "lucide-react";
import { MobileShell, TopBar } from "@/components/MobileShell";

// Route configuration moved to pages/Provider
function Chat() {
  return (
    <MobileShell hideNav>
      <div className="flex flex-col h-dvh">
        <div className="sticky top-0 bg-white border-b border-border px-4 py-3 flex items-center gap-3 z-30">
          <Link to="/Provider/bookings" className="w-9 h-9 rounded-full bg-mint flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6" /></svg>
          </Link>
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">RK</div>
          <div className="flex-1">
            <p className="font-bold text-foreground text-sm">Ravi Kumar</p>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">Active Booking</span>
          </div>
          <button className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <Phone className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#F4FBF8] px-4 py-4 space-y-3">
          <div className="bg-mint rounded-2xl p-3 text-xs text-center text-primary font-semibold">
            📋 Booking #MBK-20924 · Today 3:00 PM
          </div>

          <Msg side="left" text="Hi Priya! Looking forward to our session today 😊" time="2:42 PM" />
          <Msg side="left" text="I'm at DB Mall entrance, near the food court" time="2:43 PM" />
          <Msg side="left" text="Should I wait inside or outside?" time="2:43 PM" />
          <Msg side="right" text="Hi Ravi! I'll be there in about 10 minutes" time="2:45 PM" />
          <Msg side="right" text="Please wait near the main entrance, I'll come find you" time="2:45 PM" />
          <Msg side="right" text="See you soon! 👍" time="2:45 PM" />
          {/* image */}
          <div className="flex justify-end">
            <div className="bg-primary rounded-2xl p-2 max-w-[70%]">
              <div className="rounded-xl overflow-hidden h-32 w-44 bg-gradient-to-br from-mint to-primary/30 relative">
                <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "14px 14px" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">📍</div>
                </div>
              </div>
              <p className="text-[10px] text-white/80 mt-1 text-right">2:47 PM ✓✓</p>
            </div>
          </div>
        </div>

        {/* Quick replies */}
        <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide bg-white border-t border-border">
          {["On my way 🚶", "5 minutes away", "I've arrived ✅", "Running late, sorry"].map((r) => (
            <button key={r} className="px-3 h-8 rounded-full bg-mint text-primary text-xs font-semibold whitespace-nowrap">{r}</button>
          ))}
        </div>

        {/* Input */}
        <div className="px-4 py-3 bg-white border-t border-border flex items-center gap-2">
          <button className="w-9 h-9 flex items-center justify-center text-muted-foreground">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 bg-mint rounded-full px-4 h-11 flex items-center gap-2">
            <input placeholder="Type a message..." className="flex-1 bg-transparent outline-none text-sm" />
            <Smile className="w-5 h-5 text-muted-foreground" />
          </div>
          <button className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-card">
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </MobileShell>
  );
}

function Msg({ side, text, time }: { side: "left" | "right"; text: string; time: string }) {
  const right = side === "right";
  return (
    <div className={`flex ${right ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 ${right ? "bg-primary text-white rounded-br-md" : "bg-white text-foreground rounded-bl-md shadow-card"}`}>
        <p className="text-sm">{text}</p>
        <p className={`text-[10px] mt-1 ${right ? "text-white/70 text-right" : "text-muted-foreground"}`}>{time}{right && " ✓✓"}</p>
      </div>
    </div>
  );
}

export default Chat;
