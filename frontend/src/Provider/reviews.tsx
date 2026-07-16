import { createFileRoute } from "@tanstack/react-router";
import { Star, ThumbsUp } from "lucide-react";
import { MobileShell, TopBar } from "@/components/MobileShell";
import { reviews } from "@/lib/mock-data";
import { useState } from "react";

// Route configuration moved to pages/Provider
const stars = [{ n: 5, c: 89, p: 72 }, { n: 4, c: 28, p: 23 }, { n: 3, c: 5, p: 4 }, { n: 2, c: 2, p: 1 }, { n: 1, c: 0, p: 0 }];
const sorts = ["Newest", "Highest", "Lowest", "With Comments"];

function Reviews() {
  const [s, setS] = useState("Newest");
  return (
    <MobileShell hideNav>
      <TopBar title="My Reviews" back backTo="/Provider/profile" />
      <div className="px-5 pt-4 pb-8 space-y-4">
        <div className="gradient-primary rounded-2xl p-5 text-white shadow-card-lg">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-5xl font-extrabold">4.9</p>
              <div className="flex gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />)}
              </div>
              <p className="text-white/80 text-xs mt-1">124 reviews</p>
            </div>
            <div className="flex-1 space-y-1">
              {stars.map(st => (
                <div key={st.n} className="flex items-center gap-2 text-[11px]">
                  <span className="w-3 font-bold">{st.n}</span>
                  <Star className="w-3 h-3 fill-white text-white" />
                  <div className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full bg-white" style={{ width: `${st.p}%` }} />
                  </div>
                  <span className="w-6 text-right">{st.c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-1">
            {sorts.map(o => (
              <button key={o} onClick={() => setS(o)} className={`px-4 h-9 rounded-full text-sm font-semibold whitespace-nowrap ${s === o ? "bg-primary text-white" : "bg-white text-foreground border border-border"}`}>{o}</button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">{r.avatar}</div>
                <div className="flex-1">
                  <p className="font-bold text-foreground text-sm">{r.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-3 h-3 ${j < r.rating ? "fill-secondary text-secondary" : "text-border"}`} />
                    ))}
                    <span className="text-[10px] text-muted-foreground ml-1">{r.time}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground mt-3">"{r.text}"</p>
              <p className="text-[11px] text-muted-foreground mt-2">{r.service}</p>
              {r.helpful > 0 && (
                <p className="text-[11px] text-muted-foreground mt-2 flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3" /> {r.helpful} found helpful
                </p>
              )}
              {r.response && (
                <div className="mt-3 bg-mint rounded-xl p-3 border-l-2 border-primary">
                  <p className="text-[11px] font-bold text-primary mb-1">RESPONSE FROM PRIYA</p>
                  <p className="text-xs text-foreground italic">{r.response}</p>
                </div>
              )}
              {!r.response && r.rating <= 3 && (
                <button className="mt-2 text-primary text-xs font-bold">Reply to Review →</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}

export default Reviews;
