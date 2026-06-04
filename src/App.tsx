import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ActivePage, Program, Comment, BlogItem } from "./types";
import { Navbar } from "./components/Navbar";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { COUNTRIES_LIST } from "./data_countries";
import CipherAdminPanel from "./components/CipherAdminPanel";
import { ServicePages } from "./components/ServicePages";
import { GlobalVoices } from "./components/GlobalVoices";
import { GlobalVoicesAddCommentary } from "./components/GlobalVoicesAddCommentary";
import { GlobalVoicesShowcase } from "./components/GlobalVoicesShowcase";
import { BudgetGallery2026, generateGalleryItems, GalleryItem } from "./components/BudgetGallery2026";
import { LiveDonationPortal } from "./components/LiveDonationPortal";
import { PremiumDonateButton } from "./components/PremiumDonateButton";
import { translate, translateParagraph, TOP_LANGUAGES } from "./translation";
import childrenPlayingImg from "./assets/images/children_playing_field_1780309954729.png";
import happyChildrenPlaying from "./assets/images/happy_children_playing_1780312084115.png";
import taipeiCareImg from "./assets/images/taipei_care_1780312347527.png";
import kaohsiungCareImg from "./assets/images/kaohsiung_care_1780312365351.png";
import wenshanCareImg from "./assets/images/wenshan_care_1780312383372.png";
import hivHalfwayHouseImg from "./assets/images/hiv_halfway_house_1780312854233.png";
import strandedForeignersImg from "./assets/images/stranded_foreigners_1780312871610.png";
import foundingVisionImg from "./assets/images/founding_vision_image_1780313384174.png";
import motherCaregivingImg from "./assets/images/mother_caregiving_1780315612294.png";
import aminaAlMansooriImg from "./assets/images/amina_al_mansoori_1780399411991.png";
import nouraAlKaabiImg from "./assets/images/noura_al_kaabi_1780399428423.png";
import { 
  SPONSORS, 
  TEAM_MEMBERS, 
  PROGRAMS, 
  EVENTS, 
  SUCCESS_STORIES, 
  BLOG_POSTS, 
  FAQS, 
  COMMENTS 
} from "./data";
import { GLOBAL_VOICES_MESSAGES } from "./data_global_voices";
import { 
  Heart, 
  Sparkles, 
  Globe, 
  Users, 
  BookOpen, 
  Shield, 
  Activity, 
  FileText, 
  Phone, 
  ArrowRight, 
  Search, 
  ChevronRight, 
  DollarSign, 
  Calendar, 
  MapPin, 
  Clock, 
  Grid, 
  Camera, 
  Video, 
  AlertTriangle, 
  CheckCircle,
  Check,
  MessageSquare, 
  ThumbsUp, 
  Filter,
  Lock,
  Compass,
  Award,
  Briefcase,
  HelpCircle,
  HeartHandshake, 
  PieChart, 
  Send, 
  Star, 
  User,
  Plus,
  ArrowUp,
  Mail,
  Youtube,
  Share2,
  Landmark,
  Coins,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download
} from "lucide-react";
import { jsPDF } from "jspdf";

const optimizeImageUrl = (url: string, isMobile: boolean = false): string => {
  if (!url) return "";
  if (url.includes("unsplash.com")) {
    try {
      const u = new URL(url);
      u.searchParams.set("auto", "format,compress");
      u.searchParams.set("fm", "webp");
      const width = isMobile ? "640" : "1600";
      u.searchParams.set("w", width);
      u.searchParams.set("q", isMobile ? "75" : "80");
      return u.toString();
    } catch {
      return url;
    }
  }
  return url;
};

const preloadedImages = new Set<string>();
const preloadImage = (src: string, isMobile: boolean = false) => {
  if (!src || preloadedImages.has(src)) return;
  preloadedImages.add(src);
  const img = new Image();
  img.src = optimizeImageUrl(src, isMobile);
};

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fetchpriority?: "high" | "low" | "auto";
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  isMobile?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  style,
  fetchpriority = "auto",
  onError,
  isMobile = false
}) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(() => optimizeImageUrl(src, isMobile));

  useEffect(() => {
    const nextSrc = optimizeImageUrl(src, isMobile);
    setCurrentSrc(nextSrc);
    
    const tempImg = new Image();
    tempImg.src = nextSrc;
    if (tempImg.complete) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [src, isMobile]);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (onError) {
      onError(e);
    } else {
      if (currentSrc !== "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80") {
        setCurrentSrc("https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&fm=webp&q=80");
      }
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-900/10">
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-slate-900/10 via-slate-800/15 to-slate-900/10 animate-pulse transition-opacity duration-300 ${
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`} 
      />
      <img
        src={currentSrc}
        alt={alt}
        style={style}
        referrerPolicy="no-referrer"
        loading={fetchpriority === "high" ? "eager" : "lazy"}
        className={`${className} transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
          loaded ? "opacity-100 scale-100 blur-none" : "opacity-0 scale-[1.03] blur-sm"
        }`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

const getPageHeaderInfo = (page: ActivePage): { img: string; tag: string; title: string; sub: string } => {
  switch (page) {
    case "about":
      return {
        img: happyChildrenPlaying,
        tag: "ABOUT THE FOUNDATION",
        title: "About Prince Fazza Charity Foundation",
        sub: "A Global Covenant of Direct Relief: Operating Across 25 Nations with 100% Direct-to-Field Resource Flow."
      };
    case "vision":
      return {
        img: foundingVisionImg,
        tag: "OUR VISION",
        title: "Our Vision",
        sub: "Creating opportunities, strengthening communities, and advancing sustainable human development across the world."
      };
    case "mission":
      return {
        img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80",
        tag: "OUR MISSION",
        title: "Our Mission",
        sub: "Empowering Humanity Through Sustainable Action: Creating meaningful change through strategic philanthropy and long-term development."
      };
    case "founder-chronicle":
      return {
        img: "https://i.imgur.com/RBHsnQY.png",
        tag: "THE FOUNDER'S CHRONICLE",
        title: "Founder's Chronicle",
        sub: "Official record of humanitarian leadership, global philanthropy, sustainable giving initiatives, and international social impact under the guidance of Sheikh Hamdan bin Mohammed bin Rashid Al Maktoum (Fazza)."
      };
    case "board-directors":
      return {
        img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600",
        tag: "STEWARDSHIP TEAM",
        title: "Board of Directors",
        sub: "Sovereign Trustees & Ethical Stewards: Defining Strict Protocols Under Zero Administrative Leakage Metrics."
      };
    case "org-structure":
      return {
        img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600",
        tag: "WORKFLOW TOPOLOGY",
        title: "Organizational Structure",
        sub: "Synergistic System Flow: Engineering swift field interventions with high double-entry ledger audits."
      };
    case "hiv-support":
      return {
        img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
        tag: "CLINICAL HIV OUTREACH",
        title: "HIV Support",
        sub: "Access free clinical diagnostics, absolute double-blind privacy coordinates, certified immunotherapy, and personalized nutrition support."
      };
    case "halfway-house":
      return {
        img: hivHalfwayHouseImg,
        tag: "COMMUNITY INTEGRATION MODULE",
        title: "Halfway House",
        sub: "Safe temporary housing, structured career placement courses, and legal assistance for individuals transition back into the workforce."
      };
    case "vulnerable-foreigners":
      return {
        img: strandedForeignersImg,
        tag: "GLOBAL IMMIGRANT DEFENSE COVENANT",
        title: "Vulnerable Foreigners Aid",
        sub: "Emergency food, placement protocols, linguistic translations, and consular guidance for vulnerable non-native residents."
      };
    case "seminar-request":
      return {
        img: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&q=80",
        tag: "ONCOLOGICAL LECTURES & WORKSHOPS",
        title: "Seminar Request Booking",
        sub: "Book professional workshops on preventative oncology, cancer survivor therapy, and psychological tools for local communities."
      };
    case "health-ambassadors":
      return {
        img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
        tag: "VERIFIED REGIONAL MEDICAL NETWORK",
        title: "Health Ambassador Database",
        sub: "Direct secure access to our network of registered pediatricians, mobile emergency clinics, and oncology specialists."
      };
    case "children-home":
      return {
        img: taipeiCareImg,
        tag: "YOUTH REUNIFICATION PROTOCOL",
        title: "Children Came Home",
        sub: "Identifying displaced youth, coordinating legal protection guardians, and restoring young souls back with original families."
      };
    case "shelter-placement":
      return {
        img: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=800&q=80",
        tag: "EMERGENCY PLACEMENT INFRASTRUCTURE",
        title: "Shelter and Placement",
        sub: "Deploying high-quality shelter networks equipped with continuous power, running clean water, and on-site psychological medics."
      };
    case "medical-care":
      return {
        img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
        tag: "ONCOLOGY SURGERY ENDOWMENTS",
        title: "Hospitals and Medical Care",
        sub: "Full coverage for diagnostic oncology, emergency surgical operations, and complex clinical treatments for vulnerable families."
      };
    case "mother-child":
      return {
        img: wenshanCareImg,
        tag: "MATERNITY CLINICAL WINGS",
        title: "Mother and Child Shelter",
        sub: "Specialized maternal medical monitoring, safe postpartum housing, and dispatch stations for vital infant formula."
      };
    case "visit-care":
      return {
        img: kaohsiungCareImg,
        tag: "VISIT & CARE PROGRAM",
        title: "On-Site Visit & Continuous Care Program",
        sub: "Join local teams visiting remote clinical quarters, assisting mobile medic caravans, and delivering care packages to beneficiaries."
      };
    case "programs":
      return {
        img: "https://images.unsplash.com/photo-1579684389783-bdf560104271?w=800&q=80",
        tag: "OUR ACTIVE FRAMEWORK",
        title: "Fazza Humanitarian Framework Modules",
        sub: "Empowering communities with certified healthcare diagnostic pathways, secure placement modules, and active emergency support protocols."
      };
    case "newsroom":
      return {
        img: "https://images.unsplash.com/photo-1579684389783-bdf560104271?q=80&w=1600",
        tag: "OFFICIAL PRESS OFFICE",
        title: "Fazza Chronicles & Field Briefs",
        sub: "Certified field bulletins, financial audit publications, oncology triumph narratives, and regional transition reports."
      };
    case "global-voices":
      return {
        img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600",
        tag: "COMMUNITY CORNER",
        title: "Global Voices",
        sub: "Messages of Hope, Gratitude, and Humanitarian Impact from Around the World."
      };
    case "campaigns":
    case "emergency-relief":
    case "scholarships":
    case "water-projects":
      return {
        img: "https://images.unsplash.com/photo-1541816521255-ff76dbc5c120?w=800&q=80",
        tag: "CAMPAIGNS TRACKER Portal",
        title: "Active Human Sponsorship Targets",
        sub: "Verify continuous fundraising achievement parameters and targeted logistics registries."
      };
    case "donate":
      return {
        img: childrenPlayingImg,
        tag: "DONATION PORTAL",
        title: "Sovereign Contribution Portal",
        sub: "Support direct humanitarian action under certified tax-exempt 501(c)(3) guidelines."
      };
    case "commentary":
      return {
        img: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=1600",
        tag: "COOPERATIVE LIVE DIALOGUE",
        title: "Reviews & Public Testimonials",
        sub: "Sustained dialogues built directly from field medical caravans, engineering drill units, and direct student beneficiaries."
      };
    case "volunteer":
      return {
        img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
        tag: "HUMANITARIAN MOBILIZATION",
        title: "Volunteer Registration Registry",
        sub: "Partner directly with our rapid triage response teams, clinic drivers, and native language translators."
      };
    case "partner":
      return {
        img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
        tag: "GLOBAL ALLIANCES",
        title: "Corporate Partnership Board",
        sub: "Align your organization with regional development grids and sovereign continuous audit protocols."
      };
    case "careers":
      return {
        img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
        tag: "PROFESSIONAL DISPATCH",
        title: "Logistical Careers & Internships",
        sub: "Join our international on-site administrative staff and fast-track your humanitarian deployment."
      };
    case "faq":
      return {
        img: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
        tag: "INFORMATION DEPOT",
        title: "Fazza Frequently Asked Questions",
        sub: "Verify our operational guidelines, continuous audit parameters, and children sponsorship programs."
      };
    case "annual-reports":
    case "financial-transparency":
      return {
        img: "https://images.unsplash.com/photo-1576091158221-1241f92e22fc?q=80&w=1600",
        tag: "TRANSPARENCY LEDGER",
        title: "Sovereign Audit Ledger Database",
        sub: "Public disclosure of international fund flows, zero-leakage certifications, and IRS 501(c)(3) filing metrics."
      };
    case "stories":
      return {
        img: "https://images.unsplash.com/photo-1541816521255-ff76dbc5c120?q=80&w=1600",
        tag: "TRIUMPHANT CHRONICLES",
        title: "Humanitarian Beneficiary Stories",
        sub: "Personal testimonies of dignity restored, sight recovered, and clean springs unlocked in distant provinces."
      };
    case "blog":
      return {
        img: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1600",
        tag: "FIELD REPORTS",
        title: "Humanitarian Field Briefs",
        sub: "Updates directly from our medical pilots and water construction crews in active global sectors."
      };
    case "events":
      return {
        img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600",
        tag: "COORDINATED ACTIONS",
        title: "Outreach Events & Public Lectures",
        sub: "Register for local charity seminars, academic conferences, and regional outpatient screenings near you."
      };
    case "gallery":
      return {
        img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1600",
        tag: "VISUAL DIALOGUE",
        title: "Sovereign Field Photography Archive",
        sub: "A curated timeline of absolute human grace, direct surgical interventions, and water drill operations."
      };
    case "contact":
      return {
        img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600",
        tag: "ABOUT THE FOUNDATION",
        title: "CONTACT",
        sub: "Verifiable official documentation of the Prince Fazza Charity Foundation parameters."
      };
    default:
      return {
        img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
        tag: "ABOUT THE FOUNDATION",
        title: page.replace("-", " ").toUpperCase(),
        sub: "Verifiable official documentation of the Prince Fazza Charity Foundation parameters."
      };
  }
};

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      if (txt.length <= 2 && txt.toLowerCase() !== 'of') {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

const PageHeader: React.FC<{ page: ActivePage; lang: string }> = ({ page, lang }) => {
  const info = getPageHeaderInfo(page);
  const isFounderChronicle = page === "founder-chronicle";
  const isAbout = page === "about";

  const [aboutImageIndex, setAboutImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isAbout) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setAboutImageIndex((prev) => (prev + 1) % 2);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAbout]);

  useEffect(() => {
    if (!isTransitioning) return;
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isTransitioning, aboutImageIndex]);

  const getStyleForImage = (i: number) => {
    const isActive = aboutImageIndex === i;
    if (isActive) {
      return {
        transform: "translate3d(0%, 0, 0)",
        transition: isTransitioning ? "all 1000ms cubic-bezier(0.25, 1, 0.5, 1)" : "none",
      };
    } else {
      return {
        transform: isTransitioning ? "translate3d(-100%, 0, 0)" : "translate3d(100%, 0, 0)",
        transition: isTransitioning ? "all 1000ms cubic-bezier(0.25, 1, 0.5, 1)" : "none",
      };
    }
  };

  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const heroHeight = isFounderChronicle ? 428 : 450;
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
      const blurVal = progress * 16;
      
      // Fixed hero parallax scroll effect
      heroRef.current.style.transform = `translate3d(0, ${scrollY * 0.3}px, 0)`;
      heroRef.current.style.filter = `blur(${blurVal}px)`;
      
      if (progress >= 1) {
        heroRef.current.style.visibility = "hidden";
      } else {
        heroRef.current.style.visibility = "visible";
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFounderChronicle]);

  return (
    <div className={`w-full font-sans bg-slate-50 transition-all ${
      isFounderChronicle 
        ? "pt-[85px] sm:pt-[95px] md:pt-[105px] lg:pt-[115px]" 
        : "pt-[64px] md:pt-[76px]"
    }`}>
      {/* Cinematic premium hero image/banner with Title */}
      <div 
        ref={heroRef}
        className={`fixed left-0 right-0 z-10 w-full overflow-hidden bg-zinc-900 group ${
          isFounderChronicle 
            ? "top-[85px] sm:top-[95px] md:top-[105px] lg:top-[115px] h-[285px] md:h-[428px]" 
            : "top-[64px] md:top-[76px] h-[300px] md:h-[450px]"
        }`}
        style={{ willChange: "transform, filter" }}
      >
        {isFounderChronicle ? (
          <div 
            className="absolute inset-0 flex h-full animate-scroll-right w-[2400px] md:w-[3424px]"
          >
            <div className="w-[1200px] md:w-[1712px] h-full relative flex-shrink-0">
              <OptimizedImage 
                src={info.img} 
                alt={info.title} 
                fetchpriority="high"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80";
                }}
                className="absolute inset-0 w-full h-full object-cover object-top select-none"
              />
            </div>
            <div className="w-[1200px] md:w-[1712px] h-full relative flex-shrink-0">
              <OptimizedImage 
                src={info.img} 
                alt={info.title} 
                fetchpriority="high"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80";
                }}
                className="absolute inset-0 w-full h-full object-cover object-top select-none"
              />
            </div>
          </div>
        ) : isAbout ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={getStyleForImage(0)}
            >
              <OptimizedImage 
                src={happyChildrenPlaying} 
                alt={info.title} 
                fetchpriority="high"
                className="absolute inset-0 w-full h-full object-cover object-center select-none"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80";
                }}
              />
            </div>
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={getStyleForImage(1)}
            >
              <OptimizedImage 
                src="https://i.imgur.com/U4lkS8K.png" 
                alt={info.title} 
                fetchpriority="high"
                className="absolute inset-0 w-full h-full object-cover select-none"
                style={{ objectPosition: "center 10%" }}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.endsWith(".png")) {
                    target.src = "https://i.imgur.com/U4lkS8K.jpg";
                  } else if (target.src.endsWith(".jpg")) {
                    target.src = "https://i.imgur.com/U4lkS8K.jpeg";
                  } else {
                    target.src = "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80";
                  }
                }}
              />
            </div>
          </div>
        ) : (
          <OptimizedImage 
            src={info.img} 
            alt={info.title} 
            fetchpriority="high"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80"; // Reliable fallback
            }}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[10000ms] group-hover:scale-105 ease-out select-none"
          />
        )}
        {/* Soft dark overlay only for readability */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Title placed elegantly on the hero image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-white text-2xl md:text-3xl font-light tracking-wide font-sans drop-shadow-sm">
            {toTitleCase(info.title)}
          </h1>
        </div>
      </div>

      {/* Static layout Spacer in normal flow to prevent cumulative layout shift */}
      <div className={`w-full bg-transparent ${
        isFounderChronicle ? "h-[285px] md:h-[428px]" : "h-[300px] md:h-[450px]"
      }`} />

      {/* BELOW THE HERO IMAGE: Page subtitle, introduction text */}
      <div className="relative z-20 bg-slate-50 border-b border-zinc-100 py-10 px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-6 bg-[#F4511E] rounded-full" />
            <span className="text-[#F4511E] font-mono text-[10px] md:text-xs tracking-[0.2em] font-black uppercase">
              // {info.tag}
            </span>
          </div>
          <p className="text-[#333333] text-sm md:text-base font-normal leading-relaxed font-sans max-w-3xl">
            {info.sub}
          </p>
        </div>
      </div>
    </div>
  );
};

const AboutCTA: React.FC<{ onNavigate: (page: ActivePage) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-12 font-sans">
      <div className="relative rounded-[40px] overflow-hidden bg-slate-950 px-8 py-20 md:p-16 text-center shadow-2xl border border-slate-900 group">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:scale-105 transition-all duration-10000" 
          style={{ backgroundImage: `url(${optimizeImageUrl('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80', false)})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-950 z-10" />

        <div className="relative z-20 max-w-3xl mx-auto space-y-6">
          <span className="text-[#F4511E] font-mono text-xs uppercase tracking-widest font-black block">Join the Covenant</span>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight font-sans">Together We Can Change Lives</h2>
          
          <p className="text-slate-300 text-sm md:text-base font-semibold leading-relaxed">
            Continue supporting the Prince Fazza Charity Foundation's commitment to sustainable development, humanitarian service, healthcare advancement, and community empowerment.
          </p>

          <div className="py-2">
            <p className="text-base md:text-xl font-serif text-[#F4511E]/90 italic font-bold">
              “Changing Lives, Restoring Hope, Building Futures.”
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <button 
              onClick={() => { onNavigate("donate"); }}
              className="w-full sm:w-auto bg-[#F4511E] hover:bg-[#D84315] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-lg hover:shadow-[#F4511E]/20"
            >
              Donate Now ➔
            </button>
            <button 
              onClick={() => { onNavigate("partner"); }}
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border-2 border-white/60 hover:border-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              Become a Partner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const VisionCTA: React.FC<{ onNavigate: (page: ActivePage) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-12 font-sans">
      <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 px-8 py-20 md:p-16 text-center shadow-2xl border border-indigo-900 group">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:scale-105 transition-all duration-10000" 
          style={{ backgroundImage: `url(${optimizeImageUrl('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200', false)})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 to-slate-950/90 z-10" />

        <div className="relative z-20 max-w-3xl mx-auto space-y-6">
          <span className="text-[#F4511E] font-mono text-xs uppercase tracking-widest font-black block">Help Shape a Future Where Every Individual Can Thrive</span>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight font-sans">Building Tomorrow Together</h2>
          
          <p className="text-slate-300 text-sm md:text-base font-semibold leading-relaxed">
            Join a growing movement dedicated to expanding opportunity, strengthening communities, and creating sustainable pathways toward human development and prosperity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <button 
              onClick={() => { onNavigate("global-impact"); }}
              className="w-full sm:w-auto bg-[#F4511E] hover:bg-[#D84315] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-lg hover:shadow-[#F4511E]/20"
            >
              Explore Our Impact ➔
            </button>
            <button 
              onClick={() => { onNavigate("donate"); }}
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border-2 border-white/60 hover:border-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              Support the Vision
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MissionCTA: React.FC<{ onNavigate: (page: ActivePage) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-12 font-sans">
      <div className="relative rounded-[40px] overflow-hidden bg-slate-900 border border-slate-800 px-8 py-20 md:p-16 text-center shadow-2xl group">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:scale-105 transition-all duration-10000" 
          style={{ backgroundImage: `url(${optimizeImageUrl('https://images.unsplash.com/photo-1469571486040-af250c29116e?q=80&w=1200', false)})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-950 z-10" />

        <div className="relative z-20 max-w-3xl mx-auto space-y-6">
          <span className="text-[#F4511E] font-mono text-xs uppercase tracking-widest font-black block">Advancing Sustainable Change Through Collective Effort</span>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight font-sans">Turning Purpose Into Action</h2>
          
          <p className="text-slate-300 text-sm md:text-base font-semibold leading-relaxed">
            Every initiative, partnership, and contribution helps transform lives through healthcare, education, humanitarian relief, and community development programs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <button 
              onClick={() => { onNavigate("volunteer"); }}
              className="w-full sm:w-auto bg-[#F4511E] hover:bg-[#D84315] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-lg hover:shadow-[#F4511E]/20"
            >
              Join Our Mission ➔
            </button>
            <button 
              onClick={() => { onNavigate("donate"); }}
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border-2 border-white/60 hover:border-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              Get Involved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BoardCTA: React.FC<{ onNavigate: (page: ActivePage) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-12 font-sans">
      <div className="relative rounded-[40px] overflow-hidden bg-slate-950 px-8 py-20 md:p-16 text-center shadow-2xl border border-zinc-800 group">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:scale-105 transition-all duration-10000" 
          style={{ backgroundImage: `url(${optimizeImageUrl('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200', false)})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-slate-950 to-slate-950 z-10" />

        <div className="relative z-20 max-w-3xl mx-auto space-y-6">
          <span className="text-[#F4511E] font-mono text-xs uppercase tracking-widest font-black block">Guided by Service, Accountability, and Global Responsibility</span>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight font-sans">Leadership That Inspires Impact</h2>
          
          <p className="text-slate-300 text-sm md:text-base font-semibold leading-relaxed">
            The Foundation's leadership continues to advance initiatives that create meaningful and measurable change across communities worldwide.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <button 
              onClick={() => { onNavigate("leadership"); }}
              className="w-full sm:w-auto bg-[#F4511E] hover:bg-[#D84315] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-lg hover:shadow-[#F4511E]/20"
            >
              Meet Our Leadership ➔
            </button>
            <button 
              onClick={() => { onNavigate("financial-transparency"); }}
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border-2 border-white/60 hover:border-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              Explore Governance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrgCTA: React.FC<{ onNavigate: (page: ActivePage) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-12 font-sans">
      <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-slate-950 border border-teal-900 px-8 py-20 md:p-16 text-center shadow-2xl group">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:scale-105 transition-all duration-10000" 
          style={{ backgroundImage: `url(${optimizeImageUrl('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200', false)})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-950/20 to-slate-950 z-10" />

        <div className="relative z-20 max-w-3xl mx-auto space-y-6">
          <span className="text-[#F4511E] font-mono text-xs uppercase tracking-widest font-black block">Strength Through Structure, Collaboration, and Accountability</span>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight font-sans">A Foundation Built for Lasting Impact</h2>
          
          <p className="text-slate-300 text-sm md:text-base font-semibold leading-relaxed">
            Our organizational framework supports effective decision-making, transparent governance, and sustainable implementation across every initiative and program.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <button 
              onClick={() => { onNavigate("org-structure"); }}
              className="w-full sm:w-auto bg-[#F4511E] hover:bg-[#D84315] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-lg hover:shadow-[#F4511E]/20"
            >
              View Departments ➔
            </button>
            <button 
              onClick={() => { onNavigate("financial-transparency"); }}
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border-2 border-white/60 hover:border-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              Learn How We Operate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const VALID_PAGES: Set<string> = new Set([
  "home", "about", "vision", "mission", "programs", "campaigns", "donate", "volunteer", "partner",
  "stories", "blog", "newsroom", "global-voices", "global-voices/add-commentary", "live-donation-portal", "events", "gallery",
  "videos", "testimonials", "commentary", "global-impact", "annual-reports", "financial-transparency",
  "leadership", "founder-chronicle", "board-directors", "org-structure", "careers", "internships", "faq",
  "contact", "hiv-support", "halfway-house", "vulnerable-foreigners", "seminar-request", "health-ambassadors",
  "children-home", "shelter-placement", "medical-care", "mother-child", "visit-care", "emergency-relief",
  "scholarships", "medical-outreach", "women-empowerment", "child-support", "orphanage-support", "food-relief",
  "sustainability", "water-projects", "privacy", "terms", "2026-budget-gallery"
]);

function isValidActivePage(page: string): page is ActivePage {
  return VALID_PAGES.has(page);
}

function getInitialPage(): ActivePage {
  // 1. Parse query parameter first
  const queryParams = new URLSearchParams(window.location.search);
  const pageFromQuery = queryParams.get("page") as ActivePage | null;
  if (pageFromQuery && isValidActivePage(pageFromQuery)) {
    return pageFromQuery;
  }

  // 2. Fallback to URL pathname mapping
  const path = window.location.pathname.replace(/^\/+/, "").replace(/\/+$/, "") as ActivePage;
  if (path && isValidActivePage(path)) {
    return path;
  }

  // 3. Fallback to localStorage
  try {
    const saved = localStorage.getItem("pf_active_page") as ActivePage | null;
    if (saved && isValidActivePage(saved)) {
      return saved;
    }
  } catch (e) {
    console.warn(e);
  }

  return "home";
}

export default function App() {
  // Navigation & Preferences
  const [activePage, setActivePage] = useState<ActivePage>(getInitialPage());
  const [sessionHistoryCount, setSessionHistoryCount] = useState<number>(0);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [lang, setLang] = useState<string>("en");
  const [lightbox, setLightbox] = useState<{ url: string; alt: string; caption?: string } | null>(null);

  // Synchronize on load and popstate
  useEffect(() => {
    const initialPage = getInitialPage();

    // Set initial history state so standard back actions align nicely
    window.history.replaceState({ page: initialPage }, "", window.location.href);

    if (initialPage !== activePage) {
      setActivePage(initialPage);
    }

    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.page) {
        setActivePage(event.state.page);
        setSessionHistoryCount(prev => Math.max(0, prev - 1));
      } else {
        const qp = new URLSearchParams(window.location.search);
        const p = qp.get("page") as ActivePage | null;
        if (p && isValidActivePage(p)) {
          setActivePage(p);
        } else {
          const path = window.location.pathname.replace(/^\/+/, "").replace(/\/+$/, "") as ActivePage;
          if (path && isValidActivePage(path)) {
            setActivePage(path);
          } else {
            setActivePage("home");
          }
        }
        setSessionHistoryCount(prev => Math.max(0, prev - 1));
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Intelligent Preloading System for Hero/Banner images
  useEffect(() => {
    // 1. Immediately preload the first slide of both mobile and desktop (prioritize above-the-fold)
    preloadImage("https://i.imgur.com/FMlPyKP.jpg", false);
    preloadImage("https://i.imgur.com/koCgzdf.png", true);

    // 2. Preload remaining home slides after short delay (browser idle/non-blocking)
    const slideTimer = setTimeout(() => {
      const restSlides = [
        ["https://i.imgur.com/pq5Nolx.png", false],
        ["https://i.imgur.com/ikwFPYq.jpg", false],
        ["https://i.imgur.com/rxmkSgC.jpg", false],
        ["https://i.imgur.com/WtaBXrE.png", true],
        ["https://i.imgur.com/T5pw3ob.png", true],
        ["https://i.imgur.com/cplW2Gi.png", true],
      ] as const;
      restSlides.forEach(([img, isMob]) => preloadImage(img, isMob));
    }, 300);

    // 3. Preload core subpage banner/header assets sequentially to build instant navigation experience
    const bannerTimer = setTimeout(() => {
      const subpageImages = [
        happyChildrenPlaying,
        foundingVisionImg,
        taipeiCareImg,
        kaohsiungCareImg,
        wenshanCareImg,
        hivHalfwayHouseImg,
        strandedForeignersImg,
        childrenPlayingImg,
        motherCaregivingImg,
        aminaAlMansooriImg,
        nouraAlKaabiImg,
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
        "https://images.unsplash.com/photo-1552664730-d307ca884978",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
        "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
        "https://images.unsplash.com/photo-1518398046578-8cca57782e17",
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
        "https://images.unsplash.com/photo-1579684389783-bdf560104271",
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
        "https://images.unsplash.com/photo-1541816521255-ff76dbc5c120",
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45",
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
      ];
      subpageImages.forEach(src => {
        if (src) {
          preloadImage(src, false);
          preloadImage(src, true);
        }
      });
    }, 1500);

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(bannerTimer);
    };
  }, []);

  // Save active page to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("pf_active_page", activePage);
    } catch (e) {}
  }, [activePage]);

  // SEO Update Hook
  useEffect(() => {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    
    if (activePage === "about") {
      document.title = "About | Prince Fazza Charity Foundation";
      metaDesc.setAttribute("content", "Learn about the Prince Fazza Charity Foundation overview, our core humanitarian mission, and long-term global impact.");
    } else if (activePage === "vision") {
      document.title = "Vision | Prince Fazza Charity Foundation";
      metaDesc.setAttribute("content", "Discover the vision of the Prince Fazza Charity Foundation and our commitment to creating a world where every individual can thrive.");
    } else if (activePage === "mission") {
      document.title = "Mission | Prince Fazza Charity Foundation";
      metaDesc.setAttribute("content", "Explore the mission of the Prince Fazza Charity Foundation and how we create sustainable impact through education, healthcare, and community development.");
    } else {
      document.title = "Prince Fazza Charity Foundation";
      metaDesc.setAttribute("content", "Prince Fazza Charity Foundation | Official Portal");
    }
  }, [activePage]);

  // Synchronize system language choice with background Google Translate engine
  useEffect(() => {
    if (!lang) return;

    // Set standard googtrans cookie to allow smooth auto-translation
    const targetTrans = `/en/${lang}`;
    document.cookie = `googtrans=${targetTrans}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=${targetTrans}; path=/`;

    const changeGoogleLang = () => {
      const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (selectEl) {
        if (selectEl.value !== lang) {
          selectEl.value = lang;
          selectEl.dispatchEvent(new Event('change'));
        }
        return true;
      }
      return false;
    };

    // Try immediately
    const done = changeGoogleLang();
    if (!done) {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        const success = changeGoogleLang();
        if (success || attempts > 60) {
          clearInterval(interval);
        }
      }, 150);
      return () => clearInterval(interval);
    }
  }, [lang]);

  // Premium Navigation Interactive states
  const [activeOrgDept, setActiveOrgDept] = useState<string>("liaison");
  const [activeNewsPost, setActiveNewsPost] = useState<any | null>(null);
  const [selectedNewsCategory, setSelectedNewsCategory] = useState<string>("All");
  const [activeServiceSpotlight, setActiveServiceSpotlight] = useState<string | null>(null);
  const [seminarSubmitted, setSeminarSubmitted] = useState<boolean>(false);
  const [seminarTopic, setSeminarTopic] = useState<string>("Oncology Care Operations");
  const [healthSearchQuery, setHealthSearchQuery] = useState<string>("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Hero carousel (3 premium slides)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  
  const heroSlides = [
    {
      img: "https://i.imgur.com/FMlPyKP.jpg",
      title: "Premium Humanitarian Action",
      pos: "object-center"
    },
    {
      img: "https://i.imgur.com/pq5Nolx.png",
      title: "Royal Humanitarian Outreach",
      pos: "object-[center_20%]"
    },
    {
      img: "https://i.imgur.com/ikwFPYq.jpg",
      title: "Global Relief Efforts",
      pos: "object-center"
    },
    {
      img: "https://i.imgur.com/rxmkSgC.jpg",
      title: "Empowering Rural Communities",
      pos: "object-center"
    }
  ];

  const mobileHeroSlides = [
    {
      img: "https://i.imgur.com/koCgzdf.png",
      title: "Mobile Slide 1",
      pos: "object-[center_20%]"
    },
    {
      img: "https://i.imgur.com/WtaBXrE.png",
      title: "Mobile Slide 2",
      pos: "object-[center_20%]"
    },
    {
      img: "https://i.imgur.com/T5pw3ob.png",
      title: "Mobile Slide 3",
      pos: "object-[center_20%]"
    },
    {
      img: "https://i.imgur.com/cplW2Gi.png",
      title: "Mobile Slide 4",
      pos: "object-[center_20%]"
    }
  ];

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const activeSlides = isMobile ? mobileHeroSlides : heroSlides;

  useEffect(() => {
    setCurrentSlide(0);
  }, [isMobile]);

  useEffect(() => {
    if (isHeroHovered && window.innerWidth >= 1024) return;
    
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide((prev) => prev + 1);
    }, 3000); 
    return () => clearInterval(timer);
  }, [isHeroHovered]);

  const handleTransitionEnd = () => {
    if (currentSlide >= activeSlides.length) {
      setIsTransitioning(false);
      setCurrentSlide(0);
    }
  };

  // Sticky Back to top or donate CTAs
  const [scrolledHeight, setScrolledHeight] = useState(0);
  const [logoFailed, setLogoFailed] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolledHeight(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const homeHeroRef = useRef<HTMLDivElement>(null);
  const homeHeroBlurRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!homeHeroRef.current) return;
      if (activePage !== "home") return;

      const scrollY = window.scrollY;
      const heroHeight = homeHeroRef.current.offsetHeight || 700;
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
      const blurVal = progress * 16;
      
      if (homeHeroBlurRef.current) {
        // Apply smooth blur & progressive layout scale to eliminate edge bleed of blurred pixels
        const scaleVal = 1 + (progress * 0.05);
        homeHeroBlurRef.current.style.filter = `blur(${blurVal}px)`;
        homeHeroBlurRef.current.style.transform = `scale(${scaleVal}) translate3d(0, 0, 0)`;
      }
      
      if (progress >= 1) {
        homeHeroRef.current.style.visibility = "hidden";
      } else {
        homeHeroRef.current.style.visibility = "visible";
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activePage]);

  // Modular Custom Donation Gateway Premium multi-step state
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [donationStep, setDonationStep] = useState<1 | 2>(1);
  const [donationCategory, setDonationCategory] = useState<"individual" | "family">("individual");
  const [donateType, setDonateType] = useState<"one-time" | "monthly">("monthly");
  const [donateAmount, setDonateAmount] = useState<string>(""); // Neutral default empty state
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null); // Track selected card preset
  const [customAmount, setCustomAmount] = useState<string>(""); // Track custom typed in amount
  const [isProceeding, setIsProceeding] = useState(false); // Track proceed transition

  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("edu-01");
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "crypto">("bank");
  const [cryptoCurrency, setCryptoCurrency] = useState<"bitcoin" | "trc20" | "erc20">("bitcoin");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [payerName, setPayerName] = useState("");
  const [payerEmail, setPayerEmail] = useState("");
  const [payerPhone, setPayerPhone] = useState("");
  const [payerPrayer, setPayerPrayer] = useState("");
  const [payerWishes, setPayerWishes] = useState("");
  const [selectedCountryObj, setSelectedCountryObj] = useState(COUNTRIES_LIST[0]);
  const [countrySearchQuery, setCountrySearchQuery] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [emailValidationTouched, setEmailValidationTouched] = useState(false);
  const [phoneValidationTouched, setPhoneValidationTouched] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [showBudgetPopup, setShowBudgetPopup] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isDonationPressed, setIsDonationPressed] = useState(false);
  
  // 2026 Budget Gallery Lightbox & PDF download states
  const [activeBudgetImg, setActiveBudgetImg] = useState<string | null>(null);
  const [budgetZoom, setBudgetZoom] = useState<number>(1);
  const [budgetPan, setBudgetPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isBudgetDragging, setIsBudgetDragging] = useState<boolean>(false);
  const [budgetPanStart, setBudgetPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDownloadingPdf, setIsDownloadingPdf] = useState<boolean>(false);
  const [isCipherOpen, setIsCipherOpen] = useState(() => {
    return localStorage.getItem("isCipherOpen") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isCipherOpen", isCipherOpen ? "true" : "false");
  }, [isCipherOpen]);

  useEffect(() => {
    const lacksCookieConsent = localStorage.getItem("pf_cookie_consent") !== "accepted";
    if (lacksCookieConsent) {
      const timer = setTimeout(() => {
        setShowCookieBanner(true);
      }, 4500); // Show cookie consent banner after 4.5 seconds
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowBudgetPopup(true);
      }, 4500); // Show budget popup after 4.5 seconds if cookie accepted
      return () => clearTimeout(timer);
    }
  }, []);
  const [volunteerEmail, setVolunteerEmail] = useState("");
  const [volunteerPhone, setVolunteerPhone] = useState("");
  const [selectedVolunteerCountryObj, setSelectedVolunteerCountryObj] = useState(COUNTRIES_LIST[0]);
  const [isVolunteerCountryDropdownOpen, setIsVolunteerCountryDropdownOpen] = useState(false);
  const [volunteerCountrySearchQuery, setVolunteerCountrySearchQuery] = useState("");
  const [volunteerPhoneValidationTouched, setVolunteerPhoneValidationTouched] = useState(false);

  useEffect(() => {
    if (paymentSuccess || showPaymentPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [paymentSuccess, showPaymentPopup]);

  const [recentDonors, setRecentDonors] = useState([
    { name: "Michael J. Anderson", amount: 12000, time: "2 min ago", project: "Medical Units" },
    { name: "Eleanor Hughes", amount: 5000, time: "9 min ago", project: "Women Grants" },
    { name: "Dr. Fatima Al Suwaidi", amount: 7500, time: "18 min ago", project: "Water Aquifers" },
  ]);

  const handleDownloadBudget = () => {
    setIsDownloadingPdf(true);
    try {
      const doc = new jsPDF("p", "mm", "a4");
      
      const drawPageFramework = (docObj: any, pageNum: number, pageTitle: string) => {
        // Frame border
        docObj.setDrawColor(241, 245, 249);
        docObj.setLineWidth(0.5);
        docObj.rect(8, 8, 194, 281);
        
        // Subtle top and bottom lines
        docObj.setDrawColor(226, 232, 240);
        docObj.line(12, 35, 198, 35);
        docObj.line(12, 275, 198, 275);
        
        // Header Title
        docObj.setFont("helvetica", "bold");
        docObj.setFontSize(9);
        docObj.setTextColor(15, 23, 42);
        docObj.text("PRINCE FAZZA CHARITY FOUNDATION 2026", 12, 22);
        
        docObj.setFont("helvetica", "normal");
        docObj.setFontSize(8);
        docObj.setTextColor(234, 88, 12);
        docObj.text("HUMANITARIAN DEVELOPMENT BUDGET", 12, 28);
        
        // Right side Page title
        docObj.setFont("helvetica", "italic");
        docObj.setTextColor(71, 85, 105);
        docObj.text(pageTitle, 198, 22, { align: "right" });
        
        // Footer
        docObj.setFont("helvetica", "bold");
        docObj.setFontSize(7);
        docObj.setTextColor(148, 163, 184);
        docObj.text(`PAGE ${pageNum} OF 14 • CONFIDENTIAL ADMINISTRATIVE RECORDS`, 105, 282, { align: "center" });
      };

      // PAGE 1: PROJECT MASTER SCOPE & GLOBAL COVERAGE
      drawPageFramework(doc, 1, "PROJECT MASTER SCOPE");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(15, 23, 42);
      doc.text("2026 CHARITY DEVELOPMENT MASTER SCOPE", 12, 48);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      doc.text("Approved Appropriations Matrix for Facility Construction and Triage Operations", 12, 54);
      
      doc.setDrawColor(226, 232, 240);
      doc.line(12, 59, 198, 59);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text("Global Operations Infrastructure Distribution Outline:", 12, 70);

      const scopeItems = [
        "33 School Renovations Across Active Rural Provinces",
        "28 Critical Hospital Medical Wing & Emergency Facility Renovations",
        "50 Homes for the Homeless Construction initiatives",
        "50 Homeless Community Shelter Infrastructure Modules",
        "5 Global Academic Mentorship & Sovereign Leadership Hubs",
        "2 Sovereign-Level Emergency Hunger Relief Operations",
        "Continuous Multi-Regional Food Bank Logistics Support Base",
        "Rural Agricultural and Water Pipeline Infrastructure Reservoir Support"
      ];

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      scopeItems.forEach((item, index) => {
        doc.setFillColor(234, 88, 12);
        doc.circle(16, 82 + (index * 12), 1, "F");
        doc.text(item, 22, 84 + (index * 12));
      });

      // Highlight Box: Target Grand Total
      doc.setFillColor(255, 247, 237);
      doc.setDrawColor(253, 186, 116);
      doc.rect(12, 190, 186, 50, "DF");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(15, 23, 42);
      doc.text("MASTER ALLOCATION TARGET UNIT:", 18, 208);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(234, 88, 12);
      doc.text("$68,025,211,000 USD", 18, 225);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text("Fully endowed and scheduled for logistics disbursement over calendar fiscal year 2026.", 18, 233);

      // PAGE 2: SCHOOL RENOVATIONS - ASIA
      doc.addPage();
      drawPageFramework(doc, 2, "SCHOOL RENOVATIONS - ASIA");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text("SCHOOL RENOVATION PROGRAM: ASIA (12 Schools)", 12, 48);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text("Primary educational logistics and structural upgrades in rural and peripheral zones.", 12, 54);

      let tableY = 64;
      doc.setFillColor(248, 250, 252);
      doc.rect(12, tableY, 186, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text("School Name", 15, tableY + 7);
      doc.text("Province/State", 100, tableY + 7);
      doc.text("Budget USD", 195, tableY + 7, { align: "right" });

      const asiaSchools = [
        { name: "Silver Banyan Academy", loc: "Karnataka, India", budget: "$980,000,000" },
        { name: "Horizon Crest Institute", loc: "Maharashtra, India", budget: "$975,000,000" },
        { name: "Lotus Meridian School", loc: "Lao Cai Province, Vietnam", budget: "$965,000,000" },
        { name: "Emerald Delta Academy", loc: "Dong Thap Province, Vietnam", budget: "$960,000,000" },
        { name: "Sunridge Technical College", loc: "Nagano Prefecture, Japan", budget: "$950,000,000" },
        { name: "Kiyora Learning Institute", loc: "Akita Prefecture, Japan", budget: "$945,000,000" },
        { name: "Golden Cedar School", loc: "Selangor, Malaysia", budget: "$935,000,000" },
        { name: "Pacific Ridge Academy", loc: "Sabah, Malaysia", budget: "$930,000,000" },
        { name: "Blue Harbor Preparatory School", loc: "West Java, Indonesia", budget: "$925,000,000" },
        { name: "Meridian Valley Institute", loc: "Central Java, Indonesia", budget: "$920,000,000" },
        { name: "Jade Falcon Academy", loc: "Arkhangai Province, Mongolia", budget: "$910,000,000" },
        { name: "Silk Route Science School", loc: "Almaty Region, Kazakhstan", budget: "$905,000,000" }
      ];

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      tableY += 10;
      asiaSchools.forEach((school) => {
        doc.text(school.name, 15, tableY + 7);
        doc.text(school.loc, 100, tableY + 7);
        doc.text(school.budget, 195, tableY + 7, { align: "right" });
        doc.setDrawColor(241, 245, 249);
        doc.line(12, tableY + 11, 198, tableY + 11);
        tableY += 11;
      });

      // Total row
      doc.setFillColor(255, 247, 237);
      doc.rect(12, tableY + 2, 186, 12, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text("Asia Schools Total:", 15, tableY + 10);
      doc.text("$11,300,000,000", 195, tableY + 10, { align: "right" });

      // PAGE 3: SCHOOL RENOVATIONS - EUROPE
      doc.addPage();
      drawPageFramework(doc, 3, "SCHOOL RENOVATIONS - EUROPE");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text("SCHOOL RENOVATION PROGRAM: EUROPE (15 Schools)", 12, 48);
      
      tableY = 58;
      doc.setFillColor(248, 250, 252);
      doc.rect(12, tableY, 186, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text("School Name", 15, tableY + 7);
      doc.text("Province/State", 100, tableY + 7);
      doc.text("Budget USD", 195, tableY + 7, { align: "right" });

      const euroSchools = [
        { name: "Alderstone Academy", loc: "Bavaria, Germany", budget: "$730,000,000" },
        { name: "North Elbe Institute", loc: "Lower Saxony, Germany", budget: "$725,000,000" },
        { name: "Greenmoor School", loc: "County Clare, Ireland", budget: "$720,000,000" },
        { name: "Atlantic Ridge College", loc: "County Kerry, Ireland", budget: "$715,000,000" },
        { name: "Silver Coast Academy", loc: "Faro District, Portugal", budget: "$710,000,000" },
        { name: "Iberian Heights School", loc: "Aragon, Spain", budget: "$705,000,000" },
        { name: "Rivergate Preparatory School", loc: "Galicia, Spain", budget: "$700,000,000" },
        { name: "Alpine Crest Institute", loc: "Valais, Switzerland", budget: "$695,000,000" },
        { name: "Linden Grove Academy", loc: "Styria, Austria", budget: "$690,000,000" },
        { name: "Danube Horizon School", loc: "Bacs-Kiskun, Hungary", budget: "$685,000,000" },
        { name: "Baltic Pines School", loc: "Parnu County, Estonia", budget: "$680,000,000" },
        { name: "Aurora Technical Institute", loc: "North Karelia, Finland", budget: "$675,000,000" },
        { name: "Highland Beacon Academy", loc: "Highland, Scotland", budget: "$670,000,000" },
        { name: "Carpathian Learning Centre", loc: "Brasov, Romania", budget: "$665,000,000" },
        { name: "Sapphire Valley School", loc: "Smolyan, Bulgaria", budget: "$660,000,000" }
      ];

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      tableY += 10;
      euroSchools.forEach((school) => {
        doc.text(school.name, 15, tableY + 6);
        doc.text(school.loc, 100, tableY + 6);
        doc.text(school.budget, 195, tableY + 6, { align: "right" });
        doc.setDrawColor(241, 245, 249);
        doc.line(12, tableY + 10, 198, tableY + 10);
        tableY += 10;
      });

      doc.setFillColor(255, 247, 237);
      doc.rect(12, tableY + 2, 186, 12, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text("Europe Schools Total:", 15, tableY + 10);
      doc.text("$10,425,000,000", 195, tableY + 10, { align: "right" });

      // PAGE 4: SCHOOL RENOVATIONS - NORTH AMERICA
      doc.addPage();
      drawPageFramework(doc, 4, "SCHOOL RENOVATIONS - NORTH AMERICA");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text("SCHOOL RENOVATION PROGRAM: NORTH AMERICA (6 Schools)", 12, 48);

      tableY = 64;
      doc.setFillColor(248, 250, 252);
      doc.rect(12, tableY, 186, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text("School Name", 15, tableY + 7);
      doc.text("Province/State", 100, tableY + 7);
      doc.text("Budget USD", 195, tableY + 7, { align: "right" });

      const naSchools = [
        { name: "Red Maple Academy", loc: "Ontario, Canada", budget: "$500,000,000" },
        { name: "Northern Lights Institute", loc: "Manitoba, Canada", budget: "$495,000,000" },
        { name: "Prairie Horizon School", loc: "Saskatchewan, Canada", budget: "$490,000,000" },
        { name: "Desert Crest Academy", loc: "New Mexico, USA", budget: "$485,000,000" },
        { name: "Blue Canyon Preparatory School", loc: "Utah, USA", budget: "$480,000,000" },
        { name: "Great Lakes Technical Institute", loc: "Michigan, USA", budget: "$475,000,000" }
      ];

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      tableY += 10;
      naSchools.forEach((school) => {
        doc.text(school.name, 15, tableY + 7);
        doc.text(school.loc, 100, tableY + 7);
        doc.text(school.budget, 195, tableY + 7, { align: "right" });
        doc.setDrawColor(241, 245, 249);
        doc.line(12, tableY + 12, 198, tableY + 12);
        tableY += 12;
      });

      doc.setFillColor(255, 247, 237);
      doc.rect(12, tableY + 2, 186, 12, "F");
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text("North America Schools Total:", 15, tableY + 10);
      doc.text("$2,925,000,000", 195, tableY + 10, { align: "right" });

      // PAGE 5: HOSPITAL RENOVATIONS - ASIA
      doc.addPage();
      drawPageFramework(doc, 5, "HOSPITAL RENOVATIONS - ASIA");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text("HOSPITAL RENOVATION PROGRAM: ASIA (10 Hospitals)", 12, 48);

      tableY = 64;
      doc.setFillColor(248, 250, 252);
      doc.rect(12, tableY, 186, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text("Hospital Name", 15, tableY + 7);
      doc.text("Province/State", 100, tableY + 7);
      doc.text("Budget USD", 195, tableY + 7, { align: "right" });

      const asiaHospitals = [
        { name: "Valley Crest Medical Centre", loc: "Kerala, India", budget: "$900,000,000" },
        { name: "Banyan Plains General Hospital", loc: "Telangana, India", budget: "$890,000,000" },
        { name: "Lotus River Hospital", loc: "An Giang, Vietnam", budget: "$880,000,000" },
        { name: "Sunrise Provincial Hospital", loc: "Bac Giang, Vietnam", budget: "$870,000,000" },
        { name: "Shinsei Community Hospital", loc: "Yamagata, Japan", budget: "$860,000,000" },
        { name: "North Pine Regional Hospital", loc: "Hokkaido, Japan", budget: "$850,000,000" },
        { name: "Emerald Coast Medical Centre", loc: "Sarawak, Malaysia", budget: "$840,000,000" },
        { name: "Nusantara Valley Hospital", loc: "East Java, Indonesia", budget: "$830,000,000" },
        { name: "Steppe Horizon Hospital", loc: "Ovorkhangai, Mongolia", budget: "$820,000,000" },
        { name: "Caspian Frontier Medical Centre", loc: "Mangystau, Kazakhstan", budget: "$810,000,000" }
      ];

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      tableY += 10;
      asiaHospitals.forEach((health) => {
        doc.text(health.name, 15, tableY + 7);
        doc.text(health.loc, 100, tableY + 7);
        doc.text(health.budget, 195, tableY + 7, { align: "right" });
        doc.setDrawColor(241, 245, 249);
        doc.line(12, tableY + 12, 198, tableY + 12);
        tableY += 12;
      });

      doc.setFillColor(255, 247, 237);
      doc.rect(12, tableY + 2, 186, 12, "F");
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text("Asia Hospitals Total:", 15, tableY + 10);
      doc.text("$8,550,000,000", 195, tableY + 10, { align: "right" });

      // PAGE 6: HOSPITAL RENOVATIONS - EUROPE
      doc.addPage();
      drawPageFramework(doc, 6, "HOSPITAL RENOVATIONS - EUROPE");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text("HOSPITAL RENOVATION PROGRAM: EUROPE (10 Hospitals)", 12, 48);

      tableY = 64;
      doc.setFillColor(248, 250, 252);
      doc.rect(12, tableY, 186, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text("Hospital Name", 15, tableY + 7);
      doc.text("Province/State", 100, tableY + 7);
      doc.text("Budget USD", 195, tableY + 7, { align: "right" });

      const euroHospitals = [
        { name: "Rhine Valley General Hospital", loc: "Rhine-Westphalia, Germany", budget: "$750,000,000" },
        { name: "Alpine Regional Medical Centre", loc: "Tyrol, Austria", budget: "$740,000,000" },
        { name: "Emerald Coast Hospital", loc: "Cork, Ireland", budget: "$730,000,000" },
        { name: "Atlantic Community Hospital", loc: "Algarve, Portugal", budget: "$720,000,000" },
        { name: "Sierra Norte Medical Centre", loc: "Madrid, Spain", budget: "$710,000,000" },
        { name: "Baltic Health Institute Hospital", loc: "Harju County, Estonia", budget: "$700,000,000" },
        { name: "Aurora Lakes Hospital", loc: "Lapland, Finland", budget: "$690,000,000" },
        { name: "Highland Regional Hospital", loc: "Inverness, Scotland", budget: "$680,000,000" },
        { name: "Carpathian Medical Centre", loc: "Sibiu, Romania", budget: "$670,000,000" },
        { name: "Black Sea Community Hospital", loc: "Varna, Bulgaria", budget: "$660,000,000" }
      ];

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      tableY += 10;
      euroHospitals.forEach((health) => {
        doc.text(health.name, 15, tableY + 7);
        doc.text(health.loc, 100, tableY + 7);
        doc.text(health.budget, 195, tableY + 7, { align: "right" });
        doc.setDrawColor(241, 245, 249);
        doc.line(12, tableY + 12, 198, tableY + 12);
        tableY += 12;
      });

      doc.setFillColor(255, 247, 237);
      doc.rect(12, tableY + 2, 186, 12, "F");
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text("Europe Hospitals Total:", 15, tableY + 10);
      doc.text("$7,050,000,000", 195, tableY + 10, { align: "right" });

      // PAGE 7: HOSPITAL RENOVATIONS - NORTH AMERICA
      doc.addPage();
      drawPageFramework(doc, 7, "HOSPITAL RENOVATIONS - NORTH AMERICA");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text("HOSPITAL RENOVATION PROGRAM: NORTH AMERICA (8 Hospitals)", 12, 48);

      tableY = 64;
      doc.setFillColor(248, 250, 252);
      doc.rect(12, tableY, 186, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text("Hospital Name", 15, tableY + 7);
      doc.text("Province/State", 100, tableY + 7);
      doc.text("Budget USD", 195, tableY + 7, { align: "right" });

      const naHospitals = [
        { name: "Maple River Hospital", loc: "Ontario, Canada", budget: "$500,000,000" },
        { name: "Northern Prairie Medical Centre", loc: "Alberta, Canada", budget: "$490,000,000" },
        { name: "Pacific Timber Hospital", loc: "British Columbia, Canada", budget: "$480,000,000" },
        { name: "Desert Valley Regional Hospital", loc: "Arizona, USA", budget: "$470,000,000" },
        { name: "Canyon Ridge Medical Centre", loc: "Nevada, USA", budget: "$460,000,000" },
        { name: "Great Lakes Community Hospital", loc: "Wisconsin, USA", budget: "$450,000,000" },
        { name: "Redwood Plains Hospital", loc: "Oregon, USA", budget: "$440,000,000" },
        { name: "Frontier Health Medical Centre", loc: "Montana, USA", budget: "$430,000,000" }
      ];

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      tableY += 10;
      naHospitals.forEach((health) => {
        doc.text(health.name, 15, tableY + 7);
        doc.text(health.loc, 100, tableY + 7);
        doc.text(health.budget, 195, tableY + 7, { align: "right" });
        doc.setDrawColor(241, 245, 249);
        doc.line(12, tableY + 12, 198, tableY + 12);
        tableY += 12;
      });

      doc.setFillColor(255, 247, 237);
      doc.rect(12, tableY + 2, 186, 12, "F");
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text("North America Hospitals Total:", 15, tableY + 10);
      doc.text("$3,720,000,000", 195, tableY + 10, { align: "right" });

      // PAGE 8: HOMES FOR THE HOMELESS
      doc.addPage();
      drawPageFramework(doc, 8, "HOMES FOR THE HOMELESS");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text("HOMES FOR THE HOMELESS (50 Rural Villages)", 12, 48);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      doc.text("Establishing permanent, resilient housing and micro-grid systems.", 12, 54);

      tableY = 70;
      doc.setFillColor(248, 250, 252);
      doc.rect(12, tableY, 186, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("Regions Covered", 15, tableY + 7);
      doc.text("Target Volume", 100, tableY + 7);
      doc.text("Budget USD", 195, tableY + 7, { align: "right" });

      const homeVillages = [
        { reg: "Europe Rural Interior Villages", vol: "20 Villages • Off-grid housing blocks", budget: "$2,500,000,000" },
        { reg: "Asia Rural Interior Villages", vol: "20 Villages • Water pipeline integration", budget: "$2,500,000,000" },
        { reg: "North America Interior Villages", vol: "10 Villages • Thermal insulated cabins", budget: "$1,250,000,000" }
      ];

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      tableY += 10;
      homeVillages.forEach((village) => {
        doc.text(village.reg, 15, tableY + 7);
        doc.text(village.vol, 100, tableY + 7);
        doc.text(village.budget, 195, tableY + 7, { align: "right" });
        doc.setDrawColor(241, 245, 249);
        doc.line(12, tableY + 12, 198, tableY + 12);
        tableY += 12;
      });

      doc.setFillColor(255, 247, 237);
      doc.rect(12, tableY + 2, 186, 12, "F");
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text("Homes Program Total:", 15, tableY + 10);
      doc.text("$6,250,000,000", 195, tableY + 10, { align: "right" });

      // PAGE 9: HOMELESS COMMUNITY SHELTERS
      doc.addPage();
      drawPageFramework(doc, 9, "HOMELESS COMMUNITY SHELTERS");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text("HOMELESS COMMUNITY SHELTERS (50 Rural Villages)", 12, 48);

      tableY = 70;
      doc.setFillColor(248, 250, 252);
      doc.rect(12, tableY, 186, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("Region Modules", 15, tableY + 7);
      doc.text("Target Volume", 100, tableY + 7);
      doc.text("Budget USD", 195, tableY + 7, { align: "right" });

      const shelterVillages = [
        { reg: "Europe Shelter Systems", vol: "20 Villages • Integrated medical clinics", budget: "$2,500,000,000" },
        { reg: "Asia Shelter Systems", vol: "20 Villages • Sanitation & logistics bases", budget: "$2,500,000,000" },
        { reg: "North America Shelter Systems", vol: "10 Villages • Thermal winter design", budget: "$1,250,000,000" }
      ];

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      tableY += 10;
      shelterVillages.forEach((village) => {
        doc.text(village.reg, 15, tableY + 7);
        doc.text(village.vol, 100, tableY + 7);
        doc.text(village.budget, 195, tableY + 7, { align: "right" });
        doc.setDrawColor(241, 245, 249);
        doc.line(12, tableY + 12, 198, tableY + 12);
        tableY += 12;
      });

      doc.setFillColor(255, 247, 237);
      doc.rect(12, tableY + 2, 186, 12, "F");
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text("Shelter Program Total:", 15, tableY + 10);
      doc.text("$6,250,000,000", 195, tableY + 10, { align: "right" });

      // PAGE 10: MENTORSHIP & LEADERSHIP PROGRAMS
      doc.addPage();
      drawPageFramework(doc, 10, "MENTORSHIP & LEADERSHIP HUBS");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text("MENTORSHIP & LEADERSHIP ACADEMIC HUBS", 12, 48);

      tableY = 70;
      doc.setFillColor(248, 250, 252);
      doc.rect(12, tableY, 186, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("Hub Location", 15, tableY + 7);
      doc.text("Country", 100, tableY + 7);
      doc.text("Budget USD", 195, tableY + 7, { align: "right" });

      const mentorHubs = [
        { locate: "Gandaki District Hub", country: "Nepal", budget: "$850,000,000" },
        { locate: "Manila Metro Hub", country: "Philippines", budget: "$900,000,000" },
        { locate: "Bucharest Regional Hub", country: "Romania", budget: "$875,000,000" },
        { locate: "Almaty Education Center", country: "Kazakhstan", budget: "$925,000,000" },
        { locate: "Phoenix Inter-Community Base", country: "United States", budget: "$950,000,000" }
      ];

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      tableY += 10;
      mentorHubs.forEach((hub) => {
        doc.text(hub.locate, 15, tableY + 7);
        doc.text(hub.country, 100, tableY + 7);
        doc.text(hub.budget, 195, tableY + 7, { align: "right" });
        doc.setDrawColor(241, 245, 249);
        doc.line(12, tableY + 12, 198, tableY + 12);
        tableY += 12;
      });

      doc.setFillColor(255, 247, 237);
      doc.rect(12, tableY + 2, 186, 12, "F");
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text("Mentorship Hubs Total:", 15, tableY + 10);
      doc.text("$4,500,000,000", 195, tableY + 10, { align: "right" });

      // PAGE 11: FOOD BANK NETWORK
      doc.addPage();
      drawPageFramework(doc, 11, "GLOBAL FOOD BANK NETWORKS");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text("GLOBAL FOOD BANK LOGISTICS NETWORKS", 12, 48);

      tableY = 70;
      doc.setFillColor(248, 250, 252);
      doc.rect(12, tableY, 186, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("Network Cluster", 15, tableY + 7);
      doc.text("Activity Range", 100, tableY + 7);
      doc.text("Budget USD", 195, tableY + 7, { align: "right" });

      const foodBanks = [
        { net: "Asia Rural Food Bank Network", range: "Logistics base, refrigeration, trucks", budget: "$1,750,000,000" },
        { net: "Europe Rural Food Bank Network", range: "Silo purchase, grain storage capacity", budget: "$1,650,000,000" },
        { net: "North America Food Bank Network", range: "Local pantry dispatch networks", budget: "$1,600,000,000" }
      ];

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      tableY += 10;
      foodBanks.forEach((fb) => {
        doc.text(fb.net, 15, tableY + 7);
        doc.text(fb.range, 100, tableY + 7);
        doc.text(fb.budget, 195, tableY + 7, { align: "right" });
        doc.setDrawColor(241, 245, 249);
        doc.line(12, tableY + 12, 198, tableY + 12);
        tableY += 12;
      });

      doc.setFillColor(255, 247, 237);
      doc.rect(12, tableY + 2, 186, 12, "F");
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text("Food Bank Support Total:", 15, tableY + 10);
      doc.text("$5,000,000,000", 195, tableY + 10, { align: "right" });

      // PAGE 12: EMERGENCY HUNGER RELIEF
      doc.addPage();
      drawPageFramework(doc, 12, "EMERGENCY HUNGER RELIEF");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text("EMERGENCY HUNGER RELIEF OPERATIONS", 12, 48);

      tableY = 70;
      doc.setFillColor(248, 250, 252);
      doc.rect(12, tableY, 186, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("Operations Zone", 15, tableY + 7);
      doc.text("Primary Dispatch Tactics", 100, tableY + 7);
      doc.text("Budget USD", 195, tableY + 7, { align: "right" });

      const hungerRelief = [
        { zone: "Kabul, Afghanistan Base", tactic: "Hot meal kitchens, pediatric nutrition kits", budget: "$1,750,000,000" },
        { zone: "Kharkiv, Ukraine Base", tactic: "Mobile warming hubs, immediate dry rations", budget: "$1,750,000,000" }
      ];

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      tableY += 10;
      hungerRelief.forEach((hr) => {
        doc.text(hr.zone, 15, tableY + 7);
        doc.text(hr.tactic, 100, tableY + 7);
        doc.text(hr.budget, 195, tableY + 7, { align: "right" });
        doc.setDrawColor(241, 245, 249);
        doc.line(12, tableY + 12, 198, tableY + 12);
        tableY += 12;
      });

      doc.setFillColor(255, 247, 237);
      doc.rect(12, tableY + 2, 186, 12, "F");
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text("Emergency Triage Relief Total:", 15, tableY + 10);
      doc.text("$3,500,000,000", 195, tableY + 10, { align: "right" });

      // PAGE 13: RURAL INFRASTRUCTURE RESERVE
      doc.addPage();
      drawPageFramework(doc, 13, "INFRASTRUCTURE & OPERATIONAL RESERVES");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text("RURAL INFRASTRUCTURE & DISASTER RESERVES", 12, 48);

      tableY = 70;
      doc.setFillColor(248, 250, 252);
      doc.rect(12, tableY, 186, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("Sector Asset Cluster", 15, tableY + 7);
      doc.text("Tactical Scope Outline", 100, tableY + 7);
      doc.text("Budget USD", 195, tableY + 7, { align: "right" });

      const infraReserves = [
        { item: "Roads & Access Infrastructure", scope: "Connecting deep interior rural sectors", budget: "$3,500,000,000" },
        { item: "Water & Sanitation Projects", scope: "Artesian supply borewells, treatment units", budget: "$2,000,000,000" },
        { item: "Power & Renewable Smart Grids", scope: "Sovereign solar microgrid deployment", budget: "$1,250,000,000" },
        { item: "Logistics & Transport Fleet", scope: "AWD emergency transport vehicles & ships", budget: "$1,000,000,000" },
        { item: "Program Management & Oversight", scope: "Field engineering oversight, EY monitoring", budget: "$805,211,000" }
      ];

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      tableY += 10;
      infraReserves.forEach((infra) => {
        doc.text(infra.item, 15, tableY + 7);
        doc.text(infra.scope, 100, tableY + 7);
        doc.text(infra.budget, 195, tableY + 7, { align: "right" });
        doc.setDrawColor(241, 245, 249);
        doc.line(12, tableY + 12, 198, tableY + 12);
        tableY += 12;
      });

      doc.setFillColor(255, 247, 237);
      doc.rect(12, tableY + 2, 186, 12, "F");
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text("Sovereign Reserve Total:", 15, tableY + 10);
      doc.text("$8,555,211,000", 195, tableY + 10, { align: "right" });

      // PAGE 14: CONSOLIDATED SUMMARY & AUTHORIZATION SIGNATURES
      doc.addPage();
      drawPageFramework(doc, 14, "CONSOLIDATED MASTER APPROVAL");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text("FINAL CONSOLIDATED SUMMARY & SANCTION", 12, 48);

      tableY = 64;
      doc.setFillColor(248, 250, 252);
      doc.rect(12, tableY, 186, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("Chapter Development Program Category", 15, tableY + 7);
      doc.text("Sub-Chapters Active", 100, tableY + 7);
      doc.text("Consolidated Allocation (USD)", 195, tableY + 7, { align: "right" });

      const finalChapters = [
        { name: "01. School Renovation Program (Global)", info: "33 Educational Academic Academies", budget: "$24,650,000,000" },
        { name: "02. Hospital Facility Infrastructure (Global)", info: "28 Critical Hospital Formations", budget: "$19,320,000,000" },
        { name: "03. Homes for the Homeless Construction", info: "50 Rural Community Hub Villages", budget: "$6,250,000,000" },
        { name: "04. Homeless Community Shelters Program", info: "50 Complex Living Triage Centers", budget: "$6,250,000,000" },
        { name: "05. Mentorship & High Leadership Hubs", info: "5 Integrated Training Academies", budget: "$4,500,000,000" },
        { name: "06. Food Bank and Logistics Deployment", info: "3 Multi-National Depot Bases", budget: "$5,000,000,000" },
        { name: "07. Emergency Hunger Relief Logistics Base", info: "Kabul and Kharkiv Active Divisions", budget: "$3,500,000,000" },
        { name: "08. Rural Infrastructure Operations Reserves", info: "Roads, Clean Water, Energy Reserve", budget: "$8,555,211,000" }
      ];

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      tableY += 10;
      finalChapters.forEach((chap) => {
        doc.text(chap.name, 15, tableY + 7);
        doc.text(chap.info, 100, tableY + 7);
        doc.text(chap.budget, 195, tableY + 7, { align: "right" });
        doc.setDrawColor(241, 245, 249);
        doc.line(12, tableY + 11, 198, tableY + 11);
        tableY += 11;
      });

      // Target Grand Total box
      doc.setFillColor(254, 242, 242);
      doc.rect(12, tableY + 3, 186, 14, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(220, 38, 38);
      doc.text("GRAND CONSOLIDATED DEVELOPMENT ALLOCATION:", 15, tableY + 12);
      doc.text("$68,025,211,000", 195, tableY + 12, { align: "right" });

      // Signatures Box
      doc.setDrawColor(226, 232, 240);
      doc.setFillColor(255, 255, 255);
      doc.rect(12, tableY + 23, 186, 38, "S");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text("CERTIFICATION OF SOVEREIGN RATIFICATION & AUDIT SANCTION CERTIFICATION", 16, tableY + 29);

      // Signature 1
      doc.setFont("courier", "italic");
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);
      doc.text("H.H Sheikh Fazza Al Maktoum", 20, tableY + 41);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(148, 163, 184);
      doc.text("________________________________________", 16, tableY + 45);
      doc.text("His Highness Sheikh Hamdan Bin Al Maktoum \nSovereign Sponsor and Chairman", 16, tableY + 49);

      // Signature 2
      doc.setFont("courier", "italic");
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);
      doc.text("Williams H. Harison", 125, tableY + 41);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(148, 163, 184);
      doc.text("________________________________________", 120, tableY + 45);
      doc.text("Williams H. Harison\nGlobal Lead Audit Director (EY)", 120, tableY + 49);

      // Save document
      doc.save("Fazza_Charity_Humanitarian_Budget_2026.pdf");
    } catch (e) {
      console.error("PDF download failure:", e);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payerEmail);
    const isPhoneValid = payerPhone.length === selectedCountryObj.length;

    setEmailValidationTouched(true);
    setPhoneValidationTouched(true);

    if (!payerName.trim() || !isEmailValid || !isPhoneValid) {
      return;
    }

    setIsDonationPressed(true);
    setTimeout(() => {
      setIsDonationPressed(false);
      setShowPaymentPopup(true);
    }, 600);
  };

  const constructWhatsAppMessage = (method: "bank" | "crypto") => {
    const amountStr = Number(donateAmount) ? `$${Number(donateAmount).toLocaleString()}` : "Custom Volume";
    
    const charityPrayer = payerPrayer.trim() ? payerPrayer.trim() : "None";
    const userPrayerRequest = payerWishes.trim() ? payerWishes.trim() : "None";

    const finalLine = method === "crypto"
      ? "Please send me the cryptocurrency wallet address or QR code so I can finalize this contribution immediately. Thank you."
      : "Please send me the bank account details so I can finalize this contribution immediately. Thank you.";

    const text = `Hello Prince Fazza Charity Foundation

My Name: ${payerName.trim()}
Email: ${payerEmail.trim()}
Phone Number: ${selectedCountryObj.code} ${payerPhone.trim()}

Prayer For The Charity:
${charityPrayer}

My Prayer Request:
${userPrayerRequest}

Donation Amount:
${amountStr}

${finalLine}`;

    return encodeURIComponent(text);
  };

  const handlePaymentOptionSelect = async (method: "bank" | "crypto") => {
    const url = `https://wa.me/12272664466?text=${constructWhatsAppMessage(method)}`;
    
    // Save donation submission to Firestore donations collection
    try {
      const dbPath = "donations";
      await addDoc(collection(db, dbPath), {
        fullName: payerName,
        email: payerEmail,
        phoneNumber: `${selectedCountryObj.code} ${payerPhone.trim()}`,
        amount: Number(donateAmount) || 1000,
        prayerRequest: payerWishes.trim() || "",
        prayerForCharity: payerPrayer.trim() || "",
        selectedPaymentMethod: method,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Firestore Donation log error:", error);
    }

    // Automatically generate a Donation Ticket in pending state
    try {
      const ticketId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
      const dbPathTickets = "donationTickets";
      await addDoc(collection(db, dbPathTickets), {
        ticketId,
        fullName: payerName,
        email: payerEmail,
        phoneNumber: `${selectedCountryObj.code} ${payerPhone.trim()}`,
        amount: Number(donateAmount) || 1000,
        paymentMethod: method,
        prayerRequest: payerWishes.trim() || "",
        prayerForCharity: payerPrayer.trim() || "",
        timestamp: new Date().toISOString(),
        status: "Pending"
      });
    } catch (error) {
      console.error("Firestore Ticket generation error:", error);
    }

    // Update live localized feed
    const newAddition = {
      name: payerName,
      amount: Number(donateAmount) || 1000,
      time: "Just now",
      project: PROGRAMS.find(p => p.id === selectedCampaignId)?.category || "General Fund"
    };
    setRecentDonors([newAddition, ...recentDonors]);
    
    // Set payment success true to show nice receipt
    setPaymentSuccess(true);
    setShowPaymentPopup(false);
    
    // Redirect
    window.location.href = url;
  };

  // State-backed Commentary/Reviews system
  const [allComments, setAllComments] = useState<Comment[]>(COMMENTS);
  const [commentSearch, setCommentSearch] = useState("");
  const [commentRoleFilter, setCommentRoleFilter] = useState<string>("All");
  const [commentSort, setCommentSort] = useState<"latest" | "highest">("highest");
  const [commentPage, setCommentPage] = useState(1);
  const commentsPerPage = 8;

  // New Comment Submission Form
  const [newCommentText, setNewCommentText] = useState("");
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentRole, setNewCommentRole] = useState<"Donor" | "Volunteer" | "Beneficiary" | "Supporter">("Donor");
  const [newCommentRating, setNewCommentRating] = useState(5);
  const [newCommentCountry, setNewCommentCountry] = useState("United States");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName || !newCommentText) return;
    const added: Comment = {
      id: "fresh-" + Date.now(),
      name: newCommentName,
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(newCommentName)}&background=002366&color=fff`,
      country: newCommentCountry,
      role: newCommentRole,
      date: new Date().toISOString().split("T")[0],
      text: newCommentText,
      rating: newCommentRating,
      likes: 0,
      replies: []
    };
    setAllComments([added, ...allComments]);
    setNewCommentName("");
    setNewCommentText("");
    alert("Thank you. Your message of solidarity has been securely compiled!");
  };

  const handleLikeComment = (id: string) => {
    setAllComments(prev => prev.map(c => {
      if (c.id === id) {
        return { 
          ...c, 
          likes: (c.likedByUser ? c.likes - 1 : c.likes + 1), 
          likedByUser: !c.likedByUser 
        };
      }
      return c;
    }));
  };

  // Filtered comments logic
  const filteredComments = allComments.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(commentSearch.toLowerCase()) || 
                          c.country.toLowerCase().includes(commentSearch.toLowerCase()) ||
                          c.text.toLowerCase().includes(commentSearch.toLowerCase());
    const matchesRole = commentRoleFilter === "All" || c.role === commentRoleFilter;
    return matchesSearch && matchesRole;
  }).sort((a, b) => {
    if (commentSort === "latest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.likes - a.likes;
    }
  });

  const paginatedComments = filteredComments.slice(0, commentPage * commentsPerPage);

  // Success Story Before/After slider mock control
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  // Gallery view and Lightbox zoom overlay
  const [galleryCategory, setGalleryCategory] = useState<string>("All");
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const galleryItems = [
    { title: "Pupils Learning Space", cat: "Education", img: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80" },
    { title: "Mobile Dental Caravan", cat: "Medical", img: "https://images.unsplash.com/photo-1584515906207-fd664b1c585a?q=80&w=400" },
    { title: "Emergency Water Packs", cat: "Disaster Relief", img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80" },
    { title: "Supplying Nutritious Packets", cat: "Hunger Relief", img: "https://images.unsplash.com/photo-1494883759339-0b042055a4ee?q=80&w=400" },
    { title: "Women Handloom Guild", cat: "Empowerment", img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=400" },
    { title: "Subterranean Spring Drill", cat: "Water Projects", img: "https://images.unsplash.com/photo-1511632765486-a96cb75a8986?w=800&q=80" },
    { title: "Orphan Sanctuary Garden", cat: "Community Outreach", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400" },
    { title: "Gala Event Coordinator", cat: "Events", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=400" },
  ];

  // Global Impact Pin list interaction
  const [selectedImpactPin, setSelectedImpactPin] = useState<string>("Middle East");
  const impactMapPins = [
    { id: "ME", region: "Middle East", count: "120k", details: "15 active specialist clinics serving mountain villages.", coordinates: { top: "42%", left: "55%" } },
    { id: "CA", region: "Central Asia", count: "250k", details: "620 deep solar-powered aquifers constructed.", coordinates: { top: "58%", left: "57%" } },
    { id: "SA", region: "South Asia", count: "95k", details: "85 computer learning academies for children equipped.", coordinates: { top: "48%", left: "68%" } },
    { id: "LA", region: "Latin America", count: "40k", details: "Rapid emergency cyclone dry rations supplied.", coordinates: { top: "62%", left: "32%" } },
  ];

  // News / Press state
  const [selectedPressIdx, setSelectedPressIdx] = useState(0);
  const pressReleases = [
    { title: "Prince Fazza Charity Core signs global medical pact with AstraZeneca Network", date: "May 28, 2026", brief: "Agreement sets course for advanced diagnostics rollout in 14 rural network hospitals with full coverage of patient operational overhead." },
    { title: "Completion of High-Capacity Aquifer Project in Alay, Kyrgyzstan", date: "April 15, 2026", brief: "Eng. Rashid confirms solar purified pumps are streaming 200,000 gallons daily directly serving over thirty local clans." },
    { title: "Fazza Board certifies annual audit statement with record high efficiency ratio", date: "March 02, 2026", brief: "Independent audit by EY team verifies that 93.8% of public contributions directly fueled field activities, demonstrating model accountability." }
  ];

  // Volunteer portal subscription states
  const [volunteerName, setVolunteerName] = useState("");
  const [volunteerSkill, setVolunteerSkill] = useState("Medical Triage");
  const [volunteerHours, setVolunteerHours] = useState("Weekends");
  const [volunteerRegistered, setVolunteerRegistered] = useState(false);

  // Partner application state
  const [partnerOrg, setPartnerOrg] = useState("");
  const [partnerSuccess, setPartnerSuccess] = useState(false);

  // Career form state
  const [careerRole, setCareerRole] = useState("Field Logistics Analyst");
  const [careerSubmitted, setCareerSubmitted] = useState(false);

  // Inline Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsSigned, setNewsSigned] = useState(false);

  // Active page change helper wrapper
  const handlePageChange = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const currentFullUrl = new URL(window.location.href);
    currentFullUrl.searchParams.set("page", page);
    if (page === "home") {
      currentFullUrl.pathname = "/";
    } else {
      currentFullUrl.pathname = "/" + page;
    }
    window.history.pushState({ page }, "", currentFullUrl.toString());
    setSessionHistoryCount(prev => prev + 1);
  };

  const handleBackNavigation = () => {
    if (sessionHistoryCount > 0) {
      window.history.back();
    } else {
      handlePageChange("home");
    }
  };

  const isDonationFocusMode = activePage === "donate" && donationStep === 2 && !paymentSuccess;

  return (
    <div className={`min-h-screen font-sans text-[#111111] ${isDonationFocusMode ? 'bg-slate-50' : 'bg-white'}`}>
      {!paymentSuccess && (
        <>
          {/* Universal back button for Focus Mode */}
      {isDonationFocusMode && (
        <button 
          onClick={() => setDonationStep(1)} 
          className="fixed top-6 left-6 z-[999] w-10 h-10 rounded-full bg-white/40 hover:bg-white border border-slate-200/50 hover:border-slate-300 shadow-sm flex items-center justify-center opacity-40 hover:opacity-100 transition-all duration-300 cursor-pointer backdrop-blur-md"
          title="Return to previous page"
        >
          <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
      )}

      {/* Dynamic Header / Navbar component */}
      {!isDonationFocusMode && (
        <Navbar 
          activePage={activePage} 
          setActivePage={handlePageChange} 
          darkMode={false} 
          setDarkMode={() => {}}
          lang={lang} 
          setLang={setLang}
          openDonateModal={() => { handlePageChange("donate"); setDonationStep(1); }}
          highContrast={false}
          setHighContrast={() => {}}
          onBack={handleBackNavigation}
        />
      )}

      {/* FLOATING PREMIUM DONATE NOW BUTTON */}
      <AnimatePresence>
        {activePage !== "donate" && !isDonationFocusMode && (
          <motion.div 
            className="fixed bottom-6 right-6 z-50 flex items-center"
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: [0, -6, 0], // smooth gentle floating cycle
            }}
            exit={{ opacity: 0, scale: 0.85, y: 50, transition: { duration: 0.3 } }}
            transition={{
              y: {
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              },
              default: { duration: 0.5 }
            }}
          >
            {/* Desktop premium button */}
            <div className="hidden sm:block">
              <PremiumDonateButton 
                onClick={() => { handlePageChange("donate"); setDonationStep(1); }} 
                lang={lang} 
                className="shadow-[0_12px_28px_rgba(244,81,30,0.45)] hover:shadow-[0_15px_32px_rgba(244,81,30,0.55)] transition-all duration-300 hover:-translate-y-1"
              />
            </div>
            {/* Mobile premium button */}
            <div className="block sm:hidden">
              <PremiumDonateButton 
                onClick={() => { handlePageChange("donate"); setDonationStep(1); }} 
                lang={lang} 
                isMobile={true}
                className="shadow-[0_8px_18px_rgba(244,81,30,0.4)] hover:shadow-[0_10px_22px_rgba(244,81,30,0.5)] transition-all duration-300"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>




      {/* ========================================================
          PAGE VIEW ROUTER RENDERING COMPONENT
          ======================================================== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full flex-grow"
        >
          {/* 1. HOMEPAGE VIEW ARCHITECTURE */}
          {activePage === "home" && (
            <div>
              {/* IMMERSIVE 3-SLIDE CAROUSEL HERO SECTION - PURE PUSH SLIDE */}
              <div 
                ref={homeHeroRef}
                className="fixed left-0 right-0 z-10 w-full overflow-hidden bg-slate-950 h-[60vh] md:h-[700px] top-[64px] md:top-[76px]"
                onMouseEnter={() => setIsHeroHovered(true)}
                onMouseLeave={() => setIsHeroHovered(false)}
                style={{ willChange: "transform" }}
              >
                {/* Wrap the image track container for parallax blur with zero position:fixed side effects */}
                <div 
                  ref={homeHeroBlurRef}
                  className="absolute inset-0 w-full h-full overflow-hidden origin-center"
                  style={{ willChange: "filter, transform" }}
                >
                  {/* Slide Background Visual - Seamless Push Slide */}
                  <div 
                    className={`flex w-full h-full ${isTransitioning ? 'transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)]' : ''}`}
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    onTransitionEnd={handleTransitionEnd}
                  >
                    {[...activeSlides, activeSlides[0]].map((slide, i) => (
                      <div key={i} className="min-w-full h-full relative">
                        <OptimizedImage
                          src={slide.img}
                          alt={slide.title}
                          fetchpriority="high"
                          isMobile={isMobile}
                          className={`absolute inset-0 w-full h-full object-cover select-none pointer-events-none ${slide.pos || 'object-center'}`}
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (target.src.endsWith(".png")) {
                              target.src = target.src.replace(".png", ".jpg");
                            } else if (target.src.endsWith(".jpg")) {
                              target.src = target.src.replace(".jpg", ".jpeg");
                            } else if (target.src.endsWith(".jpeg")) {
                              const match = target.src.match(/\/([A-Za-z0-9]+)\.jpeg/);
                              if (match && match[1]) {
                                target.src = `https://imgur.com/${match[1]}`;
                              }
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtle Carousel Dots indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                  {activeSlides.map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => {
                        setIsTransitioning(true);
                        setCurrentSlide(i);
                      }} 
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide % activeSlides.length === i ? "bg-[#F4511E] w-6" : "bg-white/40 shadow-sm"}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Static layout Spacer in normal flow to prevent cumulative layout shift */}
              <div className="w-full bg-transparent h-[60vh] md:h-[700px]" />

              {/* SCROLLING CONTENT WRAPPER */}
              <div className="relative z-20 bg-white">

          {/* GLOBAL VOICES SHOWCASE SECTION */}
          <GlobalVoicesShowcase onNavigate={handlePageChange} />

          {/* SECTION 1 - ABOUT US */}
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 font-sans">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-[40px] font-light text-[#333333] tracking-wider mb-4">About Us</h2>
              <div className="w-16 h-[2px] bg-[#F4511E] mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative">
                <img src="https://i.imgur.com/U4lkS8K.png" alt="Children playing outdoors" className="w-full h-auto object-cover rounded-sm shadow-md cursor-pointer hover:opacity-95 transition-opacity" onClick={() => handlePageChange("about")} />
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-light text-[#333333] leading-relaxed">
                  Building Sustainable Futures Through Compassion, Innovation, and Global Impact
                </h3>
                <div className="w-full h-[1px] bg-slate-200 my-6">
                  <div className="w-16 h-[3px] bg-[#F4511E] -mt-[1px]"></div>
                </div>
                <div className="space-y-4">
                  <p className="text-sm md:text-[15px] text-gray-500 leading-relaxed font-light">
                    The Prince Fazza Charity Foundation is a global humanitarian organization dedicated to empowering communities, advancing sustainable development, and creating opportunities that improve lives across generations.
                  </p>
                  <p className="text-sm md:text-[15px] text-gray-500 leading-relaxed font-light">
                    Guided by compassion, innovation, and responsible leadership, the Foundation supports transformative initiatives in healthcare, education, humanitarian relief, and community development.
                  </p>
                  <p className="text-sm md:text-[15px] text-gray-500 leading-relaxed font-light">
                    Through strategic partnerships and long-term investment in people and communities, the Foundation works to create meaningful and lasting impact around the world.
                  </p>
                </div>
                <div className="pt-2">
                  <button onClick={() => handlePageChange("about")} className="bg-[#F4511E] hover:bg-[#D84315] text-white px-8 py-3 text-sm font-medium transition-colors uppercase tracking-widest rounded-sm cursor-pointer">
                    View More
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2 - SERVICES */}
          <div className="bg-[#FAFAFA] py-16 md:py-24 font-sans border-t border-[#EAEAEA]">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-[40px] font-light text-[#333333] tracking-wider mb-4">Services</h2>
                <div className="w-16 h-[2px] bg-[#F4511E] mx-auto"></div>
              </div>
              
              {/* Top Row: 3 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mb-8">
                {[
                  {
                    img: taipeiCareImg,
                    title: "Dubai Care for Children Home",
                    page: "children-home" as ActivePage,
                    desc: "I. Origin of the Organization: The UAE's society and economic structure are rapidly changing. Children and adolescents are..."
                  },
                  {
                    img: kaohsiungCareImg,
                    title: "Sharjah Specialized Care Home",
                    page: "visit-care" as ActivePage,
                    desc: "I. Origin of the Institution: The UAE's society and economic structure are rapidly changing. children and adolescents are..."
                  },
                  {
                    img: wenshanCareImg,
                    title: "Ajman Maternal & Infant Welfare Care Center",
                    page: "mother-child" as ActivePage,
                    desc: "Aisha (pseudonym), a premature baby born to a foreign national, suffered from congenital respiratory malformation and..."
                  }
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-[#EAEAEA] flex flex-col group cursor-pointer" onClick={() => handlePageChange(s.page)}>
                    <div className="h-[220px] overflow-hidden">
                      <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    </div>
                    <div className="p-8 flex-grow flex flex-col items-center text-center">
                      <h4 className="text-[17px] font-normal text-[#333333] mb-4">{s.title}</h4>
                      <p className="text-[13px] text-gray-500 leading-relaxed font-light flex-grow mb-6">{s.desc}</p>
                      <span className="text-[12px] text-gray-400 group-hover:text-[#F4511E] transition-colors flex items-center space-x-1 font-light">
                        <span>View more</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Row: 2 Cards Centered */}
              <div className="flex flex-col lg:flex-row justify-center gap-8">
                 {[
                  {
                    img: hivHalfwayHouseImg,
                    title: "UAE Community Support & Care Sanctuary",
                    page: "halfway-house" as ActivePage,
                    desc: "Saif (pseudonym) contracted HIV, resulting in limb paralysis and an inability to care for himself. By chance, he was referre..."
                  },
                  {
                    img: strandedForeignersImg,
                    title: "Assistance to stranded foreign nationals",
                    page: "vulnerable-foreigners" as ActivePage,
                    desc: "Frank, an American veteran born in 1925, personally participated in World War II and the Korean War, sustaining severe spinal..."
                  }
                ].map((s, i) => (
                  <div key={i} className="lg:w-[calc(33.333%-1.33rem)] bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-[#EAEAEA] flex flex-col group cursor-pointer" onClick={() => handlePageChange(s.page)}>
                    <div className="h-[220px] overflow-hidden">
                      <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    </div>
                    <div className="p-8 flex-grow flex flex-col items-center text-center">
                      <h4 className="text-[17px] font-normal text-[#333333] mb-4">{s.title}</h4>
                      <p className="text-[13px] text-gray-500 leading-relaxed font-light flex-grow mb-6">{s.desc}</p>
                      <span className="text-[12px] text-gray-400 group-hover:text-[#B91C1C] transition-colors flex items-center space-x-1 font-light">
                        <span>View more</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 3 - BREAKING NEWS */}
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 font-sans bg-white border-t border-[#EAEAEA]">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-[40px] font-light text-[#333333] tracking-wider mb-4">Breaking News</h2>
              <div className="w-16 h-[2px] bg-[#F4511E] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Main Headline */}
              <div className="group cursor-pointer" onClick={() => handlePageChange("newsroom")}>
                <div className="overflow-hidden rounded-sm mb-6 relative">
                  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800" alt="News Image" className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <div className="flex items-center space-x-2 text-[11px] mb-3">
                  <span className="text-[#F4511E] uppercase tracking-wider font-medium">CARE MESSAGES , NEWS CLIPPINGS</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-400">February 26, 2026</span>
                </div>
                <h3 className="text-[22px] font-normal text-[#333333] leading-snug mb-3 group-hover:text-[#F4511E] transition-colors">
                  Five years after migrant workers sought aid, the number of caregivers at the Dubai Care Home has doubled. Together with Fatima Al Suwaidi, they are protecting children of all nationalities.
                </h3>
                <p className="text-[14px] text-gray-500 font-light leading-relaxed">
                  According to the latest reports from regional identity and social protection files, as of the end of 2025, the total number of undocumented migrant workers and vulnerable families in the country has climbed...
                </p>
              </div>

              {/* Stacked News List */}
              <div className="space-y-8 flex flex-col justify-start">
                {[
                  {
                    img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=300",
                    tag: "CASE STORIES , MESSAGES OF CARE",
                    date: "2026.05.18",
                    title: "Ahmed's Story: New Life Born Under a Nightmare",
                    desc: "The Prince Fazza Charity Foundation recently received attention for a special report on missing migrant workers..."
                  },
                  {
                    img: motherCaregivingImg,
                    tag: "CARE MESSAGES , NEWS CLIPPINGS",
                    date: "2026.05.12",
                    title: "A mother's tears of love spanning 40 years, from an infected person to children of all nationalities.",
                    desc: "\"For over forty years, in the shadows of remote regions, some untold tragedies have never ceased, whether concerning the plight of tho..."
                  },
                  {
                    img: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=300",
                    tag: "NEWS CLIPPINGS",
                    date: "2026.04.21",
                    title: "Dubai Community Council's heartwarming gesture hopes to help unregistered babies.",
                    desc: "His Highness, along with Khalid Al Nuaimi, an executive representative for the Dubai Social Liaison network, recently visited..."
                  }
                ].map((news, i) => (
                  <div key={i} className="flex gap-6 group cursor-pointer items-start" onClick={() => handlePageChange("newsroom")}>
                    <div className="w-1/3 shrink-0 rounded-sm overflow-hidden aspect-[4/3]">
                      <img src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    </div>
                    <div className="w-2/3 flex flex-col">
                      <div className="flex items-center space-x-2 text-[10px] mb-2">
                        <span className="text-[#F4511E] uppercase tracking-wider font-medium">{news.tag}</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-400">{news.date}</span>
                      </div>
                      <h4 className="text-[17px] font-normal text-[#333333] leading-snug mb-2 group-hover:text-[#F4511E] transition-colors">{news.title}</h4>
                      <p className="text-[13px] text-gray-500 font-light leading-relaxed line-clamp-2">{news.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-16">
              <button onClick={() => handlePageChange("newsroom")} className="bg-[#F4511E] hover:bg-[#D84315] text-white px-8 py-3 text-sm font-medium transition-colors uppercase tracking-widest rounded-sm">
                VIEW MORE NEWS
              </button>
            </div>
          </div>



          {/* SECTION 5 - FINAL DONATION BANNER */}
          <div className="relative font-sans h-[650px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
               <img 
                 src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2000" 
                 alt="Crescent moon humanitarian sky background" 
                 className="w-full h-full object-cover object-center"
                 referrerPolicy="no-referrer"
               />
            </div>
            
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/65 to-black/40" />
            
            <div className="relative z-20 text-center max-w-4xl mx-auto px-6 md:px-8 space-y-10">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-normal text-white leading-tight drop-shadow-md max-w-3xl mx-auto font-sans">
                  Every Child Deserves Safety, Care, and Opportunity
                </h2>
                <div className="w-16 h-[2px] bg-[#F4511E] mx-auto drop-shadow"></div>
              </div>
              
              <div className="text-[15.5px] md:text-[17.5px] text-gray-100 leading-relaxed md:leading-[1.75] max-w-3xl mx-auto font-normal drop-shadow-md space-y-5">
                <p>
                  Children facing vulnerability often encounter barriers that limit access to healthcare, education, protection, and essential support services. Through compassionate action and sustainable community programs, the Prince Fazza Charity Foundation works to ensure that every child has the opportunity to grow in a safe, nurturing, and supportive environment.
                </p>
                <p>
                  By partnering with caregivers, healthcare providers, educators, and humanitarian organizations, the Foundation helps create pathways toward stability, dignity, and long-term well-being for children and families in need.
                </p>
                <p>
                  Every contribution strengthens our ability to provide meaningful assistance, expand access to critical services, and help build brighter futures for the next generation.
                </p>
                <p>
                  Together, we can create lasting impact and ensure that every child is given the opportunity to thrive.
                </p>
              </div>
              
              <div className="pt-4">
                <button onClick={() => handlePageChange("donate")} className="bg-[#F4511E] hover:bg-[#D84315] text-white px-8 py-3.5 text-sm font-medium transition-colors uppercase tracking-widest rounded-sm shadow-xl hover:-translate-y-0.5 duration-300">
                  DONATIONS TO SUPPORT
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}


      {/* 2. ABOUT US & MISSION TEMPLATE */}
      {(activePage === "mission" || activePage === "leadership" || activePage === "testimonials") && (
        <div className="max-w-7xl mx-auto px-4 py-24 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[#F4511E] font-mono text-xs uppercase tracking-widest font-black">WHO WE ARE</span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#111111] uppercase tracking-tight font-sans">
              Prince Fazza <br/>
              <span className="text-[#F4511E]">Charity Foundation</span>
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed font-sans">
              Serving humanity across twenty-five nations under direct continuous audit standards. Established in the United States as registered tax-exempt tax code 501(c)(3) entity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <img src={foundingVisionImg} alt="Sustaining life together" className="rounded-3xl shadow-2xl h-[450px] w-full object-cover border border-[#EAEAEA]" />
            
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-[#111111] font-sans">Our Founding Vision</h2>
              <div className="space-y-4 text-xs text-slate-600 leading-relaxed font-sans">
                <p>
                  Our President, H.H. Prince Fazza Al Maktoum, established the foundation to directly address the widening disparity in digital learning platforms, professional surgical support, and clean underground water systems located in rural central counties.
                </p>
                <p>
                  We strive to establish autonomous networks of sustainable energy, crop irrigation, and medical diagnostics rather than temporary handout relief metrics. We train villagers to manage their aquifers. We certify local women with sewing mechanics.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center bg-[#FAFAFA] p-4 rounded-3xl border border-[#EAEAEA]">
                <div>
                  <span className="text-xl font-black block text-[#F4511E]">2012</span>
                  <span className="text-[10px] text-slate-400">Foundation established</span>
                </div>
                <div className="border-l border-[#EAEAEA]">
                  <span className="text-xl font-black block text-[#F4511E]">25+</span>
                  <span className="text-[10px] text-slate-400">Countries with networks</span>
                </div>
                <div className="border-l border-[#EAEAEA]">
                  <span className="text-xl font-black block text-[#F4511E]">93.8%</span>
                  <span className="text-[10px] text-slate-400">Operational Allocation</span>
                </div>
              </div>
            </div>
          </div>

          {/* THE TIMELINE PRESETS OF MILESTONES */}
          <div className="space-y-8 pt-8">
            <h3 className="text-3xl font-extrabold text-[#111111] text-center font-sans tracking-tight">Historical Milestones</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white border border-[#EAEAEA] p-6 rounded-2xl pr-4">
                <span className="bg-[#F4511E]/10 text-[#F4511E] text-xs font-mono px-3.5 py-1 rounded-full font-bold">2012 - Inception</span>
                <p className="font-extrabold text-[#111111] text-sm mt-3 font-sans">Established in NYC</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">Founding charter set up to funnel legacy wealth to rural global communities with zero administrative leakage.</p>
              </div>
              <div className="bg-white border border-[#EAEAEA] p-6 rounded-2xl pr-4">
                <span className="bg-[#F4511E]/10 text-[#F4511E] text-xs font-mono px-3.5 py-1 rounded-full font-bold">2017 - Surgical Suite Car</span>
                <p className="font-extrabold text-[#111111] text-sm mt-3 font-sans">Mobile Clinic Deployment</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">Pioneered custom 4WD diagnostic platforms running multi-specialty triage directly to mountain settlements.</p>
              </div>
              <div className="bg-white border border-[#EAEAEA] p-6 rounded-2xl pr-4">
                <span className="bg-[#F4511E]/10 text-[#F4511E] text-xs font-mono px-3.5 py-1 rounded-full font-bold">2021 - Deep Well Aquifers</span>
                <p className="font-extrabold text-[#111111] text-sm mt-3 font-sans">Solar Purified Springs</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">Rolled out subterranean drills penetrating toxic layers down to pure deep table spring aquifers.</p>
              </div>
              <div className="bg-white border border-[#EAEAEA] p-6 rounded-2xl pr-4">
                <span className="bg-[#F4511E]/10 text-[#F4511E] text-xs font-mono px-3.5 py-1 rounded-full font-bold">2026 - Digital Class Hubs</span>
                <p className="font-extrabold text-[#111111] text-sm mt-3 font-sans">Scholarship & Agritech</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">Erecting clean academies powered fully by modular micro-grids with computer lab sponsorships.</p>
              </div>
            </div>
          </div>

        </div>
      )}


      {/* ----------------------------------------------------
          1. ABOUT PRINCE FAZZA FOUNDATION DEDICATED PAGE
          ---------------------------------------------------- */}
      {activePage === "about" && (
        <div className="bg-white min-h-screen text-[#111111] font-sans pb-12 selection:bg-[#F4511E]/20 selection:text-[#F4511E] animate-fade-in">
          {/* Page cinematic hero header */}
          <PageHeader page="about" lang={lang} />

          <div className="relative z-20 bg-white shadow-sm">
            {/* MAIN COLUMN NARRATIVE */}
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
            <div className="space-y-12">
              {/* Header Box */}
              <div className="space-y-4">
                <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block">// OFFICIAL DOSSIER</span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight font-sans leading-none">
                  About Prince Fazza Charity Foundation
                </h2>
                <div className="h-[3px] w-24 bg-[#F4511E] mt-4" />
              </div>

              {/* Comprehensive Article Content - Longform Academic style */}
              <div className="text-slate-800 text-base md:text-lg leading-relaxed space-y-12 font-sans font-normal text-justify">
                {/* Intro style lead paragraph */}
                <p className="text-lg md:text-xl text-slate-900 border-l-4 border-[#F4511E] pl-6 italic font-light leading-relaxed">
                  The Prince Fazza Charity Foundation is a global humanitarian organization dedicated to empowering communities, advancing sustainable development, and creating opportunities that improve lives across generations. Guided by compassion, innovation, and responsible leadership, the Foundation supports transformative initiatives in healthcare, education, humanitarian relief, and community development. Through strategic partnerships and long-term investment in people and communities, the Foundation works to create meaningful and lasting impact around the world.
                </p>

                {/* Section 1 */}
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-extrabold text-slate-950 tracking-tight">
                    1. The Sovereign Mandate of Modern Human Development
                  </h3>
                  <p>
                    The Prince Fazza Charity Foundation stands as a preeminent beacon of hope, structural support, and permanent upliftment within the contemporary global humanitarian landscape. Established to bridge the widening gaps in community welfare, basic-needs security, and long-term socio-economic capacity, the Foundation operates not merely as a modern funding body but as an active, on-the-ground agent of systemic progress. Operating globally with absolute precision and local respect, the organization deploys direct-delivery mechanisms to solve some of the most critical challenges facing humanity today. At the core of the Foundation’s institutional identity is a fundamental recognition that human dignity is non-negotiable. Every individual, regardless of geographic boundary, socioeconomic background, gender, or state status, possesses an inherent right to safety, nourishment, medical strategy, and educational mobility. By transforming these abstract ideals into concrete, highly organized operational realities, the Foundation acts as a reliable partner to vulnerable populations, sovereign governments, and international relief agencies, driving a coordinated effort to dismantle the cycles of generational poverty.
                  </p>
                </div>

                {/* Section 2 */}
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-extrabold text-slate-950 tracking-tight">
                    2. The Genesis of Philanthropic Transformation
                  </h3>
                  <p>
                    The historical genesis of the Prince Fazza Charity Foundation is rooted in an unwavering commitment to personal leadership and active empathy. Far from being conceived in isolation, the Foundation was founded in response to real-world observations of acute humanitarian crises, systemic educational barriers, and unequal access to clinical resources in remote and urban areas alike. Recognizing that conventional philanthropic models often struggled with administrative overhead, slow deployment speeds, and brief engagement cycles, the founders envisioned an agile institutional architecture capable of converting capital into immediate, meaningful, and direct field intervention. From its initial focus on direct nutritional support and emergency clinical aid, the organization quickly realized that simple crisis-response, while vital, must be accompanied by sustainable structural scaffolding to prevent families from falling back into distress. This realization spurred the expansion of the Foundation’s operations into multi-sectoral development frameworks. Today, the organization’s historical path reflects an evolution from localized relief work into a sophisticated global network, characterized by robust logistical chains, strict fiscal accountability trackers, and deep, lasting community relationships.
                  </p>
                </div>

                {/* Editorial Visual Interlude from user request */}
                <div className="my-8 space-y-3 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-3 shadow-xs transition-all duration-350 hover:shadow-md">
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100">
                    <img 
                      src="https://i.imgur.com/U4lkS8K.png" 
                      alt="Prince Fazza Charity Foundation Impact" 
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src.endsWith(".png")) {
                          target.src = "https://i.imgur.com/U4lkS8K.jpg";
                        } else if (target.src.endsWith(".jpg")) {
                          target.src = "https://i.imgur.com/U4lkS8K.jpeg";
                        }
                      }}
                    />
                  </div>
                  <p className="text-center font-sans text-xs font-medium italic text-slate-500 tracking-wide">
                    Representative visual insight of humanity upliftment, medical care logistics, and continuous emergency action on the ground.
                  </p>
                </div>

                {/* Section 3 */}
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-extrabold text-slate-950 tracking-tight">
                    3. Reimagining Relief: The Development Philosophy of Permanent Self-Reliance
                  </h3>
                  <p>
                    A central tenet of the Foundation's development philosophy is the transition from temporary charity to sustainable self-reliance. While emergency assistance—such as distributing food rations, clinical supplies, and clean water—is critical during acute disasters, the Foundation designs its core initiatives with an intentional exit strategy. This means that every clinic established, every school sponsored, and every agricultural network funded is engineered to eventually run under localized stewardship, ensuring long-term independence and localized capacity. The Foundation rejects paternalistic development paradigms, choosing instead to co-design projects alongside community leaders, village elders, and local governments. This mutual co-creation process ensures that interventions are culturally congruent, economically viable, and championed by the very people they are designed to serve. By investing heavily in train-the-trainer clinical programs, school administrative scholarship structures, and vocational mastery courses, the Foundation shifts the balance of power from external donors to internal community stewards, creating resilient local institutions that can withstand future economic and environmental shifts.
                  </p>
                </div>

                {/* Section 4 */}
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-extrabold text-slate-950 tracking-tight">
                    4. A Multidimensional Approach to Global Community Welfare
                  </h3>
                  <p>
                    The Foundation's operational footprint spans a broad spectrum of human development, acknowledging that health, education, shelter, and financial security are fundamentally interconnected. A child cannot learn effectively without stable nutrition and safe shelter; a family cannot achieve financial resilience if a sudden oncological medical emergency threatens to deplete all their resources. Consequently, the Foundation’s programmatic framework breaks down traditional silos, integrating safe maternal care, clinical screening services, clean water filtration setups, and primary educational sponsorships into a unified model of care. Through its specialized mobile clinical caravans, the Foundation brings advanced diagnostic capabilities directly to remote settlements, bypassing regional infrastructure gaps and reducing patient waitlists. Simultaneously, the Foundation’s educational programs focus on removing structural barriers to entry—such as tuition registration fees, text materials, and transport costs—ensuring that young scholars can remain in school to reach their fullest potential. This integrated approach ensures that the Foundation’s resources are deployed to maximize collective impact, addressing both immediate vulnerabilities and their deeper, underlying causes.
                  </p>
                </div>

                {/* Section 5 */}
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-extrabold text-slate-950 tracking-tight">
                    5. Direct-Delivery Logistics and Operational Integrity
                  </h3>
                  <p>
                    Surgical operational execution is a defining characteristic of the Prince Fazza Charity Foundation. Utilizing state-of-the-art logistics trackers and maintaining direct control over supply chains, the Foundation bypasses unnecessary middlemen to ensure that donations reach the field with absolute fidelity. The "direct-delivery" model means that of every contribution received, the vast majority is channeled directly into real-world medicine, nutritional dispatch, educational grants, and shelter materials. This high metric of direct-to-field delivery is supported by a continuous audit database system that tracks every vaccine, textbook, and clean water module from warehouse loading to final local distribution. By maintaining clinical strategic oversight and financial integrity, the Foundation has built an unparalleled reputation for trustworthiness among international compliance bodies and philanthropic evaluators. This operational excellence is further enhanced by a dedicated team of volunteers, clinical professionals, and project managers who work untiringly on the ground, navigating complex geographical terrains and sovereign legal protocols to fast-track emergency assistance when and where it is most urgent.
                  </p>
                </div>

                {/* Section 6 */}
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-extrabold text-slate-950 tracking-tight">
                    6. The Synergy of Global and Local Partnerships
                  </h3>
                  <p>
                    No single organization can solve the world's most complex humanitarian challenges in isolation. Understanding this reality, the Prince Fazza Charity Foundation has established a partnership-driven model that leverages the unique strengths of global institutions, sovereign entities, and local grassroots organizations. By collaborating with leading academic medical centers, major international pharmaceutical ledgers, global non-governmental organizations, and municipal authorities, the Foundation is able to scale its impact and implement state-of-the-art solutions. These partnerships are never passive; they are active, strategic alliances focused on joint innovation and shared risk management. For instance, the Foundation’s maternal and pediatric welfare programs are enhanced by direct collaboration with regional health directorates, ensuring that local clinics are integrated into national healthcare records and standard long-term immunization schedules. This synergy ensures that the Foundation's initiatives do not duplicate existing efforts but rather reinforce, expand, and elevate public health and educational infrastructures.
                  </p>
                </div>

                {/* Section 7 */}
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-extrabold text-slate-950 tracking-tight">
                    7. Empowering Communities Through the Preservation of Dignity
                  </h3>
                  <p>
                    At the heart of the Foundation's ethos is an unwavering commitment to the preservation of human dignity. True empowerment is not merely the delivery of resources, but the restoration of agency and self-esteem. When families are forced into vulnerable positions by economic hardship, sudden clinical crises, or displacement, they often lose control over their own lives. The Foundation strives to restore that control. By providing safe, dignified shelter structures with private sanitation facilities, clean cooking environments, and durable running water, the Foundation creates spaces where families can rebuild their lives in safety and security. Similarly, the Foundation’s vocational programs focus on identifying and polishing-up local talent, turning aspiring agriculturalists, clinical assistants, and teachers into respected leaders. By centering its work around the unique voices, choices, and aspirations of its beneficiaries, the Prince Fazza Charity Foundation ensures that its impact is measured not just in mathematical metrics or statistical benchmarks, but in the confidence, independence, and pride of the individuals it serves.
                  </p>
                </div>
              </div>

              {/* Legal and Compliance Footer Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-12 border-t border-slate-100">
                <div className="flex items-start space-x-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 bg-[#F4511E]/10 rounded-xl flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-[#F4511E]" />
                  </div>
                  <div>
                    <span className="text-sm font-black text-slate-950 block">Registered 501(c)(3) Entity</span>
                    <p className="text-xs text-slate-500 mt-1">Sovereign compliance and legal taxonomy framework governed under complete non-profit tax exemption regulations.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-sm font-black text-slate-950 block">Continuous Audit Integration</span>
                    <p className="text-xs text-slate-500 mt-1">Real-time financial transparency with third-party continuous ledgers audited regularly by sovereign authorities.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call To Action */}
          <AboutCTA onNavigate={handlePageChange} />
          </div>
        </div>
      )}

      {activePage === "vision" && (
        <div className="bg-white min-h-screen text-[#111111] font-sans pb-12 animate-fade-in">
          <PageHeader page="vision" lang={lang} />
          <div className="relative z-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-16">
              <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
              <div>
                <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block mb-2">// OUR VISION</span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight block font-sans">
                  A Future Where Every Individual Can Thrive
                </h2>
                <div className="h-[2px] w-20 bg-[#F4511E] mt-4 mb-8" />
                <p className="text-xl text-slate-600 font-light leading-relaxed">
                  Creating opportunities, strengthening communities, and advancing sustainable human development across the world.
                </p>
              </div>

              <div className="space-y-8 text-[#333333] text-sm md:text-base leading-relaxed font-sans font-medium">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 block">Vision Statement</h3>
                  <p>Our vision is to build a future where every individual can thrive. We envision a world where extreme poverty is eradicated, and vulnerable communities are empowered through unhindered access to education, rigorous healthcare, and durable economic networks.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 block">Expanded Vision Narrative</h3>
                  <p>In our envisioned future, structural barriers that perpetuate inequality are systematically dismantled. By treating the root causes of systemic poverty rather than its symptoms, we foresee global infrastructures supporting robust local economies. We visualize thriving, resilient societies producing consecutive generations of educated critical thinkers and healthy innovators.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 block">Future Aspirations</h3>
                  <p>We aspire to scale our integrated support frameworks across all emerging nations, ensuring that every crisis zone is met with immediate, efficient, and sustained relief protocols. We seek to elevate grassroots programs into permanent institutional networks.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 block">Humanitarian Outlook</h3>
                  <p>Our humanitarian outlook demands that charity is seen as a strategic structural investment in humanity. Every resource deployed must yield multiplying dividends in the form of restored dignity, stable shelter, and enduring public health infrastructures.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 block">Long-Term Global Objectives</h3>
                  <p>Moving toward a universally connected world, our long-term objectives are fixed on achieving self-sufficiency for marginalized groups. We stand firmly dedicated to establishing permanent, sustainable human development frameworks that operate cleanly and independently.</p>
                </div>
              </div>
            </div>
          </div>
          <VisionCTA onNavigate={handlePageChange} />
          </div>
        </div>
      )}

      {activePage === "mission" && (
        <div className="bg-white min-h-screen text-[#111111] font-sans pb-12 animate-fade-in">
          <PageHeader page="mission" lang={lang} />
          <div className="relative z-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-16">
              <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
              <div>
                <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block mb-2">// OUR MISSION</span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight block font-sans">
                  Empowering Humanity Through Sustainable Action
                </h2>
                <div className="h-[2px] w-20 bg-[#F4511E] mt-4 mb-8" />
                <p className="text-xl text-slate-600 font-light leading-relaxed">
                  Creating meaningful change through strategic philanthropy and long-term development.
                </p>
              </div>

              <div className="space-y-8 text-[#333333] text-sm md:text-base leading-relaxed font-sans font-medium">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 block">Humanitarian Relief</h3>
                  <p>Deploying high-quality shelter networks equipped with continuous power, running clean water, and on-site psychological medics to actively respond to global crises.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 block">Healthcare Advancement</h3>
                  <p>Providing free clinical diagnostics, absolute double-blind privacy coordinates, certified immunotherapy, and personalized nutrition support to vulnerable people facing oncology and infectious diseases.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 block">Education</h3>
                  <p>Constructing advanced smart-learning schools and supplying digital learning electronics to rural zones, granting equal footing to marginalized children.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 block">Sustainable Communities</h3>
                  <p>Building robust deep-well aquifers, solar-powered clinics, micro-grid systems, and strategic housing to establish permanently self-reliant villages.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 block">Youth Empowerment</h3>
                  <p>Identifying displaced youth, coordinating legal protection guardians, restoring broken family links, and funding higher-education scholarships directly.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 block">Women's Empowerment</h3>
                  <p>Delivering business grants, technical tailoring machines, commercial literacy workshops, and robust business support systems exclusively for disadvantaged women.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 block">Economic Empowerment</h3>
                  <p>Sparking sustained local commerce through strategic micro-investments that strengthen the financial foundation of the weakest communities.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 block">Environmental Stewardship</h3>
                  <p>Supplying continuous high-nutrition kits while prioritizing local farm cooperatives, preserving both the agricultural cycles and critical natural ecosystems.</p>
                </div>
              </div>
            </div>
          </div>
          <MissionCTA onNavigate={handlePageChange} />
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          2. FOUNDER'S CHRONICLE DEDICATED PAGE
          ---------------------------------------------------- */}
      {activePage === "founder-chronicle" && (
        <div className="bg-white min-h-screen text-[#111111] font-sans pb-12 selection:bg-[#F4511E]/20 selection:text-[#F4511E] animate-fade-in">
          <PageHeader page="founder-chronicle" lang={lang} />
          
          <div className="relative z-20 bg-white">
            {/* SECTION 1: INTRO PARAGRAPH */}
            <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6 animate-fade-in">
              <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed font-sans">
                For more than a decade, Sheikh Hamdan bin Mohammed bin Rashid Al Maktoum has championed humanitarian advancement through strategic philanthropy, sustainable charitable frameworks, healthcare access programs, educational empowerment initiatives, emergency relief operations, and community development projects across multiple regions of the world.
              </p>
              <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed font-sans">
                His vision emphasizes long-term impact, measurable outcomes, and the creation of systems capable of improving lives across generations.
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-20 space-y-32">
            
            {/* SECTION 2: FOUNDER PROFILE EXPANSION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start font-sans">
              {/* Profile Image (Zoom click enabled) */}
              <div className="lg:col-span-5 relative space-y-6">
                <div 
                  onClick={() => setLightbox({ url: "https://i.imgur.com/Iv8vgcg.png", alt: "His Highness Hamdan bin Mohammed Al Maktoum Profile Portrait", caption: "His Highness Hamdan bin Mohammed Al Maktoum, Founder and Sovereign Patron, presiding over the launch of direct regional clean water and ophthalmic caravan systems." })}
                  className="relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-slate-50 cursor-zoom-in group sticky top-8"
                >
                  <img 
                    src="https://i.imgur.com/Iv8vgcg.png" 
                    alt="His Highness Hamdan bin Mohammed Al Maktoum Profile Portrait" 
                    className="w-full h-[600px] object-cover object-top hover:scale-105 transition-transform duration-700 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 text-white text-center select-none">
                    <p className="font-extrabold uppercase text-xs tracking-widest text-[#F4511E] mb-2">His Highness</p>
                    <p className="font-black font-sans text-xl tracking-tight uppercase leading-snug">Hamdan bin Mohammed <br/> Al Maktoum</p>
                    <p className="text-[10px] text-slate-300 font-mono font-medium mt-2">Founder & Sovereign Patron</p>
                  </div>
                </div>
              </div>

              {/* Chronicle Text Content */}
              <div className="lg:col-span-7 space-y-8 lg:pt-4">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono font-black text-[#F4511E] tracking-widest uppercase">// FOUNDER VISION & HUMANITARIAN LEADERSHIP</span>
                  <h3 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight leading-none">Sheikh Hamdan Bin Mohammed Bin Rashid Al Maktoum</h3>
                </div>

                <div className="space-y-6 text-sm md:text-[15px] font-medium text-slate-600 leading-relaxed">
                  <p>
                    Sheikh Hamdan bin Mohammed bin Rashid Al Maktoum, widely recognized as Fazza, has become one of the most influential voices supporting innovation, community welfare, youth development, healthcare advancement, environmental sustainability, and humanitarian service throughout the United Arab Emirates and beyond.
                  </p>
                  <p>
                    His public service philosophy centers on responsible leadership, social cohesion, and sustainable impact. Through continuous support for charitable programs, humanitarian initiatives, and community-focused projects, his efforts have contributed to strengthening social support systems and expanding opportunities for vulnerable populations.
                  </p>
                  <p>
                    The humanitarian model associated with his leadership places emphasis on:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                    {[
                      "Sustainable development",
                      "Healthcare accessibility",
                      "Educational empowerment",
                      "Community resilience",
                      "Emergency humanitarian assistance",
                      "Long-term charitable investment",
                      "Transparent impact measurement"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-3 bg-slate-50 border border-slate-100 p-3 rounded-xl">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F4511E] shrink-0" />
                        <span className="text-xs font-bold text-slate-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    His approach promotes the belief that effective philanthropy must address immediate needs while simultaneously building structures capable of creating lasting change.
                  </p>
                </div>

                {/* Founder Quote */}
                <div className="bg-[#FAF9F6] p-8 md:p-10 rounded-3xl border border-[#EAEAEA] relative overflow-hidden group">
                  <div className="absolute -right-8 -bottom-8 opacity-[0.03] transform group-hover:scale-110 transition-transform duration-700">
                    <svg width="180" height="180" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                  </div>
                  <p className="relative italic text-slate-800 text-lg md:text-xl font-serif font-black leading-relaxed">
                    "True leadership is measured not by influence, but by the number of lives uplifted through purposeful action."
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 3: NEW MAJOR TIMELINE */}
            <div className="space-y-16">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block">// TIMELINE</span>
                <h3 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight">A Decade of Humanitarian Impact</h3>
              </div>

              <div className="relative border-l-2 border-[#EAEAEA] pl-8 space-y-12 py-4 md:ml-12">
                {[
                  { year: "2015", title: "Expansion of Community Development Programs", text: "Large-scale support initiatives focused on youth engagement, educational advancement, and community enrichment helped strengthen local social development efforts." },
                  { year: "2017", title: "Healthcare Outreach Enhancement", text: "Support for healthcare accessibility programs expanded through medical awareness campaigns, treatment assistance initiatives, and specialized care partnerships." },
                  { year: "2019", title: "Sustainable Giving Frameworks", text: "Promotion of structured charitable investment models designed to create recurring humanitarian funding streams for future generations." },
                  { year: "2020", title: "Emergency Relief Mobilization", text: "Humanitarian response efforts strengthened through logistical support networks and emergency assistance programs during periods of global uncertainty." },
                  { year: "2021", title: "Education and Scholarship Advancement", text: "Expanded support for educational opportunities, scholarship access, talent development initiatives, and academic empowerment programs." },
                  { year: "2022", title: "Community Wellness Programs", text: "Integrated programs addressing family support, mental wellbeing, youth development, and social resilience were expanded across multiple communities." },
                  { year: "2023", title: "53,900 Charitable Initiatives and Projects", text: "Dubai reported approximately 53,900 charitable initiatives and projects during the year, reflecting the scale of the emirate's commitment to humanitarian service, social development, and charitable outreach." },
                  { year: "2024", title: "Future-Oriented Humanitarian Innovation", text: "Continued focus on leveraging technology, sustainable philanthropy, strategic partnerships, and impact measurement systems to maximize humanitarian effectiveness." }
                ].map((timeline, idx) => (
                  <div key={idx} className="relative group hover:-translate-y-1 transition-transform duration-300">
                    <span className="absolute -left-[42px] top-1 bg-white border-[3px] border-[#F4511E] rounded-full w-5 h-5 shadow-[0_0_0_4px_white] transition-transform group-hover:scale-125" />
                    <div className="bg-white border border-[#EAEAEA] p-8 rounded-[24px] shadow-sm group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all">
                      <span className="inline-block text-sm font-mono font-black bg-[#F4511E]/10 text-[#F4511E] px-4 py-1 rounded-full mb-4 tracking-widest">{timeline.year}</span>
                      <h4 className="text-xl font-black text-slate-900 mb-3">{timeline.title}</h4>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">{timeline.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 4: NEW FEATURED IMPACT GRID */}
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block">// IMPACT ZONES</span>
                <h3 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight">Core Operation Areas</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=800", title: "Healthcare Access", desc: "Supporting medical outreach, treatment assistance programs, patient care initiatives, and community health development." },
                  { img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800", title: "Cancer Care & Research", desc: "Highlighting support for healthcare institutions, medical innovation, treatment accessibility, and patient wellbeing." },
                  { img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800", title: "Education Advancement", desc: "Expanding educational opportunities through scholarships, learning resources, and youth development programs." },
                  { img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800", title: "Emergency Relief Operations", desc: "Rapid-response assistance initiatives supporting communities during humanitarian emergencies." },
                  { img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800", title: "Sustainable Communities", desc: "Long-term investment in housing, infrastructure, clean water access, and social development projects." },
                  { img: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=800", title: "Youth Empowerment", desc: "Creating pathways for leadership, innovation, entrepreneurship, and future community development." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm group hover:shadow-xl transition-all duration-500">
                    <div className="h-48 overflow-hidden relative">
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
                    </div>
                    <div className="p-8">
                      <h4 className="text-lg font-black text-slate-900 mb-2 uppercase tracking-tight">{item.title}</h4>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 5: RASHID HUMANITARIAN VILLAGES */}
            <div className="bg-zinc-900 rounded-[32px] overflow-hidden border border-zinc-800 shadow-2xl relative group">
              <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
                <img src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1600" alt="Rashid Humanitarian Villages" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-zinc-900/40 z-10" />
              
              <div className="relative z-20 p-10 md:p-16 lg:w-2/3 space-y-8">
                <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black inline-block bg-[#F4511E]/10 px-3 py-1 rounded-full">// INTEGRATED SHELTER</span>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">Rashid Humanitarian Villages</h3>
                
                <div className="space-y-6 text-sm text-zinc-300 font-medium leading-relaxed">
                  <p>
                    Among the most inspiring humanitarian concepts associated with Sheikh Hamdan's vision is the development of sustainable community-centered humanitarian villages designed to support vulnerable populations through integrated services.
                  </p>
                  <p>
                    These model communities focus on providing:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {["Safe housing", "Educational facilities", "Healthcare access", "Economic opportunity", "Community development resources"].map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F4511E] shrink-0" />
                        <span className="text-white font-bold">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    The objective is not simply aid distribution but the creation of self-sustaining environments capable of empowering individuals and families for generations.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 6: HEALTHCARE & MEDICAL IMPACT */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black">// MEDICAL PILLAR</span>
                  <h3 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight leading-none">Advancing Healthcare Access</h3>
                </div>
                <div className="space-y-6 text-sm text-slate-600 font-medium leading-relaxed">
                  <p>
                    Healthcare remains one of the most critical pillars of humanitarian development.
                  </p>
                  <p>
                    Through support for medical programs, treatment initiatives, healthcare innovation, patient assistance efforts, and broader healthcare-focused philanthropy, significant emphasis has been placed on improving health outcomes and expanding access to care.
                  </p>
                  <p>Areas of focus include:</p>
                  <ul className="space-y-2">
                    {["Cancer support programs", "Medical research initiatives", "Community healthcare services", "Preventive care awareness", "Specialized treatment assistance", "Healthcare infrastructure development"].map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 text-indigo-500">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="font-bold text-slate-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Healthcare Outreach Programs", val: "Global Scale" },
                  { title: "Medical Support Initiatives", val: "Advanced Care" },
                  { title: "Patient Assistance Programs", val: "100% Subsidized" },
                  { title: "Community Wellness Projects", val: "Preventative Focus" }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-[#FAF9F6] border border-[#EAEAEA] p-6 rounded-3xl space-y-2">
                    <span className="font-mono text-[10px] text-[#F4511E] font-black uppercase tracking-widest">{stat.val}</span>
                    <h5 className="font-black text-slate-900 uppercase leading-snug">{stat.title}</h5>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 7: SUSTAINABLE GIVING & ENDOWMENTS (Infographic style) */}
            <div className="bg-slate-50 border border-slate-100 p-10 md:p-16 rounded-[32px] text-center space-y-12">
              <div className="max-w-2xl mx-auto space-y-4">
                <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black">// PERPETUAL ENDOWMENTS</span>
                <h3 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight leading-none">Building Impact That Lasts</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed pt-4">
                  Modern philanthropy increasingly focuses on sustainability rather than short-term intervention.
                </p>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Structured endowment models and perpetual charitable funding mechanisms help create long-term support systems capable of funding education, healthcare, humanitarian relief, and social development initiatives for decades to come.
                </p>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  This philosophy reflects a broader movement toward creating charitable ecosystems that continue delivering value long after the initial contribution has been made.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                {[
                  { title: "Initial Contribution", desc: "Capital is preserved in institutional trusts." },
                  { title: "Ecosystem Growth", desc: "Yield funds continuous operational output." },
                  { title: "Perpetual Execution", desc: "Charitable cycles repeat without depletion." }
                ].map((step, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 text-slate-50 font-black text-8xl font-sans opacity-50 select-none group-hover:text-slate-100 transition-colors">
                      {idx + 1}
                    </div>
                    <div className="relative z-10 text-left space-y-2">
                      <h5 className="font-black text-slate-900 uppercase text-lg">{step.title}</h5>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 8: GLOBAL IMPACT OVERVIEW */}
            <div className="bg-zinc-950 rounded-[32px] p-10 md:p-16 overflow-hidden relative">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Abstract dot map representation */}
                  {Array.from({ length: 400 }).map((_, i) => (
                    <circle key={i} cx={Math.random() * 100} cy={Math.random() * 100} r="0.2" fill="currentColor" />
                  ))}
                </svg>
              </div>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black">// GEOGRAPHIC SPHERE</span>
                  <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">Reaching Communities Across The World</h3>
                  <p className="text-sm text-zinc-400 font-medium leading-relaxed pt-2">
                    Humanitarian efforts associated with Dubai's broader philanthropic ecosystem have impacted millions of beneficiaries through healthcare programs, education initiatives, poverty alleviation efforts, food assistance projects, community development investments, and emergency response operations.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {["Healthcare", "Education", "Humanitarian Relief", "Community Development", "Sustainability", "Youth Empowerment"].map((focus, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 backdrop-blur-sm p-4 rounded-2xl flex items-center space-x-3 text-white font-bold text-sm hover:bg-white/10 transition-colors cursor-default">
                      <div className="w-2 h-2 rounded-full bg-[#F4511E]" />
                      <span>{focus}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION 9: FOUNDATION VALUES */}
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block">// CORE PRINCIPLES</span>
                <h3 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight">Foundation Values</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: "Compassion", desc: "Prioritizing empathy and immediate care in addressing complex human vulnerabilities." },
                  { title: "Integrity", desc: "Upholding absolute transparency in resource allocation and field operations." },
                  { title: "Accountability", desc: "Ensuring measurable returns on zero-deduction charitable investments." },
                  { title: "Service", desc: "Committing to the unconditional support of underserved and remote populations." },
                  { title: "Sustainability", desc: "Fostering long-term ecosystems that outlive their initial capital injections." },
                  { title: "Human Dignity", desc: "Respecting the rights, culture, and agency of all beneficiaries uniformly." }
                ].map((val, idx) => (
                  <div key={idx} className="border-t border-slate-200 pt-6 group">
                    <h5 className="font-black text-xl text-slate-900 group-hover:text-[#F4511E] transition-colors mb-3 uppercase tracking-tight">{val.title}</h5>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 10: DOCUMENTATION ARCHIVE */}
            <div className="space-y-12">
              <div className="space-y-4 max-w-3xl">
                <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block">// OFFICIAL RECORDS</span>
                <h3 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight">Founder Chronicle Archive</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed pt-2">
                  A curated collection of humanitarian milestones, impact documentation, leadership initiatives, community development records, and philanthropic achievements associated with Sheikh Hamdan bin Mohammed bin Rashid Al Maktoum.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Impact Reports", label: "PUBLIC LEDGER" },
                  { title: "Initiative Records", label: "ARCHIVED" },
                  { title: "Community Programs", label: "ONGOING" },
                  { title: "Humanitarian Documentation", label: "VERIFIED" },
                  { title: "Strategic Development Summaries", label: "POLICY" },
                  { title: "Foundation Updates", label: "QUARTERLY" }
                ].map((doc, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between h-32 hover:border-[#F4511E]/30 hover:bg-[#F4511E]/5 transition-colors cursor-pointer group">
                    <span className="font-mono text-[9px] font-black tracking-widest uppercase text-slate-400 group-hover:text-[#F4511E] transition-colors">{doc.label}</span>
                    <div className="flex items-center justify-between">
                      <h6 className="font-bold text-slate-900 text-sm">{doc.title}</h6>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#F4511E]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 11: FINAL CALL TO ACTION */}
            <div className="bg-[#111111] rounded-[32px] p-10 md:p-20 text-center space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4511E] rounded-full blur-[120px] opacity-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-[120px] opacity-20 pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                <h3 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tight leading-none">
                  Together We Can Create Lasting Change
                </h3>
                <p className="text-sm md:text-base text-zinc-400 font-medium leading-relaxed">
                  Every contribution supports the continued advancement of humanitarian service, community development, healthcare access, educational opportunity, and sustainable social impact. By working together, we can help build stronger communities, expand opportunities, and create meaningful change for future generations.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                  <button onClick={() => { handlePageChange("donate"); setDonationStep(1); }} className="w-full sm:w-auto bg-[#F4511E] hover:bg-[#D84315] text-white px-10 py-4 font-black uppercase text-sm tracking-widest rounded-full transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(244,81,30,0.4)]">
                    Donate Now
                  </button>
                  <button onClick={() => handlePageChange("careers")} className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-4 font-black uppercase text-sm tracking-widest rounded-full transition-all">
                    Join The Mission
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {activePage === "board-directors" && (
        <div className="bg-white min-h-screen text-[#111111] font-sans pb-12 selection:bg-[#F4511E]/20 selection:text-[#F4511E] animate-fade-in">
          <PageHeader page="board-directors" lang={lang} />

          <div className="relative z-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-16 space-y-16 animate-fade-in">
              <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block">// STEWARDSHIP LEAGUE</span>
              <h3 className="text-2xl md:text-4xl font-black text-slate-950 uppercase tracking-tight">Trustees & Executive Officers</h3>
              <p className="text-slate-500 text-xs">Our distinguished board members ensuring absolute adherence to direct donation metrics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  name: "Dr. Amina Al Mansoori",
                  role: "Trustee of Clinical Strategy & Oncology Services",
                  desc: "Coordinates complex inpatient screening programs and verifies pharmaceutical ledger allocations globally.",
                  img: aminaAlMansooriImg
                },
                {
                  name: "William H. Harrison",
                  role: "Governor of International Triage Coordination",
                  desc: "Oversees local shelter networks, coordinates housing placements, and designs vocational reintegration modules.",
                  img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop&crop=faces&ar=3:4"
                },
                {
                  name: "Noura Al Kaabi",
                  role: "President of Integrity & Sovereign Compliance",
                  desc: "Maintains absolute financial compliance parameters under transparent 501(c)(3) continuous audit systems.",
                  img: nouraAlKaabiImg
                },
                {
                  name: "Omar Al Hashimi",
                  role: "Counselor of Diplomatic Relations & Advisory",
                  desc: "Aligns sovereign legal protocols to fast-track emergency foreign assistance and humanitarian visas.",
                  img: "https://images.unsplash.com/photo-1625504615927-c14f4f309b63?q=80&w=600&auto=format&fit=crop&crop=faces&ar=3:4"
                }
              ].map((board, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setLightbox({ url: board.img, alt: board.name, caption: `${board.name} serving actively as ${board.role}. Description: ${board.desc}` })}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md flex flex-col justify-between group hover:shadow-2xl transition-all duration-300 cursor-zoom-in"
                >
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-[#F4511E]/5 group-hover:bg-transparent transition-colors z-10" />
                    <img src={board.img} alt={board.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 pointer-events-none" />
                  </div>
                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="block font-sans font-black text-slate-950 text-sm tracking-tight leading-snug">{board.name}</span>
                      <span className="block text-[9px] text-[#F4511E] font-mono tracking-widest uppercase font-extrabold pb-2">{board.role}</span>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{board.desc}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                      <span>certified member</span>
                      <span className="text-emerald-500 font-extrabold tracking-normal">● ACTIVE</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Elite Executive Board Section */}
            <div className="space-y-8 pt-8">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block">// GLOBAL LEADERSHIP DIRECTORY</span>
                <h3 className="text-2xl md:text-3xl font-black text-slate-950 uppercase tracking-tight">Elite Executive Board</h3>
                <p className="text-slate-500 text-xs text-center">Our core operations leadership team managing international field operations and strategic division guidelines.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TEAM_MEMBERS.filter(member => member.name !== "H.H. Prince Fazza Al Maktoum").map((member, i) => (
                  <div key={i} className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 flex items-center space-x-4">
                    <img src={member.imageUrl} alt={member.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#F4511E]" />
                    <div>
                      <span className="block font-sans font-extrabold text-slate-950 text-sm">{member.name}</span>
                      <span className="block text-[10px] text-[#F4511E] font-mono tracking-widest uppercase font-bold">{member.role}</span>
                      <p className="text-[11px] text-slate-500 mt-1 font-medium leading-normal">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Structured Integrity Statement */}
            <div className="bg-[#FAF9F6] p-8 md:p-12 rounded-[32px] border border-slate-200 mt-12 space-y-6">
              <span className="text-[10px] font-mono font-black text-[#F4511E] tracking-widest uppercase block">// EXECUTIVE COMPLIANCE OATH</span>
              <h4 className="text-xl md:text-3xl font-black uppercase tracking-tight font-sans text-slate-950 leading-none">The Zero Administrative Leakage Pledge</h4>
              <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed font-sans">
                Our board operates under strict bilateral legal guidelines. Unlike standard global charity systems where administrative, marketing, and fundraising agencies claim up to 35% of inflows, His Highness Hamdan bin Mohammed Al Maktoum and select patrons underwrite 100% of fundraising operations. This warrants that every single cent (100%) contributed by standard donors directly benefits the community without any deduction.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-200 text-center md:text-left text-xs font-sans">
                <div className="space-y-1">
                  <span className="block text-zinc-400 font-mono font-bold uppercase text-[9px]">REGULAR SYSTEM LEAKS</span>
                  <span className="block font-black text-slate-950 text-sm uppercase tracking-tight font-sans">0% Commission Tolerance</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-zinc-400 font-mono font-bold uppercase text-[9px]">SOCIETAL REVENUE YIELD</span>
                  <span className="block font-black text-emerald-500 text-sm uppercase tracking-tight font-sans">100% Direct to Field</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-zinc-400 font-mono font-bold uppercase text-[9px]">SENSE AUDIT STATUS</span>
                  <span className="block font-black text-slate-950 text-sm uppercase tracking-tight font-sans">Sovereign Compliant</span>
                </div>
              </div>
            </div>
          </div>

          <BoardCTA onNavigate={handlePageChange} />
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          4. ORGANIZATIONAL STRUCTURE DEDICATED PAGE
          ---------------------------------------------------- */}
      {activePage === "org-structure" && (
        <div className="bg-white min-h-screen text-[#111111] font-sans pb-12 selection:bg-[#F4511E]/20 selection:text-[#F4511E] animate-fade-in">
          <PageHeader page="org-structure" lang={lang} />

          <div className="relative z-20 bg-white max-w-7xl mx-auto px-4 py-16 space-y-16 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              {/* Left Selector Card */}
              <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 rounded-[32px] border border-slate-100 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[10px] font-mono font-black text-[#F4511E] tracking-widest uppercase block mb-1">interactive topology</span>
                  <h3 className="text-xl font-black uppercase text-slate-900 tracking-tight leading-snug mb-3">Our Core Operations</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">Select any sector component to audit active responsibilities and systemic protocols.</p>
                  
                  <div className="space-y-2.5 font-sans">
                    {[
                      { key: "liaison", label: "Sovereign Liaison Unit", icon: Users },
                      { key: "clinical", label: "Medical Diagnostics Board", icon: Activity },
                      { key: "triage", label: "Family Triage Unit", icon: Compass },
                      { key: "comply", label: "Financial Audit Board", icon: Shield }
                    ].map((btn) => {
                      const Icon = btn.icon;
                      return (
                        <button
                          key={btn.key}
                          onClick={() => setActiveOrgDept(btn.key)}
                          className={`w-full flex items-center space-x-3 p-4 rounded-2xl text-left border text-xs font-black uppercase tracking-wider transition-all ${
                            activeOrgDept === btn.key
                              ? "bg-white border-[#F4511E] text-[#F4511E] shadow-sm scale-[1.02]"
                              : "bg-white/50 border-slate-200 hover:border-[#F4511E] text-slate-700 font-semibold"
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${activeOrgDept === btn.key ? "text-[#F4511E]" : "text-slate-400"}`} />
                          <span>{btn.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 text-center text-[10px] font-mono text-zinc-400 font-extrabold uppercase tracking-widest">
                  FAZZA INTEGRATED FLOW PROTOCOL v4
                </div>
              </div>

              {/* Right Display Board */}
              <div className="lg:col-span-7 bg-white rounded-[32px] border border-slate-100 shadow-xl p-8 sm:p-12 flex flex-col justify-between space-y-8 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-48 h-48 bg-[#F4511E]/5 rounded-bl-full pointer-events-none" />
                
                {activeOrgDept === "liaison" && (
                  <div className="space-y-6 animate-fade-in font-sans">
                    <span className="text-[10px] font-mono font-black bg-[#F4511E]/10 text-[#F4511E] px-3.5 py-1 rounded-full uppercase tracking-wider font-extrabold">SECTOR 1 • DIPLOMACY UNIT</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans leading-none">Sovereign Liaison Unit</h4>
                    <p className="text-slate-600 text-xs font-semibold leading-relaxed">
                      This division operates at the crucial junction of global coordinates. It bridges alliances with foreign municipal councils and sovereign high offices to guarantee that international aid dispatches clear regional ports without customs delays.
                    </p>
                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="text-[11px] font-mono font-bold text-slate-800 uppercase tracking-wide">// STANDARDIZED PROTOCOLS:</p>
                      <ul className="space-y-2 text-slate-500 text-xs font-semibold">
                        <li>• Coordinate with global health networks and UN councils directly.</li>
                        <li>• Negotiate cost-free logistical air bridges with regional carriers.</li>
                        <li>• Audit foreign visa and protective custody allocations.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeOrgDept === "clinical" && (
                  <div className="space-y-6 animate-fade-in font-sans">
                    <span className="text-[10px] font-mono font-black bg-[#F4511E]/10 text-[#F4511E] px-3.5 py-1 rounded-full uppercase tracking-wider font-extrabold">SECTOR 2 • DIAGNOSTICS</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans leading-none">Medical Diagnostics Board</h4>
                    <p className="text-slate-600 text-xs font-semibold leading-relaxed">
                      Composed of specialized oncologists and mobile clinic pilots. This department screens applicants for serious diseases, approves financial payouts to third-party surgical centers, and runs weekly mobile outpatient operations.
                    </p>
                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="text-[11px] font-mono font-bold text-slate-800 uppercase tracking-wide">// SYSTEMIC RESPONSIBILITIES:</p>
                      <ul className="space-y-2 text-slate-500 text-xs font-semibold">
                        <li>• Direct validation of regional oncologist screen records.</li>
                        <li>• Allocate prescription and formula distributions.</li>
                        <li>• Manage the live regional clinicians database.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeOrgDept === "triage" && (
                  <div className="space-y-6 animate-fade-in font-sans">
                    <span className="text-[10px] font-mono font-black bg-[#F4511E]/10 text-[#F4511E] px-3.5 py-1 rounded-full uppercase tracking-wider font-extrabold">SECTOR 3 • HUMANITARIAN RECOVERY</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans leading-none">Family Triage Unit</h4>
                    <p className="text-slate-600 text-xs font-semibold leading-relaxed">
                      The core response mechanism targeting extreme poverty and homelessness. Our caseworkers intervene on sight, transporting vulnerable mother-child groups to warm halfway houses and establishing local career pathways.
                    </p>
                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="text-[11px] font-mono font-bold text-slate-800 uppercase tracking-wide">// CORE METADATA VALUES:</p>
                      <ul className="space-y-2 text-slate-500 text-xs font-semibold">
                        <li>• Manage 9 transition houses and shelter networks.</li>
                        <li>• Issue immediate nutritional parcels on structural calls.</li>
                        <li>• Reunite displaced youth with validated parents.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeOrgDept === "comply" && (
                  <div className="space-y-6 animate-fade-in font-sans">
                    <span className="text-[10px] font-mono font-black bg-[#F4511E]/10 text-[#F4511E] px-3.5 py-1 rounded-full uppercase tracking-wider font-extrabold">SECTOR 4 • AUDIT COMMAND</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans leading-none">Financial Audit Board</h4>
                    <p className="text-slate-600 text-xs font-semibold leading-relaxed">
                      Ensuring structural compliance of all funding streams. Operates independently of the advisory board. Generates daily financial legers and verifies that administrative spending stays beneath the mandated threshold.
                    </p>
                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="text-[11px] font-mono font-bold text-slate-800 uppercase tracking-wide">// ETHICAL Directives:</p>
                      <ul className="space-y-2 text-slate-500 text-xs font-semibold">
                        <li>• Double-entry ledger tracking published for public review.</li>
                        <li>• Zero personal expense allocations for board members.</li>
                        <li>• Underwrite 100% direct-to-field sponsorship flows.</li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[#888888] text-[10px] font-mono">
                  <span>SYSTEM STATUS: COMPLIANT</span>
                  <span className="text-emerald-500 font-bold uppercase text-[9px]">Audited By Continuous Ledger Protocol</span>
                </div>
              </div>
            </div>
          </div>

          <OrgCTA onNavigate={handlePageChange} />
        </div>
      )}

      {/* BRAND NEW PREMIUM "ABOUT US" PAGE */}
      {activePage === "about-legacy" && (
        <div className="bg-white min-h-screen text-[#111111] font-sans pb-24 selection:bg-[#F4511E]/20 selection:text-[#F4511E]">
          {/* PAGE HEADER / HERO SECTION */}
          <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
            {/* Ultra-premium cinematic hero image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 scale-105 hover:scale-100" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=1600')" }}
            />
            {/* Cinematic dark overlay */}
            <div className="absolute inset-0 bg-slate-950/75 z-10" />
            
            {/* Centered Content */}
            <div className="relative z-20 text-center max-w-4xl mx-auto px-6 space-y-6 flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center space-x-2 bg-[#F4511E]/10 border border-[#F4511E]/30 px-4 py-2 rounded-full backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4 text-[#F4511E] animate-pulse" />
                <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase font-black text-white">
                  {translate("about_foundation", lang)}
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-3xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.1]"
              >
                {translate("hero_title", lang)}
              </motion.h1>
              
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "96px" }}
                transition={{ duration: 1, delay: 0.4 }}
                className="h-[3px] bg-[#F4511E] rounded-full mx-auto"
              />
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-slate-300 text-sm md:text-lg font-medium leading-relaxed max-w-2xl"
              >
                {translate("hero_subtext", lang)}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pt-8"
              >
                <div className="flex flex-col items-center space-y-2 cursor-pointer" onClick={() => window.scrollTo({ top: 620, behavior: "smooth" })}>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#F4511E] font-extrabold animate-pulse">explore our mission</span>
                  <div className="w-5 h-8 border-2 border-slate-500 rounded-full flex items-start justify-center p-1">
                    <motion.div 
                      animate={{ y: [0, 8, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="w-1.5 h-1.5 bg-[#F4511E] rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ABOUT US MAIN SECTION */}
          <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Side: Large premium humanitarian image */}
              <div className="relative group overflow-hidden rounded-3xl shadow-2xl border border-slate-100">
                <div className="absolute inset-0 bg-[#F4511E]/5 group-hover:bg-transparent transition-all duration-500 z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1000" 
                  alt="Sovereign humanitarian outreach" 
                  className="w-full h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-200 shadow-lg">
                  <span className="block text-[#F4511E] font-mono text-[10px] tracking-widest uppercase font-black">active footprint</span>
                  <span className="block text-slate-800 font-sans font-extrabold text-xs tracking-wider uppercase">Direct On-the-Ground Presence</span>
                </div>
              </div>

              {/* Right Side: Processed premium content */}
              <div className="space-y-8">
                <div className="space-y-2">
                  <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block">// GLOBAL MANDATE</span>
                  <h2 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight block font-sans">
                    {translate("about_main_title", lang)}
                  </h2>
                  <div className="h-[2px] w-20 bg-[#F4511E]" />
                </div>
                
                <div className="space-y-6 text-[#333333] text-sm leading-relaxed font-sans font-medium">
                  <p>{translate("about_par1", lang)}</p>
                  <p>{translate("about_par2", lang)}</p>
                  <p>{translate("about_par3", lang)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#F4511E]/10 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[#F4511E]" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-950 block">Registered 501(c)(3)</span>
                      <span className="text-[10px] text-slate-500 font-mono">Tax-Exempt Entity</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-950 block">Continuous Audit</span>
                      <span className="text-[10px] text-slate-500 font-mono">Maximum Transparency</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MISSION & VISION SECTION */}
          <div className="bg-[#FAF9F6] py-24 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Mission Card */}
              <div className="bg-white border border-[#EAEAEA] rounded-[32px] p-8 lg:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(244,81,30,0.08)] hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-[#F4511E]/5 to-transparent rounded-bl-full pointer-events-none" />
                <div className="space-y-6">
                  <div className="w-14 h-14 bg-[#F4511E]/10 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Compass className="w-7 h-7 text-[#F4511E]" />
                  </div>
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#F4511E] font-black block">// core directive</span>
                    <h3 className="text-2xl font-black text-[#111111] uppercase tracking-tight font-sans">{translate("mission", lang)}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed font-sans font-medium">
                    {translate("mission_text", lang)}
                  </p>
                </div>
              </div>

              {/* Vision Card */}
              <div className="bg-white border border-[#EAEAEA] rounded-[32px] p-8 lg:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(244,81,30,0.08)] hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-[#F4511E]/5 to-transparent rounded-bl-full pointer-events-none" />
                <div className="space-y-6">
                  <div className="w-14 h-14 bg-[#F4511E]/10 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Globe className="w-7 h-7 text-[#F4511E]" />
                  </div>
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#F4511E] font-black block">// future outlook</span>
                    <h3 className="text-2xl font-black text-[#111111] uppercase tracking-tight font-sans">{translate("vision", lang)}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed font-sans font-medium">
                    {translate("vision_text", lang)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CINEMATIC FOUNDER'S CHRONICLE */}
          <div id="founders-chronicle" className="max-w-7xl mx-auto px-4 py-28 space-y-16 scroll-mt-24">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block">// THE FOUNDER’S DIETARY</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight font-sans">
                {translate("founder_chronicle", lang)}
              </h2>
              <div className="h-[2px] w-24 bg-[#F4511E] mx-auto" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 relative space-y-6">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-50">
                  <img 
                    src="https://i.imgur.com/Iv8vgcg.png" 
                    alt="His Highness Hamdan bin Mohammed Al Maktoum Profile Portrait" 
                    className="w-full h-[500px] object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                    <p className="font-extrabold uppercase text-xs tracking-widest text-[#F4511E] mb-1">His Highness</p>
                    <p className="font-black font-sans text-lg tracking-tight uppercase">Hamdan bin Mohammed Al Maktoum</p>
                    <p className="text-[10px] text-slate-300 font-mono font-medium">Founder & Sovereign Patron</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 italic text-slate-700 text-xs font-serif font-bold text-center leading-relaxed">
                  "Sovereign benevolence is measured not by wealth, but by direct relief to absolute borders. Our oath is to leave no hand unheld."
                </div>
              </div>

              <div className="lg:col-span-7 space-y-8 font-sans">
                <div className="space-y-4">
                  <span className="text-[9px] font-mono font-black text-[#F4511E] tracking-widest uppercase">// PHILANTHROPICAL DECADE TIMELINE</span>
                  <h3 className="text-xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">Decade of Committed Global Action</h3>
                  <p className="text-slate-500 text-xs">Tracing the core roots and legacy of systematic humanitarian assistance.</p>
                </div>

                <div className="relative border-l-2 border-[#E5E7EB] pl-8 space-y-8 py-2">
                  {[
                    { year: "2012", title: "Seeds of Compassion Initiative", text: "Commenced direct medical support campaigns, bringing critical outpatient diagnostic caravans to underserved communities." },
                    { year: "2016", title: "Establishing the Oncology Triage Program", text: "Allocated multi-million personal endowments towards sovereign clinics, funding cost-free chemotherapy treatments directly." },
                    { year: "2021", title: "Systemic 501(c)(3) Covenant Framework", text: "Unified disparate volunteer networks under a singular world-class charter, expanding on-the-ground action centers." },
                    { year: "2026", title: "The Standard of Absolute Direct Aid", text: "Ensured 100% of fundraising receipts flow seamlessly into active field units without heavy administrative deductions." }
                  ].map((timeline, idx) => (
                    <div key={idx} className="relative group">
                      <span className="absolute -left-[41px] top-0 bg-white border-2 border-[#F4511E] rounded-full w-6 h-6 flex items-center justify-center font-mono text-[9px] font-black text-[#F4511E] shadow-sm group-hover:bg-[#F4511E] group-hover:text-white transition-all">
                        {idx + 1}
                      </span>
                      <div className="space-y-1">
                        <span className="inline-block text-[10px] font-mono font-black bg-[#F4511E]/10 text-[#F4511E] px-2.5 py-0.5 rounded-full">{timeline.year}</span>
                        <h4 className="text-sm font-black text-slate-900 group-hover:text-[#F4511E] uppercase tracking-tight transition-colors">{timeline.title}</h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{timeline.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BOARD OF DIRECTORS COVENANT */}
          <div id="board-of-directors" className="bg-[#FAF9F6] py-28 border-y border-slate-100 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 space-y-16">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block">// STEWARDSHIP PROTOCOL</span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight font-sans">
                  {translate("board_directors", lang)}
                </h2>
                <div className="h-[2px] w-24 bg-[#F4511E] mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  {
                    name: "Dr. Amina Al Mansoori",
                    role: "Trustee of Clinical Strategy & Oncology Services",
                    desc: "Coordinates complex inpatient screening programs and verifies pharmaceutical ledger allocations globally.",
                    img: aminaAlMansooriImg
                  },
                  {
                    name: "William H. Harrison",
                    role: "Governor of International Triage Coordination",
                    desc: "Oversees local shelter networks, coordinates housing placements, and designs vocational reintegration modules.",
                    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop&crop=faces&ar=3:4"
                  },
                  {
                    name: "Noura Al Kaabi",
                    role: "President of Integrity & Sovereign Compliance",
                    desc: "Maintains absolute financial compliance parameters under transparent 501(c)(3) continuous audit systems.",
                    img: nouraAlKaabiImg
                  },
                  {
                    name: "Omar Al Hashimi",
                    role: "Counselor of Diplomatic Relations & Advisory",
                    desc: "Aligns sovereign legal protocols to fast-track emergency foreign assistance and humanitarian visas.",
                    img: "https://images.unsplash.com/photo-1625504615927-c14f4f309b63?q=80&w=600&auto=format&fit=crop&crop=faces&ar=3:4"
                  }
                ].map((board, idx) => (
                  <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md flex flex-col justify-between group hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-[#F4511E]/5 group-hover:bg-transparent transition-colors z-10" />
                      <img src={board.img} alt={board.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="block font-sans font-black text-slate-950 text-sm tracking-tight leading-snug">{board.name}</span>
                        <span className="block text-[9px] text-[#F4511E] font-mono tracking-widest uppercase font-extrabold pb-2">{board.role}</span>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{board.desc}</p>
                      </div>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                        <span>certified member</span>
                        <span className="text-emerald-500 font-extrabold tracking-normal">● ACTIVE</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ORGANIZATIONAL STRUCTURE WITH INTERACTIVE TABS */}
          <div id="org-structure" className="max-w-7xl mx-auto px-4 py-28 space-y-16 scroll-mt-24">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block">// WORKFLOW TOPOLOGY</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight font-sans">
                {translate("org_structure", lang)}
              </h2>
              <div className="h-[2px] w-24 bg-[#F4511E] mx-auto" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-strech">
              {/* Left Selector Card */}
              <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 rounded-[32px] border border-slate-100 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[10px] font-mono font-black text-[#F4511E] tracking-widest uppercase block mb-1">interactive map</span>
                  <h3 className="text-lg font-black uppercase text-slate-900 tracking-tight leading-snug mb-3">Our Core Departments</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">Select any sector component to audit active responsibilities and systemic protocols.</p>
                  
                  <div className="space-y-2.5">
                    {[
                      { key: "liaison", label: "Sovereign Liaison Unit", icon: Users },
                      { key: "clinical", label: "Medical Diagnostics Board", icon: Activity },
                      { key: "triage", label: "Family Triage Unit", icon: Compass },
                      { key: "comply", label: "Financial Audit Board", icon: Shield }
                    ].map((btn) => {
                      const Icon = btn.icon;
                      return (
                        <button
                          key={btn.key}
                          onClick={() => setActiveOrgDept(btn.key)}
                          className={`w-full flex items-center space-x-3 p-4 rounded-2xl text-left border text-xs font-black uppercase tracking-wider transition-all ${
                            activeOrgDept === btn.key
                              ? "bg-white border-[#F4511E] text-[#F4511E] shadow-sm scale-[1.02]"
                              : "bg-white/50 border-slate-200 hover:border-[#F4511E] text-slate-700"
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${activeOrgDept === btn.key ? "text-[#F4511E]" : "text-slate-400"}`} />
                          <span>{btn.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 text-center text-[10px] font-mono text-slate-400 font-extrabold uppercase tracking-widest">
                  FAZZA INTEGRATED FLOW PROTOCOL v4
                </div>
              </div>

              {/* Right Display Board */}
              <div className="lg:col-span-7 bg-white rounded-[32px] border border-slate-100 shadow-xl p-8 sm:p-12 flex flex-col justify-between space-y-8 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-48 h-48 bg-[#F4511E]/5 rounded-bl-full pointer-events-none" />
                
                {activeOrgDept === "liaison" && (
                  <div className="space-y-6">
                    <span className="text-[10px] font-mono font-black bg-[#F4511E]/10 text-[#F4511E] px-3.5 py-1 rounded-full uppercase tracking-wider font-extrabold">SECTOR 1 • DIPLOMACY UNIT</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans leading-none">Sovereign Liaison Unit</h4>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed">
                      This division operates at the crucial junction of global coordinates. It bridges alliances with foreign municipal councils and sovereign high offices to guarantee that international aid dispatches clear regional ports without customs delays.
                    </p>
                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="text-[11px] font-mono font-bold text-slate-800 uppercase tracking-wide">// STANDARDIZED PROTOCOLS:</p>
                      <ul className="space-y-2 text-slate-500 text-xs font-medium">
                        <li>• Coordinate with global health networks and UN councils directly.</li>
                        <li>• Negotiate cost-free logistical air bridges with regional carriers.</li>
                        <li>• Audit foreign visa and protective custody allocations.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeOrgDept === "clinical" && (
                  <div className="space-y-6">
                    <span className="text-[10px] font-mono font-black bg-[#F4511E]/10 text-[#F4511E] px-3.5 py-1 rounded-full uppercase tracking-wider font-extrabold">SECTOR 2 • DIAGNOSTICS</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans leading-none">Medical Diagnostics Board</h4>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed">
                      Composed of specialized oncologists and mobile clinic pilots. This department screens applicants for serious diseases, approves financial payouts to third-party surgical centers, and runs weekly mobile outpatient operations.
                    </p>
                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="text-[11px] font-mono font-bold text-slate-800 uppercase tracking-wide">// SYSTEMIC RESPONSIBILITIES:</p>
                      <ul className="space-y-2 text-slate-500 text-xs font-medium">
                        <li>• Direct validation of regional oncologist screen records.</li>
                        <li>• Allocate prescription and formula distributions.</li>
                        <li>• Manage the live regional clinicians database.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeOrgDept === "triage" && (
                  <div className="space-y-6">
                    <span className="text-[10px] font-mono font-black bg-[#F4511E]/10 text-[#F4511E] px-3.5 py-1 rounded-full uppercase tracking-wider font-extrabold">SECTOR 3 • HUMANITARIAN RECOVERY</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans leading-none">Family Triage Unit</h4>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed">
                      The core response mechanism targeting extreme poverty and homelessness. Our caseworkers intervene on sight, transporting vulnerable mother-child groups to warm halfway houses and establishing local career pathways.
                    </p>
                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="text-[11px] font-mono font-bold text-slate-800 uppercase tracking-wide">// CORE METADATA VALUES:</p>
                      <ul className="space-y-2 text-slate-500 text-xs font-medium">
                        <li>• Manage 9 transition houses and shelter networks.</li>
                        <li>• Issue immediate nutritional parcels on structural calls.</li>
                        <li>• Reunite displaced youth with validated parents.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeOrgDept === "comply" && (
                  <div className="space-y-6">
                    <span className="text-[10px] font-mono font-black bg-[#F4511E]/10 text-[#F4511E] px-3.5 py-1 rounded-full uppercase tracking-wider font-extrabold">SECTOR 4 • AUDIT COMMAND</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans leading-none">Financial Audit Board</h4>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed">
                      Ensuring structural compliance of all funding streams. Operates independently of the advisory board. Generates daily financial legers and verifies that administrative spending stays beneath the mandated threshold.
                    </p>
                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="text-[11px] font-mono font-bold text-slate-800 uppercase tracking-wide">// ETHICAL Directives:</p>
                      <ul className="space-y-2 text-slate-500 text-xs font-medium">
                        <li>• Double-entry ledger tracking published for public review.</li>
                        <li>• Zero personal expense allocations for board members.</li>
                        <li>• Underwrite 100% direct-to-field sponsorship flows.</li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-slate-400 text-[10px] font-mono">
                  <span>SYSTEM STATUS: COMPLIANT</span>
                  <span className="text-emerald-500 font-bold uppercase">Audited By Continuous Ledger Protocol</span>
                </div>
              </div>
            </div>
          </div>

          {/* OUR VALUES SECTION */}
          <div className="bg-[#FAF9F6] py-24 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 space-y-16">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block">// PRINCIPLE PILLARS</span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight font-sans">Our Values</h2>
                <div className="h-[2px] w-24 bg-[#F4511E] mx-auto" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  {
                    title: "Compassion",
                    description: "We serve with empathy, kindness, and respect for human dignity.",
                    icon: Heart
                  },
                  {
                    title: "Integrity",
                    description: "We uphold transparency, accountability, and ethical practices in all our activities.",
                    icon: Shield
                  },
                  {
                    title: "Service",
                    description: "We are dedicated to improving lives through meaningful action and community engagement.",
                    icon: Activity
                  },
                  {
                    title: "Empowerment",
                    description: "We equip individuals and families with resources and opportunities for sustainable growth.",
                    icon: Sparkles
                  },
                  {
                    title: "Collaboration",
                    description: "We believe lasting change is achieved through partnerships and collective effort.",
                    icon: Users
                  }
                ].map((val, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white border border-[#EAEAEA] rounded-3xl p-6 shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="w-10 h-10 bg-[#F4511E]/10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <val.icon className="w-5 h-5 text-[#F4511E]" />
                      </div>
                      <h4 className="font-extrabold text-[#111111] text-base font-sans uppercase tracking-tight">{val.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed font-sans font-medium">{val.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CALL TO ACTION SECTION */}
          <div className="max-w-7xl mx-auto px-4 py-24 pb-12">
            <div className="relative rounded-[40px] overflow-hidden bg-slate-950 px-8 py-20 md:p-16 text-center shadow-2xl border border-slate-900 group">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:scale-105 transition-all duration-10000" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610015694295-cd6a32d16eb5?q=80&w=1200')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-950 z-10" />

              <div className="relative z-20 max-w-3xl mx-auto space-y-6">
                <span className="text-[#F4511E] font-mono text-xs uppercase tracking-widest font-black block">Join the Covenant</span>
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight font-sans">Together, We Can Change Lives</h2>
                
                <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed">
                  Together, we can build stronger communities, provide hope to those in need, and create a future where homelessness, poverty, and the burden of cancer are significantly reduced.
                </p>

                <div className="py-2">
                  <p className="text-lg md:text-xl font-serif text-[#F4511E]/90 italic font-bold">
                    “Changing Lives, Restoring Hope, Building Futures.”
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4 w-full sm:w-auto">
                  <PremiumDonateButton 
                    onClick={() => { handlePageChange("donate"); setDonationStep(1); }} 
                    lang={lang}
                    className="w-full sm:w-auto"
                  />
                  <button 
                    onClick={() => { handlePageChange("volunteer"); }}
                    className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border-2 border-white/60 hover:border-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                  >
                    Become a Volunteer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* BRAND NEW PREMIUM "OUR SERVICES & PROGRAMS" CATALOG */}
      {activePage === "programs" && (
        <div className="bg-white min-h-screen text-[#111111] pb-24 selection:bg-[#F4511E]/20 selection:text-[#F4511E]">
          {/* Header Hero */}
          <PageHeader page="programs" lang={lang} />

          <div className="relative z-20 bg-white max-w-7xl mx-auto px-4 py-16 space-y-20">
            {/* grid catalog */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  id: "srv-hiv",
                  title: "HIV Support",
                  meta: "Clinical Diagnostics & Food Allocations",
                  desc: "Comprehensive on-site blood diagnostics, cost-free clinical guidance, and personalized nutritional packages mapped directly for immune assistance.",
                  details: "Patients in regional care centers get immediate access to top tier diagnostics and ongoing counselling, funded entirely through private royal endowments. We operate certified dispatch points ensuring privacy and warm medical support.",
                  metrics: "14,500+ Patients Restored",
                  tag: "HEALTH OUTREACH",
                  img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600"
                },
                {
                  id: "srv-halfway",
                  title: "Halfway House",
                  meta: "Safe Reintegration Units",
                  desc: "Secure, drug-free transitional residency structures housing individuals exiting hard conditions. Focused on physical safety and vocational recovery.",
                  details: "Residents participate in accredited life therapy models, local job readiness modules, and cognitive training programs. Every resident has clear progress tracking from caseworkers and peer mentoring circles.",
                  metrics: "88% Career Transition Success",
                  tag: "STABLE SHELTER",
                  img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600"
                },
                {
                  id: "srv-foreigners",
                  title: "Vulnerable Foreigners Aid",
                  meta: "Emergency Liaison Support",
                  desc: "Emergency shelter, food dispatch, standard translator services, and secure airfare assistance for stateless or distressed individuals.",
                  details: "In direct alliance with embassy teams and local municipal councils, our liaison units provide rapid visa clearances and safety shelter protocols for individuals fleeing acute structural crises.",
                  metrics: "2,100+ Distresses Settled",
                  tag: "DIPLOMATIC LIAISON",
                  img: "https://images.unsplash.com/photo-1516087796934-2e917d5940d9?q=80&w=600"
                },
                {
                  id: "srv-children",
                  title: "Children Came Home",
                  meta: "Youth Protective Reunification",
                  desc: "Systematic tracking program identifying vulnerable displaced youth, establishing safe protective quarters, and coordinating validated family unification.",
                  details: "Our active field triages operate around local boundaries to ensure displaced youth find immediately secure, warm quarters, followed by verified, audited family integration processes.",
                  metrics: "620+ Children Unified",
                  tag: "YOUTH PROTECTION",
                  img: "https://images.unsplash.com/photo-1520697920397-22f28122d4f2?q=80&w=600"
                },
                {
                  id: "srv-shelter",
                  title: "Shelter and Placement",
                  meta: "Transitional Domestic Housing",
                  desc: "Active temporary housing blocks equipped with verified water facilities, 24/7 security guard lines, and direct daily nourishment distribution.",
                  details: "When families face abrupt evictions, we underwrite urgent placements within state-of-the-art housing sites. These blocks offer high dignity pathways, clean facilities, and child learning rooms.",
                  metrics: "9 Active Shelter Units",
                  tag: "STABLE SHELTER",
                  img: "https://images.unsplash.com/photo-1460355976672-71c3f0a4dbbd?q=80&w=600"
                },
                {
                  id: "srv-hospitals",
                  title: "Hospitals and Medical Care",
                  meta: "Oncology Funding & Screenings",
                  desc: "Direct administrative funding for complex medical actions, cancer diagnostic scans, chemotherapy courses, and reconstructive operations.",
                  details: "We close regional healthcare gaps. By partnering directly with designated surgical centers, we sponsor expensive life-saving oncology protocols for patients who possess zero medical plans.",
                  metrics: "$7.2M Underwritten Sponsors",
                  tag: "HEALTH OUTREACH",
                  img: "https://images.unsplash.com/photo-1524672621453-61b8fbfad17a?q=80&w=600"
                },
                {
                  id: "srv-mother",
                  title: "Mother and Child Shelter",
                  meta: "Neonatal Sanctuary & Nutrition",
                  desc: "Safe specialized wings offering physical rehabilitation, infant formula dispatch supplies, and pediatric checks for new vulnerable mothers.",
                  details: "Mothers receive ongoing infant care training, clean clothes, warm baby nutrients, and clinical mental checkups. This serves as a vital safety net for young families during early developmental weeks.",
                  metrics: "4,600+ Mothers Supported",
                  tag: "YOUTH PROTECTION",
                  img: "https://images.unsplash.com/photo-1531983412531-1f49a365f69a?q=80&w=600"
                }
              ].map((srv) => (
                <div 
                  key={srv.id} 
                  id={srv.id} 
                  className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between scroll-mt-24"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img src={srv.img} alt={srv.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur shadow-sm border border-slate-100 text-[9px] font-mono font-black uppercase text-[#F4511E] tracking-widest px-3.5 py-1 rounded-full">
                        {srv.tag}
                      </div>
                    </div>
                    <div className="p-6 space-y-3">
                      <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-[#F4511E] block">{srv.meta}</span>
                      <h3 className="font-sans font-black text-slate-950 text-xl uppercase tracking-tight">{srv.title}</h3>
                      <p className="text-slate-500 text-xs font-medium leading-relaxed">{srv.desc}</p>
                      
                      <button 
                        onClick={() => setActiveServiceSpotlight(activeServiceSpotlight === srv.id ? null : srv.id)}
                        className="text-xs text-[#F4511E] hover:text-[#D84315] font-black uppercase tracking-wider flex items-center space-x-1 pt-2"
                      >
                        <span>{activeServiceSpotlight === srv.id ? "Hide details" : "Read active protocol ➔"}</span>
                      </button>

                      {activeServiceSpotlight === srv.id && (
                        <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-[11px] text-slate-600 leading-relaxed font-sans font-medium mt-3 animate-fade-in">
                          {srv.details}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-50 mt-4 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-emerald-600 font-extrabold tracking-wide uppercase">// METRIC: {srv.metrics}</span>
                    <button 
                      onClick={() => {
                        handlePageChange("donate");
                        setDonationStep(1);
                      }}
                      className="text-[#F4511E] hover:underline font-extrabold uppercase"
                    >
                      Sponsor Care
                    </button>
                  </div>
                </div>
              ))}

              {/* 4. SEMINAR REQUEST PANEL */}
              <div id="srv-seminar" className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-md flex flex-col justify-between scroll-mt-24">
                <div className="p-6 space-y-4">
                  <div className="w-10 h-10 bg-[#F4511E]/10 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#F4511E]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono tracking-wider font-extrabold text-[#F4511E] uppercase">UTILITY SERVICE</span>
                    <h3 className="font-sans font-black text-slate-950 text-xl uppercase tracking-tight">Seminar Request Booking</h3>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Book certified oncologists, medical technicians, and regional community ambassadors to coordinate oncology self-screening lectures.
                    </p>
                  </div>

                  {seminarSubmitted ? (
                    <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-2xl text-xs space-y-2 text-center animate-fade-in">
                      <span className="font-black text-base">✓ REQUEST BOOKED</span>
                      <p className="font-medium text-[11px]">Your regional coordinates have been logged. The Sovereign Council will assign an ambassador to your location within 48 business hours.</p>
                      <button 
                        onClick={() => setSeminarSubmitted(false)}
                        className="text-emerald-700 underline font-mono text-[10px] uppercase font-bold"
                      >
                        Book another lecture
                      </button>
                    </div>
                  ) : (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSeminarSubmitted(true);
                      }}
                      className="space-y-3 pt-2"
                    >
                      <div>
                        <label className="block text-[9px] uppercase font-mono text-slate-400 font-extrabold tracking-wider mb-1">Select Lecture Topic</label>
                        <select 
                          value={seminarTopic}
                          onChange={(e) => setSeminarTopic(e.target.value)}
                          className="w-full bg-[#FAFAFA] border border-[#EAEAEA] text-[#111111] font-bold text-xs rounded-xl p-3 outline-none focus:border-[#F4511E]"
                        >
                          <option value="Oncology Care Operations">Oncology Care Operations & Diagnostics</option>
                          <option value="Hygiene Pathways">Warm Hygiene and Transitional Lodging</option>
                          <option value="Community Philanthropy">Systematic Humanitarian Strategy</option>
                          <option value="Mental Health Support">Counseling Protocols for Vulnerable Youth</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[9px] uppercase font-mono text-slate-400 font-extrabold tracking-wider mb-1">Target Date</label>
                          <input 
                            type="date"
                            required
                            className="w-full bg-[#FAFAFA] border border-[#EAEAEA] text-[#111111] font-medium text-xs rounded-xl p-3 outline-none focus:border-[#F4511E]"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase font-mono text-slate-400 font-extrabold tracking-wider mb-1">Expected Audience</label>
                          <input 
                            type="number" 
                            placeholder="e.g. 150"
                            required
                            className="w-full bg-[#FAFAFA] border border-[#EAEAEA] text-[#111111] font-medium text-xs rounded-xl p-3 outline-none focus:border-[#F4511E]"
                          />
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-[#F4511E] hover:bg-[#D84315] text-white py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition shadow-sm"
                      >
                        Submit Dispatch Booking
                      </button>
                    </form>
                  )}
                </div>
                <div className="p-6 pt-0 border-t border-slate-50 mt-4 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Sovereign Outreach Code</span>
                  <span className="text-[#F4511E] font-bold">FAZ-LECTURE-MODULE</span>
                </div>
              </div>

              {/* 5. HEALTH AMBASSADOR DATABASE SEARCH */}
              <div id="srv-database" className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-md flex flex-col justify-between scroll-mt-24">
                <div className="p-6 space-y-4">
                  <div className="w-10 h-10 bg-[#F4511E]/10 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#F4511E]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono tracking-wider font-extrabold text-[#F4511E] uppercase">DATABASE REGISTRY</span>
                    <h3 className="font-sans font-black text-slate-950 text-xl uppercase tracking-tight">Ambassador Directory</h3>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Search local medical marshals and validated clinicians registered inside our system to assist on ground.
                    </p>
                  </div>

                  <div className="relative pt-2">
                    <input 
                      type="text"
                      placeholder="Search specialties (e.g., Oncology, Caravan)"
                      value={healthSearchQuery}
                      onChange={(e) => setHealthSearchQuery(e.target.value)}
                      className="w-full bg-[#FAFAFA] border-2 border-slate-200 focus:border-[#F4511E] text-xs font-bold rounded-xl py-3 pl-9 pr-4 outline-none placeholder-slate-400"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-[22px]" />
                  </div>

                  {/* Results directory list */}
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {[
                      { name: "Dr. Rachel Thorne", spec: "Oncology Diagnostics Coordinator", loc: "NY Clinical Caravan 1", phone: "1-800-FAZZA-MED" },
                      { name: "Prof. Marcus Vance", spec: "Transitional Therapy Lead", loc: "Sector 3 shelter coordination", phone: "1-800-FAZZA-SHELTER" },
                      { name: "Dr. Karim Al Saeed", spec: "Mobile Pediatric Chief", loc: "Maternity dispatch caravan", phone: "1-800-FAZZA-BABY" },
                      { name: "Nurse Elena Peterson", spec: "HIV Screen Lead Specialist", loc: "Caravan 4 clinical outpost", phone: "1-800-FAZZA-CLINIC" }
                    ]
                    .filter(amb => amb.spec.toLowerCase().includes(healthSearchQuery.toLowerCase()) || amb.name.toLowerCase().includes(healthSearchQuery.toLowerCase()))
                    .map((amb, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-xl text-[11px] border border-slate-100 flex items-center justify-between font-sans">
                        <div>
                          <span className="font-extrabold text-slate-950 block">{amb.name}</span>
                          <span className="text-[9px] text-[#F4511E] font-mono font-bold block">{amb.spec}</span>
                          <span className="text-[9px] text-slate-400 block">{amb.loc}</span>
                        </div>
                        <a href={`tel:${amb.phone}`} className="p-2 border border-[#F4511E]/20 hover:border-[#F4511E] bg-white rounded-lg text-[#F4511E] transition transform hover:scale-105 shrink-0 ml-2">
                          <Phone className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-slate-50 mt-4 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Continuous Registry System</span>
                  <span className="text-[#F4511E] font-bold">24 Active Clinicians listed</span>
                </div>
              </div>

            </div>

            {/* Core Values / Banner */}
            <div className="bg-[#FAF9F6] border border-[#EAEAEA] rounded-[40px] p-8 md:p-12 text-center space-y-4">
              <span className="text-xs font-mono font-black text-[#F4511E] tracking-widest uppercase">// FAZZA COMPASSION ASSIGNMENT</span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#111111] uppercase tracking-tight">Need Urgent Outpatient Care Coordination?</h2>
              <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto font-medium">
                Our clinics operate 24/7 without checking payment eligibility or local credentials. Reach our certified dispatcher units for priority security.
              </p>
              <div className="pt-2">
                <button 
                  onClick={() => handleLinkClick("contact")}
                  className="bg-[#111111] hover:bg-slate-900 text-white font-sans font-black text-[10px] tracking-widest uppercase px-6 py-3.5 rounded-full shadow-lg"
                >
                  Contact Urgent dispatch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* BRAND NEW PREMIUM "NEWSROOM & CHRONICLES" PRESS */}
      {activePage === "newsroom" && (
        <div className="bg-white min-h-screen text-[#111111] pb-24 selection:bg-[#F4511E]/20 selection:text-[#F4511E]">
          {/* Header Hero */}
          <PageHeader page="newsroom" lang={lang} />

          <div className="relative z-20 bg-white max-w-7xl mx-auto px-4 py-12 space-y-12">
            {/* Filter tags bar */}
            <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-100 pb-6">
              {[
                "All", 
                "Humanitarian News", 
                "Foundation Updates", 
                "Outreach Reports", 
                "Health Campaigns", 
                "Poverty Alleviation Stories", 
                "Community Impact Stories"
              ].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedNewsCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border transition-all ${
                    selectedNewsCategory === category
                      ? "bg-[#F4511E] border-[#F4511E] text-white"
                      : "bg-[#FAFAFA] border-[#EAEAEA] text-slate-800 hover:border-[#F4511E]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  id: "news-1",
                  title: "Outpatient Oncology Outpost Reaches Record Registrations",
                  category: "Health Campaigns",
                  date: "May 28, 2026",
                  author: "Dr. Amina Al Mansoori",
                  readTime: "4 min read",
                  text: "Our specialized cancer screening caravan operating within target boundaries has underwritten cost-free chemotherapy diagnostics for over 850 distressed mothers. Through targeted royal funding allocations, patient wait lists were reduced from six months to zero. We continue to establish partnerships with regional oncological surgical units.",
                  img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=600"
                },
                {
                  id: "news-2",
                  title: "Fazza Halfway Sanctuary Secures Career Certifications",
                  category: "Poverty Alleviation Stories",
                  date: "April 15, 2026",
                  author: "William H. Harrison",
                  readTime: "6 min read",
                  text: "We celebrate the sovereign transition of 140 graduates from our stable halfway house quarters. In partnering with regional technical councils, residents achieved accredited welding and safety dispatch certifications. All graduates have been placed inside active commercial networks with stable living salaries.",
                  img: "https://images.unsplash.com/photo-1489659639091-8b687bc4386e?q=80&w=600"
                },
                {
                  id: "news-3",
                  title: "Q1 Public Audit Released: 100% Direct Delivery Compliance Achieved",
                  category: "Foundation Updates",
                  date: "March 10, 2026",
                  author: "Noura Al Kaabi",
                  readTime: "8 min read",
                  text: "Pursuant to transparent 501(c)(3) continuous audit systems, our board of governance published the complete double-entry financial ledger of Q1. Record fundraising receipts of $4.8M were executed, with exactly 100% of standard sponsorships flowing straight into medical screenings and transitional halfway quarters with zero admin offsets.",
                  img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=600"
                },
                {
                  id: "news-4",
                  title: "Emergency Food Dispatch Responds to Regional Structural Shock",
                  category: "Outreach Reports",
                  date: "February 22, 2026",
                  author: "Caseworker Team",
                  readTime: "5 min read",
                  text: "In responding to abrupt regional layoffs and climate factors, the Prince Fazza Family Triage caravan deployed 5,000 nutritional packages alongside baby formula formula dispatch units, guaranteeing food security for families with zero state access.",
                  img: "https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=600"
                },
                {
                  id: "news-5",
                  title: "Missing Children Reunification Protcols Bring Nine Youth Home",
                  category: "Community Impact Stories",
                  date: "January 14, 2026",
                  author: "Youth Protection Team",
                  readTime: "7 min read",
                  text: "Collaborating with local municipal authorities, our specialized caseworkers located nine missing displaced youth, establishing secure transitional sanctuary blocks while processing strict ID and blood-line verifications to return the children back.",
                  img: "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?q=80&w=600"
                }
              ]
              .filter(post => selectedNewsCategory === "All" || post.category === selectedNewsCategory)
              .map((post) => (
                <div 
                  key={post.id} 
                  className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-md flex flex-col justify-between group hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-50">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 bg-[#F4511E] text-white text-[8px] font-mono tracking-widest uppercase font-black px-3.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-mono font-bold uppercase">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-sans font-black text-slate-950 text-base uppercase tracking-tight leading-snug group-hover:text-[#F4511E] transition-colors">{post.title}</h3>
                      <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-3">{post.text}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-[#F4511E]/10 rounded-full flex items-center justify-center text-[10px] font-mono font-black text-[#F4511E]">
                          {post.author.charAt(0)}
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold tracking-tight">By {post.author}</span>
                      </div>

                      <button 
                        onClick={() => setActiveNewsPost(post)}
                        className="text-xs text-[#F4511E] font-black uppercase tracking-wider hover:underline"
                      >
                        Read Article
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DETAIL MODAL OVERLAY */}
          {activeNewsPost && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-white max-w-2xl w-full rounded-[38px] p-8 md:p-10 border border-slate-100 shadow-2xl relative max-h-[90vh] overflow-y-auto font-sans">
                <button
                  onClick={() => setActiveNewsPost(null)}
                  className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="bg-[#F4511E]/10 text-[#F4511E] text-[10px] tracking-widest font-mono font-black uppercase px-3.5 py-1 rounded-full inline-block">
                      {activeNewsPost.category}
                    </span>
                    <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-mono font-bold uppercase">
                      <span>{activeNewsPost.date}</span>
                      <span>•</span>
                      <span>{activeNewsPost.readTime}</span>
                      <span>•</span>
                      <span>By {activeNewsPost.author}</span>
                    </div>
                    <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight text-slate-950 leading-tight">
                      {activeNewsPost.title}
                    </h2>
                  </div>

                  <div className="h-64 rounded-3xl overflow-hidden shadow-md">
                    <img src={activeNewsPost.img} alt={activeNewsPost.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-4 text-slate-700 text-sm leading-relaxed font-sans font-medium">
                    <p>{activeNewsPost.text}</p>
                    <p>
                      In alignment with the core values of Prince Fazza, we maintain strict field integrity records detailing exactly how every surgical allocation or residency voucher gets dispatched. Every clinical screening is recorded on dynamic database parameters, remaining visible to verified institutional auditors for absolute double-entry compliance.
                    </p>
                    <p>
                      We extend our profound gratitude toward our network of private sponsors who make these oncology screenings and transitional sheltered placement facilities possible. Together, we are changing lives, restoring dignity, and building sustainable futures.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400 font-bold uppercase">
                    <span>FAZZA OFFICIAL PRESS LOG v2.5</span>
                    <button 
                      onClick={() => {
                        setActiveNewsPost(null);
                        handlePageChange("donate");
                        setDonationStep(1);
                      }}
                      className="text-[#F4511E] underline"
                    >
                      Support this outreach campaign
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}


      {/* GLOBAL VOICES VIEW */}
      {activePage === "global-voices" && (
        <GlobalVoices onNavigate={handlePageChange} />
      )}

      {/* ADD COMMENTARY WORKFLOW VIEW */}
      {activePage === "global-voices/add-commentary" && (
        <GlobalVoicesAddCommentary onNavigate={handlePageChange} />
      )}


      {/* 3. CAMPAIGNS & EMERGENCY SPECS VIEW */}
      {(activePage === "campaigns" || activePage === "emergency-relief" || activePage === "scholarships" || activePage === "water-projects") && (
        <div className="max-w-7xl mx-auto px-4 py-24 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[#F4511E] font-mono text-xs uppercase tracking-widest font-black">CAMPAIGNS TRACKER Portal</span>
            <h1 className="text-4xl font-extrabold text-[#111111] font-sans tracking-tight leading-[1.1]">Active Human Sponsorship Targets</h1>
            <p className="text-slate-500 text-xs">Verify continuous fundraising achievement parameters directly below</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROGRAMS.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-3xl shadow-xl flex flex-col md:flex-row border border-[#EAEAEA] overflow-hidden">
                <div className="w-full md:w-48 h-48 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url(${campaign.imageUrl})` }} />
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="bg-[#FAFAFA] text-[#F4511E] border border-[#EAEAEA] text-[10px] uppercase font-mono px-3.5 py-1 rounded-full font-bold">{campaign.category}</span>
                    <h3 className="font-sans font-extrabold text-[#111111] text-lg mt-3">{campaign.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{campaign.description}</p>
                  </div>

                  <div className="mt-4 bg-[#FAFAFA] p-4 rounded-2xl border border-[#EAEAEA] space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="font-bold text-[#111111]">RAISED: ${campaign.raised.toLocaleString()}</span>
                      <span className="text-[#F4511E] font-bold">${campaign.goal.toLocaleString()} GOAL</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#F4511E] rounded-full" style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }} />
                    </div>
                    <div className="flex justify-between items-center text-[10px] pt-1">
                      <span className="text-slate-400 font-bold">{campaign.donorsCount.toLocaleString()} Sponsors Sourced</span>
                      <button 
                        onClick={() => {
                          setSelectedCampaignId(campaign.id);
                          setDonateAmount("1000"); // Standard luxury starting amount
                          handlePageChange("donate");
                          setDonationStep(1);
                        }}
                        className="text-[#F4511E] hover:underline font-extrabold uppercase tracking-wide text-[10px]"
                      >
                        Sponsor Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
           {/* 4. DONATE COMPREHENSIVE VIEW GATEWAY */}
      {activePage === "donate" && (
        <div className={isDonationFocusMode ? "bg-slate-50/50 backdrop-blur-sm min-h-screen flex items-center justify-center p-4" : "bg-white min-h-screen"}>
          {/* Page Header with hero image and details below */}
          {!isDonationFocusMode && <PageHeader page="donate" lang={lang} />}

          <div className={`${isDonationFocusMode ? "w-full max-w-2xl animate-fade-in" : "relative z-20 bg-white max-w-7xl mx-auto px-4 py-16"}`}>
            {/* Main Container Card — GLASSMORPHISM & LUXE FINISH */}
            <div className={`w-full bg-white rounded-[32px] overflow-hidden border border-[#EAEAEA] shadow-[0_24px_80px_rgba(0,0,0,0.06)] backdrop-blur-md relative font-sans ${isDonationFocusMode ? 'shadow-2xl' : ''}`}>
              
              {paymentSuccess ? (
              /* DYNAMIC ULTRA PREMIUM SUCCESS SCREEN */
              <div className="py-20 px-8 text-center max-w-2xl mx-auto space-y-8 animate-fade-in">
                <div className="relative w-24 h-24 mx-auto">
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-ping"></div>
                  <div className="bg-emerald-500 text-white w-24 h-24 rounded-full flex items-center justify-center relative shadow-xl">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-sans font-black text-3xl text-[#111111] tracking-tight">Blessings and thank you, {payerName}.</h3>
                  <p className="text-base text-slate-700 font-medium leading-relaxed font-sans">
                    Your contribution of <strong className="text-slate-950 font-black">${Number(donateAmount).toLocaleString()}</strong> was logged successfully under the official donation protocol.
                  </p>
                  <p className="text-base text-slate-700 font-medium leading-relaxed font-sans mt-4">
                    May Almighty God richly bless you, strengthen you, and reward you for your kindness, compassion, and support towards humanity.
                  </p>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
                  <button 
                    onClick={() => {
                      setPaymentSuccess(false);
                      setDonationStep(1);
                      setActivePage("home");
                    }} 
                    className="bg-[#111111] hover:bg-[#F4511E] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-305 shadow-md cursor-pointer"
                  >
                    Return to Home Overview
                  </button>
                  <button 
                    onClick={() => {
                      setPaymentSuccess(false);
                      setDonationStep(1);
                    }} 
                    className="bg-transparent hover:bg-slate-50 text-slate-700 border border-[#EAEAEA] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-305 cursor-pointer"
                  >
                    Pledge Another Volume
                  </button>
                </div>
              </div>
            ) : donationStep === 1 ? (
              /* ========================================================
                  STEP 1 — APPRECIATION / THANK YOU INTRO & TYPE SELECTION
                  ======================================================== */
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px] animate-fade-in">
                
                {/* LEFT SIDE: EMOTIONAL & HUMANITARIAN PRESENTATION (CINEMATIC IMAGE BACKGROUND) */}
                <div 
                  className="lg:col-span-6 relative bg-cover bg-center p-12 lg:p-16 flex flex-col justify-between min-h-[450px] lg:min-h-auto"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200')" }}
                >
                  {/* High contrast luxury overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/70 z-0"></div>

                  {/* Top Quote Ribbon */}
                  <div className="relative z-10 flex items-center space-x-2 text-[#F4511E] font-bold uppercase tracking-widest text-[11px] font-mono">
                    <Heart className="w-4 h-4 fill-current text-[#F4511E]" />
                    <span>DONATION PORTAL</span>
                  </div>

                  {/* Primary text content block */}
                  <div className="relative z-10 space-y-6 my-auto">
                    <h2 className="text-4xl lg:text-5xl font-black font-sans text-white leading-tight tracking-tight">
                      Thank You for Choosing to Change Lives
                    </h2>
                    <p className="text-sm text-slate-300 leading-relaxed font-sans font-medium">
                      Your generosity helps provide food, education, healthcare, and hope to vulnerable communities around the world.
                    </p>
                    
                    {/* Blessing block */}
                    <div className="pt-4 border-t border-white/10 mt-6 relative pl-5 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#F4511E]">
                      <p className="text-xs text-slate-200 font-mono tracking-wide uppercase font-bold text-[#F4511E] mb-1.5">Official Foundation Blessing</p>
                      <p className="text-xs text-slate-300 font-sans italic font-medium leading-relaxed">
                        “May Almighty God richly bless, strengthen, and reward you for your kindness, compassion, and support toward humanity.”
                      </p>
                    </div>
                  </div>

                  {/* Bottom metrics trust footer */}
                  <div className="relative z-10 grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs text-white">
                    <div>
                      <span className="block text-[#F4511E] font-black text-lg">100%</span>
                      <span className="text-slate-400 font-medium text-[10px]">Direct Materials Flow</span>
                    </div>
                    <div>
                      <span className="block text-white font-black text-lg">UNHCR</span>
                      <span className="text-slate-400 font-medium text-[10px]">Aligned Frameworks</span>
                    </div>
                    <div>
                      <span className="block text-white font-black text-lg">EY VIP</span>
                      <span className="text-slate-400 font-medium text-[10px]">Annual Financial Auditing</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE: PREMIUM DONATION TYPE SELECTOR & PRESETS */}
                <div id="donation-amount-selection" className="scroll-mt-24 lg:col-span-6 p-10 lg:p-14 bg-[#FAFAFA] flex flex-col justify-between">
                  <div className="space-y-8">
                    
                    {/* Header of Type selection */}
                    <div>
                      <p className="text-[10px] font-mono tracking-widest uppercase font-extrabold text-[#F4511E] mb-2">// STEP 1 OF 2</p>
                      <h3 className="font-sans font-black text-2xl text-[#111111] tracking-tight">Choose Your Altruistic Path</h3>
                      <p className="text-xs text-slate-500 font-medium mt-1 mb-6">Select your partnership scale and desired allocation size.</p>
                    </div>
                    
                    {/* TWO LARGE PREMIUM TAB SWITCHERS */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      
                      {/* Individual Tab */}
                      <button
                        type="button"
                        onClick={() => {
                          setDonationCategory("individual");
                          setSelectedPreset(null);
                          setCustomAmount("");
                        }}
                        className={`p-3.5 sm:p-5 rounded-xl border text-left cursor-pointer relative overflow-hidden transition-all duration-300 ${
                          donationCategory === "individual"
                            ? "bg-white border-[#F4511E] border-2 shadow-[0_12px_24px_rgba(244,81,30,0.12)] text-[#111111] scale-[1.02] ring-2 ring-[#F4511E]/10"
                            : "bg-white border-zinc-200/80 hover:border-[#F4511E]/40 hover:-translate-y-0.5 hover:shadow-md text-slate-600"
                        }`}
                      >
                        {donationCategory === "individual" && (
                          <div className="absolute top-0 right-0 w-6 h-6 bg-[#F4511E] rounded-bl-lg flex items-center justify-center text-white">
                            <Sparkles className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <span className="block font-mono font-extrabold text-[9px] text-slate-400 uppercase tracking-wider mb-1">SOVEREIGN</span>
                        <strong className="block text-xs sm:text-sm font-sans font-black leading-tight">Individual Donation</strong>
                      </button>

                      {/* Family Tab */}
                      <button
                        type="button"
                        onClick={() => {
                          setDonationCategory("family");
                          setSelectedPreset(null);
                          setCustomAmount("");
                        }}
                        className={`p-3.5 sm:p-5 rounded-xl border text-left cursor-pointer relative overflow-hidden transition-all duration-300 ${
                          donationCategory === "family"
                            ? "bg-[#1E2530] border-[#D97706] border-2 shadow-[0_12px_24px_rgba(217,119,6,0.15)] text-white scale-[1.02] ring-2 ring-amber-500/20"
                            : "bg-white border-zinc-200/80 hover:border-[#D97706]/40 hover:-translate-y-0.5 hover:shadow-md text-slate-600"
                        }`}
                      >
                        {donationCategory === "family" && (
                          <div className="absolute top-0 right-0 w-6 h-6 bg-[#D97706] rounded-bl-lg flex items-center justify-center text-white">
                            <Sparkles className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <span className={`block font-mono font-extrabold text-[9px] uppercase tracking-wider mb-1 transition-colors duration-300 ${donationCategory === "family" ? "text-amber-400" : "text-slate-400"}`}>COVENANT GROUP</span>
                        <strong className="block text-xs sm:text-sm font-sans font-black leading-tight">Family Donation</strong>
                      </button>

                    </div>

                    {/* PRESET CHIPS GRID DEPENDING ON CATEGORY */}
                    <div className="space-y-4">
                      <label className="block text-[10px] font-mono tracking-wider text-slate-400 font-bold uppercase">
                        Select Contribution Level
                      </label>
                      
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {(donationCategory === "individual" 
                          ? ["1000", "3000", "5000", "10000", "15000", "20000"]
                          : ["5000", "10000", "15000", "25000", "35000", "50000"]
                        ).map((amt, idx) => {
                          const isActive = selectedPreset === amt;
                          return (
                            <button
                              type="button"
                              key={idx}
                              onClick={() => {
                                setSelectedPreset(amt);
                                setCustomAmount(""); // Preset click does NOT affect the custom input field
                              }}
                              className={`py-3 rounded-xl border text-xs font-mono transition-all duration-500 cursor-pointer text-center ${
                                donationCategory === "individual"
                                  ? isActive
                                    ? "bg-[#F4511E] text-white border-[#F4511E] shadow-[0_12px_24px_rgba(244,81,30,0.3)] scale-[1.05] font-black"
                                    : "bg-white border-[#EAEAEA] text-[#111111] font-bold hover:border-[#F4511E]/45 hover:-translate-y-0.5 shadow-sm"
                                  : isActive
                                    ? "bg-gradient-to-br from-[#D97706] to-[#F59E0B] text-white border-[#D97706] shadow-[0_12px_24px_rgba(217,119,6,0.35)] scale-[1.05] font-black ring-2 ring-amber-500/25"
                                    : "bg-[#1E2530] border-slate-700/80 text-slate-200 font-bold hover:border-[#D97706]/60 hover:bg-[#252E3B] hover:-translate-y-0.5 shadow-md"
                              }`}
                            >
                              ${Number(amt).toLocaleString()}
                            </button>
                          );
                        })}
                      </div>

                      {/* LARGE FULL-WIDTH PREMIUM INPUT FIELD */}
                      <div className="relative pt-2">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-mono font-black text-lg pointer-events-none">$</span>
                        <input
                          type="number"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          placeholder="Input Amount"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setSelectedPreset(null); // Clear active preset card style
                          }}
                          className="w-full h-16 bg-white border-2 border-[#EAEAEA] focus:border-[#F4511E] focus:ring-4 focus:ring-[#F4511E]/10 text-[#111111] rounded-2xl pl-10 pr-5 text-base font-mono outline-none font-black shadow-sm placeholder-slate-400 transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* NEW "DONATION AMOUNT" DISPLAY SECTION */}
                    <div className="mt-8 pt-6 border-t border-[#EAEAEA] flex flex-col items-center justify-center text-center space-y-1">
                      <p className="text-xs uppercase font-mono tracking-widest font-extrabold text-slate-500">Donation Amount</p>
                      <div className="text-4xl sm:text-5xl font-sans font-black text-emerald-600 tracking-tight transition-all duration-300 hover:scale-105 select-none font-mono">
                        ${Number(customAmount || selectedPreset || 0).toLocaleString()}
                      </div>
                    </div>

                    {/* SELECT CAUSE ASSOCIATIVE INITIATIVE */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono tracking-wider text-slate-400 font-bold uppercase">
                        Select Campaign
                      </label>
                      <select 
                        value={selectedCampaignId}
                        onChange={(e) => setSelectedCampaignId(e.target.value)}
                        className="w-full bg-white text-[#111111] border border-[#EAEAEA] focus:border-[#F4511E] focus:ring-4 focus:ring-[#F4511E]/5 rounded-xl px-4 py-3 text-xs font-sans font-bold outline-none transition"
                      >
                        {PROGRAMS.map(c => (
                          <option key={c.id} value={c.id}>{c.title}</option>
                        ))}
                      </select>
                    </div>

                  </div>

                  <div className="pt-8">
                    <button
                      type="button"
                      disabled={isProceeding}
                      onClick={() => {
                        const currentVal = Number(customAmount || selectedPreset || 0);
                        if (currentVal <= 0) {
                          alert("Please specify a genuine generous donation volume.");
                          return;
                        }
                        setIsProceeding(true);
                        setDonateAmount(String(currentVal));
                        setTimeout(() => {
                          setDonationStep(2);
                          setIsProceeding(false);
                        }, 1200);
                      }}
                      className={`w-full font-sans font-bold text-xs tracking-widest uppercase py-4 rounded-xl shadow-lg transition-all duration-500 cursor-pointer flex items-center justify-center space-x-2 ${
                        isProceeding 
                          ? "bg-emerald-600 text-white shadow-[0_12px_24px_rgba(5,150,105,0.25)] scale-[1.01]" 
                          : "bg-[#F4511E] hover:bg-[#D84315] text-white hover:-translate-y-0.5"
                      }`}
                    >
                      {isProceeding ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>PROCEEDING SECURELY...</span>
                        </>
                      ) : (
                        <span>Proceed to Payment Details ➔</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`grid grid-cols-1 ${isDonationFocusMode ? "" : "lg:grid-cols-12"} min-h-[600px] animate-fade-in`}>
                
                {/* LEFT COLUMN: DONATION SUMMARY & VERBIAGE */}
                {!isDonationFocusMode && (
                  <div className="lg:col-span-4 bg-[#111111] text-white p-10 lg:p-12 flex flex-col justify-between border-r border-slate-800">
                    <div className="space-y-8">
                      <span className="text-[#F4511E] font-mono text-xs uppercase tracking-widest font-black">// TRANSACTION COMPREHENSIVE</span>
                      
                      <div className="space-y-4">
                        <h3 className="font-sans font-black text-2xl tracking-tight text-white">Your Pledge Shield</h3>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed">
                          You are about to initiate or pledge support to change vulnerable lives. Your transaction is audited annually under EY guidelines.
                        </p>
                      </div>

                      {/* Selected Summary Card */}
                      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-4">
                        <span className="block text-[9px] font-mono tracking-widest uppercase text-[#F4511E] font-bold">Selected allocation parameters</span>
                        
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-slate-400 font-medium">Agreement Scope:</span>
                            <span className="font-extrabold text-white capitalize">{donationCategory} Portfolio</span>
                          </div>
                          <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-slate-400 font-medium">Initiative Target:</span>
                            <span className="font-extrabold text-white max-w-[150px] text-right truncate">
                              {PROGRAMS.find(p => p.id === selectedCampaignId)?.title || "General Operations"}
                            </span>
                          </div>
                          <div className="flex justify-between pt-1">
                            <span className="text-slate-400 font-medium">Pledge Volume:</span>
                            <span className="font-black text-rose-500 text-sm font-mono">${Number(donateAmount).toLocaleString()} USD</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-xs text-slate-300">
                          <Shield className="w-5 h-5 text-emerald-500" />
                          <span>Sovereign-grade Encryption Secure</span>
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-slate-300">
                          <Lock className="w-5 h-5 text-rose-500" />
                          <span>Anti-Fraud Compliance Clear</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 text-[11px] text-slate-400">
                      <button 
                        type="button" 
                        onClick={() => setDonationStep(1)} 
                        className="text-[#F4511E] hover:underline font-bold cursor-pointer"
                      >
                        ← Return to Step 1 & Modify Volume
                      </button>
                    </div>
                  </div>
                )}

                {/* RIGHT COLUMN: DONOR DETAILS FORM & PAYMENT METHOD SPECIFICATION */}
                <div className={`${isDonationFocusMode ? 'p-8 lg:p-12' : 'lg:col-span-8 p-10 lg:p-14'} bg-white`}>
                  <form onSubmit={handleDonateSubmit} className="space-y-8">
                    
                    {/* Step info */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-mono tracking-widest uppercase font-extrabold text-[#F4511E] mb-2">// STEP 2 OF 2</p>
                      <h3 className="font-sans font-black text-2xl text-[#111111] tracking-tight">Identity & Securing Allocation</h3>
                      <p className="text-xs text-slate-500 font-medium">Please provide your details to continue</p>
                    </div>

                    {/* INPUT FORM FIELDS */}
                    <div className="space-y-6">
                      
                      {/* Name & Email Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5 animate-fade-in">
                          <label className="block text-xs text-slate-700 font-black uppercase tracking-wider font-sans">Full Name</label>
                          <input 
                            type="text" 
                            required 
                            value={payerName}
                            onChange={(e) => setPayerName(e.target.value)}
                            placeholder="Sarah Jenkins" 
                            className="w-full bg-white border border-[#EAEAEA] text-[#111111] focus:border-[#F4511E] focus:ring-4 focus:ring-[#F4511E]/5 rounded-xl px-4 py-3.5 text-base md:text-xs outline-none font-bold placeholder-slate-400 shadow-sm"
                          />
                        </div>

                        <div className="space-y-1.5 animate-fade-in">
                          <label className="block text-xs text-slate-700 font-black uppercase tracking-wider font-sans">Email</label>
                          <input 
                            type="email" 
                            required 
                            value={payerEmail}
                            onChange={(e) => {
                              setPayerEmail(e.target.value);
                              setEmailValidationTouched(true);
                            }}
                            placeholder="sarah.jenkins@privatewealth.com" 
                            className={`w-full bg-white border text-[#111111] focus:ring-4 rounded-xl px-4 py-3.5 text-base md:text-xs outline-none font-bold placeholder-slate-400 transition-all duration-300 shadow-sm ${
                              emailValidationTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payerEmail)
                                ? "border-rose-500 focus:border-rose-600 focus:ring-rose-500/5 bg-rose-50/10"
                                : "border-[#EAEAEA] focus:border-[#F4511E] focus:ring-[#F4511E]/5"
                            }`}
                          />
                          {emailValidationTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payerEmail) && (
                            <p className="text-[10px] text-rose-500 font-bold tracking-tight animate-fade-in flex items-center space-x-1">
                              <span>⚠️ Please enter a valid email address (e.g. name@domain.com)</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Phone Number Selector Redesign */}
                      <div className="space-y-1.5 animate-fade-in">
                        <label className="block text-xs text-slate-700 font-black uppercase tracking-wider font-sans">Phone Number</label>
                        
                        <div className="relative flex items-stretch space-x-2">
                          
                          {/* Left side: dropdown button */}
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                              className="h-full flex items-center justify-between space-x-2 px-4 border border-[#EAEAEA] hover:border-[#F4511E] rounded-xl bg-white text-xs font-bold transition-all focus:outline-none min-w-[100px] cursor-pointer"
                            >
                              <span className="text-base leading-none">{selectedCountryObj.flag}</span>
                              <span className="text-slate-800 font-mono font-bold">{selectedCountryObj.code}</span>
                              <span className="text-slate-400 text-[10px] scale-90">▼</span>
                            </button>

                            {/* Dropdown Overlay with Search */}
                            {isCountryDropdownOpen && (
                              <div className="absolute left-0 mt-2 w-72 bg-white border border-[#EAEAEA] rounded-2xl shadow-xl z-50 overflow-hidden font-sans animate-fade-in">
                                <div className="p-3 border-b border-[#F4F4F4] bg-[#FAFAFA]">
                                  <input
                                    type="text"
                                    placeholder="Search global country code..."
                                    value={countrySearchQuery}
                                    onChange={(e) => setCountrySearchQuery(e.target.value)}
                                    className="w-full bg-white border border-[#EAEAEA] rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#F4511E] font-medium"
                                  />
                                </div>
                                <div className="max-h-60 overflow-y-auto divide-y divide-[#F9F9F9]">
                                  {COUNTRIES_LIST.filter(c => 
                                    c.name.toLowerCase().includes(countrySearchQuery.toLowerCase()) || 
                                    c.code.includes(countrySearchQuery) ||
                                    c.iso2.toLowerCase().includes(countrySearchQuery.toLowerCase())
                                  ).map((country) => (
                                    <button
                                      type="button"
                                      key={country.name + country.code}
                                      onClick={() => {
                                        setSelectedCountryObj(country);
                                        setPayerPhone(""); // Clear number to enforce fresh length
                                        setCountrySearchQuery("");
                                        setIsCountryDropdownOpen(false);
                                      }}
                                      className="w-full flex items-center space-x-3 px-4 py-2.5 text-left text-xs text-[#111111] hover:bg-slate-50 transition font-medium cursor-pointer"
                                    >
                                      <span className="text-base">{country.flag}</span>
                                      <span className="font-mono font-bold w-12 text-slate-500">{country.code}</span>
                                      <span className="truncate text-slate-800 font-bold">{country.name}</span>
                                      <span className="text-[10px] font-mono text-slate-400 ml-auto font-medium">({country.length} d)</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Right side: Number Input */}
                          <div className="relative flex-grow">
                            <input
                              type="tel"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              required
                              value={payerPhone}
                              onChange={(e) => {
                                const digits = e.target.value.replace(/\D/g, "");
                                const limit = selectedCountryObj.length;
                                setPayerPhone(limit ? digits.slice(0, limit) : digits);
                                setPhoneValidationTouched(true);
                              }}
                              placeholder="Enter your number"
                              className={`w-full bg-white border text-[#111111] focus:ring-4 rounded-xl px-4 py-3.5 text-base md:text-xs outline-none font-mono font-bold placeholder-slate-400 transition-all duration-300 shadow-sm ${
                                phoneValidationTouched && payerPhone.length !== selectedCountryObj.length
                                  ? "border-rose-500 focus:border-rose-600 focus:ring-rose-500/5 bg-rose-50/10"
                                  : "border-[#EAEAEA] focus:border-[#F4511E] focus:ring-[#F4511E]/5"
                              }`}
                            />
                          </div>
                        </div>

                        {phoneValidationTouched && payerPhone.length !== selectedCountryObj.length && (
                          <p className="text-[10px] text-rose-500 font-bold tracking-tight animate-fade-in">
                            ⚠️ Incomplete: {selectedCountryObj.name} numbers require exactly {selectedCountryObj.length} digits after country code.
                          </p>
                        )}
                      </div>

                      {/* TWO PREMIUM GLASSMORPHIC TEXT AREAS */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                        
                        {/* Area 1: Prayer */}
                        <div className="space-y-1.5 animate-fade-in">
                          <label className="block text-xs text-slate-700 font-black uppercase tracking-wider font-sans">
                            Prayer for the Foundation
                          </label>
                          <textarea 
                            rows={3}
                            value={payerPrayer}
                            onChange={(e) => setPayerPrayer(e.target.value)}
                            placeholder="A short pray for the Foundation" 
                            className="w-full bg-white/70 backdrop-blur-md border border-[#EAEAEA] text-[#111111] focus:border-[#F4511E] focus:ring-4 focus:ring-[#F4511E]/5 rounded-xl px-4 py-3.5 text-base md:text-xs outline-none font-medium placeholder-slate-400 shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition duration-300"
                          />
                        </div>

                        {/* Area 2: Wishes */}
                        <div className="space-y-1.5 animate-fade-in">
                          <label className="block text-xs text-slate-700 font-black uppercase tracking-wider font-sans">
                            My Prayer Request
                          </label>
                          <textarea 
                            rows={3}
                            value={payerWishes}
                            onChange={(e) => setPayerWishes(e.target.value)}
                            placeholder="What is your heart desire?" 
                            className="w-full bg-white/70 backdrop-blur-md border border-[#EAEAEA] text-[#111111] focus:border-[#F4511E] focus:ring-4 focus:ring-[#F4511E]/5 rounded-xl px-4 py-3.5 text-base md:text-xs outline-none font-medium placeholder-slate-400 shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition duration-300"
                          />
                        </div>
                      </div>

                    </div>

                    {/* SINGLE PREMIUM 3D SUBMISSION CTA */}
                    <div className="pt-6 border-t border-[#EAEAEA]">
                      <button 
                        type="submit" 
                        className="group relative w-full inline-flex items-center justify-center font-sans font-black tracking-widest uppercase rounded-full text-white overflow-visible transition-all duration-300 active:scale-[0.98] cursor-pointer"
                        style={{
                          transform: "translateY(0px)",
                          zIndex: 1,
                        }}
                      >
                        {/* Real 3D Underlay Base */}
                        <span 
                          className={`absolute inset-x-0 rounded-full transition-all duration-300 pointer-events-none ${isDonationPressed ? 'bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800' : 'bg-gradient-to-r from-[#B71C1C] via-[#C62828] to-[#9E0D00]'}`}
                          style={{
                            bottom: "-3px",
                            top: "3px",
                            zIndex: -2,
                          }}
                        />

                        {/* Glossy Front Surface (Luxury Orange-Red Gradient, transitions to brand green when pressed) */}
                        <span className={`w-full text-center hover:brightness-[1.04] rounded-full py-4 text-xs font-black tracking-wider transition-all duration-300 flex items-center justify-center space-x-2.5 ${isDonationPressed ? 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 shadow-[0_5px_18px_rgba(16,185,129,0.35)] scale-[0.97]' : 'bg-gradient-to-r from-[#FF6B4A] via-[#F4511E] to-[#D84315] shadow-[0_5px_18px_rgba(244,81,30,0.35)]'}`}>
                          <Heart className="w-4 h-4 text-white fill-white filter drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] animate-pulse" />
                          <span>Request Payment Details ➔</span>
                        </span>

                        {/* Floating Ambient Backlight Glow */}
                        <span className={`absolute inset-0 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300 pointer-events-none blur-md -z-10 ${isDonationPressed ? 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 shadow-[0_0_28px_rgba(16,185,129,0.85)]' : 'bg-gradient-to-r from-[#FF6B4A] via-[#F4511E] to-[#D84315] shadow-[0_0_28px_rgba(244,81,30,0.85)]'}`} />
                      </button>
                    </div>

                  </form>
                </div>

              </div>
            )}

          </div>
        </div>



      </div>
    )}


      {/* 5. STATE-BACKED COMMENTARY PAGE */}
      {activePage === "commentary" && (
        <div className="max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 font-sans">
          
          {/* Side parameters and stats */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-[#F4511E] font-mono text-xs uppercase tracking-widest font-black">// COOPERATIVE LIVE DIALOGUE</span>
            <h1 className="text-4xl font-extrabold text-[#111111] leading-tight">Reviews & Public Statements</h1>
            <p className="text-slate-500 text-xs font-medium leading-relaxed">
              Sustained dialogue built directly from field medical caravans, engineering drill units, local agricultural guilds, and direct student beneficiaries.
            </p>

            <div className="bg-[#111111] text-white p-6 rounded-3xl space-y-4 border-l-4 border-[#F4511E] shadow-sm">
              <span className="text-xs uppercase font-mono font-bold block text-[#F4511E]">Active Tele-Metric Index</span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-white/5 pb-1.5 font-mono">
                  <span className="text-slate-400">Compiled Comments:</span>
                  <span className="font-bold text-white">{allComments.length} Records</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5 font-mono">
                  <span className="text-slate-400">Donor Testimonials:</span>
                  <span className="font-bold text-white">{allComments.filter(c => c.role === "Donor").length} Items</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5 font-mono">
                  <span className="text-slate-400">Direct Beneficiary:</span>
                  <span className="font-bold text-white">{allComments.filter(c => c.role === "Beneficiary").length} Items</span>
                </div>
              </div>
            </div>

            {/* Quick Comment submission form */}
            <form onSubmit={handleAddComment} className="bg-white p-6 rounded-3xl border border-[#EAEAEA] space-y-4 shadow-xl">
              <h4 className="font-sans font-extrabold text-[#111111] text-sm uppercase tracking-tight">Add Your Statement of Solidarity</h4>
              
              <div>
                <label className="block text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider font-mono">FullName</label>
                <input 
                  type="text" 
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  placeholder="William H. Harrison" 
                  className="w-full bg-white border border-[#EAEAEA] focus:border-[#F4511E] text-[#111111] px-3 py-2 rounded-xl text-xs outline-none font-bold" 
                  required 
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider font-mono">Your Action Role</label>
                <select 
                  value={newCommentRole}
                  onChange={(e) => setNewCommentRole(e.target.value as any)}
                  className="w-full bg-white border border-[#EAEAEA] focus:border-[#F4511E] text-[#111111] px-3 py-2 rounded-xl text-xs outline-none font-bold"
                >
                  <option value="Donor">Donor Supporter</option>
                  <option value="Volunteer">Field Volunteer Coordinator</option>
                  <option value="Beneficiary">Certified Beneficiary</option>
                  <option value="Supporter">Humanitarian Advocate</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider font-mono">Country Location</label>
                <input 
                  type="text" 
                  value={newCommentCountry}
                  onChange={(e) => setNewCommentCountry(e.target.value)}
                  placeholder="United Kingdom" 
                  className="w-full bg-white border border-[#EAEAEA] focus:border-[#F4511E] text-[#111111] px-3 py-2 rounded-xl text-xs outline-none font-bold" 
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-mono font-bold mb-1 uppercase tracking-wider">Statement Rating (Stars)</label>
                <select 
                  value={newCommentRating}
                  onChange={(e) => setNewCommentRating(Number(e.target.value))}
                  className="w-full bg-white border border-[#EAEAEA] focus:border-[#F4511E] text-[#F4511E] px-3 py-2 rounded-xl text-xs font-mono font-bold outline-none"
                >
                  <option value={5}>★★★★★ (5 Stars)</option>
                  <option value={4}>★★★★ (4 Stars)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider font-mono">Comments Text Block</label>
                <textarea 
                  rows={3}
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Share details of your coordination/support..." 
                  className="w-full bg-white border border-[#EAEAEA] focus:border-[#F4511E] text-[#111111] px-3 py-2 rounded-xl text-xs outline-none" 
                  required
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#F4511E] hover:bg-[#D84315] text-white font-bold text-xs uppercase tracking-widest py-3 rounded-xl transition duration-300 cursor-pointer"
              >
                Transmit Public Record
              </button>
            </form>
          </div>

          {/* Main commentary Feed, Sorts, Infinite Lists */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Search/Filter Controls Bar */}
            <div className="bg-white border border-[#EAEAEA] p-5 rounded-3xl shadow-md flex flex-wrap gap-4 items-center justify-between">
              <div className="relative flex-1 min-w-[200px]">
                <input 
                  type="text" 
                  placeholder="Search statements e.g., 'waterborne', 'caravan', 'doctor'..." 
                  value={commentSearch}
                  onChange={(e) => { setCommentSearch(e.target.value); setCommentPage(1); }}
                  className="w-full px-3 py-2.5 pl-9 bg-white border border-[#EAEAEA] focus:border-[#F4511E] text-[#111111] text-xs rounded-xl outline-none"
                />
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <select 
                  value={commentRoleFilter}
                  onChange={(e) => { setCommentRoleFilter(e.target.value); setCommentPage(1); }}
                  className="bg-white border border-[#EAEAEA] text-[#111111] px-3 py-2.5 rounded-xl outline-none"
                >
                  <option value="All">All Roles</option>
                  <option value="Donor">Donors</option>
                  <option value="Volunteer">Volunteers</option>
                  <option value="Beneficiary">Beneficiaries</option>
                  <option value="Supporter">Supporters</option>
                </select>

                <select 
                  value={commentSort}
                  onChange={(e) => { setCommentSort(e.target.value as any); setCommentPage(1); }}
                  className="bg-white border border-[#EAEAEA] text-[#111111] px-3 py-2.5 rounded-xl outline-none"
                >
                  <option value="highest">Most Liked First</option>
                  <option value="latest">Latest Date First</option>
                </select>
              </div>
            </div>

            <p className="text-[10px] uppercase font-mono text-[#F4511E] font-bold tracking-widest">
              Found {filteredComments.length} active statements
            </p>

            {/* Simulated scroll list of compiled responses */}
            <div className="space-y-4">
              {paginatedComments.length === 0 ? (
                <div className="text-center py-12 bg-white border border-[#EAEAEA] rounded-3xl text-xs text-slate-400 font-medium">
                  No matches found for active filters. Try refining your keyword search.
                </div>
              ) : (
                paginatedComments.map((comment) => (
                  <div key={comment.id} className="bg-white border border-[#EAEAEA] p-6 rounded-3xl shadow-sm space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={comment.avatarUrl} alt={comment.name} className="w-10 h-10 rounded-full border-2 border-[#F4511E]" />
                        <div>
                          <span className="font-sans font-extrabold text-[#111111] text-sm block leading-none">{comment.name}</span>
                          <span className="text-[10px] text-[#F4511E] font-mono uppercase tracking-widest font-extrabold">{comment.role} • {comment.country}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono font-bold">{comment.date}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                      {comment.text}
                    </p>

                    <div className="flex items-center justify-between border-t border-[#EAEAEA] pt-3">
                      <div className="flex items-center space-x-1.5">
                        {[...Array(comment.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current text-[#F4511E]" />
                        ))}
                      </div>

                      <div className="flex space-x-4 text-[10px]">
                        <button 
                          onClick={() => handleLikeComment(comment.id)} 
                          className="flex items-center space-x-1 hover:text-[#F4511E] transition-colors text-slate-400 cursor-pointer font-bold"
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${comment.likedByUser ? "fill-current text-[#F4511E]" : ""}`} />
                          <span>Solidarity ({comment.likes})</span>
                        </button>
                      </div>
                    </div>

                    {/* Inline Official Foundation Reply */}
                    {comment.replies.map((rep, idx) => (
                      <div key={idx} className="bg-[#FAFAFA] p-4 rounded-2xl ml-8 border-l-4 border-[#F4511E] flex items-start space-x-3">
                        <img src={rep.avatarUrl} alt={rep.name} className="w-8 h-8 rounded-full border border-[#F4511E]" />
                        <div className="text-[11px]">
                          <span className="font-extrabold text-[#111111] block">{rep.name}</span>
                          <span className="text-[9px] uppercase font-mono tracking-widest text-[#F4511E] block mb-1 font-bold">Official Response</span>
                          <p className="text-slate-500 font-medium">{rep.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>

            {/* Load More Pagination */}
            {filteredComments.length > paginatedComments.length && (
              <div className="text-center pt-4">
                <button 
                  onClick={() => setCommentPage(prev => prev + 1)}
                  className="bg-white text-[#F4511E] hover:bg-[#F4511E] hover:text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full border border-[#F4511E] transition duration-300 cursor-pointer"
                >
                  Load More Dialogues
                </button>
              </div>
            )}
          </div>
        </div>
      )}


      {/* 6. OTHER SUPPORTED PAGES GENERAL PRESET LAYOUT */}
      {activePage !== "home" && activePage !== "about" && activePage !== "mission" && activePage !== "leadership" && activePage !== "testimonials" && activePage !== "campaigns" && activePage !== "emergency-relief" && activePage !== "scholarships" && activePage !== "water-projects" && activePage !== "donate" && activePage !== "commentary" && 
       activePage !== "hiv-support" && activePage !== "halfway-house" && activePage !== "vulnerable-foreigners" && activePage !== "seminar-request" && activePage !== "health-ambassadors" && activePage !== "children-home" && activePage !== "shelter-placement" && activePage !== "medical-care" && activePage !== "mother-child" && activePage !== "visit-care" && activePage !== "careers" && activePage !== "contact" && activePage !== "faq" && activePage !== "live-donation-portal" && (
        <div className="max-w-4xl mx-auto px-4 py-24 space-y-10 font-sans">
          <div className="text-center space-y-3">
            {activePage !== "2026-budget-gallery" && activePage !== "gallery" && (
              <span className="text-[#F4511E] bg-[#F4511E]/10 border border-[#F4511E]/20 text-[9px] px-3.5 py-1.5 uppercase font-mono rounded-full font-black">FAZZA VERIFIED SYSTEM PATH</span>
            )}
            <h1 className="text-4xl font-extrabold text-[#111111] uppercase tracking-tight">
              {activePage === "gallery" ? "Infrastructure Gallery" : activePage.replace("-", " ")}
            </h1>
            <p className="text-slate-500 text-xs font-semibold">
              {activePage === "gallery" 
                ? "Prince Fazza Charity Foundation propose infrastructures, parameters, and active field statistics." 
                : "Official documentation, application parameters, and active field statistics."}
            </p>
          </div>

          {/* 2026 BUDGET GALLERY DOCUMENTATION SECTION */}
          {activePage === "2026-budget-gallery" && (
            <div className="space-y-6 flex flex-col items-center">
              <div className="bg-white border border-[#EAEAEA] rounded-3xl p-5 md:p-6 shadow-xl w-full max-w-xl">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div 
                    className="relative group overflow-hidden rounded-2xl border border-[#F1F5F9] transition hover:shadow-md hover:-translate-y-0.5 cursor-pointer bg-slate-50 aspect-[800/1100] flex items-center justify-center p-2"
                    onClick={() => {
                      setActiveBudgetImg("https://i.imgur.com/36a0EJh.png");
                      setBudgetZoom(1);
                      setBudgetPan({ x: 0, y: 0 });
                    }}
                  >
                    <img 
                      src="https://i.imgur.com/36a0EJh.png" 
                      alt="Budget Page 1" 
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain select-none transition group-hover:scale-[1.01]" 
                    />
                    <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <span className="bg-white/95 text-[10px] uppercase font-bold text-slate-800 tracking-wider px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm border border-slate-100">
                        Zoom Page 1
                      </span>
                    </div>
                  </div>

                  <div 
                    className="relative group overflow-hidden rounded-2xl border border-[#F1F5F9] transition hover:shadow-md hover:-translate-y-0.5 cursor-pointer bg-slate-50 aspect-[800/1100] flex items-center justify-center p-2"
                    onClick={() => {
                      setActiveBudgetImg("https://i.imgur.com/FW645co.png");
                      setBudgetZoom(1);
                      setBudgetPan({ x: 0, y: 0 });
                    }}
                  >
                    <img 
                      src="https://i.imgur.com/FW645co.png" 
                      alt="Budget Page 2" 
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain select-none transition group-hover:scale-[1.01]" 
                    />
                    <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <span className="bg-white/95 text-[10px] uppercase font-bold text-slate-800 tracking-wider px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm border border-slate-100">
                        Zoom Page 2
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Budget and Live Portal Buttons Side-By-Side */}
              <div className="flex flex-row gap-3 justify-center items-center w-full max-w-full px-2">
                <button
                  type="button"
                  onClick={handleDownloadBudget}
                  disabled={isDownloadingPdf}
                  className="bg-[#F4511E] hover:bg-[#F3450F] text-white font-extrabold text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest px-4 sm:px-8 py-3.5 rounded-full shadow-md transition-all duration-300 transform active:scale-95 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 flex-1 sm:flex-initial"
                >
                  <Download className="w-4 h-4 text-white shrink-0" />
                  <span className="truncate">{isDownloadingPdf ? "Compiling..." : "Download Budget"}</span>
                </button>

                <motion.button
                  type="button"
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(16, 185, 129, 0)",
                      "0 0 16px rgba(16, 185, 129, 0.4)",
                      "0 0 0 rgba(16, 185, 129, 0)"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "easeInOut"
                  }}
                  onClick={() => {
                    handlePageChange("live-donation-portal");
                  }}
                  className="bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-extrabold text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest px-4 sm:px-8 py-3.5 rounded-full shadow-md transition-all duration-300 transform active:scale-95 flex items-center justify-center space-x-2 cursor-pointer flex-1 sm:flex-initial"
                >
                  <Activity className="w-4 h-4 text-slate-950 shrink-0 animate-pulse" />
                  <span className="truncate">See Live Portal</span>
                  <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75 animate-duration-1000"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-slate-950"></span>
                  </span>
                </motion.button>
              </div>
            </div>
          )}

          {/* DYNAMIC FORMS ACCORDING TO PAGES REQUESTS */}
          {activePage === "volunteer" && (
            <div className="bg-white border border-[#EAEAEA] p-8 rounded-3xl shadow-xl space-y-6">
              <h3 className="font-sans font-extrabold text-[#111111] text-xl">Submit Volunteer Credentials</h3>
              {volunteerRegistered ? (
                <div className="text-center py-6 text-emerald-500">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                  <p className="font-bold">Volunteer Application Transmitted Successfully!</p>
                  <p className="text-xs text-slate-400 mt-1">Our HR Logistics crew will connect over your coordinates inside 7 business days.</p>
                </div>
              ) : (
                <form 
                  onSubmit={async (e) => { 
                    e.preventDefault(); 
                    if (volunteerPhone.length !== selectedVolunteerCountryObj.length) {
                      setVolunteerPhoneValidationTouched(true);
                      return;
                    }
                    try {
                      const dbPath = "volunteers";
                      await addDoc(collection(db, dbPath), {
                        fullName: volunteerName,
                        email: volunteerEmail,
                        phoneNumber: `${selectedVolunteerCountryObj.code} ${volunteerPhone.trim()}`,
                        submittedInfo: `Skill Cluster: ${volunteerSkill}, Committed Schedule: ${volunteerHours}`,
                        timestamp: new Date().toISOString()
                      });
                    } catch (error) {
                      console.error("Firestore Volunteer error:", error);
                    }
                    setVolunteerRegistered(true); 
                  }} 
                  className="space-y-4 text-xs font-sans"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-500 block mb-1 font-bold">Full Identity Name</label>
                      <input type="text" required value={volunteerName} onChange={(e) => setVolunteerName(e.target.value)} className="w-full bg-white border border-[#EAEAEA] focus:border-[#F4511E] text-[#111111] font-bold rounded-xl py-2.5 px-4 outline-none transition placeholder-slate-400" placeholder="Noura Al Kaabi" />
                    </div>
                    <div>
                      <label className="text-slate-500 block mb-1 font-bold">Target Skill Bracket</label>
                      <select value={volunteerSkill} onChange={(e) => setVolunteerSkill(e.target.value)} className="w-full bg-white border border-[#EAEAEA] focus:border-[#F4511E] text-[#111111] font-bold rounded-xl py-2.5 px-4 outline-none">
                        <option>Medical Triage</option>
                        <option>Logistics Truck Driver</option>
                        <option>Language Translator</option>
                        <option>Social Teacher Representative</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-500 block mb-1 font-bold">Email Address</label>
                      <input type="email" required value={volunteerEmail} onChange={(e) => setVolunteerEmail(e.target.value)} className="w-full bg-white border border-[#EAEAEA] focus:border-[#F4511E] text-[#111111] font-bold rounded-xl py-2.5 px-4 outline-none transition placeholder-slate-400" placeholder="noura@charity.com" />
                    </div>
                    <div>
                      <label className="text-slate-500 block mb-1 font-bold">Phone Number</label>
                      <div className="relative flex items-stretch space-x-2">
                        {/* Selector Dropdown */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setIsVolunteerCountryDropdownOpen(!isVolunteerCountryDropdownOpen)}
                            className="h-full flex items-center justify-between space-x-2 px-3 border border-[#EAEAEA] hover:border-[#F4511E] rounded-xl bg-white text-[11px] font-bold transition-all focus:outline-none min-w-[95px] cursor-pointer"
                          >
                            <span className="text-sm leading-none">{selectedVolunteerCountryObj.flag}</span>
                            <span className="text-slate-800 font-mono font-bold">{selectedVolunteerCountryObj.code}</span>
                            <span className="text-slate-400 text-[9px] scale-90">▼</span>
                          </button>

                          {isVolunteerCountryDropdownOpen && (
                            <div className="absolute right-0 lg:left-0 mt-2 w-72 bg-white border border-[#EAEAEA] rounded-2xl shadow-xl z-50 overflow-hidden font-sans animate-fade-in shadow-2xl">
                              <div className="p-3 border-b border-[#F4F4F4] bg-[#FAFAFA]">
                                <input
                                  type="text"
                                  placeholder="Search global country code..."
                                  value={volunteerCountrySearchQuery}
                                  onChange={(e) => setVolunteerCountrySearchQuery(e.target.value)}
                                  className="w-full bg-white border border-[#EAEAEA] rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#F4511E] font-medium"
                                />
                              </div>
                              <div className="max-h-60 overflow-y-auto divide-y divide-[#F9F9F9]">
                                {COUNTRIES_LIST.filter(c => 
                                  c.name.toLowerCase().includes(volunteerCountrySearchQuery.toLowerCase()) || 
                                  c.code.includes(volunteerCountrySearchQuery) ||
                                  c.iso2.toLowerCase().includes(volunteerCountrySearchQuery.toLowerCase())
                                ).map((country) => (
                                  <button
                                    type="button"
                                    key={country.name + country.code}
                                    onClick={() => {
                                      setSelectedVolunteerCountryObj(country);
                                      setVolunteerPhone(""); // Clear number to enforce fresh length
                                      setVolunteerCountrySearchQuery("");
                                      setIsVolunteerCountryDropdownOpen(false);
                                    }}
                                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-left text-xs text-[#111111] hover:bg-slate-50 transition font-medium cursor-pointer"
                                  >
                                    <span className="text-base">{country.flag}</span>
                                    <span className="font-mono font-bold w-12 text-slate-500">{country.code}</span>
                                    <span className="truncate text-slate-800 font-bold">{country.name}</span>
                                    <span className="text-[10px] font-mono text-slate-400 ml-auto font-medium">({country.length} d)</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Input digits */}
                        <div className="relative flex-grow">
                          <input
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            required
                            value={volunteerPhone}
                            onChange={(e) => {
                              const digits = e.target.value.replace(/\D/g, "");
                              const limit = selectedVolunteerCountryObj.length;
                              setVolunteerPhone(limit ? digits.slice(0, limit) : digits);
                              setVolunteerPhoneValidationTouched(true);
                            }}
                            placeholder="Enter contact number"
                            className={`w-full bg-white border text-[#111111] focus:ring-4 rounded-xl px-4 py-2.5 text-xs outline-none font-mono font-bold placeholder-slate-400 transition-all duration-300 shadow-sm ${
                              volunteerPhoneValidationTouched && volunteerPhone.length !== selectedVolunteerCountryObj.length
                                ? "border-rose-500 focus:border-rose-600 focus:ring-rose-500/5 bg-rose-50/10"
                                : "border-[#EAEAEA] focus:border-[#F4511E] focus:ring-[#F4511E]/5"
                            }`}
                          />
                        </div>
                      </div>

                      {volunteerPhoneValidationTouched && volunteerPhone.length !== selectedVolunteerCountryObj.length && (
                        <p className="text-[10px] text-rose-500 font-bold tracking-tight animate-fade-in mt-1">
                          ⚠️ Incomplete: {selectedVolunteerCountryObj.name} numbers require exactly {selectedVolunteerCountryObj.length} digits after country code.
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1 font-bold">Time Commitment Schedule</label>
                    <input type="text" required value={volunteerHours} onChange={(e) => setVolunteerHours(e.target.value)} className="w-full bg-white border border-[#EAEAEA] focus:border-[#F4511E] text-[#111111] font-bold rounded-xl py-2.5 px-4 outline-none transition placeholder-slate-400" placeholder="2 weeks active caravan deployment" />
                  </div>
                  <button type="submit" className="w-full bg-[#F4511E] hover:bg-[#D84315] text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition duration-300 cursor-pointer">Submit Field Coordinates</button>
                </form>
              )}
            </div>
          )}

          {activePage === "partner" && (
            <div className="bg-white border border-[#EAEAEA] p-8 rounded-3xl shadow-xl space-y-6">
              <h3 className="font-sans font-extrabold text-[#111111] text-xl">Corporate Partner Guild</h3>
              {partnerSuccess ? (
                <p className="text-center py-6 text-emerald-500 font-bold">Cooperative Proposal Forwarded to President's Desk!</p>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setPartnerSuccess(true); }} className="space-y-4 text-xs font-sans">
                  <div>
                    <label className="text-slate-500 block mb-1 font-bold font-sans">Institution / Organization Name</label>
                    <input type="text" required value={partnerOrg} onChange={(e) => setPartnerOrg(e.target.value)} className="w-full bg-white border border-[#EAEAEA] focus:border-[#F4511E] text-[#111111] font-bold rounded-xl py-2.5 px-4 transition outline-none placeholder-slate-400" placeholder="The AstraZeneca Foundation" />
                  </div>
                  <button type="submit" className="w-full bg-[#F4511E] hover:bg-[#D84315] text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition duration-300 cursor-pointer">Execute Alliance Inquiry</button>
                </form>
              )}
            </div>
          )}

          {activePage === "careers" && (
            <div className="bg-white border border-[#EAEAEA] p-8 rounded-3xl shadow-xl space-y-6 text-xs font-sans">
              <h3 className="font-sans font-extrabold text-[#111111] text-xl">Active Human Resources Listings</h3>
              <div className="space-y-3">
                <div className="p-4 bg-[#FAFAFA] rounded-2xl flex justify-between items-center border border-[#EAEAEA]">
                  <div>
                    <span className="font-extrabold text-sm block text-[#111111]">Director of Field Logistics - Central Asia Caravan</span>
                    <span className="text-slate-400 font-semibold">Bishkek Headquarters Office • Full-time Contract</span>
                  </div>
                  <button onClick={() => { setCareerRole("Director of Field Logistics"); setCareerSubmitted(true); }} className="bg-[#F4511E] hover:bg-[#D84315] text-white px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer">Apply Now</button>
                </div>
                <div className="p-4 bg-[#FAFAFA] rounded-2xl flex justify-between items-center border border-[#EAEAEA]">
                  <div>
                    <span className="font-extrabold text-sm block text-[#111111]">Senior Specialist Ophthalmic Surgeon</span>
                    <span className="text-slate-400 font-semibold">Yemen Mobile Caravans • Multi-week Deployment Rotations</span>
                  </div>
                  <button onClick={() => { setCareerRole("Senior Ophthalmic Surgeon"); setCareerSubmitted(true); }} className="bg-[#F4511E] hover:bg-[#D84315] text-white px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer">Apply Now</button>
                </div>
              </div>
              {careerSubmitted && <p className="text-emerald-500 font-bold text-center">Your interest draft for: {careerRole} has been compiled.</p>}
            </div>
          )}

          {/* DYNAMIC INFORMATION RENDERERS */}
          {activePage === "stories" && (
            <div className="space-y-6 font-sans">
              {SUCCESS_STORIES.map(story => (
                <div key={story.id} className="bg-white border border-[#EAEAEA] rounded-3xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <img src={story.imageUrl} alt={story.title} className="rounded-2xl h-64 w-full object-cover shadow-sm hover:scale-[1.01] transition duration-300" />
                  <div className="space-y-3 text-xs">
                    <span className="text-[#F4511E] font-mono font-black uppercase tracking-widest">{story.impactMetrics}</span>
                    <h3 className="font-sans font-extrabold text-[#111111] text-lg leading-tight">{story.title}</h3>
                    <p className="font-sans font-extrabold text-slate-600">Beneficiary: {story.beneficiary} ({story.location})</p>
                    <p className="text-slate-400 font-medium">**Situation Before:** {story.storyBefore}</p>
                    <p className="text-slate-600 leading-relaxed font-semibold">**Outcome After:** {story.storyAfter}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activePage === "blog" && (
            <div className="space-y-8 font-sans">
              {BLOG_POSTS.map(post => (
                <div key={post.id} className="bg-white border border-[#EAEAEA] rounded-3xl overflow-hidden shadow-lg p-6 space-y-4">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-60 object-cover rounded-xl" />
                  <div className="text-xs space-y-2">
                    <div className="flex items-center space-x-2 text-slate-400 font-mono font-bold">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-sans font-extrabold text-[#111111] text-xl leading-tight">{post.title}</h3>
                    <p className="text-slate-500 font-bold">Author: {post.author} ({post.role})</p>
                    <p className="text-slate-600 leading-relaxed font-medium">{post.content}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {post.tags.map((t, i) => (
                        <span key={i} className="bg-white border border-[#EAEAEA] text-[#F4511E] rounded-full px-3 py-1 text-[10px] uppercase font-mono font-bold">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activePage === "events" && (
            <div className="space-y-6 font-sans">
              {EVENTS.map(ev => (
                <div key={ev.id} className="bg-white border border-[#EAEAEA] p-6 rounded-3xl shadow-md flex items-center space-x-6 text-xs">
                  <img src={ev.imageUrl} alt={ev.title} className="w-24 h-24 rounded-2xl object-cover" />
                  <div className="space-y-1">
                    <span className="text-[#F4511E] font-extrabold block">{ev.date} at {ev.time}</span>
                    <h3 className="font-sans font-extrabold text-sm text-[#111111]">{ev.title}</h3>
                    <p className="text-slate-400 font-bold"><MapPin className="w-3 h-3 inline mr-1" /> {ev.location}</p>
                    <p className="text-slate-500 font-medium">{ev.description}</p>
                    <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-mono inline-block mt-2 font-bold">Slots Available: {ev.slotsAvailable}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activePage === "gallery" && (
            <div className="space-y-6 font-sans">
              <div className="space-y-10 font-sans text-left">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
                  {generateGalleryItems().map((item, idx) => (
                    <div 
                      key={item.id}
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AUDITS & TRANSPARENCY PRESET FILE GRIDS */}
          {(activePage === "annual-reports" || activePage === "financial-transparency") && (
            <div className="bg-white border border-[#EAEAEA] rounded-3xl p-8 shadow-xl space-y-6 font-sans">
              <h3 className="font-sans font-extrabold text-[#111111] text-xl">Full Audit Statement Ledger (Internal Endowment Covered)</h3>
              <p className="text-xs text-slate-500 font-medium">We verify EY audits annually. 100% of community contributions go strictly to materials.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="#view" onClick={(e) => { e.preventDefault(); alert("Opening Secure PDF simulation: 'Fiscal 2025 Financial Statement - EY Verified'"); }} className="p-4 bg-[#FAFAFA] hover:bg-white rounded-2xl border border-[#EAEAEA] flex items-center justify-between text-xs text-slate-800 transition duration-300">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-[#F4511E]" />
                    <div>
                      <span className="font-bold block text-[#111111]">Annual Statement 2025</span>
                      <span className="text-slate-400 font-medium">Verifying 93.8% direct efficiency ratio</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#F4511E]" />
                </a>
                <a href="#view" onClick={(e) => { e.preventDefault(); alert("Opening PDF Simulator: 'Operations Report 2024'"); }} className="p-4 bg-[#FAFAFA] hover:bg-white rounded-2xl border border-[#EAEAEA] flex items-center justify-between text-xs text-slate-800 transition duration-300">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-[#F4511E]" />
                    <div>
                      <span className="font-bold block text-[#111111]">Field Operations Report 2024</span>
                      <span className="text-slate-400 font-medium">Geo-satellite coordinates of wells and mobile clinics</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#F4511E]" />
                </a>
              </div>
            </div>
          )}

          {/* FAQ INTERACTIVE PORTAL */}
          {activePage === "faq" && (
            <div className="space-y-12 font-sans">
              <div className="space-y-4">
                {FAQS.map((item, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx}
                      className="bg-white border border-[#EAEAEA] rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md hover:border-slate-300"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full text-left p-6 font-extrabold text-[#111111] text-sm md:text-base flex justify-between items-center bg-[#FAFAFA]/40 hover:bg-[#FAFAFA] transition-colors focus:outline-none"
                      >
                        <span>{item.question}</span>
                        <ChevronRight className={`w-5 h-5 text-[#F4511E] transition-transform duration-300 ${isOpen ? "rotate-90 text-[#D84315]" : ""}`} />
                      </button>
                      
                      {isOpen && (
                        <div className="p-6 pt-2 text-[#4A5568] text-xs md:text-sm leading-relaxed border-t border-slate-50 font-medium bg-white">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Direct Support Inquiries Cards (Humanitarian Desk) */}
              <div className="border-t border-[#EAEAEA] pt-12 space-y-8">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="text-[#F4511E] font-mono text-[10px] uppercase tracking-widest font-black block">Direct Support Inquiries</span>
                  <h2 className="text-2xl font-black text-[#111111] uppercase tracking-tight">Direct Liaison Desk</h2>
                  <p className="text-xs text-slate-500 font-medium font-sans">Inquire with the official administration desk and rapid humanitarian response desk.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* WhatsApp Support Card */}
                  <a 
                    href={`https://wa.me/12272664466?text=${encodeURIComponent("Hello Prince Fazza Charity Foundation, thank you for your humanitarian work and support for humanity. I would like to make an inquiry and learn more about your programs.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-[#EAEAEA] p-6 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500 group flex items-start space-x-4 text-left"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M12.031 2a9.967 9.967 0 0 0-9.969 9.969c0 1.944.556 3.766 1.516 5.313L2 22l4.897-1.288a9.907 9.907 0 0 0 5.134 1.419h.005a9.969 9.969 0 0 0 9.969-9.97c0-2.662-1.037-5.164-2.922-7.049A9.904 9.904 0 0 0 12.031 2zm5.82 14.24c-.24.675-1.18 1.242-1.635 1.282-.415.035-.95.045-1.525-.14a9.7 9.7 0 0 1-3.645-2.26 10.669 10.669 0 0 1-2.52-3.155A5.672 5.672 0 0 1 7.5 9.385c.015-1.115.59-1.69 1.06-2.15.175-.17.39-.215.535-.21h.39c.125 0 .285-.01.445.37.17.405.58 1.42.63 1.525.05.105.08.23.01.37s-.105.23-.21.35c-.105.125-.22.28-.315.375-.105.105-.215.22-.095.425a8.3 8.3 0 0 0 1.52 1.885c.67.6 1.23.99 1.84 1.295.2.1.375.05.515-.1.175-.185.76-.875.965-1.175.2-.3.41-.25.685-.15.275.1.1.84 1.76.92.155.03.31.06.46.06.395 0 .61-.19.705-.33.28-.415.42-.92.18-1.595z" />
                      </svg>
                    </div>
                    <div className="space-y-1 overflow-hidden">
                      <h4 className="font-extrabold text-[#111111] text-sm group-hover:text-emerald-600 transition-colors">Direct WhatsApp Hotline</h4>
                      <p className="text-slate-400 text-[11px] leading-relaxed font-medium">Chat directly on WhatsApp to get immediate answers, sponsorship clarifications, or coordinate emergency actions.</p>
                      <span className="text-xs text-[#111111] font-bold block mt-3 font-mono tracking-tight group-hover:text-emerald-500">+1 (227) 266-4466</span>
                    </div>
                  </a>

                  {/* Email Support Card */}
                  <a 
                    href="mailto:theroyalpalace6@gmail.com"
                    className="bg-white border border-[#EAEAEA] p-6 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F4511E] group flex items-start space-x-4 text-left"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#F4511E]/10 text-[#F4511E] flex items-center justify-center group-hover:bg-[#F4511E] group-hover:text-white transition-all duration-300 flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 overflow-hidden">
                      <h4 className="font-extrabold text-[#111111] text-sm group-hover:text-[#F4511E] transition-colors">Official Administrative Desk</h4>
                      <p className="text-slate-400 text-[11px] leading-relaxed font-medium">For formal proposals, institutional partnerships, sovereign grants, or detailed media inquiries, transmit to our desk.</p>
                      <span className="text-xs text-[#111111] font-bold block mt-3 font-mono tracking-tight group-hover:text-[#F4511E] break-all">theroyalpalace6@gmail.com</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* DEFAULT INNER PAGES GENERATOR FOR THE REMAINING 35 PAGES */}
          {activePage !== "faq" && activePage !== "gallery" && !isDonationFocusMode && (
            <div className={`bg-[#FAFAFA] border p-6 rounded-3xl text-xs space-y-3 text-slate-500 font-sans ${activePage === "2026-budget-gallery" ? "border-[#F4511E]" : "border-[#EAEAEA]"}`}>
              <p className="font-extrabold text-[#111111] uppercase font-sans tracking-wider text-[10px]">Fazza Compliance Statement</p>
              {activePage === "2026-budget-gallery" ? (
                <div className="space-y-3">
                  <p className="font-medium leading-relaxed text-slate-600">
                    The H.H. Prince Fazza Charity Foundation oversees and monitors all active programs to ensure accountability and effective implementation. Our work includes logistics assistance, educational scholarships, agricultural microgrants, and trauma support shelters, with initiatives guided by the objectives of the United Nations Sustainable Development Goals.
                  </p>
                  <p className="font-medium leading-relaxed text-slate-600">
                    Individuals or organizations requiring urgent assistance should contact our logistics coordination team through the designated contact channels.
                  </p>
                  <div className="pt-3 border-t border-slate-200/60 space-y-2 text-[11px]">
                    <div>
                      <span className="font-bold text-[#111111] block mb-0.5">Email:</span>
                      <a href="mailto:theroyalpalace6@gmail.com" className="text-[#F4511E] hover:underline font-bold font-mono">
                        theroyalpalace6@gmail.com
                      </a>
                    </div>
                    <div>
                      <span className="font-bold text-[#111111] block mb-0.5">WhatsApp Emergency Coordination:</span>
                      <a 
                        href={`https://wa.me/12272664466?text=${encodeURIComponent("Hello Prince Fazza Charity Foundation.\n\nI am contacting the logistics coordination team regarding an urgent humanitarian assistance inquiry.\n\nPlease provide guidance on the appropriate support process and next steps.\n\nThank you.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F4511E] hover:underline font-bold font-mono inline-block"
                      >
                        +1 (227) 266-4466
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="font-medium leading-relaxed">
                  All active areas are verified and compiled under the supervision of H.H Prince Fazza Charity Foundation. Continuous logistics, educational scholarships, agricultural microgrants, and trauma shelters are arranged in strict alignment with United Nations Sustainable Development Guidelines target matrices. For immediate emergency triage support, coordinate with our logistics base via the contact parameters.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* 7. DEDICATED SUB-PAGES COMPONENT */}
      {(activePage === "hiv-support" || activePage === "halfway-house" || activePage === "vulnerable-foreigners" || activePage === "seminar-request" || activePage === "health-ambassadors" || activePage === "children-home" || activePage === "shelter-placement" || activePage === "medical-care" || activePage === "mother-child" || activePage === "visit-care" || activePage === "careers" || activePage === "contact" || activePage === "faq") && (
        <div className="bg-white min-h-screen">
          <PageHeader page={activePage} lang={lang} />
          <ServicePages 
            activePage={activePage} 
            lang={lang} 
            openDonateModal={() => { handlePageChange("donate"); setDonationStep(1); }}
            setActivePage={handlePageChange}
          />
        </div>
      )}

      {/* 8. 2026 HUMANITARIAN BUDGET GALLERY PAGE */}
      {activePage === "2026-budget-gallery" && (
        <BudgetGallery2026 
          onNavigate={handlePageChange} 
          lang={lang} 
        />
      )}

      {/* 8.5. LIVE DONATION PORTAL PAGE */}
      {activePage === "live-donation-portal" && (
        <LiveDonationPortal 
          onNavigate={handlePageChange} 
          lang={lang} 
        />
      )}
        </motion.div>
      </AnimatePresence>


      {/* ========================================================
          GLOBAL TRUSTED FOOTER
          ======================================================== */}
      {!isDonationFocusMode && (
        <footer className="bg-slate-950 text-white/50 py-12 px-6 border-t border-white/5 text-xs font-sans">
          <div className="max-w-7xl mx-auto mb-10 pb-10 border-b border-white/5 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div>
            <span className="text-[#F4511E] font-mono text-[9px] uppercase tracking-widest font-black block mb-1">Direct Liaison Desk</span>
            <h3 className="text-lg font-sans font-black text-white uppercase tracking-tight">Direct Connection Channels</h3>
            <p className="text-zinc-500 text-xs mt-1 font-medium">Coordinate directly with our sovereign administration office and rapid humanitarian response crew.</p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email Card */}
            <a 
              href="mailto:theroyalpalace6@gmail.com"
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex items-center space-x-4 transition-all duration-300 hover:bg-white/[0.04] hover:border-zinc-700 group hover:scale-[1.01]"
            >
              <div className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center text-zinc-300 group-hover:bg-[#F4511E]/10 group-hover:text-[#F4511E] transition-colors flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[9px] text-zinc-500 font-mono font-black uppercase block tracking-wider group-hover:text-[#F4511E] transition-colors">Official Email Desk</span>
                <span className="text-xs text-white font-black truncate block mt-0.5">theroyalpalace6@gmail.com</span>
              </div>
            </a>

            {/* WhatsApp Contact Card */}
            <a 
              href={`https://wa.me/12272664466?text=${encodeURIComponent("Hello Prince Fazza Charity Foundation, thank you for your humanitarian work and support for humanity. I would like to make an inquiry and learn more about your programs.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex items-center space-x-4 transition-all duration-300 hover:bg-white/[0.04] hover:border-emerald-500 group hover:scale-[1.01]"
            >
              <div className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center text-zinc-300 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12.031 2a9.967 9.967 0 0 0-9.969 9.969c0 1.944.556 3.766 1.516 5.313L2 22l4.897-1.288a9.907 9.907 0 0 0 5.134 1.419h.005a9.969 9.969 0 0 0 9.969-9.97c0-2.662-1.037-5.164-2.922-7.049A9.904 9.904 0 0 0 12.031 2zm5.82 14.24c-.24.675-1.18 1.242-1.635 1.282-.415.035-.95.045-1.525-.14a9.7 9.7 0 0 1-3.645-2.26 10.669 10.669 0 0 1-2.52-3.155A5.672 5.672 0 0 1 7.5 9.385c.015-1.115.59-1.69 1.06-2.15.175-.17.39-.215.535-.21h.39c.125 0 .285-.01.445.37.17.405.58 1.42.63 1.525.05.105.08.23.01.37s-.105.23-.21.35c-.105.125-.22.28-.315.375-.105.105-.215.22-.095.425a8.3 8.3 0 0 0 1.52 1.885c.67.6 1.23.99 1.84 1.295.2.1.375.05.515-.1.175-.185.76-.875.965-1.175.2-.3.41-.25.685-.15.275.1.1.84 1.76.92.155.03.31.06.46.06.395 0 .61-.19.705-.33.28-.415.42-.92.18-1.595z" />
                </svg>
              </div>
              <div>
                <span className="text-[9px] text-zinc-500 font-mono font-black uppercase block tracking-wider group-hover:text-emerald-500 transition-colors">Humanitarian Support Hotline</span>
                <span className="text-xs text-white font-black block mt-0.5 tracking-tight">+1 (227) 266-4466</span>
              </div>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <button
              onClick={() => handlePageChange("home")}
              className="flex items-center text-left focus:outline-none transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              {logoFailed ? (
                <div className="flex items-center space-x-2.5 font-sans font-black text-sm uppercase tracking-wider text-[#F4511E] py-4">
                  <div className="w-10 h-10 rounded-full bg-[#F4511E] flex items-center justify-center text-white text-xs font-black">
                    FZ
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs text-white leading-none">PRINCE FAZZA</span>
                    <span className="text-[9px] text-[#F4511E] leading-none uppercase font-extrabold tracking-widest mt-1">CHARITY FOUNDATION</span>
                  </div>
                </div>
              ) : (
                <img
                  src="https://i.imgur.com/eNBSRt4.png"
                  alt="Prince Fazza Charity Foundation Official Footer Logo"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoFailed(true)}
                  className="h-[140px] w-auto object-contain filter brightness-110 drop-shadow-[0_2px_8px_rgba(255,255,255,0.01)]"
                />
              )}
            </button>
            <p className="text-[11.5px] text-zinc-400 max-w-xs leading-relaxed font-medium">
              An elite international humanitarian 501(c)(3) nonprofit dedicated to child sponsoring, professional surgical caravans, women crop enterprises, and solar underground wells.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-sans font-extrabold text-white uppercase tracking-wider">Major Hub Initiatives</h4>
            <div className="flex flex-col space-y-1.5 text-zinc-400">
              <button onClick={() => handlePageChange("water-projects")} className="text-left hover:text-[#F4511E] transition-colors cursor-pointer">Solar Pure Aquifers</button>
              <button onClick={() => handlePageChange("scholarships")} className="text-left hover:text-[#F4511E] transition-colors cursor-pointer">Academic Learning Sponsoring</button>
              <button onClick={() => handlePageChange("emergency-relief")} className="text-left hover:text-[#F4511E] transition-colors cursor-pointer">Crisis Shield Triage</button>
              <button onClick={() => handlePageChange("commentary")} className="text-left hover:text-[#F4511E] transition-colors cursor-pointer">60 Public Dialogue Reviews</button>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-sans font-extrabold text-white uppercase tracking-wider">Compliance Trust</h4>
            <div className="flex flex-col space-y-1.5 text-zinc-400">
              <button onClick={() => handlePageChange("annual-reports")} className="text-left hover:text-[#F4511E] transition-colors cursor-pointer">Annual Financial Audit</button>
              <button onClick={() => handlePageChange("financial-transparency")} className="text-left hover:text-[#F4511E] transition-colors cursor-pointer">Zero fee leaks schema</button>
              <button onClick={() => handlePageChange("privacy")} className="text-left hover:text-[#F4511E] transition-colors cursor-pointer">Privacy and Cookie Terms</button>
              <span 
                onClick={() => setIsCipherOpen(true)}
                className="text-[10px] text-zinc-500 font-mono font-bold cursor-pointer hover:text-[#F4511E] transition duration-200 select-none"
              >
                Charity Registration ID: 41-4112NY01
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-sans font-extrabold text-white uppercase tracking-wider">Direct News Stream</h4>
            <p className="text-[11px] text-zinc-400">Submit coordinates to capture official relief announcements of the Presidency.</p>
            {newsSigned ? (
              <p className="text-emerald-500 font-extrabold">Mailbox registered.</p>
            ) : (
              <form 
                onSubmit={async (e) => { 
                  e.preventDefault(); 
                  try {
                    const dbPath = "newsletterSubscribers";
                    await addDoc(collection(db, dbPath), {
                      email: newsletterEmail,
                      timestamp: new Date().toISOString()
                    });
                  } catch (error) {
                    console.error("Firestore Newsletter subscribe error:", error);
                  }
                  setNewsSigned(true); 
                }} 
                className="flex"
              >
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="name@charity.com" 
                  className="bg-slate-900 border border-white/10 px-3 py-1.5 text-[11px] text-white rounded-l-lg outline-none w-full font-bold focus:border-[#F4511E]"
                  required 
                />
                <button type="submit" className="bg-[#F4511E] hover:bg-white hover:text-slate-950 text-white font-extrabold px-3.5 rounded-r-lg transition duration-300 cursor-pointer">➔</button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center text-[10px] text-zinc-500 flex flex-col md:flex-row justify-between max-w-7xl mx-auto">
          <span>&copy; 2026 Prince Fazza Charity Foundation in New York. All registered rights compilation secure. 501(c)(3) Tax-Exempt Status.</span>
          <div className="space-x-4 mt-2 md:mt-0">
            <button onClick={() => handlePageChange("privacy")} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => handlePageChange("terms")} className="hover:text-white transition-colors">Terms of Association</button>
          </div>
        </div>
      </footer>
      )}
        </>
      )}

      {/* PREMIUM IMAGE PREVIEW / LIGHTBOX SYSTEM */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-[999] flex flex-col items-center justify-center p-4 md:p-8 cursor-zoom-out selection:bg-transparent"
          >
            {/* Top Controls */}
            <div className="absolute top-6 right-6 z-[1000] flex items-center space-x-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox(null);
                }}
                className="w-12 h-12 bg-white/5 hover:bg-[#F4511E] active:scale-95 text-white rounded-full flex items-center justify-center border border-white/10 transition-all shadow-xl group cursor-pointer"
              >
                <span className="text-sm font-bold font-sans group-hover:rotate-90 transition-transform duration-300">✕</span>
              </button>
            </div>

            {/* Cinematic HD Image Container */}
            <div className="relative max-w-5xl max-h-[70vh] w-full flex items-center justify-center overflow-hidden">
              <motion.img
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                src={lightbox.url}
                alt={lightbox.alt}
                onClick={(e) => e.stopPropagation()}
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.8)] border border-white/10 selection:bg-transparent cursor-zoom-in transition-all duration-500 hover:scale-[1.03]"
              />
            </div>

            {/* Caption & Metadata description (humanitarian storytelling style) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="mt-6 text-center max-w-2xl px-6"
            >
              <span className="text-[#F4511E] font-mono text-[9px] md:text-[10px] tracking-widest uppercase font-black block mb-1">
                // PRINCE FAZZA LEDGER COLLECTION
              </span>
              <h4 className="text-white font-sans font-black text-xs md:text-lg uppercase tracking-wider">
                {lightbox.alt}
              </h4>
              {lightbox.caption && (
                <p className="text-zinc-400 text-[11px] md:text-xs mt-2 font-medium leading-relaxed font-sans max-w-xl mx-auto">
                  {lightbox.caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GLOBAL ULTRA PREMIUM THANK-YOU MODAL OVERLAY */}
      <AnimatePresence>
        {paymentSuccess && (
          <div className="fixed inset-0 z-[100000] bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-hidden select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-[0_30px_100px_rgba(0,0,0,0.4)] p-8 text-center space-y-6 mx-auto"
            >
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-ping"></div>
                <div className="bg-emerald-500 text-white w-16 h-16 rounded-full flex items-center justify-center relative shadow-md">
                  <CheckCircle className="w-8 h-8" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-sans font-black text-xl text-slate-900 tracking-tight leading-tight">
                  Blessings & Thank You, {payerName || "Kind Benefactor"}
                </h3>
                
                <div className="py-1">
                  <span className="text-4xl font-black text-emerald-600 font-mono block">
                    ${Number(donateAmount || 1000).toLocaleString()}
                  </span>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono mt-0.5">
                    USD
                  </p>
                </div>

                <p className="text-sm text-slate-600 font-medium leading-relaxed font-sans px-2">
                  was logged successfully under the official donation protocol.
                </p>
                
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed font-sans italic border-t border-slate-100 pt-4 px-2">
                  May Almighty God richly bless you, strengthen you, and reward you for your kindness, compassion, and support towards humanity.
                </p>
              </div>

              {/* Action buttons kept from requirement 4 */}
              <div className="space-y-2 flex flex-col pt-2 border-t border-slate-105">
                <button 
                  onClick={() => {
                    setPaymentSuccess(false);
                    setDonationStep(1);
                    setActivePage("home");
                  }} 
                  className="w-full bg-[#111111] hover:bg-[#F4511E] text-white py-3.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer text-center"
                >
                  Return to Home Overview
                </button>
                <button 
                  onClick={() => {
                    setPaymentSuccess(false);
                    setDonationStep(1);
                  }} 
                  className="w-full bg-transparent hover:bg-slate-50 text-slate-700 border border-slate-200 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer text-center"
                >
                  Pledge Another Donation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2026 BUDGET GALLERY LIGHTBOX VIEWER OVERLAY */}
      <AnimatePresence>
        {activeBudgetImg && (
          <div className="fixed inset-0 z-[999999] bg-[#090D16]/95 backdrop-blur-md flex flex-col items-center justify-center select-none overflow-hidden touch-none font-sans">
            {/* Topbar Info & Controls */}
            <div className="absolute top-4 left-4 right-4 z-[1000000] flex flex-col sm:flex-row justify-between items-center bg-[#0F172A]/85 backdrop-blur border border-[#1E293B]/60 p-3 px-5 rounded-3xl gap-2 shadow-2xl">
              <span className="text-[10px] sm:text-xs font-semibold text-slate-300 tracking-wider">
                {activeBudgetImg.includes("page1") || activeBudgetImg.includes("36a0EJh") ? "Page 1: Sovereign Campaign Scope" : "Page 2: School Renovations Program (Asia)"}
              </span>
              
              <div className="flex items-center space-x-2">
                <button 
                  type="button"
                  onClick={() => setBudgetZoom(prev => Math.min(prev * 1.5, 8))}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-[#F4511E] transition duration-200 cursor-pointer text-white flex items-center justify-center shadow-lg"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4 text-white" />
                </button>
                <button 
                  type="button"
                  onClick={() => setBudgetZoom(prev => Math.max(prev / 1.5, 0.5))}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-[#F4511E] transition duration-200 cursor-pointer text-white flex items-center justify-center shadow-lg"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4 text-white" />
                </button>
                <button 
                  type="button"
                  onClick={() => { setBudgetZoom(1); setBudgetPan({ x: 0, y: 0 }); }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-[#F4511E] transition duration-200 cursor-pointer text-white flex items-center justify-center shadow-lg"
                  title="Reset Alignment"
                >
                  <RotateCcw className="w-4 h-4 text-white" />
                </button>
                <span className="w-[1px] h-6 bg-slate-700/60 mx-1"></span>
                <button 
                  type="button"
                  onClick={() => setActiveBudgetImg(null)}
                  className="p-2 rounded-xl bg-red-600/90 hover:bg-red-500 transition duration-200 cursor-pointer text-white flex items-center justify-center shadow-lg ml-1"
                  title="Close Preview"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Gesture-enabled drag and pan area */}
            <div 
              className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
              onMouseDown={(e) => {
                if (e.button === 0) {
                  setIsBudgetDragging(true);
                  setBudgetPanStart({ x: e.clientX - budgetPan.x, y: e.clientY - budgetPan.y });
                }
              }}
              onMouseMove={(e) => {
                if (!isBudgetDragging) return;
                setBudgetPan({
                  x: e.clientX - budgetPanStart.x,
                  y: e.clientY - budgetPanStart.y
                });
              }}
              onMouseUp={() => setIsBudgetDragging(false)}
              onMouseLeave={() => setIsBudgetDragging(false)}
              onTouchStart={(e) => {
                if (e.touches.length === 1) {
                  setIsBudgetDragging(true);
                  setBudgetPanStart({ 
                    x: e.touches[0].clientX - budgetPan.x, 
                    y: e.touches[0].clientY - budgetPan.y 
                  });
                }
              }}
              onTouchMove={(e) => {
                if (isBudgetDragging && e.touches.length === 1) {
                  setBudgetPan({
                    x: e.touches[0].clientX - budgetPanStart.x,
                    y: e.touches[0].clientY - budgetPanStart.y
                  });
                }
              }}
              onTouchEnd={() => setIsBudgetDragging(false)}
              onWheel={(e) => {
                // Zoom on wheel scroll
                const zoomFactor = e.deltaY < 0 ? 1.25 : 0.8;
                setBudgetZoom(prev => Math.max(0.5, Math.min(prev * zoomFactor, 8)));
              }}
            >
              <motion.div 
                style={{
                  transform: `translate(${budgetPan.x}px, ${budgetPan.y}px) scale(${budgetZoom})`,
                  transformOrigin: "center center",
                  transition: isBudgetDragging ? "none" : "transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
                }}
                className="w-full max-w-lg md:max-w-2xl max-h-[75vh] p-4 flex items-center justify-center pointer-events-none"
              >
                <img 
                  src={activeBudgetImg} 
                  alt="Zoomed Budget Detail View" 
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[75vh] object-contain pointer-events-auto rounded-xl shadow-2xl border border-slate-700/30"
                />
              </motion.div>
            </div>

            {/* Bottom Help Tips */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000000] text-[9px] text-slate-400 bg-[#0F172A]/80 backdrop-blur border border-[#1E293B]/40 px-5 py-2.5 rounded-full font-mono font-medium tracking-wider text-center max-w-[90%] sm:max-w-auto leading-relaxed shadow-lg">
              DRAG / MOVE TO PAN • SCROLL WHEEL / GESTURES OR TOP BUTTONS TO ZOOM
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* GLOBAL ULTRA PREMIUM PAYMENT METHOD SELECTOR MODAL OVERLAY */}
      <AnimatePresence>
        {showPaymentPopup && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[99999] flex items-center justify-center p-4 font-sans select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-100 shadow-[0_35px_120px_rgba(0,0,0,0.3)] p-8 text-center space-y-6 mx-auto"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setShowPaymentPopup(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100/80 text-slate-400 hover:text-slate-700 transition duration-200 cursor-pointer"
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="space-y-2.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm mb-1 animate-pulse">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none">Choose a Payment Method</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  You have chosen to donate <span className="font-extrabold text-emerald-600">${Number(donateAmount || 1000).toLocaleString()}</span>. Kindly select a payment method below to request payment details.
                </p>
              </div>

              {/* Options List */}
              <div className="space-y-3 pt-1">
                
                {/* Bank Wire Option */}
                <button
                  type="button"
                  onClick={() => handlePaymentOptionSelect("bank")}
                  className="group w-full p-4.5 rounded-[20px] border border-slate-150 hover:border-amber-500 bg-white hover:bg-amber-50/5 flex items-center space-x-4 text-left transition duration-300 shadow-sm hover:shadow-md cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-amber-50/85 text-amber-600 border border-amber-100/50 group-hover:bg-amber-600 group-hover:text-white group-hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-sm">
                    <Landmark className="w-5.5 h-5.5 transition duration-300" strokeWidth={1.75} />
                  </div>
                  <div className="flex-grow">
                    <strong className="block text-xs font-black text-slate-900 tracking-tight transition duration-200 group-hover:text-amber-700">Request Bank Account</strong>
                    <span className="block text-[10px] text-slate-400 font-normal leading-normal mt-0.5 animate-pulse">Request official bank transfer details for your donation.</span>
                  </div>
                  <span className="text-slate-300 group-hover:text-amber-500 transition transform group-hover:translate-x-1 font-bold text-xs font-mono">➔</span>
                </button>

                {/* Crypto Option */}
                <button
                  type="button"
                  onClick={() => handlePaymentOptionSelect("crypto")}
                  className="group w-full p-4.5 rounded-[20px] border border-slate-150 hover:border-emerald-500 bg-white hover:bg-emerald-50/5 flex items-center space-x-4 text-left transition duration-300 shadow-sm hover:shadow-md cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-50/85 text-emerald-600 border border-emerald-100/50 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-sm">
                    <Coins className="w-5.5 h-5.5 transition duration-300" strokeWidth={1.75} />
                  </div>
                  <div className="flex-grow">
                    <strong className="block text-xs font-black text-slate-900 tracking-tight transition duration-200 group-hover:text-emerald-700">Request Wallet Address</strong>
                    <span className="block text-[10px] text-slate-400 font-normal leading-normal mt-0.5 animate-pulse">Request the official cryptocurrency wallet details for your donation.</span>
                  </div>
                  <span className="text-slate-350 group-hover:text-emerald-500 transition transform group-hover:translate-x-1 font-bold text-xs font-mono">➔</span>
                </button>

              </div>

              {/* Footnote information */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-center space-x-1.5 text-[9px] text-slate-400 font-bold uppercase font-mono tracking-wider">
                <Lock className="w-3 h-3 text-emerald-500" />
                <span>Secure Direct Allocation Routing</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2026 COOKIE CONSENT SYSTEM */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div 
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 md:left-1/2 md:-translate-x-1/2 md:max-w-6xl md:w-[calc(100%-3rem)] z-[100000] p-5 sm:p-6 bg-slate-950/75 backdrop-blur-xl border border-white/10 text-white font-sans rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 w-full">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-orange-500/10 text-[#F4511E] rounded-xl border border-[#F4511E]/20 mt-1 shrink-0">
                  <Globe className="w-5 h-5 shrink-0" />
                </div>
                <div className="space-y-1 text-left">
                  <h4 className="text-sm font-black uppercase tracking-widest text-[#F4511E]">
                    COOKIES &amp; PRIVACY
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed max-w-4xl font-medium">
                    Our platform uses secure, lightweight cookies to track localized logistics pipelines, remember volunteer registrations, and measure zero-dilution donor campaign metrics. Agree to our sovereign privacy guidelines to access full operational coordinates.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem("pf_cookie_consent", "accepted");
                    setShowCookieBanner(false);
                    setTimeout(() => {
                      setShowBudgetPopup(true);
                    }, 2000);
                  }}
                  className="w-full sm:w-auto bg-[#F4511E] hover:bg-[#ff693b] text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer text-center shadow-md active:scale-95"
                >
                  Accept All Cookies
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCookieBanner(false);
                    setTimeout(() => {
                      setShowBudgetPopup(true);
                    }, 2000);
                  }}
                  className="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 border border-white/5 cursor-pointer text-center active:scale-95 shadow-md"
                >
                  Reject Cookies
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2026 BUDGET SUPPORT POP-UP MODAL */}
      <AnimatePresence>
        {showBudgetPopup && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[100001] flex items-center justify-center p-4 font-sans select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm bg-white rounded-[28px] border border-slate-100/80 shadow-[0_32px_96px_rgba(0,0,0,0.3)] p-5 sm:p-6 text-center space-y-4 mx-auto overflow-hidden"
            >
              {/* Backglow element subtle layout helper */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-orange-500/5 to-transparent rounded-t-[28px] pointer-events-none" />

              {/* Close icon */}
              <button
                type="button"
                onClick={() => setShowBudgetPopup(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition duration-200 cursor-pointer z-30"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Foundation Logo Asset positioned top center completely inside the card container */}
              <div className="flex items-center justify-center pt-2">
                <img
                  src="https://i.imgur.com/eNBSRt4.png"
                  alt="Prince Fazza Charity Foundation Official Logo"
                  referrerPolicy="no-referrer"
                  className="h-28 sm:h-32 w-auto object-contain transition-transform hover:scale-105 duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              {/* Heading Titles */}
              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                  Support Our 2026 Humanitarian Development Budget
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                  Help us expand humanitarian impact through school renovations, hospital rehabilitation, homelessness support, hunger relief, food bank development, mentorship initiatives, and rural infrastructure assistance.
                </p>
              </div>

              {/* Luxury/VIP CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    handlePageChange("donate");
                    setDonationStep(1);
                    setShowBudgetPopup(false);
                    // Automatic scrolling & input focus target
                    setTimeout(() => {
                      const element = document.getElementById("donation-amount-selection");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "center" });
                        // Focus on first input if present
                        const input = element.querySelector("input");
                        if (input) {
                          input.focus({ preventScroll: true });
                        }
                      }
                    }, 400);
                  }}
                  className="w-full bg-[#111111] hover:bg-[#F4511E] text-white py-2.5 px-4 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-md hover:-translate-y-0.5 active:scale-95 cursor-pointer text-center"
                >
                  Donate Now
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handlePageChange("2026-budget-gallery");
                    setShowBudgetPopup(false);
                  }}
                  className="w-full bg-transparent hover:bg-slate-50 text-slate-600 border border-slate-200 py-2.5 px-4 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 active:scale-95 cursor-pointer text-center"
                >
                  See Budget
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CipherAdminPanel 
        isOpen={isCipherOpen} 
        onClose={() => setIsCipherOpen(false)} 
      />

    </div>
  );
}
