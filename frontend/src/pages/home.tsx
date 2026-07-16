import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame, Avatar, OnlineDot, VerifiedBadge } from "@/components/Partnerji/Shell";
import { companions, categories } from "@/lib/Partnerji-data";
import { MapPin, Bell, Search, Star, ChevronDown, ChevronRight } from "lucide-react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import mainBanner from "../assest/mainbanner.png";
import mainBanner2 from "../assest/mainbanner2.png";
import mainBanner3 from "../assest/mainbanner3.png";
import offer1 from "../assest/offers/1711428213587-b4f7dd.jpeg";
import offer2 from "../assest/offers/1745848360087-3d3d8e.jpeg";
import offer3 from "../assest/offers/1751349785134-9a43cd.jpeg";
import offer4 from "../assest/offers/1779086407617-6bfc19.jpeg";

const offerImages = [offer2, offer1, offer3, offer4];
import mbAcFoam from "../assest/mostbooked/1770722132353-ee56c6.jpeg";
import mbAcRepair from "../assest/mostbooked/1770722101450-6e4f86.jpeg";
import mbBathClean from "../assest/mostbooked/1745582697138-89345d.jpeg";
import mbPlumbing from "../assest/mostbooked/1726211292907-df8c23.jpeg";

const mostBookedServices = [
  {
    id: 1,
    title: "Foam-jet AC service",
    rating: "4.75",
    type: "Instant",
    price: "649",
    img: mbAcFoam,
    discount: ""
  },
  {
    id: 2,
    title: "AC repair",
    rating: "4.73",
    type: "Instant",
    price: "299",
    img: mbAcRepair,
    discount: ""
  },
  {
    id: 3,
    title: "Intense bathroom cleaning",
    rating: "4.80",
    type: "Instant",
    price: "872",
    img: mbBathClean,
    discount: "8% OFF"
  },
  {
    id: 4,
    title: "Tap & shower repair",
    rating: "4.68",
    type: "Instant",
    price: "149",
    img: mbPlumbing,
    discount: ""
  }
];
import iconShopping from "../assest/categoryicon/shopping-removebg-preview.png";
import iconTravel from "../assest/categoryicon/Travel-removebg-preview.png";
import iconEvent from "../assest/categoryicon/Event-removebg-preview.png";
import iconGym from "../assest/categoryicon/Gym-removebg-preview.png";
import iconDining from "../assest/categoryicon/Dinning-removebg-preview.png";
import iconAssistant from "../assest/categoryicon/Assistant-removebg-preview.png";
import iconCorporate from "../assest/categoryicon/Corporate-removebg-preview.png";
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

const categoryIconMap: Record<string, string> = {
  Shopping: iconShopping,
  Travel: iconTravel,
  Event: iconEvent,
  Gym: iconGym,
  Dining: iconDining,
  Assistant: iconAssistant,
  Corporate: iconCorporate,
};

export const Route = createFileRoute("/home")({ component: HomePage });

function HomePage() {
  const [activeBanner, setActiveBanner] = useState(0);
  const banners = [mainBanner, mainBanner2, mainBanner3];

  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [searchVal, setSearchVal] = useState("");

  const placeholders = [
    "Search for 'Kitchen cleaning'",
    "Search for 'Gym Partner'",
    "Search for 'Shopping Mate'",
    "Search for 'Travel Buddy'",
    "Search for 'AC service & repair'"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % placeholders.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <MobileFrame withNav>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6 bg-slate-50/30">

        {/* Header section (clean background matching page color) */}
        <div className="px-5 pt-4 pb-2 flex flex-col gap-3">
          {/* Location section & Bell Icon */}
          <div className="flex items-start justify-between w-full">
            <div className="flex items-start gap-2 text-slate-900 -ml-1.5">
              <LocationOnIcon className="text-slate-800 mt-0.5 shrink-0" style={{ fontSize: 24 }} />
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-tight text-slate-950 leading-tight">In 45 minutes</span>
                <div className="flex items-center text-[11px] font-bold text-slate-700 mt-0.5">
                  <span className="truncate max-w-[210px]">Regal Cir - beside DAVV University ...</span>
                  <KeyboardArrowDownIcon style={{ fontSize: 16 }} className="text-slate-800 ml-0.5" />
                </div>
              </div>
            </div>
            <Link to="/notifications" className="relative w-8 h-8 rounded-full bg-white border border-slate-200/50 shadow-soft flex items-center justify-center transition-all hover:bg-slate-55 active:scale-95">
              <Bell size={15} className="text-slate-800" />
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center border border-white">3</span>
            </Link>
          </div>

          {/* Search Box */}
          <div className="w-full mt-0.5">
            <div className="h-10 rounded-md bg-white shadow-soft flex items-center px-3.5 gap-2 border border-slate-200/50 relative">
              <SearchIcon className="text-slate-500" style={{ fontSize: 20 }} />
              <div className="flex-1 relative h-full flex items-center">
                <input
                  type="text"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full h-full bg-transparent outline-none text-[13px] text-slate-800 font-semibold"
                />
                {searchVal === "" && (
                  <div className="absolute left-0 pointer-events-none h-5 overflow-hidden flex flex-col justify-start">
                    <div
                      className="transition-transform duration-500 ease-out flex flex-col"
                      style={{ transform: `translateY(-${placeholderIdx * 20}px)` }}
                    >
                      {placeholders.map((ph, idx) => (
                        <span key={idx} className="h-5 text-[13px] text-slate-400 font-semibold flex items-center leading-none">
                          {ph}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Promo banner carousel card (moved below search block) */}
        <div className="px-5 mt-2 flex flex-col gap-2">
          <div className="relative w-full aspect-[2.8/1] rounded-2xl overflow-hidden shadow-soft border border-slate-100 bg-white">
            {banners.map((bnr, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  idx === activeBanner ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img src={bnr} alt={`Promo Banner ${idx + 1}`} className="w-full h-full object-fill block" />
              </div>
            ))}
          </div>

          {/* Carousel dots indicators */}
          {banners.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-0.5">
              {banners.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    idx === activeBanner ? "w-3 bg-primary" : "w-1.5 bg-slate-200"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* categories */}
        <div className="pl-5 mt-1 flex gap-5 overflow-x-auto no-scrollbar pb-1">
          {categories.map(c => (
            <Link to="/category/$name" params={{ name: c.name }} key={c.name} className="group flex flex-col items-center gap-0.5 active:scale-95 transition-all duration-300">
              <div className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {categoryIconMap[c.name]
                  ? <img src={categoryIconMap[c.name]} alt={c.name} className="w-14 h-14 object-contain" />
                  : <span className="text-3xl">{c.emoji}</span>
                }
              </div>
              <div className="text-[11px] font-medium text-slate-800 group-hover:text-primary transition-colors -mt-1">{c.name}</div>
            </Link>
          ))}
        </div>

        {/* most booked services */}
        <div className="px-5 mt-3 mb-1.5">
          <h2 className="font-extrabold text-slate-800 text-base tracking-tight">Most booked services</h2>
        </div>
        <div className="pl-5 flex gap-4 overflow-x-auto no-scrollbar pb-3">
          {mostBookedServices.map(service => (
            <div key={service.id} className="min-w-[115px] w-[115px] flex flex-col shrink-0 gap-1.5">
              <div className="relative w-full h-[105px] rounded-xl overflow-hidden bg-slate-100">
                <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                {service.discount && (
                  <span className="absolute top-1.5 left-1.5 bg-emerald-700 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                    {service.discount}
                  </span>
                )}
              </div>
              <div className="flex flex-col px-0.5 gap-0.5">
                <span className="text-[11px] font-semibold text-slate-900 leading-tight truncate">{service.title}</span>
                <div className="flex items-center gap-1 text-[9px] text-slate-600 font-medium">
                  <span className="flex items-center text-slate-800 font-bold">
                    <Star size={9} className="fill-slate-800 text-slate-800 mr-0.5 shrink-0" />
                    {service.rating}
                  </span>
                  <span>•</span>
                  <span className="text-emerald-700 font-bold flex items-center">
                    <span className="text-[7px] mr-0.5">🟢</span> {service.type}
                  </span>
                </div>
                <span className="text-[11px] font-black text-slate-900">₹{service.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* offers & discounts */}
        <SectionHeader title="Offers & Discounts" />
        <div className="pl-5 flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {offerImages.map((img, idx) => (
            <div key={idx} className="min-w-[230px] w-[230px] rounded-md overflow-hidden shadow-sm shrink-0 cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
              <img src={img} alt={`Offer ${idx + 1}`} className="w-full h-auto object-fill block" />
            </div>
          ))}
        </div>

        {/* nearby */}
        <SectionHeader title="Nearby Companions" />
        <div className="pl-5 flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {companions.slice(2, 7).map(c => <FeaturedCard key={c.id} c={c} showDistance />)}
        </div>

        {/* trending */}
        <SectionHeader title="Trending This Week" />
        <div className="px-5 flex flex-col gap-3">
          {companions.slice(0, 3).map(c => (
            <Link to="/companion/$id" params={{ id: c.id }} key={c.id}
              className="group bg-white border border-slate-100/50 rounded-2xl p-3 shadow-sm flex items-center gap-3 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99] transition-all duration-300">
              <div className="relative shrink-0 w-14 h-14 rounded-2xl overflow-hidden">
                {photoMap[c.photo]
                  ? <img src={photoMap[c.photo]} alt={c.name} className="w-full h-full object-cover object-top" />
                  : <div className={`w-full h-full bg-gradient-to-br ${c.color} flex items-center justify-center`}>
                    <span className="text-white text-lg font-black">{c.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</span>
                  </div>
                }
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-extrabold text-slate-800 text-sm group-hover:text-primary transition-colors">{c.name}</div>
                <div className="text-[9px] text-primary font-bold bg-primary-soft inline-block px-2 py-0.5 rounded-full mt-0.5 whitespace-nowrap max-w-full overflow-hidden text-ellipsis">{c.category}</div>
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="flex items-center gap-0.5 font-bold text-slate-700">
                    <Star size={11} className="fill-amber-400 text-amber-400" />{c.rating}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-secondary font-black text-[11px]">₹{c.price}/hr</span>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-full grad-primary text-white text-[10px] font-bold shadow-sm shrink-0 hover:shadow-md hover:translate-y-[-1px] active:translate-y-[0px] transition-all duration-300">
                Book
              </button>
            </Link>
          ))}
        </div>
      </div>
    </MobileFrame>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between px-5 mt-4 mb-2">
      <h2 className="font-extrabold text-slate-800 text-base tracking-tight">{title}</h2>
      <Link to="/explore" className="text-xs text-primary font-bold flex items-center gap-0.5 hover:underline">See all <ChevronRight size={14} /></Link>
    </div>
  );
}

function FeaturedCard({ c, showDistance }: { c: typeof companions[number]; showDistance?: boolean }) {
  const photo = photoMap[c.photo];
  return (
    <Link to="/companion/$id" params={{ id: c.id }}
      className="group min-w-[120px] w-[120px] bg-white rounded-2xl border border-slate-100/50 shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-md active:scale-[0.98] transition-all duration-300 flex flex-col">
      {/* Photo area */}
      <div className="relative h-[100px] overflow-hidden">
        {photo
          ? <img src={photo} alt={c.name} className="w-full h-full object-cover object-top" />
          : <div className={`w-full h-full bg-gradient-to-br ${c.color} flex items-center justify-center`}>
            <span className="text-white text-3xl font-black">{c.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</span>
          </div>
        }
        {c.online && <span className="absolute top-1.5 right-1.5 z-10"><OnlineDot /></span>}
        {/* Rating badge bottom-left */}
        <span className="absolute bottom-1.5 left-1.5 z-10 bg-black/60 backdrop-blur-sm rounded-full px-1.5 py-0.5 flex items-center gap-0.5">
          <Star size={8} className="fill-amber-400 text-amber-400" />
          <span className="text-white text-[8px] font-bold">{c.rating}</span>
        </span>
      </div>
      {/* Details */}
      <div className="p-2 flex flex-col gap-1">
        <div className="font-extrabold text-slate-800 text-[11px] leading-tight group-hover:text-primary transition-colors">
          {c.name}
        </div>
        <div className="flex items-center justify-between gap-1">
          <div className="text-[8px] font-bold text-primary bg-primary-soft px-1.5 py-0.5 rounded-full truncate">
            {c.category}
          </div>
          <div className="text-secondary font-black text-[9px] shrink-0">₹{c.price}<span className="text-[7px] text-slate-400 font-bold">/hr</span></div>
        </div>
        {showDistance && (
          <div className="text-[8px] text-slate-400 flex items-center gap-0.5">
            <MapPin size={8} className="text-slate-400 shrink-0" />{c.distance}
          </div>
        )}
        <button className="w-full h-6 rounded-full grad-primary text-white text-[9px] font-bold shadow-sm mt-0.5 group-hover:shadow-md transition-all duration-300">
          Book
        </button>
      </div>
    </Link>
  );
}
