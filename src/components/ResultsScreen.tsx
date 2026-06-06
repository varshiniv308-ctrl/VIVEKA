import React, { useEffect, useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, Home, Download, Share2 } from "lucide-react";
import { Badge } from "../types";
import { translations, SupportedLang } from "../data/translations";
import { getLocalizedBadge } from "./BadgesScreen";

interface ResultsScreenProps {
  correctCount: number;
  totalCount: number;
  xpGained: number;
  pointsGained: number;
  newlyUnlockedBadges: Badge[];
  activeBadges: Badge[];
  onPlayAgain: () => void;
  onGoHome: () => void;
  studentUid: string;
  studentName: string;
  lang?: SupportedLang;
}

export default function ResultsScreen({
  correctCount,
  totalCount,
  xpGained,
  pointsGained,
  newlyUnlockedBadges,
  activeBadges,
  onPlayAgain,
  onGoHome,
  studentUid,
  studentName,
  lang = "en"
}: ResultsScreenProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [sharing, setSharing] = useState(false);
  
  const t = translations[lang] || translations.en;

  // Trigger confetti particles
  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const percentage = totalCount > 0 ? (correctCount / totalCount) * 100 : 0;
  const strokeOffset = 314 - (314 * percentage) / 100;

  // Ultra-crisp high-resolution Certificate generator
  const handleDownloadCertificate = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1600;
    canvas.height = 1100;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background filling warm elegant cream
    ctx.fillStyle = "#faf3ef";
    ctx.fillRect(0, 0, 1600, 1100);

    // Elegant Double gold boundaries
    ctx.strokeStyle = "#8f4e00";
    ctx.lineWidth = 14;
    ctx.strokeRect(40, 40, 1520, 1020);
    ctx.strokeStyle = "#ff9933";
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 60, 1480, 980);

    // Corner decorative markers
    ctx.fillStyle = "#8f4e00";
    ctx.font = "italic 32px serif";
    ctx.fillText("⚜", 100, 120);
    ctx.fillText("⚜", 1500, 120);
    ctx.fillText("⚜", 100, 980);
    ctx.fillText("⚜", 1500, 980);

    const fontStack = `"Inter", "Noto Sans", "Noto Sans Kannada", "Noto Sans Devanagari", "Noto Sans Telugu", "Noto Sans Tamil", "Segoe UI", sans-serif`;

    // Title
    ctx.textAlign = "center";
    ctx.fillStyle = "#8f4e00";
    ctx.font = `bold 62px ${fontStack}`;
    ctx.fillText(t.certOfAchievement, 800, 220);

    ctx.fillStyle = "#554336";
    ctx.font = `28px ${fontStack}`;
    ctx.fillText(t.certSubtitle, 800, 290);

    // Subtitle phrase
    ctx.fillStyle = "#887364";
    ctx.font = `italic 26px ${fontStack}`;
    ctx.fillText(t.certThisIsToCertify, 800, 390);

    // Name
    ctx.fillStyle = "#1c1b1b";
    ctx.font = `bold 72px ${fontStack}`;
    ctx.fillText(studentName || "Noble Seeker", 800, 500);

    // Main context
    ctx.fillStyle = "#554336";
    ctx.font = `26px ${fontStack}`;
    ctx.fillText(`${t.certSecuredPoints} ${pointsGained} ${t.points},`, 800, 610);
    
    const subphrase = lang === "kn" ? "ವಿವೇಕ ಜ್ಞಾನ ಪೀಠದ ಅಡಿಯಲ್ಲಿ ಜ್ಞಾನಾರ್ಜನೆಯ ಯಶಸ್ಸಿಗೆ ಈ ಸಾಧನೆಯನ್ನು ಗೌರವಿಸಲಾಗುತ್ತದೆ."
      : lang === "hi" ? "विवेक ज्ञान पीठ के अंतर्गत ज्ञानार्जन की सफलता के लिए इस उपलब्धि को सम्मानित किया जाता है।"
      : lang === "te" ? "వివేక జ్ఞాన పీఠం ఆధ్వర్యంలో జ్ఞానార్జన విజయానికి ఈ గుర్తింపు ప్రదానం చేయబడింది."
      : lang === "ta" ? "விவேகா அறிவு பீடத்தின் கீழ் இந்த ஞான சாதனைக்காக இஃது அங்கீகரிக்கப்பட்டுள்ளது."
      : "demonstrating exemplary performance in the pursuit of absolute knowledge.";
    ctx.fillText(subphrase, 800, 655);

    // Seal icon
    ctx.beginPath();
    ctx.arc(800, 800, 75, 0, 2 * Math.PI);
    ctx.fillStyle = "#ff9933";
    ctx.fill();
    ctx.strokeStyle = "#8f4e00";
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = `bold 24px ${fontStack}`;
    ctx.fillText("VIVEKA", 800, 790);
    ctx.font = `bold 14px ${fontStack}`;
    ctx.fillText("WISDOM", 800, 815);

    // Signatures
    ctx.fillStyle = "#8f4e00";
    ctx.font = `bold italic 22px ${fontStack}`;
    const guruName = lang === "kn" ? "ಚಾಣಕ್ಯ ಶಾಸ್ತ್ರಿ (ಗುರು)"
      : lang === "hi" ? "चाणक्य शास्त्री (गुरु)"
      : lang === "te" ? "చాణక్య శాస్త్రి (గురువు)"
      : lang === "ta" ? "சாணக்கிய சாஸ்திரி (குரு)"
      : "Chanakya Shastri (Guru)";
    ctx.fillText(guruName, 350, 850);
    
    ctx.beginPath();
    ctx.moveTo(250, 810);
    ctx.lineTo(450, 810);
    ctx.strokeStyle = "#8f4e00";
    ctx.lineWidth = 2;
    ctx.stroke();

    const spiritualBoardName = lang === "kn" ? "ಆಧ್ಯಾತ್ಮಿಕ ಬೋಧನಾ ಮಂಡಳಿ"
      : lang === "hi" ? "आध्यात्मिक शिक्षण बोर्ड"
      : lang === "te" ? "ఆధ్యాత్మిక విద్యా బోర్డు"
      : lang === "ta" ? "ஆன்மீக கல்வி வாரியம்"
      : "Spiritual Board of Instruction";
    ctx.fillStyle = "#554336";
    ctx.font = `18px ${fontStack}`;
    ctx.fillText(spiritualBoardName, 350, 885);

    // Date
    const today = new Date().toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.fillStyle = "#1c1b1b";
    ctx.font = `bold 20px ${fontStack}`;
    ctx.fillText(today, 1250, 850);
    ctx.beginPath();
    ctx.moveTo(1150, 810);
    ctx.lineTo(1350, 810);
    ctx.strokeStyle = "#554336";
    ctx.stroke();
    
    ctx.font = `18px ${fontStack}`;
    ctx.fillText(t.certConferralDate, 1250, 885);

    // Certificate ID info string
    const randCertId = `VVK-CERT-${Math.floor(100000 + Math.random() * 900000)}`;
    ctx.fillStyle = "#887364";
    ctx.font = "18px monospace";
    ctx.fillText(`${t.certId}: ${randCertId}`, 800, 950);

    // Trigger PNG direct download action
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `VIVEKA_Certificate_${studentName.replace(/\s+/g, "_")}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleShareAchievement = () => {
    setSharing(true);
    const textMsg = `${t.shareMessage} ${correctCount}/${totalCount}! ${t.slogan}`;
    
    if (navigator.share) {
      navigator.share({
        title: t.shareTitle,
        text: textMsg,
        url: window.location.origin
      }).catch(err => console.log(err))
        .finally(() => setSharing(false));
    } else {
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(textMsg)}`;
      window.open(url, "_blank");
      setSharing(false);
    }
  };

  const newlyUnlockedBadgesLocalized = newlyUnlockedBadges.map(b => getLocalizedBadge(b, lang));
  const activeBadgesLocalized = activeBadges.map(b => getLocalizedBadge(b, lang));

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#fcf9f8] text-[#1c1b1b] pb-24 overflow-x-hidden">
      
      {/* Dynamic Confetti Shower */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => {
            const randomX = Math.random() * 100;
            const randomDelay = Math.random() * 2;
            const randomSize = Math.random() * 8 + 6;
            const randomColors = ["#ff9933", "#2552ca", "#50c878", "#ba1a1a"];
            const chosenColor = randomColors[Math.floor(Math.random() * randomColors.length)];
            
            return (
              <div 
                key={i}
                className="absolute top-[-20px] rounded-full animate-[fall_3s_linear_infinite]"
                style={{
                  left: `${randomX}%`,
                  width: `${randomSize}px`,
                  height: `${randomSize}px`,
                  backgroundColor: chosenColor,
                  animationDelay: `${randomDelay}s`,
                  opacity: 0.8
                }}
              />
            );
          })}
          <style>{`
            @keyframes fall {
              0% { transform: translateY(0) rotate(0deg); opacity: 1; }
              100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
            }
          `}</style>
        </div>
      )}

      {/* Header bar element */}
      <header className="fixed top-0 left-0 right-0 h-16 w-full max-w-md mx-auto bg-[#fcf9f8]/80 backdrop-blur-xl border-b border-[#dbc2b0]/20 z-50 flex items-center justify-between px-5">
        <div className="w-10" />
        <h1 className="font-sans text-xl font-bold text-[#8f4e00]">{t.brand}</h1>
        <div className="text-[#8f4e00] font-bold text-sm bg-[#ff9933]/15 px-3 py-1 rounded-full">
          🔥 {t.score}
        </div>
      </header>

      {/* Main Results Board */}
      <main className="relative z-10 pt-24 pb-12 px-5 max-w-md mx-auto w-full flex flex-col items-center flex-grow">
        
        {/* Sparkle Banner Completion */}
        <section className="w-full text-center mb-6">
          <div className="inline-block mb-2 text-[#ff9933] text-5xl">
            🌟
          </div>
          <h2 className="font-sans text-2xl font-extrabold text-[#8f4e00] tracking-tight">
            {t.quizCompleted}
          </h2>
          <p className="text-[#554336] text-xs font-semibold uppercase tracking-wider mt-1">
            {t.obtainedSuccess}
          </p>
        </section>

        {/* Circular score display card */}
        <div className="bg-white/70 backdrop-blur-md w-full rounded-3xl p-6 border border-white/40 shadow-xl flex flex-col items-center mb-4">
          
          <div className="relative flex items-center justify-center w-36 h-36 mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle 
                cx="72" 
                cy="72" 
                r="46" 
                className="text-[#ebe7e7]"
                strokeWidth="8" 
                fill="transparent" 
                stroke="currentColor" 
              />
              <circle 
                cx="72" 
                cy="72" 
                r="46" 
                stroke="url(#scoreGradient)" 
                strokeWidth="12" 
                fill="transparent" 
                strokeDasharray="290" 
                strokeDashoffset={strokeOffset * (290 / 314)} 
                strokeLinecap="round" 
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#2552ca" />
                  <stop offset="100%" stopColor="#ff9933" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="font-sans text-3xl font-extrabold text-[#ff9933]">
                {correctCount}/{totalCount}
              </span>
              <span className="text-[10px] font-bold text-[#887364] uppercase tracking-wider">
                {t.score}
              </span>
            </div>
          </div>

          {/* Stats detailed summary */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex items-center p-3 rounded-2xl bg-[#50c878]/10 border border-[#50c878]/20">
              <CheckCircle2 className="w-5 h-5 text-[#006d36] mr-2 flex-shrink-0" />
              <div className="text-left">
                <p className="text-[10px] text-[#554336] font-semibold">{t.correctAnswers}</p>
                <p className="text-sm font-bold text-[#006d36]">{correctCount}</p>
              </div>
            </div>

            <div className="flex items-center p-3 rounded-2xl bg-red-50 border border-red-200">
              <XCircle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0" />
              <div className="text-left">
                <p className="text-[10px] text-[#554336] font-semibold">{t.incorrectAnswers}</p>
                <p className="text-sm font-bold text-red-600">{totalCount - correctCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Experience banner points card */}
        <div className="bg-white/70 backdrop-blur-md w-full rounded-2xl p-4 border border-white/40 flex items-center justify-between mb-6 shadow-sm text-left">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#ff9933]/15 flex items-center justify-center mr-3 text-[#ff9933]">
              <span className="text-xl">⚡</span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#1c1b1b]">{t.experienceGained}</h3>
              <p className="text-[10px] text-[#887364]">+{pointsGained} {t.totalDharmaPoints}</p>
            </div>
          </div>
          <span className="font-sans text-base font-extrabold text-[#ff9933] pr-1">
            +{xpGained} XP
          </span>
        </div>

        {/* Certificate conferring trigger (NEW FEATURE) */}
        {correctCount >= 5 && (
          <button
            onClick={handleDownloadCertificate}
            className="w-full h-14 bg-gradient-to-r from-[#8f4e00] to-[#b36b00] hover:brightness-105 text-white font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-lg mb-4 active:scale-95 transition-all text-sm"
          >
            <Download className="w-5 h-5" />
            <span>{t.downloadCertificate}</span>
          </button>
        )}

        {/* Action button rows */}
        <div className="w-full space-y-3">
          <button 
            onClick={handleShareAchievement}
            className="w-full h-14 bg-[#2552ca] text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md hover:brightness-105 active:scale-95 transition-all"
          >
            <Share2 className="w-5 h-5" />
            <span>{sharing ? (lang === "kn" ? "ಹಂಚಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ..." : lang === "hi" ? "साझा किया जा रहा है..." : lang === "te" ? "షేర్ చేయబడుతోంది..." : lang === "ta" ? "பகிர்கிறது..." : "Sharing...") : t.shareTitle}</span>
          </button>

          <button 
            onClick={onPlayAgain}
            className="w-full h-14 bg-[#ff9933] text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md hover:brightness-105 active:scale-95 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            <span>{t.playAgain}</span>
          </button>
          
          <button 
            onClick={onGoHome}
            className="w-full h-14 bg-[#ebe7e7] text-[#1c1b1b] font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-[#e5e2e1] active:scale-95 transition-all"
          >
            <Home className="w-5 h-5" />
            <span>{t.returnDashboard}</span>
          </button>
        </div>

        {/* Display unlocked badges in this round or recent badges unlocked */}
        <section className="w-full mt-8">
          <h4 className="text-xs font-bold text-[#887364] uppercase tracking-wider mb-3 px-1 text-left border-l-4 border-[#ff9933] pl-2 leading-none">
            {t.unlockedAchievementsHeader}
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {activeBadgesLocalized.slice(0, 3).map((item) => {
              const isNewlyUnlocked = newlyUnlockedBadgesLocalized.some(b => b.id === item.id);
              return (
                <div 
                  key={item.id}
                  className={`aspect-square bg-white/50 backdrop-blur-sm rounded-2xl border-2 flex flex-col items-center justify-center p-2 text-center relative overflow-hidden ${isNewlyUnlocked ? "border-[#ff9933] shadow-md shadow-[#ff9933]/15 scale-105" : "border-white/40"}`}
                >
                  {isNewlyUnlocked && (
                    <div className="absolute top-0 right-0 bg-[#ff9933] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-bl-lg shadow-sm">
                      {lang === "kn" ? "ಹೊಸತು!" : lang === "hi" ? "नया!" : lang === "te" ? "కొత్తది!" : lang === "ta" ? "புதிய!" : "NEW!"}
                    </div>
                  )}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl mb-1 ${isNewlyUnlocked ? "bg-[#ff9933]/10" : "bg-[#ebe7e7]"}`}>
                    {item.id === "badge_first" && "🚀"}
                    {item.id === "badge_streak" && "⚡"}
                    {item.id === "badge_master" && "🎖️"}
                    {item.id === "badge_scholar" && "🎓"}
                    {item.id === "badge_grandmaster" && "👑"}
                    {item.id === "badge_science" && "🧪"}
                  </div>
                  <span className="text-[10px] font-extrabold text-[#554336] leading-tight line-clamp-2">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}
