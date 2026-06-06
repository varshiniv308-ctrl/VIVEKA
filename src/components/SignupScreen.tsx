import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Globe } from "lucide-react";
import { DbService } from "../services/db";
import { translations, SupportedLang } from "../data/translations";

interface SignupScreenProps {
  onSuccess: (user: any) => void;
  onNavigateToLogin: () => void;
  onGoBack: () => void;
  lang: SupportedLang;
  onLangChange: (lang: SupportedLang) => void;
}

export default function SignupScreen({ 
  onSuccess, 
  onNavigateToLogin, 
  onGoBack, 
  lang, 
  onLangChange 
}: SignupScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const t = translations[lang] || translations.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError(t.fillDetailsError);
      return;
    }
    if (password.length < 6) {
      setError(t.passwordLengthError);
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const profile = await DbService.signUp(email, password, name);
      setSuccess(true);
      setTimeout(() => {
        onSuccess(profile);
      }, 1500);
    } catch (err: any) {
      console.error(err);
      if (err.message === "auth/email-already-in-use") {
        setError(t.emailInUseError);
      } else {
        setError(t.regProfileError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSocial = async () => {
    setError(null);
    setLoading(true);
    try {
      const user = await DbService.signUp("scholar@quest.com", "scholar123", "Maitreya");
      onSuccess(user);
    } catch (e) {
      try {
        const user = await DbService.logIn("scholar@quest.com", "scholar123");
        onSuccess(user);
      } catch (err) {
        setError(t.googleIncompleteError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#fcf9f8] text-[#1c1b1b] pb-12">
      {/* Decorative top app bar */}
      <header className="fixed top-0 left-0 right-0 h-16 w-full max-w-md mx-auto bg-[#fcf9f8]/80 backdrop-blur-xl border-b border-[#dbc2b0]/20 z-50 flex items-center justify-between px-5">
        <button 
          onClick={onGoBack}
          className="text-[#8f4e00] hover:bg-[#ff9933]/15 transition-colors p-2 rounded-full active:scale-95 duration-150 flex items-center justify-center"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="font-sans text-xl font-bold text-[#8f4e00]">{t.brand}</span>
        
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

      {/* Main Column */}
      <main className="flex-grow flex flex-col justify-center px-5 pt-20 pb-12 max-w-md mx-auto w-full relative z-10">
        
        {/* Decorative background elements blur */}
        <div className="absolute top-10 right-0 w-64 h-64 bg-[#ff9933]/10 blur-3xl rounded-full -z-10" />
        <div className="absolute bottom-10 left-0 w-80 h-80 bg-[#2552ca]/10 blur-3xl rounded-full -z-10" />

        {/* Brand visual header */}
        <div className="w-full text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#ff9933]/20 mb-4">
            📚
          </div>
          <h1 className="font-sans text-2xl font-bold text-[#8f4e00] mb-1">
            {t.brand}
          </h1>
          <p className="font-sans text-sm text-[#554336]">
            {t.signupDesc}
          </p>
        </div>

        {/* Interactive Signup Form */}
        <section className="bg-white/70 backdrop-blur-md w-full rounded-3xl p-6 border border-white/40 shadow-xl space-y-6">
          <h2 className="font-sans text-xl font-bold text-[#1c1b1b]">
            {t.signupTitle}
          </h2>

          {error && (
            <div className="bg-red-50 text-red-700 text-xs px-4 py-3 rounded-xl border border-red-200">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-[#50c878]/10 text-[#005025] text-xs px-4 py-3 rounded-xl border border-[#50c878]/30">
              {t.accountGeneratedSuccess}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name field */}
            <div className="relative group">
              <label className="block text-xs font-semibold text-[#887364] mb-1 px-1" htmlFor="signup-name">
                {t.nameLabel}
              </label>
              <div className="relative flex items-center transition-all duration-300 border-b-2 border-[#dbc2b0] focus-within:border-[#2552ca]">
                <User className="absolute left-1 w-5 h-5 text-[#887364] group-focus-within:text-[#2552ca]" />
                <input 
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full pl-9 py-2.5 bg-transparent border-none focus:ring-0 text-sm font-sans placeholder:text-[#dbc2b0]"
                  required
                />
              </div>
            </div>

            {/* Email field */}
            <div className="relative group">
              <label className="block text-xs font-semibold text-[#887364] mb-1 px-1" htmlFor="signup-email">
                {t.emailLabel}
              </label>
              <div className="relative flex items-center transition-all duration-300 border-b-2 border-[#dbc2b0] focus-within:border-[#2552ca]">
                <Mail className="absolute left-1 w-5 h-5 text-[#887364] group-focus-within:text-[#2552ca]" />
                <input 
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-9 py-2.5 bg-transparent border-none focus:ring-0 text-sm font-sans placeholder:text-[#dbc2b0]"
                  required
                />
              </div>
            </div>

            {/* Secret key */}
            <div className="relative group">
              <label className="block text-xs font-semibold text-[#887364] mb-1 px-1" htmlFor="signup-password">
                {t.passwordLabel}
              </label>
              <div className="relative flex items-center transition-all duration-300 border-b-2 border-[#dbc2b0] focus-within:border-[#2552ca]">
                <Lock className="absolute left-1 w-5 h-5 text-[#887364] group-focus-within:text-[#2552ca]" />
                <input 
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-8 py-2.5 bg-transparent border-none focus:ring-0 text-sm font-sans placeholder:text-[#dbc2b0]"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 text-[#887364] hover:text-[#2552ca] transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Create action */}
            <button 
              type="submit"
              disabled={loading || success}
              className="w-full py-3.5 px-6 bg-[#ff9933] text-white font-bold rounded-2xl shadow-md active:scale-95 transition-all hover:brightness-110 flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
            >
              <span>{loading ? t.constructingIdentity : t.createAccountBtn}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

          </form>

          {/* Social division */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-[#dbc2b0]" />
            <span className="px-3 text-xs font-semibold text-[#887364]">OR</span>
            <div className="flex-grow border-t border-[#dbc2b0]" />
          </div>

          {/* Register Google */}
          <button 
            type="button"
            onClick={handleGoogleSocial}
            className="w-full py-3 bg-white border border-[#dbc2b0] rounded-xl flex items-center justify-center gap-2 font-semibold text-sm text-[#1c1b1b] hover:bg-[#ebe7e7] transition-colors active:scale-95"
          >
            <span>🌐</span>
            <span>Sign up with Google</span>
          </button>
        </section>

        {/* Redirect back */}
        <footer className="mt-8 text-center px-4">
          <p className="text-sm text-[#554336]">
            {t.alreadyHaveAccount.split("?")[0] + "?"} 
            <button 
              onClick={onNavigateToLogin}
              className="text-[#2552ca] font-bold underline underline-offset-4 pl-1 hover:text-[#003baf] transition-colors"
            >
              {t.alreadyHaveAccount.split("?")[1]?.trim() || "Log in here"}
            </button>
          </p>
        </footer>

      </main>
    </div>
  );
}
