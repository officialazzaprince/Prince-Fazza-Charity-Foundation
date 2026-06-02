import React, { useState, useEffect, useRef } from "react";
import { ActivePage } from "../types";
import { TOP_LANGUAGES, translate } from "../translation";
import { PremiumDonateButton } from "./PremiumDonateButton";
import { 
  Globe, 
  Menu, 
  X, 
  Search, 
  Heart, 
  Sparkles,
  ChevronDown,
  Compass,
  ArrowRight,
  Shield,
  Activity,
  Award,
  Users,
  Briefcase,
  HelpCircle,
  Phone,
  CheckCircle,
  Calendar,
  Lock,
  HeartHandshake
} from "lucide-react";

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  lang: string;
  setLang: (l: string) => void;
  openDonateModal: () => void;
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  onBack?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  lang,
  setLang,
  openDonateModal,
  onBack,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  
  // Menu visibility states
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"about" | "services" | "join" | "news" | null>(null);
  
  // Mobile accordions
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileJoinOpen, setMobileJoinOpen] = useState(false);
  const [mobileNewsOpen, setMobileNewsOpen] = useState(false);

  // Search overlay states
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [langModalOpen, setLangModalOpen] = useState(false);

  // Trigger Google Translate engine instantly via event
  const switchLanguage = (code: string) => {
    setLang(code);
    setLangModalOpen(false);
    setShowLanguageDropdown(false);
    
    // Attempt instant change if Google Translate combo exists
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event('change'));
    }
  };

  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle outside clicks and Escape key to close menus beautifully
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setShowLanguageDropdown(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLinkClick = (page: ActivePage, anchorId?: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    
    // Scroll handling
    if (anchorId) {
      setTimeout(() => {
        const borderElement = document.getElementById(anchorId);
        if (borderElement) {
          window.scrollTo({
            top: borderElement.offsetTop - 110,
            behavior: "smooth"
          });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Multiple timeouts to guarantee perfect scrolling to top on virtual page transitions
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 50);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 180);
    }
  };

  const handleServiceClick = (page: ActivePage) => {
    handleLinkClick(page);
  };

  const currentFlag = TOP_LANGUAGES.find((l) => l.code === lang)?.flag || "🇺🇸";

  // Mega Menu Services data with descriptions and stylized icons
  const SERVICES_LIST = [
    { id: "srv-hiv", title: "HIV Support", desc: "Access free clinical diagnostics, nutritional allocations, and counseling.", icon: Activity, page: "hiv-support" as ActivePage },
    { id: "srv-halfway", title: "Halfway House", desc: "Safe transition homes with active reintegration and local job assistance.", icon: Compass, page: "halfway-house" as ActivePage },
    { id: "srv-foreigners", title: "Vulnerable Foreigners Aid", desc: "Essential shelter, legal coordinate advisory, and emergency air support.", icon: Shield, page: "vulnerable-foreigners" as ActivePage },
    { id: "srv-seminar", title: "Seminar Request Booking", desc: "Coordinate custom community outreach lectures on oncology and self-growth.", icon: Calendar, page: "seminar-request" as ActivePage },
    { id: "srv-database", title: "Health Ambassador Database", desc: "Verified registry of regional specialized clinicians and mobile medics.", icon: Users, page: "health-ambassadors" as ActivePage },
    { id: "srv-children", title: "Children Came Home", desc: "Reunification protocol identifying missing youth and coordinating protection.", icon: Sparkles, page: "children-home" as ActivePage },
    { id: "srv-shelter", title: "Shelter and Placement", desc: "Secure housing centers equipped with daily feeding modules and security.", icon: Lock, page: "shelter-placement" as ActivePage },
    { id: "srv-hospitals", title: "Hospitals and Medical Care", desc: "Full funding for emergency cancer screenings and surgical interventions.", icon: Award, page: "medical-care" as ActivePage },
    { id: "srv-mother", title: "Mother and Child Shelter", desc: "Dedicated maternity health wings and baby nutrients dispatch stations.", icon: HeartHandshake, page: "mother-child" as ActivePage }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 font-sans ${
          scrolled 
            ? "bg-white/85 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.03)] py-0.5 border-b border-slate-100" 
            : "bg-white/70 backdrop-blur-lg py-1 border-b border-slate-200/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* LEFT SIDE: Subtle Back arrow + Logo */}
            <div className="flex items-center space-x-1.5 sm:space-x-3">
              {activePage !== "home" && onBack && (
                <button
                  onClick={onBack}
                  className="flex items-center space-x-1 text-slate-500 hover:text-[#F4511E] transition-all cursor-pointer font-mono text-[11px] font-black uppercase tracking-widest focus:outline-none group select-none mr-1.5 sm:mr-3"
                  title="Go Back"
                >
                  <span className="text-base font-extrabold group-hover:-translate-x-1 transition-transform duration-300 inline-block">←</span>
                  <span className="hidden sm:inline">Back</span>
                </button>
              )}
              
              <button
                onClick={() => handleLinkClick("home")}
                className="flex items-center text-left focus:outline-none transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                {logoFailed ? (
                  <div className="flex items-center space-x-2 font-sans font-black text-xs uppercase tracking-wider text-[#F4511E]">
                    <div className="w-8 h-8 rounded-full bg-[#F4511E] flex items-center justify-center text-white text-[11px] font-black">
                      FZ
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-slate-800 leading-none">PRINCE FAZZA</span>
                      <span className="text-[8px] text-[#F4511E] leading-none uppercase font-extrabold tracking-widest mt-0.5">CHARITY FOUNDATION</span>
                    </div>
                  </div>
                ) : (
                  <img
                    src="https://i.imgur.com/eNBSRt4.png"
                    alt="Prince Fazza Charity Foundation Official Logo"
                    referrerPolicy="no-referrer"
                    onError={() => setLogoFailed(true)}
                    className="h-[120px] sm:h-[140px] md:h-[160px] w-auto max-w-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-300 my-[-30px] sm:my-[-35px] md:my-[-40px]"
                  />
                )}
              </button>
            </div>

            {/* CENTER: Clean Interactive Menu (Reduced padding and spacing by 20%) */}
            <nav className="hidden lg:flex items-center space-x-0.5">
              
              {/* 1. ABOUT US */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown("about")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleLinkClick("about")}
                  className={`text-[11px] uppercase tracking-widest font-black px-3.5 py-2 rounded-full flex items-center space-x-1.5 transition-all outline-none ${
                    activePage === "about"
                      ? "text-[#F4511E] bg-[#F4511E]/5"
                      : "text-slate-800 hover:text-[#F4511E] hover:bg-slate-50"
                  }`}
                >
                  <span>{translate("about", lang)}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === "about" ? "rotate-180" : ""}`} />
                </button>

                {/* About Dropdown Panel */}
                {activeDropdown === "about" && (
                  <div className="absolute left-0 mt-1 w-[760px] grid grid-cols-3 gap-3 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-2xl p-4 z-50 animate-fade-in">
                    <button 
                      onClick={() => handleLinkClick("about")}
                      className="w-full text-left p-3.5 rounded-xl hover:bg-[#F4511E]/5 hover:text-[#F4511E] transition-all flex items-center justify-between group"
                    >
                      <div>
                        <span className="block text-xs font-black text-slate-900 group-hover:text-[#F4511E]">About Foundation</span>
                        <span className="block text-[10px] text-slate-400 font-medium">Core humanitarian mission</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#F4511E]" />
                    </button>
                    <button 
                      onClick={() => handleLinkClick("vision")}
                      className="w-full text-left p-3.5 rounded-xl hover:bg-[#F4511E]/5 hover:text-[#F4511E] transition-all flex items-center justify-between group"
                    >
                      <div>
                        <span className="block text-xs font-black text-slate-900 group-hover:text-[#F4511E]">Vision</span>
                        <span className="block text-[10px] text-slate-400 font-medium">Our ultimate aim for humanity</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#F4511E]" />
                    </button>
                    <button 
                      onClick={() => handleLinkClick("mission")}
                      className="w-full text-left p-3.5 rounded-xl hover:bg-[#F4511E]/5 hover:text-[#F4511E] transition-all flex items-center justify-between group"
                    >
                      <div>
                        <span className="block text-xs font-black text-slate-900 group-hover:text-[#F4511E]">Mission</span>
                        <span className="block text-[10px] text-slate-400 font-medium">Sustainable action & relief</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#F4511E]" />
                    </button>
                    <button 
                      onClick={() => handleLinkClick("founder-chronicle")}
                      className="w-full text-left p-3.5 rounded-xl hover:bg-[#F4511E]/5 hover:text-[#F4511E] transition-all flex items-center justify-between group"
                    >
                      <div>
                        <span className="block text-xs font-black text-slate-900 group-hover:text-[#F4511E]">{translate("founder_chronicle", lang)}</span>
                        <span className="block text-[10px] text-slate-400 font-medium">History and values journal</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#F4511E]" />
                    </button>
                    <button 
                      onClick={() => handleLinkClick("board-directors")}
                      className="w-full text-left p-3.5 rounded-xl hover:bg-[#F4511E]/5 hover:text-[#F4511E] transition-all flex items-center justify-between group"
                    >
                      <div>
                        <span className="block text-xs font-black text-slate-900 group-hover:text-[#F4511E]">{translate("board_directors", lang)}</span>
                        <span className="block text-[10px] text-slate-400 font-medium">Sovereign advisory committee</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#F4511E]" />
                    </button>
                    <button 
                      onClick={() => handleLinkClick("org-structure")}
                      className="w-full text-left p-3.5 rounded-xl hover:bg-[#F4511E]/5 hover:text-[#F4511E] transition-all flex items-center justify-between group"
                    >
                      <div>
                        <span className="block text-xs font-black text-slate-900 group-hover:text-[#F4511E]">{translate("org_structure", lang)}</span>
                        <span className="block text-[10px] text-slate-400 font-medium">Internal action workflows</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#F4511E]" />
                    </button>
                  </div>
                )}
              </div>

              {/* 2. NEWS DROPDOWN */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown("news")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleLinkClick("newsroom")}
                  className={`text-[11px] uppercase tracking-widest font-black px-3.5 py-2 rounded-full flex items-center space-x-1.5 transition-all outline-none ${
                    activePage === "newsroom" || activePage === "global-voices"
                      ? "text-[#F4511E] bg-[#F4511E]/5"
                      : "text-slate-800 hover:text-[#F4511E] hover:bg-slate-50"
                  }`}
                >
                  <span>{translate("news", lang)}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === "news" ? "rotate-180" : ""}`} />
                </button>

                {/* News Dropdown Panel */}
                {activeDropdown === "news" && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-[460px] grid grid-cols-2 gap-3 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-2xl p-4 z-50 animate-fade-in">
                    <button 
                      onClick={() => handleLinkClick("newsroom")}
                      className="w-full text-left p-3 rounded-xl hover:bg-[#F4511E]/5 hover:text-[#F4511E] transition-all flex items-center justify-between group"
                    >
                      <div>
                        <span className="block text-xs font-black text-slate-900 group-hover:text-[#F4511E]">{translate("news_and_updates", lang)}</span>
                        <span className="block text-[10px] text-slate-400 font-medium">Foundation chronicles</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#F4511E]" />
                    </button>
                    <button 
                      onClick={() => handleLinkClick("global-voices")}
                      className="w-full text-left p-3 rounded-xl hover:bg-[#F4511E]/5 hover:text-[#F4511E] transition-all flex items-center justify-between group"
                    >
                      <div>
                        <span className="block text-xs font-black text-slate-900 group-hover:text-[#F4511E]">{translate("global_voices", lang)}</span>
                        <span className="block text-[10px] text-slate-400 font-medium">Messages of hope & impact</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#F4511E]" />
                    </button>
                  </div>
                )}
              </div>

              {/* 3. OUR SERVICES */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown("services")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleLinkClick("programs")}
                  className={`text-[11px] uppercase tracking-widest font-black px-3.5 py-2 rounded-full flex items-center space-x-1.5 transition-all outline-none ${
                    activePage === "programs"
                      ? "text-[#F4511E] bg-[#F4511E]/5"
                      : "text-slate-800 hover:text-[#F4511E] hover:bg-slate-50"
                  }`}
                >
                  <span>{translate("our_services", lang)}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === "services" ? "rotate-180" : ""}`} />
                </button>

                {/* SERVICES MEGA DROPDOWN */}
                {activeDropdown === "services" && (
                  <div className="absolute right-1/2 translate-x-1/2 mt-1 w-[800px] bg-white/95 backdrop-blur-xl border border-slate-100 rounded-[28px] shadow-2xl p-7 z-50 grid grid-cols-3 gap-4 animate-fade-in">
                    <div className="col-span-3 border-b border-slate-100 pb-3 mb-2 flex items-center justify-between">
                      <span className="text-xs font-mono text-[#F4511E] font-black tracking-widest uppercase">// FAZZA HUMANITARIAN UTILITIES</span>
                      <span className="text-[10px] text-slate-400 font-bold">9 Active Framework Modules</span>
                    </div>
                    {SERVICES_LIST.map((srv) => {
                      const Icon = srv.icon;
                      return (
                        <button 
                          key={srv.id}
                          onClick={() => handleServiceClick(srv.page)}
                          className="text-left p-3.5 rounded-2xl hover:bg-slate-50 hover:text-[#F4511E] transition-all group flex items-start space-x-3"
                        >
                          <div className="w-8 h-8 bg-[#F4511E]/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#F4511E]/10 transition-colors">
                            <Icon className="w-4 h-4 text-[#F4511E]" />
                          </div>
                          <div>
                            <span className="block text-xs font-black text-slate-900 group-hover:text-[#F4511E] leading-tight mb-1">{srv.title}</span>
                            <p className="text-[10px] text-slate-400 font-medium leading-snug">{srv.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 4. JOIN US */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown("join")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleLinkClick("volunteer")}
                  className={`text-[11px] uppercase tracking-widest font-black px-3.5 py-2 rounded-full flex items-center space-x-1.5 transition-all outline-none ${
                    activePage === "volunteer" || activePage === "partner" || activePage === "careers"
                      ? "text-[#F4511E] bg-[#F4511E]/5"
                      : "text-slate-800 hover:text-[#F4511E] hover:bg-slate-50"
                  }`}
                >
                  <span>{translate("join_us", lang)}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === "join" ? "rotate-180" : ""}`} />
                </button>

                {/* Join Us Dropdown */}
                {activeDropdown === "join" && (
                  <div className="absolute right-0 mt-1 w-64 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-2xl p-3 z-50 animate-fade-in font-sans">
                    <button 
                      onClick={() => handleLinkClick("visit-care")}
                      className="w-full text-left p-3.5 rounded-xl hover:bg-[#F4511E]/5 hover:text-[#F4511E] transition-all flex items-center justify-between group"
                    >
                      <div>
                        <span className="block text-xs font-black text-slate-900 group-hover:text-[#F4511E]">{translate("visit_care", lang)}</span>
                        <span className="block text-[10px] text-slate-400 font-medium">On-site visitor program</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#F4511E]" />
                    </button>
                    <button 
                      onClick={() => handleLinkClick("careers")}
                      className="w-full text-left p-3.5 rounded-xl hover:bg-[#F4511E]/5 hover:text-[#F4511E] transition-all flex items-center justify-between group"
                    >
                      <div>
                        <span className="block text-xs font-black text-slate-900 group-hover:text-[#F4511E]">{translate("careers_openings", lang)}</span>
                        <span className="block text-[10px] text-slate-400 font-medium">Join our logistics teams</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#F4511E]" />
                    </button>
                    <button 
                      onClick={() => handleLinkClick("contact")}
                      className="w-full text-left p-3.5 rounded-xl hover:bg-[#F4511E]/5 hover:text-[#F4511E] transition-all flex items-center justify-between group"
                    >
                      <div>
                        <span className="block text-xs font-black text-slate-900 group-hover:text-[#F4511E]">{translate("contact_us", lang)}</span>
                        <span className="block text-[10px] text-slate-400 font-medium">Direct secure portal link</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#F4511E]" />
                    </button>
                    <button 
                      onClick={() => handleLinkClick("faq")}
                      className="w-full text-left p-3.5 rounded-xl hover:bg-[#F4511E]/5 hover:text-[#F4511E] transition-all flex items-center justify-between group"
                    >
                      <div>
                        <span className="block text-xs font-black text-slate-900 group-hover:text-[#F4511E]">{translate("faq_support", lang)}</span>
                        <span className="block text-[10px] text-slate-400 font-medium">Support FAQ center</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#F4511E]" />
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* RIGHT SIDE: Language flags + Search Icon + Slim Donate Button */}
            <div className="hidden lg:flex items-center space-x-3">
              
              {/* Language Picker (Only Icon/Flag in bar - scaled down to match slimmer header) */}
              <div className="relative">
                <button
                  onClick={() => setLangModalOpen(true)}
                  className="flex items-center justify-center w-8 h-8 border border-slate-200 hover:border-[#F4511E] rounded-full text-sm shadow-sm bg-white hover:bg-[#F4511E]/5 transition-all focus:outline-none"
                  title="Translate Website"
                >
                  <span>{currentFlag}</span>
                </button>
              </div>

              {/* Search Circle Button (Scaled down to match slimmer header) */}
              <button
                onClick={() => setSearchOpen(true)}
                className="w-8 h-8 border border-slate-200 hover:border-[#F4511E] rounded-full flex items-center justify-center text-slate-700 hover:text-[#F4511E] shadow-sm bg-white hover:bg-[#F4511E]/5 transition-all outline-none"
                title="Search Site"
              >
                <Search className="w-3.5 h-3.5" />
              </button>

              {/* Premium 3D Luxury Donate CTA (isSmall=true for slimmer, tighter layout) */}
              <PremiumDonateButton onClick={openDonateModal} lang={lang} isSmall={true} />
            </div>

            {/* MOBILE INTERACTIVE HEADER */}
            <div className="flex items-center space-x-3 lg:hidden">
              {/* Center Premium 3D Luxury Donate button for mobile */}
              <PremiumDonateButton onClick={openDonateModal} lang={lang} isMobile={true} />

              {/* Hamburger menu */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 border border-slate-200 rounded-full transition-colors text-slate-800 hover:bg-slate-50"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* PREMIUM GLASSMORPHISM SEARCH OVERLAY */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4">
          <div 
            onClick={() => setSearchOpen(false)}
            className="absolute inset-0 bg-slate-950/65 backdrop-blur-2xl transition-all duration-500 animate-fade-in cursor-pointer"
          />
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 max-w-2xl w-full rounded-3xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8)] p-8 relative ring-1 ring-white/10 text-white animate-scale-up z-10">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            
            <span className="text-[10px] font-mono tracking-widest text-[#FF6B4A] font-black uppercase block mb-1">// GLOBAL LEDGER REGISTRY</span>
            <h3 className="font-sans font-black text-white text-2xl uppercase tracking-tight mb-6">{translate("search", lang)}</h3>
            
            <div className="relative shadow-[0_4px_30px_rgba(0,0,0,0.4)] rounded-2xl overflow-hidden mb-6 group">
              <input
                type="text"
                placeholder={translate("search_placeholder", lang)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 text-white placeholder-white/45 border border-white/10 focus:border-[#FF6B4A]/60 focus:bg-white/15 focus:ring-4 focus:ring-[#FF6B4A]/15 rounded-2xl py-4.5 pl-14 pr-6 outline-none font-bold text-base transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.25)]"
                autoFocus
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-[#FF6B4A] transition-colors" />
            </div>

            {searchQuery && (
              <div className="mt-4 space-y-3 max-h-60 overflow-y-auto pt-4 border-t border-white/15">
                <p className="text-[9px] uppercase tracking-wider text-white/40 font-extrabold font-mono">// matching resource records:</p>
                
                <button
                  onClick={() => {
                    handleLinkClick("campaigns");
                    setSearchOpen(false);
                  }}
                  className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-white/10 hover:border-white/20 flex items-center justify-between text-sm border border-white/5 text-white transition-all duration-300 hover:translate-x-1"
                >
                  <div>
                    <span className="font-bold block text-white">Active Humanitarian Campaigns</span>
                    <span className="text-xs text-white/60 mt-0.5">View live financial allocation tracking tables</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#FF6B4A]" />
                </button>

                <button
                  onClick={() => {
                    handleLinkClick("about");
                    setSearchOpen(false);
                  }}
                  className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-white/10 hover:border-white/20 flex items-center justify-between text-sm border border-white/5 text-white transition-all duration-300 hover:translate-x-1"
                >
                  <div>
                    <span className="font-bold block text-white">About Prince Fazza Foundation</span>
                    <span className="text-xs text-white/60 mt-0.5">Read detailed objectives and humanitarian guidelines</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#FF6B4A]" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FULLSCREEN MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full p-6 shadow-2xl overflow-y-auto relative flex flex-col justify-between font-sans">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <button
                  onClick={() => handleLinkClick("home")}
                  className="flex items-center text-left focus:outline-none transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  {logoFailed ? (
                    <div className="flex items-center space-x-2 font-sans font-black text-xs uppercase tracking-wider text-[#F4511E]">
                      <div className="w-8 h-8 rounded-full bg-[#F4511E] flex items-center justify-center text-white text-[11px] font-black">
                        FZ
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] text-slate-800 leading-none">PRINCE FAZZA</span>
                        <span className="text-[8px] text-[#F4511E] leading-none uppercase font-extrabold tracking-widest mt-0.5">CHARITY FOUNDATION</span>
                      </div>
                    </div>
                  ) : (
                    <img
                      src="https://i.imgur.com/eNBSRt4.png"
                      alt="Prince Fazza Charity Foundation Official Logo"
                      referrerPolicy="no-referrer"
                      onError={() => setLogoFailed(true)}
                      className="h-[130px] w-auto object-contain transition-all duration-300"
                    />
                  )}
                </button>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Accordion List */}
              <div className="py-6 space-y-4">
                
                {/* 1. ABOUT US Accordion */}
                <div className="space-y-2">
                  <button 
                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                    className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest text-slate-900 bg-slate-50 hover:bg-slate-100/70"
                  >
                    <span>{translate("about", lang)}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileAboutOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileAboutOpen && (
                    <div className="pl-4 pr-2 py-1 space-y-1.5 border-l-2 border-slate-100">
                      <button 
                        onClick={() => handleLinkClick("about")}
                        className="w-full text-left py-2 text-xs font-extrabold text-slate-600 hover:text-[#F4511E]"
                      >
                        About Foundation
                      </button>
                      <button 
                        onClick={() => handleLinkClick("vision")}
                        className="w-full text-left py-2 text-xs font-extrabold text-slate-600 hover:text-[#F4511E]"
                      >
                        Vision
                      </button>
                      <button 
                        onClick={() => handleLinkClick("mission")}
                        className="w-full text-left py-2 text-xs font-extrabold text-slate-600 hover:text-[#F4511E]"
                      >
                        Mission
                      </button>
                      <button 
                        onClick={() => handleLinkClick("founder-chronicle")}
                        className="w-full text-left py-2 text-xs font-extrabold text-slate-600 hover:text-[#F4511E]"
                      >
                        {translate("founder_chronicle", lang)}
                      </button>
                      <button 
                        onClick={() => handleLinkClick("board-directors")}
                        className="w-full text-left py-2 text-xs font-extrabold text-slate-600 hover:text-[#F4511E]"
                      >
                        {translate("board_directors", lang)}
                      </button>
                      <button 
                        onClick={() => handleLinkClick("org-structure")}
                        className="w-full text-left py-2 text-xs font-extrabold text-slate-600 hover:text-[#F4511E]"
                      >
                        {translate("org_structure", lang)}
                      </button>
                    </div>
                  )}
                </div>

                {/* 2. NEWS Accordion */}
                <div className="space-y-2">
                  <button 
                    onClick={() => setMobileNewsOpen(!mobileNewsOpen)}
                    className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest text-slate-900 bg-slate-50 hover:bg-slate-100/70"
                  >
                    <span>{translate("news", lang)}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileNewsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileNewsOpen && (
                    <div className="pl-4 pr-2 py-1 space-y-1.5 border-l-2 border-slate-100 grid grid-cols-1 gap-1">
                      <button 
                        onClick={() => handleLinkClick("newsroom")}
                        className="w-full text-left py-2 text-xs font-extrabold text-slate-600 hover:text-[#F4511E] truncate block text-left"
                      >
                        • {translate("news_and_updates", lang)}
                      </button>
                      <button 
                        onClick={() => handleLinkClick("global-voices")}
                        className="w-full text-left py-2 text-xs font-extrabold text-slate-600 hover:text-[#F4511E] truncate block text-left"
                      >
                        • {translate("global_voices", lang)}
                      </button>
                    </div>
                  )}
                </div>

                {/* 3. OUR SERVICES Accordion */}
                <div className="space-y-2">
                  <button 
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest text-[#111111] bg-slate-50 hover:bg-slate-100/70"
                  >
                    <span>{translate("our_services", lang)}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileServicesOpen && (
                    <div className="pl-4 pr-2 py-1 space-y-1.5 border-l-2 border-slate-100 grid grid-cols-1 gap-1">
                      {SERVICES_LIST.map((srv) => (
                        <button 
                          key={srv.id}
                          onClick={() => handleServiceClick(srv.page)}
                          className="w-full text-left py-2 text-xs font-extrabold text-[#333333] hover:text-[#F4511E] truncate"
                        >
                          • {srv.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. JOIN US Accordion */}
                <div className="space-y-2">
                  <button 
                    onClick={() => setMobileJoinOpen(!mobileJoinOpen)}
                    className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest text-slate-900 bg-slate-50 hover:bg-slate-100/70"
                  >
                    <span>{translate("join_us", lang)}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileJoinOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileJoinOpen && (
                    <div className="pl-4 pr-2 py-1 space-y-1.5 border-l-2 border-slate-100">
                      <button 
                        onClick={() => handleLinkClick("visit-care")}
                        className="w-full text-left py-2 text-xs font-extrabold text-slate-600 hover:text-[#F4511E]"
                      >
                        {translate("visit_care", lang)}
                      </button>
                      <button 
                        onClick={() => handleLinkClick("careers")}
                        className="w-full text-left py-2 text-xs font-extrabold text-slate-600 hover:text-[#F4511E]"
                      >
                        {translate("careers_openings", lang)}
                      </button>
                      <button 
                        onClick={() => handleLinkClick("contact")}
                        className="w-full text-left py-2 text-xs font-extrabold text-slate-600 hover:text-[#F4511E]"
                      >
                        {translate("contact_us", lang)}
                      </button>
                      <button 
                        onClick={() => handleLinkClick("faq")}
                        className="w-full text-left py-2 text-xs font-extrabold text-slate-600 hover:text-[#F4511E]"
                      >
                        {translate("faq_support", lang)}
                      </button>
                    </div>
                  )}
                </div>

                {/* 5. LANGUAGE (Last Menu Item) */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setLangModalOpen(true);
                  }}
                  className="w-full text-left py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest text-[#F4511E] bg-[#F4511E]/5 hover:bg-[#F4511E]/10 flex items-center justify-between"
                >
                  <span className="flex items-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <span>Language / Translation</span>
                  </span>
                  <span className="text-lg leading-none bg-white w-6 h-6 rounded flex items-center justify-center border border-slate-200">
                    {currentFlag}
                  </span>
                </button>

              </div>
            </div>

            {/* Bottom Footer block */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <PremiumDonateButton 
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDonateModal();
                }} 
                lang={lang} 
                className="w-full" 
              />
              <div className="text-center text-[10px] text-slate-400 font-mono">
                PRINCE FAZZA FOUNDATION • 501(C)(3) COVENANT
              </div>
            </div>
          </div>
        </div>
      )}
      {/* PREMIUM LANGUAGE / TRANSLATION MODAL */}
      {langModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div 
            onClick={() => setLangModalOpen(false)}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-2xl transition-all duration-500 animate-fade-in cursor-pointer"
          />
          <div className="bg-white/95 backdrop-blur-3xl border border-white/20 max-w-xl w-full rounded-[38px] shadow-2xl relative z-10 animate-scale-up font-sans flex flex-col max-h-[85vh]">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#FF6B4A] font-black uppercase block mb-1">// GLOBAL TRANSLATION</span>
                <h3 className="font-black text-2xl uppercase tracking-tight text-slate-900">Select Language</h3>
              </div>
              <button
                onClick={() => setLangModalOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-500 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-3 flex-grow">
              {TOP_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => switchLanguage(l.code)}
                  className={`flex items-center space-x-3 p-3.5 rounded-2xl transition-all duration-300 font-semibold group border outline-none ${
                    lang === l.code 
                      ? "border-[#F4511E] bg-[#F4511E]/5 shadow-[0_4px_12px_rgba(244,81,30,0.1)] text-[#F4511E]" 
                      : "border-slate-100 bg-white hover:border-[#F4511E]/40 hover:bg-slate-50 hover:shadow-md text-slate-700"
                  }`}
                >
                  <span className="text-2xl drop-shadow-sm group-hover:scale-110 transition-transform duration-300">{l.flag}</span>
                  <span className={`text-sm ${lang === l.code ? "font-black" : "font-extrabold"}`}>{l.name}</span>
                </button>
              ))}
            </div>
            
            <div className="p-6 bg-slate-50 rounded-b-[38px] text-center border-t border-slate-100 shrink-0">
              <p className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                Real-time translation powered by Global API Systems
              </p>
            </div>
          </div>
        </div>
      )}

    </>
  );
};
