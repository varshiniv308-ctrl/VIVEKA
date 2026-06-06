export type SupportedLang = "en" | "kn" | "hi" | "te" | "ta";

export interface TranslationNode {
  brand: string;
  slogan: string;
  beginBtn: string;
  aligningChakras: string;
  summoning: string;

  // Pre-auth / Auth Buttons & Inputs
  loginTitle: string;
  loginDesc: string;
  signupTitle: string;
  signupDesc: string;
  emailLabel: string;
  passwordLabel: string;
  nameLabel: string;
  namePlaceholder: string;
  enterQuestBtn: string;
  decryptingQuest: string;
  constructingIdentity: string;
  createAccountBtn: string;
  needSandbox: string;
  orDiscoverWith: string;
  newToJourney: string;
  alreadyHaveAccount: string;
  fillDetailsError: string;
  passwordLengthError: string;
  emailInUseError: string;
  regProfileError: string;
  invalidCredentialsError: string;
  googleIncompleteError: string;
  accountGeneratedSuccess: string;

  // Navigation & Tabs
  home: string;
  leaderboard: string;
  badges: string;
  profile: string;
  aiChat: string;
  aiQuizGen: string;
  dailyChallenge: string;
  referral: string;
  admin: string;

  // Home Screen & Categories
  exploreCategories: string;
  welcomeBack: string;
  currentStreak: string;
  days: string;
  startQuiz: string;
  points: string;
  pointsAcquired: string;
  categories: {
    Ramayana: string;
    Mahabharata: string;
    "Bhagavad Gita": string;
    "Indian History": string;
    "Indian Culture": string;
    Science: string;
    Mathematics: string;
    Technology: string;
    Geography: string;
    "General Knowledge": string;
  };

  // Quiz Screen
  questionOf: string;
  timer: string;
  score: string;
  quit: string;
  explainAnswer: string;
  closeBtn: string;
  nextQuestion: string;
  finishQuest: string;
  submittingQuiz: string;
  timesUp: string;
  remaining: string;
  guruSays: string;
  obtainAiExplanation: string;
  aligningLayers: string;

  // Results Screen
  congratulations: string;
  quizCompleted: string;
  correctAnswers: string;
  incorrectAnswers: string;
  pointsGained: string;
  xpGained: string;
  newBadges: string;
  playAgain: string;
  goHome: string;
  downloadCertificate: string;
  shareTitle: string;
  shareMessage: string;
  obtainedSuccess: string;
  returnDashboard: string;
  experienceGained: string;
  totalDharmaPoints: string;
  unlockedAchievementsHeader: string;

  // Leaderboard Screen
  rank: string;
  competitor: string;
  streak: string;
  realUsersOnly: string;
  weeklyTab: string;
  monthlyTab: string;
  allTimeTab: string;
  interpretingScrolls: string;
  yourRank: string;
  topPercent: string;

  // Badges Screen
  achievements: string;
  unlocked: string;
  locked: string;
  requirement: string;
  currentJourney: string;
  scholarTitle: string;
  explorerTitle: string;
  hallOfBadges: string;
  earned: string;
  active: string;
  milestones: string;
  milestone1Title: string;
  milestone1Desc: string;
  milestone2Title: string;
  milestone2Desc: string;

  // Profile Screen
  language: string;
  selectLanguage: string;
  streakRecovery: string;
  recoverBtn: string;
  dauloginrewards: string;
  claimDailyReward: string;
  dailyRewardClaimed: string;
  referralCode: string;
  enterReferral: string;
  applyReferral: string;
  referralBonusDesc: string;
  voiceAssistant: string;
  enableVoice: string;
  signout: string;
  editName: string;
  saveName: string;

  // AI Quiz Generator Screen
  quizGenTitle: string;
  quizGenDesc: string;
  topicPlaceholder: string;
  generateBtn: string;
  generatingQuiz: string;

  // AI Chat Study Assistant
  chatTitle: string;
  chatDesc: string;
  chatPlaceholder: string;
  sendBtn: string;
  listening: string;
  errorMic: string;

  // Certificate Display
  certOfAchievement: string;
  certSubtitle: string;
  certThisIsToCertify: string;
  certSecuredPoints: string;
  certIssuedBy: string;
  certId: string;
  certConferralDate: string;
}

export const translations: Record<SupportedLang, TranslationNode> = {
  en: {
    brand: "VIVEKA",
    slogan: "Unlock the wisdom within through competitive discovery.",
    beginBtn: "Begin Adventure",
    aligningChakras: "Aligning Chakras...",
    summoning: "Summoning VIVEKA...",

    loginTitle: "Welcome Back!",
    loginDesc: "Continue your quest for knowledge and claim your spot on the leaderboard.",
    signupTitle: "Create Account",
    signupDesc: "Begin your journey of knowledge and wisdom.",
    emailLabel: "Email Address",
    passwordLabel: "Secret Password",
    nameLabel: "Full Name",
    namePlaceholder: "Enter your name",
    enterQuestBtn: "Enter Quest",
    decryptingQuest: "Decrypting Quest...",
    constructingIdentity: "Constructing Identity...",
    createAccountBtn: "Create Account",
    needSandbox: "Need Sandbox Login? (Auto-fill)",
    orDiscoverWith: "OR DISCOVER WITH",
    newToJourney: "New to the journey?",
    alreadyHaveAccount: "Already have an account? Log in here",
    fillDetailsError: "Please fill in all details first.",
    passwordLengthError: "Secret key must be at least 6 characters for security.",
    emailInUseError: "This email address is already locked inside another quest.",
    regProfileError: "Could not register profile. Check email format or network configuration.",
    invalidCredentialsError: "Invalid credentials. Try our local fallback or register a new account!",
    googleIncompleteError: "Google single sign-on simulation incomplete.",
    accountGeneratedSuccess: "Account generated! Aligning spiritual coordinates...",

    home: "Home",
    leaderboard: "Leaderboard",
    badges: "Badges",
    profile: "Profile",
    aiChat: "AI Study",
    aiQuizGen: "AI Builder",
    dailyChallenge: "Daily AI",
    referral: "Referrals",
    admin: "Admin",

    exploreCategories: "Explore Wisdom Categories",
    welcomeBack: "Welcome back,",
    currentStreak: "Current Streak",
    days: "Days",
    startQuiz: "Start Quiz",
    points: "Points",
    pointsAcquired: "points acquired!",
    categories: {
      Ramayana: "Ramayana",
      Mahabharata: "Mahabharata",
      "Bhagavad Gita": "Bhagavad Gita",
      "Indian History": "Indian History",
      "Indian Culture": "Indian Culture",
      Science: "Science",
      Mathematics: "Mathematics",
      Technology: "Technology",
      Geography: "Geography",
      "General Knowledge": "General Knowledge"
    },

    questionOf: "Question",
    timer: "Timer",
    score: "Score",
    quit: "Quit",
    explainAnswer: "Explain Answer",
    closeBtn: "Close",
    nextQuestion: "Next Question",
    finishQuest: "Finish Quest",
    submittingQuiz: "Submitting Quiz Results...",
    timesUp: "Time's up!",
    remaining: "remaining",
    guruSays: "Guru Says:",
    obtainAiExplanation: "Obtain Guru AI Explanation",
    aligningLayers: "Aligning dynamic layers...",

    congratulations: "Congratulations!",
    quizCompleted: "Quest Completed!",
    correctAnswers: "Correct Answers",
    incorrectAnswers: "Incorrect Answers",
    pointsGained: "Points Gained",
    xpGained: "XP Gained",
    newBadges: "New Badges Unlocked!",
    playAgain: "Play Again",
    goHome: "Go Home",
    downloadCertificate: "Download PDF Certificate",
    shareTitle: "VIVEKA Study Milestone",
    shareMessage: "I just completed a custom learning quest on VIVEKA, scoring",
    obtainedSuccess: "Certificate generated inside browser downloads!",
    returnDashboard: "Return Dashboard",
    experienceGained: "Experience Gained",
    totalDharmaPoints: "Total Dharma Points",
    unlockedAchievementsHeader: "Unlocked Achievements",

    rank: "Rank",
    competitor: "Noble Seeker",
    streak: "Streak",
    realUsersOnly: "Showing registered local seekers",
    weeklyTab: "Weekly",
    monthlyTab: "Monthly",
    allTimeTab: "All-time",
    interpretingScrolls: "Interpreting leaderboard scrolls...",
    yourRank: "Your Rank",
    topPercent: "Top 5% this cycle",

    achievements: "Sacred Achievements",
    unlocked: "Unlocked",
    locked: "Locked",
    requirement: "Requirement",
    currentJourney: "Current Journey",
    scholarTitle: "Advanced Scholar",
    explorerTitle: "Knowledge Seeker",
    hallOfBadges: "Hall of Badges",
    earned: "Earned",
    active: "Active",
    milestones: "Learning Milestones",
    milestone1Title: "First Steps into Dharma",
    milestone1Desc: "Successfully finalized your profile registry details.",
    milestone2Title: "Ancient History Explorer",
    milestone2Desc: "Finished a quiz category successfully.",

    language: "App Language",
    selectLanguage: "Select Language",
    streakRecovery: "Streak Recovery",
    recoverBtn: "Recover (Costs 250 Pts)",
    dauloginrewards: "Daily Login Blessings",
    claimDailyReward: "Claim Daily Blessing (+100 Pts)",
    dailyRewardClaimed: "Daily Blessing Claimed!",
    referralCode: "Your Referral Code",
    enterReferral: "Enter Referral Code",
    applyReferral: "Apply Code",
    referralBonusDesc: "Reward: Both inviter & invited receive +200 bonus points!",
    voiceAssistant: "Guru Voice Assistant",
    enableVoice: "Speak and Read Responses Out Loud",
    signout: "Sign Out",
    editName: "Change Name",
    saveName: "Save Name",

    quizGenTitle: "AI Quiz Builder",
    quizGenDesc: "Type any custom topic and our AI will build custom quiz questions for you.",
    topicPlaceholder: "e.g., Upanishads, Ancient Metallurgy, Space Science...",
    generateBtn: "Generate AI Quiz",
    generatingQuiz: "Guru is preparing your custom lesson...",

    chatTitle: "AI Study Assistant",
    chatDesc: "Ask any academic doubts from Mathematics, History, Science or Scriptures.",
    chatPlaceholder: "Ask VIVEKA Assistant...",
    sendBtn: "Send",
    listening: "Listening carefully...",
    errorMic: "Microphone Access Denied",

    certOfAchievement: "CERTIFICATE OF WISDOM",
    certSubtitle: "This awards recognition for profound studies & intellectual exploration inside VIVEKA",
    certThisIsToCertify: "This is to proudly certify that",
    certSecuredPoints: "Who demonstrated exceptional accuracy & successfully earned",
    certIssuedBy: "VIVEKA Dynamic Wisdom Platform",
    certId: "Certificate ID",
    certConferralDate: "Conferral Date"
  },
  kn: {
    brand: "ವಿವೇಕ",
    slogan: "ಸ್ಪರ್ಧಾತ್ಮಕ ಅನ್ವೇಷಣೆಯ ಮೂಲಕ ಆಂತರಿಕ ಜ್ಞಾನವನ್ನು ಅನ್ಲಾಕ್ ಮಾಡಿ.",
    beginBtn: "ಸಾಹಸ ಪ್ರಾರಂಭಿಸಿ",
    aligningChakras: "ಚಕ್ರಗಳನ್ನು ಜೋಡಿಸಲಾಗುತ್ತಿದೆ...",
    summoning: "ವಿವೇಕವನ್ನು ಆಹ್ವಾನಿಸಲಾಗುತ್ತಿದೆ...",

    loginTitle: "ಸ್ವಾಗತ!",
    loginDesc: "ಜ್ಞಾನದ ಅನ್ವೇಷಣೆಯನ್ನು ಮುಂದುವರಿಸಿ ಮತ್ತು ಲೀಡರ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಸ್ಥಾನವನ್ನು ಪಡೆದುಕೊಳ್ಳಿ.",
    signupTitle: "ಖಾತೆಯನ್ನು ರಚಿಸಿ",
    signupDesc: "ಜ್ಞಾನ ಮತ್ತು ಬುದ್ಧಿವಂತಿಕೆಯ ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ.",
    emailLabel: "ಇಮೇಲ್ ವಿಳಾಸ",
    passwordLabel: "ರಹಸ್ಯ ಪಾಸ್‌ವರ್ಡ್",
    nameLabel: "ಪೂರ್ಣ ಹೆಸರು",
    namePlaceholder: "ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    enterQuestBtn: "ಪ್ರವೇಶಿಸಿ",
    decryptingQuest: "ಡೀಕ್ರಿಪ್ಟ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    constructingIdentity: "ಖಾತೆಯನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...",
    createAccountBtn: "ನೋಂದಾಯಿಸಿ",
    needSandbox: "ಸ್ಯಾಂಡ್‌ಬಾಕ್ಸ್ ಲಾಗಿನ್ ಬೇಕೇ? (ಸ್ವಯಂ ಭರ್ತಿ)",
    orDiscoverWith: "ಅಥವಾ ಇದರೊಂದಿಗೆ ಅನ್ವೇಷಿಸಿ",
    newToJourney: "ಪ್ರಯಾಣಕ್ಕೆ ಹೊಸಬರೇ?",
    alreadyHaveAccount: "ಈಗಾಗಲೇ ಖಾತೆಯನ್ನು ಹೊಂದಿದ್ದೀರಾ? ಲಾಗ್ ಇನ್ ಮಾಡಿ",
    fillDetailsError: "ದಯವಿಟ್ಟು ಮೊದಲು ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.",
    passwordLengthError: "ಪಾಸ್ವರ್ಡ್ ಭದ್ರತೆಗಾಗಿ ಕನಿಷ್ಠ ೬ ಅಕ್ಷರಗಳನ್ನು ಹೊಂದಿರಬೇಕು.",
    emailInUseError: "ಈ ಇಮೇಲ್ ಈಗಾಗಲೇ ಬೇರೆ ಅನ್ವೇಷಣೆಯಲ್ಲಿ ಬಳಕೆಯಲ್ಲಿದೆ.",
    regProfileError: "ಖಾತೆ ನೋಂದಾಯಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ಇಮೇಲ್ ಅಥವಾ ನೆಟ್‌ವರ್ಕ್ ಪರಿಶೀಲಿಸಿ.",
    invalidCredentialsError: "ಅಮಾನ್ಯ ರುಜುವಾತುಗಳು. ಸ್ಯಾಂಡ್‌ಬಾಕ್ಸ್ ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ಹೊಸ ಖಾತೆ ತೆರೆಯಿರಿ!",
    googleIncompleteError: "ಗೂಗಲ್ ಸಿಂಗಲ್ ಸೈನ್-ಆನ್ ಪ್ರಕ್ರಿಯೆ ಅಪೂರ್ಣವಾಗಿದೆ.",
    accountGeneratedSuccess: "ಖಾತೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ರಚಿಸಲಾಗಿದೆ! ಆಧ್ಯಾತ್ಮಿಕ ಸಮನ್ವಯ...",

    home: "ಮುಖಪುಟ",
    leaderboard: "ಲೀಡರ್‌ಬೋರ್ಡ್",
    badges: "ಪದಕಗಳು",
    profile: "ಪ್ರೊಫೈಲ್",
    aiChat: "AI ಅಧ್ಯಯನ",
    aiQuizGen: "AI ರಸಪ್ರಶ್ನೆ",
    dailyChallenge: "ದೈನಂದಿನ AI",
    referral: "ರೆಫರಲ್",
    admin: "ನಿರ್ವಹಣೆ",

    exploreCategories: "ಜ್ಞಾನ ವಿಭಾಗಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
    welcomeBack: "ಸ್ವಾಗತ,",
    currentStreak: "ಪ್ರಸ್ತುತ ಸರಣಿ",
    days: "ದಿನಗಳು",
    startQuiz: "ಪ್ರಶ್ನಾವಳಿ ಪ್ರಾರಂಭಿಸಿ",
    points: "ಅಂಕಗಳು",
    pointsAcquired: "ಅಂಕಗಳನ್ನು ಗಳಿಸಲಾಗಿದೆ!",
    categories: {
      Ramayana: "ರಾಮಾಯಣ",
      Mahabharata: "ಮಹಾಭಾರತ",
      "Bhagavad Gita": "ಭಗವದ್ಗೀತೆ",
      "Indian History": "ಭಾರತೀಯ ಇತಿಹಾಸ",
      "Indian Culture": "ಭಾರತೀಯ ಸಂಸ್ಕೃತಿ",
      Science: "ವಿಜ್ಞಾನ",
      Mathematics: "ಗಣಿತ",
      Technology: "ತಂತ್ರಜ್ಞಾನ",
      Geography: "ಭೂಗೋಳಶಾಸ್ತ್ರ",
      "General Knowledge": "सामान्य ज्ञाना"
    },

    questionOf: "ಪ್ರಶ್ನೆ",
    timer: "ಸಮಯ",
    score: "ಸ್ಕೋರ್",
    quit: "ನಿರ್ಗಮಿಸು",
    explainAnswer: "ಉತ್ತರವನ್ನು ವಿವರಿಸಿ",
    closeBtn: "ಮುಚ್ಚಿ",
    nextQuestion: "ಮುಂದಿನ ಪ್ರಶ್ನೆ",
    finishQuest: "ಸಾಹಸ ಪೂರ್ಣಗೊಳಿಸಿ",
    submittingQuiz: "ಫಲಿತಾಂಶ ಸಲ್ಲಿಕೆ ಪ್ರಗತಿಯಲ್ಲಿದೆ...",
    timesUp: "ಸಮಯ ಮುಗಿಯಿತು!",
    remaining: "ಉಳಿದಿದೆ",
    guruSays: "ಗುರುಗಳು ಹೇಳುತ್ತಾರೆ:",
    obtainAiExplanation: "ಗುರು AI ವಿವರಣೆಯನ್ನು ಪಡೆಯಿರಿ",
    aligningLayers: "ಪದರಗಳನ್ನು ಜೋಡಿಸಲಾಗುತ್ತಿದೆ...",

    congratulations: "ಅಭಿನಂದನೆಗಳು!",
    quizCompleted: "ಸಾಹಸ ಪೂರ್ಣಗೊಂಡಿದೆ!",
    correctAnswers: "ಸರಿಯಾದ ಉತ್ತರಗಳು",
    incorrectAnswers: "ತಪ್ಪಾದ ಉತ್ತರಗಳು",
    pointsGained: "ಗಳಿಸಿದ ಅಂಕಗಳು",
    xpGained: "ಗಳಿಸಿದ ಎಕ್ಸ್-ಪಿ",
    newBadges: "ಹೊಸ ಪದಕಗಳು ಅನ್ಲಾಕ್ ಆಗಿವೆ!",
    playAgain: "ಮತ್ತೆ ಆಟವಾಡಿ",
    goHome: "ಮುಖಪುಟಕ್ಕೆ",
    downloadCertificate: "ಪ್ರಮಾಣಪತ್ರ ಡೌನ್‌ಲೋಡ್",
    shareTitle: "ವಿವೇಕ ಜ್ಞಾನ ಮೈಲಿಗಲ್ಲು",
    shareMessage: "ನಾನು ವಿವೇಕದಲ್ಲಿ ರಸಪ್ರಶ್ನೆಯೊಂದನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಮುಗಿಸಿದ್ದೇನೆ, ನನ್ನ ಸ್ಕೋರ್",
    obtainedSuccess: "ಪ್ರಮಾಣಪತ್ರವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ!",
    returnDashboard: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    experienceGained: "ಗಳಿಸಿದ ಅನುಭವ",
    totalDharmaPoints: "ಒಟ್ಟು ಧರ್ಮ ಅಂಕಗಳು",
    unlockedAchievementsHeader: "ಅನ್ಲಾಕ್ ಆದ ಸಾಧನೆಗಳು",

    rank: "ಶ್ರೇಣಿ",
    competitor: "ಶ್ರದ್ಧಾವಂತ ಜಿಜ್ಞಾಸು",
    streak: "ಸರಣಿ",
    realUsersOnly: "ನೋಂದಾಯಿತ ಸ್ಥಳೀಯ ಅನ್ವೇಷಕರು",
    weeklyTab: "ವಾರದ",
    monthlyTab: "ತಿಂಗಳ",
    allTimeTab: "ಸಾರ್ವಕಾಲಿಕ",
    interpretingScrolls: "ಲೀಡರ್‌ಬೋರ್ಡ್ ದಾಖಲೆಗಳನ್ನು ಓದಲಾಗುತ್ತಿದೆ...",
    yourRank: "ನಿಮ್ಮ ಶ್ರೇಣಿ",
    topPercent: "ಈ ಚಕ್ರದಲ್ಲಿ ಅಗ್ರ ೫%",

    achievements: "ಪವಿತ್ರ ಸಾಧನೆಗಳು",
    unlocked: "ಅನ್ಲಾಕ್ ಆಗಿದೆ",
    locked: "ಲಾಕ್ ಆಗಿದೆ",
    requirement: "ಅಗತ್ಯತೆ",
    currentJourney: "ಪ್ರಸ್ತುತ ಕಲಿಕೆ",
    scholarTitle: "ಪ್ರಬುದ್ಧ ವಿದ್ವಾಂಸ",
    explorerTitle: "ಜ್ಞಾನ ಜಿಜ್ಞಾಸು",
    hallOfBadges: "ಪದಕಗಳ ಗ್ಯಾಲರಿ",
    earned: "ಪಡೆದದ್ದು",
    active: "ಸಕ್ರಿಯ",
    milestones: "ಕಲಿಕೆಯ ಮೈಲಿಗಲ್ಲುಗಳು",
    milestone1Title: "ಧರ್ಮದ ಮೊದಲ ಹೆಜ್ಜೆ",
    milestone1Desc: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ನೋಂದಣಿ ವಿವರಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ.",
    milestone2Title: "ಪ್ರಾಚೀನ ಇತಿಹಾಸ ಪರಿಶೋಧಕ",
    milestone2Desc: "ರಸಪ್ರಶ್ನೆ ವಿಭಾಗವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ.",

    language: "ಅಪ್ಲಿಕೇಶನ್ ಭಾಷೆ",
    selectLanguage: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ",
    streakRecovery: "ಸರಣಿ ಮರುಪಡೆಯುವಿಕೆ",
    recoverBtn: "ಮರುಪಡೆಯಿರಿ (೨೫೦ ಅಂಕಗಳು)",
    dauloginrewards: "ದೈನಂದಿನ ಲಾಗಿನ್ ಆಶೀರ್ವಾದ",
    claimDailyReward: "ದೈನಂದಿನ ಆಶೀರ್ವಾದ ಪಡೆಯಿರಿ (+೧೦೦ ಅಂಕಗಳು)",
    dailyRewardClaimed: "ದೈನಂದಿನ ಆಶೀರ್ವಾದ ಪಡೆದಾಗಿದೆ!",
    referralCode: "ನಿಮ್ಮ ರೆಫರಲ್ ಕೋಡ್",
    enterReferral: "ರೆಫರಲ್ ಕೋಡ್ ನಮೂದಿಸಿ",
    applyReferral: "ಕೋಡ್ ಬಳಸಿ",
    referralBonusDesc: "ಬಹುಮಾನ: ಇಬ್ಬರಿಗೂ +೨೦೦ ಬೋನಸ್ ಅಂಕಗಳು ಲಭ್ಯವಿದೆ!",
    voiceAssistant: "ಗುರು ಧ್ವನಿ ಸಹಾಯಕ",
    enableVoice: "ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಗಟ್ಟಿಯಾಗಿ ಓದಿ",
    signout: "ಲಾಗ್ ಔಟ್",
    editName: "ಹೆಸರು ಬದಲಾಯಿಸಿ",
    saveName: "ಹೆಸರು ಉಳಿಸಿ",

    quizGenTitle: "AI ರಸಪ್ರಶ್ನೆ ಬಿಲ್ಡರ್",
    quizGenDesc: "ಯಾವುದೇ ಕಸ್ಟಮ್ ವಿಷಯವನ್ನು ಟೈಪ್ ಮಾಡಿ ಮತ್ತು ನಮೂದಿಸಿ, ನಮ್ಮ AI ಕಸ್ಟಮ್ ಪ್ರಶ್ನೆಗಳನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತದೆ.",
    topicPlaceholder: "ಉದಾಹರಣೆಗೆ, ಉಪನಿಷತ್ತುಗಳು, ಭೌತಶಾಸ್ತ್ರ, ಕಲೆ...",
    generateBtn: "AI ರಸಪ್ರಶ್ನೆ ತಯಾರಿಸಿ",
    generatingQuiz: "ಗುರುಗಳು ನಿಮಗಾಗಿ ಪಾಠವನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತಿದ್ದಾರೆ...",

    chatTitle: "AI ಅಧ್ಯಯನ ಸಹಾಯಕ",
    chatDesc: "ಗಣಿತ, ಇತಿಹಾಸ, ವಿಜ್ಞಾನ ಅಥವಾ ಧರ್ಮಗ್ರಂಥಗಳ ಬಗ್ಗೆ ಯಾವುದೇ ಸಂದೇಹಗಳನ್ನು ಕೇಳಿ.",
    chatPlaceholder: "ವಿವೇಕ ಧ್ವನಿಗೆ ಕೇಳಿ...",
    sendBtn: "ಕಳುಹಿಸು",
    listening: "ಕೇಳಿಸಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ...",
    errorMic: "ಧ್ವನಿ ರೆಕಾರ್ಡಿಂಗ್ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ",

    certOfAchievement: "ಜ್ಞಾನ ಸಾಧನಾ ಪ್ರಮಾಣಪತ್ರ",
    certSubtitle: "ಇದು ವಿವೇಕದಲ್ಲಿ ಗಂಭೀರ ಅಧ್ಯಯನ ಮತ್ತು ಬೌದ್ಧಿಕ ಅನ್ವೇಷಣೆಗೆ ನೀಡಲಾಗುವ ಮಾನ್ಯತೆಯಾಗಿದೆ",
    certThisIsToCertify: "ಇದರ ಮೂಲಕ ಹೆಮ್ಮೆಯಿಂದ ಪ್ರಮಾಣೀಕರಿಸಲಾಗುತ್ತದೆ ಏನೆಂದರೆ,",
    certSecuredPoints: "ಅವರು ಯಶಸ್ವಿಯಾಗಿ ಅತ್ಯುತ್ತಮ ನಿಖರತೆಯನ್ನು ಪ್ರದರ್ಶಿಸಿ ಗಳಿಸಿದ್ದಾರೆ",
    certIssuedBy: "ವಿವೇಕ ಜ್ಞಾನ ವೇದಿಕೆ",
    certId: "ಪ್ರಮಾಣಪತ್ರ ಐಡಿ",
    certConferralDate: "ಪ್ರಮಾಣೀಕೃತ ದಿನಾಂಕ"
  },
  hi: {
    brand: "विवेक",
    slogan: "प्रतिस्पर्धात्मक खोज के माध्यम से आंतरिक ज्ञान को अनलॉक करें।",
    beginBtn: "यात्रा प्रारंभ करें",
    aligningChakras: "चक्रों को संरेखित किया जा रहा है...",
    summoning: "विवेक को आमंत्रित किया जा रहा है...",

    loginTitle: "स्वागत है!",
    loginDesc: "ज्ञान की अपनी खोज जारी रखें और लीडरबोर्ड पर अपना स्थान प्राप्त करें।",
    signupTitle: "खाता बनाएं",
    signupDesc: "ज्ञान और बुद्धि की अपनी यात्रा की शुरुआत करें।",
    emailLabel: "ईमेल पता",
    passwordLabel: "गुप्त पासवर्ड",
    nameLabel: "पूरा नाम",
    namePlaceholder: "अपना नाम दर्ज करें",
    enterQuestBtn: "प्रवेश करें",
    decryptingQuest: "डिक्रिप्ट किया जा रहा है...",
    constructingIdentity: "पहचान बनाई जा रही है...",
    createAccountBtn: "रजिस्टर करें",
    needSandbox: "सैंडबॉक्स लॉगिन चाहिए? (स्वचालित भरें)",
    orDiscoverWith: "या इसके साथ खोजें",
    newToJourney: "यात्रा में नए हैं?",
    alreadyHaveAccount: "पहले से ही खाता है? लॉगिन करें",
    fillDetailsError: "कृपया पहले सभी विवरण भरें।",
    passwordLengthError: "सुरक्षा के लिए पासवर्ड कम से कम ६ अक्षरों का होना चाहिए।",
    emailInUseError: "यह ईमेल पहले से ही किसी अन्य यात्रा में उपयोग किया जा रहा है।",
    regProfileError: "प्रोफ़ाइल पंजीकृत नहीं की जा सकी। ईमेल या नेटवर्क की जांच करें।",
    invalidCredentialsError: "अमान्य विवरण। सैंडबॉक्स लॉगिन आज़माएं या नया खाता बनाएं!",
    googleIncompleteError: "गूगल सिंगल साइन-ऑन सिमुलेशन अधूरा है।",
    accountGeneratedSuccess: "खाता सफलतापूर्वक बन गया! आध्यात्मिक समन्वय...",

    home: "मुख्य पृष्ठ",
    leaderboard: "लीडरबोर्ड",
    badges: "पुरस्कार",
    profile: "प्रोफ़ाइल",
    aiChat: "AI अध्ययन",
    aiQuizGen: "AI प्रश्नोत्तरी",
    dailyChallenge: "दैनिक AI",
    referral: "रेफरल",
    admin: "एडमिन",

    exploreCategories: "ज्ञान श्रेणियों का अन्वेषण करें",
    welcomeBack: "स्वागत है,",
    currentStreak: "वर्तमान स्ट्रीक",
    days: "दिन",
    startQuiz: "प्रश्नोत्तरी प्रारंभ करें",
    points: "अंक",
    pointsAcquired: "अंक अर्जित किए!",
    categories: {
      Ramayana: "रामायण",
      Mahabharata: "महाभारत",
      "Bhagavad Gita": "भगवद गीता",
      "Indian History": "भारतीय इतिहास",
      "Indian Culture": "भारतीय संस्कृति",
      Science: "विज्ञान",
      Mathematics: "गणित",
      Technology: "तकनीकी",
      Geography: "भूगोल",
      "General Knowledge": "सामान्य ज्ञान"
    },

    questionOf: "प्रश्न",
    timer: "समय",
    score: "स्कोर",
    quit: "बाहर निकलें",
    explainAnswer: "उत्तर स्पष्ट करें",
    closeBtn: "बंद करें",
    nextQuestion: "अगला प्रश्न",
    finishQuest: "यात्रा पूर्ण करें",
    submittingQuiz: "योगदान जमा किया जा रहा है...",
    timesUp: "समय समाप्त!",
    remaining: "शेष",
    guruSays: "गुरु कहते हैं:",
    obtainAiExplanation: "गुरु AI व्याख्या प्राप्त करें",
    aligningLayers: "परतों को संरेखित किया जा रहा है...",

    congratulations: "शुभकामनाएं!",
    quizCompleted: "प्रश्नोत्तरी पूर्ण!",
    correctAnswers: "सही उत्तर",
    incorrectAnswers: "गलत उत्तर",
    pointsGained: "अर्जित अंक",
    xpGained: "अर्जित एक्स-पी",
    newBadges: "नए पदक अनलॉक हुए!",
    playAgain: "पुनः खेलें",
    goHome: "मुख्य पृष्ठ",
    downloadCertificate: "प्रमाण पत्र डाउनलोड",
    shareTitle: "विवेक ज्ञान मील का पत्थर",
    shareMessage: "मैंने विवेक पर एक प्रश्नोत्तरी पूरी की है, मेरा स्कोर",
    obtainedSuccess: "प्रमाण पत्र सफलतापूर्वक डाउनलोड किया गया!",
    returnDashboard: "मुख्य पृष्ठ पर लौटें",
    experienceGained: "प्राप्त अनुभव",
    totalDharmaPoints: "कुल धर्म अंक",
    unlockedAchievementsHeader: "अनलॉक की गई उपलब्धियां",

    rank: "रैंक",
    competitor: "सच्चा साधक",
    streak: "स्ट्रीक",
    realUsersOnly: "पंजीकृत स्थानीय साधक",
    weeklyTab: "साप्ताहिक",
    monthlyTab: "मासिक",
    allTimeTab: "सर्वकालिक",
    interpretingScrolls: "लीडरबोर्ड रिकॉर्ड पढ़े जा रहे हैं...",
    yourRank: "आपकी रैंक",
    topPercent: "इस चक्र में शीर्ष ५%",

    achievements: "पवित्र उपलब्धियां",
    unlocked: "अनलॉक",
    locked: "लॉक",
    requirement: "आवश्यकता",
    currentJourney: "वर्तमान सीख",
    scholarTitle: "प्रबुद्ध विद्वान",
    explorerTitle: "ज्ञान साधक",
    hallOfBadges: "पदकों की प्रदर्शनी",
    earned: "प्राप्त किया",
    active: "सक्रिय",
    milestones: "सीखने के मील के पत्थर",
    milestone1Title: "धर्म में पहला कदम",
    milestone1Desc: "प्राधिकरण विवरण सफलतापूर्वक सहेज लिया गया है।",
    milestone2Title: "प्राचीन इतिहास खोजकर्ता",
    milestone2Desc: "प्रश्नोत्तरी श्रेणी सफलतापूर्वक पूरी की गई।",

    language: "ऐप भाषा",
    selectLanguage: "भाषा चुनें",
    streakRecovery: "स्ट्रीक पुनर्प्राप्ति",
    recoverBtn: "पुनर्प्राप्त करें (२५० अंक)",
    dauloginrewards: "दैनिक लॉगिन आशीर्वाद",
    claimDailyReward: "दैनिक आशीर्वाद प्राप्त करें (+१०० अंक)",
    dailyRewardClaimed: "दैनिक आशीर्वाद प्राप्त किया गया!",
    referralCode: "आपका रेफरल कोड",
    enterReferral: "रेफरल कोड दर्ज करें",
    applyReferral: "कोड लागू करें",
    referralBonusDesc: "पुरस्कार: दोनों को +२०० बोनस अंक प्राप्त होंगे!",
    voiceAssistant: "गुरु वॉयस असिस्टेंट",
    enableVoice: "प्रतिक्रियाओं को ज़ोर से पढ़ें",
    signout: "लॉग आउट",
    editName: "नाम बदलें",
    saveName: "नाम सहेजें",

    quizGenTitle: "AI प्रश्नोत्तरी निर्माता",
    quizGenDesc: "कोई भी पसंदीदा विषय लिखें और हमारी AI आपके लिए प्रश्नोत्तरी तैयार करेगी।",
    topicPlaceholder: "जैसे, उपनिषद, प्राचीन धातु विज्ञान, अंतरिक्ष विज्ञान...",
    generateBtn: "AI प्रश्नोत्तरी बनाएं",
    generatingQuiz: "गुरु आपके लिए प्रश्नोत्तरी तैयार कर रहे हैं...",

    chatTitle: "AI अध्ययन सहायक",
    chatDesc: "गणित, इतिहास, विज्ञान या धार्मिक ग्रंथों से संबंधित कोई भी संदेह पूछें।",
    chatPlaceholder: "विवेक सहायक से पूछें...",
    sendBtn: "भेजें",
    listening: "ध्यान से सुन रहा हूँ...",
    errorMic: "माइक्रोफोन की अनुमति नहीं है",

    certOfAchievement: "ज्ञान और बुद्धि का प्रमाण पत्र",
    certSubtitle: "यह विवेक के भीतर गंभीर अध्ययन और बौद्धिक खोज के लिए प्रदान की गई मान्यता है",
    certThisIsToCertify: "गर्व से प्रमाणित किया जाता है कि",
    certSecuredPoints: "ने सफलतापूर्वक उत्कृष्ट शुद्धता प्रस्तुत कर अर्जित किए हैं",
    certIssuedBy: "विवेक ज्ञान मंच",
    certId: "प्रमाण पत्र आईडी",
    certConferralDate: "प्रदान करने की तिथि"
  },
  te: {
    brand: "వివేక",
    slogan: "పోటీ పరీక్షల ద్వారా మీ అంతర్గత జ్ఞానాన్ని పెంపొందించుకోండి.",
    beginBtn: "ప్రయాణాన్ని ప్రారంభించండి",
    aligningChakras: "చక్రాలను సమలేఖనం చేస్తోంది...",
    summoning: "వివేకను ఆహ్వానిస్తోంది...",

    loginTitle: "స్వాగతం!",
    loginDesc: "జ్ఞాన సాధనను కొనసాగించి, లీడర్‌బోర్డ్‌లో మీ స్థానాన్ని దక్కించుకోండి.",
    signupTitle: "ఖాతా సృష్టించండి",
    signupDesc: "జ్ఞాన యాత్రను ప్రారంభించండి.",
    emailLabel: "ఈమెయిల్ చిరునామా",
    passwordLabel: "రహస్య పాస్వర్డ్",
    nameLabel: "పూర్తి పేరు",
    namePlaceholder: "మీ పేరు నమోదు చేయండి",
    enterQuestBtn: "ప్రవేశించు",
    decryptingQuest: "డీక్రిప్ట్ చేయబడుతోంది...",
    constructingIdentity: "గుర్తింపును సృష్టిస్తోంది...",
    createAccountBtn: "రిజిస్టర్ చేయండి",
    needSandbox: "స్యాండ్‌బాక్స్ లాగిన్ కావాలా? (స్వయంచాలక భర్తీ)",
    orDiscoverWith: "లేదా దీనితో అన్వేషించండి",
    newToJourney: "యాత్రకు కొత్తదా?",
    alreadyHaveAccount: "ఇప్పటికే ఖాతా ఉందా? లాగిన్ అవ్వండి",
    fillDetailsError: "దయచేసి మొదట అన్ని వివరాలు భర్తీ చేయండి.",
    passwordLengthError: "భద్రత కోసం పాస్వర్డ్ కనీసం ౬ అక్షరాలు ఉండాలి.",
    emailInUseError: "ఈ ఈమెయిల్ ఇప్పటికే మరో యాత్రలో ఉపయోగించబడింది.",
    regProfileError: "ఖాతా నమోదు చేయడం సాధ్యం కాలేదు. నెట్‌వర్క్ తనిఖీ చేయండి.",
    invalidCredentialsError: "అమాన్య వివరాలు. స్యాండ్‌బాక్స్ ప్రయత్నించండి లేదా కొత్త ఖాతా సృష్టించండి!",
    googleIncompleteError: "గూగుల్ సింగిల్ సైన్-ఆన్ అనుకరణ అసంపూర్ణం.",
    accountGeneratedSuccess: "ఖాతా సృష్టించబడింది! ఆధ్యాత్మిక సమన్వయం...",

    home: "హోమ్",
    leaderboard: "లీడర్‌బోర్డ్",
    badges: "పతకాలు",
    profile: "ప్రొఫైల్",
    aiChat: "AI స్టడీ",
    aiQuizGen: "AI క్విజ్",
    dailyChallenge: "రోజువారీ AI",
    referral: "రెఫరల్",
    admin: "అడ్మిన్",

    exploreCategories: "జ్ఞాన విభాగాలను అన్వేషించండి",
    welcomeBack: "స్వాగతం,",
    currentStreak: "ప్రస్తుత సిరీస్",
    days: "రోజులు",
    startQuiz: "క్విజ్ ప్రారంభించండి",
    points: "పాయింట్లు",
    pointsAcquired: "పాయింట్లు సాధించారు!",
    categories: {
      Ramayana: "రామాయణం",
      Mahabharata: "మహాభారతం",
      "Bhagavad Gita": "భగవద్గీత",
      "Indian History": "భారతీయ చరిత్ర",
      "Indian Culture": "భారతీయ సంస్కృతి",
      Science: "విజ్ఞానం",
      Mathematics: "గణితం",
      Technology: "సాంకేతికత",
      Geography: "భూగోళశాస్త్రం",
      "General Knowledge": "సామాన్య జ్ఞానం"
    },

    questionOf: "ప్రశ్న",
    timer: "సమయం",
    score: "స్కోరు",
    quit: "నిష్క్రమించు",
    explainAnswer: "సమాధానం వివరించు",
    closeBtn: "మూసివేయి",
    nextQuestion: "తదుపరి ప్రశ్న",
    finishQuest: "సాహసం పూర్తి చేయి",
    submittingQuiz: "ఫలితాలు సమర్పించబడుతున్నాయి...",
    timesUp: "సమయం ముగిసింది!",
    remaining: "మిగిలి ఉంది",
    guruSays: "గురువు గారు చెబుతున్నారు:",
    obtainAiExplanation: "గురు AI వివరణను పొందండి",
    aligningLayers: "పారదర్శకతలను సమలేఖనం చేస్తోంది...",

    congratulations: "అభినందనలు!",
    quizCompleted: "సాహస యాత్ర పూర్తి!",
    correctAnswers: "సరైన సమాధానాలు",
    incorrectAnswers: "తప్పు సమాధానాలు",
    pointsGained: "సాధించిన పాయింట్లు",
    xpGained: "సాధించిన ఎక్స్-పి",
    newBadges: "కొత్త బ్యాడ్జీలు అన్‌లాక్ అయ్యాయి!",
    playAgain: "మళ్లీ ఆడండి",
    goHome: "హోమ్‌కు వెళ్లు",
    downloadCertificate: "ధృవీకరణ పత్రం డౌన్‌లోడ్",
    shareTitle: "వివేక జ్ఞాన మైలురాయి",
    shareMessage: "నేను వివేకలో క్విజ్ పూర్తి చేసాను, నా స్కోరు",
    obtainedSuccess: "సర్టిఫికేట్ విజయవంతంగా డౌన్‌లోడ్ చేయబడింది!",
    returnDashboard: "హోమ్‌కు తిరిగి వెళ్ళు",
    experienceGained: "సాధించిన అనుభవం",
    totalDharmaPoints: "మొత్తం ధర్మ పాయింట్లు",
    unlockedAchievementsHeader: "అన్‌లాక్ అయిన విజయాలు",

    rank: "ర్యాంక్",
    competitor: "జ్ఞాన సాధకుడు",
    streak: "సిరీస్",
    realUsersOnly: "నమోదిత స్థానిక అన్వేషకులు",
    weeklyTab: "వారపు",
    monthlyTab: "నెలవారీ",
    allTimeTab: "సర్వకాలీన",
    interpretingScrolls: "లీడర్‌బోర్డ్ రికార్డులను చదువుతోంది...",
    yourRank: "మీ ర్యాంక్",
    topPercent: "ఈ చక్రంలో టాప్ ౫%",

    achievements: "పవిత్ర విజయాలు",
    unlocked: "అన్‌లాక్ చేయబడింది",
    locked: "లాక్ చేయబడింది",
    requirement: "అవసరం",
    currentJourney: "ప్రస్తుత అభ్యాసం",
    scholarTitle: "ప్రజ్ఞాశాలి శోధకుడు",
    explorerTitle: "జ్ఞాన సాధకుడు",
    hallOfBadges: "పతకాల గ్యాలరీ",
    earned: "సాధించినవి",
    active: "సక్రియం",
    milestones: "అభ్యాస మైలురాళ్ళు",
    milestone1Title: "ధర్మ ప్రథమ సోపానం",
    milestone1Desc: "మీ ప్రొఫైల్ రిజిస్ట్రేషన్ విజయవంతంగా పూర్తయింది.",
    milestone2Title: "పురాతన చరిత్ర పరిశోధకుడు",
    milestone2Desc: "రసప్రశ్న విభాగం విజయవంతంగా పూర్తయింది.",

    language: "యాప్ భాష",
    selectLanguage: "భాషను ఎంచుకోండి",
    streakRecovery: "సిరీస్ రికవరీ",
    recoverBtn: "తిరిగి పొందండి (౨౫౦ పాయింట్లు)",
    dauloginrewards: "రోజువారీ లాగిన్ ఆశీర్వాదాలు",
    claimDailyReward: "రోజువారీ ఆశీర్వాదం పొందండి (+౧౦౦ పాయింట్లు)",
    dailyRewardClaimed: "రోజువారీ ఆశీర్వాదం పొందబడింది!",
    referralCode: "మీ రెఫరల్ కోడ్",
    enterReferral: "రెఫరల్ కోడ్ నమోదు చేయండి",
    applyReferral: "కోడ్‌ను వర్తింపజేయి",
    referralBonusDesc: "బహుమతి: ఇద్దరికీ +౨౦౦ బోనస్ పాయింట్లు లభిస్తాయి!",
    voiceAssistant: "గురు వాయిస్ అసిస్టెంట్",
    enableVoice: "సమాధానాలను గట్టిగా చదవండి",
    signout: "లాగ్ అవుట్",
    editName: "పేరు మార్చు",
    saveName: "పేరు సేవ్ చేయి",

    quizGenTitle: "AI క్విజ్ బిల్డర్",
    quizGenDesc: "మీకు నచ్చిన విషయాన్ని టైప్ చేయండి, మా AI మీ కోసం క్విజ్ సమాధానాలను సిద్ధం చేస్తుంది.",
    topicPlaceholder: "ఉదాహరణకు, ఉపనిషత్తులు, సైన్స్, గణితం...",
    generateBtn: "AI క్విజ్ సృష్టించండి",
    generatingQuiz: "గురువు గారు మీ కోసం క్విజ్ సిద్ధం చేస్తున్నారు...",

    chatTitle: "AI స్టడీ అసిస్టెంట్",
    chatDesc: "గణితం, చరిత్ర, సైన్స్ లేదా గ్రంథాల పట్ల ఏవైనా సందేహాలు ఉంటే అడగండి.",
    chatPlaceholder: "వివేక అసిస్టెంట్‌ని అడగండి...",
    sendBtn: "పంపు",
    listening: "శ్రద్ధగా వింటున్నారు...",
    errorMic: "మైక్రోఫోన్ అనుమతి నిరాకరించబడింది",

    certOfAchievement: "జ్ఞాన సంపన్న సాధన ధృవీకరణ పత్రం",
    certSubtitle: "ఇది వివేక పరిధిలో గంభీరమైన అధ్యయనం మరియు మేధోపరమైన అన్వేషణకు లభించిన గుర్తింపు",
    certThisIsToCertify: "దీని ద్వారా గర్వంగా ధృవీకరించేది ఏమనగా,",
    certSecuredPoints: "యశస్విగా అత్యుత్తమ ఖచ్చితత్వాన్ని ప్రదర్శించి పాయింట్లు సాధించారు",
    certIssuedBy: "వివేక జ్ఞాన వేదిక",
    certId: "సర్టిఫికేట్ ఐడి",
    certConferralDate: "ప్రదానం చేసిన తేదీ"
  },
  ta: {
    brand: "விவேகா",
    slogan: "போட்டித் தேடலின் மூலம் உங்கள் உள் ஞானத்தை வெளிப்படுத்துங்கள்.",
    beginBtn: "ஆரம்பிப்போம்",
    aligningChakras: "சக்கரங்களை ஒருங்கிணைக்கிறது...",
    summoning: "விவேகாவை வரவேற்கிறது...",

    loginTitle: "வரவேற்கிறோம்!",
    loginDesc: "உங்கள் அறிவுக்கான தேடலைத் தொடர்ந்து, லீடர்போர்டில் உங்கள் இடத்தைப் பிடியுங்கள்.",
    signupTitle: "கணக்கை உருவாக்கவும்",
    signupDesc: "அறிவு மற்றும் ஞானத்தின் உங்கள் பயணத்தைத் தொடங்குங்கள்.",
    emailLabel: "மின்னஞ்சல் முகவரி",
    passwordLabel: "ரகசிய கடவுச்சொல்",
    nameLabel: "முழு பெயர்",
    namePlaceholder: "உங்கள் பெயரை உள்ளிடவும்",
    enterQuestBtn: "உள்நுழைக",
    decryptingQuest: "ரகசியக் குறியீடு அவிழ்க்கப்படுகிறது...",
    constructingIdentity: "கணக்கு உருவாக்கப்படுகிறது...",
    createAccountBtn: "பதிவு செய்க",
    needSandbox: "சாண்ட்பாக்ஸ் உள்நுழைவு வேண்டுமா? (தானியங்கி நிரப்பல்)",
    orDiscoverWith: "அல்லது இதனுடன் ஆராயுங்கள்",
    newToJourney: "பயணத்திற்கு புதியவரா?",
    alreadyHaveAccount: "ஏற்கனவே கணக்கு உள்ளதா? உள்நுழையவும்",
    fillDetailsError: "தயவுசெய்து முதலில் அனைத்து விவரங்களையும் நிரப்பவும்.",
    passwordLengthError: "பாதுகாப்பிற்காக கடவுச்சொல் குறைந்தது ௮ எழுத்துகள் கொண்டிருக்க வேண்டும்.",
    emailInUseError: "இந்த மின்னஞ்சல் ஏற்கனவே மற்றொரு தேடலில் பயன்படுத்தப்பட்டுள்ளது.",
    regProfileError: "கணக்கை பதிவு செய்ய முடியவில்லை. மின்னஞ்சல் அல்லது இணையத்தை சரிபார்க்கவும்.",
    invalidCredentialsError: "தவறான விவரங்கள். சாண்ட்பாக்ஸ் முயற்சிக்கவும் அல்லது புதிய கணக்கைத் திறக்கவும்!",
    googleIncompleteError: "கூகிள் ஒற்றை உள்நுழைவு உருவகப்படுத்துதல் முழுமையடையவில்லை.",
    accountGeneratedSuccess: "கணக்கு உருவாக்கப்பட்டது! ஆன்மீக ஒருங்கிணைப்பு...",

    home: "முகப்பு",
    leaderboard: "லீடர்போர்டு",
    badges: "விருதுகள்",
    profile: "விவரக்குறிப்பு",
    aiChat: "AI படிப்பு",
    aiQuizGen: "AI வினாடிவினா",
    dailyChallenge: "தினசரி AI",
    referral: "பரிந்துரை",
    admin: "நிர்வாகம்",

    exploreCategories: "ஞானப் பிரிவுகளை ஆராயுங்கள்",
    welcomeBack: "வரவேற்கிறோம்,",
    currentStreak: "தற்போதைய தொடர்",
    days: "நாட்கள்",
    startQuiz: "வினாடிவினா தொடங்கு",
    points: "புள்ளிகள்",
    pointsAcquired: "புள்ளிகள் பெற்றுள்ளீர்கள்!",
    categories: {
      Ramayana: "இராமாயணம்",
      Mahabharata: "மகாபாரதம்",
      "Bhagavad Gita": "பகவத் கீதை",
      "Indian History": "இந்திய வரலாறு",
      "Indian Culture": "இந்திய கலாச்சாரம்",
      Science: "அறிவியல்",
      Mathematics: "கணிதம்",
      Technology: "தொழில்நுட்பம்",
      Geography: "புவியியல்",
      "General Knowledge": "பொது அறிவு"
    },

    questionOf: "கேள்வி",
    timer: "நேரம்",
    score: "மதிப்பெண்",
    quit: "வெளியேறு",
    explainAnswer: "விளக்கம் கூறு",
    closeBtn: "மூடு",
    nextQuestion: "அடுத்த கேள்வி",
    finishQuest: "தேடலை முடி",
    submittingQuiz: "முடிவுகள் சமர்ப்பிக்கப்படுகின்றன...",
    timesUp: "நேரம் முடிந்தது!",
    remaining: "மீதமுள்ளது",
    guruSays: "குரு கூறுகிறார்:",
    obtainAiExplanation: "குரு AI விளக்கத்தைப் பெறுங்கள்",
    aligningLayers: "அடுக்குகளை ஒழுங்குபடுத்துகிறது...",

    congratulations: "வாழ்த்துகள்!",
    quizCompleted: "தேடல் முடிந்தது!",
    correctAnswers: "சரியான பதில்கள்",
    incorrectAnswers: "தவறான பதில்கள்",
    pointsGained: "பெற்ற புள்ளிகள்",
    xpGained: "பெற்ற எக்ஸ்-பி",
    newBadges: "புதிய பதக்கங்கள் திறக்கப்பட்டுள்ளன!",
    playAgain: "மீண்டும் விளையாடு",
    goHome: "முகப்புக்குச் செல்",
    downloadCertificate: "சான்றிதழ் பதிவிறக்கம்",
    shareTitle: "விவேகா அறிவு மைல்கல்",
    shareMessage: "விவேகாவில் நான் வினாடிவினாவை முடித்துள்ளேன், எனது மதிப்பெண்",
    obtainedSuccess: "சான்றிதழ் வெற்றிகரமாக பதிவிறக்கம் செய்யப்பட்டது!",
    returnDashboard: "முகப்புக்குத் திரும்பு",
    experienceGained: "பெற்ற அனுபவம்",
    totalDharmaPoints: "மொத்த தர்மப் புள்ளிகள்",
    unlockedAchievementsHeader: "திறக்கப்பட்ட சாதனைகள்",

    rank: "தரவரிசை",
    competitor: "உயரிய தேடலளர்",
    streak: "தொடர்",
    realUsersOnly: "பதிவுசெய்யப்பட்ட அன்வேஷகர்கள்",
    weeklyTab: "வாராந்திர",
    monthlyTab: "மாதாந்திர",
    allTimeTab: "அனைத்து நேரம்",
    interpretingScrolls: "லீடர்போர்டு பதிவுகள் வாசிக்கப்படுகின்றன...",
    yourRank: "உங்களுடைய தரவரிசை",
    topPercent: "இந்த சுழற்சியில் சிறந்த ௫%",

    achievements: "புனிதமான சாதனைகள்",
    unlocked: "திறக்கப்பட்டது",
    locked: "பூட்டப்பட்டது",
    requirement: "தேவை",
    currentJourney: "தற்போதைய பயணம்",
    scholarTitle: "அறிவு மேம்பட்ட அறிஞர்",
    explorerTitle: "ஞானத் தேடலளர்",
    hallOfBadges: "விருதுகளின் கூடம்",
    earned: "வென்றவை",
    active: "செயலில்",
    milestones: "கற்றல் மைல்கற்கள்",
    milestone1Title: "தர்மத்தின் முதல் படி",
    milestone1Desc: "உங்கள் சுயவிவர பதிவை வெற்றிகரமாக முடித்துள்ளீர்கள்.",
    milestone2Title: "பண்டைய வரலாற்று ஆய்வாளர்",
    milestone2Desc: "வினாடிவினா பிரிவை வெற்றிகரமாக முடித்துள்ளீர்கள்.",

    language: "பயன்பாட்டு மொழி",
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
    streakRecovery: "தொடர் மீட்பு வெகுமதி",
    recoverBtn: "மீட்டெடு (௨௫௦ புள்ளிகள்)",
    dauloginrewards: "தினசரி உள்நுழைவு ஆசி",
    claimDailyReward: "தினசரி ஆசியைக் கோருங்கள் (+௧௦௦ புள்ளிகள்)",
    dailyRewardClaimed: "தினசரி ஆசி கோரப்பட்டது!",
    referralCode: "உங்கள் பரிந்துரைக் குறியீடு",
    enterReferral: "பரிந்துரைக் குறியீட்டை உள்ளிடவும்",
    applyReferral: "குறியீட்டைப் பயன்படுத்து",
    referralBonusDesc: "வெகுமதி: இருவருக்கும் +௨௦௦ போனஸ் புள்ளிகள் கிடைக்கும்!",
    voiceAssistant: "குரு குரல் உதவியாளர்",
    enableVoice: "பதில்களை சத்தமாக வாசிக்கவும்",
    signout: "வெளியேறு",
    editName: "பெயரை மாற்று",
    saveName: "பெயரைச் சேமி",

    quizGenTitle: "AI வினாடிவினா உருவாக்குநர்",
    quizGenDesc: "உங்களுக்குப் பிடித்த தலைப்பை டைப் செய்யவும், எங்கள் AI வினாடிவினாவைத் தயாரிக்கும்.",
    topicPlaceholder: "எ.கா, உபநிடதங்கள், விண்வெளி, கணிதம்...",
    generateBtn: "AI வினாடிவினா உருவாக்கு",
    generatingQuiz: "குரு உங்களுக்காக வினாடிவினாவைத் தயாரிக்கிறார்...",

    chatTitle: "AI படிப்பு உதவியாளர்",
    chatDesc: "கணிதம், வரலாறு, அறிவியல் அல்லது நூல்கள் குறித்த எந்த சந்தேகங்களையும் கேளுங்கள்.",
    chatPlaceholder: "விவேகா உதவியாளரிடம் கேளுங்கள்...",
    sendBtn: "அனுப்பு",
    listening: "கவனமுடன் கேட்கிறது...",
    errorMic: "ஒலிவாங்கி அனுமதி மறுக்கப்பட்டது",

    certOfAchievement: "ஞான சாதனைச் சான்றிதழ்",
    certSubtitle: "இது விவேகா அமைப்பில் ஆழமான படிப்பு மற்றும் அறிவுத் தேடலுக்கான அங்கீகாரமாகும்",
    certThisIsToCertify: "இதன் மூலம் பெருமையுடன் சான்றளிக்கப்படுகிறது என்னவென்றால்,",
    certSecuredPoints: "அவர்கள் வெற்றிகரமாக சிறந்த துல்லியத்தை வெளிப்படுத்தி புள்ளிகள் பெற்றுள்ளனர்",
    certIssuedBy: "விவேகா ஞான அரங்கம்",
    certId: "சான்றிதழ் ஐடி",
    certConferralDate: "வழங்கப்பட்ட தேதி"
  }
};
