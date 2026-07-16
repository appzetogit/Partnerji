import { useState } from "react";
import { MobileShell, TopBar } from "@/components/MobileShell";
import { Search, HelpCircle, ChevronDown, ChevronUp, Mail, Phone } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  cat: string;
}

function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      cat: "Earnings",
      q: "When do I get my payouts?",
      a: "All completed booking earnings are processed and transferred automatically to your linked bank account every Tuesday. Payouts can take 1-2 business days to reflect in your account.",
    },
    {
      cat: "Bookings",
      q: "What is the cancellation policy?",
      a: "Companions can cancel a session if they have a valid reason. However, doing so less than 2 hours before the meetup might result in booking suspension or score reduction. If the client cancels, you may be eligible for compensation.",
    },
    {
      cat: "Safety",
      q: "What if a client acts inappropriately?",
      a: "Your safety is paramount. You are free to end any active session immediately if a customer breaches our platonic guidelines. Use the in-app SOS button to get support or contact local emergency services.",
    },
    {
      cat: "Profile",
      q: "How can I update my services or rates?",
      a: "You can adjust your service descriptions, active cities, and rates by going to the 'View Profile' page and clicking the 'Edit Details' button on your profile card.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.cat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MobileShell hideNav>
      <TopBar title="Help Center" back backTo="/Provider/more" />

      <div className="px-5 pt-4 pb-8 space-y-5 bg-[#F8F9FA] min-h-[calc(100vh-60px)]">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search help topics, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 text-xs focus:outline-primary bg-white shadow-sm font-semibold"
          />
        </div>

        {/* Contact Support Cards */}
        <div className="bg-white rounded-2xl p-4 shadow-card border border-slate-50 space-y-3">
          <div>
            <h3 className="font-extrabold text-sm text-slate-800">Direct Support</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Need immediate help? Reach out directly to our team.</p>
          </div>

          <div className="flex flex-col gap-2">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-3.5 p-3 bg-slate-50 border border-slate-100 hover:bg-slate-100 hover:border-slate-200 rounded-xl transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Call Us</p>
                <p className="text-xs font-black text-slate-800 mt-0.5">+91 98765 43210</p>
              </div>
            </a>

            <a
              href="mailto:support@partnerji.com"
              className="flex items-center gap-3.5 p-3 bg-slate-50 border border-slate-100 hover:bg-slate-100 hover:border-slate-200 rounded-xl transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Email Support</p>
                <p className="text-xs font-black text-slate-800 mt-0.5">support@partnerji.com</p>
              </div>
            </a>
          </div>
        </div>

        {/* FAQs list */}
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-1">
            {searchQuery ? `SEARCH RESULTS (${filteredFaqs.length})` : "FREQUENTLY ASKED QUESTIONS"}
          </p>

          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center shadow-card border border-slate-100">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="font-bold text-xs text-slate-700">No FAQ Found</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Try searching with other terms like 'safety' or 'payout'.</p>
            </div>
          ) : (
            filteredFaqs.map((faq, i) => {
              const isExpanded = expandedIndex === i;
              return (
                <div
                  key={i}
                  onClick={() => setExpandedIndex(isExpanded ? null : i)}
                  className="bg-white rounded-2xl border border-slate-50 shadow-card overflow-hidden transition-all duration-200 cursor-pointer"
                >
                  <div className="p-4 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-md uppercase">
                        {faq.cat}
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-800 mt-1.5 leading-snug">{faq.q}</h4>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-slate-50 text-[11px] text-muted-foreground leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </MobileShell>
  );
}

export default HelpCenter;
