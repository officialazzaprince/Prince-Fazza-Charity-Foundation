import React, { useMemo } from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { GLOBAL_VOICES_MESSAGES, GlobalVoiceMessage } from "../data_global_voices";
import { ActivePage } from "../types";

interface GlobalVoicesShowcaseProps {
  onNavigate: (page: ActivePage) => void;
}

// Subtle positions representing global contributors on the world map layout of the background image
const indicators = [
  { top: "25%", left: "15%", label: "Tokyo, JP" },
  { top: "42%", left: "28%", label: "Mumbai, IN" },
  { top: "22%", left: "50%", label: "London, UK" },
  { top: "62%", left: "65%", label: "Seoul, KR" },
  { top: "35%", left: "82%", label: "New York, USA" },
  { top: "72%", left: "22%", label: "Sydney, AU" },
  { top: "48%", left: "42%", label: "Dubai, UAE" },
  { top: "58%", left: "15%", label: "Singapore, SG" },
  { top: "55%", left: "78%", label: "São Paulo, BR" },
];

export const GlobalVoicesShowcase: React.FC<GlobalVoicesShowcaseProps> = ({ onNavigate }) => {
  // Select a balanced mix of 10 highly impactful global voices
  const selectedVoices = useMemo(() => {
    const idsToSelect = [
      "asia-edu-1",   // Priya Sharma
      "asia-health-1", // Kenji Tanaka
      "euro-edu-1",   // Lukas Becker
      "euro-health-1", // Chloé Dubois
      "na-edu-1",     // Sarah Jenkins
      "na-youth-1",   // Marcus Green
      "sa-edu-1",     // Camila Silva
      "sa-youth-1",   // Thiago Silva
      "oce-health-1", // Alson Vula
      "me-edu-1",     // Fatma Al-Mansoori
    ];
    
    return GLOBAL_VOICES_MESSAGES.filter(msg => idsToSelect.includes(msg.id));
  }, []);

  // For a seamless horizontal loop, we repeat the items array twice
  const duplicatedVoices = useMemo(() => [
    ...selectedVoices,
    ...selectedVoices
  ], [selectedVoices]);

  return (
    <section className="bg-[#FCFCFC] py-10 md:py-12 font-sans relative overflow-hidden border-t border-slate-100">
      {/* 1. Header Area */}
      <div className="text-center max-w-3xl mx-auto px-4 mb-8 md:mb-10">
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-[40px] font-light text-[#333333] tracking-wider mb-4 uppercase"
        >
          Global Voices
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm md:text-base text-gray-500 font-light max-w-xl mx-auto leading-relaxed"
        >
          See what the world is saying. Perspectives, stories, and voices of hope and gratitude from around the globe.
        </motion.p>
      </div>

      {/* 2. Visual Container & Infinite Stream Overlay (Edge-to-Edge Canvas) */}
      <div className="relative w-full mb-2 h-[440px] md:h-[480px] overflow-hidden bg-[#111111] border-y border-slate-100/10 shadow-lg">
        
        {/* Background Image of Global Supporter Communities */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.imgur.com/lfSdYIa.png" 
            alt="Diverse supporter communities of Prince Fazza Charity Foundation"
            className="w-full h-full object-cover scale-[1.01] pointer-events-none select-none transition-transform duration-[12000ms] hover:scale-[1.04] opacity-50"
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
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/85 via-[#111111]/65 to-[#111111]/90" />
        </div>

        {/* Premium Left & Right Edge Fade Gradients for a seamless, movie-quality fade in/out */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 md:w-64 bg-gradient-to-r from-[#111111] via-[#111111]/85 to-transparent z-30 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 md:w-64 bg-gradient-to-l from-[#111111] via-[#111111]/85 to-transparent z-30 pointer-events-none" />

        {/* 3. Global Participation Visualization (Subtle Glowing Indicators) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {indicators.map((ind, i) => (
            <motion.div
              key={i}
              className="absolute hidden sm:block"
              style={{ top: ind.top, left: ind.left }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.7, 0.7, 0],
                scale: [0.9, 1.15, 1.15, 0.9]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 1.8,
                ease: "easeInOut"
              }}
            >
              <div className="relative flex items-center justify-center">
                {/* Outward pulsing ring */}
                <span className="absolute inline-flex h-6 w-6 rounded-full bg-[#F4511E]/30 animate-ping opacity-60"></span>
                {/* Secondary delay wave */}
                <span className="absolute inline-flex h-4 w-4 rounded-full bg-[#FF6E40]/20 animate-pulse"></span>
                {/* Core solid glowing node and shadow */}
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F4511E] shadow-[0_0_12px_#F4511E]"></span>
                
                {/* Tiny location label snippet */}
                <span className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/60 backdrop-blur-md rounded-md px-1.5 py-0.5 text-[9px] font-sans text-zinc-300 tracking-wider">
                  {ind.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4. Horizontal Scrolling Marquee */}
        <div className="absolute inset-x-0 top-[44%] -translate-y-1/2 z-20 flex flex-col justify-center overflow-hidden">
          {/* Top Ticker Style Track */}
          <div className="absolute top-0 right-10 flex items-center space-x-1.5 text-white/45 tracking-widest uppercase font-sans text-[10px] font-semibold pointer-events-none select-none px-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4511E] animate-ping" />
            <span>Appreciation Stream // Live Updates</span>
          </div>

          <div className="relative w-full flex items-center overflow-hidden select-none whitespace-nowrap border-y border-white/10 bg-black/95 py-6 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
            <div className="flex animate-marquee hover:pause whitespace-nowrap">
              {duplicatedVoices.map((voice, idx) => (
                <div 
                  key={`${voice.id}-${idx}`}
                  className="w-[280px] sm:w-[350px] md:w-[380px] shrink-0 inline-block bg-white/5 backdrop-blur-lg border border-white/10 hover:border-[#F4511E]/30 hover:scale-[1.015] hover:bg-white/10 rounded-2xl p-4 sm:p-5 md:p-6 shadow-[0_12px_45px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out mx-3 relative cursor-default"
                >
                  {/* Top author information */}
                  <div className="flex items-center justify-between mb-4 gap-2">
                    <div className="flex items-center space-x-3 overflow-hidden min-w-0 flex-1">
                      <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gradient-to-tr from-[#F4511E] to-[#FF6E40] text-white flex items-center justify-center font-bold text-xs sm:text-sm tracking-wide shadow-inner shrink-0">
                        {voice.name.charAt(0)}
                      </div>
                      <div className="text-left overflow-hidden min-w-0">
                        <h4 className="text-white text-[13px] sm:text-sm md:text-base font-semibold font-sans tracking-tight leading-tight truncate">{voice.name}</h4>
                        <p className="text-zinc-400 text-[10px] sm:text-xs font-sans tracking-wide mt-0.5 truncate">
                          {voice.city}, {voice.country} {voice.flag}
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#F4511E]/15 border border-[#F4511E]/25 text-[8.5px] sm:text-[9.5px] font-sans font-semibold uppercase text-[#FF6E40] tracking-wide shrink-0 truncate max-w-[45%]">
                      {voice.topic}
                    </span>
                  </div>

                  {/* Body Commentary */}
                  <p className="text-zinc-100 text-xs sm:text-[13px] md:text-[14px] leading-relaxed font-normal font-sans text-left whitespace-normal line-clamp-3 mb-4">
                    “{voice.message}”
                  </p>

                  {/* Stamp */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-3 text-[10px] text-zinc-400 font-sans font-medium">
                    <span className="flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#FF6E40]" />
                      <span>Verified Testimony</span>
                    </span>
                    <span>{voice.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. View All commentaries Button (Beautiful center call-to-action) */}
        <div className="absolute bottom-8 inset-x-0 text-center z-20 flex flex-col items-center px-4">
          <button 
            onClick={() => onNavigate("global-voices")}
            className="group flex items-center space-x-3 bg-[#F4511E] hover:bg-[#D84315] hover:scale-[1.03] text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-xl shadow-[#F4511E]/20 hover:shadow-[#F4511E]/40"
          >
            <span>View All Commentaries</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Styled animation tag inside component to bypass external CSS requirement */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 140s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
