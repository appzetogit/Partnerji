import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame, Avatar } from "@/components/Partnerji/Shell";
import { companions, Companion } from "@/lib/Partnerji-data";
import {
  SlidersHorizontal,
  Calendar,
  MapPin,
  Clock,
  Search,
  Star,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  ArrowRight,
  MessageSquare,
  HelpCircle,
  FileText,
  DollarSign,
  Undo2,
  Smile,
  ShieldCheck,
  Copy,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";

// Companion images imports
import pUntitled from "../assest/peopleimage/Untitled.jpg";
import pImages from "../assest/peopleimage/images.jpg";
import pImages1 from "../assest/peopleimage/images1.jpg";
import pImagesd from "../assest/peopleimage/imagesd.jpg";
import pImagesdd from "../assest/peopleimage/imagesdd.jpg";

const photoMap: Record<string, string> = {
  "images.jpg": pImages,
  "images1.jpg": pImages1,
  "imagesd.jpg": pImagesd,
  "imagesdd.jpg": pImagesdd,
  "Untitled.jpg": pUntitled,
};

export const Route = createFileRoute("/bookings")({ component: BookingsPage });

interface Booking {
  id: string;
  companionId: string;
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
  date: string;
  duration: string;
  location: string;
  price: number;
  paymentStatus: "Paid" | "Refunded" | "Pending";
  startTime?: Date;
  rating?: number;
  reviewText?: string;
}

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "B-90231",
    companionId: "anjali",
    status: "Upcoming",
    date: "Mon, 26 May · 10:00 AM",
    duration: "3 Hours",
    location: "Bhopal Railway Station, Platform 1",
    price: 1800,
    paymentStatus: "Paid",
  },
  {
    id: "B-88124",
    companionId: "priya",
    status: "Ongoing",
    date: "Today · Active",
    duration: "2 Hours",
    location: "DB City Mall, Zone-I, Bhopal",
    price: 900,
    paymentStatus: "Paid",
    startTime: new Date(Date.now() - 1 * 60 * 60 * 1000 - 24 * 60 * 1000), // 1h 24m ago
  },
  {
    id: "B-77218",
    companionId: "rahul",
    status: "Completed",
    date: "Sun, 18 May · 7:00 AM",
    duration: "1.5 Hours",
    location: "Gym Central, Arera Colony, Bhopal",
    price: 525,
    paymentStatus: "Paid",
  },
  {
    id: "B-66219",
    companionId: "rohan",
    status: "Cancelled",
    date: "Sat, 17 May · 4:00 PM",
    duration: "2 Hours",
    location: "Online Match Lobby (Discord)",
    price: 300,
    paymentStatus: "Refunded",
  },
];

const tabs = ["All", "Upcoming", "Ongoing", "Completed", "Cancelled"] as const;

function LiveTimer({ startTime }: { startTime?: Date }) {
  const [elapsed, setElapsed] = useState("01:24:00");

  useEffect(() => {
    if (!startTime) return;
    const updateTime = () => {
      const diffMs = Date.now() - startTime.getTime();
      const diffHrs = Math.floor(diffMs / (3600 * 1000));
      const diffMins = Math.floor((diffMs % (3600 * 1000)) / (60 * 1000));
      const diffSecs = Math.floor((diffMs % (60 * 1000)) / 1000);

      const hrsStr = String(diffHrs).padStart(2, "0");
      const minsStr = String(diffMins).padStart(2, "0");
      const secsStr = String(diffSecs).padStart(2, "0");
      setElapsed(`${hrsStr}:${minsStr}:${secsStr}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <span className="text-[11px] font-extrabold text-primary tabular-nums tracking-wider bg-primary-soft px-2 py-0.5 rounded-full">
      {elapsed} elapsed
    </span>
  );
}

function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [tab, setTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering & Sorting State
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc">("newest");
  const [genderFilter, setGenderFilter] = useState<"All" | "Male" | "Female">("All");

  // Interaction Modals State
  const [cancellingBooking, setCancellingBooking] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [ratingBooking, setRatingBooking] = useState<Booking | null>(null);
  const [tempRating, setTempRating] = useState(0);
  const [tempReview, setTempReview] = useState("");

  // Card Expansion State (for Accordion details)
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const t = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toastMessage]);

  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setToastMessage("Booking ID copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCancelConfirm = () => {
    if (!cancellingBooking) return;
    setBookings((prev) =>
      prev.map((b) =>
        b.id === cancellingBooking.id
          ? { ...b, status: "Cancelled", paymentStatus: "Refunded" }
          : b,
      ),
    );
    setToastMessage(
      `Booking with ${getCompanion(cancellingBooking.companionId).name} cancelled. Refund credited!`,
    );
    setCancellingBooking(null);
    setCancelReason("");
    setTab("Cancelled");
  };

  const handleRatingSubmit = () => {
    if (!ratingBooking) return;
    setBookings((prev) =>
      prev.map((b) =>
        b.id === ratingBooking.id ? { ...b, rating: tempRating, reviewText: tempReview } : b,
      ),
    );
    setToastMessage("Thank you for your feedback!");
    setRatingBooking(null);
    setTempRating(0);
    setTempReview("");
  };

  // Helper helper to resolve companion details
  const getCompanion = (id: string): Companion => {
    return companions.find((c) => c.id === id) || companions[0];
  };

  // Tab count calculation helper
  const getCount = (statusTab: string) => {
    if (statusTab === "All") return bookings.length;
    return bookings.filter((b) => b.status === statusTab).length;
  };

  // Filter & Sort logic
  const filteredBookings = bookings
    .filter((b) => {
      // Tab filter
      if (tab !== "All" && b.status !== tab) return false;

      const comp = getCompanion(b.companionId);

      // Search filter
      const matchesSearch =
        comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.category.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // Gender filter
      if (genderFilter !== "All" && comp.gender !== genderFilter) return false;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;

      // Default / Newest (we use booking order or ids as proxy)
      return b.id.localeCompare(a.id);
    });

  const toggleExpand = (id: string) => {
    setExpandedBookingId((prev) => (prev === id ? null : id));
  };

  return (
    <MobileFrame withNav>
      <div className="flex-1 overflow-y-auto no-scrollbar bg-[#FAF9FF] relative pb-10">
        {/* Header */}
        <header className="px-5 pt-6 pb-2 flex items-center justify-between sticky top-0 z-10 bg-[#FAF9FF]/95 backdrop-blur-md">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-1.5">
              My Bookings
              <Sparkles size={18} className="text-primary fill-primary/20 animate-pulse" />
            </h1>
          </div>
          <button
            onClick={() => setFilterOpen(true)}
            className="w-10 h-10 rounded-xl bg-white shadow-soft border border-border flex items-center justify-center text-foreground hover:scale-105 active:scale-95 transition-all relative"
          >
            <SlidersHorizontal size={18} />
            {(genderFilter !== "All" || sortBy !== "newest") && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
            )}
          </button>
        </header>

        {/* Search Bar */}
        <div className="px-5 py-2">
          <div className="relative flex items-center bg-white rounded-2xl shadow-soft border border-border px-3.5 py-2.5 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
            <Search size={16} className="text-muted-foreground mr-2.5 shrink-0" />
            <input
              type="text"
              placeholder="Search companion name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-medium text-foreground bg-transparent focus:outline-none placeholder-muted-foreground"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-1 rounded-full hover:bg-muted text-muted-foreground shrink-0"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Filters Pills Indicator */}
        {(genderFilter !== "All" || sortBy !== "newest") && (
          <div className="px-5 py-1.5 flex flex-wrap gap-2 animate-fade-in">
            {genderFilter !== "All" && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-primary-soft text-primary px-2.5 py-1 rounded-lg">
                Gender: {genderFilter}
                <button
                  onClick={() => setGenderFilter("All")}
                  className="hover:text-primary-dark ml-0.5"
                >
                  <X size={10} />
                </button>
              </span>
            )}
            {sortBy !== "newest" && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-primary-soft text-primary px-2.5 py-1 rounded-lg">
                Sort: {sortBy === "price-asc" ? "Price Low-High" : "Price High-Low"}
                <button
                  onClick={() => setSortBy("newest")}
                  className="hover:text-primary-dark ml-0.5"
                >
                  <X size={10} />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Tabs Menu */}
        <div className="px-5 mt-3 border-b border-border/80 sticky top-[68px] z-10 bg-[#FAF9FF]/95 backdrop-blur-md">
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {tabs.map((t) => {
              const active = tab === t;
              const count = getCount(t);
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="relative pb-3 shrink-0 flex items-center gap-1.5 group"
                >
                  <span
                    className={`text-[13px] font-bold transition-all ${
                      active
                        ? "text-primary scale-105"
                        : "text-muted-foreground/80 group-hover:text-foreground"
                    }`}
                  >
                    {t}
                  </span>

                  {/* Count Badge */}
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full transition-all ${
                      active ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>

                  {t === "Ongoing" && count > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping absolute -top-0.5 right-0" />
                  )}

                  {active && (
                    <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary rounded-full animate-slide-right" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bookings List */}
        <div className="px-5 py-4 flex flex-col gap-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((b) => {
              const comp = getCompanion(b.companionId);
              const isExpanded = expandedBookingId === b.id;

              // Photo Resolution or Initials Fallback
              const photoAsset = photoMap[comp.photo];

              return (
                <div
                  key={b.id}
                  className={`bg-white rounded-2xl shadow-soft border transition-all duration-300 ${
                    b.status === "Ongoing"
                      ? "border-emerald-400 ring-2 ring-emerald-500/10 shadow-glow relative overflow-hidden"
                      : "border-border hover:border-primary/30"
                  } slide-up`}
                >
                  {/* Ongoing Glow Top border strip */}
                  {b.status === "Ongoing" && (
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400 animate-pulse" />
                  )}

                  <div className="p-4 cursor-pointer" onClick={() => toggleExpand(b.id)}>
                    {/* Badge & Timing row */}
                    <div className="flex items-center justify-between mb-3.5">
                      {b.status === "Ongoing" ? (
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 bg-red-550/10 text-danger text-[9px] font-black px-2 py-0.5 rounded-full border border-red-100/50">
                            <span className="relative w-1.5 h-1.5 rounded-full bg-danger">
                              <span className="absolute inset-0 rounded-full bg-danger animate-ping opacity-75" />
                            </span>
                            LIVE
                          </span>
                          <LiveTimer startTime={b.startTime} />
                        </div>
                      ) : (
                        <span
                          className={`text-[9px] font-black px-2.5 py-0.5 rounded-full tracking-wide uppercase border ${
                            b.status === "Upcoming"
                              ? "bg-blue-50 text-blue-600 border-blue-100"
                              : b.status === "Completed"
                                ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                : "bg-red-550/10 text-danger border-red-100/50"
                          }`}
                        >
                          {b.status} {b.status === "Completed" && "✓"}
                        </span>
                      )}

                      <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground">
                        {b.id}
                      </div>
                    </div>

                    {/* Companion Info row */}
                    <div className="flex items-center gap-3.5">
                      {/* Photo Avatar */}
                      <div className="relative shrink-0">
                        {photoAsset ? (
                          <div
                            className={`w-14 h-14 rounded-2xl overflow-hidden shadow-soft border-2 ${
                              b.status === "Ongoing" ? "border-emerald-400" : "border-white"
                            }`}
                          >
                            <img
                              src={photoAsset}
                              alt={comp.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <Avatar
                            name={comp.name}
                            color={comp.color}
                            size={56}
                            ring={b.status === "Ongoing"}
                          />
                        )}
                        {comp.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                        )}
                      </div>

                      {/* Details text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-foreground truncate">
                            {comp.name}
                          </span>
                          {comp.verified && (
                            <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-blue-500 text-white text-[8px] font-bold">
                              ✓
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-primary font-bold bg-primary-soft inline-block px-2.5 py-0.5 rounded-lg mt-1">
                          {comp.category}
                        </div>

                        <div className="mt-2.5 space-y-1.5 text-[11px] text-muted-foreground font-medium">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={12} className="text-muted-foreground/80 shrink-0" />
                            <span className="truncate">{b.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock size={12} className="text-muted-foreground/80 shrink-0" />
                            <span>
                              {b.duration} ·{" "}
                              <strong className="text-foreground">
                                ₹{b.price.toLocaleString()}
                              </strong>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Star Rating on card if already rated */}
                    {b.status === "Completed" && b.rating && b.rating > 0 && (
                      <div className="mt-3.5 pt-3 border-t border-dashed border-border flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-bold text-muted-foreground">
                            Your Rating:
                          </span>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={`${i < (b.rating || 0) ? "text-amber-400 fill-amber-400" : "text-muted/40"}`}
                              />
                            ))}
                          </div>
                        </div>
                        {b.reviewText && (
                          <span className="text-[10px] italic text-muted-foreground truncate max-w-[200px]">
                            "{b.reviewText}"
                          </span>
                        )}
                      </div>
                    )}

                    {/* Show expand icon */}
                    <div className="mt-3.5 flex justify-center text-muted-foreground/50 border-t border-border/40 pt-2 hover:text-primary transition-colors">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* Accordion Detail Panel */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-border/60 bg-[#FAF9FF]/40 rounded-b-2xl animate-slide-down">
                      {/* Location details */}
                      <div className="mb-4">
                        <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
                          <MapPin size={10} /> Meeting Location
                        </div>
                        <div className="text-xs font-semibold text-foreground bg-white rounded-xl p-2.5 border border-border shadow-soft flex items-center justify-between">
                          <span className="truncate pr-2">{b.location}</span>
                          <button className="text-[10px] text-primary font-bold shrink-0 hover:underline">
                            Show Map
                          </button>
                        </div>
                      </div>

                      {/* Payment summary breakdown */}
                      <div className="mb-4 bg-white rounded-xl p-3 border border-border shadow-soft">
                        <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                          <FileText size={10} /> Payment Receipt
                        </div>
                        <div className="space-y-1.5 text-xs text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Base companion fare ({b.duration})</span>
                            <span className="font-semibold text-foreground">₹{b.price - 45}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Booking & Safety Fee</span>
                            <span className="font-semibold text-foreground">₹45</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Wallet Discount</span>
                            <span className="font-semibold text-success">-₹45</span>
                          </div>
                          <div className="flex justify-between pt-1.5 border-t border-border/80 font-bold text-foreground">
                            <span>Total paid</span>
                            <span className="text-primary">₹{b.price}</span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground pt-2 border-t border-border/40">
                          <span className="flex items-center gap-1">
                            Status:{" "}
                            <span
                              className={`font-bold uppercase ${b.paymentStatus === "Refunded" ? "text-danger" : "text-emerald-600"}`}
                            >
                              {b.paymentStatus}
                            </span>
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(b.id);
                            }}
                            className="flex items-center gap-1 font-bold text-primary hover:text-primary-dark"
                          >
                            {copiedId === b.id ? <Check size={11} /> : <Copy size={11} />}
                            {copiedId === b.id ? "Copied" : "Copy ID"}
                          </button>
                        </div>
                      </div>

                      {/* Rules / Cancellation guidelines */}
                      <div className="text-[10px] text-muted-foreground mb-4 bg-primary-soft/30 p-2.5 rounded-xl border border-primary/5 flex items-start gap-2">
                        <ShieldCheck size={14} className="text-primary shrink-0 mt-0.5" />
                        <div>
                          {b.status === "Upcoming" &&
                            "Free cancellation up to 2 hours before meeting time. Verify the code upon meeting your companion."}
                          {b.status === "Ongoing" &&
                            "Emergency button is active. Admin and local emergency support are alerted instantly if SOS is triggered."}
                          {b.status === "Completed" &&
                            "This companion session is fully audited & rated. Thank you for maintaining safe space norms!"}
                          {b.status === "Cancelled" &&
                            "This booking was cancelled. Refunding process has completed successfully. No cancellation charges applied."}
                        </div>
                      </div>

                      {/* Custom Action buttons inside card depending on status */}
                      <div className="flex gap-2.5">
                        {b.status === "Upcoming" && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setCancellingBooking(b);
                              }}
                              className="flex-1 h-10 rounded-xl border border-danger text-danger text-xs font-bold transition-all hover:bg-red-50 flex items-center justify-center gap-1.5"
                            >
                              Cancel Booking
                            </button>
                            <Link
                              to="/chat"
                              className="flex-1 h-10 rounded-xl grad-primary text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-soft hover:shadow-glow transition-all"
                            >
                              <MessageSquare size={13} /> Chat with Partner
                            </Link>
                          </>
                        )}
                        {b.status === "Ongoing" && (
                          <Link
                            to="/session"
                            className="w-full h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-soft hover:shadow-glow transition-all"
                          >
                            View Active Session <ArrowRight size={13} />
                          </Link>
                        )}
                        {b.status === "Completed" && (
                          <>
                            {!b.rating || b.rating === 0 ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setRatingBooking(b);
                                  setTempRating(0);
                                }}
                                className="flex-1 h-10 rounded-xl grad-primary text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:shadow-glow transition-all"
                              >
                                <Star size={13} /> Rate & Review
                              </button>
                            ) : (
                              <div className="flex-1 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-semibold flex items-center justify-center gap-1">
                                <Smile size={14} /> Review Submitted
                              </div>
                            )}
                            <Link
                              to="/companion/$id"
                              params={{ id: b.companionId }}
                              className="flex-1 h-10 rounded-xl border border-primary text-primary text-xs font-bold flex items-center justify-center hover:bg-primary-soft transition-all"
                            >
                              Book Again
                            </Link>
                          </>
                        )}
                        {b.status === "Cancelled" && (
                          <Link
                            to="/companion/$id"
                            params={{ id: b.companionId }}
                            className="w-full h-10 rounded-xl border border-primary text-primary text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-primary-soft transition-all"
                          >
                            <Undo2 size={13} /> Rebook Companion
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            /* Empty State */
            <div className="py-12 px-6 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-border shadow-soft slide-up">
              <div className="w-16 h-16 rounded-full bg-primary-soft flex items-center justify-center text-primary mb-4 animate-bounce">
                <HelpCircle size={28} />
              </div>
              <h3 className="font-bold text-sm text-foreground">No bookings found</h3>
              <p className="text-[11px] text-muted-foreground max-w-[200px] mt-1">
                We couldn't find any bookings matching this criteria. Try changing filters or search
                query!
              </p>
              <Link
                to="/explore"
                className="mt-5 h-9 px-4 rounded-xl grad-primary text-white text-xs font-bold flex items-center justify-center gap-1 shadow-soft"
              >
                Find Companion
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ----------------- BOTTOM FILTER SHEET ----------------- */}
      {filterOpen && (
        <div
          className="absolute inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setFilterOpen(false)}
        >
          <div
            className="w-full max-w-[420px] bg-white rounded-t-3xl shadow-glow p-5 flex flex-col gap-4 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="font-bold text-sm text-foreground">Sort & Filter</span>
              <button
                onClick={() => setFilterOpen(false)}
                className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
              >
                <X size={14} />
              </button>
            </div>

            {/* Sort Options */}
            <div>
              <span className="text-[11px] font-black text-muted-foreground uppercase tracking-wider block mb-2">
                Sort By
              </span>
              <div className="flex flex-col gap-2">
                {[
                  { value: "newest", label: "Newest Bookings First" },
                  { value: "price-asc", label: "Price: Low to High" },
                  { value: "price-desc", label: "Price: High to Low" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSortBy(opt.value as "newest" | "price-asc" | "price-desc")}
                    className={`flex items-center justify-between text-xs font-semibold p-3 rounded-xl border transition-all ${
                      sortBy === opt.value
                        ? "border-primary bg-primary-soft/40 text-primary"
                        : "border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {opt.label}
                    {sortBy === opt.value && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div>
              <span className="text-[11px] font-black text-muted-foreground uppercase tracking-wider block mb-2">
                Companion Gender
              </span>
              <div className="flex gap-2">
                {["All", "Male", "Female"].map((gender) => (
                  <button
                    key={gender}
                    onClick={() => setGenderFilter(gender as "All" | "Male" | "Female")}
                    className={`flex-1 text-xs font-semibold py-2.5 rounded-xl border transition-all ${
                      genderFilter === gender
                        ? "border-primary bg-primary-soft/40 text-primary"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset and Apply actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setSortBy("newest");
                  setGenderFilter("All");
                  setFilterOpen(false);
                }}
                className="flex-1 h-11 rounded-xl border border-border text-muted-foreground text-xs font-bold"
              >
                Reset
              </button>
              <button
                onClick={() => setFilterOpen(false)}
                className="flex-1 h-11 rounded-xl grad-primary text-white text-xs font-bold shadow-soft"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- CANCEL CONFIRMATION SHEET ----------------- */}
      {cancellingBooking && (
        <div
          className="absolute inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setCancellingBooking(null)}
        >
          <div
            className="w-full max-w-[420px] bg-white rounded-t-3xl shadow-glow p-5 flex flex-col gap-4 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-1.5 text-danger font-bold text-sm">
                <AlertTriangle size={16} /> Cancel Session?
              </div>
              <button
                onClick={() => setCancellingBooking(null)}
                className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
              >
                <X size={14} />
              </button>
            </div>

            {/* Warning Message */}
            <div className="text-xs text-muted-foreground leading-relaxed">
              Are you sure you want to cancel your session booking with{" "}
              <strong className="text-foreground">
                {getCompanion(cancellingBooking.companionId).name}
              </strong>{" "}
              scheduled for <strong className="text-foreground">{cancellingBooking.date}</strong>?
            </div>

            {/* Refund details card */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 text-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <DollarSign size={18} />
              </div>
              <div>
                <div className="font-bold text-emerald-800">100% Refund Assured</div>
                <div className="text-[10px] text-emerald-700/80 mt-0.5">
                  ₹{cancellingBooking.price} will be instantly credited to your Wallet.
                </div>
              </div>
            </div>

            {/* Reason Selection */}
            <div>
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-wider block mb-2">
                Reason for cancellation
              </span>
              <div className="flex flex-col gap-2">
                {[
                  "Change of plans / scheduling clash",
                  "Booked a wrong category companion",
                  "Companion requested to cancel",
                  "Other reason / personal issue",
                ].map((reason) => (
                  <button
                    key={reason}
                    onClick={() => setCancelReason(reason)}
                    className={`text-left text-[11px] font-semibold p-2.5 rounded-lg border transition-all ${
                      cancelReason === reason
                        ? "border-primary bg-primary-soft/40 text-primary"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setCancellingBooking(null)}
                className="flex-1 h-11 rounded-xl border border-border text-muted-foreground text-xs font-bold"
              >
                No, Keep Booking
              </button>
              <button
                onClick={handleCancelConfirm}
                disabled={!cancelReason}
                className={`flex-1 h-11 rounded-xl text-white text-xs font-bold shadow-soft transition-all ${
                  cancelReason
                    ? "bg-gradient-to-r from-red-500 to-rose-600 hover:shadow-glow"
                    : "bg-muted text-muted-foreground cursor-not-allowed border"
                }`}
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- RATING & REVIEW MODAL ----------------- */}
      {ratingBooking && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in px-4"
          onClick={() => setRatingBooking(null)}
        >
          <div
            className="w-full max-w-[360px] bg-white rounded-3xl shadow-glow p-5 flex flex-col items-center gap-4 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Companion Header */}
            <div className="w-full flex justify-end">
              <button
                onClick={() => setRatingBooking(null)}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80"
              >
                <X size={15} />
              </button>
            </div>

            {/* Companion details */}
            <div className="flex flex-col items-center text-center">
              {photoMap[getCompanion(ratingBooking.companionId).photo] ? (
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-soft border-2 border-white mb-2">
                  <img
                    src={photoMap[getCompanion(ratingBooking.companionId).photo]}
                    alt={getCompanion(ratingBooking.companionId).name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <Avatar
                  name={getCompanion(ratingBooking.companionId).name}
                  color={getCompanion(ratingBooking.companionId).color}
                  size={80}
                />
              )}
              <h3 className="font-bold text-base text-foreground mt-1">
                {getCompanion(ratingBooking.companionId).name}
              </h3>
              <p className="text-[11px] text-primary font-bold">
                {getCompanion(ratingBooking.companionId).category}
              </p>
            </div>

            {/* Stars Selector */}
            <div className="flex flex-col items-center gap-1.5 my-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                How was your session?
              </span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isActive = star <= tempRating;
                  return (
                    <button
                      key={star}
                      onClick={() => setTempRating(star)}
                      className="transition-transform duration-200 active:scale-125 hover:scale-110"
                    >
                      <Star
                        size={28}
                        className={`transition-colors duration-200 ${
                          isActive
                            ? "text-amber-400 fill-amber-400"
                            : "text-muted border-none fill-muted/30"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <span className="text-xs font-extrabold text-amber-500 h-4">
                {tempRating === 1 && "Poor 😞"}
                {tempRating === 2 && "Fair 😐"}
                {tempRating === 3 && "Good 🙂"}
                {tempRating === 4 && "Very Good 😀"}
                {tempRating === 5 && "Excellent! 😍"}
              </span>
            </div>

            {/* Feedback input */}
            <div className="w-full">
              <textarea
                placeholder="Share your experience (optional)..."
                value={tempReview}
                onChange={(e) => setTempReview(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl border border-border text-xs font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder-muted-foreground bg-muted/20"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleRatingSubmit}
              disabled={tempRating === 0}
              className={`w-full h-11 rounded-xl text-white text-xs font-bold shadow-soft transition-all ${
                tempRating > 0
                  ? "grad-primary hover:shadow-glow"
                  : "bg-muted text-muted-foreground cursor-not-allowed border"
              }`}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      )}

      {/* ----------------- TOAST NOTIFICATION ----------------- */}
      {toastMessage && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-foreground/90 backdrop-blur text-white text-[11px] font-bold px-4 py-2.5 rounded-full shadow-glow flex items-center gap-2 animate-fade-in">
          <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-white text-[9px]">
            ✓
          </div>
          {toastMessage}
        </div>
      )}
    </MobileFrame>
  );
}
export default BookingsPage;
