import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Check, Search, Globe, User, MessageSquare, Tag, MapPin } from "lucide-react";
import { ActivePage } from "../types";
import { 
  saveUserGlobalVoice, 
  GlobalVoiceMessage 
} from "../data_global_voices";

interface GlobalVoicesAddCommentaryProps {
  onNavigate: (page: ActivePage) => void;
}

interface CountryOption {
  name: string;
  flag: string;
  region: "Asia" | "Europe" | "North America" | "South America" | "Oceania" | "Middle East";
}

const COUNTRIES: CountryOption[] = [
  { name: "Afghanistan", flag: "🇦🇫", region: "Middle East" },
  { name: "Albania", flag: "🇦🇱", region: "Europe" },
  { name: "Andorra", flag: "🇦🇩", region: "Europe" },
  { name: "Argentina", flag: "🇦🇷", region: "South America" },
  { name: "Armenia", flag: "🇦🇲", region: "Asia" },
  { name: "Australia", flag: "🇦🇺", region: "Oceania" },
  { name: "Austria", flag: "🇦🇹", region: "Europe" },
  { name: "Azerbaijan", flag: "🇦🇿", region: "Middle East" },
  { name: "Bangladesh", flag: "🇧🇩", region: "Asia" },
  { name: "Belgium", flag: "🇧🇪", region: "Europe" },
  { name: "Bolivia", flag: "🇧🇴", region: "South America" },
  { name: "Brazil", flag: "🇧🇷", region: "South America" },
  { name: "Bulgaria", flag: "🇧🇬", region: "Europe" },
  { name: "Cambodia", flag: "🇰🇭", region: "Asia" },
  { name: "Cyprus", flag: "🇨🇾", region: "Europe" },
  { name: "Canada", flag: "🇨🇦", region: "North America" },
  { name: "Chile", flag: "🇨🇱", region: "South America" },
  { name: "China", flag: "🇨🇳", region: "Asia" },
  { name: "Colombia", flag: "🇨🇴", region: "South America" },
  { name: "Costa Rica", flag: "🇨🇷", region: "North America" },
  { name: "Croatia", flag: "🇭🇷", region: "Europe" },
  { name: "Denmark", flag: "🇩🇰", region: "Europe" },
  { name: "Ecuador", flag: "🇪🇨", region: "South America" },
  { name: "Egypt", flag: "🇪🇬", region: "Middle East" },
  { name: "Fiji", flag: "🇫🇯", region: "Oceania" },
  { name: "Finland", flag: "🇫🇮", region: "Europe" },
  { name: "France", flag: "🇫🇷", region: "Europe" },
  { name: "Georgia", flag: "🇬🇪", region: "Europe" },
  { name: "Germany", flag: "🇩🇪", region: "Europe" },
  { name: "Guatemala", flag: "🇬🇹", region: "North America" },
  { name: "Greece", flag: "🇬🇷", region: "Europe" },
  { name: "Honduras", flag: "🇭🇳", region: "North America" },
  { name: "Hungary", flag: "🇭🇺", region: "Europe" },
  { name: "Iceland", flag: "🇮🇸", region: "Europe" },
  { name: "India", flag: "🇮🇳", region: "Asia" },
  { name: "Indonesia", flag: "🇮🇩", region: "Asia" },
  { name: "Iran", flag: "🇮🇷", region: "Middle East" },
  { name: "Iraq", flag: "🇮🇶", region: "Middle East" },
  { name: "Ireland", flag: "🇮🇪", region: "Europe" },
  { name: "Israel", flag: "🇮🇱", region: "Middle East" },
  { name: "Italy", flag: "🇮🇹", region: "Europe" },
  { name: "Jamaica", flag: "🇯🇲", region: "North America" },
  { name: "Japan", flag: "🇯🇵", region: "Asia" },
  { name: "Jordan", flag: "🇯🇴", region: "Middle East" },
  { name: "Kazakhstan", flag: "🇰🇿", region: "Asia" },
  { name: "Kyrgyzstan", flag: "🇰🇬", region: "Asia" },
  { name: "Lebanon", flag: "🇱🇧", region: "Middle East" },
  { name: "Malaysia", flag: "🇲🇾", region: "Asia" },
  { name: "Mexico", flag: "🇲🇽", region: "North America" },
  { name: "Monaco", flag: "🇲🇨", region: "Europe" },
  { name: "Nepal", flag: "🇳🇵", region: "Asia" },
  { name: "Netherlands", flag: "🇳🇱", region: "Europe" },
  { name: "New Zealand", flag: "🇳🇿", region: "Oceania" },
  { name: "Paraguay", flag: "🇵🇾", region: "South America" },
  { name: "Norway", flag: "🇳🇴", region: "Europe" },
  { name: "Oman", flag: "🇴🇲", region: "Middle East" },
  { name: "Pakistan", flag: "🇵🇰", region: "Asia" },
  { name: "Palestine", flag: "🇵🇸", region: "Middle East" },
  { name: "Panama", flag: "🇵🇦", region: "North America" },
  { name: "Peru", flag: "🇵🇪", region: "South America" },
  { name: "Philippines", flag: "🇵🇭", region: "Asia" },
  { name: "Poland", flag: "🇵🇱", region: "Europe" },
  { name: "Portugal", flag: "🇵🇹", region: "Europe" },
  { name: "Qatar", flag: "🇶🇦", region: "Middle East" },
  { name: "Romania", flag: "🇷🇴", region: "Europe" },
  { name: "Saudi Arabia", flag: "🇸🇦", region: "Middle East" },
  { name: "Singapore", flag: "🇸🇬", region: "Asia" },
  { name: "Slovakia", flag: "🇸🇰", region: "Europe" },
  { name: "South Korea", flag: "🇰🇷", region: "Asia" },
  { name: "Spain", flag: "🇪🇸", region: "Europe" },
  { name: "Sri Lanka", flag: "🇱🇰", region: "Asia" },
  { name: "Sweden", flag: "🇸🇪", region: "Europe" },
  { name: "Switzerland", flag: "🇨🇭", region: "Europe" },
  { name: "Syria", flag: "🇸🇾", region: "Middle East" },
  { name: "Thailand", flag: "🇹🇭", region: "Asia" },
  { name: "Turkey", flag: "🇹🇷", region: "Middle East" },
  { name: "Ukraine", flag: "🇺🇦", region: "Europe" },
  { name: "United Arab Emirates", flag: "🇦🇪", region: "Middle East" },
  { name: "United Kingdom", flag: "🇬🇧", region: "Europe" },
  { name: "United States", flag: "🇺🇸", region: "North America" },
  { name: "Uruguay", flag: "🇺🇾", region: "South America" },
  { name: "Uzbekistan", flag: "🇺🇿", region: "Asia" },
  { name: "Venezuela", flag: "🇻🇪", region: "South America" },
  { name: "Vietnam", flag: "🇻🇳", region: "Asia" }
];

const TOPICS = [
  "School Renovation",
  "Education Support",
  "Child Welfare",
  "Healthcare Programs",
  "Emergency Relief",
  "Housing Support",
  "Women's Empowerment",
  "Youth Development",
  "Community Transformation",
  "Humanitarian Assistance"
];

export const GlobalVoicesAddCommentary: React.FC<GlobalVoicesAddCommentaryProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[TOPICS.length - 1]); // default to Humanitarian Assistance
  const [commentary, setCommentary] = useState("");
  
  // Search & dynamic selection state for country dropdown
  const [countrySearch, setCountrySearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Validations & alerts
  const [touched, setTouched] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<GlobalVoiceMessage | null>(null);

  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return COUNTRIES;
    const q = countrySearch.toLowerCase();
    return COUNTRIES.filter(c => c.name.toLowerCase().includes(q));
  }, [countrySearch]);

  // Click outside to dismiss country dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!fullName.trim() || !commentary.trim() || !selectedCountry) {
      return;
    }

    const payload: Omit<GlobalVoiceMessage, "timestamp"> & { createdAt: number } = {
      id: `user-gv-${Date.now()}`,
      name: fullName.trim(),
      city: city.trim() || "Beneficiary Base",
      country: selectedCountry.name,
      flag: selectedCountry.flag,
      region: selectedCountry.region,
      topic: selectedTopic as any,
      message: commentary.trim(),
      createdAt: Date.now()
    };

    saveUserGlobalVoice(payload);
    
    // Simulate premium submission sequence
    setSuccess(true);
    setSubmittedMessage({
      ...payload,
      timestamp: "Just now"
    });

    // Auto navigate back after 3 seconds
    setTimeout(() => {
      onNavigate("global-voices");
    }, 4500);
  };

  return (
    <div className="bg-[#FCFCFC] min-h-screen text-[#111111] pb-24 selection:bg-[#F4511E]/20 selection:text-[#F4511E] font-sans">
      
      {/* HEADER BAR */}
      <div className="bg-white border-b border-zinc-100 py-6 px-6 sticky top-0 z-40 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            type="button"
            onClick={() => onNavigate("global-voices")}
            className="flex items-center space-x-2 text-slate-500 hover:text-[#F4511E] transition duration-250 font-mono text-[11px] font-black uppercase tracking-wider group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 duration-250" />
            <span>Cancel</span>
          </button>
          <div className="text-right">
            <span className="text-[#F4511E] font-mono text-[9px] md:text-[10px] tracking-[0.25em] font-black uppercase">
              // RECONSTR-COVENANT
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 mt-12 sm:mt-16">
        
        {/* SUCCESS CONFIRMATION ANCHOR */}
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div 
              key="success-card"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="bg-white border border-emerald-100 shadow-[0_30px_70px_rgba(16,185,129,0.08)] rounded-3xl p-8 sm:p-12 text-center space-y-6"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">Commentary Published!</h2>
                <p className="text-slate-500 text-xs sm:text-sm font-semibold max-w-md mx-auto leading-relaxed">
                  Thank you for contributing your voice. Your testimonial has been securely printed onto the registry and will appear at the top of the feed immediately!
                </p>
              </div>

              {/* Preview of the card in the success screen */}
              {submittedMessage && (
                <div className="border border-slate-100 bg-[#FAFAFA]/75 p-6 rounded-2xl max-w-md mx-auto text-left shadow-inner">
                  <div className="flex items-center space-x-3 mb-2.5">
                    <span className="text-3xl">{submittedMessage.flag}</span>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-tight">{submittedMessage.name}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">{submittedMessage.city}, {submittedMessage.country}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">“{submittedMessage.message}”</p>
                </div>
              )}

              <div className="pt-4">
                <div className="inline-flex items-center space-x-2 text-slate-400 text-[10px] font-mono uppercase font-black tracking-widest bg-slate-50 py-1.5 px-4 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4511E] animate-ping" />
                  <span>Returning to Feed soon...</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="form-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-10"
            >
              {/* Introduction header text */}
              <div className="text-center sm:text-left space-y-3">
                <span className="text-[#F4511E] font-mono text-xs uppercase tracking-widest font-black">// Share Your Testimonial</span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] uppercase font-sans">
                  Submit a Commentary
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-2xl font-medium">
                  Add your message of hope, impact narrative, or gratitude. Your submission will map itself elegantly to your nation's thematic styles on the live public ledger.
                </p>
              </div>

              {/* FORM ENGINE */}
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-100/90 shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-6 sm:p-10 space-y-8">
                
                {/* FIELD 1: COUNTRY (SEARCHABLE GLOBAL DROPDOWN) */}
                <div className="space-y-2.5 relative" ref={dropdownRef}>
                  <label className="flex items-center space-x-1.5 text-[11px] font-mono font-black uppercase text-slate-500 tracking-wider">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    <span>Selected Country <span className="text-[#F4511E]">*</span></span>
                  </label>

                  <div 
                    onClick={() => {
                      setIsDropdownOpen(!isDropdownOpen);
                      setCountrySearch("");
                    }}
                    className={`w-full bg-[#FAFAFA] border hover:border-slate-300 rounded-2xl px-5 py-4 text-slate-800 text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center justify-between ${
                      touched && !selectedCountry 
                        ? "border-red-300 bg-red-50/10 focus:border-red-500 focus:ring-red-500" 
                        : isDropdownOpen
                          ? "border-[#F4511E] ring-1 ring-[#F4511E]"
                          : "border-slate-200/95"
                    }`}
                  >
                    {selectedCountry ? (
                      <div className="flex items-center space-x-3">
                        <span className="text-xl shrink-0 select-none">{selectedCountry.flag}</span>
                        <span className="font-bold text-slate-900">{selectedCountry.name}</span>
                        <span className="text-[9px] font-mono font-black uppercase tracking-wider text-slate-400 py-0.5 px-2 bg-slate-100 rounded-full">{selectedCountry.region}</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 font-semibold">Select commentary nation of origin...</span>
                    )}
                    <span className="text-slate-400 text-[10px]">▼</span>
                  </div>

                  {/* DROP DOWN PANEL */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 4 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full mb-1 sm:bottom-auto sm:top-full sm:mt-1 left-0 z-50 w-full bg-white border border-slate-100 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] p-3 space-y-2 origin-top"
                      >
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            type="text"
                            placeholder="Type to search countries..."
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full bg-[#FAFAFA] border border-slate-150 rounded-xl py-2.5 pl-9 pr-4 text-xs font-semibold outline-none focus:border-[#F4511E]"
                            autoFocus
                          />
                        </div>

                        <div className="max-h-56 overflow-y-auto space-y-1 pr-1">
                          {filteredCountries.length === 0 ? (
                            <div className="text-center py-4 text-xs text-slate-400 font-medium">
                              No matching countries found
                            </div>
                          ) : (
                            filteredCountries.map((c) => (
                              <button
                                key={c.name}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCountry(c);
                                  setIsDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                                  selectedCountry?.name === c.name
                                    ? "bg-slate-900 text-white"
                                    : "text-slate-700 hover:bg-slate-50"
                                }`}
                              >
                                <div className="flex items-center space-x-2.5">
                                  <span>{c.flag}</span>
                                  <span>{c.name}</span>
                                </div>
                                <span className={`text-[9px] font-mono uppercase font-black px-1.5 py-0.5 rounded ${
                                  selectedCountry?.name === c.name ? "bg-white/10 text-white" : "bg-slate-50 text-slate-400"
                                }`}>{c.region}</span>
                              </button>
                            ))
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {touched && !selectedCountry && (
                    <p className="text-red-500 font-semibold text-[10px] sm:text-xs">
                      Please choose a country for the commentary nation of origin.
                    </p>
                  )}
                </div>

                {/* FIELDS row: Full Name and Optional City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* FIELD 2: FULL NAME */}
                  <div className="space-y-2.5">
                    <label className="flex items-center space-x-1.5 text-[11px] font-mono font-black uppercase text-slate-500 tracking-wider">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Full Name <span className="text-[#F4511E]">*</span></span>
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Liam Sterling"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full bg-[#FAFAFA] border hover:border-slate-300 rounded-2xl px-5 py-4 text-slate-800 text-xs sm:text-sm font-semibold transition outline-none focus:border-[#F4511E] focus:ring-1 focus:ring-[#F4511E] ${
                        touched && !fullName.trim() ? "border-red-300 bg-red-50/10" : "border-slate-200/95"
                      }`}
                    />
                    {touched && !fullName.trim() && (
                      <p className="text-red-500 font-semibold text-[10px] sm:text-xs">
                        Full Name is required.
                      </p>
                    )}
                  </div>

                  {/* FIELD 5 [OPTIONAL]: CITY */}
                  <div className="space-y-2.5">
                    <label className="flex items-center space-x-1.5 text-[11px] font-mono font-black uppercase text-slate-500 tracking-wider">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>City / Sub-region <span className="text-slate-400 font-bold lowercase">(optional)</span></span>
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Zurich"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-slate-200/95 hover:border-slate-300 rounded-2xl px-5 py-4 text-slate-800 text-xs sm:text-sm font-semibold transition outline-none focus:border-[#F4511E] focus:ring-1 focus:ring-[#F4511E]"
                    />
                  </div>

                </div>

                {/* FIELD 6 [OPTIONAL]: TOPIC CATEGORY LIST */}
                <div className="space-y-2.5">
                  <label className="flex items-center space-x-1.5 text-[11px] font-mono font-black uppercase text-slate-500 tracking-wider">
                    <Tag className="w-3.5 h-3.5 text-slate-400" />
                    <span>Associated Campaign / Project</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {TOPICS.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => setSelectedTopic(topic)}
                        className={`px-3 py-2.5 rounded-xl border font-bold text-[10px] sm:text-xs text-center transition-all ${
                          selectedTopic === topic
                            ? "bg-[#F4511E]/5 text-[#F4511E] border-[#F4511E]/45 ring-1 ring-[#F4511E]/20"
                            : "bg-[#FAFAFA] text-slate-600 border-slate-200/80 hover:bg-slate-50"
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* FIELD 3: COMMENTARY TEXTAREA */}
                <div className="space-y-2.5">
                  <label className="flex items-center space-x-1.5 text-[11px] font-mono font-black uppercase text-slate-500 tracking-wider">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    <span>Your Commentary <span className="text-[#F4511E]">*</span></span>
                  </label>
                  <textarea 
                    rows={6}
                    placeholder="Provide your commentary of gratitude or deep human impact narrative here..."
                    value={commentary}
                    onChange={(e) => setCommentary(e.target.value)}
                    className={`w-full bg-[#FAFAFA] border hover:border-slate-300 rounded-2xl px-5 py-4 text-slate-800 text-xs sm:text-sm font-semibold transition outline-none focus:border-[#F4511E] focus:ring-1 focus:ring-[#F4511E] resize-none ${
                      touched && !commentary.trim() ? "border-red-300 bg-red-50/10" : "border-slate-200/95"
                    }`}
                  />
                  {touched && !commentary.trim() && (
                    <p className="text-red-500 font-semibold text-[10px] sm:text-xs">
                      Please enter a commentary statement.
                    </p>
                  )}
                </div>

                <hr className="border-slate-100" />

                {/* ACTIONS row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button 
                    type="button"
                    onClick={() => onNavigate("global-voices")}
                    className="w-full sm:w-auto text-slate-500 hover:text-slate-800 border border-slate-200/90 rounded-2xl px-6 py-3.5 text-xs font-mono font-black uppercase tracking-widest transition cursor-pointer text-center"
                  >
                    Return to feed
                  </button>

                  <button 
                    type="submit"
                    className="w-full sm:w-auto bg-[#F4511E] hover:bg-[#D84315] active:scale-[0.98] text-white font-mono text-xs font-black tracking-widest uppercase py-4 px-10 rounded-2xl shadow-lg shadow-[#F4511E]/15 hover:shadow-[#F4511E]/25 transition-all text-center cursor-pointer"
                  >
                    SUBMIT COMMENTARY ➔
                  </button>
                </div>

              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
