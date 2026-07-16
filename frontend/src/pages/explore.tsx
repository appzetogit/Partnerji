import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame, Avatar, OnlineDot, VerifiedBadge } from "@/components/Partnerji/Shell";
import { companions, categories } from "@/lib/Partnerji-data";
import {
  X,
  Plus,
  Star,
  MapPin,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
  Check,
  Award,
  BookOpen
} from "lucide-react";
import { useState } from "react";

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

export const Route = createFileRoute("/explore")({ component: ExplorePage });

function ExplorePage() {
  const [view, setView] = useState<"list" | "grid">("list");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Applied filter states
  const [selectedGender, setSelectedGender] = useState<"Male" | "Female" | "Any">("Any");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlineOnly, setOnlineOnly] = useState<boolean>(false);

  // Temporary drawer states
  const [tempGender, setTempGender] = useState<"Male" | "Female" | "Any">("Any");
  const [tempCategories, setTempCategories] = useState<string[]>([]);
  const [tempMaxPrice, setTempMaxPrice] = useState<number>(1000);
  const [tempMinRating, setTempMinRating] = useState<number>(0);
  const [tempOnlineOnly, setTempOnlineOnly] = useState<boolean>(false);

  const openFilterDrawer = () => {
    setTempGender(selectedGender);
    setTempCategories(selectedCategories);
    setTempMaxPrice(maxPrice);
    setTempMinRating(minRating);
    setTempOnlineOnly(onlineOnly);
    setShowFilters(true);
  };

  const applyFilters = () => {
    setSelectedGender(tempGender);
    setSelectedCategories(tempCategories);
    setMaxPrice(tempMaxPrice);
    setMinRating(tempMinRating);
    setOnlineOnly(tempOnlineOnly);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setTempGender("Any");
    setTempCategories([]);
    setTempMaxPrice(1000);
    setTempMinRating(0);
    setTempOnlineOnly(false);
  };

  const clearAllAppliedFilters = () => {
    setSelectedGender("Any");
    setSelectedCategories([]);
    setMaxPrice(1000);
    setMinRating(0);
    setOnlineOnly(false);
  };

  // Calculate count of active filters
  const activeFiltersCount =
    (selectedGender !== "Any" ? 1 : 0) +
    (selectedCategories.length > 0 ? 1 : 0) +
    (maxPrice < 1000 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (onlineOnly ? 1 : 0);

  // Compute final filtered list of companions
  const filteredCompanions = companions.filter(c => {
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchCategory = c.category.toLowerCase().includes(q);
      const matchBio = c.bio.toLowerCase().includes(q);
      if (!matchName && !matchCategory && !matchBio) return false;
    }
    if (selectedGender !== "Any" && c.gender !== selectedGender) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(c.category)) return false;
    if (c.price > maxPrice) return false;
    if (c.rating < minRating) return false;
    if (onlineOnly && !c.online) return false;
    return true;
  });

  const toggleCategory = (catName: string) => {
    setTempCategories(prev =>
      prev.includes(catName) ? prev.filter(x => x !== catName) : [...prev, catName]
    );
  };

  return (
    <MobileFrame withNav className="bg-gradient-to-br from-violet-100 via-slate-50 to-indigo-100">
      <div className="flex-1 overflow-y-auto no-scrollbar relative bg-slate-50/30">

        {/* Sleek sticky header */}
        <header className="px-5 pt-5 pb-3 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div>
            <h1 className="text-base font-extrabold text-slate-800 tracking-tight">Explore</h1>
          </div>
        </header>

        <div className="px-5 pt-4 space-y-4">

          {/* Search bar Row */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search companions, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl border border-slate-200 bg-white shadow-soft focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 text-xs font-semibold placeholder-slate-400 transition-all"
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

          {/* Active filters display block */}
          {activeFiltersCount > 0 && (
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-2.5 flex items-center justify-between animate-fadeIn">
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-[10px] text-primary font-bold">Active filters:</span>
                {selectedGender !== "Any" && (
                  <span className="text-[9px] font-bold bg-white text-primary border border-primary/20 px-2 py-0.5 rounded-md">{selectedGender}</span>
                )}
                {selectedCategories.map(cat => (
                  <span key={cat} className="text-[9px] font-bold bg-white text-primary border border-primary/20 px-2 py-0.5 rounded-md">{cat}</span>
                ))}
                {maxPrice < 1000 && (
                  <span className="text-[9px] font-bold bg-white text-primary border border-primary/20 px-2 py-0.5 rounded-md">≤ ₹{maxPrice}/hr</span>
                )}
                {minRating > 0 && (
                  <span className="text-[9px] font-bold bg-white text-primary border border-primary/20 px-2 py-0.5 rounded-md">★ {minRating}+</span>
                )}
                {onlineOnly && (
                  <span className="text-[9px] font-bold bg-white text-primary border border-primary/20 px-2 py-0.5 rounded-md">Online</span>
                )}
              </div>
              <button
                onClick={clearAllAppliedFilters}
                className="text-[10px] font-extrabold text-primary hover:underline shrink-0 pl-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Count & View layout toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-500 font-bold tracking-tight">
                {filteredCompanions.length} companion{filteredCompanions.length !== 1 ? "s" : ""} found
              </span>
              <button 
                onClick={openFilterDrawer}
                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                  activeFiltersCount > 0 
                    ? "text-primary bg-primary/10 border border-primary/25" 
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-100 border border-slate-200/40"
                }`}
                title="Filters"
              >
                <SlidersHorizontal size={11} />
              </button>
            </div>
            <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-200/50">
              <button 
                onClick={() => setView("list")} 
                className={`w-7 h-7 rounded flex items-center justify-center transition-all ${view === "list" ? "bg-white shadow-soft text-primary" : "text-slate-400 hover:text-slate-600"}`}
              >
                <List size={14} />
              </button>
              <button 
                onClick={() => setView("grid")} 
                className={`w-7 h-7 rounded flex items-center justify-center transition-all ${view === "grid" ? "bg-white shadow-soft text-primary" : "text-slate-400 hover:text-slate-600"}`}
              >
                <LayoutGrid size={14} />
              </button>
            </div>
          </div>

          {/* Companions listing content */}
          {filteredCompanions.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center space-y-2.5 shadow-soft">
              <div className="text-3xl">🔍</div>
              <h3 className="font-extrabold text-sm text-slate-700">No companions match your search</h3>
              <p className="text-[11px] text-slate-400 font-medium">Try clearing some filters or searching for something else.</p>
              <button
                onClick={clearAllAppliedFilters}
                className="h-9 px-4 rounded-xl bg-primary text-white text-xs font-bold shadow-soft transition-all active:scale-95 mt-1"
              >
                Reset all filters
              </button>
            </div>
          ) : view === "list" ? (
            <div className="flex flex-col gap-2.5">
              {filteredCompanions.map(c => {
                const img = photoMap[c.photo];
                return (
                  <Link
                    to="/companion/$id"
                    params={{ id: c.id }}
                    key={c.id}
                    className="flex items-center gap-2.5 bg-white border border-slate-100 shadow-soft hover:shadow-md hover:border-slate-200/50 rounded-xl p-2.5 transition-all duration-200 active:scale-[0.99]"
                  >
                    <div className="relative shrink-0">
                      {img ? (
                        <img
                          src={img}
                          alt={c.name}
                          className="w-11 h-11 rounded-full object-cover border border-slate-100 shadow-sm"
                        />
                      ) : (
                        <Avatar name={c.name} color={c.color} size={44} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 min-w-0">
                        <span className="font-extrabold text-slate-800 text-[12px] tracking-tight truncate block">{c.name}</span>
                        {c.verified && <VerifiedBadge />}
                      </div>

                      <div className="mt-0.5 flex items-center gap-1 flex-wrap">
                        <span className="text-[8px] font-bold text-primary bg-primary-soft border border-primary/5 px-1.5 py-0.5 rounded">
                          {c.category}
                        </span>
                        <span className="text-[8px] font-bold text-slate-500 bg-slate-100 border border-slate-200/20 px-1.5 py-0.5 rounded">
                          {c.experience} exp
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 mt-1 text-[9px] text-slate-400 font-bold">
                        <span className="flex items-center gap-0.5 text-amber-500 shrink-0">
                          <Star size={9} className="fill-amber-400 text-amber-400" />
                          {c.rating}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 text-slate-500 shrink-0">
                          <MapPin size={9} />
                          {c.distance}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0 self-stretch justify-between">
                      {c.online ? (
                        <span className="inline-flex items-center gap-1 text-[7px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50 animate-pulse">
                          <span className="relative w-1 h-1 rounded-full bg-emerald-500">
                            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                          </span>
                          ACTIVE
                        </span>
                      ) : (
                        <div className="h-3" />
                      )}

                      <span className="text-secondary font-black text-xs">
                        ₹{c.price}
                        <span className="text-[8px] text-slate-400 font-medium">/hr</span>
                      </span>
                      <button className="h-6 px-3 rounded-lg grad-primary text-white text-[9px] font-extrabold shadow shadow-primary/10 active:scale-95 transition-all">
                        Book
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3.5">
              {filteredCompanions.map(c => {
                const img = photoMap[c.photo];
                return (
                  <Link
                    to="/companion/$id"
                    params={{ id: c.id }}
                    key={c.id}
                    className="bg-white border border-slate-100/80 shadow-soft hover:shadow-md hover:border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-200 active:scale-[0.99] flex flex-col"
                  >
                    <div className="relative h-28 bg-slate-100 shrink-0">
                      {img ? (
                        <img
                          src={img}
                          alt={c.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${c.color} flex items-center justify-center`}>
                          <span className="text-white text-3xl font-extrabold">{c.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</span>
                        </div>
                      )}

                      {c.online && (
                        <span className="absolute top-2 right-2">
                          <OnlineDot />
                        </span>
                      )}
                      {c.verified && (
                        <span className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded-lg shadow-sm">
                          <VerifiedBadge />
                        </span>
                      )}

                      <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        ★ {c.rating}
                      </div>
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-800 text-xs truncate">{c.name}</h3>
                        <p className="text-[9px] text-primary font-bold mt-0.5">{c.category}</p>

                        <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold mt-2">
                          <span className="flex items-center gap-0.5"><MapPin size={9} /> {c.distance}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                        <span className="text-secondary font-extrabold text-xs">
                          ₹{c.price}
                          <span className="text-[8px] text-slate-400 font-medium">/hr</span>
                        </span>
                        <button className="h-6 px-2.5 rounded-full grad-primary text-white text-[9px] font-extrabold shadow shadow-primary/20">
                          Book
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

        </div>

        {/* Height spacer */}
        <div className="h-10" />

        {/* Dynamic Filters Sheet (Drawer) */}
        {showFilters && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
              onClick={() => setShowFilters(false)}
            />
            {/* Drawer Sheet */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white rounded-t-3xl z-50 p-6 slide-up max-h-[85vh] overflow-y-auto no-scrollbar overflow-x-hidden shadow-2xl border-t border-slate-100 flex flex-col justify-between">
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
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all border ${
                            tempGender === g 
                              ? "bg-primary text-white border-primary shadow shadow-primary/20" 
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </FilterSection>

                  {/* Online Status Toggle */}
                  <FilterSection title="Live Status">
                    <button 
                      onClick={() => setTempOnlineOnly(!tempOnlineOnly)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all border flex items-center gap-1.5 ${
                        tempOnlineOnly 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300 shadow shadow-emerald-500/10" 
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Show Online Only
                    </button>
                  </FilterSection>

                  {/* Categories Filter (Multi-select) */}
                  <FilterSection title="Categories">
                    <div className="flex flex-wrap gap-2">
                      {categories.map(c => {
                        const active = tempCategories.includes(c.name);
                        return (
                          <button 
                            key={c.name} 
                            onClick={() => toggleCategory(c.name)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all border flex items-center gap-1 ${
                              active 
                                ? "bg-primary/10 text-primary border-primary" 
                                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            {c.image ? (
                              <img src={c.image} alt={c.name} className="w-3.5 h-3.5 object-contain" />
                            ) : (
                              <span>{c.emoji || "📁"}</span>
                            )}
                            <span>{c.name}</span>
                            {active && <Check size={8} className="stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                  </FilterSection>

                  {/* Max Price Range Slider */}
                  <FilterSection title="Price Limit">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                      <span>Min: ₹200/hr</span>
                      <span className="text-primary bg-primary-soft px-2 py-0.5 rounded-md">
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
                      {([0, 4.5, 4.7, 4.9] as const).map(r => (
                        <button 
                          key={r} 
                          onClick={() => setTempMinRating(r)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all border flex items-center gap-1 ${
                            tempMinRating === r 
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
                  className="flex-[2] h-11 grad-primary text-white rounded-xl font-bold text-xs shadow-md shadow-primary/20 active:scale-[0.98] transition-all"
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
      <div className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">{title}</div>
      {children}
    </div>
  );
}
