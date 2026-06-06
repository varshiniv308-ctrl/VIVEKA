import React, { useState } from "react";
import { ArrowLeft, Gift, Share2, Clipboard, HeartCrack } from "lucide-react";
import { UserProfile } from "../types";
import { DbService } from "../services/db";
import { translations, SupportedLang } from "../data/translations";

interface ReferralScreenProps {
  currentUser: UserProfile;
  onGoBack: () => void;
  onUpdateUser: (updatedProfile: UserProfile) => void;
  lang: SupportedLang;
}

export default function ReferralScreen({ 
  currentUser, 
  onGoBack, 
  onUpdateUser,
  lang 
}: ReferralScreenProps) {
  const t = translations[lang] || translations.en;
  const [inputCode, setInputCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleApply = async () => {
    const rawVal = inputCode.trim();
    if (!rawVal) return;

    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const updated = await DbService.applyReferralCode(currentUser.uid, rawVal);
      onUpdateUser(updated);
      setSuccessMsg("Success! You both have been rewarded 200 cosmic points! ✨");
      setInputCode("");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Invalid referral code. Please check.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    const code = currentUser.referralCode || "VVK1000";
    navigator.clipboard.writeText(code);
    alert("Referral code copied to clipboard!");
  };

  const triggerSharing = () => {
    const shareText = `Join me on VIVEKA, the ancient scriptures & modern science learning platform! Use my code: ${currentUser.referralCode || "VVK1000"} to acquire +200 bonus wisdom points instantly! 📚✨`;
    
    // Check web share API
    if (navigator.share) {
      navigator.share({
        title: "VIVEKA learning invite",
        text: shareText,
        url: window.location.origin
      }).catch(err => console.log(err));
    } else {
      // Direct fallback
      const url = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
      window.open(url, "_blank");
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
          <span className="font-sans text-lg font-bold text-[#8f4e00]">{t.referral}</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="pt-20 px-5 max-w-md mx-auto flex-grow w-full space-y-6">
        
        {/* Banner with Reward explanation */}
        <div className="bg-gradient-to-tr from-[#2552ca] to-[#ff9933]/80 text-white rounded-3xl p-6 text-left space-y-3 shadow-md mt-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
            <Gift className="w-6 h-6 animate-bounce" />
          </div>
          <h2 className="text-lg font-bold font-sans">
            Reward Your Studies Together
          </h2>
          <p className="text-xs text-white/95 leading-relaxed font-semibold">
            {t.referralBonusDesc}
          </p>
        </div>

        {/* User Code Sharing container */}
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-sm text-center space-y-4">
          <h3 className="text-xs font-extrabold text-[#887364] uppercase tracking-wider">
            {t.referralCode}
          </h3>

          <div className="bg-gray-100 py-3 px-5 rounded-2xl flex items-center justify-between">
            <span className="font-mono text-xl font-black text-[#1c1b1b]">
              {currentUser.referralCode || "VVK1000"}
            </span>
            <div className="flex items-center gap-1">
              <button 
                onClick={copyToClipboard}
                className="p-2 text-[#8f4e00] hover:bg-gray-200 rounded-lg active:scale-90 transition-transform"
                title="Copy Code"
              >
                <Clipboard className="w-4 h-4" />
              </button>
              <button 
                onClick={triggerSharing}
                className="p-2 text-[#2552ca] hover:bg-gray-200 rounded-lg active:scale-90 transition-transform"
                title="Share Invite"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Apply referral box */}
        {currentUser.referredBy ? (
          <div className="bg-white/50 p-5 rounded-3xl border border-dashed border-[#dbc2b0] text-center space-y-2">
            <span className="text-[#50c878] font-bold text-xs uppercase block">✓ Connected Status</span>
            <p className="text-[11px] text-[#887364] font-semibold leading-relaxed">
              You codes have connected successfully! Your +200 welcome reward points have merged with your current levels nicely.
            </p>
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-sm space-y-4 text-left">
            <h3 className="text-xs font-bold text-[#8f4e00] uppercase tracking-wider">
              {t.enterReferral}
            </h3>

            <div className="flex gap-2">
              <input 
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="e.g. VVK5239"
                className="flex-grow px-4 py-3 bg-[#fdfdfd] border-2 border-[#dbc2b0]/30 rounded-xl font-mono text-xs font-bold uppercase tracking-wider outline-none focus:border-[#ff9933]"
                disabled={loading}
              />
              <button
                onClick={handleApply}
                disabled={loading || !inputCode.trim()}
                className="bg-[#2552ca] hover:bg-[#2552ca]/90 text-white font-bold px-5 py-3 rounded-xl text-xs shrink-0 active:scale-95 disabled:opacity-40 transition-transform"
              >
                {t.applyReferral}
              </button>
            </div>

            {successMsg && (
              <p className="text-xs text-[#005025] bg-green-50 p-2.5 rounded-xl border border-green-100 font-bold text-center">
                {successMsg}
              </p>
            )}

            {errorMsg && (
              <p className="text-xs text-red-800 bg-red-50 p-2.5 rounded-xl border border-red-100 font-bold text-center flex items-center justify-center gap-1.5">
                <HeartCrack className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </p>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
