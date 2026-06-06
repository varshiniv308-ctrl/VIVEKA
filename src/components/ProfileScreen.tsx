import React, { useState } from "react";
import { Edit2, Award, LogOut, CheckCircle, Save, Flame, Gift, RefreshCcw, Sparkles, Coins } from "lucide-react";
import { UserProfile } from "../types";
import { DbService, STATIC_BADGES } from "../services/db";
import { translations, SupportedLang } from "../data/translations";

interface ProfileScreenProps {
  currentUser: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onSignOut: () => void;
  onGoBack: () => void;
  onNavigate: (tab: "home" | "leaders" | "badges" | "profile") => void;
  onNavExtra: (tab: "ai-chat" | "ai-quiz-builder" | "daily-challenge" | "referral" | "admin") => void;
}

export default function ProfileScreen({ 
  currentUser, 
  onUpdateUser, 
  onSignOut, 
  onGoBack, 
  onNavigate,
  onNavExtra
}: ProfileScreenProps) {
  const lang = currentUser.language || "en";
  const t = translations[lang] || translations.en;

  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [claiming, setClaiming] = useState(false);
  const [recovering, setRecovering] = useState(false);

  // Check if daily reward is already claimed today (within 24hrs)
  const lastDaily = currentUser.dailyRewardClaimedAt || 0;
  const nextDailyClaimAvailable = (lastDaily + 24 * 60 * 60 * 1000) - Date.now();
  const dailyClaimedToday = nextDailyClaimAvailable > 0;

  const handleSaveName = async () => {
    if (!displayName.trim()) return;
    setSaving(true);
    setSuccessMsg(null);
    try {
      const updated = await DbService.updateUserProfile(currentUser.uid, {
        displayName: displayName.trim()
      });
      onUpdateUser(updated);
      setIsEditing(false);
      setSuccessMsg("Profile name saved in scriptures! ✨");
      setTimeout(() => setSuccessMsg(null), 3500);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleLanguageChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value as SupportedLang;
    try {
      const updated = await DbService.updateUserProfile(currentUser.uid, {
        language: selectedLang
      });
      onUpdateUser(updated);
      setSuccessMsg("Divine translation applied successfully!");
      setTimeout(() => setSuccessMsg(null), 2500);
    } catch (err) {
      console.error("Language save failed:", err);
    }
  };

  const handleClaimDailyReward = async () => {
    if (claiming || dailyClaimedToday) return;
    setClaiming(true);
    setSuccessMsg(null);
    try {
      const updated = await DbService.claimDailyLoginReward(currentUser.uid);
      onUpdateUser(updated);
      setSuccessMsg("Guru has blessed you with +100 points! 🌟");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      alert(err.message || "Failed to claim blessing");
    } finally {
      setClaiming(false);
    }
  };

  const handleStreakRecovery = async () => {
    if (recovering) return;
    setRecovering(true);
    setSuccessMsg(null);
    try {
      const updated = await DbService.recoverStreak(currentUser.uid);
      onUpdateUser(updated);
      setSuccessMsg("Streak restored with Guru's intervention! ⚡");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      alert(err.message || "Streak recovery error.");
    } finally {
      setRecovering(false);
    }
  };

  const unlockedBadges = STATIC_BADGES.filter(b => 
    currentUser.unlockedBadgeIds?.includes(b.id)
  );

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#fcf9f8] text-[#1c1b1b] pb-24">
      
      {/* Fixed top AppBar */}
      <header className="fixed top-0 left-0 right-0 h-16 w-full max-w-md mx-auto bg-white/80 backdrop-blur-xl border-b border-[#dbc2b0]/20 z-50 flex items-center justify-between px-5 shadow-sm">
        <button 
          onClick={onGoBack}
          className="text-[#8f4e00] hover:bg-[#ff9933]/15 transition-colors p-2 rounded-full active:scale-95 duration-150 flex items-center justify-center animate-squish"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <span className="font-sans text-xl font-bold text-[#8f4e00]">{t.profile}</span>
        <div className="text-[#8f4e00] text-sm font-semibold bg-[#ff9933]/15 px-3 py-1 rounded-full flex items-center gap-1">
          <Flame className="w-4 h-4 fill-[#ff9933] text-[#ff9933]" />
          <span>{currentUser.streak || 1}</span>
        </div>
      </header>

      {/* Main Profile Panel */}
      <main className="pt-20 px-5 max-w-md mx-auto space-y-6 flex-grow w-full">
        
        {/* Profile Card Header */}
        <section className="flex flex-col items-center py-4 space-y-4">
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-4 border-[#ff9933] overflow-hidden shadow-lg bg-white ring-4 ring-[#ff9933]/10">
              <img 
                src={currentUser.avatarUrl} 
                alt="Avatar" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            <button 
              onClick={() => {
                const names = ["Krishna", "Arjuna", "Sita", "Valmiki", "Gautama", "Meera", "Chanakya"];
                const seed = names[Math.floor(Math.random() * names.length)];
                onUpdateUser({
                  ...currentUser,
                  avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}_${Date.now()}`
                });
                setSuccessMsg("Random avatar generated!");
                setTimeout(() => setSuccessMsg(null), 2000);
              }}
              className="absolute bottom-1 right-1 bg-[#2552ca] text-white p-2 ml-1 rounded-full shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-xs">edit</span>
            </button>
          </div>

          <div className="text-center w-full">
            {isEditing ? (
              <div className="flex justify-center items-center gap-2 max-w-xs mx-auto">
                <input 
                  type="text" 
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="px-3 py-1.5 border-b-2 border-[#ff9933] focus:ring-0 focus:border-[#2552ca] text-sm font-sans font-bold text-center w-48 bg-transparent"
                  maxLength={18}
                />
                <button 
                  onClick={handleSaveName} 
                  disabled={saving}
                  className="bg-[#50c878] text-white p-2 rounded-xl active:scale-90 flex items-center justify-center hover:brightness-105"
                >
                  <Save className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2">
                <h2 className="font-sans text-xl font-extrabold text-[#1c1b1b]">
                  {currentUser.displayName}
                </h2>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-[#887364] hover:text-[#ff9933] p-1 flex items-center justify-center rounded-full hover:bg-[#ff9933]/15 transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <p className="font-sans text-xs text-[#554336] mt-1 font-semibold">
              Quest Master • Level {currentUser.level || 1}
            </p>
          </div>
        </section>

        {/* Success Alert Banner if saved */}
        {successMsg && (
          <div className="bg-[#50c878]/10 text-[#005025] text-xs px-4 py-3 rounded-xl border border-[#50c878]/25 text-center flex items-center justify-center gap-1.5 animate-pulse">
            <CheckCircle className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Multi-Language Selector Dropdown inside Profile */}
        <section className="bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-white/40 shadow-sm text-left space-y-2">
          <label className="text-[10px] font-black text-[#554336] uppercase tracking-wider block">
            {t.language}
          </label>
          <select 
            value={lang}
            onChange={handleLanguageChange}
            className="w-full px-3 py-2 border border-[#dbc2b0]/30 rounded-xl bg-white text-xs font-semibold focus:outline-none focus:border-[#ff9933]"
          >
            <option value="en">English (default)</option>
            <option value="kn">ಕನ್ನಡ (Kannada)</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="te">తెలుగు (Telugu)</option>
            <option value="ta">தமிழ் (Tamil)</option>
          </select>
        </section>

        {/* Fast Actions: Daily Rewards + Streak recovery */}
        <section className="grid grid-cols-2 gap-4">
          
          {/* Daily blessing */}
          <div className="bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-white/40 text-center flex flex-col justify-between space-y-3">
            <div className="mx-auto w-10 h-10 rounded-full bg-[#ff9933]/10 flex items-center justify-center text-[#ff9933]">
              <Gift className="w-5 h-5" />
            </div>
            <div className="text-center">
              <span className="text-[10px] font-black text-[#1c1b1b] uppercase block">Blessing</span>
              <span className="text-[9px] text-[#887364] leading-none mt-1 block">+100 Pts / 24 Hours</span>
            </div>
            <button
              onClick={handleClaimDailyReward}
              disabled={dailyClaimedToday || claiming}
              className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${dailyClaimedToday ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#ff9933] text-white active:scale-95 hover:brightness-105"}`}
            >
              {dailyClaimedToday ? "Blessing Claimed" : t.claimDailyReward.replace("(+100 Pts)", "")}
            </button>
          </div>

          {/* Streak restoration */}
          <div className="bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-white/40 text-center flex flex-col justify-between space-y-3">
            <div className="mx-auto w-10 h-10 rounded-full bg-[#2552ca]/10 flex items-center justify-center text-[#2552ca]">
              <RefreshCcw className="w-5 h-5 animate-spin" />
            </div>
            <div className="text-center">
              <span className="text-[10px] font-black text-[#1c1b1b] uppercase block">Streak Recovery</span>
              <span className="text-[9px] text-[#887364] leading-none mt-1 block">Pay -250 Pts as penalty</span>
            </div>
            <button
              onClick={handleStreakRecovery}
              disabled={currentUser.points < 250 || recovering}
              className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${currentUser.points < 250 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#2552ca] text-white active:scale-95"}`}
            >
              {currentUser.points < 250 ? "Insufficient Pts" : t.recoverBtn.replace("(Costs 250 Pts)", "")}
            </button>
          </div>

        </section>

        {/* Stats Bento Grid items */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-white/50 backdrop-blur-md p-4 rounded-3xl flex flex-col items-center justify-center text-center col-span-2 bg-[#ff9933]/5 border border-[#ff9933]/20 shadow-inner">
            <Award className="w-6 h-6 text-[#ff9933] mb-1" />
            <span className="font-sans text-3xl font-extrabold text-[#ff9933] leading-none mb-1">
              {(currentUser.points || 0).toLocaleString()}
            </span>
            <span className="text-[10px] font-bold text-[#887364] uppercase tracking-widest">
              {t.points}
            </span>
          </div>
        </section>

        {/* Navigation pathways to Extra Screens: Referrals & Admin Stats dashboards */}
        <section className="bg-white/60 backdrop-blur-md rounded-3xl border border-white/40 p-1.5 flex flex-col text-left overflow-hidden">
          
          <button
            onClick={() => onNavExtra("referral")}
            className="flex items-center justify-between p-4 bg-transparent border-b border-[#dbc2b0]/15 text-xs font-semibold text-[#554336] active:bg-gray-100/50 rounded-t-2xl transition-all"
          >
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-[#ff9933]" />
              <span>{t.referral} Code &amp; Milestones</span>
            </div>
            <span className="material-symbols-outlined text-xs text-gray-400">chevron_right</span>
          </button>

          <button
            onClick={() => onNavExtra("admin")}
            className="flex items-center justify-between p-4 bg-transparent text-xs font-semibold text-[#554336] active:bg-gray-100/50 rounded-b-2xl transition-all"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2552ca]" />
              <span>Admin Dash Statistics</span>
            </div>
            <span className="material-symbols-outlined text-xs text-gray-400">chevron_right</span>
          </button>

        </section>

        {/* Action Panel lists */}
        <section className="bg-white/50 backdrop-blur-md rounded-2xl divide-y divide-[#dbc2b0]/20 border border-white/40 shadow-sm overflow-hidden text-left">
          
          <div className="p-4 flex justify-between items-center bg-gray-50/30">
            <span className="text-xs font-semibold text-[#554336]">Email Address</span>
            <span className="text-xs text-[#887364] truncate max-w-[180px]">{currentUser.email}</span>
          </div>

          <div className="p-4 flex justify-between items-center bg-gray-50/30">
            <span className="text-xs font-semibold text-[#554336]">Referral Code</span>
            <span className="text-xs text-[#ff9933] font-mono font-bold uppercase">{currentUser.referralCode || "VVK1000"}</span>
          </div>

        </section>

        {/* Sign Out Button triggers */}
        <button 
          onClick={onSignOut}
          className="w-full py-4 bg-white hover:bg-red-50 text-red-600 font-bold rounded-2xl flex items-center justify-center gap-2 border border-red-200 active:scale-95 transition-transform shadow-sm"
        >
          <LogOut className="w-5 h-5" />
          <span>{t.signout}</span>
        </button>

      </main>

      {/* Responsive unified Bottom Navigation Bar */}
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
          className="flex flex-col items-center justify-center text-[#554336] p-2 hover:bg-[#ebe7e7] rounded-xl transition-colors"
        >
          <Award className="w-5 h-5 mb-0.5 text-gray-700" />
          <span className="text-[10px] font-semibold">{t.badges}</span>
        </button>

        <button 
          onClick={() => onNavigate("profile")}
          className="flex flex-col items-center justify-center bg-[#ff9933] text-white rounded-full px-5 py-2 transition-transform active:scale-90"
        >
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
          <span className="text-[10px] font-bold">{t.profile}</span>
        </button>
      </nav>
    </div>
  );
}
