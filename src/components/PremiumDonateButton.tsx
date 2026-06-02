import React from "react";
import { Heart } from "lucide-react";

interface PremiumDonateButtonProps {
  onClick: () => void;
  lang?: string;
  className?: string;
  isMobile?: boolean;
  label?: string;
  isSmall?: boolean;
}

export const PremiumDonateButton: React.FC<PremiumDonateButtonProps> = ({
  onClick,
  lang = "en",
  className = "",
  isMobile = false,
  label,
  isSmall = false,
}) => {
  // Simple check for translated "Donate Now"
  const getLabel = () => {
    if (label) return label;
    if (lang === "fr") return "Faire un Don";
    if (lang === "es") return "Donar Ahora";
    if (lang === "ar") return "تبرع الآن";
    return "Donate Now";
  };

  const labelText = isSmall 
    ? getLabel() 
    : isMobile 
      ? (label ? label.toUpperCase() : "DONATE") 
      : getLabel();

  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center font-sans font-black tracking-widest uppercase rounded-full text-white transition-all duration-300 active:scale-95 cursor-pointer select-none overflow-hidden bg-gradient-to-r from-[#FF6B4A] via-[#F4511E] to-[#D82D03] border-t border-[#FFAB91]/30 hover:-translate-y-0.5 ${
        isSmall
          ? "px-5 py-2 text-[10px] space-x-2 shadow-lg hover:shadow-[0_8px_16px_rgba(244,81,30,0.5)]"
          : isMobile 
            ? "px-4.5 py-2 text-[10px] space-x-1.5 shadow-lg hover:shadow-[0_8px_16px_rgba(244,81,30,0.5)]" 
            : "px-6.5 py-3 text-xs space-x-2.5 shadow-xl hover:shadow-[0_12px_24px_rgba(244,81,30,0.5)]"
      } ${className}`}
    >
      <span className="relative flex items-center justify-center">
        <Heart 
          className={`${
            (isMobile || isSmall) ? "w-3.5 h-3.5" : "w-4.5 h-4.5"
          } text-white fill-white filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] z-10 transition-transform duration-300 group-hover:scale-110`} 
        />
      </span>
      <span className="relative z-10 drop-shadow-md">
        {labelText}
      </span>
    </button>
  );
};
