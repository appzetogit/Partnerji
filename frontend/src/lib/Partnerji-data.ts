// Shared mock data for Partnerji
export type Companion = {
  id: string;
  name: string;
  category: string;
  emoji: string;
  rating: number;
  reviews: number;
  price: number;
  distance: string;
  languages: string[];
  gender: "Male" | "Female";
  online: boolean;
  verified: boolean;
  bio: string;
  bookings: number;
  experience: string;
  color: string; // gradient avatar
  photo: string;
};

export const companions: Companion[] = [
  { id: "priya", name: "Priya Sharma", category: "Shopping Mate", emoji: "🛍️", rating: 4.9, reviews: 124, price: 450, distance: "0.8 km", languages: ["Hindi", "English"], gender: "Female", online: true, verified: true, bookings: 248, experience: "3 yrs", color: "from-pink-400 to-rose-500", photo: "images.jpg", bio: "Hi! I'm Priya, a cheerful and reliable companion based in Bhopal. I love exploring new places, shopping, and helping people. I'm punctual, friendly, and always make sure you have a great experience." },
  { id: "neha", name: "Neha Gupta", category: "Shopping Mate", emoji: "🛍️", rating: 4.8, reviews: 76, price: 420, distance: "1.5 km", languages: ["Hindi", "English"], gender: "Female", online: true, verified: false, bookings: 112, experience: "2 yrs", color: "from-pink-400 to-rose-500", photo: "images.jpg", bio: "Fashion blogger and personal shopper. Let me help you find the absolute best outfits, deals, and local shopping secrets around the city." },
  { id: "rahul", name: "Rahul Mehta", category: "Gym Partner", emoji: "💪", rating: 4.7, reviews: 89, price: 350, distance: "1.2 km", languages: ["Hindi", "English"], gender: "Male", online: true, verified: true, bookings: 156, experience: "2 yrs", color: "from-blue-400 to-indigo-500", photo: "images1.jpg", bio: "Certified fitness coach with 2+ years experience. Let's crush your fitness goals together!" },
  { id: "kabir", name: "Kabir Sen", category: "Gym Partner", emoji: "💪", rating: 4.9, reviews: 143, price: 480, distance: "2.3 km", languages: ["Hindi", "English", "Bengali"], gender: "Male", online: false, verified: true, bookings: 210, experience: "4 yrs", color: "from-blue-400 to-indigo-500", photo: "images1.jpg", bio: "Strength and conditioning enthusiast. Ready to help you stay motivated, correct your posture, and keep workouts engaging and active." },
  { id: "anjali", name: "Anjali Verma", category: "Travel Companion", emoji: "✈️", rating: 4.8, reviews: 201, price: 600, distance: "2.1 km", languages: ["Hindi", "English", "Marathi"], gender: "Female", online: false, verified: true, bookings: 312, experience: "4 yrs", color: "from-violet-400 to-purple-500", photo: "imagesdd.jpg", bio: "Travel enthusiast. Explored 18 states across India. Your perfect travel buddy." },
  { id: "amit", name: "Amit Sharma", category: "Travel Companion", emoji: "✈️", rating: 4.7, reviews: 95, price: 500, distance: "1.7 km", languages: ["Hindi", "English"], gender: "Male", online: true, verified: false, bookings: 128, experience: "3 yrs", color: "from-violet-400 to-purple-500", photo: "images1.jpg", bio: "Adventurer and road-tripper. I know the best routes, scenic spots, and local guide highlights. Perfect companion for weekend getaways." },
  { id: "rohan", name: "Rohan Das", category: "Gaming Partner", emoji: "🎮", rating: 4.6, reviews: 67, price: 300, distance: "0.5 km", languages: ["Hindi", "English"], gender: "Male", online: true, verified: true, bookings: 98, experience: "1 yr", color: "from-emerald-400 to-teal-500", photo: "Untitled.jpg", bio: "Pro gamer — Valorant Immortal, BGMI Conqueror. Let's win some games together!" },
  { id: "sneha", name: "Sneha Patel", category: "Study Partner", emoji: "📚", rating: 4.9, reviews: 145, price: 400, distance: "3.0 km", languages: ["Hindi", "English", "Gujarati"], gender: "Female", online: true, verified: true, bookings: 187, experience: "3 yrs", color: "from-amber-400 to-orange-500", photo: "images.jpg", bio: "MSc Computer Science. Patient tutor for engineering and competitive exams." },
  { id: "vikram", name: "Vikram Singh", category: "City Guide", emoji: "🏙️", rating: 4.8, reviews: 178, price: 550, distance: "1.8 km", languages: ["Hindi", "English"], gender: "Male", online: true, verified: true, bookings: 224, experience: "5 yrs", color: "from-cyan-400 to-blue-500", photo: "imagesd.jpg", bio: "Born and raised in Bhopal. Know every hidden gem of the City of Lakes." },
  { id: "meera", name: "Meera Joshi", category: "Dining Companion", emoji: "🍽️", rating: 4.7, reviews: 92, price: 500, distance: "0.9 km", languages: ["Hindi", "English"], gender: "Female", online: false, verified: true, bookings: 134, experience: "2 yrs", color: "from-rose-400 to-pink-500", photo: "imagesdd.jpg", bio: "Food blogger. I know the best restaurants in town — let's discover them together." },
  { id: "rhea", name: "Rhea Kapoor", category: "Dining Companion", emoji: "🍽️", rating: 4.8, reviews: 64, price: 460, distance: "1.1 km", languages: ["English", "Hindi"], gender: "Female", online: true, verified: false, bookings: 88, experience: "3 yrs", color: "from-rose-400 to-pink-500", photo: "imagesdd.jpg", bio: "Absolute foodie and cafe lover. Let's explore new brunch spots, street foods, and fine dining experiences around." },
  { id: "arjun", name: "Arjun Nair", category: "Event Partner", emoji: "🎉", rating: 4.5, reviews: 56, price: 700, distance: "4.2 km", languages: ["Hindi", "English", "Malayalam"], gender: "Male", online: true, verified: true, bookings: 78, experience: "2 yrs", color: "from-fuchsia-400 to-violet-500", photo: "Untitled.jpg", bio: "Event manager. Your perfect plus-one for weddings, parties, and corporate events." },
  { id: "karan", name: "Karan Malhotra", category: "Event Partner", emoji: "🎉", rating: 4.6, reviews: 42, price: 650, distance: "2.8 km", languages: ["Hindi", "English"], gender: "Male", online: true, verified: false, bookings: 54, experience: "3 yrs", color: "from-fuchsia-400 to-violet-500", photo: "Untitled.jpg", bio: "Outgoing and friendly host. Let's attend music concerts, festivals, or private social gatherings. Happy to be your social plus-one!" },
  { id: "siddharth", name: "Siddharth Roy", category: "Personal Assistant", emoji: "🧑‍💼", rating: 4.7, reviews: 81, price: 380, distance: "1.4 km", languages: ["English", "Hindi"], gender: "Male", online: true, verified: true, bookings: 110, experience: "2 yrs", color: "from-cyan-400 to-blue-500", photo: "imagesd.jpg", bio: "Highly organized and prompt assistant. Can assist with errands, schedule coordination, travel bookings, and support." },
  { id: "aditi", name: "Aditi Rao", category: "Corporate Assistant", emoji: "💼", rating: 4.8, reviews: 115, price: 750, distance: "2.5 km", languages: ["English", "Hindi", "Telugu"], gender: "Female", online: true, verified: true, bookings: 195, experience: "4 yrs", color: "from-teal-400 to-emerald-500", photo: "imagesdd.jpg", bio: "MBA graduate. Ideal companion for corporate events, networking mixers, business meets, and professional support." },
];

export const categories = [
  { name: "Shopping", emoji: "🛍️" }, { name: "Travel", emoji: "✈️" },
  { name: "Event", emoji: "🎉" }, { name: "Gym", emoji: "💪" },
  { name: "Dining", emoji: "🍽️" }, { name: "Assistant", emoji: "🧑‍💼" },
  { name: "Corporate", emoji: "💼" },
];

export const getCompanion = (id: string) => companions.find(c => c.id === id) ?? companions[0];

export const getCompanionsByCategory = (catName: string) => {
  const norm = catName.toLowerCase();
  return companions.filter(c => {
    const cCat = c.category.toLowerCase();
    
    // Explicit mappings to capture matches properly
    if (norm === "shopping" && cCat.includes("shopping")) return true;
    if (norm === "travel" && (cCat.includes("travel") || cCat.includes("guide") || cCat.includes("city"))) return true;
    if (norm === "event" && cCat.includes("event")) return true;
    if (norm === "gym" && cCat.includes("gym")) return true;
    if (norm === "dining" && cCat.includes("dining")) return true;
    if (norm === "assistant" && (cCat.includes("assistant") || cCat.includes("study") || cCat.includes("gaming"))) return true;
    if (norm === "corporate" && (cCat.includes("corporate") || cCat.includes("assistant"))) return true;
    
    return cCat.includes(norm) || norm.includes(cCat);
  });
};

export const initials = (name: string) =>
  name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();

