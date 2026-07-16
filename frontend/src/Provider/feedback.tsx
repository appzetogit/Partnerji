import { useState } from "react";
import { MobileShell, TopBar } from "@/components/MobileShell";
import { toast } from "sonner";
import { Star, MessageSquare, CheckCircle2, ChevronRight } from "lucide-react";

function SendFeedback() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState("App Experience");
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating.");
      return;
    }
    if (!comments.trim()) {
      toast.error("Please enter your feedback comments.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Feedback submitted successfully!");
    }, 1000);
  };

  return (
    <MobileShell hideNav>
      <TopBar title="Send Feedback" back backTo="/Provider/more" />

      <div className="px-5 pt-4 pb-8 space-y-4 bg-[#F8F9FA] min-h-[calc(100vh-60px)]">
        {submitted ? (
          <div className="bg-white rounded-2xl p-6 text-center shadow-card border border-slate-100 py-12 space-y-4 animate-slide-in">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
            <h3 className="text-lg font-black text-slate-800">Thank You!</h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
              Your feedback has been logged. We read every review to continuously improve the Partnerji companion experience.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setRating(0);
                setComments("");
              }}
              className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow-card"
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Intro text */}
            <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 flex gap-3">
              <MessageSquare className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-[11px] text-muted-foreground leading-relaxed font-semibold">
                Have ideas on how to improve Partnerji? Running into issues with bookings or payments? Let us know below!
              </p>
            </div>

            {/* Rating Selector */}
            <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-50 space-y-3 text-center">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                RATE YOUR PLATFORM EXPERIENCE
              </label>
              <div className="flex justify-center gap-2.5 pt-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isActive = (hoverRating || rating) >= star;
                  return (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="focus:outline-none transition-transform active:scale-95"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${isActive ? "fill-amber-400 text-amber-400" : "text-slate-200"
                          }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Dropdown */}
            <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-50 space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                FEEDBACK CATEGORY
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-11 rounded-xl bg-slate-50 border border-slate-200 px-3 font-semibold text-xs text-slate-700 focus:outline-primary"
              >
                <option>App Experience</option>
                <option>Booking Vetting</option>
                <option>Earnings & Payouts</option>
                <option>Safety Concerns</option>
                <option>Other / Suggestion</option>
              </select>
            </div>

            {/* Comments Area */}
            <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-50 space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                COMMENTS & SUGGESTIONS
              </label>
              <textarea
                placeholder="What can we do to make your experience better?"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
                rows={4}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-primary bg-slate-50 font-medium leading-relaxed"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-card hover:bg-primary-dark transition-colors cursor-pointer mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Submit Feedback</>
              )}
            </button>
          </form>
        )}
      </div>
    </MobileShell>
  );
}

export default SendFeedback;
