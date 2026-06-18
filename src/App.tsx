import React, { useState, useEffect } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import HomeScreen from "./components/HomeScreen";
import QuizScreen from "./components/QuizScreen";
import ResultsScreen from "./components/ResultsScreen";
import LeadersScreen from "./components/LeadersScreen";
import BadgesScreen from "./components/BadgesScreen";
import ProfileScreen from "./components/ProfileScreen";

// New specialized screens
import AiChatScreen from "./components/AiChatScreen";
import AiQuizBuilderScreen from "./components/AiQuizBuilderScreen";
import DailyChallengeScreen from "./components/DailyChallengeScreen";
import ReferralScreen from "./components/ReferralScreen";
import AdminStatsScreen from "./components/AdminStatsScreen";

import { DbService, STATIC_BADGES, testConnection } from "./services/db";
import { UserProfile, QuizCategory, Badge, Question } from "./types";
import { SupportedLang } from "./data/translations";

type ScreenState = 
  | "welcome" 
  | "login" 
  | "signup" 
  | "home" 
  | "quiz" 
  | "results" 
  | "leaders" 
  | "badges" 
  | "profile"
  | "ai-chat"
  | "ai-quiz-builder"
  | "daily-challenge"
  | "referral"
  | "admin";

export default function App() {
  const [screen, setScreen] = useState<ScreenState>("welcome");
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loadingAuth, setLoading] = useState(true);

  // Active quiz metadata for score calculation
  const [activeCategory, setActiveCategory] = useState<QuizCategory | null>(null);
  const [quizScores, setQuizScores] = useState({ correct: 0, total: 0 });
  const [rewards, setRewards] = useState({ xpGained: 0, pointsGained: 0, newlyUnlockedBadges: [] as Badge[] });

  // Custom AI-generated questions list
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);

  // Current Language preference
  const [guestLang, setGuestLang] = useState<SupportedLang>(() => 
    (localStorage.getItem("vvk_guest_lang") as SupportedLang) || "en"
  );
  const currentLang = currentUser?.language || guestLang;

  const handleLangChange = async (selectedLang: SupportedLang) => {
    localStorage.setItem("vvk_guest_lang", selectedLang);
    setGuestLang(selectedLang);
    if (currentUser) {
      try {
        const updated = await DbService.updateUserProfile(currentUser.uid, {
          language: selectedLang
        });
        setCurrentUser(updated);
      } catch (err) {
        console.error("App language sync fail:", err);
      }
    }
  };

  // Load auth state and evaluate database triggers
  useEffect(() => {
    testConnection();

    const safetyTimeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    const unsubscribe = DbService.onAuthChanged((user: UserProfile | null) => {
      clearTimeout(safetyTimeout);
      setCurrentUser(user);
      setLoading(false);
      
      // Auto routing if logged in or out
      if (user) {
        if (screen === "welcome" || screen === "login" || screen === "signup") {
          setScreen("home");
        }
      } else {
        if (screen !== "welcome" && screen !== "login" && screen !== "signup") {
          setScreen("welcome");
        }
      }
    });

    return () => {
      clearTimeout(safetyTimeout);
      unsubscribe();
    };
  }, [screen]);

  const handleStartQuest = () => {
    if (currentUser) {
      setScreen("home");
    } else {
      setScreen("login");
    }
  };

  const handleLoginSuccess = (profile: UserProfile) => {
    setCurrentUser(profile);
    setScreen("home");
  };

  const handleSignupSuccess = (profile: UserProfile) => {
    setCurrentUser(profile);
    setScreen("home");
  };

  const handleSelectCategory = (category: QuizCategory) => {
    setCustomQuestions([]); // Clear custom questions to load standard list
    setActiveCategory(category);
    setScreen("quiz");
  };

  const handleStartCustomQuiz = (questions: Question[]) => {
    setCustomQuestions(questions);
    setActiveCategory(QuizCategory.GENERAL_KNOWLEDGE); // dynamically categorize dynamic ones
    setScreen("quiz");
  };

  const handleFinishQuiz = async (correct: number, total: number) => {
    setQuizScores({ correct, total });
    if (!currentUser || !activeCategory) {
      setScreen("home");
      return;
    }

    try {
      const isDailyChallenge = !!(customQuestions && customQuestions.length === 1 && customQuestions[0]?.id?.startsWith("daily_"));

      const result = await DbService.submitQuizScore(
        currentUser.uid,
        activeCategory,
        correct,
        total,
        isDailyChallenge
      );

      setRewards({
        xpGained: result.xpGained,
        pointsGained: result.pointsGained,
        newlyUnlockedBadges: result.newlyUnlockedBadges
      });

      // Update current user state immediately for fluid responsiveness
      setCurrentUser(result.profile);
      setScreen("results");
    } catch (e) {
      console.error("Score submission error:", e);
      setScreen("home");
    }
  };

  const handleSignOut = async () => {
    try {
      await DbService.logOut();
      setCurrentUser(null);
      setScreen("welcome");
    } catch (e) {
      console.error(e);
    }
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#fcf9f8] text-[#1c1b1b]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#8f4e00]/20 border-t-[#ff9933] rounded-full animate-spin" />
          <p className="text-xs font-semibold text-[#887364] uppercase tracking-widest leading-none">
            Summoning VIVEKA...
          </p>
        </div>
      </div>
    );
  }

  // Generate unlocked badges display
  const userUnlockedIds = currentUser?.unlockedBadgeIds || [];
  const currentActiveBadges = STATIC_BADGES.map(b => ({
    ...b,
    isUnlocked: userUnlockedIds.includes(b.id)
  })).filter(b => b.isUnlocked);

  return (
    <div className="w-full bg-[#fcf9f8] h-full">
      {screen === "welcome" && (
        <WelcomeScreen 
          onStart={handleStartQuest} 
          lang={currentLang}
          onLangChange={handleLangChange}
        />
      )}

      {screen === "login" && (
        <LoginScreen 
          onSuccess={handleLoginSuccess}
          onNavigateToSignup={() => setScreen("signup")}
          onGoBack={() => setScreen("welcome")}
          lang={currentLang}
          onLangChange={handleLangChange}
        />
      )}

      {screen === "signup" && (
        <SignupScreen 
          onSuccess={handleSignupSuccess}
          onNavigateToLogin={() => setScreen("login")}
          onGoBack={() => setScreen("login")}
          lang={currentLang}
          onLangChange={handleLangChange}
        />
      )}

      {currentUser && (
        <>
          {screen === "home" && (
            <HomeScreen 
              user={currentUser}
              onSelectCategory={handleSelectCategory}
              onNavigate={(tab) => setScreen(tab)}
              onNavExtra={(extraScreen: ScreenState) => setScreen(extraScreen)}
            />
          )}

          {screen === "quiz" && activeCategory && (
            <QuizScreen 
              category={activeCategory}
              onFinish={handleFinishQuiz}
              onGoBack={() => setScreen("home")}
              customQuestions={customQuestions}
              lang={currentLang}
            />
          )}

          {screen === "results" && (
            <ResultsScreen 
              correctCount={quizScores.correct}
              totalCount={quizScores.total}
              xpGained={rewards.xpGained}
              pointsGained={rewards.pointsGained}
              newlyUnlockedBadges={rewards.newlyUnlockedBadges}
              activeBadges={currentActiveBadges}
              onPlayAgain={() => setScreen("quiz")}
              onGoHome={() => setScreen("home")}
              studentUid={currentUser.uid}
              studentName={currentUser.displayName}
              lang={currentLang}
            />
          )}

          {screen === "leaders" && (
            <LeadersScreen 
              currentUser={currentUser}
              onGoBack={() => setScreen("home")}
              onNavigate={(tab) => setScreen(tab)}
              lang={currentLang}
            />
          )}

          {screen === "badges" && (
            <BadgesScreen 
              currentUser={currentUser}
              onGoBack={() => setScreen("home")}
              onNavigate={(tab) => setScreen(tab)}
              lang={currentLang}
            />
          )}

          {screen === "profile" && (
            <ProfileScreen 
              currentUser={currentUser}
              onUpdateUser={(updated) => setCurrentUser(updated)}
              onSignOut={handleSignOut}
              onGoBack={() => setScreen("home")}
              onNavigate={(tab) => setScreen(tab)}
              onNavExtra={(extraScreen: ScreenState) => setScreen(extraScreen)}
            />
          )}

          {/* Specialized state routing */}
          {screen === "ai-chat" && (
            <AiChatScreen 
              currentUser={currentUser}
              onGoBack={() => setScreen("home")}
              lang={currentLang}
            />
          )}

          {screen === "ai-quiz-builder" && (
            <AiQuizBuilderScreen 
              currentUser={currentUser}
              onGoBack={() => setScreen("home")}
              onStartCustomQuiz={handleStartCustomQuiz}
              lang={currentLang}
            />
          )}

          {screen === "daily-challenge" && (
            <DailyChallengeScreen 
              currentUser={currentUser}
              onGoBack={() => setScreen("home")}
              onStartCustomQuiz={handleStartCustomQuiz}
              lang={currentLang}
            />
          )}

          {screen === "referral" && (
            <ReferralScreen 
              currentUser={currentUser}
              onGoBack={() => setScreen("profile")}
              onUpdateUser={(updated) => setCurrentUser(updated)}
              lang={currentLang}
            />
          )}

          {screen === "admin" && (
            <AdminStatsScreen 
              currentUser={currentUser}
              onGoBack={() => setScreen("profile")}
            />
          )}
        </>
      )}
    </div>
  );
}
