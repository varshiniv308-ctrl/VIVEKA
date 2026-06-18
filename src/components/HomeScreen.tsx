import React from "react";
import { BookOpen, Swords, Scroll, Landmark, Atom, Percent, Cpu, Globe, Flame, Award, Sparkles, MessageCircle, Play } from "lucide-react";
import { UserProfile, QuizCategory } from "../types";
import { translations } from "../data/translations";

interface HomeScreenProps {
  user: UserProfile;
  onSelectCategory: (category: QuizCategory) => void;
  onNavigate: (tab: "home" | "leaders" | "badges" | "profile") => void;
  onNavExtra: (extra: "ai-chat" | "ai-quiz-builder" | "daily-challenge") => void;
}

export default function HomeScreen({ user, onSelectCategory, onNavigate, onNavExtra }: HomeScreenProps) {
  const lang = user.language || "en";
  const t = translations[lang] || translations.en;

  // Category card configurations with elegant colors & corresponding icon mapping
  const CATEGORY_INFOS = [
    {
      category: QuizCategory.RAMAYANA,
      color: "bg-[#FFE5D4]",
      textColor: "text-[#8F4E00]",
      icon: <BookOpen className="w-8 h-8" />
    },
    {
      category: QuizCategory.MAHABHARATA,
      color: "bg-[#DCE1FF]",
      textColor: "text-[#2552CA]",
      icon: <Swords className="w-8 h-8" />
    },
    {
      category: QuizCategory.BHAGAVAD_GITA,
      color: "bg-[#E8F5E9]",
      textColor: "text-[#2E7D32]",
      icon: <Scroll className="w-8 h-8" />,
      tagline: lang === "kn" ? "೭೦೦ ಜ್ಞಾನ ಶ್ಲೋಕಗಳು" : lang === "hi" ? "700 ज्ञान श्लोक" : "700 Verses of Wisdom",
      isFullWidth: true
    },
    {
      category: QuizCategory.INDIAN_HISTORY,
      color: "bg-[#ebe7e7]",
      textColor: "text-[#554336]",
      icon: <Landmark className="w-8 h-8" />
    },
    {
      category: QuizCategory.INDIAN_CULTURE,
      color: "bg-[#ffdcc2]",
      textColor: "text-[#8f4e00]",
      icon: <span className="text-2xl">🕉️</span>
    },
    {
      category: QuizCategory.SCIENCE,
      color: "bg-[#e2f0fd]",
      textColor: "text-[#2552ca]",
      icon: <Atom className="w-8 h-8" />
    },
    {
      category: QuizCategory.MATHEMATICS,
      color: "bg-[#ffdad6]",
      textColor: "text-[#ba1a1a]",
      icon: <Percent className="w-8 h-8" />
    },
    {
      category: QuizCategory.TECHNOLOGY,
      color: "bg-[#83fba5]/20",
      textColor: "text-[#006d36]",
      icon: <Cpu className="w-8 h-8" />
    },
    {
      category: QuizCategory.GEOGRAPHY,
      color: "bg-[#f3f0ef]",
      textColor: "text-[#313030]",
      icon: <Globe className="w-8 h-8" />
    },
    {
      category: QuizCategory.GENERAL_KNOWLEDGE,
      color: "bg-[#ffdcc2]/50",
      textColor: "text-[#693800]",
      icon: <span className="text-2xl">💡</span>
    }
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#fcf9f8] text-[#1c1b1b] pb-24">
      {/* Header element bar */}
      <header className="fixed top-0 left-0 right-0 h-16 w-full max-w-md mx-auto bg-white/80 backdrop-blur-xl border-b border-[#dbc2b0]/20 z-50 flex items-center justify-between px-5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#8f4e00] text-2xl">menu</span>
          <h1 className="font-sans text-xl font-extrabold text-[#8f4e00] tracking-wide">VIVEKA</h1>
        </div>
        <div className="bg-[#ff9933]/15 text-[#8f4e00] px-3.5 py-1 rounded-full font-sans text-sm font-bold flex items-center gap-1">
          <Flame className="w-4 h-4 text-[#ff9933] fill-[#ff9933]" />
          <span>{user.streak ?? 0}</span>
        </div>
      </header>

      {/* Main container scrollable */}
      <main className="max-w-md mx-auto px-5 pt-20 flex-grow w-full">
        
        {/* Welcome Section */}
        <section className="mt-6 mb-6 text-left">
          <h2 className="font-sans text-3xl font-extrabold text-[#1c1b1b] leading-tight">
            {t.welcomeBack} {user.displayName}!
          </h2>
          <p className="text-[#554336] text-xs font-semibold mt-1">
            {t.exploreCategories}
          </p>
        </section>

        {/* User Stats Bento Info cards */}
        <section className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/50 backdrop-blur-md p-4 rounded-3xl border border-white/40 flex items-center gap-4 shadow-sm text-left">
            <div className="w-12 h-12 rounded-full bg-[#2552ca]/10 flex items-center justify-center text-[#2552ca] shrink-0">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#887364] uppercase tracking-wider">{t.points}</p>
              <p className="font-sans text-lg font-extrabold text-[#2552ca] leading-none mt-0.5">{user.points?.toLocaleString() ?? "0"}</p>
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-md p-4 rounded-3xl border border-white/40 flex items-center gap-4 shadow-sm text-left">
            <div className="w-12 h-12 rounded-full bg-[#ff9933]/10 flex items-center justify-center text-[#ff9933] shrink-0">
              <Flame className="w-6 h-6 fill-[#ff9933]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#887364] uppercase tracking-wider">{t.currentStreak}</p>
              <p className="font-sans text-lg font-extrabold text-[#ff9933] leading-none mt-0.5">{user.streak ?? 0} {t.days}</p>
            </div>
          </div>
        </section>

        {/* Quick Launch Guru AI Tools Shortcut bar */}
        <section className="bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-white/40 shadow-sm space-y-3 mb-6 text-left">
          <h3 className="text-[11px] font-black text-[#554336] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4.5 h-4.5 text-[#ff9933] animate-pulse" />
            <span>AI Wisdom Accelerators</span>
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavExtra("ai-chat")}
              className="p-3 bg-[#ff9933]/10 hover:bg-[#ff9933]/15 text-[#8f4e00] rounded-2xl flex flex-col items-center justify-center text-center gap-1.5 transition-all active:scale-95 border border-[#ff9933]/10"
            >
              <MessageCircle className="w-5 h-5 text-[#ff9933]" />
              <span className="text-[10px] font-black">{t.aiChat}</span>
            </button>
            <button
              onClick={() => onNavExtra("ai-quiz-builder")}
              className="p-3 bg-[#2552ca]/10 hover:bg-[#2552ca]/15 text-[#2552ca] rounded-2xl flex flex-col items-center justify-center text-center gap-1.5 transition-all active:scale-95 border border-[#2552ca]/10"
            >
              <Cpu className="w-5 h-5 text-[#2552ca]" />
              <span className="text-[10px] font-black">{t.aiQuizGen}</span>
            </button>
          </div>
        </section>

        {/* Daily Challenge Card banner */}
        <section className="mb-8">
          <div className="relative overflow-hidden rounded-3xl h-48 group shadow-lg">
            {/* Visual depiction background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#8f4e00] to-[#2552ca] opacity-80 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-300 via-orange-600 to-indigo-800" />
            <div className="absolute inset-0 opacity-15 bg-[url('https://api.dicebear.com/7.x/identicon/svg?seed=temple')] bg-repeat" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-20 text-left">
              <span className="bg-[#ff9933] text-white px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-2 w-max shadow-sm">
                {t.dailyChallenge}
              </span>
              <h3 className="font-sans text-sm font-black leading-tight mb-3">
                {lang === "kn" 
                  ? "ಜ್ಯೋತಿರ್ವಿಜ್ಞಾನ ಹಾಗೂ ದೈನಂದಿನ ಗಣಿತ ಜ್ಞಾನ ಸವಾಲು" 
                  : lang === "hi" 
                  ? "ज्योतिर्विज्ञान तथा दैनिक गणित ज्ञान चुनौती"
                  : "Unique dynamic Vedic trivia and scientific discovery challenge"}
              </h3>
              <button 
                onClick={() => onNavExtra("daily-challenge")}
                className="bg-[#ff9933] text-white hover:bg-[#ff9933]/90 px-5 py-2.5 rounded-2xl font-black text-xs flex items-center gap-1.5 w-max active:scale-95 transition-transform"
              >
                <span>{lang === "kn" ? "ಸವಾಲು ಆರಂಭಿಸಿ (+100 ಅಂಕಗಳು)" : lang === "hi" ? "चुनौती शुरू करें (+100 अंक)" : "Play Challenge (+100 Extra points)"}</span>
                <Play className="w-3.5 h-3.5 fill-white" />
              </button>
            </div>
          </div>
        </section>

        {/* Category Grid Bento Layout */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-sans text-base font-extrabold text-[#1c1b1b]">
              {lang === "kn" ? "ಪವಿತ್ರ ಜ್ಞಾನ ವಿಭಾಗಗಳು" : lang === "hi" ? "ज्ञान वर्ग" : "Wisdom Category Quizzes"}
            </h3>
            <span className="text-[10px] font-black text-[#8f4e00] bg-[#ff9933]/15 px-2.5 py-1 rounded-full uppercase tracking-wider">
              10 Topics Listed
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {CATEGORY_INFOS.map((item) => {
              if (item.isFullWidth) {
                return (
                  <button 
                    key={item.category}
                    onClick={() => onSelectCategory(item.category)}
                    className="col-span-2 bg-white/50 backdrop-blur-md p-5 rounded-3xl border border-white/40 flex items-center justify-between text-left hover:bg-white/80 active:scale-95 transition-all shadow-sm group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center ${item.textColor} shadow-sm group-hover:scale-105 transition-transform shrink-0`}>
                        {item.icon}
                      </div>
                      <div>
                        <span className="font-sans text-sm font-bold text-[#1c1b1b] block">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-[#554336] opacity-90 font-semibold block mt-0.5">
                          {item.tagline}
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#887364]">chevron_right</span>
                  </button>
                );
              }

              return (
                <button 
                  key={item.category}
                  onClick={() => onSelectCategory(item.category)}
                  className="bg-white/50 backdrop-blur-md p-5 rounded-3xl border border-white/40 flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:bg-white/80 active:scale-95 transition-all shadow-sm group"
                >
                  <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center ${item.textColor} shadow-sm group-hover:scale-105 transition-transform shrink-0`}>
                    {item.icon}
                  </div>
                  <span className="font-sans text-[11px] font-extrabold text-[#554336] line-clamp-1">
                    {item.category}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

      </main>

      {/* Styled Responsive Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 w-full z-50 bg-white/90 backdrop-blur-md border-t border-[#dbc2b0]/20 py-2.5 px-4 max-w-md mx-auto flex justify-between items-center rounded-t-3xl shadow-lg">
        <button 
          onClick={() => onNavigate("home")}
          className="flex flex-col items-center justify-center bg-[#ff9933] text-white rounded-full px-5 py-2 transition-transform active:scale-90"
        >
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[10px] font-bold">{t.home}</span>
        </button>

        <button 
          onClick={() => onNavigate("leaders")}
          className="flex flex-col items-center justify-center text-[#554336] p-2 hover:bg-[#ebe7e7] rounded-xl transition-colors"
        >
          <span className="material-symbols-outlined text-md">leaderboard</span>
          <span className="text-[10px] font-semibold">{t.leaderboard}</span>
        </button>

        <button 
          onClick={() => onNavigate("badges")}
          className="flex flex-col items-center justify-center text-[#554336] p-2 hover:bg-[#ebe7e7] rounded-xl transition-colors"
        >
          <Award className="w-5 h-5 mb-0.5 text-gray-700" />
          <span className="text-[10px] font-semibold">{t.badges}</span>
        </button>

        <button 
          onClick={() => onNavigate("profile")}
          className="flex flex-col items-center justify-center text-[#554336] p-2 hover:bg-[#ebe7e7] rounded-xl transition-colors"
        >
          <span className="material-symbols-outlined text-md">person</span>
          <span className="text-[10px] font-semibold">{t.profile}</span>
        </button>
      </nav>
    </div>
  );
}
