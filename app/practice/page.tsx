'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PracticePage() {
  const [practiceMode, setPracticeMode] = useState<string | null>(null);

  const practiceModes = [
    {
      id: 'flashcards',
      title: 'Flashcards',
      icon: '🃏',
      description: 'Swipe through vocabulary cards',
      color: 'from-primary to-secondary',
    },
    {
      id: 'quiz',
      title: 'Multiple Choice',
      icon: '❓',
      description: 'Test your knowledge with quizzes',
      color: 'from-secondary to-success',
    },
    {
      id: 'fill-blank',
      title: 'Fill in the Blank',
      icon: '✍️',
      description: 'Complete sentences',
      color: 'from-accent to-primary',
    },
    {
      id: 'matching',
      title: 'Matching Game',
      icon: '🔗',
      description: 'Match words to translations',
      color: 'from-primary to-accent',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading font-bold text-text">Practice Mode</h1>
            <Link href="/learn" className="text-primary hover:underline">Back to Learn</Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-text mb-4">
            Choose Your Practice Mode
          </h2>
          <p className="text-text-light">
            Practice makes perfect! Select a mode to improve your skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {practiceModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setPracticeMode(mode.id)}
              className={`p-8 rounded-xl bg-gradient-to-r ${mode.color} text-white text-left hover:shadow-xl transform hover:scale-105 transition-all`}
            >
              <div className="text-5xl mb-4">{mode.icon}</div>
              <h3 className="text-2xl font-heading font-bold mb-2">{mode.title}</h3>
              <p className="text-white/90">{mode.description}</p>
            </button>
          ))}
        </div>

        {practiceMode && (
          <div className="mt-12 bg-white rounded-xl p-8 border border-gray-200 text-center">
            <p className="text-text-light mb-4">
              {practiceModes.find(m => m.id === practiceMode)?.title} mode coming soon!
            </p>
            <button
              onClick={() => setPracticeMode(null)}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Go Back
            </button>
          </div>
        )}

        {/* Daily Challenge */}
        <div className="mt-12 bg-gradient-to-r from-accent to-primary rounded-xl p-8 text-white text-center">
          <div className="text-5xl mb-4">⚡</div>
          <h3 className="text-2xl font-heading font-bold mb-2">Daily Challenge</h3>
          <p className="text-white/90 mb-6">
            Complete today's challenge to earn bonus XP!
          </p>
          <button className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
            Start Challenge
          </button>
        </div>
      </main>
    </div>
  );
}

