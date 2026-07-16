import { useState } from "react";
import { MobileShell, TopBar } from "@/components/MobileShell";
import { toast } from "sonner";
import { UserMinus, ShieldAlert, Plus, Trash2 } from "lucide-react";

interface BlockedUser {
  id: string;
  name: string;
  phone: string;
  date: string;
}

function BlockedCustomers() {
  const [users, setUsers] = useState<BlockedUser[]>([
    { id: "1", name: "Amit Patel", phone: "+91 98765 11223", date: "June 12, 2026" },
    { id: "2", name: "Vikram Singh", phone: "+91 88877 66554", date: "July 02, 2026" },
  ]);
  const [newPhone, setNewPhone] = useState("");
  const [newName, setNewName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleUnblock = (id: string, name: string) => {
    setUsers(users.filter((u) => u.id !== id));
    toast.success(`${name} has been unblocked.`);
  };

  const handleBlockUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhone.trim()) {
      toast.error("Please enter a phone number");
      return;
    }
    const newUser: BlockedUser = {
      id: Date.now().toString(),
      name: newName.trim() || "Anonymous Client",
      phone: newPhone.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    };
    setUsers([newUser, ...users]);
    setNewName("");
    setNewPhone("");
    setShowAddForm(false);
    toast.success("User blocked successfully");
  };

  return (
    <MobileShell hideNav>
      <TopBar title="Blocked Customers" back backTo="/Provider/more" />

      <div className="px-5 pt-4 pb-8 space-y-4 bg-[#F8F9FA] min-h-[calc(100vh-60px)]">
        {/* Helper text */}
        <div className="bg-red-50 rounded-2xl p-4 border border-red-100 flex gap-3">
          <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="text-xs text-red-700 leading-relaxed font-medium">
            Blocked customers cannot view your profile, request bookings, or chat with you.
          </div>
        </div>

        {/* Toggle add block form */}
        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full py-3 bg-white border border-dashed border-slate-300 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Plus className="w-4 h-4 text-slate-500" /> Block a New Customer
          </button>
        ) : (
          <form onSubmit={handleBlockUser} className="bg-white rounded-2xl p-4 shadow-card border border-slate-100 space-y-3">
            <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Block Client</h3>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Client Name (Optional)"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:outline-primary bg-slate-50"
              />
              <input
                type="tel"
                placeholder="Phone Number (e.g., +91 98765 43210)"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                required
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:outline-primary bg-slate-50"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                Block
              </button>
            </div>
          </form>
        )}

        {/* List of blocked clients */}
        <div className="space-y-2.5">
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-1">
            BLOCKED LIST ({users.length})
          </p>

          {users.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 shadow-card text-center border border-slate-100">
              <UserMinus className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="font-bold text-xs text-slate-700">No Blocked Customers</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Customers you block will appear here.</p>
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-2xl p-4 shadow-card flex items-center justify-between border border-slate-50"
              >
                <div>
                  <h4 className="font-extrabold text-sm text-slate-800">{user.name}</h4>
                  <p className="text-[11px] font-semibold text-slate-500 mt-0.5">{user.phone}</p>
                  <p className="text-[9px] text-slate-400 mt-1 font-medium">Blocked on {user.date}</p>
                </div>
                <button
                  onClick={() => handleUnblock(user.id, user.name)}
                  className="px-3.5 py-1.5 border border-slate-200 hover:border-slate-300 rounded-lg text-[10px] font-black text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5 text-slate-400" /> Unblock
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </MobileShell>
  );
}

export default BlockedCustomers;
