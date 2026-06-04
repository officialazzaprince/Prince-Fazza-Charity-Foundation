import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building, 
  Search, 
  MapPin, 
  GraduationCap, 
  Heart, 
  Users, 
  Home, 
  Flame, 
  BookOpen, 
  DollarSign, 
  CheckCircle, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Activity,
  HeartHandshake,
  Globe
} from "lucide-react";

const COUNTRIES_POOL = [
  { name: "United Arab Emirates", flag: "🇦🇪", names: ["Fatima Al-Mansoori", "Zayed Al-Maktoum", "Mariam Al-Suwaidi", "Sultan Al-Shamsi", "Amna Al-Hashimi", "Hamdan Al-Falasi", "Shamma Al-Mheiri", "Tareq Al-Suwaidi", "Latifa Al-Ghurair", "Yousuf Al-Balooshi", "Reem Al-Marzouqi", "Faisal Al-Qasimi", "Saeed Al-Zahmi", "Hessa Al-Teneiji", "Khaled Al-Suwaidi"] },
  { name: "United States", flag: "🇺🇸", names: ["Alexander Reed", "Emily Johnson", "Sophia Martinez", "Matthew Vance", "Michael Chang", "Sarah Jenkins", "David Miller", "Jessica Taylor", "James Wilson", "Amanda Davis"] },
  // Europe
  { name: "Germany", flag: "🇩🇪", names: ["Lukas Weber", "Maximilian Scholz", "Clara Fischer", "Leon Müller", "Emma Wagner", "Jonas Becker", "Sabine Richter"] },
  { name: "Austria", flag: "🇦🇹", names: ["Tobias Gruber", "Anna Steiner", "Felix Huber", "Katharina Wagner", "Julia Berger", "Sebastian Pichler"] },
  { name: "Switzerland", flag: "🇨🇭", names: ["Beat Sutter", "Elena Keller", "Marc Dubois", "Chantal Meier", "Thomas Voser", "Soline Favre"] },
  { name: "Ireland", flag: "🇮🇪", names: ["Conor O'Connor", "Siobhan Murphy", "Sean Kelly", "Aoife Byrne", "Liam Walsh", "Oisin Fitzgerald"] },
  { name: "Portugal", flag: "🇵🇹", names: ["João Silva", "Ana Rodrigues", "Pedro Santos", "Beatriz Costa", "Tiago Oliveira", "Mariana Pinto"] },
  { name: "Spain", flag: "🇪🇸", names: ["Carlos Gomez", "Sofia Lopez", "Mateo Hernandez", "Lucia Diaz", "Alejandro Ruiz", "Paula Torres"] },
  { name: "Finland", flag: "🇫🇮", names: ["Matti Koskinen", "Aino Laine", "Eetu Virtanen", "Sofia Heikkinen", "Lauri Niemi", "Helmi Mäki"] },
  { name: "Estonia", flag: "🇪🇪", names: ["Kristjan Tamm", "Laura Kallas", "Martin Rebane", "Liis Saar", "Oliver Kivi", "Mari Lepp"] },
  { name: "Hungary", flag: "🇭🇺", names: ["Bence Kovács", "Zsófia Nagy", "Dávid Tóth", "Eszter Szabó", "Péter Horváth", "Réka Kiss"] },
  // Asia
  { name: "Japan", flag: "🇯🇵", names: ["Hiroshi Tanaka", "Yuki Sato", "Kenji Takahashi", "Aoi Watanabe", "Daiki Sato", "Sakura Ito"] },
  { name: "South Korea", flag: "🇰🇷", names: ["Min-jun Kim", "Ji-won Park", "Seo-yeon Lee", "Jung-hoon Choi", "Ye-jun Choi", "Su-bin Han"] },
  { name: "Malaysia", flag: "🇲🇾", names: ["Ahmad Razak", "Siti Aminah", "Ravi Chandran", "Mei Ling Tan", "Mohammad Afiq", "Jasmin Kaur"] },
  { name: "Singapore", flag: "🇸🇬", names: ["Benjamin Tan", "Chloe Seah", "Marcus Lim", "Sherlene Goh", "Ryan Ong", "Hui Min Ng"] },
  { name: "India", flag: "🇮🇳", names: ["Arjun Mehta", "Priya Sharma", "Rohan Verma", "Ananya Reddy", "Vikram Sen", "Kavita Rao"] },
  { name: "Kazakhstan", flag: "🇰🇿", names: ["Alibek Smailov", "Aruzhan Nurtas", "Daniyar Kadyrov", "Asel Omarova", "Timur Akhmetov", "Zarina Baizhanova"] },
  // Africa (Allowed non-excluded)
  { name: "Morocco", flag: "🇲🇦", names: ["Youssef Alaoui", "Khadija Bennani", "Amine Filali", "Fatima-Zahra Tazi"] },
  { name: "Egypt", flag: "🇪🇬", names: ["Ahmed Mansour", "Mona Hassan", "Tarek El-Sayed", "Yasmine Fathy"] },
  { name: "Ghana", flag: "🇬🇭", names: ["Kofi Mensah", "Ama Osei", "Kwame Asante", "Abena Owusu"] },
  { name: "Senegal", flag: "🇸🇳", names: ["Amadou Diop", "Mariama Diallo", "Ousmane Ndiaye", "Sokhna Fall"] }
];

const DONATION_VALUES = [250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];
const STATUS_TYPES = ["Completed", "Processing", "Pending"];

export function generateRandomDonation(id: number) {
  const r = Math.random();
  let selectedCountry;
  
  if (r < 0.55) {
    selectedCountry = COUNTRIES_POOL[0]; // UAE (~55% - highest frequency, most visible)
  } else if (r < 0.75) {
    selectedCountry = COUNTRIES_POOL[1]; // US (~20%)
  } else if (r < 0.90) {
    // Europe (indices 2 to 10)
    const europeIndices = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    const idx = europeIndices[Math.floor(Math.random() * europeIndices.length)];
    selectedCountry = COUNTRIES_POOL[idx];
  } else if (r < 0.997) {
    // Asia (indices 11 to 16)
    const asiaIndices = [11, 12, 13, 14, 15, 16];
    const idx = asiaIndices[Math.floor(Math.random() * asiaIndices.length)];
    selectedCountry = COUNTRIES_POOL[idx];
  } else {
    // Africa allowed non-excluded (Morocco, Egypt, Ghana, Senegal) (~0.3% frequency)
    const africaIndices = [17, 18, 19, 20];
    const idx = africaIndices[Math.floor(Math.random() * africaIndices.length)];
    selectedCountry = COUNTRIES_POOL[idx];
  }
  
  const nameIdx = Math.floor(Math.random() * selectedCountry.names.length);
  const donorName = selectedCountry.names[nameIdx];
  
  // Decide the amount: min 1000, max 100000. Preferred range 2000 to 90000.
  // Generate realistic non-rounded amounts.
  let amount = 0;
  if (Math.random() < 0.85) {
    // 85% chance of being in preferred range $2,000 to $90,000
    amount = 2000 + Math.floor(Math.random() * 88000);
  } else {
    // 15% chance of being outside preferred range, but within $1,000 to $100,000
    if (Math.random() < 0.5) {
      amount = 1000 + Math.floor(Math.random() * 1000); // $1,000 to $2,000
    } else {
      amount = 90000 + Math.floor(Math.random() * 10000); // $90,000 to $100,000
    }
  }

  // Ensure it's not a round number by adding/subtracting a small random number of dollars if it ends in 00 or 50
  if (amount % 100 === 0 || amount % 50 === 0) {
    amount += (Math.floor(Math.random() * 99) + 1);
  }
  
  // Donations should enter with a random initial status of Pending or Processing
  const startingStatuses = ["Pending", "Processing"];
  const status = startingStatuses[Math.floor(Math.random() * startingStatuses.length)];
  
  return {
    id,
    name: donorName,
    country: selectedCountry.name,
    flag: selectedCountry.flag,
    amount,
    status,
    timestamp: Date.now()
  };
}

export interface GalleryItem {
  id: number;
  region: string;
  theme: string;
  title: string;
  description: string;
  imageUrl: string;
  budget: string;
  completionYear: string;
}

// 50 unique regions requested
const REGIONS: string[] = [
  "Karnataka", "Maharashtra", "Lào Cai", "Đồng Tháp", "Nagano", "Akita", "Selangor", "Sabah", "West Java", "Central Java",
  "Arkhangai", "Almaty Region", "Bavaria", "Lower Saxony", "County Clare", "County Kerry", "Faro District", "Aragón", "Galicia", "Valais",
  "Styria", "Bács-Kiskun", "Pärnu County", "North Karelia", "Highland", "Brașov", "Smolyan", "Ontario", "Manitoba", "Saskatchewan",
  "New Mexico", "Utah", "Michigan", "Kerala", "Telangana", "An Giang", "Bắc Giang", "Yamagata", "Hokkaido", "Sarawak",
  "East Java", "Övörkhangai", "Mangystau", "Alberta", "British Columbia", "Arizona", "Nevada", "Wisconsin", "Oregon", "Montana"
];

// The 8 thematic categories requested
const THEMES = [
  "Aging schools requiring renovation",
  "Aging hospitals requiring renovation",
  "Homelessness challenges",
  "Community shelter initiatives",
  "Food distribution and food bank support",
  "Hunger relief operations",
  "Mentorship and youth development",
  "Rural infrastructure needs"
];

function seededRandom(seedStr: string) {
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(31, h) + seedStr.charCodeAt(i) | 0;
  }
  return function() {
    let t = h += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getSourcedFundingAt(timestamp: number): number {
  const BASE_VALUE = 1902500000;
  const START_TIME = Date.UTC(2026, 5, 3, 0, 0, 0); // June 3, 2026 UTC
  
  if (timestamp <= START_TIME) {
    return BASE_VALUE;
  }

  let currentValue = BASE_VALUE;
  const msInDay = 24 * 60 * 60 * 1000;
  let currentDayMs = START_TIME;
  
  while (currentDayMs + msInDay <= timestamp) {
    const d = new Date(currentDayMs);
    const dateStr = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
    const rand = seededRandom(dateStr);
    const dailyGrowthPct = 0.001 + rand() * 0.007; // 0.1% to 0.8%
    currentValue = currentValue * (1 + dailyGrowthPct);
    currentDayMs += msInDay;
  }
  
  const remainingMs = timestamp - currentDayMs;
  const d = new Date(currentDayMs);
  const dateStr = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
  const rand = seededRandom(dateStr);
  const dailyGrowthPct = 0.001 + rand() * 0.007; // 0.1% to 0.8%
  
  const weights: number[] = [];
  let totalWeight = 0;
  for (let i = 0; i < 24; i++) {
    const w = 0.1 + rand() * 0.9;
    weights.push(w);
    totalWeight += w;
  }
  const normalizedWeights = weights.map(w => w / totalWeight);
  
  const hourFraction = remainingMs / (3600 * 1000);
  const hourIndex = Math.floor(hourFraction);
  const subHourFraction = hourFraction - hourIndex;
  
  const cumWeightBefore = normalizedWeights.slice(0, Math.min(24, hourIndex)).reduce((sum, w) => sum + w, 0);
  const currentWeight = hourIndex < 24 ? normalizedWeights[hourIndex] : 0;
  const cumWeightNow = cumWeightBefore + currentWeight * Math.min(1, Math.max(0, subHourFraction));
  
  const todayMultiplier = 1 + (dailyGrowthPct * cumWeightNow);
  return Math.floor(currentValue * todayMultiplier);
}

export const AnimatedCounter: React.FC<{ value: number }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const startVal = displayValue;
    const endVal = value;
    if (startVal === endVal) return;

    const startTime = performance.now();
    const duration = 950; // slightly under 1s to match 1s check frequency

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress); // ease out quad
      
      const nextVal = Math.floor(startVal + (endVal - startVal) * easeProgress);
      setDisplayValue(nextVal);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endVal);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <span className="text-base font-bold font-mono text-emerald-400">
      {formatCurrency(displayValue)}
    </span>
  );
};

const SCHOOLS_DATA = [
  { name: "Silver Banyan Academy", region: "Karnataka", imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80", description: "Structural roofing reinforcement, foundation healing, and safety upgrades for classrooms serving children in rural Karnataka." },
  { name: "Horizon Crest Institute", region: "Maharashtra", imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80", description: "Comprehensive seismic safety modifications, electrical re-wiring, and weathered plaster restoration in the main learning wings." },
  { name: "Lotus Meridian School", region: "Lào Cai", imageUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&q=80", description: "High-altitude winterization, structural wall support, and replacement of outdated wooden desks with thermal-retentive classrooms." },
  { name: "Emerald Delta Academy", region: "Đồng Tháp", imageUrl: "https://images.unsplash.com/photo-1562774053-4d0061e3f16c?auto=format&fit=crop&w=600&q=80", description: "Elevated foundation reinforcements to protect against seasonal flooding, sanitary drainage grids, and secure roof trusses." },
  { name: "Sunridge Technical College", region: "Nagano", imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80", description: "Upgrading vocational workspaces, electrical insulation, vintage structural support blocks, and safety ventilation." },
  { name: "Kiyora Learning Institute", region: "Akita", imageUrl: "https://images.unsplash.com/photo-1584697964358-3e14ca57b435?auto=format&fit=crop&w=600&q=80", description: "Providing extensive masonry restoration, roof leak prevention, and updating outdated heating pipelines for cold climates." },
  { name: "Golden Cedar School", region: "Selangor", imageUrl: "https://images.unsplash.com/photo-1510531704581-5b2870972060?auto=format&fit=crop&w=600&q=80", description: "Upgrading community school buildings with ceiling insulation, fire-resistant doors, and secure administrative modules." },
  { name: "Pacific Ridge Academy", region: "Sabah", imageUrl: "https://images.unsplash.com/photo-1541829011-54b2aee0f772?auto=format&fit=crop&w=600&q=80", description: "Securing weathered structural elements, clean rainwater collection integration, and rebuilding outdoor learning pathways." },
  { name: "Blue Harbor Preparatory School", region: "West Java", imageUrl: "https://images.unsplash.com/photo-1508824224183-f5d62b4acdeb?auto=format&fit=crop&w=600&q=80", description: "Revitalizing aging academic blocks, repairing moisture-damaged masonry, and installing secure window framing." },
  { name: "Meridian Valley Institute", region: "Central Java", imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80", description: "Eradicating interior masonry dampness, reinforcement of load-bearing wood pillars, and installing modern sanitation units." },
  { name: "Jade Falcon Academy", region: "Arkhangai", imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80", description: "Insulating vulnerable frame structures, upgrading high-capacity boilers, and preparing learning centers for severe winter storms." },
  { name: "Silk Route Science School", region: "Almaty Region", imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80", description: "Reconstruction of damaged brick outer walls, modernizing window installations, and upgrading physical research workspaces." },
  { name: "Alderstone Academy", region: "Bavaria", imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80", description: "Historic structural preservation, roof tile restorations, and installation of power-efficient regional safety heating." },
  { name: "North Elbe Institute", region: "Lower Saxony", imageUrl: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&w=600&q=80", description: "Reinforcement of foundational supports, wall crack repairs, and upgrading interior classrooms with modern safety standards." },
  { name: "Greenmoor School", region: "County Clare", imageUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80", description: "Combating coastal moisture erosion, replacing structural timber trusses, and securing educational spaces." },
  { name: "Atlantic Ridge College", region: "County Kerry", imageUrl: "https://images.unsplash.com/photo-1560785496-3c9d2787718e?auto=format&fit=crop&w=600&q=80", description: "Protecting local learning classrooms from gale-force winds with reinforced window systems and weatherproof external paints." },
  { name: "Silver Coast Academy", region: "Faro District", imageUrl: "https://images.unsplash.com/photo-1622398925373-3b2223a31c5b?auto=format&fit=crop&w=600&q=80", description: "Structural repairs to weathered stucco facades, solar safety system installation, and improving ventilation in seaside classrooms." },
  { name: "Iberian Heights School", region: "Aragón", imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80", description: "Seismic retrofitting of aging mountainside classrooms, concrete repairs, and updating regional sanitation units." },
  { name: "Rivergate Preparatory School", region: "Galicia", imageUrl: "https://images.unsplash.com/photo-1516534775068-ba3e84589d90?auto=format&fit=crop&w=600&q=80", description: "Rehabilitation of rain-damaged historic walls, drainage pipe restoration, and direct educational facility enhancements." },
  { name: "Alpine Crest Institute", region: "Valais", imageUrl: "https://images.unsplash.com/photo-1568214379698-8aeb8c6c6ac8?auto=format&fit=crop&w=600&q=80", description: "Thermal wall envelope lining, roof structural snow-load capacity upgrades, and installing clean energy infrastructure." },
  { name: "Linden Grove Academy", region: "Styria", imageUrl: "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?auto=format&fit=crop&w=600&q=80", description: "Upgrading timber layouts, timber roof treatments against pests, and restoring general assembly halls." },
  { name: "Danube Horizon School", region: "Bács-Kiskun", imageUrl: "https://images.unsplash.com/photo-1548048026-5a1a941d93af?auto=format&fit=crop&w=600&q=80", description: "Erosion repairs on brick structures, building energy-aware classroom partitions, and updating physical school security and lighting." },
  { name: "Baltic Pines School", region: "Pärnu County", imageUrl: "https://images.unsplash.com/photo-1585433247385-d13ba81b1c02?auto=format&fit=crop&w=600&q=80", description: "Moisture insulation, boiler unit diagnostics and replacement, and building weather-tight storm porches." },
  { name: "Aurora Technical Institute", region: "North Karelia", imageUrl: "https://images.unsplash.com/photo-1501290808185-3197a250f24e?auto=format&fit=crop&w=600&q=80", description: "Refitting specialized mechanical workshops with secure flooring, thermal insulations, and safe electrical lines." },
  { name: "Highland Beacon Academy", region: "Highland", imageUrl: "https://images.unsplash.com/photo-1525920980462-9e010e68050e?auto=format&fit=crop&w=600&q=80", description: "Stone masonry damp-proofing, replacing ancient dry-rot ceiling structures, and creating sterile, warm common areas." },
  { name: "Carpathian Learning Centre", region: "Brașov", imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=600&q=80", description: "Structural roof repairs, replacement of cracked brick arches, and provisioning of energy-independent classroom heaters." },
  { name: "Sapphire Valley School", region: "Smolyan", imageUrl: "https://images.unsplash.com/photo-1591123720164-de1348028a11?auto=format&fit=crop&w=600&q=80", description: "Restoring mountain community classrooms, fixing water inflow lines, and replacing severely weathered exterior sidings." },
  { name: "Red Maple Academy", region: "Ontario", imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80", description: "Complete upgrades to the mechanical ventilation grids, structural floor leveling, and roofing safety coatings." },
  { name: "Northern Lights Institute", region: "Manitoba", imageUrl: "https://images.unsplash.com/photo-1607237138185-eedd996ee574?auto=format&fit=crop&w=600&q=80", description: "Sub-zero climate winterization, high-efficiency insulation of classrooms, and installing emergency power setups." },
  { name: "Prairie Horizon School", region: "Saskatchewan", imageUrl: "https://images.unsplash.com/photo-1491841573178-8af01fc64c4e?auto=format&fit=crop&w=600&q=80", description: "Foundation stabilization of schoolhouses, repair of exterior weathering siding, and upgraded fire exits." },
  { name: "Desert Crest Academy", region: "New Mexico", imageUrl: "https://images.unsplash.com/photo-1513258496099-48168024addd?auto=format&fit=crop&w=600&q=80", description: "Adobe structure restoration, thermal ventilation upgrades to counter peak heat, and shading structure installs." },
  { name: "Blue Canyon Preparatory School", region: "Utah", imageUrl: "https://images.unsplash.com/photo-1473642514574-70152b7d3f8f?auto=format&fit=crop&w=600&q=80", description: "Erosion barrier construction around school campuses, window safety replacements, and upgrading indoor sports flooring." },
  { name: "Great Lakes Technical Institute", region: "Michigan", imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80", description: "Revitalization of aging industrial labs, roof membrane replacements, and complete electrical modernizations." }
];

const HOSPITALS_DATA = [
  { name: "Valley Crest Medical Centre", region: "Kerala", imageUrl: "https://images.unsplash.com/photo-1586773860418-d3b3b998de66?auto=format&fit=crop&w=600&q=80", description: "Sanitation grid renewal, plumbing restoration in older maternity wards, and emergency ventilation upgrades." },
  { name: "Banyan Plains General Hospital", region: "Telangana", imageUrl: "https://images.unsplash.com/photo-1538108176447-280586497d96?auto=format&fit=crop&w=600&q=80", description: "Complete restoration of worn outpatient wards, electrical safety rewiring, and sterilization pipeline repairs." },
  { name: "Lotus River Hospital", region: "An Giang", imageUrl: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=600&q=80", description: "Flood-proofing clinics, elevation of ground floor trauma units, and installing secure water-filtration loops." },
  { name: "Sunrise Provincial Hospital", region: "Bắc Giang", imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80", description: "Modernizing vintage isolation rooms, structural concrete repairs, and restoring worn floor and wall treatments." },
  { name: "Shinsei Community Hospital", region: "Yamagata", imageUrl: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=600&q=80", description: "Seismic retrofitting of aging mountainside health wards, backup heating lines, and general drywall repairs." },
  { name: "North Pine Regional Hospital", region: "Hokkaido", imageUrl: "https://images.unsplash.com/photo-1551076805-e186902b427b?auto=format&fit=crop&w=600&q=80", description: "Upgrading snow-damaged roof systems, high-efficiency boilers, and thermal insulation of clinic rooms." },
  { name: "Emerald Coast Medical Centre", region: "Sarawak", imageUrl: "https://images.unsplash.com/photo-1504813184591-015578c773a1?auto=format&fit=crop&w=600&q=80", description: "Equipping outdated remote wards with sterile ventilation, emergency solar cells, and dampness remediation." },
  { name: "Nusantara Valley Hospital", region: "East Java", imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80", description: "Upgrading pediatric health wings, fixing sanitary drainage leaks, and rebuilding rusted access ramps." },
  { name: "Steppe Horizon Hospital", region: "Övörkhangai", imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80", description: "Comprehensive weather-proofing for extreme seasonal drafts, masonry block repairs, and emergency ward expansions." },
  { name: "Caspian Frontier Medical Centre", region: "Mangystau", imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80", description: "Plumbing system diagnostics, rust prevention treatments for clean water supply lines, and clinical clinic updates." },
  { name: "Rhine Valley General Hospital", region: "Rhine-Westphalia, Germany", imageUrl: "https://images.unsplash.com/photo-1516549589360-406a6aae9418?auto=format&fit=crop&w=600&q=80", description: "Historic building compliance restorations, ventilation piping overhauls, and surgical room sanitation." },
  { name: "Alpine Regional Medical Centre", region: "Tyrol, Austria", imageUrl: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=600&q=80", description: "Outdated thermal envelope lining, seismic floor leveling, and upgrading pediatric emergency rooms." },
  { name: "Emerald Coast Hospital", region: "Cork, Ireland", imageUrl: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=600&q=80", description: "Combating sea moisture erosion, roof repairs on operating theaters, and emergency power generator restorations." },
  { name: "Atlantic Community Hospital", region: "Algarve, Portugal", imageUrl: "https://images.unsplash.com/photo-1618015358954-115ef1ed6515?auto=format&fit=crop&w=600&q=80", description: "Restoring cracked plaster on oceanside clinic buildings, cooling loop enhancements, and sterile unit repairs." },
  { name: "Sierra Norte Medical Centre", region: "Madrid, Spain", imageUrl: "https://images.unsplash.com/photo-1619087983125-b0d1d22ed18b?auto=format&fit=crop&w=600&q=80", description: "Masonry restoration on historic healthcare facades, internal lift overhauls, and updating general wards." },
  { name: "Baltic Health Institute Hospital", region: "Harju County, Estonia", imageUrl: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?auto=format&fit=crop&w=600&q=80", description: "Insulation upgrades for freezing winter conditions, mold dampening in clinics, and window replacement." },
  { name: "Aurora Lakes Hospital", region: "Lapland, Finland", imageUrl: "https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=600&q=80", description: "Specialized clinical heating, sub-zero building drafts fixing, and modern bio-safety partition walls." },
  { name: "Highland Regional Hospital", region: "Inverness, Scotland", imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80", description: "Repairing ancient dry-rot ceiling beams over clinic corridors, upgrading water pipes, and floor refitting." },
  { name: "Carpathian Medical Centre", region: "Sibiu, Romania", imageUrl: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=600&q=80", description: "Replaced structural beams, damp-proofing in general patient quarters, and repairing heating networks." },
  { name: "Black Sea Community Hospital", region: "Varna, Bulgaria", imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80", description: "Rehabilitation of weathered clinical facade elements, sanitation line upgrades, and sterile zone painting." },
  { name: "Maple River Hospital", region: "Ontario, Canada", imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80", description: "Complete overhaul of the medical waste plumbing line, replacement of old tile floors, and structural roof repairs." },
  { name: "Northern Prairie Medical Centre", region: "Alberta, Canada", imageUrl: "https://images.unsplash.com/photo-1632833239869-a37e31580662?auto=format&fit=crop&w=600&q=80", description: "Mechanical air ventilation upgrades, foundational wall seals, and complete lighting replacements in treatment rooms." },
  { name: "Pacific Timber Hospital", region: "British Columbia, Canada", imageUrl: "https://images.unsplash.com/photo-1582560062955-402d183a2979?auto=format&fit=crop&w=600&q=80", description: "Repair of exterior concrete siding, moisture sealing in coastal weather, and structural integrity reinforcements." },
  { name: "Desert Valley Regional Hospital", region: "Arizona, USA", imageUrl: "https://images.unsplash.com/photo-1643818657256-42ed2d3e5eb5?auto=format&fit=crop&w=600&q=80", description: "High-efficiency ventilation retrofits to handle extreme heat, roof heat shields, and water cooling line enhancements." },
  { name: "Canyon Ridge Medical Centre", region: "Nevada, USA", imageUrl: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&w=600&q=80", description: "Seismic stabilizer repairs on major structural blocks, emergency lighting restoration, and backup power integrations." },
  { name: "Great Lakes Community Hospital", region: "Wisconsin, USA", imageUrl: "https://images.unsplash.com/photo-1584516110906-ac264a4d6f45?auto=format&fit=crop&w=600&q=80", description: "HVAC filtration replacements, brick masonry crack injections, and renovation of physical clinical desks and drawers." },
  { name: "Redwood Plains Hospital", region: "Oregon, USA", imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80", description: "Moisture insulation barriers, siding re-cladding to withstand rain, and general interior safety updates." },
  { name: "Frontier Health Medical Centre", region: "Montana, USA", imageUrl: "https://images.unsplash.com/photo-1631557001260-0f214ee48a21?auto=format&fit=crop&w=600&q=80", description: "Boiler replacement for intense cold surges, floor concrete re-filling, and emergency unit window insulation." }
];

// Map each region to a high quality project card
export const generateGalleryItems = (): GalleryItem[] => {
  const schoolItems: GalleryItem[] = SCHOOLS_DATA.map((school, index) => {
    const budgets = ["$980,000", "$1,250,000", "$2,100,000", "$1,450,000", "$850,000", "$1,150,000", "$1,350,000"];
    const budget = budgets[index % budgets.length];
    return {
      id: index,
      region: school.region,
      theme: "Aging schools requiring renovation",
      title: school.name,
      description: school.description,
      imageUrl: school.imageUrl,
      budget,
      completionYear: "2026"
    };
  });

  const hospitalItems: GalleryItem[] = HOSPITALS_DATA.map((hosp, index) => {
    const budgets = ["$1,450,000", "$2,100,000", "$3,200,000", "$1,850,000", "$950,000", "$1,650,000", "$2,450,000"];
    const budget = budgets[index % budgets.length];
    return {
      id: 100 + index,
      region: hosp.region,
      theme: "Aging hospitals requiring renovation",
      title: hosp.name,
      description: hosp.description,
      imageUrl: hosp.imageUrl,
      budget,
      completionYear: "2026"
    };
  });

  const otherItems: GalleryItem[] = [];
  const otherData = [
    {
      theme: "Homelessness challenges",
      title: "Urban Shelter Integration Support",
      description: "Direct outreach, supply coordinate networks, and transitional housing bridges for families experiencing hardship.",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
      region: "Wisconsin, USA",
      budget: "$1,200,000"
    },
    {
      theme: "Homelessness challenges",
      title: "Family Hygiene & Warmth Logistics",
      description: "Immediate delivery of survival kits, clean apparel blankets, and sanitary equipment directly to streets and field hubs.",
      imageUrl: "https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=600&q=80",
      region: "Akita, Japan",
      budget: "$850,000"
    },
    {
      theme: "Homelessness challenges",
      title: "Emergency Medical & Dental Screenings",
      description: "Sponsoring specialized health screening tours and diagnostic clinics targeting unsheltered communities.",
      imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&w=600&q=80",
      region: "Lower Saxony, Germany",
      budget: "$1,100,000"
    },
    {
      theme: "Community shelter initiatives",
      title: "Sovereign Community Shield Shelter",
      description: "Building weatherproof temporary shelters with central heat, hot shower grids, and modular family blocks.",
      imageUrl: "https://images.unsplash.com/photo-1541802614981-3a991ff79790?auto=format&fit=crop&w=600&q=80",
      region: "Almaty Region, Kazakhstan",
      budget: "$4,650,000"
    },
    {
      theme: "Community shelter initiatives",
      title: "Resilient Solar Power Shelter Grids",
      description: "Retrofitting village emergency shelters with standalone solar panels, batteries, and clean water wells.",
      imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80",
      region: "Mangystau, Kazakhstan",
      budget: "$3,800,000"
    },
    {
      theme: "Food distribution and food bank support",
      title: "Regional Cold Chain Supply Expansion",
      description: "Installing walk-in baseline commercial freezers and cold trucks to optimize logistics and prevent food decay.",
      imageUrl: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=600&q=80",
      region: "Selangor, Malaysia",
      budget: "$2,400,000"
    },
    {
      theme: "Food distribution and food bank support",
      title: "Sovereign Community Food Pantry Network",
      description: "Establishing central dispatch nodes for long-shelf staple dry packages distributed directly into low-income districts.",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
      region: "Đồng Tháp, Vietnam",
      budget: "$1,650,000"
    },
    {
      theme: "Hunger relief operations",
      title: "Critical Famine Emergency Provisioning",
      description: "Rerouting highly nutritious food blends and essential dietary supplements to overcome severe local food blocks.",
      imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
      region: "Arkhangai, Mongolia",
      budget: "$5,800,000"
    },
    {
      theme: "Mentorship and youth development",
      title: "Sovereign Vocational Training Centre",
      description: "Building learning modules for youth learning trades, industrial sewing, plumbing, and modern carpentry skills.",
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
      region: "Maharashtra, India",
      budget: "$3,200,000"
    },
    {
      theme: "Mentorship and youth development",
      title: "Youth Tech & Leadership Hub",
      description: "Sponsoring micro-learning rooms for computer literacy, electrical design, and coding in rural sectors.",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
      region: "Sabah, Malaysia",
      budget: "$2,900,000"
    },
    {
      theme: "Rural infrastructure needs",
      title: "Deep Aquifer Clean Water Well",
      description: "Drilling clean safety wells with solar electric pump systems to bypass heavy contamination risks.",
      imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80",
      region: "An Giang, Vietnam",
      budget: "$1,450,000"
    },
    {
      theme: "Rural infrastructure needs",
      title: "Access Pathways & Farm Drainage Roads",
      description: "Excavating critical stormwater drainage lines and laying gravel beds to prevent road washing during monsoons.",
      imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80",
      region: "Karnataka, India",
      budget: "$2,100,000"
    }
  ];

  otherData.forEach((other, index) => {
    otherItems.push({
      id: 200 + index,
      region: other.region,
      theme: other.theme,
      title: other.title,
      description: other.description,
      imageUrl: other.imageUrl,
      budget: other.budget,
      completionYear: "2026"
    });
  });

  return [...schoolItems, ...hospitalItems, ...otherItems];
};

interface BudgetGallery2026Props {
  onNavigate: (page: any) => void;
  lang: string;
}

export const BudgetGallery2026: React.FC<BudgetGallery2026Props> = ({ onNavigate, lang }) => {
  const items = useMemo(() => generateGalleryItems(), []);

  // Dynamic Funding Counter persistent state
  const [fundingValue, setFundingValue] = useState<number>(() => {
    try {
      const stored = localStorage.getItem("fazza_secured_funding_with_feed_v1");
      if (stored) return parseInt(stored, 10);
      const oldVal = localStorage.getItem("fazza_last_funding_secure_val");
      if (oldVal) return parseInt(oldVal, 10);
    } catch (e) {}
    
    // Default fallback to expected natural sourced growth
    const calculated = getSourcedFundingAt(Date.now());
    const val = Math.max(calculated, 1902500000);
    try {
      localStorage.setItem("fazza_secured_funding_with_feed_v1", val.toString());
      localStorage.setItem("fazza_last_funding_secure_val", val.toString());
    } catch (e) {}
    return val;
  });

  // Live Donation Feed state (exactly 3 items visible)
  const [visibleDonations, setVisibleDonations] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem("fazza_latest_donations_feed_v1");
      if (stored) return JSON.parse(stored);
    } catch (e) {}

    const initial = [
      {
        id: 1,
        name: "Fatima Al-Mansoori",
        country: "United Arab Emirates",
        flag: "🇦🇪",
        amount: 24391,
        status: "Completed",
        timestamp: Date.now() - 300000
      },
      {
        id: 2,
        name: "Alexander Reed",
        country: "United States",
        flag: "🇺🇸",
        amount: 5127,
        status: "Completed",
        timestamp: Date.now() - 120000
      },
      {
        id: 3,
        name: "Zayed Al-Maktoum",
        country: "United Arab Emirates",
        flag: "🇦🇪",
        amount: 48512,
        status: "Processing",
        timestamp: Date.now() - 15000
      }
    ];
    try {
      localStorage.setItem("fazza_latest_donations_feed_v1", JSON.stringify(initial));
    } catch (e) {}
    return initial;
  });

  // Donor count persistent state starting from 2,133,304
  const [donorCount, setDonorCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem("fazza_donor_count_v1");
      if (stored) return parseInt(stored, 10);
    } catch (e) {}
    return 2133304;
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const scheduleNext = () => {
      // Select a random interval between 5 seconds (5000ms) and 45 seconds (45000ms) inclusive
      const delay = 5000 + Math.random() * 40000;

      timeoutId = setTimeout(() => {
        const newId = Date.now();
        const donation = generateRandomDonation(newId);

        // Update donation list state
        setVisibleDonations(prev => {
          const next = [...prev.slice(1), donation];
          try {
            localStorage.setItem("fazza_latest_donations_feed_v1", JSON.stringify(next));
          } catch (e) {}
          return next;
        });

        // Update funding amount state by the exact amount
        setFundingValue(prev => {
          const nextVal = prev + donation.amount;
          try {
            localStorage.setItem("fazza_secured_funding_with_feed_v1", nextVal.toString());
            localStorage.setItem("fazza_last_funding_secure_val", nextVal.toString());
          } catch (e) {}
          return nextVal;
        });

        // Update donor count state
        setDonorCount(prev => {
          const nextVal = prev + 1;
          try {
            localStorage.setItem("fazza_donor_count_v1", nextVal.toString());
          } catch (e) {}
          return nextVal;
        });

        // Schedule next donation
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Natural dynamic status transitions of visible cards on-screen with specified rules
  useEffect(() => {
    const statusInterval = setInterval(() => {
      setVisibleDonations(prev => {
        let changed = false;
        const next = prev.map(d => {
          if (d.status === "Completed") return d;
          
          // 12% probability of a status transition on each 1.5-second tick
          if (Math.random() < 0.12) {
            changed = true;
            if (d.status === "Pending") {
              // Allowed transitions: Pending -> Processing or Pending -> Completed
              const nextStatus = Math.random() < 0.6 ? "Processing" : "Completed";
              return { ...d, status: nextStatus };
            } else if (d.status === "Processing") {
              // Allowed transitions: Processing -> Completed
              return { ...d, status: "Completed" };
            }
          }
          return d;
        });

        if (changed) {
          try {
            localStorage.setItem("fazza_latest_donations_feed_v1", JSON.stringify(next));
          } catch (e) {}
          return next;
        }
        return prev;
      });
    }, 1500);

    return () => clearInterval(statusInterval);
  }, []);
  
  // State for controls
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<string>("All");
  
  // Filtered gallery items
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.region.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTheme = selectedTheme === "All" || item.theme === selectedTheme;
      return matchesSearch && matchesTheme;
    });
  }, [items, searchTerm, selectedTheme]);

  const progressPct = useMemo(() => {
    return Math.min(100, Math.max(0, (fundingValue / 68025000000) * 100));
  }, [fundingValue]);

  return (
    <div className="w-full bg-slate-50 min-h-screen text-slate-900 font-sans pb-24 border-t border-slate-200">
      
      {/* 1. HERO HEADER AREA */}
      <div className="relative w-full overflow-hidden bg-slate-950 py-20 px-6 border-b border-orange-500/10">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-slate-950/70 to-black/90 z-0" />
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600')" }}
        />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-6">
            PRINCE FAZZA CHARITY FOUNDATION<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              2026 HUMANITARIAN DEVELOPMENT BUDGET
            </span>
          </h1>
          <p className="text-slate-300 text-sm max-w-3xl mx-auto leading-relaxed md:text-base">
            Transparently allocating resources to construct resilient global physical facilities and provide direct, uncompromised, zero-leak survival support coordinates across critical sovereign sectors.
          </p>
        </div>
      </div>

      {/* 2. BUDGET OVERVIEW BANNER */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-[24px] shadow-2xl border border-slate-100 p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
            <span className="text-xs font-mono font-black uppercase text-slate-400 tracking-wider">Total Projected Requirements</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-1 flex items-baseline">
              $68.025 Billion <span className="text-xs text-slate-400 font-normal ml-1">USD</span>
            </span>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Consolidated absolute budget estimate addressing all 50 global coordinate programs for structural empowerment.
            </p>
          </div>

          <div className="flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
            <span className="text-xs font-mono font-black uppercase text-[#F4511E] tracking-wider">Operational Target Scope</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              50 Regions Mapped
            </span>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Guaranteed localized deployment without central agency dilution or sovereign pipeline diversion.
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-xs font-mono font-black uppercase text-emerald-600 tracking-wider">Resource Allocation Index</span>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-3xl font-black text-emerald-600">100%</span>
              <span className="text-xs font-bold text-slate-500 leading-snug">Direct-to-Field<br />Operations</span>
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Every single dollar directly supports equipment, materials, and infrastructure engineering on site.
            </p>
          </div>

        </div>
      </div>

      {/* 3. PROJECT SCOPE SECTION */}
      <div className="max-w-7xl mx-auto px-6 mt-16 sm:mt-24">
        <div className="bg-slate-950 text-white rounded-[32px] p-8 sm:p-12 md:p-16 relative overflow-hidden border border-orange-500/10 shadow-[0_24px_50px_rgba(0,0,0,0.15)]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-orange-500/10 to-transparent pointer-events-none z-0" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                PROJECT SCOPE
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                The absolute, vetted scope mapping the Foundation&apos;s physical deliverables. Our teams are certified to engineer high-standard physical facilities and support setups across remote communities, targeting immediate human restoration.
              </p>

              <div className="pt-4 border-t border-white/5 space-y-2">
                <span className="text-[10px] uppercase font-mono text-slate-400 block tracking-wider">Target Grand Total</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#F4511E] font-mono tracking-tight block">
                  $68,025,211,000 USD
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#111111]/60 border border-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="p-2.5 bg-orange-500/10 rounded-lg text-orange-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-black text-slate-300 uppercase">33 School Renovations</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">Seismic reinforcement & classrooms</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="p-2.5 bg-orange-500/10 rounded-lg text-orange-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-black text-slate-300 uppercase">28 Hospital Renovations</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">Hygiene grids & surgical spaces</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="p-2.5 bg-orange-500/10 rounded-lg text-orange-400">
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-black text-slate-300 uppercase">50 Homes for the Homeless</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">Dignified individual family units</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="p-2.5 bg-orange-500/10 rounded-lg text-orange-400">
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-black text-slate-300 uppercase">50 Homeless Community Shelters</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">Multi-family local protective camps</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="p-2.5 bg-orange-500/10 rounded-lg text-orange-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-black text-slate-300 uppercase">5 Mentorship & Youth Hubs</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">Vocational & career growth spaces</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="p-2.5 bg-orange-500/10 rounded-lg text-orange-400">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-black text-slate-300 uppercase">2 Emergency Relief Operations</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">Expedited severe famine blockages</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="p-2.5 bg-orange-500/10 rounded-lg text-orange-400">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-black text-slate-300 uppercase">Food Bank Network</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">Sovereign nourishment backup logistics</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="p-2.5 bg-orange-500/10 rounded-lg text-orange-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-black text-slate-300 uppercase">Rural Infrastructure Support</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">Water extraction and sanitation roadways</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 4. HUMANITARIAN GALLERY HEADER & CONTROLS */}
      <div className="max-w-7xl mx-auto px-6 mt-16 sm:mt-24">
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <span className="text-[#F4511E] font-mono text-xs uppercase tracking-widest font-black block mb-2">Visual Mapping Indices</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Humanitarian Gallery
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              Select thematic categories and trace development targets across 50 mapped sovereign coordinate points.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search region, keyword..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.currentTarget.value)}
                className="w-full bg-white border border-slate-200 rounded-full pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <select 
              value={selectedTheme} 
              onChange={(e) => setSelectedTheme(e.currentTarget.value)}
              className="bg-white border border-slate-200 rounded-full px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
            >
              <option value="All">All Thematic Categories</option>
              {THEMES.map((theme, i) => (
                <option key={i} value={theme}>{theme}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 4.1 THEMATIC GALLERY CARDS GRID (ONLY 4 CARDS AS REQUESTED) */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center bg-white border border-slate-200/60 rounded-3xl mt-10">
            <p className="text-slate-400 font-medium text-sm">No humanitarian coordinates matched your search criteria.</p>
            <button 
              onClick={() => { setSearchTerm(""); setSelectedTheme("All"); }}
              className="mt-3 text-xs font-black text-[#F4511E] uppercase tracking-wider hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
              {filteredItems.slice(0, 4).map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.4) }}
                  className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-500/20 group transition-all duration-300 flex flex-col"
                >
                  {/* Image area displaying ONLY: Gallery Loading */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950 flex items-center justify-center border-b border-slate-100">
                    <span className="font-sans text-xs font-semibold uppercase tracking-widest text-slate-400 select-none animate-pulse">
                      Gallery Loading
                    </span>
                  </div>

                  {/* Card Details */}
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-orange-600">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider">{item.region}</span>
                      </div>

                      <h3 className="font-sans font-black text-slate-950 text-sm tracking-tight leading-snug group-hover:text-[#F4511E] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] uppercase font-mono text-slate-400 block tracking-wider">Required Allocation</span>
                        <span className="text-xs font-black text-slate-950 font-mono">{item.budget} USD</span>
                      </div>

                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono font-bold uppercase">
                        Direct Flow
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Gallery Button after the fourth card */}
            <div className="flex justify-center pt-2">
              <button
                onClick={() => onNavigate("gallery")}
                className="bg-[#F4511E] hover:bg-[#D84315] text-white font-extrabold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full shadow-md transition-all duration-300 transform active:scale-95 hover:-translate-y-0.5 cursor-pointer animate-fade-in"
              >
                View All Gallery
              </button>
            </div>
          </div>
        )}

      </div>

      {/* 5. FUNDING GOAL SUMMARY SECTION */}
      <div className="max-w-7xl mx-auto px-0 sm:px-6 mt-16 sm:mt-24">
        <div className="bg-white border-y sm:border border-slate-200/80 rounded-none sm:rounded-[32px] p-4 sm:p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-4 space-y-4 px-4 sm:px-0">
            <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tight">Live Donation Portal</h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Every coordinate program listed in our Humanitarian Gallery requires verified funding support to initiate actual on-site drilling, construction, or clinic renovation operations.
            </p>
          </div>

          <div id="live-donation-feed-portal" className="lg:col-span-8 bg-white border-y sm:border border-slate-200/80 shadow-[0_4px_30px_rgba(0,0,0,0.03)] text-slate-900 rounded-none sm:rounded-[28px] -mx-4 sm:mx-0 p-4 sm:p-8 space-y-6">
            
            {/* LIVE DONATION ACTIVITY */}
            <div id="live-donation-activity-card" className="relative space-y-3 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_12px_36px_rgba(16,185,129,0.06)]">
              {/* Constant Fading & Fade-out Pulsing Green Border Indicator */}
              <motion.div 
                animate={{ 
                  borderColor: ["rgba(16, 185, 129, 0.2)", "rgba(16, 185, 129, 0.75)", "rgba(16, 185, 129, 0.2)"],
                  boxShadow: [
                    "0 0 4px rgba(16, 185, 129, 0.04)", 
                    "0 0 16px rgba(16, 185, 129, 0.18)", 
                    "0 0 4px rgba(16, 185, 129, 0.04)"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="absolute inset-0 border-2 rounded-2xl pointer-events-none" 
              />
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200/60 pb-2 gap-2 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs uppercase font-mono tracking-wider font-bold text-slate-700">
                    Live Donation Activity
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-mono font-bold text-[#F4511E] bg-orange-50 border border-orange-500/10 px-2.5 py-0.5 rounded">
                    👤 {new Intl.NumberFormat('en-US').format(donorCount)} donors
                  </span>
                  <motion.span 
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 2.0, ease: "easeInOut" }}
                    className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-500/20 px-2 py-0.5 rounded uppercase tracking-wider inline-flex items-center"
                  >
                    Real-Time Feed
                  </motion.span>
                </div>
              </div>

              {/* Cards Container with fixed height for exactly 3 cards */}
              <div className="space-y-2 overflow-hidden flex flex-col justify-end relative z-10" style={{ height: "230px" }}>
                <AnimatePresence initial={false}>
                  {visibleDonations.map((d) => (
                    <motion.div
                      key={d.id}
                      initial={{ opacity: 0, y: 30, height: 0, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, height: 68, scale: 1 }}
                      exit={{ opacity: 0, y: -30, height: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-white border border-slate-100 rounded-xl px-4 flex items-center overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)] mb-2"
                    >
                      <div className="w-full flex items-center justify-between">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-bold text-slate-900 tracking-wide">{d.name}</span>
                            <span className="text-sm select-none" title={d.country}>{d.flag}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 mt-0.5">{d.country}</span>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-xs font-bold font-mono text-emerald-600">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(d.amount)}
                          </span>
                          <span className={`text-[9px] uppercase font-mono tracking-wider font-extrabold px-2 py-0.5 rounded border ${
                            d.status === "Completed" ? "bg-emerald-50 text-emerald-700 border-emerald-500/20" :
                            d.status === "Processing" ? "bg-amber-50 text-amber-700 border-amber-500/20" :
                            "bg-slate-50 text-slate-500 border-slate-200"
                          }`}>
                            {d.status}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* TOTAL PROGRAM FUNDING SECURED CARD CONTAINER */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_8px_24px_rgba(0,0,0,0.03)] space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2">
                <span className="text-xs uppercase font-mono tracking-wider text-slate-600 font-extrabold">Total Program Funding Secured</span>
                <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-50 border border-emerald-500/10 px-2.5 py-0.5 rounded shadow-[0_2px_8px_rgba(16,185,129,0.05)]">Target Value: $68.025B</span>
              </div>
              
              {/* Dynamic progress bar */}
              <div className="w-full bg-slate-100/80 rounded-full h-3.5 overflow-hidden border border-slate-200/40">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-emerald-500 h-full transition-all duration-500" 
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                <span className="font-semibold text-slate-600">Vetted Phase 1 Commitments ($1.9B)</span>
                <span className="font-semibold text-slate-600">Remaining Needs ($66.125B)</span>
              </div>
            </div>

            {/* DONATION STATISTICS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200/60">
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-[0_6px_20px_rgba(0,0,0,0.03)] text-center sm:text-left hover:shadow-md transition-shadow">
                <span className="text-[9px] uppercase font-mono text-slate-500 font-bold tracking-wider block mb-1">Phase 1 Sourced</span>
                <AnimatedCounter value={fundingValue} />
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-[0_6px_20px_rgba(0,0,0,0.03)] text-center sm:text-left hover:shadow-md transition-shadow">
                <span className="text-[9px] uppercase font-mono text-slate-500 font-bold tracking-wider block mb-1">Active Field Units</span>
                <span className="text-base font-black font-mono text-slate-900">4 Operational</span>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-[0_6px_20px_rgba(0,0,0,0.03)] text-center sm:text-left hover:shadow-md transition-shadow">
                <span className="text-[9px] uppercase font-mono text-slate-500 font-bold tracking-wider block mb-1">Audit Standard</span>
                <span className="text-base font-black font-mono text-[#F4511E]">Absolute Zero Leak</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 6. DONATE CTA SECTION */}
      <div className="max-w-3xl mx-auto px-6 mt-16 sm:mt-24 text-center">
        <div className="bg-gradient-to-br from-[#F4511E] to-amber-600 text-white p-8 sm:p-12 rounded-[32px] shadow-[0_20px_40px_rgba(244,81,30,0.3)] space-y-6">
          <Heart className="w-12 h-12 mx-auto stroke-[1.5] text-white animate-pulse" />
          
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Support the 2026 Budget</h3>
          <p className="text-orange-50 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            You can direct your customized donation value to facilitate immediate material deliveries, classroom roofing, or sterile sanitation logistics at active locations in our gallery.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onNavigate("donate")}
              className="w-full sm:w-auto bg-white text-[#F4511E] hover:bg-orange-50 cursor-pointer px-8 py-3.5 font-black uppercase text-xs tracking-widest rounded-full shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Support the 2026 Budget
            </button>
            <button 
              onClick={() => onNavigate("home")}
              className="w-full sm:w-auto bg-transparent border border-white/35 hover:bg-white/10 cursor-pointer px-8 py-3.5 font-black uppercase text-xs tracking-widest rounded-full transition-transform"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
