import React, { useState, useEffect, useRef } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Bot,
  Send,
  X,
  Sparkles,
  Smile,
  Paperclip,
  User,
  Wallet,
  ChevronRight,
  Star,
  MapPin,
  HelpCircle,
  Scissors,
  Check,
} from "lucide-react";
import { companions } from "@/lib/Partnerji-data";

// Helper map to load mock companion pictures
import pUntitled from "../../assest/peopleimage/Untitled.jpg";
import pImages from "../../assest/peopleimage/images.jpg";
import pImages1 from "../../assest/peopleimage/images1.jpg";
import pImagesd from "../../assest/peopleimage/imagesd.jpg";
import pImagesdd from "../../assest/peopleimage/imagesdd.jpg";

const photoMap: Record<string, string> = {
  "images.jpg": pImages,
  "images1.jpg": pImages1,
  "imagesd.jpg": pImagesd,
  "imagesdd.jpg": pImagesdd,
  "Untitled.jpg": pUntitled,
};

interface Message {
  id: string;
  sender: "bot" | "user";
  text?: string;
  time: string;
  customComponent?: React.ReactNode;
}

export default function ChatBot({ withNav }: { withNav: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true); // Pulse badge when new

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const feedEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    if (isOpen) {
      feedEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Initial welcome message if feed is empty
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          sender: "bot",
          text: "Hi! I am Partner, your Partnerji AI companion. 🤖✨ I can help you find services, recommend companions, or check your wallet. What would you like to explore today?",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          customComponent: <QuickActionsContainer onSelect={handleQuickAction} />,
        },
      ]);
    }
  }, []);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      time: userTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = generateBotResponse(textToSend.toLowerCase());
      setMessages((prev) => [...prev, botResponse]);
    }, 1200);
  };

  const handleQuickAction = (actionText: string) => {
    handleSend(actionText);
  };

  const generateBotResponse = (query: string): Message => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const id = Date.now().toString();

    // 1. SERVICES INTENT
    if (
      query.includes("clean") ||
      query.includes("service") ||
      query.includes("ac") ||
      query.includes("repair") ||
      query.includes("kitchen") ||
      query.includes("cook")
    ) {
      return {
        id,
        sender: "bot",
        text: "Sure! Partnerji offers a wide range of on-demand home services. Here are some of our top booked services which you can book instantly:",
        time,
        customComponent: (
          <div className="space-y-3">
            <ServiceCardList />
            <button
              onClick={() => {
                setIsOpen(false);
                navigate({ to: "/explore" });
              }}
              className="w-full mt-1 py-2 px-3 text-xs bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-1 shadow-soft hover:opacity-90 active:scale-98 transition-all"
            >
              Explore All Services <ChevronRight size={14} />
            </button>
          </div>
        ),
      };
    }

    // 2. COMPANIONS INTENT
    if (
      query.includes("companion") ||
      query.includes("friend") ||
      query.includes("partner") ||
      query.includes("priya") ||
      query.includes("rahul") ||
      query.includes("vikram") ||
      query.includes("guide") ||
      query.includes("mate") ||
      query.includes("girl") ||
      query.includes("boy")
    ) {
      return {
        id,
        sender: "bot",
        text: "Great choice! We have friendly, verified companions ready to join you for shopping, gym sessions, events, or traveling. Check out these popular partners nearby:",
        time,
        customComponent: (
          <div className="space-y-3">
            <CompanionRecommendationList onClose={() => setIsOpen(false)} />
          </div>
        ),
      };
    }

    // 3. WALLET INTENT
    if (
      query.includes("wallet") ||
      query.includes("balance") ||
      query.includes("money") ||
      query.includes("cash") ||
      query.includes("pay")
    ) {
      return {
        id,
        sender: "bot",
        text: "Here is your Partnerji wallet overview. You can load money, review transaction history, or manage payment methods anytime:",
        time,
        customComponent: (
          <div className="space-y-3">
            <WalletCardWidget />
            <button
              onClick={() => {
                setIsOpen(false);
                navigate({ to: "/wallet" });
              }}
              className="w-full py-2 px-3 text-xs bg-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-1 shadow-soft hover:bg-emerald-700 active:scale-98 transition-all"
            >
              Open Wallet Details <ChevronRight size={14} />
            </button>
          </div>
        ),
      };
    }

    // 4. HOW IT WORKS / HELP INTENT
    if (
      query.includes("how") ||
      query.includes("work") ||
      query.includes("help") ||
      query.includes("use") ||
      query.includes("about")
    ) {
      return {
        id,
        sender: "bot",
        text: "How Partnerji works in 3 simple steps:\n\n1️⃣ **Choose a Category:** Search for local services (cleaning, repairs) or browse companion activities.\n2️⃣ **Select a Companion:** Review profiles, bios, user ratings, and online statuses.\n3️⃣ **Book & Connect:** Complete a secure payment, and start chat/phone coordination directly in the app!\n\nWhat would you like to do first?",
        time,
        customComponent: <QuickActionsContainer onSelect={handleQuickAction} />,
      };
    }

    // 5. GREETING INTENT
    if (
      query.includes("hi") ||
      query.includes("hello") ||
      query.includes("hey") ||
      query.includes("greetings")
    ) {
      return {
        id,
        sender: "bot",
        text: "Hello! 👋 I'm here and ready to help. You can ask me things like 'find a cleaning service', 'show companions', or 'check my wallet balance'. What's on your mind?",
        time,
        customComponent: <QuickActionsContainer onSelect={handleQuickAction} />,
      };
    }

    // 6. DEFAULT FALLBACK
    return {
      id,
      sender: "bot",
      text: "I want to make sure I help you best! You can check your wallet balance, explore home services, or browse active companion profiles. Choose a quick action below:",
      time,
      customComponent: <QuickActionsContainer onSelect={handleQuickAction} />,
    };
  };

  const hideOnPaths = ["/login", "/otp", "/chat", "/chatbot"];
  if (hideOnPaths.includes(pathname) || pathname.startsWith("/Provider") || pathname.startsWith("/category") || pathname.startsWith("/companion") || pathname.startsWith("/book")) {
    return null;
  }

  return (
    <>
      {/* FLOATING ACTION BUTTON */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setHasNewMessage(false);
          }}
          className={`absolute z-40 w-14 h-14 rounded-full grad-primary text-white flex items-center justify-center shadow-glow transition-all duration-300 hover:scale-110 active:scale-95 animate-slide-up group ${withNav ? "bottom-[88px] right-5" : "bottom-6 right-5"
            }`}
          aria-label="Open AI Assistant"
        >
          {/* Pulsing ring animation */}
          {hasNewMessage && (
            <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping opacity-75" />
          )}

          {/* Glowing dot indicator */}
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </span>

          <Bot size={26} className="transition-transform group-hover:rotate-12" />
        </button>
      )}

      {/* CHAT WINDOW PORTAL */}
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="absolute inset-0 z-50 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Sliding Chat Panel */}
          <div
            className="absolute inset-x-0 bottom-0 top-[12%] bg-[#FAF9FF] rounded-t-[28px] shadow-glow flex flex-col z-50 overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header banner */}
            <header className="shrink-0 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 px-5 py-4 flex items-center justify-between text-white shadow-soft">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Bot size={20} className="text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight flex items-center gap-1">
                    Partnerji AI Assistant <Sparkles size={12} className="text-amber-300 fill-amber-300/20" />
                  </h3>
                  <p className="text-[10px] text-white/80 font-medium mt-0.5">Online • Always helpful</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all active:scale-90"
              >
                <X size={16} />
              </button>
            </header>

            {/* Chat message feed */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-4">
              {messages.map((m) => {
                const isUser = m.sender === "user";
                return (
                  <div
                    key={m.id}
                    className={`flex ${isUser ? "justify-end" : "justify-start"} animate-slide-up`}
                  >
                    <div className="flex flex-col gap-1 max-w-[85%]">
                      {m.text && (
                        <div
                          className={`px-4 py-3 text-xs font-semibold shadow-soft whitespace-pre-line leading-relaxed ${isUser
                            ? "bg-primary text-white rounded-2xl rounded-tr-xs grad-primary"
                            : "bg-white text-foreground rounded-2xl rounded-tl-xs border border-violet-100/50"
                            }`}
                        >
                          {m.text}
                        </div>
                      )}
                      {m.customComponent}
                      <span
                        className={`text-[8px] text-muted-foreground/60 font-bold px-1 mt-0.5 flex items-center gap-1 ${isUser ? "justify-end" : "justify-start"
                          }`}
                      >
                        {m.time}
                        {isUser && <Check size={10} className="text-primary" />}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start animate-slide-up">
                  <div className="bg-white border border-violet-100/50 rounded-2xl rounded-tl-xs px-4 py-3 shadow-soft flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={feedEndRef} />
            </div>

            {/* Input footer */}
            <div className="shrink-0 bg-white border-t border-border/40 px-3 py-3.5 flex items-center gap-2 shadow-card">
              <button className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
                <Paperclip size={16} />
              </button>

              <div className="flex-1 h-10 rounded-xl bg-muted/60 px-3 flex items-center border border-transparent focus-within:border-primary/20 focus-within:bg-white transition-all">
                <input
                  type="text"
                  placeholder="Ask Partner something..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend(inputText);
                  }}
                  className="flex-1 bg-transparent outline-none text-xs font-semibold text-foreground placeholder-muted-foreground/80"
                />
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <Smile size={16} />
                </button>
              </div>

              <button
                onClick={() => handleSend(inputText)}
                disabled={!inputText.trim()}
                className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-soft transition-all active:scale-95 ${inputText.trim()
                  ? "grad-primary text-white hover:shadow-glow"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// QUICK ACTIONS CONTAINER
function QuickActionsContainer({ onSelect }: { onSelect: (text: string) => void }) {
  const actions = [
    { text: "🔍 Find cleaning services", val: "find cleaning services" },
    { text: "🛍️ Recommend companions", val: "find a companion" },
    { text: "💳 View wallet balance", val: "check wallet balance" },
    { text: "💡 How does it work?", val: "how it works" },
  ];

  return (
    <div className="flex flex-wrap gap-1.5 pt-2">
      {actions.map((act, i) => (
        <button
          key={i}
          onClick={() => onSelect(act.val)}
          className="bg-white hover:bg-primary-soft/30 hover:border-primary/30 border border-violet-100 text-foreground text-[10px] font-bold px-3 py-1.5 rounded-full transition-all active:scale-95 shadow-xs"
        >
          {act.text}
        </button>
      ))}
    </div>
  );
}

// SERVICE CARD LIST
function ServiceCardList() {
  const services = [
    { name: "Foam-jet AC Service", price: "₹649", rating: "4.75", tag: "Most Booked" },
    { name: "AC Repair (High Performance)", price: "₹299", rating: "4.73", tag: "Saves ₹150" },
    { name: "Intense Kitchen Cleaning", price: "₹872", rating: "4.80", tag: "8% OFF" },
  ];

  return (
    <div className="space-y-2">
      {services.map((srv, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl p-2.5 border border-violet-100/50 shadow-xs flex items-center justify-between"
        >
          <div className="flex-1 min-w-0 pr-2">
            {srv.tag && (
              <span className="inline-block text-[8px] bg-amber-50 text-amber-600 border border-amber-200/50 font-bold px-1.5 py-0.5 rounded-md mb-1">
                {srv.tag}
              </span>
            )}
            <div className="text-[11px] font-bold text-foreground truncate">{srv.name}</div>
            <div className="text-[9px] text-muted-foreground mt-0.5 flex items-center gap-1 font-semibold">
              <Star size={8} className="fill-amber-400 stroke-amber-400" /> {srv.rating} • Fast Booking
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[11px] font-black text-primary">{srv.price}</div>
            <span className="text-[8px] text-emerald-600 font-bold">Instant</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// COMPANION RECOMMENDATION LIST
function CompanionRecommendationList({ onClose }: { onClose: () => void }) {
  // Take first 3 companions
  const list = companions.slice(0, 3);

  return (
    <div className="space-y-2">
      {list.map((comp) => {
        const photoAsset = photoMap[comp.photo];
        return (
          <div
            key={comp.id}
            className="bg-white rounded-xl p-2.5 border border-violet-100/50 shadow-xs flex items-center gap-2.5"
          >
            {photoAsset ? (
              <img
                src={photoAsset}
                alt={comp.name}
                className="w-10 h-10 rounded-lg object-cover border border-border shrink-0"
              />
            ) : (
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${comp.color} flex items-center justify-center text-white font-bold text-xs shrink-0`}
              >
                {comp.name.charAt(0)}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold text-foreground truncate">{comp.name}</span>
                {comp.verified && (
                  <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white text-[7px] flex items-center justify-center shrink-0 font-bold">
                    ✓
                  </span>
                )}
              </div>
              <div className="text-[9px] text-muted-foreground flex items-center gap-1 font-semibold mt-0.5">
                <span>{comp.emoji} {comp.category}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5">
                  <Star size={8} className="fill-amber-400 stroke-amber-400" /> {comp.rating}
                </span>
              </div>
            </div>

            <div className="text-right shrink-0 flex flex-col items-end gap-1">
              <span className="text-[10px] font-black text-foreground">₹{comp.price}/hr</span>
              <Link
                to={`/companion/${comp.id}`}
                onClick={onClose}
                className="py-1 px-2.5 bg-primary-soft text-primary text-[8px] font-black rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                Profile
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// WALLET CARD WIDGET
function WalletCardWidget() {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-4 shadow-card flex flex-col justify-between h-28 relative overflow-hidden select-none">
      {/* Decorative vector background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-200 via-violet-300 to-indigo-900 pointer-events-none" />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <span className="text-[8px] font-bold text-indigo-200 tracking-widest uppercase">
            Partnerji Premium Card
          </span>
          <h4 className="text-sm font-black mt-1 tracking-wide">₹1,450.00</h4>
        </div>
        <Wallet size={20} className="text-indigo-200" />
      </div>

      <div className="flex items-end justify-between relative z-10">
        <div>
          <span className="text-[8px] font-bold text-indigo-200 block opacity-80">CARD HOLDER</span>
          <span className="text-[9px] font-black tracking-wider mt-0.5 uppercase">John Doe</span>
        </div>
        <div className="flex gap-0.5">
          <div className="w-4 h-4 rounded-full bg-white/20 backdrop-blur-xs" />
          <div className="w-4 h-4 rounded-full bg-white/30 backdrop-blur-xs -ml-2" />
        </div>
      </div>
    </div>
  );
}
