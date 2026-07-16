import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/Partnerji/Shell";
import { toast } from "sonner";
import { ArrowLeft, Settings, Bell, Lock, ShieldCheck, Eye } from "lucide-react";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  const [pushNotif, setPushNotif] = useState(true);
  const [emailRec, setEmailRec] = useState(true);
  const [locationSafety, setLocationSafety] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Settings updated successfully!");
    }, 700);
  };

  const handleDeleteAccount = () => {
    const confirm = window.confirm("Are you sure you want to request account deletion? This action is permanent.");
    if (confirm) {
      toast.error("Account deletion request submitted.");
    }
  };

  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6 bg-[#fdfdfd]">
        <header className="px-5 pt-6 pb-3 flex items-center gap-3 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur z-10">
          <Link to="/profile" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
            <ArrowLeft size={20} className="text-slate-700" />
          </Link>
          <h1 className="text-lg font-bold flex-1 text-slate-800">Settings</h1>
          <div className="w-10 h-10 rounded-full bg-violet-50 text-primary flex items-center justify-center">
            <Settings size={18} />
          </div>
        </header>

        <div className="px-5 pt-4 space-y-4">
          {/* Section 1: Notifications */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" /> Notifications
            </h3>
            
            <div className="space-y-3.5 pt-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs text-slate-800">Push Notifications</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Alerts for bookings, chat, and updates</p>
                </div>
                <button
                  onClick={() => setPushNotif(!pushNotif)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ${pushNotif ? "bg-primary" : "bg-slate-200"}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-200 ${pushNotif ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>

              <div className="h-px bg-slate-100" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs text-slate-800">Email Invoices</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Receive receipts and payouts summaries</p>
                </div>
                <button
                  onClick={() => setEmailRec(!emailRec)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ${emailRec ? "bg-primary" : "bg-slate-200"}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-200 ${emailRec ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Section 2: Privacy & Safety */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" /> Security & Privacy
            </h3>
            
            <div className="space-y-3.5 pt-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs text-slate-800">Live Location Tracking</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Share live route tracking during sessions</p>
                </div>
                <button
                  onClick={() => setLocationSafety(!locationSafety)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ${locationSafety ? "bg-primary" : "bg-slate-200"}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-200 ${locationSafety ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full h-12 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-card hover:bg-primary-dark transition-colors cursor-pointer mt-4"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>Save Settings</>
            )}
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}

export default SettingsPage;
