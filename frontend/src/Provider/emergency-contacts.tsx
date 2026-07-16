import { useState } from "react";
import { MobileShell, TopBar } from "@/components/MobileShell";
import { toast } from "sonner";
import { ShieldAlert, Plus, PhoneCall, Heart, Check, Trash2 } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  relation: string;
  phone: string;
}

function EmergencyContacts() {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "Sunita Sharma", relation: "Mother", phone: "+91 98765 00192" },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [phone, setPhone] = useState("");

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !relation.trim() || !phone.trim()) {
      toast.error("Please fill in all details");
      return;
    }
    if (contacts.length >= 3) {
      toast.error("You can add up to 3 emergency contacts maximum.");
      return;
    }

    const newContact: Contact = {
      id: Date.now().toString(),
      name: name.trim(),
      relation: relation.trim(),
      phone: phone.trim(),
    };

    setContacts([...contacts, newContact]);
    setName("");
    setRelation("");
    setPhone("");
    setShowAddForm(false);
    toast.success("Emergency contact added successfully!");
  };

  const handleDelete = (id: string, name: string) => {
    setContacts(contacts.filter((c) => c.id !== id));
    toast.success(`${name} removed from emergency contacts.`);
  };

  return (
    <MobileShell hideNav>
      <TopBar title="Emergency Contacts" back backTo="/Provider/more" />

      <div className="px-5 pt-4 pb-8 space-y-4 bg-[#F8F9FA] min-h-[calc(100vh-60px)]">
        {/* Info Callout */}
        <div className="bg-red-50 rounded-2xl p-4 border border-red-100 flex gap-3">
          <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="text-xs text-red-700 leading-relaxed font-semibold">
            These contacts will be alerted immediately if you trigger the SOS safety button during an active booking session.
          </div>
        </div>

        {/* SOS Action Grid */}
        <div className="bg-white rounded-2xl p-4 shadow-card border border-slate-100 space-y-3">
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">QUICK SAFETY HOTLINES</p>
          <div className="grid grid-cols-2 gap-2">
            <a
              href="tel:112"
              className="py-2.5 px-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl flex items-center justify-center gap-2 border border-red-100 transition-colors text-xs font-bold"
            >
              <PhoneCall className="w-4 h-4" /> Police (112)
            </a>
            <a
              href="tel:108"
              className="py-2.5 px-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl flex items-center justify-center gap-2 border border-red-100 transition-colors text-xs font-bold"
            >
              <PhoneCall className="w-4 h-4" /> Medical (108)
            </a>
          </div>
        </div>

        {/* Add Trigger */}
        {!showAddForm ? (
          contacts.length < 3 && (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full py-3 bg-white border border-dashed border-slate-300 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Plus className="w-4 h-4 text-slate-500" /> Add Emergency Contact
            </button>
          )
        ) : (
          <form onSubmit={handleAddContact} className="bg-white rounded-2xl p-4 shadow-card border border-slate-100 space-y-3">
            <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Contact Details</h3>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:outline-primary bg-slate-50 font-medium"
              />
              <input
                type="text"
                placeholder="Relationship (e.g. Spouse, Brother)"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                required
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:outline-primary bg-slate-50 font-medium"
              />
              <input
                type="tel"
                placeholder="Phone Number (e.g. +91 99999 88888)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:outline-primary bg-slate-50 font-medium"
              />
            </div>
            <div className="flex gap-2 pt-1">
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
                Save Contact
              </button>
            </div>
          </form>
        )}

        {/* Saved Contacts List */}
        <div className="space-y-2.5">
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-1">
            SAVED CONTACTS ({contacts.length}/3)
          </p>

          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-2xl p-4 shadow-card border border-slate-50 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
                    {contact.name}
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">
                      {contact.relation}
                    </span>
                  </h4>
                  <p className="text-[11px] font-semibold text-slate-500 mt-1">{contact.phone}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(contact.id, contact.name)}
                className="p-2 border border-slate-100 hover:border-slate-200 rounded-lg hover:bg-red-50 transition-colors"
                title="Remove Contact"
              >
                <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}

export default EmergencyContacts;
