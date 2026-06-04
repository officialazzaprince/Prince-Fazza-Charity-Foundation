import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building, 
  MapPin, 
  Heart, 
  Users, 
  CheckCircle, 
  Sparkles, 
  ArrowRight,
  Activity,
  HeartHandshake,
  Globe,
  ShieldCheck
} from "lucide-react";
import { 
  generateRandomDonation, 
  getSourcedFundingAt, 
  AnimatedCounter 
} from "./BudgetGallery2026";
import { translate } from "../translation";

interface LiveDonationPortalProps {
  onNavigate: (page: any) => void;
  lang: string;
}

export const LiveDonationPortal: React.FC<LiveDonationPortalProps> = ({ onNavigate, lang }) => {
  const [fundingValue, setFundingValue] = useState<number>(() => {
    try {
      const stored = localStorage.getItem("fazza_secured_funding_with_feed_v1");
      if (stored) return parseInt(stored, 10);
      const oldVal = localStorage.getItem("fazza_last_funding_secure_val");
      if (oldVal) return parseInt(oldVal, 10);
    } catch (e) {}
    
    const calculated = getSourcedFundingAt(Date.now());
    const val = Math.max(calculated, 1902500000);
    try {
      localStorage.setItem("fazza_secured_funding_with_feed_v1", val.toString());
      localStorage.setItem("fazza_last_funding_secure_val", val.toString());
    } catch (e) {}
    return val;
  });

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
      const delay = 5000 + Math.random() * 40000;

      timeoutId = setTimeout(() => {
        const newId = Date.now();
        const donation = generateRandomDonation(newId);

        setVisibleDonations(prev => {
          const next = [...prev.slice(1), donation];
          try {
            localStorage.setItem("fazza_latest_donations_feed_v1", JSON.stringify(next));
          } catch (e) {}
          return next;
        });

        setFundingValue(prev => {
          const nextVal = prev + donation.amount;
          try {
            localStorage.setItem("fazza_secured_funding_with_feed_v1", nextVal.toString());
            localStorage.setItem("fazza_last_funding_secure_val", nextVal.toString());
          } catch (e) {}
          return nextVal;
        });

        setDonorCount(prev => {
          const nextVal = prev + 1;
          try {
            localStorage.setItem("fazza_donor_count_v1", nextVal.toString());
          } catch (e) {}
          return nextVal;
        });

        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setVisibleDonations(prev => {
        let changed = false;
        const next = prev.map(d => {
          if (d.status === "Completed") return d;
          
          if (Math.random() < 0.12) {
            changed = true;
            if (d.status === "Pending") {
              const nextStatus = Math.random() < 0.6 ? "Processing" : "Completed";
              return { ...d, status: nextStatus };
            } else if (d.status === "Processing") {
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

  const progressPct = useMemo(() => {
    return Math.min(100, Math.max(0, (fundingValue / 68025000000) * 100));
  }, [fundingValue]);

  return (
    <div className="w-full bg-slate-50 min-h-screen text-slate-900 font-sans pb-24 border-t border-slate-200">
      
      {/* 1. HERO HEADER AREA */}
      <div className="relative w-full overflow-hidden bg-slate-950 py-16 px-6 border-b border-emerald-500/10">
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-slate-950/70 to-black/85 z-0" />
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579684389783-bdf560104271?q=80&w=1600')" }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 font-mono text-[9px] uppercase tracking-widest font-black">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Live Global Sourcing Connection
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none">
            Live Donation Portal
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-semibold max-w-2xl">
            Real-time monitoring of humanitarian funding allocations, vetting commitments, and active zero-dilution system pipelines.
          </p>
        </div>
      </div>

      {/* 2. MAIN DASHBOARD CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-6">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-[#F4511E] bg-orange-50 px-2 py-0.5 rounded">Sovereign Compliance</span>
                <h3 className="text-base font-black text-slate-950 uppercase tracking-tight mt-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  Sourcing Audit Standard
                </h3>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                  Every pipeline commitment matches direct on-field infrastructure deployment. Our system registers, tracks, and maps all transaction channels to eliminate intermediary delays.
                </p>
              </div>

              <div className="border-t border-slate-100 pt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg text-emerald-600 shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Zero Dilution Assurance</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">100% of all siphoned donor funds directly fuel structural material, water wells, and diagnostic clinic systems.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg text-[#F4511E] shrink-0">
                    <Activity className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Algorithmic Vetting</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Transactions are logged and automatically cross-referenced with sovereign blockchain ledger values.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate("donate")}
                  className="w-full bg-[#F4511E] hover:bg-[#D84315] text-white font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-0.5 max-w-full truncate text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  Join Sourcing Support
                </button>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div id="live-donation-feed-portal" className="lg:col-span-8 bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)] text-slate-900 rounded-3xl p-4 sm:p-8 space-y-6">
            
            {/* LIVE DONATION ACTIVITY */}
            <div id="live-donation-activity-card" className="relative space-y-3 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_12px_36px_rgba(16,185,129,0.06)]">
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
    </div>
  );
};
