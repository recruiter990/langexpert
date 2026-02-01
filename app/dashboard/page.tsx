'use client';

import { useState, useEffect } from 'react';
import { loadUserProfile, UserProfile } from '@/lib/user';
import { loadUserStats, getDefaultStats } from '@/lib/gamification';
import { languages } from '@/lib/languages';
import ProgressBar from '@/components/ProgressBar';
import Link from 'next/link';

export default function DashboardPage() {
  // Initialize with null or default values - DON'T call localStorage functions here
  const [stats, setStats] = useState(getDefaultStats());
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load ALL data inside useEffect - this only runs in browser
    const savedProgress = localStorage.getItem('italian-learning-progress');
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error('Failed to load progress:', e);
      }
    }
    
    // Load stats and profile here
    setStats(loadUserStats());
    setProfile(loadUserProfile());
    setIsLoading(false);
  }, []);

  const completedLessons = Object.keys(progress).filter(key => progress[key]).length;
  const totalLessons = 15; // Approximate total
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  const unlockedAchievements = stats.achievements.filter(a => a.unlocked);
  const lockedAchievements = stats.achievements.filter(a => !a.unlocked);

  // Show loading state while data loads
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-light">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading font-bold text-text">Dashboard</h1>
            <div className="flex gap-4">
              <Link href="/learn" className="text-primary hover:underline">Learn</Link>
              <Link href="/translate" className="text-primary hover:underline">Translate</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-heading font-bold mb-2">
            Welcome back{profile?.name ? `, ${profile.name}` : ''}!
          </h2>
          <p className="text-white/90">
            {profile?.targetLanguage && (
              <>
                Learning {languages.find(l => l.code === profile.targetLanguage)?.flag}{' '}
                {languages.find(l => l.code === profile.targetLanguage)?.name}
              </>
            )}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-2xl font-heading font-bold text-text">{stats.currentStreak}</div>
            <div className="text-sm text-text-light">Day Streak</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-heading font-bold text-text">{stats.xp.toLocaleString()}</div>
            <div className="text-sm text-text-light">Total XP</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-3xl mb-2">📚</div>
            <div className="text-2xl font-heading font-bold text-text">{stats.totalLessons}</div>
            <div className="text-sm text-text-light">Lessons Completed</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-heading font-bold text-text">{unlockedAchievements.length}</div>
            <div className="text-sm text-text-light">Achievements</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Progress Overview */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-heading font-bold text-text mb-4">Progress Overview</h3>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-text">Overall Progress</span>
                <span className="text-primary font-semibold">{progressPercentage}%</span>
              </div>
              <ProgressBar progress={progressPercentage} />
            </div>
            <div className="space-y-2 text-sm text-text-light">
              <div className="flex justify-between">
                <span>Lessons Completed</span>
                <span className="font-semibold text-text">{completedLessons}/{totalLessons}</span>
              </div>
              <div className="flex justify-between">
                <span>Perfect Quizzes</span>
                <span className="font-semibold text-text">{stats.perfectQuizzes}</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-heading font-bold text-text mb-4">Achievements</h3>
            <div className="space-y-3">
              {unlockedAchievements.length > 0 ? (
                unlockedAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg border border-secondary/20"
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-text">{achievement.name}</div>
                      <div className="text-sm text-text-light">{achievement.description}</div>
                    </div>
                    <span className="text-xs text-text-light">
                      {achievement.unlockedAt
                        ? new Date(achievement.unlockedAt).toLocaleDateString()
                        : ''}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-text-light text-center py-4">No achievements unlocked yet</p>
              )}
            </div>
            {lockedAchievements.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-text-light mb-2">Locked Achievements:</p>
                <div className="flex flex-wrap gap-2">
                  {lockedAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs text-text-light"
                      title={achievement.description}
                    >
                      <span className="opacity-50">{achievement.icon}</span>
                      <span>{achievement.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-xl font-heading font-bold text-text mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/learn"
              className="p-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-center font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Continue Learning
            </Link>
            <Link
              href="/practice"
              className="p-4 bg-secondary text-white rounded-lg text-center font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Practice Mode
            </Link>
            <Link
              href="/translate"
              className="p-4 bg-accent text-white rounded-lg text-center font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Use Translator
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
