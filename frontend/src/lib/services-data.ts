// Home Services Data — Urban Company Style
import acFoamImg from "../assest/services/ac-foam-service.jpeg";
import acGasImg from "../assest/services/ac-gas-refill.jpeg";
import acRepairImg from "../assest/services/ac-repair.jpeg";
import acInstallImg from "../assest/services/ac-installation.jpeg";

export type HomeService = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  duration: string;
  rating: number;
  reviews: number;
  tag?: string;
  category: string;
  image?: string;
};

export const homeServicesData: Record<string, HomeService[]> = {
  AC: [
    {
      id: "ac-foam-service",
      name: "AC Foam-Jet Service",
      description: "Deep foam-jet cleaning of indoor unit, filter wash, drain pipe cleaning & gas pressure check. Keeps your AC cooling like new.",
      price: 499,
      originalPrice: 699,
      duration: "1 hr",
      rating: 4.8,
      reviews: 12400,
      tag: "Best Seller",
      category: "AC",
      image: acFoamImg,
    },
    {
      id: "ac-gas-refill",
      name: "AC Gas Refill (R22 / R32)",
      description: "Refrigerant gas top-up for optimal cooling. Includes leak check and pressure test. Supports all AC brands.",
      price: 1299,
      originalPrice: 1599,
      duration: "1–2 hrs",
      rating: 4.7,
      reviews: 8700,
      tag: "Free leak check",
      category: "AC",
      image: acGasImg,
    },
    {
      id: "ac-repair",
      name: "AC Repair & Diagnosis",
      description: "Fixing cooling issues, PCB faults, compressor problems & electrical errors. Expert technician with genuine parts.",
      price: 299,
      originalPrice: 399,
      duration: "1–3 hrs",
      rating: 4.6,
      reviews: 5100,
      category: "AC",
      image: acRepairImg,
    },
    {
      id: "ac-installation",
      name: "AC Installation (Split)",
      description: "Full installation of split AC — wall mounting, copper pipe fitting, electrical wiring & test run included.",
      price: 999,
      originalPrice: 1299,
      duration: "2–3 hrs",
      rating: 4.9,
      reviews: 21000,
      tag: "Includes stand",
      category: "AC",
      image: acInstallImg,
    },
    {
      id: "ac-uninstall",
      name: "AC Uninstallation",
      description: "Safe disconnection and removal of split AC. Gas recovery & proper packing included for transport.",
      price: 499,
      duration: "1 hr",
      rating: 4.7,
      reviews: 3200,
      category: "AC",
    },
  ],

  Car: [
    {
      id: "car-wash-basic",
      name: "Basic Car Wash",
      description: "Exterior foam wash, wheel cleaning & wipe-down. Quick & spotless car cleaning at your doorstep.",
      price: 299,
      originalPrice: 399,
      duration: "45 min",
      rating: 4.6,
      reviews: 9800,
      tag: "Doorstep",
      category: "Car",
    },
    {
      id: "car-wash-interior",
      name: "Interior Deep Clean",
      description: "Complete interior vacuum, dashboard wipe, seat shampoo & odour removal. Leaves your car fresh inside.",
      price: 699,
      originalPrice: 999,
      duration: "1.5 hrs",
      rating: 4.8,
      reviews: 6500,
      tag: "Best Seller",
      category: "Car",
    },
    {
      id: "car-dent-repair",
      name: "Dent & Scratch Repair",
      description: "Paintless dent removal and scratch polishing. Minor dents fixed without repainting. All car models.",
      price: 999,
      originalPrice: 1499,
      duration: "2 hrs",
      rating: 4.5,
      reviews: 3100,
      category: "Car",
    },
    {
      id: "car-battery-replace",
      name: "Car Battery Replacement",
      description: "Old battery removal, new battery fitting & terminal cleaning. Warranty on new battery included.",
      price: 3499,
      originalPrice: 3999,
      duration: "30 min",
      rating: 4.8,
      reviews: 7200,
      tag: "Free inspection",
      category: "Car",
    },
  ],

  TV: [
    {
      id: "tv-repair",
      name: "TV Repair & Diagnosis",
      description: "Fix for no display, dead screen, sound issues, remote faults & HDMI port problems. All brands supported.",
      price: 299,
      originalPrice: 399,
      duration: "1–2 hrs",
      rating: 4.7,
      reviews: 11000,
      tag: "Free diagnosis",
      category: "TV",
    },
    {
      id: "tv-installation",
      name: "TV Wall Mount Installation",
      description: "Professional wall mounting of LED/OLED/QLED TV. Includes bracket fitting, wire management & level alignment.",
      price: 499,
      originalPrice: 699,
      duration: "1 hr",
      rating: 4.9,
      reviews: 18000,
      tag: "Best Seller",
      category: "TV",
    },
    {
      id: "tv-panel-replace",
      name: "TV Panel Replacement",
      description: "Cracked or dead LCD/LED panel replacement. 100% genuine panel with 90-day warranty.",
      price: 2999,
      duration: "2–4 hrs",
      rating: 4.6,
      reviews: 2100,
      category: "TV",
    },
  ],

  Fan: [
    {
      id: "fan-installation",
      name: "Ceiling Fan Installation",
      description: "New ceiling fan fitting with wiring, capacitor check & speed testing. Safe & secure installation.",
      price: 299,
      originalPrice: 399,
      duration: "45 min",
      rating: 4.8,
      reviews: 14500,
      tag: "Best Seller",
      category: "Fan",
    },
    {
      id: "fan-repair",
      name: "Fan Repair & Servicing",
      description: "Fix for slow speed, noise, not starting, capacitor issues & regulator faults. All fan brands.",
      price: 199,
      originalPrice: 299,
      duration: "30–60 min",
      rating: 4.6,
      reviews: 8900,
      tag: "Free inspection",
      category: "Fan",
    },
    {
      id: "fan-uninstall",
      name: "Ceiling Fan Uninstallation",
      description: "Safe removal of existing ceiling fan. Wire capping included. Ready for new fan installation.",
      price: 149,
      duration: "30 min",
      rating: 4.7,
      reviews: 4200,
      category: "Fan",
    },
  ],

  Mixer: [
    {
      id: "mixer-repair",
      name: "Mixer Grinder Repair",
      description: "Fix for not starting, burning smell, low speed & blade issues. All brands — Philips, Preethi, Bajaj & more.",
      price: 249,
      originalPrice: 349,
      duration: "30–60 min",
      rating: 4.7,
      reviews: 9600,
      tag: "Free diagnosis",
      category: "Mixer",
    },
    {
      id: "mixer-service",
      name: "Mixer Grinder Servicing",
      description: "Full servicing — brush replacement, bearing cleaning, jar wash & carbon deposit removal for better performance.",
      price: 349,
      duration: "1 hr",
      rating: 4.8,
      reviews: 5400,
      tag: "Best Seller",
      category: "Mixer",
    },
  ],

  WashingMachine: [
    {
      id: "wm-repair",
      name: "Washing Machine Repair",
      description: "Fix for not spinning, water leakage, error codes, drum noise & electrical faults. All top brands.",
      price: 349,
      originalPrice: 499,
      duration: "1–2 hrs",
      rating: 4.7,
      reviews: 13200,
      tag: "Free diagnosis",
      category: "WashingMachine",
    },
    {
      id: "wm-service",
      name: "Washing Machine Servicing",
      description: "Deep drum cleaning, filter wash, inlet/outlet pipe check & full performance test. Removes smell & buildup.",
      price: 499,
      originalPrice: 649,
      duration: "1.5 hrs",
      rating: 4.8,
      reviews: 7800,
      tag: "Best Seller",
      category: "WashingMachine",
    },
    {
      id: "wm-installation",
      name: "Washing Machine Installation",
      description: "Complete installation — inlet pipe fitting, drain setup, levelling & test wash. Front load & top load both.",
      price: 499,
      duration: "1 hr",
      rating: 4.9,
      reviews: 9100,
      category: "WashingMachine",
    },
  ],

  Decoration: [
    {
      id: "deco-birthday",
      name: "Birthday Decoration",
      description: "Balloon arrangement, banner, LED fairy lights & theme decoration at your venue. Setup in under 2 hours.",
      price: 1299,
      originalPrice: 1799,
      duration: "2 hrs",
      rating: 4.8,
      reviews: 8400,
      tag: "Best Seller",
      category: "Decoration",
    },
    {
      id: "deco-wedding",
      name: "Wedding / Ring Ceremony Decor",
      description: "Floral backdrop, stage setup, table centrepieces & entrance decoration. Customisable themes available.",
      price: 4999,
      originalPrice: 6999,
      duration: "4–6 hrs",
      rating: 4.9,
      reviews: 4200,
      tag: "Premium",
      category: "Decoration",
    },
    {
      id: "deco-balloon",
      name: "Balloon Decoration",
      description: "Balloon arch, bouquet clusters & ceiling balloons. Perfect for any party or celebration at home.",
      price: 799,
      originalPrice: 999,
      duration: "1 hr",
      rating: 4.7,
      reviews: 6100,
      category: "Decoration",
    },
  ],
};

// Categories that show services instead of companions
export const HOME_SERVICE_CATEGORIES = [
  "AC", "Car", "TV", "Fan", "Mixer", "WashingMachine", "Decoration"
];

export function formatReviews(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

export function getHomeServiceById(id: string): HomeService | undefined {
  for (const cat in homeServicesData) {
    const service = homeServicesData[cat].find(s => s.id === id);
    if (service) return service;
  }
  return undefined;
}
