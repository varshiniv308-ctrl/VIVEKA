import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send, Mic, MicOff, Volume2, VolumeX, Sparkles, Bot, User } from "lucide-react";
import { UserProfile } from "../types";
import { translations, SupportedLang } from "../data/translations";

interface Message {
  role: "user" | "model";
  text: string;
}

interface AiChatScreenProps {
  currentUser: UserProfile;
  onGoBack: () => void;
  lang: SupportedLang;
}

export default function AiChatScreen({ currentUser, onGoBack, lang }: AiChatScreenProps) {
  const t = translations[lang] || translations.en;
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: lang === "kn" 
        ? "ನಮಸ್ತೆ! ನಾನು ನಿಮ್ಮ ವಿವೇಕ ಅಧ್ಯಯನ ಸಹಾಯಕ. ಗಣಿತ, ವಿಜ್ಞಾನ, ಇತಿಹಾಸ ಅಥವಾ ಪ್ರಾಚೀನ ಗ್ರಂಥಗಳ ಬಗ್ಗೆ ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ."
        : lang === "hi"
        ? "नमस्ते! मैं आपका विवेक अध्ययन सहायक हूँ। विज्ञान, गणित, इतिहास या शास्त्रों के बारे में कोई भी प्रश्न पूछें।"
        : lang === "te"
        ? "నమస్తే! నేను మీ వివేక సహాయకుడిని. గణితం, సైన్స్, ప్రాచೀನ శాస్త్రాలపై మీ సందేహాలు అడగండి."
        : lang === "ta"
        ? "வணக்கம்! நான் உங்கள் விவேகா கல்வி உதவியாளர். கணிதம், அறிவியல், வரலாறு அல்லது வேதக் கருத்துகளைப் பற்றி கேளுங்கள்."
        : "Salutations! I am your VIVEKA study mentor. Ask me any queries about general knowledge, mathematical solutions, space sciences or ancient scriptures."
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const msgEndRef = useRef<HTMLDivElement | null>(null);

  // Speech Recognition setups
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Clean speaking on exit
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  // Text to Speech voice helper
  const speakText = (text: string) => {
    if (!speechEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // stop current speak
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Attempt language matching
    if (lang === "kn") utterance.lang = "kn-IN";
    else if (lang === "hi") utterance.lang = "hi-IN";
    else if (lang === "te") utterance.lang = "te-IN";
    else if (lang === "ta") utterance.lang = "ta-IN";
    else utterance.lang = "en-IN";

    window.speechSynthesis.speak(utterance);
  };

  const startVoiceRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    
    if (lang === "kn") rec.lang = "kn-IN";
    else if (lang === "hi") rec.lang = "hi-IN";
    else if (lang === "te") rec.lang = "te-IN";
    else if (lang === "ta") rec.lang = "ta-IN";
    else rec.lang = "en-IN";

    rec.onstart = () => {
      setIsRecording(true);
    };

    rec.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInputVal(transcript);
    };

    rec.onerror = (e: any) => {
      console.error("Speech Recognition error:", e);
      setIsRecording(false);
    };

    rec.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = rec;
    rec.start();
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const queryStr = inputVal.trim();
    if (!queryStr) return;

    setInputVal("");
    const updatedMsgs = [...messages, { role: "user" as const, text: queryStr }];
    setMessages(updatedMsgs);
    setLoading(true);

    try {
      const response = await fetch("/api/gemini/study-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: queryStr,
          history: updatedMsgs.slice(-6), // keep last few turns for context
          lang
        })
      });

      const data = await response.json();
      if (data.response) {
        setMessages(prev => [...prev, { role: "model", text: data.response }]);
        speakText(data.response);
      } else {
        setMessages(prev => [...prev, { role: "model", text: "Guru is offline. Please check connection." }]);
      }
    } catch (err) {
      console.error("Study Chat error:", err);
      setMessages(prev => [...prev, { role: "model", text: "Error connecting to AI Guru. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#fcf9f8] text-[#1c1b1b] pb-20">
      
      {/* Top Header bar */}
      <header className="fixed top-0 left-0 right-0 h-16 w-full max-w-md mx-auto bg-white/80 backdrop-blur-xl border-b border-[#dbc2b0]/20 z-50 flex items-center justify-between px-5 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={onGoBack}
            className="text-[#8f4e00] hover:bg-[#ff9933]/15 transition-colors p-2 rounded-full active:scale-95 duration-150 flex items-center justify-center animate-squish"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col text-left">
            <span className="font-sans text-base font-bold text-[#8f4e00]">{t.aiChat}</span>
            <span className="text-[10px] text-[#887364] font-medium leading-none">Science &amp; Scripture Assistant</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Text-To-Speech Toggle */}
          <button
            onClick={() => {
              setSpeechEnabled(!speechEnabled);
              if (speechEnabled) window.speechSynthesis?.cancel();
            }}
            className={`p-2.5 rounded-full flex items-center justify-center transition-all ${speechEnabled ? "bg-[#ff9933]/15 text-[#ff9933]" : "bg-gray-200 text-gray-500"}`}
            title="Read answers out loud"
          >
            {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main chat viewport */}
      <main className="pt-20 px-4 w-full max-w-md mx-auto flex-grow flex flex-col justify-between space-y-4">
        
        <div className="flex-grow overflow-y-auto space-y-4 max-h-[calc(100vh-170px)] pr-1 scrollbar-none">
          {messages.map((m, idx) => (
            <div 
              key={idx}
              className={`flex items-start gap-2.5 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar circle */}
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 shadow-sm ${m.role === "user" ? "bg-[#2552ca]/10 border-[#2552ca]/20 text-[#2552ca]" : "bg-[#ff9933]/10 border-[#ff9933]/20 text-[#ff9933]"}`}>
                {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message balloon */}
              <div className={`p-4 rounded-3xl max-w-[80%] text-xs font-medium leading-relaxed shadow-sm ${m.role === "user" ? "bg-[#2552ca] text-white rounded-tr-none text-right" : "bg-white text-[#1c1b1b] rounded-tl-none text-left border border-[#dbc2b0]/15"}`}>
                <p className="whitespace-pre-line">{m.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-full bg-[#ff9933]/10 border border-[#ff9933]/20 text-[#ff9933] flex items-center justify-center animate-spin">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="bg-white/80 p-4 rounded-3xl rounded-tl-none border border-[#dbc2b0]/15 shadow-sm text-xs text-[#887364] flex items-center gap-2 font-semibold">
                <div className="flex space-x-1">
                  <span className="w-1.5 h-1.5 bg-[#ff9933] rounded-full animate-bounce delay-75" />
                  <span className="w-1.5 h-1.5 bg-[#ff9933] rounded-full animate-bounce delay-150" />
                  <span className="w-1.5 h-1.5 bg-[#ff9933] rounded-full animate-bounce delay-300" />
                </div>
                <span>Channeling cosmic answers...</span>
              </div>
            </div>
          )}
          <div ref={msgEndRef} />
        </div>

        {/* Action input dock */}
        <form onSubmit={handleSend} className="bg-white/80 backdrop-blur-md rounded-2xl border border-[#dbc2b0]/30 p-2.5 flex items-center justify-between gap-2 shadow-md">
          {/* Microphone recording indicator */}
          <button
            type="button"
            onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
            className={`p-3 rounded-xl flex items-center justify-center transition-all duration-300 ${isRecording ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 hover:bg-[#ff9933]/10 text-gray-700"}`}
            title="Convert voice transcript"
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input 
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={isRecording ? t.listening : t.chatPlaceholder}
            className="flex-grow bg-transparent border-none outline-none text-xs font-semibold px-2 text-[#1c1b1b]"
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading || !inputVal.trim()}
            className="bg-[#ff9933] hover:bg-[#ff9933]/90 text-white p-3 rounded-xl flex items-center justify-center shadow-md active:scale-95 disabled:opacity-40 transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </main>
    </div>
  );
}
