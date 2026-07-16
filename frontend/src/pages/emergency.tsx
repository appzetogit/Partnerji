import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame, Avatar } from "@/components/Partnerji/Shell";
import { ArrowLeft, Shield, Edit3, Trash2, Plus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/emergency")({ component: EmergencyPage });

function EmergencyPage() {
  const [autoShare, setAutoShare] = useState(true);
  const [alertAdmin, setAlertAdmin] = useState(true);

  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
        <header className="px-5 pt-6 pb-3 flex items-center gap-3">
          <Link to="/profile" className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center"><ArrowLeft size={20} /></Link>
          <h1 className="text-lg font-bold flex-1">Emergency Contacts</h1>
          <div className="w-10 h-10 rounded-full bg-red-100 text-danger flex items-center justify-center"><Shield size={18} /></div>
        </header>

        <div className="px-5">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-3 flex gap-2">
            <div className="text-lg">🚨</div>
            <div className="text-xs text-danger font-semibold leading-relaxed">These contacts will be alerted if you press SOS during an active booking</div>
          </div>
        </div>

        <div className="px-5 mt-5 space-y-3">
          {[
            { rel: "Mom", name: "Anita Kumar", phone: "+91 98112 34567", color: "from-rose-400 to-pink-500" },
            { rel: "Brother", name: "Raj Kumar", phone: "+91 87654 32109", color: "from-blue-400 to-indigo-500" },
          ].map((c, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-soft p-3 flex items-center gap-3">
              <Avatar name={c.name} color={c.color} size={48} />
              <div className="flex-1">
                <div className="font-bold text-sm">{c.rel} · {c.name}</div>
                <div className="text-[11px] text-muted-foreground">{c.phone}</div>
              </div>
              <button className="w-8 h-8 rounded-full bg-primary-soft text-primary flex items-center justify-center"><Edit3 size={14} /></button>
              <button className="w-8 h-8 rounded-full bg-red-100 text-danger flex items-center justify-center"><Trash2 size={14} /></button>
            </div>
          ))}

          <button className="w-full p-4 rounded-2xl border-2 border-dashed border-primary bg-white text-primary flex items-center justify-center gap-2 font-bold text-sm">
            <Plus size={18} /> Add Emergency Contact
          </button>
        </div>

        <div className="px-5 mt-6">
          <div className="text-sm font-bold mb-3">SOS Settings</div>
          <div className="bg-white rounded-2xl shadow-soft divide-y divide-border">
            <Toggle on={autoShare} setOn={setAutoShare} label="Auto-share location with emergency contacts" />
            <Toggle on={alertAdmin} setOn={setAlertAdmin} label="Alert admin team during SOS" />
          </div>
          <div className="text-[11px] text-muted-foreground mt-3 px-1">Admin can view your live location during any SOS event</div>
        </div>
      </div>
    </MobileFrame>
  );
}

function Toggle({ on, setOn, label }: { on: boolean; setOn: (v: boolean) => void; label: string }) {
  return (
    <button onClick={() => setOn(!on)} className="w-full p-4 flex items-center gap-3">
      <div className="flex-1 text-left text-sm font-semibold">{label}</div>
      <div className={`w-11 h-6 rounded-full transition-colors ${on ? "bg-primary" : "bg-border"} relative`}>
        <div className={`absolute top-0.5 ${on ? "left-[22px]" : "left-0.5"} w-5 h-5 rounded-full bg-white shadow transition-all`} />
      </div>
    </button>
  );
}
