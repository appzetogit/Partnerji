import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/Partnerji/Shell";
import { getFAQContent } from "@/lib/dynamicContent";
import {
  ArrowLeft,
  FileQuestion,
  Search,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Ticket
} from "lucide-react";

export const Route = createFileRoute("/faq")({ component: FAQPage });

interface FAQItem {
  q: string;
  a: string;
  cat: string;
}

function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Ticket Form States
  const [ticketCategory, setTicketCategory] = useState("Booking Issue");
  const [ticketMessage, setTicketMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState(false);
  const [generatedTicketId, setGeneratedTicketId] = useState("");
  const [formError, setFormError] = useState("");

  const faqs = getFAQContent();

  const categories = ["All", "Bookings", "Safety", "Payments", "Cancellations"];

  // Filter logic
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.cat.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || faq.cat === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketMessage.trim()) {
      setFormError("Please explain your issue before submitting.");
      return;
    }
    setFormError("");
    setIsSubmitting(true);

    // Simulate server call
    setTimeout(() => {
      setIsSubmitting(false);
      setTicketSuccess(true);
      const randomId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedTicketId(randomId);
      setTicketMessage("");
    }, 1200);
  };

  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-10 bg-[#fdfdfd]">
        
        {/* Header section with back navigation */}
        <header className="px-5 pt-6 pb-3 flex items-center gap-3 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur z-10">
          <Link to="/profile" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
            <ArrowLeft size={20} className="text-slate-700" />
          </Link>
          <div className="flex-1">
            <h1 className="text-base font-black text-slate-800 leading-tight">Help & Support</h1>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">We're here for you 24/7</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-violet-50 text-primary flex items-center justify-center">
            <Sparkles size={18} className="animate-pulse" />
          </div>
        </header>

        {/* Content Wrapper */}
        <div className="px-5 pt-4 space-y-6">
          
          {/* Support Channels shortcuts */}
          <div className="space-y-2.5">
            <h3 className="text-[10px] font-black text-slate-400 tracking-wider uppercase px-0.5">
              Direct Contact Support
            </h3>
            
            <div className="grid grid-cols-3 gap-2.5">
              {/* Chatbot Card */}
              <Link
                to="/chatbot"
                className="bg-white border border-slate-100 hover:border-primary/30 rounded-2xl p-3 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-50 text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-200 mb-2">
                  <MessageSquare size={20} />
                </div>
                <span className="text-[10px] font-black text-slate-800 leading-tight">AI Companion</span>
                <span className="text-[8px] text-slate-400 font-bold mt-1">Instant chatbot</span>
              </Link>

              {/* Call Card */}
              <a
                href="tel:+919876543210"
                className="bg-white border border-slate-100 hover:border-primary/30 rounded-2xl p-3 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 mb-2">
                  <Phone size={18} />
                </div>
                <span className="text-[10px] font-black text-slate-800 leading-tight">Call Support</span>
                <span className="text-[8px] text-slate-400 font-bold mt-1">Talk to agent</span>
              </a>

              {/* Email Card */}
              <a
                href="mailto:support@partnerji.com"
                className="bg-white border border-slate-100 hover:border-primary/30 rounded-2xl p-3 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 mb-2">
                  <Mail size={18} />
                </div>
                <span className="text-[10px] font-black text-slate-800 leading-tight">Email Support</span>
                <span className="text-[8px] text-slate-400 font-bold mt-1">Gets response fast</span>
              </a>
            </div>
          </div>

          {/* Search Box */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search keywords (e.g. refund, safety, rules)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setExpandedIndex(null); // collapse items on search
                }}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 bg-white shadow-sm font-semibold transition-all"
              />
            </div>

            {/* Category Filter Horizontal Scrollbar */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setExpandedIndex(null);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-[10px] font-extrabold tracking-wide shrink-0 transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white shadow-sm shadow-primary/35 scale-[1.03]"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200/80"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FAQs List section */}
          <div className="space-y-3 pt-1">
            <div className="flex justify-between items-center px-1">
              <p className="text-[10px] font-black text-slate-400 tracking-wider uppercase">
                {searchQuery || activeCategory !== "All"
                  ? `FILTRED TOPICS (${filteredFaqs.length})`
                  : "FREQUENTLY ASKED QUESTIONS"}
              </p>
            </div>

            {filteredFaqs.length === 0 ? (
              <div className="bg-white rounded-2xl p-7 text-center border border-slate-100 shadow-sm">
                <FileQuestion className="w-9 h-9 text-slate-300 mx-auto mb-2" />
                <p className="font-extrabold text-xs text-slate-700">No Match Found</p>
                <p className="text-[9px] text-slate-400 mt-1 max-w-[200px] mx-auto leading-relaxed">
                  Try clearing your search query or switching categories. You can also raise a support ticket below.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredFaqs.map((faq, i) => {
                  const isExpanded = expandedIndex === i;
                  return (
                    <div
                      key={i}
                      onClick={() => setExpandedIndex(isExpanded ? null : i)}
                      className={`bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-200 cursor-pointer ${
                        isExpanded ? "border-primary/20 shadow-md shadow-violet-50/50" : "hover:border-slate-200"
                      }`}
                    >
                      <div className="p-4 flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <span className={`text-[8px] font-black tracking-wider px-2 py-0.5 rounded-md uppercase ${
                            faq.cat === 'Safety' ? 'bg-red-50 text-red-500' :
                            faq.cat === 'Payments' ? 'bg-green-50 text-green-600' :
                            faq.cat === 'Cancellations' ? 'bg-amber-50 text-amber-600' : 'bg-primary/10 text-primary'
                          }`}>
                            {faq.cat}
                          </span>
                          <h4 className="font-extrabold text-xs text-slate-800 mt-2 leading-snug">{faq.q}</h4>
                        </div>
                        <div className={`w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180 bg-primary/10 text-primary' : 'text-slate-400'}`}>
                          <ChevronDown size={14} />
                        </div>
                      </div>

                      {/* Smooth Expanded body */}
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 border-t border-slate-50 text-[11px] text-slate-500 leading-relaxed bg-[#FAFBFC]/40 animate-slide-down">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Support Ticket Section */}
          <div className="pt-2">
            {ticketSuccess ? (
              <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50/50 border border-emerald-100 rounded-3xl p-5 text-center shadow-md animate-scale-up">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <CheckCircle2 size={24} className="animate-bounce" />
                </div>
                <h4 className="font-black text-sm text-slate-800">Support Ticket Created</h4>
                <p className="text-[10px] text-slate-500 font-medium mt-1 leading-relaxed px-2">
                  Your ticket has been logged successfully. Our customer desk will reach you shortly on call or SMS.
                </p>
                
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl py-2 px-4 my-4 inline-flex items-center gap-2">
                  <Ticket size={14} className="text-emerald-600" />
                  <span className="text-[11px] font-black text-emerald-700 tracking-wider font-mono">
                    {generatedTicketId}
                  </span>
                </div>
                
                <div>
                  <button
                    onClick={() => setTicketSuccess(false)}
                    className="text-[10px] font-black text-primary hover:underline"
                  >
                    Raise another ticket
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-violet-50 via-white to-indigo-50/30 border border-violet-100/60 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Ticket size={14} />
                  </div>
                  <div>
                    <h3 className="font-black text-xs text-slate-800">Can't find the answer?</h3>
                    <p className="text-[9px] text-slate-400 font-semibold">Raise a direct ticket to support desk</p>
                  </div>
                </div>

                <form onSubmit={handleTicketSubmit} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 tracking-wider uppercase pl-0.5">
                      Issue Category
                    </label>
                    <select
                      value={ticketCategory}
                      onChange={(e) => setTicketCategory(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 text-[11px] focus:outline-none focus:border-primary/50 bg-white font-bold text-slate-700"
                    >
                      <option>Booking Issue</option>
                      <option>Payment & Refund</option>
                      <option>Safety Concern</option>
                      <option>Account Status</option>
                      <option>Feedback & Others</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 tracking-wider uppercase pl-0.5">
                      Message / Query
                    </label>
                    <textarea
                      value={ticketMessage}
                      onChange={(e) => {
                        setTicketMessage(e.target.value);
                        if (e.target.value.trim()) setFormError("");
                      }}
                      placeholder="Explain your problem in detail... (e.g. My payment failed but money got deducted)"
                      className="w-full min-h-[75px] max-h-[120px] p-3 rounded-xl border border-slate-200 text-[11px] focus:outline-none focus:border-primary/50 bg-white font-semibold text-slate-700 placeholder:text-slate-400 placeholder:font-medium leading-relaxed"
                    />
                    {formError && (
                      <div className="flex items-center gap-1 mt-1 text-[9px] text-red-500 font-bold px-0.5">
                        <AlertCircle size={10} />
                        <span>{formError}</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-10 rounded-xl bg-primary text-white text-[11px] font-black flex items-center justify-center gap-2 hover:bg-opacity-95 transition-all shadow-md shadow-primary/20 disabled:bg-slate-300 disabled:shadow-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 rounded-full border-[2.2px] border-white/30 border-t-white animate-spin" />
                        <span>Submitting Ticket...</span>
                      </>
                    ) : (
                      <>
                        <Send size={11} />
                        <span>Submit Ticket</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </MobileFrame>
  );
}

export default FAQPage;
