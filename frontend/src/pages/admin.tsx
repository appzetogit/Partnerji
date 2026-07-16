import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import partnerjilogo from "@/assest/partnerjilogo.png";
import {
  getAboutContent,
  saveAboutContent,
  getTermsContent,
  saveTermsContent,
  getPrivacyContent,
  savePrivacyContent,
  getFAQContent,
  saveFAQContent,
  getBanners,
  saveBanners,
  getOffers,
  saveOffers,
  AboutContent,
  TermsContent,
  PrivacyContent,
  FAQItem,
  BannerItem,
  OfferItem
} from "@/lib/dynamicContent";

import {
  Users,
  Store,
  Clock,
  Check,
  X,
  ShieldCheck,
  Eye,
  LogOut,
  Calendar,
  DollarSign,
  Activity,
  Briefcase,
  Star,
  Plus,
  Search,
  BookOpen,
  AlertCircle,
  ArrowUpRight,
  Ban,
  Unlock,
  Sliders,
  CheckCircle2,
  XCircle,
  UserCheck,
  LayoutDashboard,
  Moon,
  Sun,
  Info,
  Tags,
  Image,
  ToggleLeft,
  ToggleRight,
  Trash2,
  GripVertical
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { formatINR } from "@/lib/mock-data";
import { categories, updateCategories } from "@/lib/Partnerji-data";

import iconAC from "../assest/categoryicon/AC-removebg-preview.png";
import iconCar from "../assest/categoryicon/Car-removebg-preview.png";
import iconDecoration from "../assest/categoryicon/Decoration-removebg-preview.png";
import iconMixer from "../assest/categoryicon/Mixer-removebg-preview.png";
import iconTV from "../assest/categoryicon/TV-removebg-preview.png";
import iconFan from "../assest/categoryicon/Fan-removebg-preview.png";
import iconWashingMachine from "../assest/categoryicon/WashingMachine-removebg-preview.png";

const categoryIconMap: Record<string, string> = {
  AC: iconAC,
  Car: iconCar,
  Decoration: iconDecoration,
  Mixer: iconMixer,
  TV: iconTV,
  Fan: iconFan,
  WashingMachine: iconWashingMachine,
};

export const Route = createFileRoute("/admin")({
  component: AdminPortal,
});

// Color Constants for Charts
const COLORS = ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#EC4899", "#14B8A6"];

interface UserDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  joined: string;
  bookings: number;
  wallet: number;
  status: "Active" | "Suspended";
  prefCategory: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  bookingHistory: Array<{
    id: string;
    companionName: string;
    serviceName: string;
    date: string;
    amount: number;
    status: "Completed" | "Cancelled" | "Active";
  }>;
}

interface ProviderDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  category: string;
  experience: string;
  rating: number;
  reviews: number;
  price: number;
  status: "Approved" | "Suspended";
  online: boolean;
  bio: string;
  avatarColor: string;
  aadhaarUploaded: boolean;
  selfieUploaded: boolean;
  bankAccount: string;
  bankName: string;
  commissionRate?: number;
}

interface RegistrationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  category: string;
  experience: string;
  price: number;
  bio: string;
  aadhaarStatus: "Verified" | "Pending" | "Rejected";
  selfieStatus: "Verified" | "Pending" | "Rejected";
  bankAccount: string;
  bankIFSC: string;
  bankName: string;
  avatarColor: string;
}

// Mock User Database
const initialUsers: UserDetail[] = [
  {
    id: "USR-001",
    name: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    phone: "+91 98765 00001",
    joined: "10 May 2026",
    bookings: 12,
    wallet: 1500,
    status: "Active",
    prefCategory: "Shopping Mate",
    emergencyName: "Ramesh Sharma",
    emergencyPhone: "+91 98765 00002",
    emergencyRelation: "Father",
    bookingHistory: [
      { id: "BK-101", companionName: "Priya Sharma", serviceName: "Shopping Mate", date: "15 May 2026", amount: 900, status: "Completed" },
      { id: "BK-102", companionName: "Rohan Das", serviceName: "Gaming Partner", date: "22 May 2026", amount: 600, status: "Completed" },
      { id: "BK-103", companionName: "Priya Sharma", serviceName: "Shopping Mate", date: "02 Jun 2026", amount: 900, status: "Completed" },
    ]
  },
  {
    id: "USR-002",
    name: "Sunita Patel",
    email: "sunita.patel@yahoo.com",
    phone: "+91 98765 00003",
    joined: "12 May 2026",
    bookings: 8,
    wallet: 2400,
    status: "Active",
    prefCategory: "Dining Companion",
    emergencyName: "Vijay Patel",
    emergencyPhone: "+91 98765 00004",
    emergencyRelation: "Husband",
    bookingHistory: [
      { id: "BK-201", companionName: "Meera Joshi", serviceName: "Dining Companion", date: "18 May 2026", amount: 750, status: "Completed" },
      { id: "BK-202", companionName: "Rhea Kapoor", serviceName: "Dining Companion", date: "24 May 2026", amount: 690, status: "Completed" },
    ]
  },
  {
    id: "USR-003",
    name: "Ravi Kumar",
    email: "ravi.kumar@outlook.com",
    phone: "+91 98765 00005",
    joined: "15 May 2026",
    bookings: 15,
    wallet: 9800,
    status: "Active",
    prefCategory: "Gym Partner",
    emergencyName: "Karan Kumar",
    emergencyPhone: "+91 98765 00006",
    emergencyRelation: "Brother",
    bookingHistory: [
      { id: "BK-301", companionName: "Rahul Mehta", serviceName: "Gym Partner", date: "16 May 2026", amount: 700, status: "Completed" },
      { id: "BK-302", companionName: "Kabir Sen", serviceName: "Gym Partner", date: "20 May 2026", amount: 960, status: "Completed" },
    ]
  },
  {
    id: "USR-004",
    name: "Neha Singh",
    email: "neha.singh@gmail.com",
    phone: "+91 98765 00007",
    joined: "18 May 2026",
    bookings: 21,
    wallet: 4500,
    status: "Active",
    prefCategory: "Travel Companion",
    emergencyName: "Sushma Singh",
    emergencyPhone: "+91 98765 00008",
    emergencyRelation: "Mother",
    bookingHistory: [
      { id: "BK-401", companionName: "Anjali Verma", serviceName: "Travel Companion", date: "21 May 2026", amount: 1800, status: "Completed" },
      { id: "BK-402", companionName: "Amit Sharma", serviceName: "Travel Companion", date: "28 May 2026", amount: 1500, status: "Completed" },
    ]
  },
  {
    id: "USR-005",
    name: "Sanjay Rao",
    email: "sanjay.rao@gmail.com",
    phone: "+91 98765 00009",
    joined: "20 May 2026",
    bookings: 2,
    wallet: 0,
    status: "Suspended",
    prefCategory: "Gaming Partner",
    emergencyName: "Rakesh Rao",
    emergencyPhone: "+91 98765 00010",
    emergencyRelation: "Uncle",
    bookingHistory: [
      { id: "BK-501", companionName: "Rohan Das", serviceName: "Gaming Partner", date: "22 May 2026", amount: 300, status: "Completed" },
      { id: "BK-502", companionName: "Rohan Das", serviceName: "Gaming Partner", date: "29 May 2026", amount: 300, status: "Cancelled" },
    ]
  },
  {
    id: "USR-006",
    name: "Pooja Mehta",
    email: "pooja.meeta@gmail.com",
    phone: "+91 98765 00011",
    joined: "22 May 2026",
    bookings: 5,
    wallet: 1200,
    status: "Active",
    prefCategory: "Shopping Mate",
    emergencyName: "Amit Mehta",
    emergencyPhone: "+91 98765 00012",
    emergencyRelation: "Father",
    bookingHistory: [
      { id: "BK-601", companionName: "Priya Sharma", serviceName: "Shopping Mate", date: "25 May 2026", amount: 1350, status: "Completed" },
    ]
  }
];

// Mock Approved Providers (Companions)
const initialProviders: ProviderDetail[] = [
  {
    id: "priya",
    name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    phone: "+91 98765 43210",
    city: "Bhopal",
    category: "Shopping Mate",
    experience: "3 yrs",
    rating: 4.9,
    reviews: 124,
    price: 450,
    status: "Approved",
    online: true,
    bio: "Hi! I'm Priya, a cheerful and reliable companion based in Bhopal. I love exploring new places, shopping, and helping people. I'm punctual, friendly, and always make sure you have a great experience.",
    avatarColor: "from-pink-400 to-rose-500",
    aadhaarUploaded: true,
    selfieUploaded: true,
    bankAccount: "50100123454521",
    bankName: "HDFC Bank"
  },
  {
    id: "neha",
    name: "Neha Gupta",
    email: "neha.gupta@gmail.com",
    phone: "+91 98765 43211",
    city: "Bhopal",
    category: "Shopping Mate",
    experience: "2 yrs",
    rating: 4.8,
    reviews: 76,
    price: 420,
    status: "Approved",
    online: true,
    bio: "Fashion blogger and personal shopper. Let me help you find the absolute best outfits, deals, and local shopping secrets around the city.",
    avatarColor: "from-pink-400 to-rose-500",
    aadhaarUploaded: true,
    selfieUploaded: true,
    bankAccount: "10023456789",
    bankName: "SBI Bank"
  },
  {
    id: "rahul",
    name: "Rahul Mehta",
    email: "rahul.mehta@gmail.com",
    phone: "+91 98765 43212",
    city: "Bhopal",
    category: "Gym Partner",
    experience: "2 yrs",
    rating: 4.7,
    reviews: 89,
    price: 350,
    status: "Approved",
    online: true,
    bio: "Certified fitness coach with 2+ years experience. Let's crush your fitness goals together!",
    avatarColor: "from-blue-400 to-indigo-500",
    aadhaarUploaded: true,
    selfieUploaded: true,
    bankAccount: "33245678901",
    bankName: "ICICI Bank"
  },
  {
    id: "kabir",
    name: "Kabir Sen",
    email: "kabir.sen@gmail.com",
    phone: "+91 98765 43213",
    city: "Bhopal",
    category: "Gym Partner",
    experience: "4 yrs",
    rating: 4.9,
    reviews: 143,
    price: 480,
    status: "Approved",
    online: false,
    bio: "Strength and conditioning enthusiast. Ready to help you stay motivated, correct your posture, and keep workouts engaging and active.",
    avatarColor: "from-blue-400 to-indigo-500",
    aadhaarUploaded: true,
    selfieUploaded: true,
    bankAccount: "44567890123",
    bankName: "Axis Bank"
  },
  {
    id: "anjali",
    name: "Anjali Verma",
    email: "anjali.verma@gmail.com",
    phone: "+91 98765 43214",
    city: "Bhopal",
    category: "Travel Companion",
    experience: "4 yrs",
    rating: 4.8,
    reviews: 201,
    price: 600,
    status: "Approved",
    online: false,
    bio: "Travel enthusiast. Explored 18 states across India. Your perfect travel buddy.",
    avatarColor: "from-violet-400 to-purple-500",
    aadhaarUploaded: true,
    selfieUploaded: true,
    bankAccount: "55678901234",
    bankName: "HDFC Bank"
  },
  {
    id: "amit",
    name: "Amit Sharma",
    email: "amit.sharma@gmail.com",
    phone: "+91 98765 43215",
    city: "Bhopal",
    category: "Travel Companion",
    experience: "3 yrs",
    rating: 4.7,
    reviews: 95,
    price: 500,
    status: "Approved",
    online: true,
    bio: "Adventurer and road-tripper. I know the best routes, scenic spots, and local guide highlights. Perfect companion for weekend getaways.",
    avatarColor: "from-violet-400 to-purple-500",
    aadhaarUploaded: true,
    selfieUploaded: true,
    bankAccount: "66789012345",
    bankName: "PNB Bank"
  }
];

// Mock Provider Registration Requests
const initialRequests: RegistrationRequest[] = [
  {
    id: "REQ-101",
    name: "Suresh Kumar",
    email: "suresh.kumar@gmail.com",
    phone: "+91 98765 01234",
    city: "Bhopal",
    category: "Shopping Mate",
    experience: "3 Years",
    price: 500,
    bio: "Expert shopper who knows every boutique in DB Mall and Chowk Bazaar. Friendly and punctual. Let's find great outfits!",
    aadhaarStatus: "Verified",
    selfieStatus: "Pending",
    bankAccount: "10234567891",
    bankIFSC: "SBIN0001234",
    bankName: "State Bank of India",
    avatarColor: "from-amber-400 to-orange-500"
  },
  {
    id: "REQ-102",
    name: "Sapna Verma",
    email: "sapna.verma@yahoo.com",
    phone: "+91 98765 05678",
    city: "Indore",
    category: "Dining Companion",
    experience: "2 Years",
    price: 400,
    bio: "Huge foodie. I know the best cafes, fine dining spots, and street foods in Indore & Bhopal. Let's grab lunch or dinner together!",
    aadhaarStatus: "Pending",
    selfieStatus: "Pending",
    bankAccount: "501004321098",
    bankIFSC: "HDFC0000456",
    bankName: "HDFC Bank",
    avatarColor: "from-pink-400 to-purple-500"
  },
  {
    id: "REQ-103",
    name: "Vikram Aditya",
    email: "vikram.aditya@outlook.com",
    phone: "+91 98765 09012",
    city: "Gwalior",
    category: "Gym Partner",
    experience: "5 Years",
    price: 600,
    bio: "Certified fitness trainer. I specialize in strength training, yoga, and posture checks. Can push you to reach your physical peak!",
    aadhaarStatus: "Verified",
    selfieStatus: "Verified",
    bankAccount: "998877665544",
    bankIFSC: "ICIC0000789",
    bankName: "ICICI Bank",
    avatarColor: "from-emerald-400 to-teal-500"
  }
];

// Mock Withdrawals
const initialWithdrawals = [
  { id: "WD-501", providerName: "Priya Sharma", amount: 5000, bank: "HDFC Bank (****4521)", date: "Today 11:30 AM", status: "Pending" },
  { id: "WD-502", providerName: "Rahul Mehta", amount: 3000, bank: "ICICI Bank (****8901)", date: "Today 09:15 AM", status: "Pending" },
  { id: "WD-503", providerName: "Neha Gupta", amount: 4500, bank: "SBI Bank (****6789)", date: "Yesterday 04:00 PM", status: "Approved" },
];



function AdminPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Portal selection: "user" | "provider"
  const [activePortal, setActivePortal] = useState<"user" | "provider">("user");

  // Views state
  const [currentView, setCurrentView] = useState<"dashboard" | "dashboard_provider" | "users" | "companions" | "approvals" | "commission" | "categories" | "content_manager" | "banner_management" | "offer_management">("dashboard");

  // Content Manager state
  const [activeContentTab, setActiveContentTab] = useState<"faq" | "about" | "terms" | "privacy">("faq");
  const [admFaqs, setAdmFaqs] = useState<FAQItem[]>([]);
  const [editingFaqIndex, setEditingFaqIndex] = useState<number | null>(null);
  const [editFaqQ, setEditFaqQ] = useState("");
  const [editFaqA, setEditFaqA] = useState("");
  const [editFaqCat, setEditFaqCat] = useState("Bookings");
  const [isAddingFaq, setIsAddingFaq] = useState(false);

  const [admAbout, setAdmAbout] = useState<AboutContent | null>(null);
  const [admTerms, setAdmTerms] = useState<TermsContent | null>(null);
  const [admPrivacy, setAdmPrivacy] = useState<PrivacyContent | null>(null);

  // Banner management state
  const [admBanners, setAdmBanners] = useState<BannerItem[]>([]);
  const [newBannerImage, setNewBannerImage] = useState<string | null>(null);

  // Offer & Discount management state
  const [admOffers, setAdmOffers] = useState<OfferItem[]>([]);
  const [newOfferImage, setNewOfferImage] = useState<string | null>(null);

  // Load dynamic content for editing
  useEffect(() => {
    if (currentView === "content_manager") {
      setAdmFaqs(getFAQContent());
      setAdmAbout(getAboutContent());
      setAdmTerms(getTermsContent());
      setAdmPrivacy(getPrivacyContent());
    }
    if (currentView === "banner_management") {
      setAdmBanners(getBanners());
    }
    if (currentView === "offer_management") {
      setAdmOffers(getOffers());
    }
  }, [currentView]);

  const handleSaveFAQ = (index: number) => {
    const updated = [...admFaqs];
    updated[index] = { q: editFaqQ, a: editFaqA, cat: editFaqCat };
    setAdmFaqs(updated);
    saveFAQContent(updated);
    setEditingFaqIndex(null);
    setNotification({ message: "FAQ updated successfully", type: "success" });
  };

  const handleAddFAQ = () => {
    const updated = [...admFaqs, { q: editFaqQ, a: editFaqA, cat: editFaqCat }];
    setAdmFaqs(updated);
    saveFAQContent(updated);
    setIsAddingFaq(false);
    setEditFaqQ("");
    setEditFaqA("");
    setNotification({ message: "FAQ added successfully", type: "success" });
  };

  const handleDeleteFAQ = (index: number) => {
    const updated = admFaqs.filter((_, i) => i !== index);
    setAdmFaqs(updated);
    saveFAQContent(updated);
    setNotification({ message: "FAQ deleted successfully", type: "success" });
  };

  const handleSaveAbout = () => {
    if (!admAbout) return;
    saveAboutContent(admAbout);
    setNotification({ message: "About page content saved", type: "success" });
  };

  const handleSaveTerms = () => {
    if (!admTerms) return;
    saveTermsContent(admTerms);
    setNotification({ message: "Terms of Service saved", type: "success" });
  };

  const handleSavePrivacy = () => {
    if (!admPrivacy) return;
    savePrivacyContent(admPrivacy);
    setNotification({ message: "Privacy Policy saved", type: "success" });
  };


  // Theme state: "dark" | "light"
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Dynamic state stores
  const [users, setUsers] = useState<UserDetail[]>(initialUsers);
  const [providers, setProviders] = useState<ProviderDetail[]>(initialProviders);
  const [requests, setRequests] = useState<RegistrationRequest[]>(initialRequests);
  const [withdrawals, setWithdrawals] = useState(initialWithdrawals);
  const [commissionRate, setCommissionRate] = useState(15); // in %

  // Search & Filter states
  const [userSearch, setUserSearch] = useState("");
  const [userFilterStatus, setUserFilterStatus] = useState<"All" | "Active" | "Suspended">("All");

  const [providerSearch, setProviderSearch] = useState("");
  const [commissionSearch, setCommissionSearch] = useState("");
  const [tempRates, setTempRates] = useState<Record<string, number>>({});
  const [providerFilterCat, setProviderFilterCat] = useState("All");

  // Category management states
  const [admCategories, setAdmCategories] = useState<{ name: string; emoji?: string; image?: string }[]>(() => {
    return categories;
  });
  const [newCatName, setNewCatName] = useState("");
  const [newCatImage, setNewCatImage] = useState<string | null>(null);

  // Wallet Edit State
  const [editingWalletUserId, setEditingWalletUserId] = useState<string | null>(null);
  const [editWalletValue, setEditWalletValue] = useState("");

  // Detail Modal States
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<RegistrationRequest | null>(null);
  const [selectedDocType, setSelectedDocType] = useState<"aadhaar" | "selfie">("aadhaar");

  // Success message state
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Auto-clear notification toast
  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  // Auth Persistent check
  useEffect(() => {
    const sessionAuth = localStorage.getItem("partnerji_admin_auth");
    if (sessionAuth === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUsername === "admin" && adminPassword === "admin123") {
      localStorage.setItem("partnerji_admin_auth", "true");
      setIsLoggedIn(true);
      setAuthError("");
      setNotification({ message: "Welcome back, Admin!", type: "success" });
    } else {
      setAuthError("Invalid username or password. (Hint: admin / admin123)");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("partnerji_admin_auth");
    setIsLoggedIn(false);
    setNotification({ message: "Logged out successfully", type: "success" });
  };

  // User Actions
  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const newStatus = u.status === "Active" ? "Suspended" : "Active";
        setNotification({
          message: `User ${u.name} is now ${newStatus}`,
          type: "success"
        });
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  const handleWalletSave = (userId: string) => {
    const amount = parseFloat(editWalletValue);
    if (isNaN(amount) || amount < 0) {
      setNotification({ message: "Please enter a valid positive number", type: "error" });
      return;
    }
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        setNotification({ message: `Updated wallet balance for ${u.name}`, type: "success" });
        return { ...u, wallet: amount };
      }
      return u;
    }));
    setEditingWalletUserId(null);
  };

  // Provider Actions
  const toggleProviderStatus = (provId: string) => {
    setProviders(prev => prev.map(p => {
      if (p.id === provId) {
        const newStatus = p.status === "Approved" ? "Suspended" : "Approved";
        setNotification({
          message: `Provider ${p.name} is now ${newStatus}`,
          type: "success"
        });
        return { ...p, status: newStatus };
      }
      return p;
    }));
  };

  const updateProviderPrice = (provId: string, newPrice: number) => {
    if (isNaN(newPrice) || newPrice <= 0) return;
    setProviders(prev => prev.map(p => {
      if (p.id === provId) {
        return { ...p, price: newPrice };
      }
      return p;
    }));
  };

  const updateProviderCommission = (provId: string, newRate: number | undefined) => {
    if (newRate !== undefined && (isNaN(newRate) || newRate < 5 || newRate > 35)) return;
    setProviders(prev => prev.map(p => {
      if (p.id === provId) {
        return { ...p, commissionRate: newRate };
      }
      return p;
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCatImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCategory = () => {
    const name = newCatName.trim();
    if (!name) {
      setNotification({ message: "Category name is required", type: "error" });
      return;
    }
    if (!newCatImage) {
      setNotification({ message: "Category image is required", type: "error" });
      return;
    }
    if (admCategories.some(c => c.name.toLowerCase() === name.toLowerCase())) {
      setNotification({ message: "Category already exists", type: "error" });
      return;
    }
    const newCats = [...admCategories, { name, image: newCatImage }];
    setAdmCategories(newCats);
    updateCategories(newCats);
    setNewCatName("");
    setNewCatImage(null);
    setNotification({ message: `Category "${name}" added successfully!`, type: "success" });
  };

  const handleDeleteCategory = (name: string) => {
    const newCats = admCategories.filter(c => c.name !== name);
    setAdmCategories(newCats);
    updateCategories(newCats);
    setNotification({ message: `Category "${name}" deleted!`, type: "success" });
  };

  // Approval requests actions
  const approveRequest = (req: RegistrationRequest) => {
    // 1. Remove from pending queue
    setRequests(prev => prev.filter(r => r.id !== req.id));

    // 2. Add to approved providers list
    const newProv: ProviderDetail = {
      id: req.id.toLowerCase(),
      name: req.name,
      email: req.email,
      phone: req.phone,
      city: req.city,
      category: req.category,
      experience: req.experience,
      rating: 5.0, // Default for new providers
      reviews: 0,
      price: req.price,
      status: "Approved",
      online: false,
      bio: req.bio,
      avatarColor: req.avatarColor,
      aadhaarUploaded: true,
      selfieUploaded: true,
      bankAccount: req.bankAccount,
      bankName: req.bankName
    };

    setProviders(prev => [...prev, newProv]);
    setNotification({
      message: `Registration Approved! ${req.name} is now an active companion.`,
      type: "success"
    });
    setSelectedRequest(null);
  };

  const rejectRequest = (reqId: string, name: string) => {
    setRequests(prev => prev.filter(r => r.id !== reqId));
    setNotification({
      message: `Registration rejected for ${name}`,
      type: "error"
    });
    setSelectedRequest(null);
  };

  // Withdrawal requests
  const handleWithdrawalAction = (id: string, action: "Approved" | "Rejected") => {
    setWithdrawals(prev => prev.map(w => {
      if (w.id === id) {
        setNotification({ message: `Withdrawal request ${action.toLowerCase()}`, type: action === "Approved" ? "success" : "error" });
        return { ...w, status: action };
      }
      return w;
    }));
  };

  // Calculations for User Portal
  const activeUsersCount = users.filter(u => u.status === "Active").length;
  const totalUserWalletBalance = users.reduce((acc, curr) => acc + curr.wallet, 0);
  const totalBookingsCount = users.reduce((acc, curr) => acc + curr.bookings, 0);

  // Calculations for Provider Portal
  const totalApprovedProviders = providers.length;
  const pendingRequestsCount = requests.length;
  const activeOnlineProviders = providers.filter(p => p.online).length;

  // Chart data calculations
  // 1. User Preferred categories breakdown
  const categoryData = Object.entries(
    users.reduce((acc: Record<string, number>, user) => {
      acc[user.prefCategory] = (acc[user.prefCategory] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // 2. User growth & booking trend (30 day mockup)
  const growthTrendData = [
    { date: "01 Jun", users: 120, bookings: 180 },
    { date: "07 Jun", users: 160, bookings: 240 },
    { date: "14 Jun", users: 210, bookings: 320 },
    { date: "21 Jun", users: 280, bookings: 430 },
    { date: "28 Jun", users: 340, bookings: 550 },
    { date: "05 Jul", users: 410, bookings: 680 },
    { date: "12 Jul", users: 490, bookings: 810 },
  ];

  // 3. Provider Category Share (Pie chart)
  const providerCategoryShare = Object.entries(
    providers.reduce((acc: Record<string, number>, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // 4. Provider earnings vs commission (updates dynamically with commission rate)
  const providerEarningsData = [
    { day: "Mon", providerShare: 8000 * (1 - commissionRate / 100), commission: 8000 * (commissionRate / 100) },
    { day: "Tue", providerShare: 9500 * (1 - commissionRate / 100), commission: 9500 * (commissionRate / 100) },
    { day: "Wed", providerShare: 12000 * (1 - commissionRate / 100), commission: 12000 * (commissionRate / 100) },
    { day: "Thu", providerShare: 7000 * (1 - commissionRate / 100), commission: 7000 * (commissionRate / 100) },
    { day: "Fri", providerShare: 15000 * (1 - commissionRate / 100), commission: 15000 * (commissionRate / 100) },
    { day: "Sat", providerShare: 22000 * (1 - commissionRate / 100), commission: 22000 * (commissionRate / 100) },
    { day: "Sun", providerShare: 18000 * (1 - commissionRate / 100), commission: 18000 * (commissionRate / 100) },
  ];

  // Filtered Users list
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.phone.includes(userSearch);
    const matchesStatus = userFilterStatus === "All" || user.status === userFilterStatus;
    return matchesSearch && matchesStatus;
  });

  // Filtered Providers list
  const filteredProviders = providers.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(providerSearch.toLowerCase()) ||
      p.email.toLowerCase().includes(providerSearch.toLowerCase()) ||
      p.phone.includes(providerSearch);
    const matchesCat = providerFilterCat === "All" || p.category === providerFilterCat;
    return matchesSearch && matchesCat;
  });

  // Render Login page if not authorized
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 font-sans relative overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none" />

        <div className="w-full max-w-md p-8 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-2xl shadow-lg mb-4 text-white font-black text-2xl">
              P
            </div>
            <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">Partnerji Admin</h1>
            <p className="text-sm text-slate-400 mt-2">Sign in to the Super Admin Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {authError && (
              <div className="p-3.5 bg-red-900/35 border border-red-800/60 text-red-200 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Admin Username
              </label>
              <input
                type="text"
                placeholder="Username (e.g., admin)"
                value={adminUsername}
                onChange={e => setAdminUsername(e.target.value)}
                className="w-full h-12 rounded-xl bg-slate-950 border border-slate-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 px-4 font-semibold text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Password (e.g., admin123)"
                value={adminPassword}
                onChange={e => setAdminPassword(e.target.value)}
                className="w-full h-12 rounded-xl bg-slate-950 border border-slate-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 px-4 font-semibold text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold rounded-xl shadow-lg active:scale-[0.98] transition-all cursor-pointer mt-6 flex items-center justify-center gap-2"
            >
              <ShieldCheck size={18} />
              Verify & Enter
            </button>
          </form>

          <p className="text-[11px] text-center text-slate-500 mt-8 font-medium">
            Authorized administrative personnel only. System access is monitored.
          </p>
        </div>
      </div>
    );
  }

  // Theme dynamic background and text colors
  const pageBgClass = theme === "dark" ? "bg-[#090D1A] text-slate-100" : "bg-slate-50 text-slate-900";
  const mainCardClass = theme === "dark" ? "bg-[#0F1424] border border-slate-800/80 rounded-2xl shadow-xl" : "bg-white border border-slate-200/80 rounded-2xl shadow-sm";
  const textMutedClass = theme === "dark" ? "text-slate-400" : "text-slate-500";
  const titleClass = theme === "dark" ? "text-slate-100 font-extrabold" : "text-slate-800 font-extrabold";
  const headerBgClass = theme === "dark" ? "bg-[#090D1A]/85 border-b border-slate-800/80" : "bg-white/95 border-b border-slate-200";

  return (
    <div className={`min-h-screen font-sans flex antialiased transition-colors duration-300 ${pageBgClass}`}>
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border transition-all animate-bounce ${
          notification.type === "success"
            ? "bg-slate-900 border-emerald-500/50 text-emerald-400"
            : "bg-slate-900 border-red-500/50 text-red-400"
        }`}>
          {notification.type === "success" ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          <span className="text-sm font-bold">{notification.message}</span>
        </div>
      )}

      {/* ==================== LEFT FLOATING SIDEBAR (Screenshot Style) ==================== */}
      <aside className="w-[280px] shrink-0 min-h-screen bg-[#070C19] border-r border-slate-800/60 p-6 flex flex-col justify-between select-none relative z-30">
        <div className="space-y-8">
          {/* Logo container (white rounded box with Partnerji actual logo) */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1 shadow-md overflow-hidden shrink-0">
              <img src={partnerjilogo} alt="Partnerji Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-100 tracking-tight leading-none">Partnerji</h2>
              <span className="text-[9px] font-black tracking-widest text-violet-400/80 uppercase block mt-1">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Portal Switch Switcher inside Sidebar */}
          <div className="p-1 bg-slate-900/60 border border-slate-800/80 rounded-xl flex gap-1">
            <button
              onClick={() => {
                setActivePortal("user");
                setCurrentView("dashboard");
              }}
              className={`flex-1 py-1.5 rounded-lg font-bold text-[10px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activePortal === "user"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Users size={12} />
              User
            </button>
            <button
              onClick={() => {
                setActivePortal("provider");
                setCurrentView("dashboard_provider");
              }}
              className={`flex-1 py-1.5 rounded-lg font-bold text-[10px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activePortal === "provider"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Store size={12} />
              Provider
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {activePortal === "user" ? (
              <>
                <SidebarLink
                  label="Dashboard"
                  icon={<LayoutDashboard size={16} />}
                  active={currentView === "dashboard"}
                  onClick={() => setCurrentView("dashboard")}
                />
                <SidebarLink
                  label="Users List"
                  icon={<Users size={16} />}
                  active={currentView === "users"}
                  onClick={() => setCurrentView("users")}
                />
                <SidebarLink
                  label="Category Management"
                  icon={<Tags size={16} />}
                  active={currentView === "categories"}
                  onClick={() => setCurrentView("categories")}
                />
                <SidebarLink
                  label="Content Manager"
                  icon={<BookOpen size={16} />}
                  active={currentView === "content_manager"}
                  onClick={() => setCurrentView("content_manager")}
                />
                <SidebarLink
                  label="Banner Management"
                  icon={<Image size={16} />}
                  active={currentView === "banner_management"}
                  onClick={() => setCurrentView("banner_management")}
                />
                <SidebarLink
                  label="Offer & Discount"
                  icon={<Tags size={16} />}
                  active={currentView === "offer_management"}
                  onClick={() => setCurrentView("offer_management")}
                />
              </>
            ) : (
              <>
                <SidebarLink
                  label="Dashboard"
                  icon={<LayoutDashboard size={16} />}
                  active={currentView === "dashboard_provider"}
                  onClick={() => setCurrentView("dashboard_provider")}
                />
                <SidebarLink
                  label="Providers"
                  icon={<Briefcase size={16} />}
                  active={currentView === "companions"}
                  onClick={() => setCurrentView("companions")}
                />
                <SidebarLink
                  label="Provider Requests"
                  icon={<UserCheck size={16} />}
                  active={currentView === "approvals"}
                  onClick={() => setCurrentView("approvals")}
                  badge={pendingRequestsCount > 0 ? pendingRequestsCount : undefined}
                />
                <SidebarLink
                  label="Provider Commission"
                  icon={<Sliders size={16} />}
                  active={currentView === "commission"}
                  onClick={() => setCurrentView("commission")}
                />
              </>
            )}
          </nav>

        </div>

        {/* Bottom controls */}
        <div className="space-y-5 pt-6 border-t border-slate-800/40">
          {/* Light Mode switch exactly like the screenshot */}
          <div className="flex items-center justify-between px-3 text-slate-400 font-semibold text-xs">
            <div className="flex items-center gap-3">
              {theme === "dark" ? <Moon size={15} className="text-slate-400" /> : <Sun size={15} className="text-amber-400" />}
              <span>Light Mode</span>
            </div>
            <button
              onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}
              className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer relative ${
                theme === "light" ? "bg-violet-600" : "bg-slate-800"
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${
                theme === "light" ? "translate-x-5" : ""
              }`} />
            </button>
          </div>

          {/* Logout button capsule */}
          <button
            onClick={handleLogout}
            className="w-full h-11 bg-slate-800/40 hover:bg-red-950/20 hover:border-red-900/60 border border-slate-800/80 text-slate-300 hover:text-red-400 rounded-xl flex items-center justify-center gap-2.5 font-bold text-xs transition cursor-pointer shadow-sm"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </aside>

      {/* ==================== RIGHT PANEL ==================== */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Main Dashboard Top Header */}
        <header className={`px-8 py-5 flex items-center justify-between shrink-0 transition-colors duration-300 ${headerBgClass}`}>
          <div>
            <h1 className={`text-xl ${titleClass} tracking-tight capitalize`}>
              {currentView === "dashboard"
                ? "Marketplace Overview"
                : currentView === "companions"
                ? "Providers Panel"
                : currentView === "approvals"
                ? "Provider Requests Panel"
                : currentView === "commission"
                ? "Provider Commission Panel"
                : currentView === "categories"
                ? "Category Management Panel"
                : currentView === "banner_management"
                ? "Banner Management Panel"
                : currentView === "offer_management"
                ? "Offer & Discount Management"
                : `${currentView} Panel`}
            </h1>
            <p className={`text-xs ${textMutedClass} mt-0.5`}>
              {currentView === "dashboard"
                ? "Key metrics, booking analytics, and platform updates"
                : currentView === "companions"
                ? "Manage platform providers database, review status and updates"
                : currentView === "approvals"
                ? "Manage platform provider requests database, review status and updates"
                : currentView === "commission"
                ? "Configure global default and custom per-provider commission rates"
                : currentView === "categories"
                ? "Manage user-side categories, add new categories dynamically with emojis"
                : currentView === "banner_management"
                ? "Upload and manage promotional banners shown on the user home screen"
                : currentView === "offer_management"
                ? "Upload and manage offer & discount cards shown in the Offers & Discounts section"
                : `Manage platform ${currentView} database, review status and updates`}
            </p>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className={`text-[10px] font-bold ${textMutedClass} uppercase tracking-widest`}>System status</p>
              <p className="text-xs font-extrabold mt-0.5 flex items-center gap-1.5 justify-end">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </p>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {currentView === "dashboard" && (
            /* ==================== 1. USER DASHBOARD VIEW ==================== */
            <div className="space-y-8 animate-fadeIn">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  title="Total Users"
                  value={users.length}
                  sub="Active registered clients"
                  icon={<Users size={20} className="text-violet-400" />}
                  theme={theme}
                />
                <MetricCard
                  title="Active Sessions"
                  value={activeUsersCount}
                  sub="Providers online ready"
                  icon={<Activity size={20} className="text-amber-400" />}
                  theme={theme}
                />
                <MetricCard
                  title="Total Users Wallet"
                  value={formatINR(totalUserWalletBalance)}
                  sub="Prepaid Deposit Funds"
                  icon={<DollarSign size={20} className="text-amber-400" />}
                  theme={theme}
                />
                <MetricCard
                  title="Total Bookings"
                  value={totalBookingsCount}
                  sub="Completed Journeys"
                  icon={<BookOpen size={20} className="text-indigo-400" />}
                  theme={theme}
                />
              </div>

              {/* Charts grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Area Chart: Growth Curve */}
                <div className={mainCardClass}>
                  <div className="p-6 border-b border-slate-800/20">
                    <h2 className={`text-sm ${titleClass}`}>User Growth & Bookings</h2>
                    <p className={`text-xs ${textMutedClass} mt-0.5`}>Daily curves for bookings and signups</p>
                  </div>
                  <div className="p-6 h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={growthTrendData}>
                        <defs>
                          <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="bookingGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#1E293B" : "#E2E8F0"} vertical={false} />
                        <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} />
                        <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: theme === "dark" ? "#0F1424" : "#FFFFFF",
                            borderColor: theme === "dark" ? "#334155" : "#E2E8F0",
                            borderRadius: "12px",
                            color: theme === "dark" ? "#F1F5F9" : "#0F172A"
                          }}
                        />
                        <Legend verticalAlign="top" height={36} iconType="circle" />
                        <Area name="Users Registered" type="monotone" dataKey="users" stroke="#8B5CF6" strokeWidth={2.5} fillOpacity={1} fill="url(#userGrad)" />
                        <Area name="Total Bookings Done" type="monotone" dataKey="bookings" stroke="#3B82F6" strokeWidth={2.5} fillOpacity={1} fill="url(#bookingGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Bar Chart: User Preferences */}
                <div className={mainCardClass}>
                  <div className="p-6 border-b border-slate-800/20">
                    <h2 className={`text-sm ${titleClass}`}>Bookings by Category Prefer</h2>
                    <p className={`text-xs ${textMutedClass} mt-0.5`}>Preference distribution of bookings</p>
                  </div>
                  <div className="p-6 h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#1E293B" : "#E2E8F0"} vertical={false} />
                        <XAxis dataKey="name" stroke="#64748B" fontSize={10} tickLine={false} />
                        <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: theme === "dark" ? "#0F1424" : "#FFFFFF",
                            borderColor: theme === "dark" ? "#334155" : "#E2E8F0",
                            borderRadius: "12px",
                            color: theme === "dark" ? "#F1F5F9" : "#0F172A"
                          }}
                        />
                        <Bar name="Users Preferring" dataKey="value" fill="#8B5CF6" radius={[6, 6, 0, 0]}>
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === "dashboard_provider" && (
            /* ==================== 1. PROVIDER DASHBOARD VIEW ==================== */
            <div className="space-y-8 animate-fadeIn">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  title="Total Providers"
                  value={providers.length}
                  sub="Approved service providers"
                  icon={<Briefcase size={20} className="text-emerald-400" />}
                  theme={theme}
                />
                <MetricCard
                  title="Online Providers"
                  value={activeOnlineProviders}
                  sub="Ready to Connect"
                  icon={<Activity size={20} className="text-emerald-400" />}
                  theme={theme}
                />
                <MetricCard
                  title="Pending Requests"
                  value={pendingRequestsCount}
                  sub="Awaiting Approval"
                  icon={<Clock size={20} className="text-amber-400" />}
                  theme={theme}
                />
                <MetricCard
                  title="Commission Rate"
                  value={`${commissionRate}%`}
                  sub="Flat platform service cut"
                  icon={<Sliders size={20} className="text-indigo-400" />}
                  theme={theme}
                />
              </div>

              {/* Charts grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pie Chart: Specializations */}
                <div className={mainCardClass}>
                  <div className="p-6 border-b border-slate-800/20">
                    <h2 className={`text-sm ${titleClass}`}>Provider Category Distribution</h2>
                    <p className={`text-xs ${textMutedClass} mt-0.5`}>Specialization shares of active providers</p>
                  </div>
                  <div className="p-6 h-80 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={providerCategoryShare}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {providerCategoryShare.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: theme === "dark" ? "#0F1424" : "#FFFFFF",
                            borderColor: theme === "dark" ? "#334155" : "#E2E8F0",
                            borderRadius: "12px",
                            color: theme === "dark" ? "#F1F5F9" : "#0F172A"
                          }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Bar Chart: Platform Revenue Split */}
                <div className={mainCardClass}>
                  <div className="p-6 border-b border-slate-800/20">
                    <h2 className={`text-sm ${titleClass}`}>Commission Revenue Split</h2>
                    <p className={`text-xs ${textMutedClass} mt-0.5`}>Platform vs provider splits (recalculates with commission)</p>
                  </div>
                  <div className="p-6 h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={providerEarningsData} stackOffset="expand">
                        <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#1E293B" : "#E2E8F0"} vertical={false} />
                        <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
                        <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: theme === "dark" ? "#0F1424" : "#FFFFFF",
                            borderColor: theme === "dark" ? "#334155" : "#E2E8F0",
                            borderRadius: "12px",
                            color: theme === "dark" ? "#F1F5F9" : "#0F172A"
                          }}
                        />
                        <Legend verticalAlign="top" height={36} iconType="circle" />
                        <Bar name="Platform Fee" dataKey="commission" fill="#8B5CF6" stackId="a" />
                        <Bar name="Provider Share" dataKey="providerShare" fill="#10B981" stackId="a" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}


          {currentView === "users" && (
            /* ==================== 2. USERS VIEW ==================== */
            <div className={`${mainCardClass} overflow-hidden animate-fadeIn`}>
              <div className="p-6 border-b border-slate-800/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className={`text-base ${titleClass}`}>Registered Platform Users</h2>
                  <p className={`text-xs ${textMutedClass} mt-0.5`}>Manage accounts, update wallet balances, and examine histories</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Search Bar */}
                  <div className="relative h-10 w-64">
                    <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                    <input
                      type="text"
                      placeholder="Search User name, phone..."
                      value={userSearch}
                      onChange={e => setUserSearch(e.target.value)}
                      className={`w-full h-full border rounded-xl pl-9 pr-4 text-xs font-semibold outline-none focus:border-violet-500 transition-all ${
                        theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"
                      }`}
                    />
                  </div>

                  {/* Status Filter */}
                  <div className={`flex items-center border rounded-xl p-1 ${
                    theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"
                  }`}>
                    {(["All", "Active", "Suspended"] as const).map(status => (
                      <button
                        key={status}
                        onClick={() => setUserFilterStatus(status)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold tracking-wider uppercase transition ${
                          userFilterStatus === status
                            ? theme === "dark" ? "bg-slate-900 text-violet-400 border border-slate-800" : "bg-white text-violet-600 border border-slate-200 shadow-sm"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`text-[10px] font-black uppercase tracking-wider ${
                      theme === "dark" ? "bg-slate-950/40 text-slate-400 border-b border-slate-800/60" : "bg-slate-100 text-slate-500 border-b border-slate-200"
                    }`}>
                      <th className="px-6 py-4">User Details</th>
                      <th className="px-6 py-4">Phone Number</th>
                      <th className="px-6 py-4">Joined Date</th>
                      <th className="px-6 py-4">Bookings</th>
                      <th className="px-6 py-4">Wallet Balance</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme === "dark" ? "divide-slate-800/40" : "divide-slate-100"}`}>
                    {filteredUsers.map(user => (
                      <tr key={user.id} className={`transition group ${theme === "dark" ? "hover:bg-slate-900/30" : "hover:bg-slate-50"}`}>
                        <td className="px-6 py-4.5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                              {user.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div>
                              <p className={`text-xs font-bold transition group-hover:text-violet-500 ${
                                theme === "dark" ? "text-slate-200" : "text-slate-800"
                              }`}>
                                {user.name}
                              </p>
                              <p className={`text-[10px] font-medium mt-0.5 ${textMutedClass}`}>{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className={`px-6 py-4.5 text-xs font-semibold ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>{user.phone}</td>
                        <td className={`px-6 py-4.5 text-xs font-medium ${textMutedClass}`}>{user.joined}</td>
                        <td className="px-6 py-4.5">
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                            theme === "dark" ? "bg-slate-950 text-slate-400 border-slate-800" : "bg-slate-50 text-slate-500 border-slate-200"
                          }`}>
                            {user.bookings} Bookings
                          </span>
                        </td>
                        <td className="px-6 py-4.5">
                          {editingWalletUserId === user.id ? (
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-extrabold text-violet-400">₹</span>
                              <input
                                type="number"
                                value={editWalletValue}
                                onChange={e => setEditWalletValue(e.target.value)}
                                className={`w-20 h-7 border rounded px-1.5 text-xs font-bold outline-none ${
                                  theme === "dark" ? "bg-slate-950 border-slate-700 text-slate-100" : "bg-slate-50 border-slate-300 text-slate-800"
                                }`}
                                autoFocus
                              />
                              <button
                                onClick={() => handleWalletSave(user.id)}
                                className="w-6 h-6 rounded bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center text-white cursor-pointer"
                              >
                                <Check size={12} strokeWidth={3} />
                              </button>
                              <button
                                onClick={() => setEditingWalletUserId(null)}
                                className="w-6 h-6 rounded bg-slate-850 hover:bg-slate-750 flex items-center justify-center text-slate-400 cursor-pointer"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-bold ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>{formatINR(user.wallet)}</span>
                              <button
                                onClick={() => {
                                  setEditingWalletUserId(user.id);
                                  setEditWalletValue(user.wallet.toString());
                                }}
                                className="text-[10px] font-bold text-violet-400 hover:underline hover:text-violet-500 cursor-pointer"
                              >
                                Edit
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4.5">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                            user.status === "Active"
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                              : "bg-red-500/10 border-red-500/20 text-red-400"
                          }`}>
                            <span className={`w-1 h-1 rounded-full ${user.status === "Active" ? "bg-emerald-400" : "bg-red-400"}`} />
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedUser(user)}
                              className={`h-8 px-3 rounded-lg border font-semibold text-[11px] flex items-center gap-1.5 transition cursor-pointer ${
                                theme === "dark" ? "bg-slate-900 border-slate-850 hover:bg-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
                              }`}
                            >
                              <Eye size={12} />
                              Inspect
                            </button>
                            <button
                              onClick={() => toggleUserStatus(user.id)}
                              className={`h-8 px-3 rounded-lg font-semibold text-[11px] flex items-center gap-1.5 transition cursor-pointer ${
                                user.status === "Active"
                                  ? "bg-red-950/20 border border-red-900/40 hover:bg-red-900/20 text-red-400"
                                  : "bg-emerald-950/20 border border-emerald-900/40 hover:bg-emerald-900/20 text-emerald-400"
                              }`}
                            >
                              {user.status === "Active" ? <Ban size={12} /> : <Unlock size={12} />}
                              {user.status === "Active" ? "Suspend" : "Activate"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {currentView === "companions" && (
            /* ==================== 3. COMPANIONS VIEW ==================== */
            <div className={`${mainCardClass} overflow-hidden animate-fadeIn`}>
              <div className="p-6 border-b border-slate-800/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className={`text-base ${titleClass}`}>Approved Platform Providers</h2>
                  <p className={`text-xs ${textMutedClass} mt-0.5`}>Tune rates, examine ratings, and toggle statuses</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Search Bar */}
                  <div className="relative h-10 w-64">
                    <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                    <input
                      type="text"
                      placeholder="Search Provider Name, phone..."
                      value={providerSearch}
                      onChange={e => setProviderSearch(e.target.value)}
                      className={`w-full h-full border rounded-xl pl-9 pr-4 text-xs font-semibold outline-none focus:border-violet-500 transition-all ${
                        theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"
                      }`}
                    />
                  </div>

                  {/* Category Filter */}
                  <select
                    value={providerFilterCat}
                    onChange={e => setProviderFilterCat(e.target.value)}
                    className={`h-10 border rounded-xl px-3.5 text-xs font-semibold outline-none focus:border-violet-500 cursor-pointer ${
                      theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <option value="All">All Categories</option>
                    <option value="Shopping Mate">Shopping Mate</option>
                    <option value="Gym Partner">Gym Partner</option>
                    <option value="Travel Companion">Travel Companion</option>
                    <option value="Dining Companion">Dining Companion</option>
                  </select>
                </div>
              </div>

              {/* Providers Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`text-[10px] font-black uppercase tracking-wider ${
                      theme === "dark" ? "bg-slate-950/40 text-slate-400 border-b border-slate-800/60" : "bg-slate-100 text-slate-500 border-b border-slate-200"
                    }`}>
                      <th className="px-6 py-4">Provider</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Experience</th>
                      <th className="px-6 py-4">Hourly Rate</th>
                      <th className="px-6 py-4">Rating</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme === "dark" ? "divide-slate-800/40" : "divide-slate-100"}`}>
                    {filteredProviders.map(p => (
                      <tr key={p.id} className={`transition group ${theme === "dark" ? "hover:bg-slate-900/30" : "hover:bg-slate-50"}`}>
                        <td className="px-6 py-4.5">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${p.avatarColor} text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm relative`}>
                              {p.name.split(" ").map(n => n[0]).join("")}
                              {p.online && (
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-[#0F1424] rounded-full" />
                              )}
                            </div>
                            <div>
                              <p className={`text-xs font-bold transition group-hover:text-violet-500 flex items-center gap-1.5 ${
                                theme === "dark" ? "text-slate-200" : "text-slate-800"
                              }`}>
                                {p.name}
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500" title="Identity Verified" />
                              </p>
                              <p className={`text-[10px] font-medium mt-0.5 ${textMutedClass}`}>{p.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className={`px-6 py-4.5 text-xs font-semibold ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>{p.category}</td>
                        <td className={`px-6 py-4.5 text-xs font-medium ${textMutedClass}`}>{p.experience}</td>
                        <td className="px-6 py-4.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-400">₹</span>
                            <input
                              type="number"
                              value={p.price}
                              onChange={e => updateProviderPrice(p.id, parseInt(e.target.value))}
                              className={`w-16 h-7 border rounded px-1.5 text-xs font-bold text-center outline-none focus:border-violet-500 ${
                                theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-300 text-slate-850"
                              }`}
                            />
                            <span className={`text-[10px] font-bold ${textMutedClass}`}>/hr</span>
                          </div>
                        </td>
                        <td className="px-6 py-4.5">
                          <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                            <Star size={12} className="fill-amber-400" />
                            <span>{p.rating}</span>
                            <span className={`text-[10px] font-bold ${textMutedClass}`}>({p.reviews})</span>
                          </div>
                        </td>
                        <td className="px-6 py-4.5">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                            p.status === "Approved"
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                              : "bg-red-500/10 border-red-500/20 text-red-400"
                          }`}>
                            <span className={`w-1 h-1 rounded-full ${p.status === "Approved" ? "bg-emerald-400" : "bg-red-400"}`} />
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 text-right">
                          <button
                            onClick={() => toggleProviderStatus(p.id)}
                            className={`h-8 px-3 rounded-lg font-semibold text-[11px] flex items-center gap-1.5 transition ml-auto cursor-pointer ${
                              p.status === "Approved"
                                ? "bg-red-950/20 border border-red-900/40 hover:bg-red-900/20 text-red-400"
                                : "bg-emerald-950/20 border border-emerald-900/40 hover:bg-emerald-900/20 text-emerald-400"
                            }`}
                          >
                            {p.status === "Approved" ? <Ban size={12} /> : <Unlock size={12} />}
                            {p.status === "Approved" ? "Suspend" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {currentView === "approvals" && (
            /* ==================== 4. APPROVALS VIEW ==================== */
            <div className={`${mainCardClass} overflow-hidden animate-fadeIn`}>
              <div className="p-6 border-b border-slate-800/20">
                <h2 className={`text-base ${titleClass}`}>Provider Requests</h2>
                <p className={`text-xs ${textMutedClass} mt-0.5`}>Verify government credentials and selfies for provider applications</p>
              </div>

              {requests.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center text-slate-500 mx-auto mb-4 border border-slate-800">
                    <Check size={24} />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-355">All caught up!</h3>
                  <p className="text-xs text-slate-500 mt-1">There are no pending provider registration requests currently.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className={`text-[10px] font-black uppercase tracking-wider ${
                        theme === "dark" ? "bg-slate-950/40 text-slate-400 border-b border-slate-800/60" : "bg-slate-100 text-slate-500 border-b border-slate-200"
                      }`}>
                        <th className="px-6 py-4">Applicant</th>
                        <th className="px-6 py-4">Category Preference</th>
                        <th className="px-6 py-4">Experience</th>
                        <th className="px-6 py-4">Rate Offered</th>
                        <th className="px-6 py-4">Identity Verification</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${theme === "dark" ? "divide-slate-800/40" : "divide-slate-100"}`}>
                      {requests.map(req => (
                        <tr key={req.id} className={`transition ${theme === "dark" ? "hover:bg-slate-900/30" : "hover:bg-slate-50"}`}>
                          <td className="px-6 py-4.5">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${req.avatarColor} text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm`}>
                                {req.name.split(" ").map(n => n[0]).join("")}
                              </div>
                              <div>
                                <p className={`text-xs font-bold ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>{req.name}</p>
                                <p className={`text-[10px] font-semibold mt-0.5 ${textMutedClass}`}>{req.city} · {req.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td className={`px-6 py-4.5 text-xs font-bold ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>{req.category}</td>
                          <td className={`px-6 py-4.5 text-xs font-medium ${textMutedClass}`}>{req.experience}</td>
                          <td className={`px-6 py-4.5 text-xs font-extrabold ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>{formatINR(req.price)}/hr</td>
                          <td className="px-6 py-4.5">
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-extrabold uppercase border ${
                                req.aadhaarStatus === "Verified"
                                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                  : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                              }`}>
                                ID: {req.aadhaarStatus}
                              </span>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-extrabold uppercase border ${
                                req.selfieStatus === "Verified"
                                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                  : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                              }`}>
                                Selfie: {req.selfieStatus}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4.5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedRequest(req)}
                                className={`h-8 px-3 rounded-lg border font-semibold text-[11px] flex items-center gap-1.5 transition cursor-pointer ${
                                  theme === "dark" ? "bg-slate-900 border-slate-850 hover:bg-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
                                }`}
                              >
                                <Eye size={12} />
                                Review docs
                              </button>
                              <button
                                onClick={() => approveRequest(req)}
                                className="h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] flex items-center gap-1.5 transition cursor-pointer shadow-md"
                              >
                                <Check size={12} strokeWidth={3} />
                                Approve
                              </button>
                              <button
                                onClick={() => rejectRequest(req.id, req.name)}
                                className="h-8 px-3 rounded-lg bg-red-950/20 border border-red-900/40 hover:bg-red-900/20 text-red-400 font-semibold text-[11px] flex items-center gap-1.5 transition cursor-pointer"
                              >
                                <X size={12} />
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}



          {currentView === "commission" && (
            /* ==================== 5. PROVIDER COMMISSION MANAGER VIEW ==================== */
            <div className="space-y-8 animate-fadeIn">
              {/* Global Default Rate Card */}
              <div className={mainCardClass}>
                <div className="p-6 border-b border-slate-800/20 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-400 flex items-center justify-center">
                    <Sliders size={18} />
                  </div>
                  <div>
                    <h3 className={`font-extrabold text-sm ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>Adjust Global Default Commission</h3>
                    <p className={`text-xs ${textMutedClass} mt-0.5`}>Platform default service cut applied to all providers without overrides</p>
                  </div>
                </div>
                <div className="p-6 flex items-center gap-6">
                  <div className="flex-1">
                    <input
                      type="range"
                      min="5"
                      max="35"
                      value={commissionRate}
                      onChange={e => setCommissionRate(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 mt-2">
                      <span>5% (Minimum)</span>
                      <span>20% (Standard)</span>
                      <span>35% (Premium)</span>
                    </div>
                  </div>
                  <div className={`text-center w-24 shrink-0 border rounded-xl py-2 px-3 ${
                    theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${textMutedClass}`}>Rate</p>
                    <p className="text-lg font-black text-violet-500 mt-0.5">{commissionRate}%</p>
                  </div>
                </div>
              </div>

              {/* Provider Overrides Card */}
              <div className={`${mainCardClass} overflow-hidden`}>
                <div className="p-6 border-b border-slate-800/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className={`text-base ${titleClass}`}>Individual Provider Overrides</h2>
                    <p className={`text-xs ${textMutedClass} mt-0.5`}>Configure specific commission rates for individual providers</p>
                  </div>

                  {/* Search Bar */}
                  <div className="relative h-10 w-64">
                    <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                    <input
                      type="text"
                      placeholder="Search Provider by name..."
                      value={commissionSearch}
                      onChange={e => setCommissionSearch(e.target.value)}
                      className={`w-full h-full border rounded-xl pl-9 pr-4 text-xs font-semibold outline-none focus:border-violet-500 transition-all ${
                        theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"
                      }`}
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className={`text-[10px] font-black uppercase tracking-wider ${
                        theme === "dark" ? "bg-slate-950/40 text-slate-400 border-b border-slate-800/60" : "bg-slate-100 text-slate-500 border-b border-slate-200"
                      }`}>
                        <th className="px-6 py-4">Provider</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Commission Status</th>
                        <th className="px-6 py-4">Commission Rate</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${theme === "dark" ? "divide-slate-800/40" : "divide-slate-100"}`}>
                      {providers
                        .filter(p => p.status === "Approved" && p.name.toLowerCase().includes(commissionSearch.toLowerCase()))
                        .map(p => {
                          const isCustom = p.commissionRate !== undefined;
                          const currentRate = isCustom ? p.commissionRate! : commissionRate;
                          const editRate = tempRates[p.id] !== undefined ? tempRates[p.id] : currentRate;
                          const hasChanged = tempRates[p.id] !== undefined && tempRates[p.id] !== currentRate;
                          const isValid = tempRates[p.id] !== undefined && tempRates[p.id] >= 5 && tempRates[p.id] <= 35;
                          return (
                            <tr key={p.id} className={`transition group ${theme === "dark" ? "hover:bg-slate-900/30" : "hover:bg-slate-50"}`}>
                              <td className="px-6 py-4.5">
                                <div className="flex items-center gap-3">
                                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${p.avatarColor} text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm relative`}>
                                    {p.name.split(" ").map(n => n[0]).join("")}
                                    {p.online && (
                                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-[#0F1424] rounded-full" />
                                    )}
                                  </div>
                                  <div>
                                    <p className={`text-xs font-bold transition group-hover:text-violet-500 flex items-center gap-1.5 ${
                                      theme === "dark" ? "text-slate-200" : "text-slate-800"
                                    }`}>
                                      {p.name}
                                    </p>
                                    <p className={`text-[10px] font-medium mt-0.5 ${textMutedClass}`}>{p.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className={`px-6 py-4.5 text-xs font-semibold ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>{p.category}</td>
                              <td className="px-6 py-4.5">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                                  isCustom
                                    ? "bg-violet-500/10 border-violet-500/20 text-violet-400"
                                    : "bg-slate-500/10 border-slate-500/20 text-slate-400"
                                }`}>
                                  <span className={`w-1 h-1 rounded-full ${isCustom ? "bg-violet-400" : "bg-slate-400"}`} />
                                  {isCustom ? "Custom Override" : "Global Default"}
                                </span>
                              </td>
                              <td className="px-6 py-4.5">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="number"
                                    min="5"
                                    max="35"
                                    value={editRate}
                                    onChange={e => {
                                      const val = parseInt(e.target.value);
                                      setTempRates(prev => ({ ...prev, [p.id]: isNaN(val) ? 0 : val }));
                                    }}
                                    className={`w-16 h-7 border rounded px-1.5 text-xs font-bold text-center outline-none focus:border-violet-500 ${
                                      theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-300 text-slate-850"
                                    }`}
                                  />
                                  <span className={`text-[10px] font-bold ${textMutedClass}`}>%</span>
                                  {hasChanged && (
                                    <button
                                      disabled={!isValid}
                                      onClick={() => {
                                        const newRate = tempRates[p.id];
                                        updateProviderCommission(p.id, newRate);
                                        setTempRates(prev => {
                                          const copy = { ...prev };
                                          delete copy[p.id];
                                          return copy;
                                        });
                                        setNotification({
                                          message: `Commission rate saved for ${p.name}!`,
                                          type: "success"
                                        });
                                      }}
                                      className={`h-7 px-2.5 rounded text-[10px] font-bold transition shadow-sm cursor-pointer ${
                                        isValid
                                          ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                                          : "bg-slate-800 text-slate-500 cursor-not-allowed"
                                      }`}
                                    >
                                      Save
                                    </button>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4.5 text-right">
                                {isCustom && (
                                  <button
                                    onClick={() => {
                                      updateProviderCommission(p.id, undefined);
                                      setTempRates(prev => {
                                        const copy = { ...prev };
                                        delete copy[p.id];
                                        return copy;
                                      });
                                      setNotification({
                                        message: `Reset commission to default for ${p.name}`,
                                        type: "success"
                                      });
                                    }}
                                    className="h-8 px-3 rounded-lg bg-slate-950/20 border border-slate-800/40 hover:bg-slate-900/20 text-slate-400 font-semibold text-[11px] transition ml-auto cursor-pointer"
                                  >
                                    Reset to Default
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {currentView === "categories" && (
            /* ==================== CATEGORY MANAGEMENT VIEW ==================== */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
              {/* Add Category Form (Left 1 Col) */}
              <div className="lg:col-span-1 space-y-6">
                <div className={mainCardClass}>
                  <div className="p-6 border-b border-slate-800/20">
                    <h3 className={`text-sm ${titleClass}`}>Create Category</h3>
                    <p className={`text-xs ${textMutedClass} mt-0.5`}>Add a new service category for the marketplace</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                        Category Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Cooking, Repair, Gardening"
                        value={newCatName}
                        onChange={e => setNewCatName(e.target.value)}
                        className={`w-full h-10 border rounded-xl px-3 text-xs font-semibold outline-none focus:border-violet-500 transition-all ${
                          theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                        Category Image Upload
                      </label>
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 border-2 border-dashed rounded-2xl flex items-center justify-center overflow-hidden shrink-0 ${
                          theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
                        }`}>
                          {newCatImage ? (
                            <img src={newCatImage} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-slate-500 text-[10px]">No img</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="category-image-upload"
                          />
                          <label
                            htmlFor="category-image-upload"
                            className="inline-flex px-4 py-2 border rounded-xl font-bold text-xs cursor-pointer hover:bg-violet-600/10 hover:border-violet-500 hover:text-violet-400 transition"
                          >
                            Choose File
                          </label>
                          <p className={`text-[10px] ${textMutedClass} mt-1`}>Upload PNG, JPG or SVG</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleAddCategory}
                      className="w-full h-10 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md mt-6"
                    >
                      <Plus size={14} /> Add Category
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Categories List (Right 2 Cols) */}
              <div className="lg:col-span-2 space-y-6">
                <div className={`${mainCardClass} overflow-hidden`}>
                  <div className="p-6 border-b border-slate-800/20">
                    <h2 className={`text-base ${titleClass}`}>Active Categories</h2>
                    <p className={`text-xs ${textMutedClass} mt-0.5`}>Dynamic service categories rendered on the client application homepage</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className={`text-[10px] font-black uppercase tracking-wider ${
                          theme === "dark" ? "bg-slate-950/40 text-slate-400 border-b border-slate-800/60" : "bg-slate-100 text-slate-500 border-b border-slate-200"
                        }`}>
                          <th className="px-6 py-4 w-24 text-center">Icon</th>
                          <th className="px-6 py-4">Category Name</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${theme === "dark" ? "divide-slate-800/40" : "divide-slate-100"}`}>
                        {admCategories.map(c => (
                          <tr key={c.name} className={`transition group ${theme === "dark" ? "hover:bg-slate-900/30" : "hover:bg-slate-50"}`}>
                            <td className="px-6 py-4 text-center">
                              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-slate-950/20 border border-slate-800/40 mx-auto">
                                {c.image ? (
                                  <img src={c.image} alt={c.name} className="w-8 h-8 object-contain" />
                                ) : categoryIconMap[c.name] ? (
                                  <img src={categoryIconMap[c.name]} alt={c.name} className="w-8 h-8 object-contain" />
                                ) : (
                                  <span className="text-xl">{c.emoji || "📁"}</span>
                                )}
                              </div>
                            </td>
                            <td className={`px-6 py-4 text-xs font-bold ${theme === "dark" ? "text-slate-200" : "text-slate-850"}`}>
                              {c.name}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => handleDeleteCategory(c.name)}
                                className="h-8 w-8 rounded-lg bg-red-955/20 border border-red-900/40 hover:bg-red-900/20 text-red-400 flex items-center justify-center transition cursor-pointer ml-auto"
                                title={`Delete ${c.name} Category`}
                              >
                                <X size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === "content_manager" && (
            /* ==================== CONTENT MANAGER VIEW ==================== */
            <div className="space-y-8 animate-fadeIn">
              {/* Tab Switcher */}
              <div className={`${mainCardClass} p-4 flex gap-2 overflow-x-auto no-scrollbar`}>
                {[
                  { id: "faq", label: "Help & Support (FAQs)", icon: <Clock size={16} /> },
                  { id: "about", label: "About Page", icon: <Info size={16} /> },
                  { id: "terms", label: "Terms of Service", icon: <BookOpen size={16} /> },
                  { id: "privacy", label: "Privacy Policy", icon: <ShieldCheck size={16} /> }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveContentTab(tab.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold tracking-wide shrink-0 transition flex items-center gap-2 cursor-pointer ${
                      activeContentTab === tab.id
                        ? "bg-violet-600 text-white shadow-md shadow-violet-600/35"
                        : theme === "dark" ? "bg-slate-900 text-slate-400 hover:text-slate-200" : "bg-slate-100 text-slate-655 hover:bg-slate-200/80"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* 1. FAQ Editor */}
              {activeContentTab === "faq" && (
                <div className={`${mainCardClass} overflow-hidden`}>
                  <div className="p-6 border-b border-slate-800/20 flex justify-between items-center">
                    <div>
                      <h2 className={`text-base ${titleClass}`}>Frequently Asked Questions</h2>
                      <p className={`text-xs ${textMutedClass} mt-0.5`}>Manage general support Q&As shown on the user Help & Support page</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsAddingFaq(true);
                        setEditingFaqIndex(null);
                        setEditFaqQ("");
                        setEditFaqA("");
                        setEditFaqCat("Bookings");
                      }}
                      className="h-9 px-4 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md"
                    >
                      <Plus size={14} /> Add FAQ Item
                    </button>
                  </div>

                  {/* Add/Edit FAQ form */}
                  {(isAddingFaq || editingFaqIndex !== null) && (
                    <div className="p-6 border-b border-slate-800/40 bg-slate-950/20 space-y-4">
                      <h3 className={`text-xs font-black uppercase tracking-wider ${theme === "dark" ? "text-violet-400" : "text-violet-600"}`}>
                        {isAddingFaq ? "Create FAQ Item" : "Edit FAQ Item"}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Category</label>
                          <select
                            value={editFaqCat}
                            onChange={e => setEditFaqCat(e.target.value)}
                            className={`w-full h-11 border rounded-xl px-3.5 text-xs font-bold outline-none focus:border-violet-500 cursor-pointer ${
                              theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"
                            }`}
                          >
                            <option>Bookings</option>
                            <option>Safety</option>
                            <option>Payments</option>
                            <option>Cancellations</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Question</label>
                          <input
                            type="text"
                            value={editFaqQ}
                            onChange={e => setEditFaqQ(e.target.value)}
                            placeholder="Enter question"
                            className={`w-full h-11 border rounded-xl px-4 text-xs font-semibold outline-none focus:border-violet-500 transition-all ${
                              theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-855"
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Answer</label>
                        <textarea
                          value={editFaqA}
                          onChange={e => setEditFaqA(e.target.value)}
                          placeholder="Enter answer"
                          className={`w-full min-h-[80px] p-4 border rounded-xl text-xs font-semibold outline-none focus:border-violet-500 transition-all ${
                            theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-855"
                          }`}
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            if (isAddingFaq) handleAddFAQ();
                            else if (editingFaqIndex !== null) handleSaveFAQ(editingFaqIndex);
                          }}
                          className="h-10 px-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Check size={14} /> Save
                        </button>
                        <button
                          onClick={() => {
                            setIsAddingFaq(false);
                            setEditingFaqIndex(null);
                          }}
                          className={`h-10 px-4 border rounded-xl font-bold text-xs flex items-center justify-center transition cursor-pointer ${
                            theme === "dark" ? "bg-slate-905 border-slate-800 text-slate-400 hover:text-slate-200" : "bg-white border-slate-200 text-slate-655 hover:bg-slate-50"
                          }`}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* FAQ List */}
                  <div className="p-6 space-y-4">
                    {admFaqs.length === 0 ? (
                      <div className="text-center py-8 text-slate-500 text-xs">No FAQs found. Add some above.</div>
                    ) : (
                      <div className="space-y-3">
                        {admFaqs.map((faq, i) => (
                          <div key={i} className={`p-4 border rounded-xl flex items-start justify-between gap-4 ${
                            theme === "dark" ? "bg-slate-950/20 border-slate-800/80" : "bg-slate-50 border-slate-100"
                          }`}>
                            <div className="space-y-1.5">
                              <span className={`text-[8px] font-black tracking-wider px-2 py-0.5 rounded-md uppercase ${
                                faq.cat === 'Safety' ? 'bg-red-500/10 text-red-400 border border-red-900/20' :
                                faq.cat === 'Payments' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-900/20' :
                                faq.cat === 'Cancellations' ? 'bg-amber-500/10 text-amber-400 border border-amber-900/20' :
                                'bg-violet-500/10 text-violet-400 border border-violet-900/20'
                              }`}>
                                {faq.cat}
                              </span>
                              <h4 className={`text-xs font-black mt-1 ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>{faq.q}</h4>
                              <p className={`text-[11px] font-medium leading-relaxed ${textMutedClass}`}>{faq.a}</p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() => {
                                  setEditingFaqIndex(i);
                                  setIsAddingFaq(false);
                                  setEditFaqQ(faq.q);
                                  setEditFaqA(faq.a);
                                  setEditFaqCat(faq.cat);
                                }}
                                className="h-8 px-3 rounded-lg border border-slate-800 hover:bg-slate-800 text-[10px] font-bold text-slate-300 transition cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteFAQ(i)}
                                className="h-8 px-3 rounded-lg border border-red-900/40 hover:bg-red-955/20 text-[10px] font-bold text-red-400 transition cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 2. About Editor */}
              {activeContentTab === "about" && admAbout && (
                <div className={`${mainCardClass} p-6 space-y-6`}>
                  <div>
                    <h2 className={`text-base ${titleClass}`}>About Page Content</h2>
                    <p className={`text-xs ${textMutedClass} mt-0.5`}>Modify version build, brand intro description, footer info, and service pillars</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Version Header</label>
                      <input
                        type="text"
                        value={admAbout.version}
                        onChange={e => setAdmAbout({ ...admAbout, version: e.target.value })}
                        className={`w-full h-11 border rounded-xl px-4 text-xs font-semibold outline-none focus:border-violet-500 transition-all ${
                          theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-855"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Footer Copyright</label>
                      <textarea
                        value={admAbout.footer}
                        onChange={e => setAdmAbout({ ...admAbout, footer: e.target.value })}
                        rows={2}
                        className={`w-full p-3 border rounded-xl text-xs font-semibold outline-none focus:border-violet-500 transition-all ${
                          theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-855"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Main Brand Description</label>
                    <textarea
                      value={admAbout.description}
                      onChange={e => setAdmAbout({ ...admAbout, description: e.target.value })}
                      rows={3}
                      className={`w-full p-4 border rounded-xl text-xs font-semibold outline-none focus:border-violet-500 transition-all ${
                        theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-855"
                      }`}
                    />
                  </div>

                  {/* Pillars list */}
                  <div className="space-y-4 pt-2 border-t border-slate-800/40">
                    <h3 className={`text-xs font-black uppercase tracking-wider ${theme === "dark" ? "text-violet-400" : "text-violet-600"}`}>Service Pillars</h3>
                    <div className="space-y-4">
                      {admAbout.points.map((p, index) => (
                        <div key={index} className={`p-4 border rounded-xl space-y-3 ${
                          theme === "dark" ? "bg-slate-950/20 border-slate-800/80" : "bg-slate-50 border-slate-100"
                        }`}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Pillar Title</label>
                              <input
                                type="text"
                                value={p.title}
                                onChange={e => {
                                  const updatedPoints = [...admAbout.points];
                                  updatedPoints[index] = { ...p, title: e.target.value };
                                  setAdmAbout({ ...admAbout, points: updatedPoints });
                                }}
                                className={`w-full h-10 border rounded-lg px-3 text-xs font-semibold outline-none focus:border-violet-500 ${
                                  theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-855"
                                }`}
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Icon Type</label>
                              <select
                                value={p.iconName}
                                onChange={e => {
                                  const updatedPoints = [...admAbout.points];
                                  updatedPoints[index] = { ...p, iconName: e.target.value };
                                  setAdmAbout({ ...admAbout, points: updatedPoints });
                                }}
                                className={`w-full h-10 border rounded-lg px-3 text-xs font-semibold outline-none focus:border-violet-500 ${
                                  theme === "dark" ? "bg-slate-950 border-slate-300 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-705"
                                }`}
                              >
                                <option value="ShieldCheck">ShieldCheck (Security)</option>
                                <option value="Star">Star (Rating/Platonic)</option>
                                <option value="HelpCircle">HelpCircle (Support/Operations)</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Pillar Description</label>
                            <textarea
                              value={p.desc}
                              onChange={e => {
                                const updatedPoints = [...admAbout.points];
                                updatedPoints[index] = { ...p, desc: e.target.value };
                                setAdmAbout({ ...admAbout, points: updatedPoints });
                              }}
                              rows={2}
                              className={`w-full p-3 border rounded-lg text-xs font-semibold outline-none focus:border-violet-500 ${
                                theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-855"
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleSaveAbout}
                    className="h-10 px-6 bg-violet-600 hover:bg-violet-500 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md mt-4"
                  >
                    <Check size={14} /> Save About Page Changes
                  </button>
                </div>
              )}

              {/* 3. Terms Editor */}
              {activeContentTab === "terms" && admTerms && (
                <div className={`${mainCardClass} p-6 space-y-6`}>
                  <div>
                    <h2 className={`text-base ${titleClass}`}>Terms of Service</h2>
                    <p className={`text-xs ${textMutedClass} mt-0.5`}>Edit effective date, intro header message, and specific terms list</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Effective Date</label>
                      <input
                        type="text"
                        value={admTerms.effectiveDate}
                        onChange={e => setAdmTerms({ ...admTerms, effectiveDate: e.target.value })}
                        className={`w-full h-11 border rounded-xl px-4 text-xs font-semibold outline-none focus:border-violet-500 transition-all ${
                          theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-850"
                        }`}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Intro Description</label>
                      <input
                        type="text"
                        value={admTerms.headerDesc}
                        onChange={e => setAdmTerms({ ...admTerms, headerDesc: e.target.value })}
                        className={`w-full h-11 border rounded-xl px-4 text-xs font-semibold outline-none focus:border-violet-500 transition-all ${
                          theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-855"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Terms list */}
                  <div className="space-y-4 pt-2 border-t border-slate-800/40">
                    <div className="flex justify-between items-center">
                      <h3 className={`text-xs font-black uppercase tracking-wider ${theme === "dark" ? "text-violet-400" : "text-violet-600"}`}>Terms Paragraphs</h3>
                      <button
                        onClick={() => {
                          const updatedList = [...admTerms.termsList, { title: `${admTerms.termsList.length + 1}. Title`, desc: "" }];
                          setAdmTerms({ ...admTerms, termsList: updatedList });
                        }}
                        className="h-8 px-3 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-bold text-[10px] flex items-center gap-1 transition cursor-pointer"
                      >
                        <Plus size={12} /> Add Section
                      </button>
                    </div>
                    <div className="space-y-4">
                      {admTerms.termsList.map((t, index) => (
                        <div key={index} className={`p-4 border rounded-xl space-y-3 relative ${
                          theme === "dark" ? "bg-slate-955/20 border-slate-800/80" : "bg-slate-50 border-slate-100"
                        }`}>
                          <button
                            onClick={() => {
                              const updatedList = admTerms.termsList.filter((_, i) => i !== index);
                              setAdmTerms({ ...admTerms, termsList: updatedList });
                            }}
                            className="absolute top-4 right-4 text-red-400 hover:text-red-500 text-[10px] font-bold cursor-pointer"
                          >
                            Remove
                          </button>
                          <div className="w-[85%]">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Section Title</label>
                            <input
                              type="text"
                              value={t.title}
                              onChange={e => {
                                const updatedList = [...admTerms.termsList];
                                updatedList[index] = { ...t, title: e.target.value };
                                setAdmTerms({ ...admTerms, termsList: updatedList });
                              }}
                              className={`w-full h-10 border rounded-lg px-3 text-xs font-semibold outline-none focus:border-violet-500 ${
                                theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-855"
                              }`}
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Content / Description</label>
                            <textarea
                              value={t.desc}
                              onChange={e => {
                                const updatedList = [...admTerms.termsList];
                                updatedList[index] = { ...t, desc: e.target.value };
                                setAdmTerms({ ...admTerms, termsList: updatedList });
                              }}
                              rows={3}
                              className={`w-full p-3 border rounded-lg text-xs font-semibold outline-none focus:border-violet-500 ${
                                theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-855"
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleSaveTerms}
                    className="h-10 px-6 bg-violet-600 hover:bg-violet-500 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md mt-4"
                  >
                    <Check size={14} /> Save Terms of Service Changes
                  </button>
                </div>
              )}

              {/* 4. Privacy Editor */}
              {activeContentTab === "privacy" && admPrivacy && (
                <div className={`${mainCardClass} p-6 space-y-6`}>
                  <div>
                    <h2 className={`text-base ${titleClass}`}>Privacy Policy Content</h2>
                    <p className={`text-xs ${textMutedClass} mt-0.5`}>Edit effective date, intro header message, and specific privacy terms</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Effective Date</label>
                      <input
                        type="text"
                        value={admPrivacy.effectiveDate}
                        onChange={e => setAdmPrivacy({ ...admPrivacy, effectiveDate: e.target.value })}
                        className={`w-full h-11 border rounded-xl px-4 text-xs font-semibold outline-none focus:border-violet-500 transition-all ${
                          theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-850"
                        }`}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Intro Description</label>
                      <input
                        type="text"
                        value={admPrivacy.headerDesc}
                        onChange={e => setAdmPrivacy({ ...admPrivacy, headerDesc: e.target.value })}
                        className={`w-full h-11 border rounded-xl px-4 text-xs font-semibold outline-none focus:border-violet-500 transition-all ${
                          theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-855"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Privacy list */}
                  <div className="space-y-4 pt-2 border-t border-slate-800/40">
                    <div className="flex justify-between items-center">
                      <h3 className={`text-xs font-black uppercase tracking-wider ${theme === "dark" ? "text-violet-400" : "text-violet-600"}`}>Privacy Clauses</h3>
                      <button
                        onClick={() => {
                          const updatedList = [...admPrivacy.privacyList, { title: `${admPrivacy.privacyList.length + 1}. Clause`, desc: "" }];
                          setAdmPrivacy({ ...admPrivacy, privacyList: updatedList });
                        }}
                        className="h-8 px-3 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-bold text-[10px] flex items-center gap-1 transition cursor-pointer"
                      >
                        <Plus size={12} /> Add Section
                      </button>
                    </div>
                    <div className="space-y-4">
                      {admPrivacy.privacyList.map((p, index) => (
                        <div key={index} className={`p-4 border rounded-xl space-y-3 relative ${
                          theme === "dark" ? "bg-slate-955/20 border-slate-800/80" : "bg-slate-50 border-slate-100"
                        }`}>
                          <button
                            onClick={() => {
                              const updatedList = admPrivacy.privacyList.filter((_, i) => i !== index);
                              setAdmPrivacy({ ...admPrivacy, privacyList: updatedList });
                            }}
                            className="absolute top-4 right-4 text-red-400 hover:text-red-500 text-[10px] font-bold cursor-pointer"
                          >
                            Remove
                          </button>
                          <div className="w-[85%]">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Clause Title</label>
                            <input
                              type="text"
                              value={p.title}
                              onChange={e => {
                                const updatedList = [...admPrivacy.privacyList];
                                updatedList[index] = { ...p, title: e.target.value };
                                setAdmPrivacy({ ...admPrivacy, privacyList: updatedList });
                              }}
                              className={`w-full h-10 border rounded-lg px-3 text-xs font-semibold outline-none focus:border-violet-500 ${
                                theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-855"
                              }`}
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Content / Description</label>
                            <textarea
                              value={p.desc}
                              onChange={e => {
                                const updatedList = [...admPrivacy.privacyList];
                                updatedList[index] = { ...p, desc: e.target.value };
                                setAdmPrivacy({ ...admPrivacy, privacyList: updatedList });
                              }}
                              rows={3}
                              className={`w-full p-3 border rounded-lg text-xs font-semibold outline-none focus:border-violet-500 ${
                                theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-855"
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleSavePrivacy}
                    className="h-10 px-6 bg-violet-600 hover:bg-violet-500 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md mt-4"
                  >
                    <Check size={14} /> Save Privacy Policy Changes
                  </button>
                </div>
              )}
            </div>
          )}

          {currentView === "banner_management" && (
            /* ==================== BANNER MANAGEMENT VIEW ==================== */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">

              {/* ── LEFT: Upload Form ── */}
              <div className="lg:col-span-1 space-y-6">
                <div className={mainCardClass}>
                  <div className="p-6 border-b border-slate-800/20">
                    <h3 className={`text-sm ${titleClass}`}>Upload New Banner</h3>
                    <p className={`text-xs ${textMutedClass} mt-0.5`}>Add a promotional banner for the home screen carousel</p>
                  </div>
                  <div className="p-6 space-y-4">

                    {/* Image upload */}
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                        Banner Image *
                      </label>
                      <div
                        className={`relative w-full aspect-[2.8/1] rounded-xl border-2 border-dashed overflow-hidden flex items-center justify-center cursor-pointer transition-all ${
                          newBannerImage
                            ? "border-violet-500/40"
                            : theme === "dark"
                            ? "border-slate-800 hover:border-violet-600/40 bg-slate-950"
                            : "border-slate-200 hover:border-violet-400 bg-slate-50"
                        }`}
                        onClick={() => document.getElementById("banner-img-upload")?.click()}
                      >
                        {newBannerImage ? (
                          <>
                            <img src={newBannerImage} alt="Preview" className="w-full h-full object-fill" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white text-xs font-bold">Change Image</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-slate-500">
                            <Image size={28} />
                            <span className="text-[11px] font-semibold">Click to upload banner image</span>
                            <span className="text-[10px]">Recommended: 800×285 px (PNG / JPG)</span>
                          </div>
                        )}
                      </div>
                      <input
                        id="banner-img-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => setNewBannerImage(reader.result as string);
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>

                    <button
                      onClick={() => {
                        if (!newBannerImage) {
                          setNotification({ message: "Please upload a banner image", type: "error" });
                          return;
                        }
                        const newBanner: BannerItem = {
                          id: `bnr-${Date.now()}`,
                          title: `Banner ${admBanners.length + 1}`,
                          imageUrl: newBannerImage,
                          active: true,
                          createdAt: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
                        };
                        const updated = [...admBanners, newBanner];
                        setAdmBanners(updated);
                        saveBanners(updated);
                        setNewBannerImage(null);
                        const inp = document.getElementById("banner-img-upload") as HTMLInputElement;
                        if (inp) inp.value = "";
                        setNotification({ message: "Banner added successfully!", type: "success" });
                      }}
                      className="w-full h-10 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md mt-2"
                    >
                      <Plus size={14} /> Add Banner
                    </button>
                  </div>
                </div>

                {/* Stats card */}
                <div className={`${mainCardClass} p-5`}>
                  <h4 className={`text-xs font-black uppercase tracking-wider ${theme === "dark" ? "text-violet-400" : "text-violet-600"} mb-3`}>Banner Stats</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`p-3 rounded-xl ${theme === "dark" ? "bg-slate-950" : "bg-slate-50"} border ${theme === "dark" ? "border-slate-800/60" : "border-slate-100"}`}>
                      <p className={`text-[10px] font-bold ${textMutedClass} uppercase tracking-widest`}>Total</p>
                      <p className={`text-xl font-extrabold mt-1 ${titleClass}`}>{admBanners.length}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${theme === "dark" ? "bg-slate-950" : "bg-slate-50"} border ${theme === "dark" ? "border-slate-800/60" : "border-slate-100"}`}>
                      <p className={`text-[10px] font-bold ${textMutedClass} uppercase tracking-widest`}>Active</p>
                      <p className="text-xl font-extrabold mt-1 text-emerald-400">{admBanners.filter(b => b.active).length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── RIGHT: Banners List ── */}
              <div className="lg:col-span-2 space-y-4">
                <div className={`${mainCardClass} overflow-hidden`}>
                  <div className="p-6 border-b border-slate-800/20 flex items-center justify-between">
                    <div>
                      <h2 className={`text-base ${titleClass}`}>Active Banners</h2>
                      <p className={`text-xs ${textMutedClass} mt-0.5`}>Banners are shown in carousel order on the user home screen</p>
                    </div>
                    {admBanners.length > 0 && (
                      <span className="px-3 py-1 bg-violet-600/10 border border-violet-500/20 text-violet-400 text-[10px] font-black rounded-full uppercase tracking-wider">
                        {admBanners.filter(b => b.active).length} Visible
                      </span>
                    )}
                  </div>

                  {admBanners.length === 0 ? (
                    <div className="p-12 flex flex-col items-center gap-4 text-center">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${theme === "dark" ? "bg-slate-950" : "bg-slate-100"}`}>
                        <Image size={28} className="text-slate-500" />
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${titleClass}`}>No Banners Uploaded</p>
                        <p className={`text-xs ${textMutedClass} mt-1`}>Upload your first promotional banner using the form on the left</p>
                      </div>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-800/30">
                      {admBanners.map((banner, idx) => (
                        <div
                          key={banner.id}
                          className={`p-5 flex gap-4 items-start transition-colors ${
                            theme === "dark" ? "hover:bg-slate-900/30" : "hover:bg-slate-50/80"
                          } ${!banner.active ? "opacity-50" : ""}`}
                        >
                          {/* Banner Preview */}
                          <div className="w-36 shrink-0 aspect-[2.8/1] rounded-xl overflow-hidden border border-slate-800/40 bg-slate-950 shadow-sm">
                            <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-fill" />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-xs font-extrabold truncate ${titleClass}`}>{banner.title}</span>
                              {banner.active ? (
                                <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black rounded-full uppercase">Active</span>
                              ) : (
                                <span className="px-2 py-0.5 bg-slate-500/10 border border-slate-500/20 text-slate-400 text-[9px] font-black rounded-full uppercase">Hidden</span>
                              )}
                            </div>
                            {banner.subtitle && (
                              <p className={`text-[11px] font-medium ${textMutedClass} truncate`}>{banner.subtitle}</p>
                            )}
                            {banner.linkUrl && (
                              <p className="text-[10px] text-violet-400 font-semibold truncate">🔗 {banner.linkUrl}</p>
                            )}
                            <p className={`text-[10px] ${textMutedClass}`}>Added: {banner.createdAt} · Position #{idx + 1}</p>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-2 shrink-0">
                            {/* Toggle active */}
                            <button
                              title={banner.active ? "Hide Banner" : "Show Banner"}
                              onClick={() => {
                                const updated = admBanners.map((b, i) =>
                                  i === idx ? { ...b, active: !b.active } : b
                                );
                                setAdmBanners(updated);
                                saveBanners(updated);
                                setNotification({
                                  message: `Banner "${banner.title}" ${!banner.active ? "activated" : "hidden"}`,
                                  type: "success"
                                });
                              }}
                              className={`w-8 h-8 rounded-lg border flex items-center justify-center transition cursor-pointer ${
                                banner.active
                                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                                  : "bg-slate-900/30 border-slate-800 text-slate-500 hover:bg-slate-800/60"
                              }`}
                            >
                              {banner.active ? <ToggleRight size={15} /> : <ToggleLeft size={15} />}
                            </button>

                            {/* Move Up */}
                            {idx > 0 && (
                              <button
                                title="Move Up"
                                onClick={() => {
                                  const updated = [...admBanners];
                                  [updated[idx - 1], updated[idx]] = [updated[idx], updated[idx - 1]];
                                  setAdmBanners(updated);
                                  saveBanners(updated);
                                }}
                                className={`w-8 h-8 rounded-lg border flex items-center justify-center transition cursor-pointer text-[10px] font-black ${
                                  theme === "dark"
                                    ? "bg-slate-900/30 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-white"
                                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                                }`}
                              >
                                ↑
                              </button>
                            )}

                            {/* Move Down */}
                            {idx < admBanners.length - 1 && (
                              <button
                                title="Move Down"
                                onClick={() => {
                                  const updated = [...admBanners];
                                  [updated[idx + 1], updated[idx]] = [updated[idx], updated[idx + 1]];
                                  setAdmBanners(updated);
                                  saveBanners(updated);
                                }}
                                className={`w-8 h-8 rounded-lg border flex items-center justify-center transition cursor-pointer text-[10px] font-black ${
                                  theme === "dark"
                                    ? "bg-slate-900/30 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-white"
                                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                                }`}
                              >
                                ↓
                              </button>
                            )}

                            {/* Delete */}
                            <button
                              title="Delete Banner"
                              onClick={() => {
                                const updated = admBanners.filter((_, i) => i !== idx);
                                setAdmBanners(updated);
                                saveBanners(updated);
                                setNotification({ message: `Banner "${banner.title}" deleted`, type: "error" });
                              }}
                              className="w-8 h-8 rounded-lg bg-red-900/10 border border-red-900/30 hover:bg-red-900/20 text-red-400 flex items-center justify-center transition cursor-pointer"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info note */}
                <div className={`${mainCardClass} p-4 flex items-start gap-3`}>
                  <Info size={15} className="text-violet-400 shrink-0 mt-0.5" />
                  <p className={`text-[11px] ${textMutedClass} leading-relaxed`}>
                    <strong className={titleClass}>How it works:</strong> Banners uploaded here are immediately stored and shown in the user home screen carousel. Only <em>active</em> banners are displayed. If no banners are uploaded, the default static banners appear. Use the ↑↓ buttons to reorder.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentView === "offer_management" && (
            /* ==================== OFFER & DISCOUNT MANAGEMENT VIEW ==================== */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">

              {/* ── LEFT: Upload Form ── */}
              <div className="lg:col-span-1 space-y-6">
                <div className={mainCardClass}>
                  <div className="p-6 border-b border-slate-800/20">
                    <h3 className={`text-sm ${titleClass}`}>Upload Offer Card</h3>
                    <p className={`text-xs ${textMutedClass} mt-0.5`}>Add a promotional offer image shown in the Offers &amp; Discounts section</p>
                  </div>
                  <div className="p-6 space-y-4">
                    {/* Image upload */}
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                        Offer Image *
                      </label>
                      <div
                        className={`relative w-full aspect-[1.7/1] rounded-xl border-2 border-dashed overflow-hidden flex items-center justify-center cursor-pointer transition-all ${
                          newOfferImage
                            ? "border-amber-500/40"
                            : theme === "dark"
                            ? "border-slate-800 hover:border-amber-600/40 bg-slate-950"
                            : "border-slate-200 hover:border-amber-400 bg-slate-50"
                        }`}
                        onClick={() => document.getElementById("offer-img-upload")?.click()}
                      >
                        {newOfferImage ? (
                          <>
                            <img src={newOfferImage} alt="Preview" className="w-full h-full object-fill" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white text-xs font-bold">Change Image</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-slate-500">
                            <Tags size={26} />
                            <span className="text-[11px] font-semibold">Click to upload offer image</span>
                            <span className="text-[10px]">Recommended: 460×270 px (PNG / JPG)</span>
                          </div>
                        )}
                      </div>
                      <input
                        id="offer-img-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => setNewOfferImage(reader.result as string);
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>

                    <button
                      onClick={() => {
                        if (!newOfferImage) {
                          setNotification({ message: "Please upload an offer image", type: "error" });
                          return;
                        }
                        const newOffer: OfferItem = {
                          id: `offer-${Date.now()}`,
                          imageUrl: newOfferImage,
                          active: true,
                          createdAt: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
                        };
                        const updated = [...admOffers, newOffer];
                        setAdmOffers(updated);
                        saveOffers(updated);
                        setNewOfferImage(null);
                        const inp = document.getElementById("offer-img-upload") as HTMLInputElement;
                        if (inp) inp.value = "";
                        setNotification({ message: "Offer card added successfully!", type: "success" });
                      }}
                      className="w-full h-10 bg-amber-500 hover:bg-amber-400 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md mt-2"
                    >
                      <Plus size={14} /> Add Offer Card
                    </button>
                  </div>
                </div>

                {/* Stats card */}
                <div className={`${mainCardClass} p-5`}>
                  <h4 className={`text-xs font-black uppercase tracking-wider ${theme === "dark" ? "text-amber-400" : "text-amber-600"} mb-3`}>Offer Stats</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`p-3 rounded-xl ${theme === "dark" ? "bg-slate-950" : "bg-slate-50"} border ${theme === "dark" ? "border-slate-800/60" : "border-slate-100"}`}>
                      <p className={`text-[10px] font-bold ${textMutedClass} uppercase tracking-widest`}>Total</p>
                      <p className={`text-xl font-extrabold mt-1 ${titleClass}`}>{admOffers.length}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${theme === "dark" ? "bg-slate-950" : "bg-slate-50"} border ${theme === "dark" ? "border-slate-800/60" : "border-slate-100"}`}>
                      <p className={`text-[10px] font-bold ${textMutedClass} uppercase tracking-widest`}>Active</p>
                      <p className="text-xl font-extrabold mt-1 text-emerald-400">{admOffers.filter(o => o.active).length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── RIGHT: Offers List ── */}
              <div className="lg:col-span-2 space-y-4">
                <div className={`${mainCardClass} overflow-hidden`}>
                  <div className="p-6 border-b border-slate-800/20 flex items-center justify-between">
                    <div>
                      <h2 className={`text-base ${titleClass}`}>Offer & Discount Cards</h2>
                      <p className={`text-xs ${textMutedClass} mt-0.5`}>Cards shown in the "Offers &amp; Discounts" horizontal scroll on the home screen</p>
                    </div>
                    {admOffers.length > 0 && (
                      <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black rounded-full uppercase tracking-wider">
                        {admOffers.filter(o => o.active).length} Visible
                      </span>
                    )}
                  </div>

                  {admOffers.length === 0 ? (
                    <div className="p-12 flex flex-col items-center gap-4 text-center">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${theme === "dark" ? "bg-slate-950" : "bg-slate-100"}`}>
                        <Tags size={28} className="text-slate-500" />
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${titleClass}`}>No Offer Cards Uploaded</p>
                        <p className={`text-xs ${textMutedClass} mt-1`}>Upload your first offer image using the form on the left</p>
                      </div>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-800/30">
                      {admOffers.map((offer, idx) => (
                        <div
                          key={offer.id}
                          className={`p-5 flex gap-4 items-center transition-colors ${
                            theme === "dark" ? "hover:bg-slate-900/30" : "hover:bg-slate-50/80"
                          } ${!offer.active ? "opacity-50" : ""}`}
                        >
                          {/* Offer Preview */}
                          <div className="w-36 shrink-0 aspect-[1.7/1] rounded-xl overflow-hidden border border-slate-800/40 bg-slate-950 shadow-sm">
                            <img src={offer.imageUrl} alt={`Offer ${idx + 1}`} className="w-full h-full object-fill" />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0 space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-extrabold ${titleClass}`}>Offer Card #{idx + 1}</span>
                              {offer.active ? (
                                <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black rounded-full uppercase">Active</span>
                              ) : (
                                <span className="px-2 py-0.5 bg-slate-500/10 border border-slate-500/20 text-slate-400 text-[9px] font-black rounded-full uppercase">Hidden</span>
                              )}
                            </div>
                            <p className={`text-[10px] ${textMutedClass}`}>Added: {offer.createdAt} · Position #{idx + 1}</p>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-2 shrink-0">
                            {/* Toggle */}
                            <button
                              title={offer.active ? "Hide Offer" : "Show Offer"}
                              onClick={() => {
                                const updated = admOffers.map((o, i) =>
                                  i === idx ? { ...o, active: !o.active } : o
                                );
                                setAdmOffers(updated);
                                saveOffers(updated);
                                setNotification({
                                  message: `Offer #${idx + 1} ${!offer.active ? "activated" : "hidden"}`,
                                  type: "success"
                                });
                              }}
                              className={`w-8 h-8 rounded-lg border flex items-center justify-center transition cursor-pointer ${
                                offer.active
                                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                                  : "bg-slate-900/30 border-slate-800 text-slate-500 hover:bg-slate-800/60"
                              }`}
                            >
                              {offer.active ? <ToggleRight size={15} /> : <ToggleLeft size={15} />}
                            </button>

                            {/* Move Up */}
                            {idx > 0 && (
                              <button
                                title="Move Up"
                                onClick={() => {
                                  const updated = [...admOffers];
                                  [updated[idx - 1], updated[idx]] = [updated[idx], updated[idx - 1]];
                                  setAdmOffers(updated);
                                  saveOffers(updated);
                                }}
                                className={`w-8 h-8 rounded-lg border flex items-center justify-center transition cursor-pointer text-[10px] font-black ${
                                  theme === "dark"
                                    ? "bg-slate-900/30 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-white"
                                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                                }`}
                              >
                                ↑
                              </button>
                            )}

                            {/* Move Down */}
                            {idx < admOffers.length - 1 && (
                              <button
                                title="Move Down"
                                onClick={() => {
                                  const updated = [...admOffers];
                                  [updated[idx + 1], updated[idx]] = [updated[idx], updated[idx + 1]];
                                  setAdmOffers(updated);
                                  saveOffers(updated);
                                }}
                                className={`w-8 h-8 rounded-lg border flex items-center justify-center transition cursor-pointer text-[10px] font-black ${
                                  theme === "dark"
                                    ? "bg-slate-900/30 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-white"
                                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                                }`}
                              >
                                ↓
                              </button>
                            )}

                            {/* Delete */}
                            <button
                              title="Delete Offer"
                              onClick={() => {
                                const updated = admOffers.filter((_, i) => i !== idx);
                                setAdmOffers(updated);
                                saveOffers(updated);
                                setNotification({ message: `Offer card #${idx + 1} deleted`, type: "error" });
                              }}
                              className="w-8 h-8 rounded-lg bg-red-900/10 border border-red-900/30 hover:bg-red-900/20 text-red-400 flex items-center justify-center transition cursor-pointer"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info note */}
                <div className={`${mainCardClass} p-4 flex items-start gap-3`}>
                  <Info size={15} className="text-amber-400 shrink-0 mt-0.5" />
                  <p className={`text-[11px] ${textMutedClass} leading-relaxed`}>
                    <strong className={titleClass}>How it works:</strong> Offer images uploaded here replace the default static offer cards shown in the "Offers &amp; Discounts" section on the user home screen. Only <em>active</em> offers are displayed. If none are uploaded, the default images appear.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>


      {/* ==================== USER DETAIL MODAL ==================== */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-2xl bg-[#0F1424] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] text-slate-100">
            <header className="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white font-extrabold text-sm uppercase">
                  {selectedUser.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-200">{selectedUser.name}</h3>
                  <p className="text-[11px] text-slate-500 font-semibold">{selectedUser.id} · Prefers {selectedUser.prefCategory}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-100 cursor-pointer"
              >
                <X size={16} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Account Overview Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-950 border border-slate-900 rounded-xl p-3.5">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Joined Date</p>
                  <p className="text-xs font-bold text-slate-200 mt-1">{selectedUser.joined}</p>
                </div>
                <div className="bg-slate-950 border border-slate-900 rounded-xl p-3.5">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Wallet Cash</p>
                  <p className="text-xs font-bold text-violet-400 mt-1">{formatINR(selectedUser.wallet)}</p>
                </div>
                <div className="bg-slate-950 border border-slate-900 rounded-xl p-3.5">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Bookings</p>
                  <p className="text-xs font-bold text-slate-200 mt-1">{selectedUser.bookings} sessions</p>
                </div>
              </div>

              {/* Emergency Contacts Card */}
              <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-5 space-y-3">
                <h4 className="text-xs font-black text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  🚨 SOS & Emergency Contacts
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold">Contact Name</span>
                    <p className="text-xs font-extrabold text-slate-300 mt-1">{selectedUser.emergencyName}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold">Mobile Number</span>
                    <p className="text-xs font-extrabold text-slate-300 mt-1">{selectedUser.emergencyPhone}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold">Relationship</span>
                    <p className="text-xs font-extrabold text-slate-300 mt-1">{selectedUser.emergencyRelation}</p>
                  </div>
                </div>
              </div>

              {/* Booking History Table */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Service History Log</h4>
                <div className="border border-slate-900 rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-950 text-slate-500 text-[9px] font-bold uppercase tracking-wider border-b border-slate-900">
                        <th className="px-4 py-2.5">Provider</th>
                        <th className="px-4 py-2.5">Service Type</th>
                        <th className="px-4 py-2.5">Session Date</th>
                        <th className="px-4 py-2.5">Fare</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900 text-xs">
                      {selectedUser.bookingHistory.map(hist => (
                        <tr key={hist.id} className="hover:bg-slate-950/40 text-slate-300">
                          <td className="px-4 py-3 font-semibold">{hist.companionName}</td>
                          <td className="px-4 py-3 text-slate-400">{hist.serviceName}</td>
                          <td className="px-4 py-3 text-slate-400">{hist.date}</td>
                          <td className="px-4 py-3 font-bold text-violet-400">₹{hist.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== PROVIDER REGISTRATION REQUEST DETAIL MODAL ==================== */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-3xl bg-[#0F1424] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] text-slate-100">
            <header className="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/30">
              <div>
                <h3 className="font-extrabold text-base text-slate-200">Inspect Applicant: {selectedRequest.name}</h3>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">{selectedRequest.id} · Applying for {selectedRequest.category}</p>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-100 cursor-pointer"
              >
                <X size={16} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Side: Applicant Details */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">Applicant Profile</h4>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-3.5">
                    <ProfileField label="Phone" value={selectedRequest.phone} />
                    <ProfileField label="Email" value={selectedRequest.email} />
                    <ProfileField label="Base Rate" value={`${formatINR(selectedRequest.price)}/hr`} />
                    <ProfileField label="Experience" value={selectedRequest.experience} />
                    <ProfileField label="Service Location" value={selectedRequest.city} />
                    <div>
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Bio</span>
                      <p className="text-xs text-slate-300 font-medium mt-1 leading-relaxed">{selectedRequest.bio}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">Escrow Bank Details</h4>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-3">
                    <ProfileField label="Bank Name" value={selectedRequest.bankName} />
                    <ProfileField label="Account No" value={selectedRequest.bankAccount} />
                    <ProfileField label="IFSC Code" value={selectedRequest.bankIFSC} />
                  </div>
                </div>
              </div>

              {/* Right Side: Documents Viewer */}
              <div className="space-y-6 flex flex-col">
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">Onboarding Files</h4>
                  <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-900 mb-3">
                    <button
                      onClick={() => setSelectedDocType("aadhaar")}
                      className={`flex-1 py-2 text-center rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
                        selectedDocType === "aadhaar" ? "bg-slate-900 text-violet-400 border border-slate-800" : "text-slate-500"
                      }`}
                    >
                      Aadhaar / ID Card
                    </button>
                    <button
                      onClick={() => setSelectedDocType("selfie")}
                      className={`flex-1 py-2 text-center rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
                        selectedDocType === "selfie" ? "bg-slate-900 text-violet-400 border border-slate-800" : "text-slate-500"
                      }`}
                    >
                      Verification Selfie
                    </button>
                  </div>

                  {selectedDocType === "aadhaar" ? (
                    <div className="bg-slate-950 border border-slate-900 rounded-2xl p-4 flex flex-col items-center justify-center min-h-60 relative group overflow-hidden">
                      {/* Placeholder Card Front */}
                      <div className="w-64 h-36 bg-gradient-to-tr from-slate-900 to-indigo-950 border border-indigo-500/20 rx-xl rounded-xl p-4 flex flex-col justify-between shadow-lg relative z-10">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-black text-indigo-400 tracking-wider">GOVT OF INDIA</span>
                          <ShieldCheck size={20} className="text-indigo-400" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-slate-200">{selectedRequest.name}</p>
                          <p className="text-[8px] text-slate-500 font-medium">DOB: 15 Mar 1998 | Gender: Female</p>
                          <p className="text-xs font-bold text-slate-300 tracking-wider mt-2">XXXX-XXXX-4321</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 mt-4 flex items-center gap-1">
                        <CheckCircle2 size={12} /> Government ID verified automatically
                      </span>
                    </div>
                  ) : (
                    <div className="bg-slate-950 border border-slate-900 rounded-2xl p-4 flex flex-col items-center justify-center min-h-60">
                      {/* Selfie Mockup */}
                      <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-violet-50 to-indigo-100 p-1 shadow-xl">
                        <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center text-slate-500 overflow-hidden relative">
                          <Users size={40} className="text-violet-500/40 animate-pulse" />
                        </div>
                      </div>
                      <p className="text-[11px] font-bold text-slate-400 text-center mt-3 max-w-[200px]">
                        Selfie image match verification score: <span className="text-emerald-400 font-black">94.8% Match</span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex-1" />

                {/* Approve/Reject Controls inside Modal */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => approveRequest(selectedRequest)}
                    className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check size={16} strokeWidth={3} />
                    Approve Application
                  </button>
                  <button
                    onClick={() => rejectRequest(selectedRequest.id, selectedRequest.name)}
                    className="h-12 px-5 bg-red-950/20 border border-red-900/40 hover:bg-red-900/20 text-red-400 font-extrabold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <X size={16} />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Sidebar Navigation Link Component
function SidebarLink({
  label,
  icon,
  active,
  onClick,
  badge
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full h-11 px-4 rounded-xl text-xs font-bold flex items-center gap-3.5 transition cursor-pointer select-none ${
        active
          ? "bg-slate-800/50 text-white shadow-inner"
          : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
      }`}
    >
      <span className={active ? "text-violet-400" : "text-slate-450"}>{icon}</span>
      <span className="flex-1 text-left tracking-wide">{label}</span>
      {badge !== undefined && (
        <span className="px-2 py-0.5 text-[9px] font-black bg-violet-600 text-white rounded-md shadow-sm">
          {badge}
        </span>
      )}
    </button>
  );
}

// Reusable Metric Card
function MetricCard({
  title,
  value,
  sub,
  icon,
  theme
}: {
  title: string;
  value: string | number;
  sub: string;
  icon: React.ReactNode;
  theme: "dark" | "light";
}) {
  const cardBg = theme === "dark" ? "bg-[#0F1424] border-slate-800/80 text-slate-100 shadow-xl" : "bg-white border-slate-200/80 text-slate-850 shadow-sm";
  const mutedText = theme === "dark" ? "text-slate-400" : "text-slate-500";
  return (
    <div className={`border rounded-2xl p-5 relative overflow-hidden group font-sans transition-all duration-300 ${cardBg}`}>
      <div className="flex justify-between items-start">
        <div>
          <span className={`text-[10px] font-black uppercase tracking-wider ${mutedText}`}>{title}</span>
          <p className="text-2xl font-black tracking-tight mt-1.5 transition-colors group-hover:text-violet-500">
            {value}
          </p>
        </div>
        <div className={`w-10 h-10 border rounded-xl flex items-center justify-center ${
          theme === "dark" ? "bg-slate-950 border-slate-900" : "bg-slate-50 border-slate-200"
        }`}>
          {icon}
        </div>
      </div>
      <div className={`flex items-center justify-between mt-4.5 pt-3 border-t ${
        theme === "dark" ? "border-slate-900/40" : "border-slate-100"
      }`}>
        <span className={`text-[10.5px] font-semibold ${mutedText}`}>{sub}</span>
      </div>
    </div>
  );
}

// Reusable Profile Inspect Field
function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-slate-900/60 last:border-0">
      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{label}</span>
      <span className="text-xs text-slate-300 font-extrabold">{value}</span>
    </div>
  );
}
