import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Bolt, Globe } from "lucide-react";
import { DbService } from "../services/db";
import { translations, SupportedLang } from "../data/translations";

interface LoginScreenProps {
  onSuccess: (user: any) => void;
  onNavigateToSignup: () => void;
  onGoBack: () => void;
  lang: SupportedLang;
  onLangChange: (lang: SupportedLang) => void;
}

export default function LoginScreen({ 
  onSuccess, 
  onNavigateToSignup, 
  onGoBack, 
  lang, 
  onLangChange 
}: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const t = translations[lang] || translations.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t.fillDetailsError);
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const profile = await DbService.logIn(email, password);
      onSuccess(profile);
    } catch (err: any) {
      console.error(err);
      if (err.message === "auth/invalid-credential" || err.message === "auth/user-not-found" || err.message === "auth/wrong-password") {
        setError(t.invalidCredentialsError);
      } else {
        setError(t.fillDetailsError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSocial = async () => {
    setError(null);
    setLoading(true);
    try {
      const user = await DbService.signUp("explorer@quest.com", "explorer123", "Gautama");
      onSuccess(user);
    } catch (e) {
      try {
        const user = await DbService.logIn("explorer@quest.com", "explorer123");
        onSuccess(user);
      } catch (err) {
        setError("Could not complete social log-in.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#fcf9f8] text-[#1c1b1b] pb-12">
      {/* Top Header Navigation */}
      <header className="fixed top-0 left-0 right-0 h-16 w-full max-w-md mx-auto bg-[#fcf9f8]/80 backdrop-blur-xl border-b border-[#dbc2b0]/20 z-50 flex items-center justify-between px-5">
        <button 
          onClick={onGoBack}
          className="text-[#8f4e00] hover:bg-[#ff9933]/15 transition-colors p-2 rounded-full active:scale-95 duration-150 flex items-center justify-center"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-sans text-xl font-bold text-[#8f4e00]">{t.brand}</h1>
        
        {/* Language selector dropdown */}
        <div className="flex items-center gap-1 bg-white/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#dbc2b0]/30 shadow-sm">
          <Globe className="w-3 h-3 text-[#ff9933]" />
          <select
            value={lang}
            onChange={(e) => onLangChange(e.target.value as SupportedLang)}
            className="bg-transparent text-[10px] font-bold text-[#554336] focus:outline-none cursor-pointer"
          >
            <option value="en">English</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="hi">हिन्दी</option>
            <option value="te">తెలుగు</option>
            <option value="ta">தமிழ்</option>
          </select>
        </div>
      </header>

      {/* Main Form Body */}
      <main className="flex-grow flex flex-col justify-center px-5 pt-20 pb-12 max-w-md mx-auto w-full relative z-10">
        
        {/* Background Ambient element */}
        <div className="absolute top-1/4 -left-10 w-44 h-44 bg-[#ff9933]/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 -right-10 w-44 h-44 bg-[#2552ca]/10 rounded-full blur-3xl -z-10" />

        {/* Brand Banner Picture representation */}
        <div className="mb-6 text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-3xl overflow-hidden shadow-lg border-2 border-white bg-[#ffdcc2] flex items-center justify-center text-4xl">
            📜
          </div>
          <h2 className="font-sans text-2xl font-bold text-[#1c1b1b] mb-1">
            {t.loginTitle}
          </h2>
          <p className="font-sans text-sm text-[#554336] px-4 leading-relaxed">
            {t.loginDesc}
          </p>
        </div>

        {/* Interactive Login Card */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-white/40 shadow-xl space-y-6">
          {error && (
            <div className="bg-red-50 text-red-700 text-xs px-4 py-3 rounded-xl border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Registered Email */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#554336] ml-1" htmlFor="email-input">
                {t.emailLabel}
              </label>
              <div className="relative group">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#887364] group-focus-within:text-[#2552ca] transition-colors">
                  <Mail className="w-5 h-5" />
                </span>
                <input 
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="explorer@quest.com"
                  className="w-full h-12 pl-11 pr-4 bg-[#f0edec]/50 border-b-2 border-[#dbc2b0] focus:border-[#2552ca] focus:ring-0 transition-all font-sans text-sm text-[#1c1b1b] rounded-t-xl"
                  required
                />
              </div>
            </div>

            {/* Secret Key Input */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#554336] ml-1" htmlFor="password-input">
                {t.passwordLabel}
              </label>
              <div className="relative group">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#887364] group-focus-within:text-[#2552ca] transition-colors">
                  <Lock className="w-5 h-5" />
                </span>
                <input 
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 pl-11 pr-12 bg-[#f0edec]/50 border-b-2 border-[#dbc2b0] focus:border-[#2552ca] focus:ring-0 transition-all font-sans text-sm text-[#1c1b1b] rounded-t-xl"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#554336]/60 hover:text-[#1c1b1b] flex items-center justify-center p-1 rounded-full"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex justify-end pt-1">
                <button 
                  type="button" 
                  onClick={() => {
                    setEmail("explorer@quest.com");
                    setPassword("explorer123");
                    setError(t.dauloginrewards); // Show an auth notice in selected language
                  }}
                  className="text-xs font-semibold text-[#2552ca] hover:underline"
                >
                  {t.needSandbox}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#ff9933] text-white font-bold rounded-full shadow-md active:scale-95 transition-transform duration-150 flex items-center justify-center gap-2 mt-4 hover:brightness-105 disabled:opacity-50"
            >
              <span>{loading ? t.decryptingQuest : t.enterQuestBtn}</span>
              <Bolt className="w-5 h-5 text-shadow fill-[#ffdcc2]" />
            </button>

          </form>

          {/* Social login divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-[#dbc2b0]/40" />
            <span className="px-3 text-xs font-semibold text-[#887364] tracking-widest uppercase">
              {t.orDiscoverWith}
            </span>
            <div className="flex-grow border-t border-[#dbc2b0]/40" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button"
              onClick={handleGoogleSocial}
              className="h-12 border border-[#dbc2b0] rounded-full flex items-center justify-center gap-2 font-semibold text-xs hover:bg-[#ebe7e7] transition-all"
            >
              <span className="text-base">🌐</span>
              <span>Google</span>
            </button>
            <button 
              type="button"
              onClick={handleGoogleSocial}
              className="h-12 border border-[#dbc2b0] rounded-full flex items-center justify-center gap-2 font-semibold text-xs hover:bg-[#ebe7e7] transition-all"
            >
              <span className="text-base text-blue-600">👤</span>
              <span>Apple</span>
            </button>
          </div>
        </div>

        {/* Footer Link redirect */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#554336]">
            {t.newToJourney} 
            <button 
              onClick={onNavigateToSignup}
              className="font-bold text-[#8f4e00] ml-1.5 hover:underline"
            >
              {t.signupTitle}
            </button>
          </p>
        </div>

      </main>
    </div>
  );
}
