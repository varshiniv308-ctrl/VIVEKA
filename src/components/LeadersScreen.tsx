import React, { useState, useEffect } from "react";
import { ArrowLeft, Flame, Award, Home, User, Star } from "lucide-react";
import { DbService } from "../services/db";
import { LeaderboardEntry, UserProfile } from "../types";
import { translations, SupportedLang } from "../data/translations";

interface LeadersScreenProps {
  currentUser: UserProfile;
  onGoBack: () => void;
  onNavigate: (tab: "home" | "leaders" | "badges" | "profile") => void;
  lang: SupportedLang;
}

export default function LeadersScreen({ currentUser, onGoBack, onNavigate, lang }: LeadersScreenProps) {
  const [period, setPeriod] = useState<"weekly" | "monthly" | "all">("monthly");
  const [rankings, setRankings] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const t = translations[lang] || translations.en;

  useEffect(() => {
    const loadRankings = async () => {
      setLoading(true);
      try {
        const list = await DbService.getLeaderboard();
        
        // Check if current user is present in leaders, otherwise append them dynamically for representation
        const found = list.some(item => item.uid === currentUser.uid);
        if (!found) {
          list.push({
            uid: currentUser.uid,
            displayName: currentUser.displayName + " (You)",
            avatarUrl: currentUser.avatarUrl,
            points: currentUser.points,
            streak: currentUser.streak,
            isCurrentUser: true
          });
        }

        // Sort descending
        list.sort((a,b) => b.points - a.points);

        // Bind ranks
        const rankedList = list.map((item, index) => ({
          ...item,
          rank: index + 1
        }));

        setRankings(rankedList);
      } catch (e) {
        console.error("Leaderboard load failed:", e);
      } finally {
        setLoading(false);
      }
    };
    loadRankings();
  }, [currentUser, period]);

  // Extract top 3 for podium
  const player1 = rankings.find(p => p.rank === 1);
  const player2 = rankings.find(p => p.rank === 2);
  const player3 = rankings.find(p => p.rank === 3);

  // Remaining list
  const listRows = rankings.filter(p => (p.rank || 0) > 3);

  // User's specific rank data
  const userRankEntry = rankings.find(p => p.uid === currentUser.uid || p.isCurrentUser);

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#fcf9f8] text-[#1c1b1b] pb-40">
      
      {/* Fixed top AppBar */}
      <header className="fixed top-0 left-0 right-0 h-16 w-full max-w-md mx-auto bg-white/80 backdrop-blur-xl border-b border-[#dbc2b0]/20 z-50 flex items-center justify-between px-5 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={onGoBack}
            className="text-[#8f4e00] hover:bg-[#ff9933]/15 transition-colors p-2 rounded-full active:scale-95 duration-150 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-sans text-xl font-bold text-[#8f4e00]">{t.leaderboard}</span>
        </div>
        <div className="bg-[#ff9933]/15 px-3 py-1 rounded-full flex items-center gap-1 font-semibold text-[#8f4e00] text-sm">
          <Flame className="w-4 h-4 fill-[#ff9933]" />
          <span>{currentUser.streak ?? 0}</span>
        </div>
      </header>

      {/* Main panel scroll area */}
      <main className="pt-20 px-5 w-full max-w-md mx-auto flex-grow">
        
        {/* Filter Tabs */}
        <div className="flex bg-[#f0edec] rounded-full p-1 mb-6 mt-4">
          {(["weekly", "monthly", "all"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setPeriod(tab)}
              className={`flex-grow py-2 rounded-full text-xs font-bold uppercase transition-all duration-200 ${period === tab ? "bg-[#ff9933] text-white shadow-md shadow-[#ff9933]/10" : "text-[#554336] hover:bg-[#ebe7e7]"}`}
            >
              {tab === "weekly" ? t.weeklyTab : tab === "monthly" ? t.monthlyTab : t.allTimeTab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-4 border-[#8f4e00]/20 border-t-[#ff9933] rounded-full animate-spin" />
            <span className="text-xs font-semibold text-[#887364]">{t.interpretingScrolls}</span>
          </div>
        ) : (
          <>
            {/* Podium display */}
            <div className="grid grid-cols-3 gap-3 items-end mb-10 pt-4 px-1">
              
              {/* Silver Rank 2 */}
              <div className="flex flex-col items-center">
                <div className="relative mb-3 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-4 border-[#dbc2b0] overflow-hidden shadow-md bg-white">
                    <img 
                      src={player2?.avatarUrl ?? `https://api.dicebear.com/7.x/adventurer/svg?seed=Aria`} 
                      alt="Aria" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="absolute -bottom-1 bg-[#dbc2b0] text-[#1c1b1b] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-inner">
                    2
                  </div>
                </div>
                <div className="bg-white/40 backdrop-blur-md border border-[#dbc2b0]/30 w-full rounded-t-2xl p-2 text-center h-28 flex flex-col justify-end">
                  <span className="text-xs font-extrabold text-[#554336] block truncate">
                    {player2?.displayName ?? "Aria"}
                  </span>
                  <span className="text-[#2552ca] font-extrabold text-xs">
                    {(player2?.points ?? 2840).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Gold Rank 1 */}
              <div className="flex flex-col items-center scale-110 relative z-10">
                <div className="text-yellow-500 mb-1 animate-bounce">
                  <Star className="w-5 h-5 fill-yellow-500" />
                </div>
                <div className="relative mb-3 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border-4 border-[#ff9933] overflow-hidden shadow-lg bg-white ring-4 ring-[#ff9933]/10">
                    <img 
                      src={player1?.avatarUrl ?? `https://api.dicebear.com/7.x/adventurer/svg?seed=Vikram`} 
                      alt="Vikram" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="absolute -bottom-1 bg-[#ff9933] text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border-2 border-white shadow-inner">
                    1
                  </div>
                </div>
                <div className="bg-[#ff9933]/10 border border-[#ff9933]/30 w-full rounded-t-3xl p-2 text-center h-32 flex flex-col justify-end shadow-xl">
                  <span className="text-xs font-black text-[#ff9933] block truncate">
                    {player1?.displayName ?? "Vikram"}
                  </span>
                  <span className="text-yellow-600 font-black text-sm">
                    {(player1?.points ?? 3120).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Bronze Rank 3 */}
              <div className="flex flex-col items-center">
                <div className="relative mb-3 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-4 border-amber-600/40 overflow-hidden shadow-md bg-white">
                    <img 
                      src={player3?.avatarUrl ?? `https://api.dicebear.com/7.x/adventurer/svg?seed=Leo`} 
                      alt="Leo" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="absolute -bottom-1 bg-amber-600/60 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-inner">
                    3
                  </div>
                </div>
                <div className="bg-white/40 backdrop-blur-md border border-amber-600/20 w-full rounded-t-2xl p-2 text-center h-24 flex flex-col justify-end">
                  <span className="text-xs font-extrabold text-[#554336] block truncate">
                    {player3?.displayName ?? "Leo"}
                  </span>
                  <span className="text-[#2552ca] font-extrabold text-xs">
                    {(player3?.points ?? 2715).toLocaleString()}
                  </span>
                </div>
              </div>

            </div>

            {/* List remaining rows */}
            <div className="space-y-3 font-sans">
              {listRows.map((row) => (
                <div 
                  key={row.uid}
                  className={`bg-white/60 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 border ${row.uid === currentUser.uid ? "border-[#ff9933]/60 shadow-md bg-[#ff9933]/5" : "border-white/40"}`}
                >
                  <span className="w-6 text-center font-bold text-[#887364] text-xs">
                    {row.rank}
                  </span>
                  
                  <div className="w-10 h-10 rounded-full border border-[#dbc2b0] overflow-hidden bg-white">
                    <img src={row.avatarUrl} alt={row.displayName} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-grow text-left">
                    <span className="text-xs font-bold text-[#1c1b1b] block">
                      {row.displayName}
                    </span>
                    {row.uid === currentUser.uid && (
                      <span className="text-[9px] text-[#ff9933] font-bold block uppercase tracking-wider">
                        {t.yourRank}
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="font-extrabold text-sm text-[#2552ca]">
                      {row.points?.toLocaleString()}
                    </span>
                    {row.change && row.change !== "none" && (
                      <span className={`block text-[9px] font-bold ${row.change === "up" ? "text-[#006d36]" : "text-red-600"}`}>
                        {row.change === "up" ? "▲ Up" : "▼ Down"}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </main>

      {/* Floating active user rank card */}
      {userRankEntry && (
        <div className="fixed bottom-20 left-0 right-0 w-full z-45 px-5 max-w-md mx-auto pointer-events-none">
          <div className="bg-[#8f4e00] shadow-2xl rounded-2xl p-4 flex items-center gap-4 border border-white/20 pointer-events-auto hover:scale-[1.02] transition-transform">
            <span className="w-8 text-center font-black text-[#ffdcc2] text-lg">
              {userRankEntry.rank}
            </span>
            <div className="w-12 h-12 rounded-full border-2 border-[#ffdcc2] overflow-hidden bg-white">
              <img src={currentUser.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-grow text-left">
              <h3 className="text-xs font-black text-white">
                {currentUser.displayName}
              </h3>
              <span className="text-[#ffdcc2]/80 text-[10px] uppercase font-bold tracking-wider">
                {t.topPercent}
              </span>
            </div>

            <div className="text-right">
              <span className="font-black text-white text-lg font-mono">
                {currentUser.points?.toLocaleString()}
              </span>
              <span className="block text-[8px] text-[#ffdcc2] font-semibold uppercase tracking-wider leading-none mt-1">
                {t.points}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Styled Responsive Bottom Navigation Bar */}
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
          className="flex flex-col items-center justify-center bg-[#ff9933] text-white rounded-full px-5 py-2 transition-transform active:scale-90"
        >
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>leaderboard</span>
          <span className="text-[10px] font-bold">{t.leaderboard}</span>
        </button>

        <button 
          onClick={() => onNavigate("badges")}
          className="flex flex-col items-center justify-center text-[#554336] p-2 hover:bg-[#ebe7e7] rounded-xl transition-colors"
        >
          <Award className="w-5 h-5 mb-0.5" />
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
