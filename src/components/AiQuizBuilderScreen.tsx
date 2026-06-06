import React, { useState } from "react";
import { ArrowLeft, Sparkles, AlertCircle, Cpu } from "lucide-react";
import { UserProfile, Question, QuizCategory } from "../types";
import { translations, SupportedLang } from "../data/translations";

interface AiQuizBuilderScreenProps {
  currentUser: UserProfile;
  onGoBack: () => void;
  onStartCustomQuiz: (questions: Question[]) => void;
  lang: SupportedLang;
}

export default function AiQuizBuilderScreen({ 
  currentUser, 
  onGoBack, 
  onStartCustomQuiz,
  lang 
}: AiQuizBuilderScreenProps) {
  const t = translations[lang] || translations.en;
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTopic = topic.trim();
    if (!cleanTopic) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/gemini/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: cleanTopic,
          lang
        })
      });

      const data = await response.json();
      if (data.questions && data.questions.length > 0) {
        // Map fields to match Question schema
        const mappedQuestions: Question[] = data.questions.map((q: any, index: number) => ({
          id: `ai_${Date.now()}_${index}`,
          category: QuizCategory.GENERAL_KNOWLEDGE, // treat as dynamic general knowledge
          questionText: q.questionText,
          options: q.options,
          correctOptionIndex: q.correctOptionIndex,
          explanation: q.explanation || "Correct choice!"
        }));

        onStartCustomQuiz(mappedQuestions);
      } else {
        setErrorMsg("Failed to gather the cosmic lines. Please write another topic or try again.");
      }
    } catch (err: any) {
      console.error("AI Quiz generation error:", err);
      setErrorMsg("Connection disrupted. Please retry generating the dynamic quiz.");
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
          <span className="font-sans text-lg font-bold text-[#8f4e00]">{t.aiQuizGen}</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="pt-20 px-5 max-w-md mx-auto flex-grow w-full space-y-6">
        
        {/* Decorative banner */}
        <div className="bg-[#ff9933]/5 border-2 border-[#ff9933]/20 rounded-3xl p-6 relative overflow-hidden text-left mt-4">
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#ff1493]/5 rounded-full blur-2xl" />
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#ff9933]/10 flex items-center justify-center text-[#ff9933] shrink-0">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#8f4e00] mb-1">
                {t.quizGenTitle}
              </h3>
              <p className="text-xs text-[#554336] leading-relaxed font-semibold">
                {t.quizGenDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Input Form card */}
        <form onSubmit={handleGenerate} className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-sm space-y-4 text-left">
          
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-[#887364] tracking-wider">
              Explore custom lesson topic
            </label>
            <input 
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t.topicPlaceholder}
              className="w-full px-4 py-3 border-2 border-[#dbc2b0]/30 rounded-2xl text-xs font-semibold focus:border-[#ff9933] focus:ring-0 outline-none bg-[#fdfdfd]"
              maxLength={60}
              required
              disabled={loading}
            />
          </div>

          {errorMsg && (
            <div className="bg-red-50 text-red-800 p-3 rounded-2xl text-xs border border-red-100 flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !topic.trim()}
            className="w-full py-4 bg-[#ff9933] hover:bg-[#ff9933]/90 text-white font-bold rounded-2xl shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2 text-xs"
          >
            <Cpu className="w-4 h-4" />
            <span>{loading ? t.generatingQuiz : t.generateBtn}</span>
          </button>

        </form>

        {loading && (
          <div className="flex flex-col items-center justify-center gap-3 py-10">
            <div className="w-10 h-10 border-4 border-[#8f4e00]/20 border-t-[#ff9933] rounded-full animate-spin" />
            <p className="text-xs text-[#887364] font-bold animate-pulse">
              Guru is looking up the dynamic records inside the cosmos...
            </p>
          </div>
        )}

      </main>
    </div>
  );
}
