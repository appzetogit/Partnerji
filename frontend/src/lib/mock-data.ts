// Indian number formatting (lakhs/crores style: ₹1,00,000)
export function formatINR(amount: number, withSymbol = true): string {
  const sign = amount < 0 ? "-" : "";
  const abs = Math.abs(Math.round(amount));
  const s = abs.toString();
  let last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const formatted = rest
    ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3
    : last3;
  return `${sign}${withSymbol ? "₹" : ""}${formatted}`;
}

export const provider = {
  name: "Priya Sharma",
  city: "Bhopal, MP",
  phone: "+91 98765 43210",
  rating: 4.9,
  reviews: 124,
  bookings: 248,
  totalEarned: 48200,
  walletBalance: 9920,
  hourlyRate: 450,
  bio: "Hi! I'm Priya, a cheerful and reliable companion based in Bhopal. I love shopping, fitness, and meeting new people. Friendly, punctual, and always ready to make your day better.",
  languages: ["Hindi", "English"],
  categories: ["Shopping Mate", "Gym Partner", "Dining Companion"],
};

export const upcomingBookings = [
  {
    id: "MBK-20924",
    customer: "Sunita Patel",
    avatar: "SP",
    service: "Event Partner",
    icon: "🎉",
    time: "5:00 PM",
    duration: "2 hrs",
    date: "Today",
    location: "Ravindra Bhavan, Bhopal",
    earning: 900,
    status: "Confirmed",
  },
  {
    id: "MBK-20925",
    customer: "Amit Sharma",
    avatar: "AS",
    service: "Dining Companion",
    icon: "🍽️",
    time: "8:00 PM",
    duration: "1.5 hrs",
    date: "Today",
    location: "Manohar Dairy, MP Nagar",
    earning: 607,
    status: "Confirmed",
  },
  {
    id: "MBK-20930",
    customer: "Rahul Verma",
    avatar: "RV",
    service: "Travel Companion",
    icon: "✈️",
    time: "10:00 AM",
    duration: "4 hrs",
    date: "Mon 26 May",
    location: "Bhopal Railway Station",
    earning: 1800,
    status: "Scheduled",
  },
];

export const newRequests = [
  {
    id: "REQ-1001",
    customer: "Ravi Kumar",
    avatar: "RK",
    customerRating: 4.8,
    verified: true,
    service: "Shopping Mate",
    icon: "🛍️",
    timeAgo: "2 min ago",
    date: "Today",
    timeRange: "5:00 PM – 7:00 PM",
    duration: "2 hrs",
    location: "DB Mall, Bhopal",
    distance: "1.4 km away",
    earning: 810,
    note: "Looking for someone to help me pick formal wear for a wedding",
    countdown: 754, // seconds
  },
  {
    id: "REQ-1002",
    customer: "Meera Joshi",
    avatar: "MJ",
    customerRating: 4.6,
    verified: true,
    service: "Dining Companion",
    icon: "🍽️",
    timeAgo: "8 min ago",
    date: "Tomorrow",
    timeRange: "8:00 PM – 9:30 PM",
    duration: "1.5 hrs",
    location: "Chatori Gali, Bhopal",
    distance: "2.1 km away",
    earning: 607,
    note: "Want company for dinner. Love trying new street food.",
    countdown: 1725,
  },
];

export const completedBookings = [
  { customer: "Neha Singh", avatar: "NS", service: "Gym Partner", icon: "💪", date: "18 May · 7:00 AM", duration: "1.5 hrs", rating: 5.0, earning: 525, review: "Best gym partner! Motivated me throughout the session." },
  { customer: "Sanjay Rao", avatar: "SR", service: "Study Partner", icon: "📚", date: "17 May · 4:00 PM", duration: "2 hrs", rating: 4.8, earning: 720, review: "Great experience! Knowledgeable and patient." },
  { customer: "Pooja Mehta", avatar: "PM", service: "Shopping Mate", icon: "🛍️", date: "15 May · 11:00 AM", duration: "3 hrs", rating: 4.9, earning: 1215, review: "Made my shopping day so much fun!" },
];

export const categories = [
  { icon: "🛍️", label: "Shopping Mate" },
  { icon: "✈️", label: "Travel Companion" },
  { icon: "🎉", label: "Event Partner" },
  { icon: "💪", label: "Gym Partner" },
  { icon: "🎮", label: "Gaming Partner" },
  { icon: "📚", label: "Study Partner" },
  { icon: "🍽️", label: "Dining Companion" },
  { icon: "🎊", label: "Party Companion" },
  { icon: "💬", label: "Conversation" },
  { icon: "🧑‍💼", label: "Personal Assistant" },
  { icon: "👴", label: "Senior Assistance" },
  { icon: "🌿", label: "Outdoor Partner" },
  { icon: "🏙️", label: "City Guide" },
  { icon: "💼", label: "Corporate Assist" },
];

export const earningsChart = [
  { day: "Mon", amount: 1200 },
  { day: "Tue", amount: 800 },
  { day: "Wed", amount: 2100 },
  { day: "Thu", amount: 0 },
  { day: "Fri", amount: 1800 },
  { day: "Sat", amount: 3100 },
  { day: "Sun", amount: 2400 },
];

export const transactions = [
  { type: "earning", customer: "Ravi Kumar", service: "Shopping Mate", duration: "2 hrs", amount: 900, date: "Today 5:00 PM" },
  { type: "earning", customer: "Sunita Patel", service: "Event Partner", duration: "2 hrs", amount: 900, date: "Today 7:00 PM" },
  { type: "earning", customer: "Neha Singh", service: "Gym Partner", duration: "1.5 hrs", amount: 525, date: "18 May" },
  { type: "earning", customer: "Sanjay Rao", service: "Study Partner", duration: "2 hrs", amount: 720, date: "17 May" },
  { type: "withdrawal", customer: "Withdrawal", service: "To HDFC ****4521", duration: "", amount: -5000, date: "15 May" },
];

export const notifications = [
  { id: 1, group: "today", icon: "🔔", title: "New Booking Request!", body: "Ravi Kumar wants to book you for Shopping Mate today at 3:00 PM. ₹900 earning.", time: "2 min ago", unread: true, action: "request" },
  { id: 2, group: "today", icon: "💰", title: "Earnings Credited", body: "₹900 added to your wallet for session with Sunita Patel", time: "1 hr ago", unread: true },
  { id: 3, group: "yesterday", icon: "⭐", title: "New Review!", body: "Neha Singh gave you 5 stars: 'Amazing gym session!'", time: "Yesterday", unread: false },
  { id: 4, group: "yesterday", icon: "📊", title: "Weekly Report", body: "You completed 11 bookings this week. Earned ₹9,920. Keep it up!", time: "Yesterday", unread: false },
  { id: 5, group: "yesterday", icon: "🏆", title: "Badge Earned!", body: "You've earned the 'Quick Responder' badge!", time: "Yesterday", unread: false },
  { id: 6, group: "earlier", icon: "⚠️", title: "Reminder", body: "You have a booking with Sanjay Rao tomorrow at 4:00 PM", time: "3 days ago", unread: false },
  { id: 7, group: "earlier", icon: "💸", title: "Withdrawal Successful", body: "₹5,000 transferred to HDFC ****4521", time: "5 days ago", unread: false },
];

export const reviews = [
  { name: "Ravi K.", avatar: "RK", rating: 5, time: "Today", text: "Priya was amazing! Super punctual and made our shopping trip so fun. Will book again.", service: "Shopping Mate · 2 hrs", helpful: 3 },
  { name: "Sunita M.", avatar: "SM", rating: 5, time: "Yesterday", text: "Very professional, helped me so much at the event. Highly recommended!", service: "Event Partner · 2 hrs", helpful: 5 },
  { name: "Neha S.", avatar: "NS", rating: 5, time: "18 May", text: "Best gym partner! Motivated me throughout the session.", service: "Gym Partner · 1.5 hrs", helpful: 2 },
  { name: "Sanjay R.", avatar: "SR", rating: 4, time: "17 May", text: "Good experience. Priya was knowledgeable and patient.", service: "Study Partner · 2 hrs", helpful: 1 },
  { name: "Anonymous", avatar: "A", rating: 1, time: "10 May", text: "Was 15 minutes late.", service: "Conversation · 1 hr", helpful: 0, response: "I sincerely apologize for the delay. I've made sure this won't happen again. —Priya" },
];
