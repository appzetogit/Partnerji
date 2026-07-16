import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/Partnerji/Shell";
import { toast } from "sonner";
import { ArrowLeft, MapPin, Plus, Trash2, Home, Briefcase } from "lucide-react";

export const Route = createFileRoute("/manage-addresses")({ component: ManageAddressesPage });

interface Address {
  id: string;
  label: "Home" | "Work" | "Other";
  addressLine: string;
}

function ManageAddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    { id: "1", label: "Home", addressLine: "Apt 402, Sunset Heights, Bandra West, Mumbai" },
    { id: "2", label: "Work", addressLine: "Level 11, Maker Chambers, Nariman Point, Mumbai" },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [label, setLabel] = useState<"Home" | "Work" | "Other">("Home");
  const [addressLine, setAddressLine] = useState("");

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressLine.trim()) {
      toast.error("Please enter your address details");
      return;
    }

    const newAddr: Address = {
      id: Date.now().toString(),
      label,
      addressLine: addressLine.trim(),
    };

    setAddresses([...addresses, newAddr]);
    setAddressLine("");
    setShowAddForm(false);
    toast.success("Address added successfully!");
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
    toast.success("Address deleted.");
  };

  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6 bg-[#fdfdfd]">
        <header className="px-5 pt-6 pb-3 flex items-center gap-3 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur z-10">
          <Link to="/profile" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
            <ArrowLeft size={20} className="text-slate-700" />
          </Link>
          <h1 className="text-lg font-bold flex-1 text-slate-800">Saved Addresses</h1>
          <div className="w-10 h-10 rounded-full bg-violet-50 text-primary flex items-center justify-center">
            <MapPin size={18} />
          </div>
        </header>

        <div className="px-5 pt-4 space-y-4">
          {/* Toggle Add Form */}
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full py-3.5 bg-white border border-dashed border-slate-200 hover:border-primary/20 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-500" /> Add New Address
            </button>
          ) : (
            <form onSubmit={handleAddAddress} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3.5">
              <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Address Details</h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  {(["Home", "Work", "Other"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setLabel(type)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        label === type
                          ? "bg-primary/10 border-primary text-primary"
                          : "bg-slate-50 border-slate-100 text-slate-500"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <textarea
                  placeholder="Street address, apartment, building, city"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  required
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-primary bg-slate-50 font-medium leading-relaxed"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Save Address
                </button>
              </div>
            </form>
          )}

          {/* List of Saved Addresses */}
          <div className="space-y-2.5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-1">
              SAVED LOCATIONS ({addresses.length})
            </p>

            {addresses.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-sm">
                <MapPin className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="font-bold text-xs text-slate-700">No Address Saved</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Please add a location to simplify companion bookings.</p>
              </div>
            ) : (
              addresses.map((addr) => {
                const Icon = addr.label === "Home" ? Home : addr.label === "Work" ? Briefcase : MapPin;
                return (
                  <div
                    key={addr.id}
                    className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between gap-3.5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-violet-50 text-primary flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-slate-800">{addr.label}</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{addr.addressLine}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(addr.id)}
                      className="p-2 hover:bg-red-50 border border-slate-50 hover:border-red-100 rounded-lg transition-colors shrink-0"
                      title="Delete Address"
                    >
                      <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}

export default ManageAddressesPage;
