export interface AboutPoint {
  title: string;
  desc: string;
  iconName: string;
}

export interface AboutContent {
  version: string;
  description: string;
  points: AboutPoint[];
  footer: string;
}

export interface TermsItem {
  title: string;
  desc: string;
}

export interface TermsContent {
  effectiveDate: string;
  headerDesc: string;
  termsList: TermsItem[];
}

export interface PrivacyItem {
  title: string;
  desc: string;
}

export interface PrivacyContent {
  effectiveDate: string;
  headerDesc: string;
  privacyList: PrivacyItem[];
}

export interface FAQItem {
  q: string;
  a: string;
  cat: string;
}

const DEFAULT_ABOUT: AboutContent = {
  version: "VERSION 1.0.0 (BUILD 214)",
  description: "Partnerji is a trusted platonic companionship platform matching social seekers with verified local companion partners for dinners, events, or mutual hobbies.",
  points: [
    {
      iconName: "ShieldCheck",
      title: "Vetted Companions",
      desc: "Every companion partner undergoes a robust identity background check, phone verification, and code-of-conduct training before meeting you."
    },
    {
      iconName: "Star",
      title: "Platonic Relationships Only",
      desc: "Partnerji is built purely for social matches (e.g. gym partner, business companion, dining, movie outings). We enforce platonic-only policies."
    },
    {
      iconName: "HelpCircle",
      title: "24/7 Security Operations",
      desc: "Our dispatch teams monitor live locations and respond immediately to SOS alarms triggered during active companionship events."
    }
  ],
  footer: "Designed with care in Mumbai, India.\n© 2026 Partnerji Technologies Private Limited. All rights reserved."
};

const DEFAULT_TERMS: TermsContent = {
  effectiveDate: "July 15, 2026",
  headerDesc: "By using our service, you agree to these Terms of Service. Please review them carefully before making any bookings.",
  termsList: [
    {
      title: "1. Service Description",
      desc: "Partnerji is a platform connecting users with local service partners and companions. We facilitate the booking process and safe payment transactions, but we do not employ or represent the partners directly.",
    },
    {
      title: "2. User Conduct & Respect",
      desc: "Users must treat all partners with absolute respect. Any form of harassment, abuse, requests for prohibited/illegal activities, or commercial romance will lead to immediate account suspension and potential legal actions.",
    },
    {
      title: "3. Safe Meetings",
      desc: "For your safety, always meet companion partners in well-lit, public spaces. Use the in-app chat features for all communications and follow our safety guidelines at all times.",
    },
    {
      title: "4. Payments & Refund Policy",
      desc: "All booking payments must be made through the Partnerji application. Off-platform transactions are strictly prohibited. Refunds for cancellations are governed by our specific partner cancellation policy.",
    },
    {
      title: "5. Cancellation & No-Show",
      desc: "Cancellations made within 2 hours of the scheduled booking time may attract a cancellation fee to compensate the partner. Frequent no-shows may result in a review and restriction of your account.",
    },
  ]
};

const DEFAULT_PRIVACY: PrivacyContent = {
  effectiveDate: "July 15, 2026",
  headerDesc: "We value your privacy. Learn how we handle your personal data and maintain a secure service ecosystem.",
  privacyList: [
    {
      title: "1. Privacy Commitment",
      desc: "At Partnerji, we respect your privacy and are committed to protecting your personal data. This policy explains how we collect and manage your information.",
    },
    {
      title: "2. Information Collection",
      desc: "We collect basic profile information (name, phone number, location, etc.) and booking preferences. We use this data strictly to match you with suitable partners and process requests.",
    },
    {
      title: "3. Location Sharing & Safety",
      desc: "For user and companion safety, we access real-time location data only during active bookings. This coordinates meeting points and powers emergency SOS alerts.",
    },
    {
      title: "4. Data Protection & Sharing",
      desc: "Your data is encrypted in transit and at rest. We never sell your personal information or transaction history to third-party marketing companies.",
    },
    {
      title: "5. Your Rights",
      desc: "You can update your personal information, delete active logs, or request complete account deletion at any time by contacting our support desk.",
    },
  ]
};

const DEFAULT_FAQS: FAQItem[] = [
  {
    cat: "Bookings",
    q: "How do I book a companion partner?",
    a: "Browse through verified companion profiles on the Explore page, select a partner that shares your interests, choose an available date and time slot, choose a public meetup location, and submit your booking request. Once they accept, you'll be notified.",
  },
  {
    cat: "Safety",
    q: "Is it safe to meet companions?",
    a: "Yes. Safety is our number one priority. Every companion partner undergoes government ID verification, phone check, and code of conduct training. In addition, our safety desk tracks GPS locations in real time during active bookings, and you can trigger the emergency SOS alarm at any point.",
  },
  {
    cat: "Payments",
    q: "Can I pay the companion in cash directly?",
    a: "No. All bookings, tips, and fees must be processed securely through the Partnerji application. Paying companions directly in cash or off-platform bank transfers is strictly prohibited and violates our terms of use.",
  },
  {
    cat: "Cancellations",
    q: "What is the cancellation policy?",
    a: "You can cancel bookings through the app. Cancellations made more than 2 hours before the scheduled time are fully refundable. Cancellations made within 2 hours of the session may attract a cancellation fee to compensate the companion's travel time.",
  },
  {
    cat: "Bookings",
    q: "Can I book the same companion again?",
    a: "Absolutely! You can find your previous companions in the Bookings history or by searching their name in Explore. You can re-book them directly from their profile screen.",
  },
  {
    cat: "Payments",
    q: "How do refunds work?",
    a: "Refunds for cancelled bookings are credited back to your Partnerji Wallet instantly, or can be returned to your original payment method (bank account/card) in 3-5 business days depending on your bank's policy.",
  },
  {
    cat: "Safety",
    q: "What constitutes appropriate behavior?",
    a: "All meetups are strictly platonic and public. Any requests for physical intimacy, private residential meetups, or inappropriate communication will result in immediate permanent suspension of your account. Please report any such behavior.",
  }
];

const getStorageItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error reading localStorage key", key, error);
    return defaultValue;
  }
};

const setStorageItem = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage key", key, error);
  }
};

export const getAboutContent = (): AboutContent => getStorageItem<AboutContent>("partnerji_dynamic_about", DEFAULT_ABOUT);
export const saveAboutContent = (content: AboutContent): void => setStorageItem<AboutContent>("partnerji_dynamic_about", content);

export const getTermsContent = (): TermsContent => getStorageItem<TermsContent>("partnerji_dynamic_terms", DEFAULT_TERMS);
export const saveTermsContent = (content: TermsContent): void => setStorageItem<TermsContent>("partnerji_dynamic_terms", content);

export const getPrivacyContent = (): PrivacyContent => getStorageItem<PrivacyContent>("partnerji_dynamic_privacy", DEFAULT_PRIVACY);
export const savePrivacyContent = (content: PrivacyContent): void => setStorageItem<PrivacyContent>("partnerji_dynamic_privacy", content);

export const getFAQContent = (): FAQItem[] => getStorageItem<FAQItem[]>("partnerji_dynamic_faqs", DEFAULT_FAQS);
export const saveFAQContent = (content: FAQItem[]): void => setStorageItem<FAQItem[]>("partnerji_dynamic_faqs", content);

// ── Banner Management ──────────────────────────────────────────────────────
export interface BannerItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;   // base64 or URL
  linkUrl?: string;
  active: boolean;
  createdAt: string;
}

const DEFAULT_BANNERS: BannerItem[] = [];  // empty by default; home.tsx falls back to static assets

export const getBanners = (): BannerItem[] => getStorageItem<BannerItem[]>("partnerji_dynamic_banners", DEFAULT_BANNERS);
export const saveBanners = (banners: BannerItem[]): void => setStorageItem<BannerItem[]>("partnerji_dynamic_banners", banners);

// ── Offer & Discount Management ────────────────────────────────────────────
export interface OfferItem {
  id: string;
  imageUrl: string;   // base64 or URL
  active: boolean;
  createdAt: string;
}

const DEFAULT_OFFERS: OfferItem[] = [];  // empty by default; home.tsx falls back to static assets

export const getOffers = (): OfferItem[] => getStorageItem<OfferItem[]>("partnerji_dynamic_offers", DEFAULT_OFFERS);
export const saveOffers = (offers: OfferItem[]): void => setStorageItem<OfferItem[]>("partnerji_dynamic_offers", offers);

