import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame, Avatar } from "@/components/Partnerji/Shell";
import { companions } from "@/lib/Partnerji-data";
import {
  ArrowLeft,
  Phone,
  Paperclip,
  Smile,
  Send,
  MapPin,
  CheckCheck,
  Info,
  X,
  Image,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

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

export const Route = createFileRoute("/chat")({ component: ChatPage });

interface Message {
  id: string;
  sender: "user" | "companion";
  text?: string;
  time: string;
  location?: boolean;
  image?: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    sender: "companion",
    text: "Hi! I'm heading towards DB Mall. Will be there in 10 mins 😊",
    time: "2:38 PM",
  },
  {
    id: "2",
    sender: "user",
    text: "Great! I'm at the main entrance near the food court",
    time: "2:40 PM",
  },
  {
    id: "3",
    sender: "companion",
    text: "Perfect! See you soon 👍",
    time: "2:41 PM",
  },
  {
    id: "4",
    sender: "companion",
    text: "Should I bring anything specific?",
    time: "2:42 PM",
  },
  {
    id: "5",
    sender: "user",
    text: "No, we're good. Looking forward to it!",
    time: "2:43 PM",
  },
  {
    id: "6",
    sender: "user",
    location: true,
    time: "2:45 PM",
  },
];

function ChatPage() {
  const c = companions[0]; // Priya Sharma
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [attachOpen, setAttachOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoAsset = photoMap[c.photo];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    // Simulate companion response after 1.5 seconds for higher fidelity feel
    setTimeout(() => {
      const responseMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "companion",
        text: "Understood! See you shortly. 👍",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, responseMsg]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Handle image upload from file picker
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newMsg: Message = {
        id: Date.now().toString(),
        sender: "user",
        image: dataUrl,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, newMsg]);
      setAttachOpen(false);
    };
    reader.readAsDataURL(file);

    // Reset file input value so same file can be selected again
    e.target.value = "";
  };

  // Handle location share card
  const handleSendLocation = () => {
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      location: true,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setAttachOpen(false);
  };

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col h-full bg-background overflow-hidden relative">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />

        {/* Header - Video Call Removed, Back to Session Page */}
        <header className="shrink-0 px-4 pt-5 pb-3 bg-white flex items-center gap-3 shadow-soft z-10 border-b border-border/40">
          <Link
            to="/session"
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>

          {/* Avatar with image or initials */}
          <div className="relative">
            {photoAsset ? (
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-border">
                <img src={photoAsset} alt={c.name} className="w-full h-full object-cover" />
              </div>
            ) : (
              <Avatar name={c.name} color={c.color} size={40} />
            )}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          <div className="flex-1">
            <div className="font-bold text-sm text-foreground">{c.name}</div>
            <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </div>
          </div>

          {/* Call & Info button */}
          <button className="w-9 h-9 rounded-xl bg-primary-soft text-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
            <Phone size={15} />
          </button>
          <Link
            to={`/companion/${c.id}`}
            className="w-9 h-9 rounded-xl bg-muted text-muted-foreground flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
          >
            <Info size={15} />
          </Link>
        </header>

        {/* Message Feed Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-4 bg-[#FAF9FF]">
          {/* Timestamp Indicator */}
          <div className="text-center text-[10px] text-muted-foreground/80 font-bold my-2 tracking-wider">
            TODAY, 22 MAY
          </div>

          {/* Booking Active Status Badge */}
          <div className="flex justify-center">
            <div className="bg-primary-soft/80 border border-primary/5 text-primary text-[10px] font-black px-3.5 py-1.5 rounded-full shadow-soft flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Booking #MBK-20924 — Active
            </div>
          </div>

          {/* Messages list */}
          {messages.map((m) => {
            const isUser = m.sender === "user";

            // Render Location Card
            if (m.location) {
              return (
                <div key={m.id} className="flex justify-end animate-slide-up">
                  <div className="max-w-[75%] rounded-2xl rounded-tr-md overflow-hidden shadow-card border border-primary/10">
                    {/* Maps Preview Widget */}
                    <div className="h-28 w-44 bg-gradient-to-br from-emerald-50 to-blue-50 relative overflow-hidden">
                      <svg
                        className="absolute inset-0 w-full h-full opacity-60"
                        viewBox="0 0 200 130"
                      >
                        <path
                          d="M0 60 Q50 35 100 70 T200 50"
                          stroke="#6C3FE8"
                          strokeWidth="2.5"
                          fill="none"
                        />
                        <path
                          d="M0 100 Q80 80 160 110 T200 90"
                          stroke="#F59E0B"
                          strokeWidth="1.5"
                          fill="none"
                          opacity="0.4"
                        />
                      </svg>
                      {/* Pins */}
                      <div className="absolute left-[35%] top-[40%] flex flex-col items-center">
                        <div className="w-5 h-5 rounded-full bg-primary border-2 border-white shadow-soft flex items-center justify-center text-white text-[8px] font-bold">
                          You
                        </div>
                      </div>
                      <div className="absolute right-[30%] top-[35%] flex flex-col items-center animate-bounce">
                        <MapPin size={16} className="text-secondary fill-secondary/20" />
                      </div>
                    </div>

                    {/* Location Card Footer */}
                    <div className="bg-primary text-white text-[9px] font-bold px-3 py-2 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <MapPin size={10} /> Shared Location
                      </span>
                      <span className="opacity-80 font-normal">{m.time}</span>
                    </div>
                  </div>
                </div>
              );
            }

            // Render Image Card
            if (m.image) {
              return (
                <div
                  key={m.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"} animate-slide-up`}
                >
                  <div className="flex flex-col gap-1 max-w-[75%]">
                    <div className="rounded-2xl rounded-tr-sm overflow-hidden border border-border shadow-soft bg-white p-1">
                      <img
                        src={m.image}
                        alt="Sent attachment"
                        className="rounded-xl max-h-48 w-full object-cover"
                      />
                    </div>
                    <span
                      className={`text-[9px] text-muted-foreground/80 font-bold px-1 flex items-center gap-1 ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      {m.time}
                      {isUser && <CheckCheck size={11} className="text-primary" />}
                    </span>
                  </div>
                </div>
              );
            }

            // Render Normal Text Message
            return (
              <div
                key={m.id}
                className={`flex ${isUser ? "justify-end" : "justify-start"} animate-slide-up`}
              >
                <div className="flex flex-col gap-1 max-w-[75%]">
                  <div
                    className={`px-4 py-2.5 text-xs font-semibold shadow-soft ${
                      isUser
                        ? "bg-primary text-white rounded-2xl rounded-tr-sm grad-primary"
                        : "bg-white text-foreground rounded-2xl rounded-tl-sm border border-border"
                    }`}
                  >
                    {m.text}
                  </div>

                  {/* Message timestamp and read status */}
                  <span
                    className={`text-[9px] text-muted-foreground/80 font-bold px-1 flex items-center gap-1 ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {m.time}
                    {isUser && <CheckCheck size={11} className="text-primary" />}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Scroll Target */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer - Docked securely with shrink-0 */}
        <div className="shrink-0 bg-white border-t border-border px-3 py-3.5 flex items-center gap-2 z-10 shadow-card">
          <button
            onClick={() => setAttachOpen(true)}
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-all shrink-0"
          >
            <Paperclip size={18} />
          </button>

          <div className="flex-1 h-10 rounded-xl bg-muted px-3.5 flex items-center gap-2 border border-transparent focus-within:border-primary/20 focus-within:bg-white transition-all">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-xs font-medium text-foreground placeholder-muted-foreground"
            />
            <button className="text-muted-foreground hover:text-primary transition-colors shrink-0">
              <Smile size={18} />
            </button>
          </div>

          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-soft transition-all shrink-0 active:scale-95 ${
              inputText.trim()
                ? "grad-primary text-white hover:shadow-glow"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            <Send size={15} />
          </button>
        </div>

        {/* ----------------- ATTACHMENT BOTTOM SHEET ----------------- */}
        {attachOpen && (
          <div
            className="absolute inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setAttachOpen(false)}
          >
            <div
              className="w-full max-w-[420px] bg-white rounded-t-3xl shadow-glow p-5 flex flex-col gap-4 animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-bold text-sm text-foreground">Send Attachment</span>
                <button
                  onClick={() => setAttachOpen(false)}
                  className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Attachment Options */}
              <div className="grid grid-cols-2 gap-3 py-2">
                {/* Send Image Option */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl border border-border hover:border-primary/20 hover:bg-primary-soft/10 active:scale-95 transition-all text-center gap-2"
                >
                  <div className="w-12 h-12 rounded-full bg-primary-soft text-primary flex items-center justify-center">
                    <Image size={22} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">Image or Photo</div>
                    <div className="text-[9px] text-muted-foreground mt-0.5">Share from device</div>
                  </div>
                </button>

                {/* Send Location Option */}
                <button
                  onClick={handleSendLocation}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl border border-border hover:border-primary/20 hover:bg-primary-soft/10 active:scale-95 transition-all text-center gap-2"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center animate-pulse-dot">
                    <MapPin size={22} className="fill-emerald-600/10" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">Share Location</div>
                    <div className="text-[9px] text-muted-foreground mt-0.5">Share active map</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileFrame>
  );
}

function Bubble({ side, children }: { side: "left" | "right"; children: React.ReactNode }) {
  return (
    <div className={`flex ${side === "right" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-2.5 text-xs shadow-soft ${
          side === "right"
            ? "bg-primary text-white rounded-2xl rounded-tr-md"
            : "bg-white text-foreground rounded-2xl rounded-tl-md"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
export default ChatPage;
