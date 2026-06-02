import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  getCombinedGlobalVoices, 
  getRelativeTimeString, 
  getCountryPalette, 
  GlobalVoiceMessage 
} from "../data_global_voices";
import { 
  Search, 
  Globe, 
  Tag, 
  MapPin, 
  Clock, 
  Heart, 
  Sparkles, 
  Compass, 
  HeartHandshake, 
  Layers,
  ChevronDown,
  SlidersHorizontal,
  Plus
} from "lucide-react";
import { ActivePage } from "../types";

// Human-readable labels for sorting options
const sortLabels: Record<string, string> = {
  recent: "Most Recent First",
  oldest: "Oldest First",
  name: "Name (A-Z)",
  country: "Country (A-Z)",
};

interface GlobalVoicesProps {
  onNavigate: (page: ActivePage) => void;
}

export const GlobalVoices: React.FC<GlobalVoicesProps> = ({ onNavigate }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "oldest" | "name" | "country">("recent");
  const [openDropdown, setOpenDropdown] = useState<"region" | "topic" | "sort" | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<GlobalVoiceMessage | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const heroHeight = 460;
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
      const blurVal = progress * 16;
      
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
  }, []);

  // Tick state to update true relative time labels live
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Compute dynamic combined list including system + user-created live data
  const combinedMessages = useMemo(() => {
    return getCombinedGlobalVoices();
  }, [tick]); // invalidate on tick to push relative time calculations forward

  // Dynamically build regions from the database to ensure synchronicity
  const regions = useMemo(() => {
    const list = new Set(combinedMessages.map(m => m.region));
    return ["All", ...Array.from(list)];
  }, [combinedMessages]);

  // Dynamically build topics
  const topics = useMemo(() => {
    const list = new Set(combinedMessages.map(m => m.topic));
    return ["All", ...Array.from(list)];
  }, [combinedMessages]);

  // Filtering + Sorting Pipeline
  const filteredMessages = useMemo(() => {
    let result = [...combinedMessages];

    // 1. Filter by Region
    if (selectedRegion !== "All") {
      result = result.filter(m => m.region === selectedRegion);
    }

    // 2. Filter by Topic
    if (selectedTopic !== "All") {
      result = result.filter(m => m.topic === selectedTopic);
    }

    // 3. Search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(m => 
        m.name.toLowerCase().includes(q) || 
        m.country.toLowerCase().includes(q) || 
        m.city.toLowerCase().includes(q) || 
        m.message.toLowerCase().includes(q)
      );
    }

    // 4. Sort
    result.sort((a, b) => {
      const timeA = a.createdAt || 0;
      const timeB = b.createdAt || 0;

      if (sortBy === "recent") {
        return timeB - timeA;
      }
      if (sortBy === "oldest") {
        return timeA - timeB;
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "country") {
        return a.country.localeCompare(b.country);
      }
      return 0;
    });

    return result;
  }, [combinedMessages, selectedRegion, selectedTopic, searchQuery, sortBy]);

  // Framer Motion Animation Variants for Staggered Load
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <div className="bg-[#FCFCFC] min-h-screen text-[#111111] pb-24 selection:bg-[#F4511E]/20 selection:text-[#F4511E]">
      
      {/* Click-outside dismiss backdrop for dropdowns */}
      {openDropdown && (
        <div 
          className="fixed inset-0 z-40 bg-transparent" 
          onClick={() => setOpenDropdown(null)} 
        />
      )}

      {/* PREMIUM HERO SECTION */}
      <section 
        ref={heroRef}
        className="fixed left-0 right-0 z-10 top-[64px] md:top-[76px] h-[460px] flex items-center justify-center overflow-hidden bg-zinc-950"
        style={{ willChange: "transform, filter" }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.imgur.com/lfSdYIa.png" 
            alt="Diverse supporter communities of Prince Fazza Charity Foundation"
            className="w-full h-full object-cover scale-[1.03] filter brightness-[0.75] contrast-[1.05]"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.endsWith(".png")) {
                target.src = "https://i.imgur.com/lfSdYIa.jpg";
              } else if (target.src.endsWith(".jpg")) {
                target.src = "https://i.imgur.com/lfSdYIa.jpeg";
              } else {
                target.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920";
              }
            }}
          />
          {/* Subtle Dark Layer Overlay to optimize readability & premium mood */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-[#111111]/30"></div>
          {/* Decorative graphic patterns */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FCFCFC] to-transparent z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white font-sans tracking-tight leading-[1.05] drop-shadow-sm"
          >
            Global Voices
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-zinc-100 font-light max-w-2xl mx-auto drop-shadow-md leading-relaxed"
          >
            Messages of Hope, Gratitude, and Humanitarian Impact from Around the World
          </motion.p>
        </div>
      </section>

      {/* Spacer in normal flow */}
      <div className="w-full h-[460px]" />

      {/* SEARCH AND SCROLLING CONTENT WRAPPER */}
      <div className="relative z-20 bg-[#FCFCFC] pb-12">
        {/* SEARCH AND FILTERS BENCH */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-[-100px] sm:mt-[-130px] relative z-30">
        <div className="bg-white rounded-3xl border border-slate-100/85 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] p-5 md:p-8 space-y-6">
          
          {/* Top Row: Search Input & Add Commentary Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* ADD A COMMENTARY Button */}
            <button 
              type="button"
              onClick={() => onNavigate("global-voices/add-commentary")}
              className="bg-[#F4511E] hover:bg-[#D84315] active:scale-[0.98] text-white font-mono text-[11px] sm:text-xs font-black tracking-widest uppercase py-4 px-6 md:px-8 rounded-2xl transition-all shadow-md shadow-[#F4511E]/10 hover:shadow-[#F4511E]/20 flex items-center justify-center space-x-2 shrink-0 group cursor-pointer"
            >
              <Plus className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-300 shrink-0" />
              <span>ADD A COMMENTARY</span>
            </button>

            {/* Search Input Container */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input 
                type="text"
                placeholder="Search messages by name, country, city, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAFAFA] border border-slate-200/80 hover:border-slate-300 focus:border-[#F4511E] focus:ring-1 focus:ring-[#F4511E] rounded-2xl py-3.5 pl-12 pr-6 text-sm font-semibold transition-all outline-none text-[#111111]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 transition"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Second Row: 3 Premium Horizontal Layout Dropdown Cards (Never Stack or Wrap) */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-4 relative w-full">
            
            {/* Card 1: Filter by Region */}
            <motion.div 
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex-1 min-w-0"
            >
              <div 
                onClick={() => setOpenDropdown(openDropdown === "region" ? null : "region")}
                className={`w-full h-full text-left border rounded-xl sm:rounded-2xl p-2.5 sm:p-4 cursor-pointer select-none flex flex-col justify-between transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.05)] ${
                  openDropdown === "region" 
                    ? "border-[#F4511E] bg-white ring-2 ring-[#F4511E]/10" 
                    : selectedRegion !== "All"
                      ? "border-[#F4511E]/40 bg-[#F4511E]/5"
                      : "border-slate-250 bg-white"
                }`}
              >
                <div className="flex items-center justify-between w-full gap-1 mb-1">
                  <div className="flex items-center space-x-1 sm:space-x-1.5 text-slate-400 overflow-hidden">
                    <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                    <span className="text-[8px] sm:text-[10px] font-mono font-black uppercase tracking-wider text-slate-400 truncate">
                      Region
                    </span>
                  </div>
                  <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 transition-transform duration-300 ${openDropdown === "region" ? "rotate-180 text-[#F4511E]" : ""}`} />
                </div>
                <div className="text-[11px] sm:text-xs md:text-sm font-extrabold text-slate-850 truncate">
                  {selectedRegion}
                </div>
              </div>

              <AnimatePresence>
                {openDropdown === "region" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 4, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-1 z-50 w-52 sm:w-64 bg-white border border-slate-100 rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-1.5 max-h-72 overflow-y-auto origin-top-left"
                  >
                    <div className="px-2.5 py-1.5 text-[8px] sm:text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">
                      Filter Region
                    </div>
                    {regions.map((region) => (
                      <button
                        key={region}
                        onClick={() => {
                          setSelectedRegion(region);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-semibold transition-all flex items-center justify-between ${
                          selectedRegion === region
                            ? "bg-[#F4511E] text-white"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="truncate">{region}</span>
                        {selectedRegion === region && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0 ml-1" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Card 2: Filter by Project Topic */}
            <motion.div 
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex-1 min-w-0"
            >
              <div 
                onClick={() => setOpenDropdown(openDropdown === "topic" ? null : "topic")}
                className={`w-full h-full text-left border rounded-xl sm:rounded-2xl p-2.5 sm:p-4 cursor-pointer select-none flex flex-col justify-between transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.05)] ${
                  openDropdown === "topic" 
                    ? "border-[#F4511E] bg-white ring-2 ring-[#F4511E]/10" 
                    : selectedTopic !== "All"
                      ? "border-[#F4511E]/40 bg-[#F4511E]/5"
                      : "border-slate-250 bg-white"
                }`}
              >
                <div className="flex items-center justify-between w-full gap-1 mb-1">
                  <div className="flex items-center space-x-1 sm:space-x-1.5 text-slate-400 overflow-hidden">
                    <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                    <span className="text-[8px] sm:text-[10px] font-mono font-black uppercase tracking-wider text-slate-400 truncate">
                      Topic
                    </span>
                  </div>
                  <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 transition-transform duration-300 ${openDropdown === "topic" ? "rotate-180 text-[#F4511E]" : ""}`} />
                </div>
                <div className="text-[11px] sm:text-xs md:text-sm font-extrabold text-slate-800 truncate">
                  {selectedTopic}
                </div>
              </div>

              <AnimatePresence>
                {openDropdown === "topic" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 4, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-1 z-50 w-52 sm:w-64 bg-white border border-slate-100 rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-1.5 max-h-72 overflow-y-auto origin-top"
                  >
                    <div className="px-2.5 py-1.5 text-[8px] sm:text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">
                      Filter Topic
                    </div>
                    {topics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => {
                          setSelectedTopic(topic);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-semibold transition-all flex items-center justify-between ${
                          selectedTopic === topic
                            ? "bg-slate-900 text-white"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="truncate mr-2">{topic}</span>
                        {selectedTopic === topic && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Card 3: Sort By */}
            <motion.div 
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex-1 min-w-0"
            >
              <div 
                onClick={() => setOpenDropdown(openDropdown === "sort" ? null : "sort")}
                className={`w-full h-full text-left border rounded-xl sm:rounded-2xl p-2.5 sm:p-4 cursor-pointer select-none flex flex-col justify-between transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.05)] ${
                  openDropdown === "sort" 
                    ? "border-[#F4511E] bg-white ring-2 ring-[#F4511E]/10" 
                    : "border-slate-250 bg-white"
                }`}
              >
                <div className="flex items-center justify-between w-full gap-1 mb-1">
                  <div className="flex items-center space-x-1 sm:space-x-1.5 text-slate-400 overflow-hidden">
                    <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                    <span className="text-[8px] sm:text-[10px] font-mono font-black uppercase tracking-wider text-slate-400 truncate">
                      Sort
                    </span>
                  </div>
                  <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 transition-transform duration-300 ${openDropdown === "sort" ? "rotate-180 text-[#F4511E]" : ""}`} />
                </div>
                <div className="text-[11px] sm:text-xs md:text-sm font-extrabold text-slate-800 truncate">
                  {sortLabels[sortBy] || "Sort Option"}
                </div>
              </div>

              <AnimatePresence>
                {openDropdown === "sort" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 4, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1 z-50 w-52 sm:w-64 bg-white border border-slate-100 rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-1.5 max-h-72 overflow-y-auto origin-top-right"
                  >
                    <div className="px-2.5 py-1.5 text-[8px] sm:text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">
                      Sort Order
                    </div>
                    {(Object.keys(sortLabels) as Array<"recent" | "oldest" | "name" | "country">).map((key) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSortBy(key);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-semibold transition-all flex items-center justify-between ${
                          sortBy === key
                            ? "bg-slate-800 text-white"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="truncate">{sortLabels[key]}</span>
                        {sortBy === key && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0 ml-1" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>

        </div>
      </div>

      {/* MESSAGES FEED GRID PANEL */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
        <AnimatePresence mode="popLayout">
          {filteredMessages.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl border border-slate-100 p-16 text-center max-w-xl mx-auto space-y-4"
            >
              <div className="w-16 h-16 bg-[#F4511E]/10 rounded-2xl flex items-center justify-center mx-auto">
                <Compass className="w-8 h-8 text-[#F4511E]" />
              </div>
              <h3 className="text-lg font-black text-slate-800">No message coordinates match</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                We couldn't find any suppport or impact reports matching your search parameters. Try choosing different filters or clear search query input.
              </p>
              <button
                onClick={() => {
                  setSelectedRegion("All");
                  setSelectedTopic("All");
                  setSearchQuery("");
                }}
                className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-[#F4511E] transition-colors rounded-xl font-mono text-[10px] font-black uppercase text-white py-2 px-5"
              >
                Reset All Filters
              </button>
            </motion.div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6"
            >
              {filteredMessages.map((msg, index) => {
                const palette = getCountryPalette(msg.country);
                const displayTime = msg.createdAt ? getRelativeTimeString(msg.createdAt) : msg.timestamp;

                return (
                  <motion.div
                    key={msg.id}
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.25 } }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedMessage(msg)}
                    className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-[0_12px_24px_-4px_rgba(0,0,0,0.05),0_4px_12px_-2px_rgba(0,0,0,0.02)] hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)] hover:border-[#F4511E]/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden cursor-pointer"
                  >
                    {/* Solid pastel country tint overlay layer to prevent blending into background */}
                    <div className={`absolute inset-0 -z-10 ${palette.cardBg} opacity-100 pointer-events-none`} />

                    {/* Flag color header accent strip (top bounds) */}
                    <div className={`absolute top-0 inset-x-0 h-[4px] bg-gradient-to-r ${palette.accentStrip}`} />
                    
                    <div className="space-y-3 sm:space-y-4">
                      {/* Header: country flag + details */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2">
                        <div className="flex items-center space-x-2 sm:space-x-3 overflow-hidden min-w-0 flex-1">
                          <span 
                            className="text-2xl sm:text-3xl select-none shrink-0" 
                            role="img" 
                            aria-label={`${msg.country} flag`}
                          >
                            {msg.flag}
                          </span>
                          <div className="overflow-hidden min-w-0 flex-1">
                            <h4 className="font-semibold text-slate-900 text-xs sm:text-sm md:text-base leading-tight truncate font-sans tracking-tight">
                              {msg.name}
                            </h4>
                            <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium font-sans mt-0.5 block truncate">
                              {msg.city}, {msg.country}
                            </span>
                          </div>
                        </div>

                        {/* Region Badge */}
                        <span className={`px-2 py-0.5 rounded text-[8px] sm:text-[10px] font-sans font-extrabold select-none uppercase truncate max-w-full self-start border border-[#F4511E]/10 ${palette.badgeBg} ${palette.badgeText}`}>
                          {msg.region}
                        </span>
                      </div>

                      {/* Topic Badge Indicator */}
                      <div className="inline-flex items-center space-x-1.5 overflow-hidden max-w-full bg-[#F4511E]/5 px-2 py-0.5 rounded-full border border-[#F4511E]/10">
                        <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-[#F4511E]" />
                        <span className="text-[8.5px] sm:text-[10px] font-sans font-bold uppercase tracking-wider truncate shrink-0 max-w-full text-[#F4511E]">{msg.topic}</span>
                      </div>

                      {/* Supporting Quote paragraph - Clean readable typography with line clamp */}
                      <div className="text-slate-800 text-[11px] sm:text-sm md:text-[14px] font-normal leading-relaxed font-sans border-l-2 border-[#F4511E]/30 pl-2 sm:pl-3 line-clamp-4">
                        “{msg.message}”
                      </div>
                    </div>

                    {/* Message Footer: Date timestamp */}
                    <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100/70 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-sans font-medium">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-300" />
                        <span>{displayTime}</span>
                      </div>
                      <div className="flex items-center space-x-1 opacity-50 group-hover:opacity-100 transition duration-300 text-[#F4511E]">
                        <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#F4511E]" />
                        <span className="text-[9px] sm:text-[10px] font-sans tracking-wide uppercase font-black text-[#F4511E]">
                          View
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* PREMIUM POPUP MODAL/EXPERIENCE */}
      <AnimatePresence>
        {selectedMessage && (() => {
          const modalPalette = getCountryPalette(selectedMessage.country);
          const modalTime = selectedMessage.createdAt ? getRelativeTimeString(selectedMessage.createdAt) : selectedMessage.timestamp;

          return (
            <motion.div 
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-md"
              onClick={() => setSelectedMessage(null)}
            >
              <motion.div 
                key="modal-content"
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.15)] relative max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Thin flag accent strip at top of modal */}
                <div className={`absolute top-0 inset-x-0 h-[5px] bg-gradient-to-r ${modalPalette.accentStrip}`} />

                {/* Close Button */}
                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200/80 hover:text-black flex items-center justify-center text-slate-500 font-extrabold transition-all duration-200 cursor-pointer text-xs"
                  aria-label="Close modal"
                >
                  ✕
                </button>

                {/* Tag/Topic Indicator with primary brand style */}
                <div className="inline-flex items-center space-x-2 mb-6 bg-[#F4511E]/5 border border-[#F4511E]/15 px-3 py-1.5 rounded-full select-none">
                  <Tag className="w-4 h-4 text-[#F4511E]" />
                  <span className="text-xs font-sans font-extrabold uppercase tracking-widest text-[#F4511E]">{selectedMessage.topic}</span>
                </div>

                {/* Message Quote - High typography editorial appearance, solid high-contrast black */}
                <div className="text-black text-lg sm:text-xl md:text-2xl font-bold leading-relaxed font-sans mb-8 border-l-4 border-[#F4511E] pl-4 sm:pl-6">
                  “{selectedMessage.message}”
                </div>

                {/* Author Details Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 mt-6 border-t border-slate-150">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl sm:text-5xl select-none" role="img" aria-label="flag">
                      {selectedMessage.flag}
                    </span>
                    <div>
                      <h4 className="font-extrabold text-black text-base sm:text-lg tracking-tight font-sans">
                        {selectedMessage.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 font-bold font-sans">
                        {selectedMessage.city}, {selectedMessage.country}
                      </p>
                    </div>
                  </div>
                  
                  {/* Region & Time indicators - using primary brand accents and high contrast */}
                  <div className="text-left sm:text-right">
                    <span className="inline-block px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-sans font-black uppercase bg-[#F4511E]/10 text-[#F4511E] border border-[#F4511E]/20">
                      {selectedMessage.region}
                    </span>
                    <div className="flex items-center space-x-1.5 text-[10px] sm:text-xs text-slate-500 mt-2.5 sm:justify-end">
                      <Clock className="w-3.5 h-3.5 text-[#F4511E]" />
                      <span className="font-bold">{modalTime}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* CALL TO ACTION ACCENT */}
      <section className="max-w-4xl mx-auto px-4 mt-20">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,81,30,0.12),transparent_50%)]" />
          
          <div className="relative z-10 space-y-6 max-w-xl mx-auto">
            <HeartHandshake className="w-10 h-10 text-[#F4511E] mx-auto" />
            <h3 className="text-2xl font-black tracking-tight">Help Build Stories of Hope</h3>
            <p className="text-slate-400 text-xs sm:text-sm font-semibold max-w-lg mx-auto leading-relaxed">
              Every message in this register is a direct reflection of compassionate giving in action. Join Prince Fazza Charity Foundation today by donating or matching resources for targeted programs.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  // Direct navigation back to donation flow or trigger donation page
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  const navBt = document.querySelector('[title="Go Back"]');
                  if (navBt) {
                    (navBt as any).click();
                  }
                  // Custom dispatch event to open donation modal locally or trigger state
                  const event = new CustomEvent("trigger-donate-modal");
                  window.dispatchEvent(event);
                }}
                className="inline-flex items-center space-x-2 bg-[#F4511E] hover:bg-[#ff6130] active:scale-[0.98] transition-all rounded-full font-mono text-[10px] font-black uppercase text-white py-3 px-8 shadow-lg shadow-[#F4511E]/20 cursor-pointer"
              >
                <span>SUPPORT OUR MISSIONS</span>
                <span className="font-sans font-extrabold">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      </div>

    </div>
  );
};
