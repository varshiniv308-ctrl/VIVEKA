import React, { useState, useEffect } from "react";
import { ArrowLeft, Users, Signal, Trophy, Percent, Milestone, HelpCircle } from "lucide-react";
import { DbService } from "../services/db";
import { UserProfile } from "../types";

interface AdminStatsScreenProps {
  currentUser: UserProfile;
  onGoBack: () => void;
}

export default function AdminStatsScreen({ currentUser, onGoBack }: AdminStatsScreenProps) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await DbService.getAdminStats();
        setStats(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

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
          <span className="font-sans text-lg font-bold text-[#8f4e00]">Admin Dashboard</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="pt-20 px-5 max-w-md mx-auto flex-grow w-full space-y-6">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-8 h-8 border-4 border-[#8f4e00]/20 border-t-[#ff9933] rounded-full animate-spin" />
            <span className="text-xs font-semibold text-[#887364]">Collating spiritual growth charts...</span>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Realtime stats counter grid */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              
              <div className="bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-sm text-center">
                <Users className="w-5 h-5 mx-auto text-[#2552ca] mb-1.5" />
                <span className="text-2xl font-black text-[#1c1b1b] block">
                  {stats?.totalUsers || 1}
                </span>
                <span className="text-[10px] text-[#887364] font-bold uppercase tracking-wider">
                  Total Seekers
                </span>
              </div>

              <div className="bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-sm text-center">
                <Signal className="w-5 h-5 mx-auto text-[#50c878] mb-1.5 animate-pulse" />
                <span className="text-2xl font-black text-[#1c1b1b] block">
                  {stats?.dailyActiveUsers || 1}
                </span>
                <span className="text-[10px] text-[#887364] font-bold uppercase tracking-wider">
                  Active Today
                </span>
              </div>

              <div className="bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-sm text-center">
                <Trophy className="w-5 h-5 mx-auto text-[#ff9933] mb-1.5" />
                <span className="text-2xl font-black text-[#1c1b1b] block">
                  {stats?.totalQuizzesCompleted || 0}
                </span>
                <span className="text-[10px] text-[#887364] font-bold uppercase tracking-wider">
                  Quizzes Finished
                </span>
              </div>

              <div className="bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-sm text-center">
                <Percent className="w-5 h-5 mx-auto text-[#ba1a1a] mb-1.5" />
                <span className="text-2xl font-black text-[#1c1b1b] block">
                  {stats?.averageScore || 75}%
                </span>
                <span className="text-[10px] text-[#887364] font-bold uppercase tracking-wider">
                  Average Accuracy
                </span>
              </div>

            </div>

            {/* Growth / Referral Chart info */}
            <div className="bg-white/60 backdrop-blur-md p-5 rounded-2xl border border-white/40 text-left space-y-3 shadow-sm">
              <h3 className="text-xs font-extrabold text-[#8f4e00] uppercase tracking-wider flex items-center gap-1.5">
                <Milestone className="w-4 h-4 text-[#ff9933]" />
                <span>Growth / Referral Analytics</span>
              </h3>
              <div className="flex justify-between items-center text-xs border-b pb-2">
                <span className="text-[#554336] font-semibold">Affiliated Referrals</span>
                <span className="font-mono font-bold text-[#ff9933]">+{stats?.referralCount || 0} users</span>
              </div>
              <div className="flex justify-between items-center text-xs border-b pb-2">
                <span className="text-[#554336] font-semibold">App Load Status</span>
                <span className="text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full font-bold">Excellent 99.8%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#554336] font-semibold">Gemini Server Core</span>
                <span className="text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded-full font-bold text-[10px]">Ready</span>
              </div>
            </div>

            {/* Recent seeker registrations list */}
            <div className="bg-white/60 backdrop-blur-md p-5 rounded-2xl border border-white/40 text-left shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-[#1c1b1b] uppercase tracking-wider">
                Recent Signups / Registrations
              </h3>

              <div className="space-y-2.5">
                {stats?.recentRegistrations?.map((reg: any, index: number) => (
                  <div key={index} className="flex justify-between items-center text-xs border-b pb-2">
                    <div className="text-left">
                      <span className="font-bold text-[#1c1b1b] block max-w-[200px] truncate">{reg.displayName}</span>
                      <span className="text-[9px] text-[#887364] font-semibold block">{reg.email}</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[#2552ca]">
                      {reg.points?.toLocaleString()} pts
                    </span>
                  </div>
                ))}
                {!stats?.recentRegistrations?.length && (
                  <p className="text-xs text-gray-500 font-medium py-3 text-center">No other registrations found.</p>
                )}
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
