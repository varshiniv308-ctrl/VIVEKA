import React, { useState, useEffect } from "react";
import { ArrowLeft, Sparkles, AlertCircle, Play } from "lucide-react";
import { UserProfile, Question, QuizCategory } from "../types";
import { translations, SupportedLang } from "../data/translations";

interface DailyChallengeScreenProps {
  currentUser: UserProfile;
  onGoBack: () => void;
  onStartCustomQuiz: (questions: Question[]) => void;
  lang: SupportedLang;
}

export default function DailyChallengeScreen({ 
  currentUser, 
  onGoBack, 
  onStartCustomQuiz,
  lang 
}: DailyChallengeScreenProps) {
  const t = translations[lang] || translations.en;
  const [level, setLevel] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [loading, setLoading] = useState(false);
  const [doneToday, setDoneToday] = useState(false);

  useEffect(() => {
    // Check if challenge already done today via database profile or local timestamp
    const todayDate = new Date().toDateString();
    
    if (currentUser.lastDailyChallengeAt) {
      const dbDate = new Date(currentUser.lastDailyChallengeAt).toDateString();
      if (dbDate === todayDate) {
        setDoneToday(true);
        return;
      }
    }

    const record = localStorage.getItem(`dq_challenge_${currentUser.uid}`);
    if (record) {
      const savedDate = new Date(Number(record)).toDateString();
      if (savedDate === todayDate) {
        setDoneToday(true);
      }
    }
  }, [currentUser]);

  const handleStart = async () => {
    if (doneToday) return;
    setLoading(true);

    try {
      const todayString = new Date().toDateString();
      const response = await fetch("/api/gemini/daily-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          difficulty: level,
          date: todayString,
          lang
        })
      });

      const { challenge } = await response.json();
      if (challenge && challenge.questionText) {
        // Save date to lock challenge for today
        localStorage.setItem(`dq_challenge_${currentUser.uid}`, String(Date.now()));

        const mappedQuestion: Question = {
          id: `daily_${Date.now()}`,
          category: QuizCategory.GEOGRAPHY, // Treat general daily as Culture/Geo
          questionText: challenge.questionText,
          options: challenge.options,
          correctOptionIndex: challenge.correctOptionIndex,
          explanation: challenge.explanation || "Well done!"
        };

        onStartCustomQuiz([mappedQuestion]);
      } else {
        alert("Guru was unable to generate today's challenge. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to retrieve the dynamic daily challenge.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#fcf9f8] text-[#1c1b1b] pb-24">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-16 w-full max-w-md mx-auto bg-white/80 backdrop-blur-xl border-b border-[#dbc2b0]/20 z-50 flex items-center justify-between px-5 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={onGoBack}
            className="text-[#8f4e00] hover:bg-[#ff9933]/15 transition-colors p-2 rounded-full active:scale-95 duration-150 flex items-center justify-center animate-squish"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-sans text-lg font-bold text-[#8f4e00]">{t.dailyChallenge}</span>
        </div>
      </header>

      {/* Main Panel */}
      <main className="pt-20 px-5 max-w-md mx-auto flex-grow w-full space-y-6">
        
        {/* Card header banner */}
        <div className="bg-gradient-to-tr from-[#8f4e00]/90 to-[#ff9933] text-white p-6 rounded-3xl text-left space-y-3 mt-4 shadow-md">
          <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            Daily AI Blessing
          </span>
          <h2 className="text-xl font-bold font-sans">
            Explore New Wisdom Every 24 Hours
          </h2>
          <p className="text-xs text-white/90 leading-relaxed font-semibold">
            Solve customized Gemini challenges daily to maintain streaks & earn extra matching rewards.
          </p>
        </div>

        {/* Level selection and action button */}
        {doneToday ? (
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-[#50c878]/30 shadow-sm text-center space-y-3">
            <span className="text-3xl">🏅</span>
            <h3 className="text-sm font-bold text-green-800 uppercase">
              Blessing Complete!
            </h3>
            <p className="text-xs text-[#554336] leading-relaxed font-semibold">
              You have already conquered today's unique daily challenge quest! New wisdom will arrive tomorrow. Keep studying!
            </p>
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-sm space-y-4 text-left">
            <h3 className="text-xs font-bold text-[#8f4e00] uppercase tracking-wider">
              Select Difficulty Level:
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {(["Easy", "Medium", "Hard"] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border-2 ${level === lvl ? "bg-[#ff9933] border-[#ff9933] text-white shadow-md" : "bg-white border-gray-200 text-[#554336] hover:bg-gray-50"}`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <button
              onClick={handleStart}
              disabled={loading}
              className="w-full py-4 bg-[#ff9933] hover:bg-[#ff9933]/90 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 text-xs active:scale-95 transition-transform"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{loading ? "Chambering question..." : "Access Today's AI Challenge"}</span>
            </button>
          </div>
        )}

      </main>
    </div>
  );
}
