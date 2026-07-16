import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame, Avatar } from "@/components/Partnerji/Shell";
import { companions } from "@/lib/Partnerji-data";
import { ArrowLeft, Star, Plus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/review")({ component: ReviewPage });

const TAGS = ["Punctual", "Friendly", "Professional", "Great Conversation", "Knowledgeable", "Fun", "Safe"];

function ReviewPage() {
  const [rating, setRating] = useState(5);
  const [tags, setTags] = useState<string[]>(["Punctual", "Friendly"]);
  const c = companions[1];
  const labels = ["", "Poor", "Fair", "Average", "Good", "Excellent!"];

  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
        <header className="px-5 pt-6 pb-3 flex items-center gap-3">
          <Link to="/bookings" className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center"><ArrowLeft size={20} /></Link>
          <h1 className="text-lg font-bold">Rate Your Experience</h1>
        </header>

        <div className="px-5">
          <div className="bg-white rounded-2xl shadow-soft p-3 flex items-center gap-3">
            <Avatar name={c.name} color={c.color} size={48} />
            <div className="flex-1">
              <div className="font-bold text-sm">{c.name}</div>
              <div className="text-[11px] text-muted-foreground">{c.category} · 18 May, 1.5 hrs</div>
            </div>
          </div>
        </div>

        <div className="px-5 mt-6 text-center">
          <div className="text-sm font-bold mb-3">How was your session?</div>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map(s => (
              <button key={s} onClick={() => setRating(s)} className={s <= rating ? "star-pop" : ""}>
                <Star size={44} className={s <= rating ? "fill-amber-400 text-amber-400" : "text-border"} />
              </button>
            ))}
          </div>
          <div className="mt-3 text-lg font-extrabold text-primary">{labels[rating]}</div>
        </div>

        <div className="px-5 mt-6">
          <div className="text-sm font-bold mb-2">What went well?</div>
          <div className="flex flex-wrap gap-2">
            {TAGS.map(t => {
              const on = tags.includes(t);
              return (
                <button key={t} onClick={() => setTags(on ? tags.filter(x => x !== t) : [...tags, t])}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold ${on ? "bg-primary text-white" : "bg-white shadow-soft text-foreground"}`}>
                  {t} {on && "✓"}
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-5 mt-5">
          <div className="text-sm font-bold mb-2">Written Review</div>
          <div className="bg-white rounded-xl shadow-soft p-3">
            <textarea placeholder="Tell others about your experience..." className="w-full h-24 bg-transparent outline-none text-sm resize-none" />
            <div className="text-right text-[10px] text-muted-foreground">0/300</div>
          </div>
        </div>

        <div className="px-5 mt-5">
          <div className="text-sm font-bold mb-2">Add Photos</div>
          <div className="flex gap-2">
            {[0, 1, 2].map(i => (
              <button key={i} className="w-20 h-20 rounded-xl border-2 border-dashed border-border bg-white flex items-center justify-center text-muted-foreground"><Plus size={20} /></button>
            ))}
          </div>
        </div>

        <div className="px-5 mt-4">
          <button className="text-xs text-danger font-semibold">Report an issue instead</button>
        </div>

        <div className="px-5 mt-6">
          <Link to="/bookings" className="h-[54px] grad-primary rounded-full text-white font-bold flex items-center justify-center shadow-soft">Submit Review</Link>
        </div>
      </div>
    </MobileFrame>
  );
}
