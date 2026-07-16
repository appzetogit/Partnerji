import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/Partnerji/Shell";
import { ArrowLeft, Star, Heart, Calendar } from "lucide-react";

export const Route = createFileRoute("/my-rating")({ component: MyRatingPage });

function MyRatingPage() {
  const reviews = [
    {
      id: "1",
      partner: "Priya Sharma",
      rating: 5,
      date: "July 12, 2026",
      text: "Ravi was extremely polite, respectful, and on time for our dining companion session. Great conversation!",
    },
    {
      id: "2",
      partner: "Anjali Gupta",
      rating: 5,
      date: "June 28, 2026",
      text: "Had a wonderful time walking around the city gallery. Highly recommend Ravi as a companion!",
    },
  ];

  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6 bg-[#fdfdfd]">
        <header className="px-5 pt-6 pb-3 flex items-center gap-3 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur z-10">
          <Link to="/profile" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
            <ArrowLeft size={20} className="text-slate-700" />
          </Link>
          <h1 className="text-lg font-bold flex-1 text-slate-800">My Rating</h1>
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
            <Star size={18} className="fill-amber-400" />
          </div>
        </header>

        <div className="px-5 pt-4 space-y-4">
          {/* Rating Summary Card */}
          <div className="bg-gradient-to-br from-violet-600 to-indigo-700 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[10px] font-bold tracking-wider opacity-75 uppercase">YOUR PLATFORM SCORE</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-black">4.9</span>
                <span className="text-sm font-semibold opacity-75">/ 5.0</span>
              </div>
              <p className="text-xs mt-2 opacity-90 font-medium">Based on 12 reviews from verified partners</p>
            </div>
            <Star size={100} className="absolute -right-5 -bottom-5 text-white/5 fill-white/5 rotate-12 z-0" />
          </div>

          {/* Breakdown Stats */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
            <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">BEHAVIOR BREAKDOWN</h3>
            
            <div className="space-y-2.5">
              {[
                { label: "Punctuality", score: "5.0" },
                { label: "Respectfulness", score: "4.9" },
                { label: "Communication", score: "4.8" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500">{stat.label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-800 font-bold">{stat.score}</span>
                    <span className="text-amber-400">★</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-1">
              PARTNER FEEDBACK
            </p>

            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-800">{rev.partner}</h4>
                    <p className="text-[9px] text-slate-400 flex items-center gap-1 font-semibold mt-0.5">
                      <Calendar size={10} /> {rev.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 bg-amber-50 text-amber-600 px-2 py-0.5 rounded-lg text-[10px] font-black">
                    {rev.rating} <Star size={10} className="fill-amber-500 text-amber-500" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}

export default MyRatingPage;
