import React, { useState, useEffect } from "react";
import { Sparkles, Trophy, Globe } from "lucide-react";
import { translations, SupportedLang } from "../data/translations";

interface WelcomeScreenProps {
  onStart: () => void;
  lang: SupportedLang;
  onLangChange: (lang: SupportedLang) => void;
}

export default function WelcomeScreen({ onStart, lang, onLangChange }: WelcomeScreenProps) {
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const t = translations[lang] || translations.en;

  useEffect(() => {
    // Trigger entrance transitions immediately after mounting
    setIsMounted(true);

    // Elegant minor delay to give a "premium initial setup" feel
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#fcf9f8] font-sans text-[#1c1b1b]">
      {/* Floating Language Selector */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#dbc2b0]/30 shadow-sm">
        <Globe className="w-3.5 h-3.5 text-[#ff9933]" />
        <select
          value={lang}
          onChange={(e) => onLangChange(e.target.value as SupportedLang)}
          className="bg-transparent text-xs font-bold text-[#554336] focus:outline-none cursor-pointer"
        >
          <option value="en">English</option>
          <option value="kn">ಕನ್ನಡ</option>
          <option value="hi">हिन्दी</option>
          <option value="te">తెలుగు</option>
          <option value="ta">தமிழ்</option>
        </select>
      </div>

      {/* Dynamic Ambient Blur Mesh Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#ff9933]/15 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#2552ca]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Header element to center perfectly */}
      <div className="h-4 z-10" />

      {/* Main Column */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        
        {/* Animated Brand Vector Container */}
        <div 
          className={`mb-8 relative group transition-all duration-1000 ease-out transform ${
            isMounted ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-[#ff9933]/25 blur-3xl rounded-full scale-125 group-hover:scale-150 transition-transform duration-700" />
          
          <div 
            className="relative w-36 h-36 md:w-44 md:h-44 bg-gradient-to-tr from-[#ff9933] to-[#ffdcc2] p-0.5 rounded-3xl shadow-xl flex items-center justify-center animate-bounce"
            style={{ animationDuration: "4s", animationTimingFunction: "ease-in-out" }}
          >
            {/* Scroll/Compass styled layout inside */}
            <div className="w-full h-full bg-[#fcf9f8] rounded-3xl flex flex-col items-center justify-center p-4">
              <span className="text-5xl">🧭</span>
              <div className="mt-2 w-8 h-1 bg-[#ff9933] rounded-full" />
              <div className="mt-1 flex gap-1">
                <span className="w-1.5 h-1.5 bg-[#2552ca] rounded-full" />
                <span className="w-1.5 h-1.5 bg-[#ff9933] rounded-full" />
                <span className="w-1.5 h-1.5 bg-[#50c878] rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Text Area */}
        <div
          className={`space-y-4 max-w-sm transition-all duration-1000 delay-300 ease-out transform ${
            isMounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <h1 className="font-sans text-5xl md:text-6xl font-extrabold tracking-tight text-[#ff9933] drop-shadow-sm leading-tight">
            {t.brand}
          </h1>
          <p className="font-sans text-lg text-[#554336] leading-relaxed mx-auto max-w-[280px]">
            {t.slogan}
          </p>
        </div>

        {/* Dynamic Launch Controls */}
        <div className="mt-12 w-full max-w-xs h-16 flex items-center justify-center">
          {loading ? (
            <div 
              className="flex items-center gap-2 text-[#8f4e00] transition-opacity duration-300"
            >
              <div className="w-6 h-6 border-3 border-[#8f4e00]/20 border-t-[#ff9933] rounded-full animate-spin" />
              <span className="text-xs font-semibold uppercase tracking-widest opacity-80 animate-pulse">
                {t.aligningChakras}
              </span>
            </div>
          ) : (
            <button
              onClick={onStart}
              className="w-full h-14 bg-gradient-to-r from-[#ff9933] to-[#ffb77a] text-white font-bold text-lg rounded-2xl shadow-lg shadow-[#ff9933]/25 flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all duration-300 transform scale-100 opacity-100 animate-pulse-gentle animate-pulse"
            >
              <span>{t.beginBtn}</span>
              <Sparkles className="w-5 h-5 text-[#ffdcc2]" />
            </button>
          )}
        </div>
      </main>

      {/* Certified Quality Footer Badge */}
      <footer className="relative z-10 pb-8 text-center px-4">
        <div
          className={`inline-flex items-center gap-1.5 px-4 py-2 border border-white/20 bg-white/40 backdrop-blur-md rounded-full shadow-inner transition-opacity duration-1000 delay-700 ${
            isMounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <Trophy className="w-4 h-4 text-[#2552ca]" />
          <span className="text-xs font-semibold text-[#554336] tracking-wide">
            {t.summoning.replace("...", "")}
          </span>
        </div>
      </footer>
    </div>
  );
}
