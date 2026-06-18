/**
 * Shared Type Definitions for VIVEKA
 */

import { SupportedLang } from "./data/translations";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  avatarUrl: string;
  points: number;
  streak: number;
  bestStreak: number;
  unlockedBadgeIds: string[];
  createdAt: number;
  level: number;
  language?: SupportedLang;
  referralCode?: string;
  referredBy?: string;
  dailyRewardClaimedAt?: number;
  voiceAssistantEnabled?: boolean;
  claimedMilestoneIds?: string[];
  lastActiveAt?: number;
  lastDailyChallengeAt?: number;
}

export enum QuizCategory {
  RAMAYANA = "Ramayana",
  MAHABHARATA = "Mahabharata",
  BHAGAVAD_GITA = "Bhagavad Gita",
  INDIAN_HISTORY = "Indian History",
  INDIAN_CULTURE = "Indian Culture",
  SCIENCE = "Science",
  MATHEMATICS = "Mathematics",
  TECHNOLOGY = "Technology",
  GEOGRAPHY = "Geography",
  GENERAL_KNOWLEDGE = "General Knowledge"
}

export interface Question {
  id: string;
  category: QuizCategory;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
}

export interface LeaderboardEntry {
  uid: string;
  displayName: string;
  avatarUrl: string;
  points: number;
  streak: number;
  isCurrentUser?: boolean;
  rank?: number;
  change?: "up" | "down" | "none";
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string; // lucide class or icon key
  unlockedIconName: string;
  requirementDescription: string;
  isUnlocked: boolean;
  category?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  unlockedAt: number;
}
