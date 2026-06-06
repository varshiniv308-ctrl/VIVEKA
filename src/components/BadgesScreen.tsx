import React from "react";
import { ArrowLeft, Flame, Award, Lock, Sparkles, CheckCircle2 } from "lucide-react";
import { UserProfile, Badge, Milestone } from "../types";
import { STATIC_BADGES } from "../services/db";
import { translations, SupportedLang } from "../data/translations";

interface BadgesScreenProps {
  currentUser: UserProfile;
  onGoBack: () => void;
  onNavigate: (tab: "home" | "leaders" | "badges" | "profile") => void;
  lang: SupportedLang;
}

// Localized mapping for badge details to support proper translation
export function getLocalizedBadge(badge: Badge, lang: SupportedLang): Badge {
  const badgeLocalizations: Record<string, Record<SupportedLang, { name: string; req: string }>> = {
    badge_first: {
      en: { name: "First Quiz", req: "Complete any quiz category." },
      kn: { name: "ಮೊದಲ ರಸಪ್ರಶ್ನೆ", req: "ಯಾವುದೇ ರಸಪ್ರಶ್ನೆ ವಿಭಾಗವನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ." },
      hi: { name: "पहला प्रश्नोत्तरी", req: "किसी भी प्रश्नोत्तरी श्रेणी को पूरा करें।" },
      te: { name: "మొదటి క్విజ్", req: "ఏదైనా క్విజ్ కేటగిరీని పూర్తి చేయండి." },
      ta: { name: "முதல் வினாடிவினா", req: "ஏதேனும் ஒரு வினாடி வினா பிரிவை முடிக்கவும்." }
    },
    badge_streak: {
      en: { name: "7-Day Streak", req: "Participate in a learning streak." },
      kn: { name: "೭-ದಿನಗಳ ಧರ್ಮ ಸರಣಿ", req: "ನಿರಂತರ ಕಲಿಕೆಯ ಸರಣಿಯಲ್ಲಿ भागವಹಿಸಿ." },
      hi: { name: "७-दिवसीय स्ट्रीक", req: "एक सीखने की स्ट्रीक में भाग लें।" },
      te: { name: "౭-రోజుల నిరంతర సాధన", req: "నిరంతర అభ్యాస సాధనలో పాల్గొనండి." },
      ta: { name: "௭-நாள் தொடர்", req: "தொடர்ச்சியான கற்றல் தொடரில் பங்கேற்கவும்." }
    },
    badge_master: {
      en: { name: "Topic Master", req: "Answer 10/10 questions correct." },
      kn: { name: "ವಿಷಯ ಪ್ರವೀಣ", req: "೧೦/೧೦ ಪ್ರಶ್ನೆಗಳಿಗೆ ಸರಿಯಾಗಿ ಉತ್ತರಿಸಿ." },
      hi: { name: "विषय विशेषज्ञ", req: "१०/१० प्रश्नों के सही उत्तर दें।" },
      te: { name: "విషయ నిపుణుడు", req: "౧౦/౧౦ ప్రశ్నలకు సరైన సమాధానాలు ఇవ్వండి." },
      ta: { name: "தலைப்பு மாஸ்டர்", req: "௧௦/௦ கேள்விகளுக்கு சரியாக பதிலளிக்கவும்." }
    },
    badge_scholar: {
      en: { name: "Scholar", req: "Complete 10 total quizzes." },
      kn: { name: "ವಿದ್ವಾಂಸ", req: "ಒಟ್ಟು ೧೦ ರಸಪ್ರಶ್ನೆಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ." },
      hi: { name: "विद्वान", req: "कुल १० प्रश्नोत्तरियों को पूरा करें।" },
      te: { name: "విద్వాంసుడు", req: "మొత్తం ౧౦ క్విజ్‌లను పూర్తి చేయండి." },
      ta: { name: "அறிஞர்", req: "மொத்தம் ௧௦ வினாடி வினாக்களை முடிக்கவும்." }
    },
    badge_grandmaster: {
      en: { name: "Grandmaster", req: "Earn a total score of 5,000 points." },
      kn: { name: "ಮಹಾ ತಜ್ಞ", req: "ಒಟ್ಟು ೫,೦೦೦ ಅಂಕಗಳನ್ನು ಗಳಿಸಿ." },
      hi: { name: "महागुरु", req: "कुल ५,००० अंक अर्जित करें।" },
      te: { name: "మహా విద్వాంసుడు", req: "మొత్తం ౫,౦౦౦ పాయింట్లు సాధించండి." },
      ta: { name: "கிராண்ட்மாஸ்டர்", req: "மொத்தம் ௫,௦௦௦ புள்ளிகளைப் பெறவும்." }
    },
    badge_science: {
      en: { name: "Alchemist", req: "Complete a Science or Technology quiz." },
      kn: { name: "ರಸವಿದ್ಯೆಗಾರ", req: "ವಿಜ್ಞಾನ ಅಥವಾ ತಂತ್ರಜ್ಞಾನ ರಸಪ್ರಶ್ನೆ ಪೂರ್ಣಗೊಳಿಸಿ." },
      hi: { name: "कीमियागर", req: "विज्ञान या तकनीक प्रश्नोत्तरी पूरी करें।" },
      te: { name: "కీమియాగారు", req: "సైన్స్ లేదా సాంకేతిక క్విజ్ పూర్తి చేయండి." },
      ta: { name: "அல்கெமிสต์", req: "அறிவியல் அல்லது தொழில்நுட்ப வினாடி வினா முடிக்கவும்." }
    }
  };

  const localizedAttr = badgeLocalizations[badge.id]?.[lang] || badgeLocalizations[badge.id]?.en;
  if (localizedAttr) {
    return {
      ...badge,
      name: localizedAttr.name,
      requirementDescription: localizedAttr.req
    };
  }
  return badge;
}

export default function BadgesScreen({ currentUser, onGoBack, onNavigate, lang }: BadgesScreenProps) {
  const t = translations[lang] || translations.en;
  
  // Calculate which badges are unlocked dynamically from the user profile
  const userUnlockedIds = currentUser.unlockedBadgeIds || [];
  
  const mappedBadges: Badge[] = STATIC_BADGES.map(badge => {
    const isUnlocked = userUnlockedIds.includes(badge.id);
    return getLocalizedBadge({ ...badge, isUnlocked }, lang);
  });

  const milestoneSuggestion = lang === "kn" 
    ? "ವಿಷಯ ಪ್ರವೀಣ ಪದಕವನ್ನು ಗಳಿಸಲು ಇನ್ನೂ ೩ ರಸಪ್ರಶ್ನೆಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ!"
    : lang === "hi" 
    ? "विषय विशेषज्ञ पदक अर्जित करने के लिए ३ और प्रश्नोत्तरी पूरी करें!"
    : lang === "te" 
    ? "విషయ నిపుణుడు బ్యాడ్జ్ పొందడానికి మరో ౩ క్విజ్‌లను పూర్తి చేయండి!"
    : lang === "ta" 
    ? "தலைப்பு மாஸ்டர் பேட்ஜைப் பெற மேலும் ௩ வினாடி வினாக்களை முடிக்கவும்!"
    : "Complete 3 more quizzes to earn the Topic Master badge!";

  // Standard milestones listing
  const sampleMilestones: Milestone[] = [
    {
      id: "m_1",
      title: t.milestone1Title,
      description: t.milestone1Desc,
      unlockedAt: currentUser.createdAt
    },
    {
      id: "m_2",
      title: t.milestone2Title,
      description: t.milestone2Desc,
      unlockedAt: Date.now() - 172800000 // 2 days ago
    }
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#fcf9f8] text-[#1c1b1b] pb-24">
      
      {/* Top Header App bar */}
      <header className="fixed top-0 left-0 right-0 h-16 w-full max-w-md mx-auto bg-white/80 backdrop-blur-xl border-b border-[#dbc2b0]/20 z-50 flex items-center justify-between px-5 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={onGoBack}
            className="text-[#8f4e00] hover:bg-[#ff9933]/15 transition-colors p-2 rounded-full active:scale-95 duration-150 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-sans text-xl font-bold text-[#8f4e00]">{t.badges}</span>
        </div>
        <div className="bg-[#ff9933]/15 px-3 py-1 rounded-full flex items-center gap-1 font-semibold text-[#8f4e00] text-sm">
          <Flame className="w-4 h-4 fill-[#ff9933]" />
          <span>{currentUser.streak || 5}</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="pt-20 px-5 w-full max-w-md mx-auto space-y-6 flex-grow">
        
        {/* Progress summary card */}
        <section className="bg-white/60 backdrop-blur-md rounded-3xl p-5 border border-white/40 shadow-sm relative overflow-hidden mt-4">
          <div className="relative z-10 font-sans">
            <div className="flex justify-between items-end mb-2">
              <div>
                <p className="text-[10px] font-black text-[#ff9933] uppercase tracking-widest leading-none mb-1">
                  {t.currentJourney}
                </p>
                <h2 className="font-sans text-xl font-extrabold text-[#1c1b1b]">
                  {currentUser.points >= 3000 ? t.scholarTitle : t.explorerTitle}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-[#ff9933]">85%</span>
              </div>
            </div>

            {/* Custom Progress bar */}
            <div className="h-3 w-full bg-[#ebe7e7] rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-gradient-to-r from-[#2552ca] to-[#ff9933] rounded-full transition-all duration-1000 ease-out" 
                style={{ width: "85%" }} 
              />
            </div>
            
            <p className="text-xs text-[#554336] leading-relaxed">
              {milestoneSuggestion}
            </p>
          </div>
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-[#ff9933]/5 rounded-full blur-2xl" />
        </section>

        {/* Badges Grid Hall of Badges */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-sans text-base font-extrabold text-[#1c1b1b]">
              {t.hallOfBadges}
            </h3>
            <span className="text-[10px] font-semibold text-[#554336] bg-[#f0edec] px-2.5 py-1 rounded">
              {userUnlockedIds.length}/{mappedBadges.length} {t.earned}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {mappedBadges.map((badge) => (
              <div 
                key={badge.id}
                className="flex flex-col items-center space-y-2 relative group animate-fade-in"
              >
                {/* Rounded frame wrapper */}
                <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 border-dashed shadow-sm transition-all duration-300 relative ${badge.isUnlocked ? "bg-white border-[#ff9933]/80" : "bg-[#f0edec]/80 border-[#dbc2b0] grayscale opacity-50"}`}>
                  <div className={`absolute -bottom-1 -right-1 rounded-full p-0.5 border border-white ${badge.isUnlocked ? "bg-[#50c878] text-white" : "bg-gray-400 text-white"}`}>
                    <span className="material-symbols-outlined text-[10px] block font-black">
                      {badge.isUnlocked ? "check" : "lock"}
                    </span>
                  </div>
                  {/* Badge Icons */}
                  <span className={`text-3xl ${badge.isUnlocked ? "text-[#ff9933]" : "text-[#887364]"}`}>
                    {badge.id === "badge_first" && "🚀"}
                    {badge.id === "badge_streak" && "⚡"}
                    {badge.id === "badge_master" && "🎖️"}
                    {badge.id === "badge_scholar" && "🎓"}
                    {badge.id === "badge_grandmaster" && "👑"}
                    {badge.id === "badge_science" && "🧪"}
                  </span>
                </div>
                <div className="text-center font-sans">
                  <p className="text-[10px] font-bold text-[#1c1b1b] leading-tight line-clamp-1">
                    {badge.name}
                  </p>
                  <p className="text-[8px] text-[#887364] line-clamp-2 mt-0.5 max-w-[70px] leading-none">
                    {badge.isUnlocked ? t.active : badge.requirementDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Milestones feed */}
        <section className="space-y-3">
          <h3 className="font-sans text-base font-extrabold text-[#1c1b1b]">
            {t.milestones}
          </h3>
          <div className="space-y-3 font-sans">
            {sampleMilestones.map((ms) => (
              <div 
                key={ms.id} 
                className="bg-white/50 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 border-l-4 border-l-[#50c878] border-y border-r border-white/40 shadow-sm"
              >
                <div className="p-2 bg-[#50c878]/10 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#006d36]" />
                </div>
                <div className="flex-grow text-left">
                  <h4 className="text-xs font-bold text-[#1c1b1b]">{ms.title}</h4>
                  <p className="text-[10px] text-[#554336] mt-0.5">{ms.description}</p>
                </div>
                <div className="text-[9px] text-[#887364] whitespace-nowrap">
                  {new Date(ms.unlockedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Bento Grid indicators */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-white/50 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between h-28 border border-white/40">
            <span className="material-symbols-outlined text-[#ff9933] text-lg font-black leading-none bg-[transparent]">local_fire_department</span>
            <div className="text-left mt-2 font-sans">
              <p className="text-3xl font-extrabold text-[#ff9933] leading-none mb-1">{currentUser.streak || 5}</p>
              <p className="text-[9px] font-bold text-[#887364] uppercase tracking-widest">{t.streak}</p>
            </div>
          </div>
          <div className="bg-white/50 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between h-28 border border-white/40">
            <span className="material-symbols-outlined text-[#2552ca] text-lg font-black leading-none bg-[transparent] font-semibold">psychology</span>
            <div className="text-left mt-2 font-sans">
              <p className="text-3xl font-extrabold text-[#2552ca] leading-none mb-1">{currentUser.points || 0}</p>
              <p className="text-[9px] font-bold text-[#887364] uppercase tracking-widest">{t.points}</p>
            </div>
          </div>
        </section>

      </main>

      {/* Styled Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 w-full z-50 bg-white/90 backdrop-blur-md border-t border-[#dbc2b0]/20 py-2.5 px-4 max-w-md mx-auto flex justify-between items-center rounded-t-3xl shadow-lg">
        <button 
          onClick={() => onNavigate("home")}
          className="flex flex-col items-center justify-center text-[#554336] p-2 hover:bg-[#ebe7e7] rounded-xl transition-colors"
        >
          <span className="material-symbols-outlined text-md">home</span>
          <span className="text-[10px] font-semibold">{t.home}</span>
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
          className="flex flex-col items-center justify-center bg-[#ff9933] text-white rounded-full px-5 py-2 transition-transform active:scale-90"
        >
          <Award className="w-5 h-5 mb-0.5 text-white" />
          <span className="text-[10px] font-bold">{t.badges}</span>
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
