export type UserProfile = {
  nativeLanguage: string;
  targetLanguage: string;
  learningGoal: string;
  currentLevel: string;
  dailyGoal: string;
  name?: string;
  createdAt: number;
};

export const defaultProfile: UserProfile = {
  nativeLanguage: 'en',
  targetLanguage: 'it',
  learningGoal: 'Hobby',
  currentLevel: 'Beginner',
  dailyGoal: '10 min',
  createdAt: Date.now(),
};

export const loadUserProfile = (): UserProfile | null => {
  // ✅ ADD THIS CHECK
  if (typeof window === 'undefined') {
    return null;
  }

  const saved = localStorage.getItem('user-profile');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load user profile:', e);
    }
  }
  return null;
};

export const saveUserProfile = (profile: UserProfile): void => {
  // ✅ ADD THIS CHECK
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.setItem('user-profile', JSON.stringify(profile));
};

export const hasCompletedOnboarding = (): boolean => {
  // ✅ ADD THIS CHECK
  if (typeof window === 'undefined') {
    return false;
  }
  
  return loadUserProfile() !== null;
};
