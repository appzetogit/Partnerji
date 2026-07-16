import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MobileFrame, Avatar } from "@/components/Partnerji/Shell";
import { toast } from "sonner";
import {
  ChevronRight,
  ClipboardList,
  MapPin,
  ShieldAlert,
  Settings,
  HelpCircle,
  Star,
  LogOut,
  Smartphone,
  Info,
  History,
  FileText,
  Lock,
  Edit2,
  X,
  User,
  Mail,
  Phone
} from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();

  // Local storage profile state
  const [userName, setUserName] = useState("Ravi Kumar");
  const [userEmail, setUserEmail] = useState("ravi.kumar@example.com");
  const [userPhone, setUserPhone] = useState("+91 98765 43210");
  const [isEditing, setIsEditing] = useState(false);

  // Edit fields state
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("user_name");
      const savedEmail = localStorage.getItem("user_email");
      const savedPhone = localStorage.getItem("user_phone");

      if (savedName) setUserName(savedName);
      if (savedEmail) setUserEmail(savedEmail);
      if (savedPhone) setUserPhone(savedPhone);
    }
  }, []);

  const openEditModal = () => {
    setEditName(userName);
    setEditEmail(userEmail);
    setEditPhone(userPhone);
    setErrors({});
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; phone?: string } = {};

    if (!editName.trim()) {
      newErrors.name = "Name is required";
    }
    if (editEmail.trim() && !/\S+@\S+\.\S+/.test(editEmail)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!editPhone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save to states and localStorage
    setUserName(editName);
    setUserEmail(editEmail);
    setUserPhone(editPhone);
    localStorage.setItem("user_name", editName);
    localStorage.setItem("user_email", editEmail);
    localStorage.setItem("user_phone", editPhone);

    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to log out?");
    if (confirm) {
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_email");
      localStorage.removeItem("user_phone");
      localStorage.removeItem("user_role");
      toast.success("Logged out successfully");
      navigate({ to: "/login" });
    }
  };

  const menuItems: Array<{
    Icon: React.ComponentType<any>;
    label: string;
    to?: any;
    onClick?: () => void;
  }> = [
    { Icon: History, label: "Transaction History", to: "/wallet" },
    { Icon: Star, label: "My rating", to: "/my-rating" },
    { Icon: MapPin, label: "Manage addresses", to: "/manage-addresses" },
    { Icon: Settings, label: "Settings", to: "/settings" },
    { Icon: Info, label: "About Partnerji", to: "/about" },
    { Icon: FileText, label: "Terms & Conditions", to: "/terms" },
    { Icon: Lock, label: "Privacy Policy", to: "/privacy" },
  ];

  return (
    <MobileFrame withNav>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6 bg-white relative">
        
        {/* Top Header / Profile Info */}
        <div className="px-5 pt-5 pb-4 flex items-center justify-between">
          {/* User Profile Title & Avatar */}
          <div className="flex items-center gap-4 w-full">
            <Avatar name={userName} color="from-amber-400 to-orange-500" size={60} ring />
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-black text-slate-800 leading-tight flex items-center gap-2">
                {userName}
                <button
                  onClick={openEditModal}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                  title="Edit Profile"
                >
                  <Edit2 size={13} />
                </button>
              </h1>
              <div className="text-xs font-semibold text-slate-500 mt-1 flex flex-col gap-0.5">
                <span>{userPhone.startsWith("+91") ? userPhone : `+91 ${userPhone}`}</span>
                {userEmail && <span className="text-[10px] text-slate-400 font-medium">{userEmail}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Cards (3 items) */}
        <div className="px-5 grid grid-cols-3 gap-3 mt-1">
          {/* Card 1 */}
          <Link to="/bookings" className="bg-white border border-slate-100 hover:border-slate-200 rounded-xl p-3 flex flex-col justify-between h-[90px] shadow-sm hover:shadow transition-all">
            <ClipboardList size={22} className="text-slate-800" />
            <span className="text-[11px] font-extrabold text-slate-800 leading-tight">My bookings</span>
          </Link>
          {/* Card 2 */}
          <Link to="/chatbot" className="bg-white border border-slate-100 hover:border-slate-200 rounded-xl p-3 flex flex-col justify-between h-[90px] shadow-sm hover:shadow transition-all">
            <Smartphone size={22} className="text-slate-800" />
            <span className="text-[11px] font-extrabold text-slate-800 leading-tight">Chat with Bot</span>
          </Link>
          {/* Card 3 */}
          <Link to="/faq" className="bg-white border border-slate-100 hover:border-slate-200 rounded-xl p-3 flex flex-col justify-between h-[90px] shadow-sm hover:shadow transition-all cursor-pointer">
            <HelpCircle size={22} className="text-slate-800" />
            <span className="text-[11px] font-extrabold text-slate-800 leading-tight">Help & support</span>
          </Link>
        </div>

        {/* Divider gap */}
        <div className="h-2 bg-slate-50 mt-6 border-y border-slate-100/50" />

        {/* List of menu options */}
        <div className="mt-2 divide-y divide-slate-100 px-5">
          {menuItems.map((item, index) => {
            const Inner = (
              <div className="flex items-center justify-between py-3.5 group cursor-pointer">
                <div className="flex items-center gap-3.5">
                  <item.Icon size={18} className="text-slate-700 group-hover:text-primary transition-colors" />
                  <span className="text-[13px] font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                    {item.label}
                  </span>
                </div>
                <ChevronRight size={15} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
            );

            return item.to ? (
              <Link key={index} to={item.to} className="block">
                {Inner}
              </Link>
            ) : (
              <div key={index} onClick={item.onClick} className="block">
                {Inner}
              </div>
            );
          })}

          {/* Emergency contacts item with custom alert styling */}
          <Link to="/emergency" className="block">
            <div className="flex items-center justify-between py-3.5 group cursor-pointer">
              <div className="flex items-center gap-3.5">
                <ShieldAlert size={18} className="text-red-500" />
                <span className="text-[13px] font-bold text-red-500">
                  Emergency SOS
                </span>
              </div>
              <ChevronRight size={15} className="text-red-400" />
            </div>
          </Link>
        </div>

        {/* Logout Actions */}
        <div className="px-5 mt-8 mb-4 flex flex-col gap-3">
          <button
            onClick={handleLogout}
            className="h-10 w-full rounded-xl border border-red-200 text-red-500 font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-55 transition-colors cursor-pointer"
          >
            <LogOut size={14} /> Logout
          </button>
          <div className="text-center text-[9px] text-slate-400 mt-2 font-bold">Partnerji v1.0.0</div>
        </div>

        {/* Edit Profile Modal */}
        {isEditing && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end justify-center">
            <form
              onSubmit={handleSave}
              className="bg-white w-full rounded-t-2xl p-5 pb-6 shadow-card animate-in slide-in-from-bottom duration-300 max-w-[420px]"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-extrabold text-slate-800 text-sm">Edit Profile</span>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Full Name</label>
                  <div className="flex items-center h-11 rounded-xl bg-slate-50 border border-slate-200/80 focus-within:border-primary focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/10 overflow-hidden transition-all px-3 gap-2">
                    <User size={15} className="text-slate-400 shrink-0" />
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Enter full name"
                      className="flex-1 bg-transparent text-xs font-bold outline-none text-slate-700"
                    />
                  </div>
                  {errors.name && <span className="text-[10px] text-red-500 font-semibold">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Address (Optional)</label>
                  <div className="flex items-center h-11 rounded-xl bg-slate-50 border border-slate-200/80 focus-within:border-primary focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/10 overflow-hidden transition-all px-3 gap-2">
                    <Mail size={15} className="text-slate-400 shrink-0" />
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="flex-1 bg-transparent text-xs font-bold outline-none text-slate-700"
                    />
                  </div>
                  {errors.email && <span className="text-[10px] text-red-500 font-semibold">{errors.email}</span>}
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Phone Number</label>
                  <div className="flex items-center h-11 rounded-xl bg-slate-50 border border-slate-200/80 focus-within:border-primary focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/10 overflow-hidden transition-all px-3 gap-2">
                    <Phone size={15} className="text-slate-400 shrink-0" />
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="flex-1 bg-transparent text-xs font-bold outline-none text-slate-700"
                    />
                  </div>
                  {errors.phone && <span className="text-[10px] text-red-500 font-semibold">{errors.phone}</span>}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 h-11 border border-slate-200 text-slate-500 font-bold rounded-xl text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 bg-primary text-white font-bold rounded-xl text-xs shadow-soft hover:bg-primary-dark transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </MobileFrame>
  );
}

export default ProfilePage;
