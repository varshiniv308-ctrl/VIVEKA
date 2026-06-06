import React, { useState, useEffect, useRef } from "react";
import { Timer, ArrowRight, Lightbulb, Flame, Award } from "lucide-react";
import { Question, QuizCategory } from "../types";
import { QUESTION_BANK } from "../data/questions";
import { translations, SupportedLang } from "../data/translations";
import { getLocalizedQuestion } from "../data/localizedQuestions";

interface QuizScreenProps {
  category: QuizCategory;
  onFinish: (correctCount: number, totalCount: number) => void;
  onGoBack: () => void;
  customQuestions?: Question[];
  lang?: SupportedLang;
}

export default function QuizScreen({ 
  category, 
  onFinish, 
  onGoBack, 
  customQuestions,
  lang = "en"
}: QuizScreenProps) {
  const t = translations[lang] || translations.en;
  
  // Load questions for selected category
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showNext, setShowNext] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loadingExplanation, setLoadingExplanation] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize questions
  useEffect(() => {
    if (customQuestions && customQuestions.length > 0) {
      setQuestions(customQuestions);
      return;
    }
    // Filter questions by category and shuffle for gameplay freshness
    const filtered = QUESTION_BANK.filter(q => q.category === category);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    // Standard game consists of 10 questions (or less if category has fewer)
    const selection = shuffled.slice(0, Math.min(10, shuffled.length));
    
    if (selection.length === 0) {
      // Emergency recovery if no questions exist
      setQuestions([
        {
          id: "emergency_1",
          category,
          questionText: lang === "kn" ? "ಈ ಪವಿತ್ರ ವಿಭಾಗದಲ್ಲಿ ಜ್ಞಾನದ ಮುಖ್ಯ ಜಿಜ್ಞಾಸು ಯಾರು?" : lang === "hi" ? "इस पवित्र श्रेणी में ज्ञान का मुख्य साधक कौन है?" : lang === "te" ? "ఈ పవిత్ర విభాగంలో జ్ఞానాన్ని కోరే ప్రధాన అన్వేషకుడు ఎవరు?" : lang === "ta" ? "இந்த புனித பிரிவில் அறிவைத் தேடும் முதன்மை தேடுபவர் யார்?" : "Who is the primary seeker of knowledge inside this category?",
          options: lang === "kn" ? ["ಶ್ರದ್ಧಾವಂತ ವಿದ್ಯಾರ್ಥಿ", "ಜ್ಞಾನಿ ರಾಜ", "ಸಂಚಾರಿ ವಿದ್ವಾಂಸ", "ಮೌನಿ ಮುನಿ"] : lang === "hi" ? ["श्रद्धालु छात्र", "ज्ञानी राजा", "भ्रमणशील विद्वान", "मौन मुनि"] : ["A Devoted Student", "A Wise King", "A Wandering Scholar", "A Silent Muni"],
          correctOptionIndex: 0,
          explanation: lang === "kn" ? "ಜ್ಞಾನದ ಯಾವುದೇ ಪವಿತ್ರ ವ್ಯವಸ್ಥೆಯಲ್ಲಿ, ಪ್ರಾಮಾಣಿಕ ವಿದ್ಯಾರ್ಥಿಯೇ ಜ್ಞಾನದ ಮುಖ್ಯ ಅನ್ವೇಷಕನಾಗಿರುತ್ತಾನೆ." : lang === "hi" ? "ज्ञान की किसी भी व्यवस्था में, ईमानदार छात्र ही मुख्य साधक होता है।" : "In any system of knowledge, the sincere student remains the primary seeker of wisdom."
        }
      ]);
    } else {
      setQuestions(selection);
    }
  }, [category]);

  // Handle countdown timer
  useEffect(() => {
    if (questions.length === 0 || hasAnswered) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, hasAnswered, questions]);

  const handleTimeout = () => {
    setHasAnswered(true);
    setSelectedOption(null);
    setShowNext(true);
  };

  const handleOptionSelect = (index: number) => {
    if (hasAnswered) return;
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    setSelectedOption(index);
    setHasAnswered(true);

    const currentQuestion = getLocalizedQuestion(questions[currentIndex], lang);
    if (index === currentQuestion.correctOptionIndex) {
      setCorrectCount(prev => prev + 1);
    }
    
    setShowNext(true);
  };

  const handleNext = () => {
    setAiExplanation(null);
    setLoadingExplanation(false);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
      setTimeLeft(15);
      setShowNext(false);
    } else {
      onFinish(correctCount, questions.length);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcf9f8] text-[#1c1b1b]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#8f4e00]/20 border-t-[#ff9933] rounded-full animate-spin" />
          <p className="text-sm font-semibold text-[#887364]">
            {lang === "kn" ? "ಪ್ರಾಚೀನ ಗ್ರಂಥಗಳಿಂದ ಪ್ರಶ್ನೆಗಳನ್ನು ಹೊರತೆಗೆಯಲಾಗುತ್ತಿದೆ..." : lang === "hi" ? "प्राचीन ग्रंथों से प्रश्न प्राप्त किए जा रहे हैं..." : lang === "te" ? "ప్రాచీన గ్రంథాల నుండి ప్రశ్నలను సేకరిస్తోంది..." : lang === "ta" ? "பண்டைய நூல்களிலிருந்து கேள்விகள் பெறப்படுகின்றன..." : "Summoning questions from ancient scrolls..."}
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = getLocalizedQuestion(questions[currentIndex], lang);
  const progressPercent = (currentIndex / questions.length) * 100;
  const isTimerWarning = timeLeft <= 5;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#fcf9f8] text-[#1c1b1b] pb-24">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 w-full max-w-md mx-auto bg-white/80 backdrop-blur-xl border-b border-[#dbc2b0]/20 z-50 flex items-center justify-between px-5">
        <button 
          onClick={onGoBack}
          className="text-[#8f4e00] hover:bg-[#ff9933]/15 transition-colors p-2 rounded-full active:scale-95 duration-150 flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <span className="font-sans text-xl font-bold text-[#8f4e00] truncate max-w-[200px]">
          {t.categories[category as keyof typeof t.categories] || category}
        </span>
        <div className="bg-[#ff9933]/15 text-[#8f4e00] px-3.5 py-1 rounded-full font-sans text-sm font-bold flex items-center gap-1">
          <Flame className="w-4 h-4 text-[#ff9933] fill-[#ff9933]" />
          <span>12</span>
        </div>
      </header>

      {/* Main question Arena */}
      <main className="flex-grow w-full max-w-md px-5 pt-20 pb-24 flex flex-col gap-6 mx-auto">
        
        {/* Progress Display */}
        <div className="flex flex-col gap-1 mt-4 font-sans">
          <div className="flex justify-between items-end">
            <span className="text-xs font-semibold text-[#554336]">
              {t.questionOf} {currentIndex + 1} / {questions.length}
            </span>
            <div className={`flex items-center gap-1 transition-all duration-300 ${isTimerWarning ? "text-red-600 scale-105 animate-pulse" : "text-[#2552ca]"}`}>
              <Timer className="w-4 h-4" />
              <span className="text-xs font-extrabold">
                {timeLeft === 0 ? t.timesUp : `${timeLeft}s ${t.remaining}`}
              </span>
            </div>
          </div>
          {/* Progress loader */}
          <div className="h-2.5 w-full bg-[#ebe7e7] rounded-full overflow-hidden">
            <div 
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-gradient-to-r from-[#2552ca] to-[#ff9933] rounded-full transition-all duration-300 shadow-md shadow-[#2552ca]/20"
            />
          </div>
        </div>

        {/* Hero Question Card */}
        <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-[#ff9933]/5 rounded-full blur-3xl" />
          <h2 className="font-sans text-xl font-bold text-[#1c1b1b] leading-snug relative z-10 text-left">
            {currentQuestion.questionText}
          </h2>
        </div>

        {/* Option Grid selector */}
        <div className="flex flex-col gap-3 font-sans">
          {currentQuestion.options.map((option, idx) => {
            let optionStyle = "bg-white/50 border border-transparent shadow-sm";
            let circleColor = "border-[#dbc2b0]";
            let isCircleFilled = false;

            if (hasAnswered) {
              if (idx === currentQuestion.correctOptionIndex) {
                optionStyle = "bg-[#50c878]/10 border-[#50c878] text-[#005025] font-semibold";
                circleColor = "border-[#50c878] bg-[#50c878]";
                isCircleFilled = true;
              } else if (idx === selectedOption) {
                optionStyle = "bg-red-50 border-red-300 text-red-900";
                circleColor = "border-red-400 bg-red-400";
                isCircleFilled = true;
              } else {
                optionStyle = "opacity-60 bg-white/30";
              }
            } else {
              optionStyle = "bg-white/50 hover:border-[#2552ca]/30 active:scale-[0.98]";
            }

            return (
              <button 
                key={idx}
                disabled={hasAnswered}
                onClick={() => handleOptionSelect(idx)}
                className={`p-4 rounded-2xl text-left flex items-center justify-between transition-all duration-200 border-2 ${optionStyle}`}
              >
                <span className="font-sans text-sm">{option}</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${circleColor}`}>
                  {isCircleFilled && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white scale-100 transition-transform" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation helper if answered incorrect or correct */}
        {hasAnswered && (
          <div className="flex flex-col gap-2 font-sans">
            {currentQuestion.explanation && (
              <div className="bg-[#ff9933]/10 rounded-2xl p-4 border border-[#ff9933]/20 flex gap-3 text-left">
                <span className="text-xl">💡</span>
                <div className="space-y-1 flex-grow">
                  <span className="font-bold text-[#8f4e00] text-xs uppercase tracking-wider block">{t.guruSays}</span>
                  <p className="font-sans text-xs text-[#554336] leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            )}

            {/* AI Deep Explanation block */}
            <div className="bg-white/40 backdrop-blur-md rounded-2xl p-4 border border-[#dbc2b0]/30 shadow-inner flex flex-col gap-3 text-left">
              {aiExplanation ? (
                <div className="space-y-1">
                  <span className="font-bold text-[#2552ca] text-xs uppercase tracking-wider block">✨ {lang === "kn" ? "ಗುರು AI ಆಳವಾದ ವಿವರಣೆ:" : lang === "hi" ? "गुरु AI गहरी व्याख्या:" : lang === "te" ? "గురు AI లోతైన వివరణ:" : lang === "ta" ? "குரு AI ஆழமான விளக்கம்:" : "AI Deep Explanation:"}</span>
                  <p className="font-sans text-xs text-[#1c1b1b] leading-relaxed">
                    {aiExplanation}
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={loadingExplanation}
                  onClick={async () => {
                    setLoadingExplanation(true);
                    try {
                      const selOpt = selectedOption !== null ? currentQuestion.options[selectedOption] : "None";
                      const corrOpt = currentQuestion.options[currentQuestion.correctOptionIndex];
                      
                      const response = await fetch("/api/gemini/explain-answer", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          question: currentQuestion.questionText,
                          selected: selOpt,
                          correct: corrOpt,
                          lang: lang
                        })
                      });
                      const resData = await response.json();
                      if (resData.explanation) {
                        setAiExplanation(resData.explanation);
                      } else {
                        setAiExplanation(lang === "kn" ? "ವಿವರಣೆ ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ." : "AI explanation was not retrieved. Please try again.");
                      }
                    } catch (e) {
                      console.error("AI Explain Error:", e);
                      setAiExplanation(lang === "kn" ? "ಸಂಪರ್ಕ ಕಡಿತಗೊಂಡಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ." : "Connection failed. Please retry.");
                    } finally {
                      setLoadingExplanation(false);
                    }
                  }}
                  className="w-full py-2.5 bg-[#2552ca]/10 hover:bg-[#2552ca]/20 text-[#2552ca] font-bold rounded-xl text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined text-sm animate-pulse">psychology</span>
                  <span>{loadingExplanation ? t.aligningLayers : t.obtainAiExplanation}</span>
                </button>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Floating Bottom Action Area which slides up after answer */}
      {showNext && (
        <div className="fixed bottom-0 left-0 right-0 w-full z-50 bg-white/95 backdrop-blur-md border-t border-[#dbc2b0]/20 p-4 max-w-md mx-auto flex justify-center items-center rounded-t-3xl shadow-2xl">
          <button 
            onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-[#2552ca] to-[#446ce4] text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform font-sans"
          >
            <span>
              {currentIndex + 1 === questions.length ? t.finishQuest : t.nextQuestion}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
