import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame, Avatar, OnlineDot, VerifiedBadge } from "@/components/Partnerji/Shell";
import { getCompanionsByCategory } from "@/lib/Partnerji-data";
import { homeServicesData, HOME_SERVICE_CATEGORIES, formatReviews, type HomeService } from "@/lib/services-data";
import {
  ArrowLeft,
  Search,
  List,
  LayoutGrid,
  Star,
  MapPin,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Languages,
  X,
  SlidersHorizontal,
  Check,
  Clock,
  ShoppingCart,
  Wrench
} from "lucide-react";
import { useState, useMemo } from "react";

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

// Category icon imports
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

const categoryMetaData: Record<string, { desc: string; emoji: string; themeClass: string; accentClass: string; iconBg: string }> = {
  AC: {
    desc: "Book verified technicians for AC service, repair, installation, and maintenance at your doorstep.",
    emoji: "❄️",
    themeClass: "from-sky-100 via-slate-50 to-cyan-100",
    accentClass: "text-sky-600 bg-sky-50 border-sky-200",
    iconBg: "bg-sky-500/10"
  },
  Car: {
    desc: "Find reliable car services — from wash and repairs to on-demand chauffeur and car rental options.",
    emoji: "🚗",
    themeClass: "from-blue-100 via-slate-50 to-indigo-100",
    accentClass: "text-blue-600 bg-blue-50 border-blue-200",
    iconBg: "bg-blue-500/10"
  },
  Decoration: {
    desc: "Get expert decorators for birthdays, weddings, parties, and all special occasions.",
    emoji: "🎀",
    themeClass: "from-fuchsia-100 via-slate-50 to-violet-100",
    accentClass: "text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200",
    iconBg: "bg-fuchsia-500/10"
  },
  Mixer: {
    desc: "Get your kitchen appliances — mixers, grinders, and blenders — serviced and repaired at home.",
    emoji: "🍹",
    themeClass: "from-amber-100 via-slate-50 to-orange-100",
    accentClass: "text-amber-600 bg-amber-50 border-amber-200",
    iconBg: "bg-amber-500/10"
  },
  TV: {
    desc: "Get your TV repaired, installed, or serviced by expert technicians at home.",
    emoji: "📺",
    themeClass: "from-rose-100 via-slate-50 to-red-100",
    accentClass: "text-rose-600 bg-rose-50 border-rose-200",
    iconBg: "bg-rose-500/10"
  },
  Fan: {
    desc: "Book certified technicians for ceiling fan, table fan installation, repair, and servicing.",
    emoji: "🌀",
    themeClass: "from-emerald-100 via-slate-50 to-teal-100",
    accentClass: "text-emerald-600 bg-emerald-50 border-emerald-200",
    iconBg: "bg-emerald-500/10"
  },
  WashingMachine: {
    desc: "Get washing machine installation, repair, and servicing done by verified experts.",
    emoji: "🫧",
    themeClass: "from-slate-200 via-slate-50 to-indigo-100",
    accentClass: "text-slate-800 bg-slate-100 border-slate-300",
    iconBg: "bg-slate-700/10"
  }
};

export const Route = createFileRoute("/category/$name")({
  component: CategoryDetailsPage
});

function CategoryDetailsPage() {
  const { name } = Route.useParams();

  // Route home service categories to a different UI
  if (HOME_SERVICE_CATEGORIES.includes(name)) {
    return <HomeServicesPage name={name} />;
  }

  const meta = categoryMetaData[name] || {
    desc: `Discover premium, verified companions specialized in ${name} services.`,
    emoji: "🌟",
    themeClass: "from-violet-100 via-slate-50 to-indigo-100",
    accentClass: "text-primary bg-primary/5 border-primary/10",
    iconBg: "bg-primary/10"
  };

  const rawProviders = useMemo(() => getCompanionsByCategory(name), [name]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState<"Male" | "Female" | "Any">("Any");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [view, setView] = useState<"list" | "grid">("list");

  // Filter drawer states
  const [showFilters, setShowFilters] = useState(false);
  const [tempGender, setTempGender] = useState<"Male" | "Female" | "Any">("Any");
  const [tempOnlineOnly, setTempOnlineOnly] = useState(false);
  const [tempMinRating, setTempMinRating] = useState(0);
  const [tempMaxPrice, setTempMaxPrice] = useState(1000);

  const applyFilters = () => {
    setSelectedGender(tempGender);
    setOnlineOnly(tempOnlineOnly);
    setMinRating(tempMinRating);
    setMaxPrice(tempMaxPrice);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setTempGender("Any");
    setTempOnlineOnly(false);
    setTempMinRating(0);
    setTempMaxPrice(1000);
  };

  const filteredProviders = useMemo(() => {
    return rawProviders.filter(v => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = v.name.toLowerCase().includes(q);
        const matchesBio = v.bio.toLowerCase().includes(q);
        const matchesLang = v.languages.some(l => l.toLowerCase().includes(q));
        if (!matchesName && !matchesBio && !matchesLang) return false;
      }
      if (selectedGender !== "Any" && v.gender !== selectedGender) return false;
      if (onlineOnly && !v.online) return false;
      if (minRating > 0 && v.rating < minRating) return false;
      if (v.price > maxPrice) return false;
      return true;
    });
  }, [rawProviders, searchQuery, selectedGender, onlineOnly, minRating, maxPrice]);

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedGender("Any");
    setOnlineOnly(false);
    setMinRating(0);
    setMaxPrice(1000);

    setTempGender("Any");
    setTempOnlineOnly(false);
    setTempMinRating(0);
    setTempMaxPrice(1000);
  };

  return (
    <MobileFrame withNav className={`bg-gradient-to-br ${meta.themeClass}`}>
      <div className="flex-1 overflow-y-auto no-scrollbar relative bg-slate-50/20 pb-20">

        {/* Sleek sticky header */}
        <header className="px-4 pt-5 pb-3 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <Link
              to="/home"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-all active:scale-95"
            >
              <ArrowLeft size={16} />
            </Link>
            <h1 className="text-sm font-extrabold text-slate-800 tracking-tight">
              {name} Partners
            </h1>
          </div>
        </header>

        {/* Search & Filter Row */}
        <div className="px-4 pt-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                placeholder={`Search ${name} experts...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-8 pr-8 rounded-xl border border-slate-200 bg-white shadow-soft focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 text-xs font-semibold placeholder-slate-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center"
                >
                  <X size={10} className="text-slate-600" />
                </button>
              )}
            </div>

            <button
              onClick={() => {
                setTempGender(selectedGender);
                setTempOnlineOnly(onlineOnly);
                setTempMinRating(minRating);
                setTempMaxPrice(maxPrice);
                setShowFilters(true);
              }}
              className={`h-9 px-3 rounded-xl border flex items-center gap-1.5 text-xs font-extrabold transition-all active:scale-95 shrink-0 shadow-soft ${selectedGender !== "Any" || onlineOnly || minRating > 0 || maxPrice < 1000
                  ? "bg-primary/10 text-primary border-primary"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
            >
              <SlidersHorizontal size={13} />
              <span>Filters</span>
              {(selectedGender !== "Any" || onlineOnly || minRating > 0 || maxPrice < 1000) && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </button>
          </div>

          {/* Active Filter Badges */}
          {(selectedGender !== "Any" || onlineOnly || minRating > 0 || maxPrice < 1000) && (
            <div className="flex flex-wrap gap-1.5 items-center p-1.5 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-xl animate-fadeIn">
              <span className="text-[9px] text-slate-400 font-extrabold uppercase pl-1">Applied:</span>
              {selectedGender !== "Any" && (
                <span className="text-[9px] font-bold bg-white text-primary border border-primary/10 px-2 py-0.5 rounded-md">{selectedGender}</span>
              )}
              {onlineOnly && (
                <span className="text-[9px] font-bold bg-white text-primary border border-primary/10 px-2 py-0.5 rounded-md">Online</span>
              )}
              {minRating > 0 && (
                <span className="text-[9px] font-bold bg-white text-primary border border-primary/10 px-2 py-0.5 rounded-md">★ {minRating}+</span>
              )}
              {maxPrice < 1000 && (
                <span className="text-[9px] font-bold bg-white text-primary border border-primary/10 px-2 py-0.5 rounded-md">≤ ₹{maxPrice}/hr</span>
              )}
              <button
                onClick={resetAllFilters}
                className="text-[9px] font-black text-primary hover:underline ml-auto pr-1"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="px-4 pt-4 space-y-4">
          {/* Providers count & layout selector */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-bold">
              Showing {filteredProviders.length} of {rawProviders.length} providers
            </span>
            <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-200/50">
              <button
                onClick={() => setView("list")}
                className={`w-7 h-7 rounded flex items-center justify-center transition-all ${view === "list" ? "bg-white shadow-soft text-primary" : "text-slate-400 hover:text-slate-600"
                  }`}
              >
                <List size={13} />
              </button>
              <button
                onClick={() => setView("grid")}
                className={`w-7 h-7 rounded flex items-center justify-center transition-all ${view === "grid" ? "bg-white shadow-soft text-primary" : "text-slate-400 hover:text-slate-600"
                  }`}
              >
                <LayoutGrid size={13} />
              </button>
            </div>
          </div>

          {/* Providers List / Grid container */}
          {filteredProviders.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center space-y-2 shadow-soft">
              <div className="text-3xl">🔍</div>
              <h3 className="font-extrabold text-xs text-slate-700">No matching partners found</h3>
              <p className="text-[10px] text-slate-400 font-medium">Try resetting your filters or clearing search text.</p>
              <button
                onClick={resetAllFilters}
                className="h-8 px-4 rounded-xl bg-primary text-white text-[10px] font-bold shadow-soft transition-all active:scale-95 mt-1"
              >
                Reset Filters
              </button>
            </div>
          ) : view === "list" ? (
            <div className="flex flex-col gap-3">
              {filteredProviders.map((v) => {
                const img = photoMap[v.photo];
                return (
                  <div
                    key={v.id}
                    className="flex flex-col bg-white border border-slate-100 rounded-2xl p-3 shadow-soft hover:shadow-md transition-all relative overflow-hidden"
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar with Status badge */}
                      <div className="relative shrink-0">
                        {img ? (
                          <img
                            src={img}
                            alt={v.name}
                            className="w-12 h-12 rounded-full object-cover border border-slate-100 shadow-sm"
                          />
                        ) : (
                          <Avatar name={v.name} color={v.color} size={48} />
                        )}
                        {v.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                        )}
                      </div>

                      {/* Details block */}
                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center gap-1">
                          <h3 className="font-extrabold text-xs text-slate-800 tracking-tight leading-none">
                            {v.name}
                          </h3>
                          {v.verified && <VerifiedBadge />}
                        </div>

                        <span className="inline-block text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">
                          {v.category}
                        </span>

                        <div className="flex items-center gap-1.5 pt-0.5 text-[9px] text-slate-500 font-medium">
                          <span className="flex items-center text-amber-500 font-bold shrink-0">
                            <Star size={10} className="fill-amber-400 text-amber-500 mr-0.5" />
                            {v.rating.toFixed(1)}
                          </span>
                          <span>•</span>
                          <span className="shrink-0">{v.reviews} reviews</span>
                          <span>•</span>
                          <span className="flex items-center text-primary font-bold shrink-0">
                            <MapPin size={9} className="mr-0.5" /> {v.distance}
                          </span>
                        </div>

                        {/* Languages & Experience */}
                        <div className="flex items-center gap-1.5 text-[8px] text-slate-400 font-bold pt-1">
                          <Languages size={9} className="text-slate-400" />
                          <span>{v.languages.join(" • ")}</span>
                          <span>•</span>
                          <span className="text-emerald-700 bg-emerald-50/70 px-1 py-0.2 rounded font-black">{v.experience} exp</span>
                        </div>
                      </div>

                      {/* Pricing block */}
                      <div className="text-right shrink-0">
                        <span className="block text-xs font-black text-slate-800">
                          ₹{v.price}
                        </span>
                        <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">
                          per hour
                        </span>
                      </div>
                    </div>

                    {/* Bio excerpt */}
                    <p className="text-[10px] text-slate-500 mt-2 leading-relaxed bg-slate-50/50 p-2 rounded-lg border border-slate-100/50">
                      {v.bio}
                    </p>

                    {/* Footer Actions */}
                    <div className="flex items-center gap-2 border-t border-slate-100 pt-2.5 mt-2.5">
                      <Link
                        to="/companion/$id"
                        params={{ id: v.id }}
                        className="flex-1 h-7 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800 text-[10px] font-extrabold flex items-center justify-center transition-all active:scale-95"
                      >
                        View Profile
                      </Link>

                      <Link
                        to="/book/$id"
                        params={{ id: v.id }}
                        className="flex-1 h-7 rounded-lg bg-primary hover:bg-primary/95 text-white text-[10px] font-black flex items-center justify-center transition-all active:scale-95 shadow-soft border border-primary/20"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Grid View */
            <div className="grid grid-cols-2 gap-3">
              {filteredProviders.map((v) => {
                const img = photoMap[v.photo];
                return (
                  <div
                    key={v.id}
                    className="flex flex-col bg-white border border-slate-100 rounded-2xl p-2.5 shadow-soft hover:shadow-md transition-all relative overflow-hidden"
                  >
                    {/* Top Image block */}
                    <div className="relative w-full h-24 rounded-xl overflow-hidden bg-slate-50/50 mb-2 border border-slate-100/30">
                      {img ? (
                        <img
                          src={img}
                          alt={v.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-400 to-purple-600 text-white font-extrabold text-lg">
                          {v.name.charAt(0)}
                        </div>
                      )}

                      {/* Top Overlay Badge for Online */}
                      {v.online && (
                        <span className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white shadow-soft" />
                      )}

                      {/* Top Overlay Badge for Rating */}
                      <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[8px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Star size={8} className="fill-amber-400 text-amber-400" />
                        {v.rating.toFixed(1)}
                      </span>
                    </div>

                    {/* Details block */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-0.5 justify-between">
                          <h3 className="font-extrabold text-[11px] text-slate-800 truncate max-w-[110px]">
                            {v.name}
                          </h3>
                          {v.verified && <VerifiedBadge />}
                        </div>
                        <span className="block text-[8px] font-bold text-slate-400 truncate uppercase mt-0.5">
                          {v.category}
                        </span>

                        <div className="flex items-center justify-between mt-1 text-[9px] font-extrabold text-slate-800">
                          <span>₹{v.price}/hr</span>
                          <span className="text-slate-400 font-bold text-[8px] flex items-center">
                            <MapPin size={8} className="mr-0.5 text-primary" /> {v.distance}
                          </span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Link
                        to="/companion/$id"
                        params={{ id: v.id }}
                        className="h-7 w-full rounded-lg bg-primary/5 hover:bg-primary/10 text-primary text-[9px] font-extrabold flex items-center justify-center transition-all active:scale-95 mt-2 border border-primary/10"
                      >
                        View Profile <ChevronRight size={10} className="ml-0.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Dynamic Filters Sheet (Drawer) */}
        {showFilters && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
              onClick={() => setShowFilters(false)}
            />
            {/* Drawer Sheet */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white rounded-t-3xl z-50 p-6 animate-slideUp max-h-[85vh] overflow-y-auto no-scrollbar overflow-x-hidden shadow-2xl border-t border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-5" />

                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-extrabold text-base text-slate-800">Filters</h3>
                  <button
                    onClick={resetFilters}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Reset all
                  </button>
                </div>

                <div className="space-y-5">

                  {/* Gender Filter */}
                  <FilterSection title="Gender">
                    <div className="flex gap-2">
                      {(["Any", "Male", "Female"] as const).map(g => (
                        <button
                          key={g}
                          onClick={() => setTempGender(g)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${tempGender === g
                              ? "bg-primary text-white border-primary shadow shadow-primary/20"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                            }`}
                        >
                          {g === "Any" ? "All Genders" : g}
                        </button>
                      ))}
                    </div>
                  </FilterSection>

                  {/* Online Status Toggle */}
                  <FilterSection title="Live Status">
                    <button
                      onClick={() => setTempOnlineOnly(!tempOnlineOnly)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border flex items-center gap-1.5 ${tempOnlineOnly
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300 shadow shadow-emerald-500/10"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Show Online Only
                    </button>
                  </FilterSection>

                  {/* Max Price Range Slider */}
                  <FilterSection title="Price Limit">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                      <span>Min: ₹200/hr</span>
                      <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                        Max: ₹{tempMaxPrice}/hr
                      </span>
                    </div>
                    <div className="py-2">
                      <input
                        type="range"
                        min={200}
                        max={1000}
                        step={50}
                        value={tempMaxPrice}
                        onChange={(e) => setTempMaxPrice(Number(e.target.value))}
                        className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-1">
                        <span>₹200</span>
                        <span>₹400</span>
                        <span>₹600</span>
                        <span>₹800</span>
                        <span>₹1000</span>
                      </div>
                    </div>
                  </FilterSection>

                  {/* Minimum Rating Filter */}
                  <FilterSection title="Minimum Rating">
                    <div className="flex gap-2">
                      {([0, 4.5, 4.7, 4.8] as const).map(r => (
                        <button
                          key={r}
                          onClick={() => setTempMinRating(r)}
                          className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all border flex items-center gap-1 ${tempMinRating === r
                              ? "bg-amber-50 text-amber-700 border-amber-300 shadow shadow-amber-500/10"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                            }`}
                        >
                          {r > 0 && <Star size={9} className="fill-amber-400 text-amber-400" />}
                          <span>{r === 0 ? "Any" : `${r}+`}</span>
                        </button>
                      ))}
                    </div>
                  </FilterSection>

                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 h-11 text-xs font-bold text-slate-500 hover:bg-slate-50 border border-slate-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={applyFilters}
                  className="flex-[2] h-11 bg-primary text-white rounded-xl font-bold text-xs shadow-md shadow-primary/20 active:scale-[0.98] transition-all"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </MobileFrame>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider">{title}</div>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// HomeServicesPage — Urban Company style service listing
// ─────────────────────────────────────────────────────────────────

const categoryDisplayName: Record<string, string> = {
  AC: "AC Services",
  Car: "Car Services",
  TV: "TV Repair",
  Fan: "Fan Services",
  Mixer: "Mixer Repair",
  WashingMachine: "Washing Machine",
  Decoration: "Decoration",
};

const categoryEmoji: Record<string, string> = {
  AC: "❄️", Car: "🚗", TV: "📺", Fan: "🌀",
  Mixer: "🍹", WashingMachine: "🫧", Decoration: "🎀",
};

const categoryTheme: Record<string, { gradient: string; accent: string; accentText: string }> = {
  AC: { gradient: "from-sky-50 to-cyan-50", accent: "bg-sky-600", accentText: "text-sky-600" },
  Car: { gradient: "from-blue-50 to-indigo-50", accent: "bg-blue-600", accentText: "text-blue-600" },
  TV: { gradient: "from-rose-50 to-red-50", accent: "bg-rose-600", accentText: "text-rose-600" },
  Fan: { gradient: "from-emerald-50 to-teal-50", accent: "bg-emerald-600", accentText: "text-emerald-600" },
  Mixer: { gradient: "from-amber-50 to-orange-50", accent: "bg-amber-600", accentText: "text-amber-600" },
  WashingMachine: { gradient: "from-indigo-50 to-slate-100", accent: "bg-indigo-600", accentText: "text-indigo-600" },
  Decoration: { gradient: "from-fuchsia-50 to-violet-50", accent: "bg-fuchsia-600", accentText: "text-fuchsia-600" },
};

function HomeServicesPage({ name }: { name: string }) {
  const services = homeServicesData[name] ?? [];
  const displayName = categoryDisplayName[name] ?? name;
  const emoji = categoryEmoji[name] ?? "🔧";

  const [bookedService, setBookedService] = useState<HomeService | null>(null);
  const [booked, setBooked] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBook = (service: HomeService) => {
    setBookedService(service);
  };

  const confirmBooking = () => {
    if (bookedService) {
      setBooked(prev => new Set([...prev, bookedService.id]));
      setBookedService(null);
    }
  };

  return (
    <MobileFrame withNav className="bg-white">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-20 bg-white">

        {/* Sticky header */}
        <header className="px-4 pt-5 pb-3 flex items-center gap-3 bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100/80 shadow-sm">
          <Link
            to="/home"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-all active:scale-95 shrink-0"
          >
            <ArrowLeft size={16} />
          </Link>
          <div className="flex items-center gap-2 flex-1">
            <h1 className="text-sm font-extrabold text-slate-800 tracking-tight leading-tight">{displayName}</h1>
          </div>
        </header>

        {/* Search */}
        <div className="px-4 pt-4 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder={`Search ${displayName.toLowerCase()}...`}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-8 pr-4 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-xs font-semibold placeholder-slate-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center"
              >
                <X size={10} className="text-slate-600" />
              </button>
            )}
          </div>
        </div>

        {/* Service Cards */}
        <div className="px-4 bg-white divide-y divide-slate-100">
          {filteredServices.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center space-y-2 shadow-sm">
              <div className="text-3xl">🔍</div>
              <p className="text-xs font-bold text-slate-500">No services found</p>
              <button onClick={() => setSearchQuery("")} className="text-[10px] text-primary font-bold underline">Clear search</button>
            </div>
          ) : (
            filteredServices.map(service => {
              const isBooked = booked.has(service.id);
              return (
                <div
                  key={service.id}
                  className="py-5 flex gap-4 justify-between items-start bg-white"
                >
                  {/* Left Side: Service Details */}
                  {/* Left Side: Service Details (Link to details page) */}
                  <Link
                    to="/companion/$id"
                    params={{ id: service.id }}
                    className="flex-1 space-y-1 text-left block cursor-pointer group"
                  >
                    {/* Title */}
                    <h3 className="font-extrabold text-sm text-slate-800 leading-tight group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
                      <span>₹{service.price.toLocaleString()}</span>
                      {service.originalPrice && (
                        <span className="text-[10px] text-slate-400 line-through font-medium">
                          ₹{service.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-[10px] text-slate-500 leading-relaxed max-w-[240px] line-clamp-2">
                      {service.description}
                    </p>
                  </Link>

                  {/* Right Side: Image and Book Button */}
                  <div className="relative flex flex-col items-center shrink-0 w-24">
                    {/* Image Container (Link to details page) */}
                    <Link
                      to="/companion/$id"
                      params={{ id: service.id }}
                      className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-100/50 block cursor-pointer"
                    >
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                          {emoji}
                        </div>
                      )}

                      {/* Top-right green rating overlay badge */}
                      <span className="absolute top-0 right-0 bg-emerald-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-bl-lg flex items-center gap-0.5 shadow-sm">
                        <Star size={8} className="fill-white text-white" />
                        {service.rating.toFixed(1)}
                      </span>
                    </Link>

                    {/* Book Button (Overlapping at the bottom) */}
                    <Link
                      to="/book/$id"
                      params={{ id: service.id }}
                      className={`absolute -bottom-3 h-7 px-5 rounded-lg font-black text-[11px] shadow-md transition-all active:scale-95 border flex items-center justify-center ${
                        isBooked
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 cursor-default"
                          : "bg-white text-primary border-slate-200 hover:border-primary hover:bg-slate-50"
                      }`}
                    >
                      {isBooked ? "Booked" : "Book"}
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </MobileFrame>
  );
}
