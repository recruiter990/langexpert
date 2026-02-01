'use client';

import { useState, useEffect } from 'react';
import { lessons, Lesson } from '@/data/lessons';
import {
  getLevelLessons,
  calculateOverallProgress,
  isLevelUnlocked,
} from '@/lib/utils';
import { loadUserStats, completeLesson, completePerfectQuiz, updateStreak } from '@/lib/gamification';
import { loadUserProfile } from '@/lib/user';
import { languages } from '@/lib/languages';
import LessonCard from '@/components/LessonCard';
import QuizQuestion from '@/components/QuizQuestion';
import ProgressBar from '@/components/ProgressBar';
import LevelSelector from '@/components/LevelSelector';
import Link from 'next/link';

type ViewMode = 'lessons' | 'quiz' | 'results';

export default function LearnPage() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('lessons');
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hasAnsweredCurrentQuestion, setHasAnsweredCurrentQuestion] = useState(false);
  const [userStats, setUserStats] = useState(loadUserStats());

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('italian-learning-progress');
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error('Failed to load progress:', e);
      }
    }
    
    // Update streak on page load
    updateStreak();
    setUserStats(loadUserStats());
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('italian-learning-progress', JSON.stringify(progress));
  }, [progress]);

  const levelLessons = getLevelLessons(currentLevel);
  const overallProgress = calculateOverallProgress(progress);
  const profile = loadUserProfile();

  const handleLevelSelect = (level: number) => {
    if (isLevelUnlocked(level, progress)) {
      setCurrentLevel(level);
      setCurrentLesson(null);
      setViewMode('lessons');
    }
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setViewMode('lessons');
    setCurrentQuestionIndex(0);
    setQuizScore({ correct: 0, total: 0 });
  };

  const handleStartQuiz = () => {
    if (currentLesson) {
      setViewMode('quiz');
      setCurrentQuestionIndex(0);
      setQuizScore({ correct: 0, total: currentLesson.quiz.length });
      setHasAnsweredCurrentQuestion(false);
    }
  };

  const handleQuizAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setQuizScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    }
  };

  const handleNextQuestion = () => {
    if (currentLesson && currentQuestionIndex < currentLesson.quiz.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setHasAnsweredCurrentQuestion(false);
    } else {
      // Quiz completed
      const percentage = (quizScore.correct / quizScore.total) * 100;
      if (percentage >= 70 && currentLesson) {
        setProgress((prev) => ({ ...prev, [currentLesson.id]: true }));
        completeLesson();
        
        // Check for perfect score
        if (percentage === 100) {
          completePerfectQuiz();
        }
        
        setUserStats(loadUserStats());
      }
      setViewMode('results');
    }
  };

  const handleRetakeQuiz = () => {
    setViewMode('quiz');
    setCurrentQuestionIndex(0);
    setQuizScore({ correct: 0, total: currentLesson?.quiz.length || 0 });
    setHasAnsweredCurrentQuestion(false);
  };

  const handleBackToLessons = () => {
    setViewMode('lessons');
    setCurrentQuestionIndex(0);
    setQuizScore({ correct: 0, total: 0 });
    setHasAnsweredCurrentQuestion(false);
  };

  const currentQuestion =
    currentLesson && currentLesson.quiz[currentQuestionIndex];
  const quizPercentage =
    quizScore.total > 0
      ? Math.round((quizScore.correct / quizScore.total) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-text">
                {profile?.targetLanguage ? (
                  <>
                    {languages.find(l => l.code === profile.targetLanguage)?.flag} Learn{' '}
                    {languages.find(l => l.code === profile.targetLanguage)?.name}
                  </>
                ) : (
                  <>🇮🇹 Learn Italian</>
                )}
              </h1>
              <p className="text-sm text-text-light">
                Master {languages.find(l => l.code === profile?.targetLanguage)?.name || 'Italian'} step by step
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-text-light hover:text-primary">
                Dashboard
              </Link>
              <div className="text-right">
                <p className="text-sm text-text-light mb-1">Overall Progress</p>
                <ProgressBar progress={overallProgress} showPercentage={true} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Gamification Stats Bar */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔥</span>
              <span>Streak: {userStats.currentStreak} days</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">⭐</span>
              <span>XP: {userStats.xp.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📚</span>
              <span>Lessons: {userStats.totalLessons}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Level Selector */}
        {!currentLesson && (
          <LevelSelector
            currentLevel={currentLevel}
            onLevelSelect={handleLevelSelect}
            progress={progress}
          />
        )}

        {/* Back Button */}
        {currentLesson && (
          <button
            onClick={() => {
              setCurrentLesson(null);
              setViewMode('lessons');
            }}
            className="mb-6 flex items-center text-primary hover:text-primary-dark font-medium transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Level {currentLevel}
          </button>
        )}

        {/* Lesson List View */}
        {!currentLesson && (
          <div>
            <h2 className="text-2xl font-heading font-bold text-text mb-6">
              Level {currentLevel} Lessons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {levelLessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => handleLessonSelect(lesson)}
                  className={`p-6 rounded-xl border-2 text-left transition-all duration-300 ${
                    progress[lesson.id]
                      ? 'border-secondary bg-secondary/10 hover:border-secondary-dark'
                      : 'border-gray-300 bg-white hover:border-primary hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-heading font-bold text-text">
                      {lesson.category}
                    </h3>
                    {progress[lesson.id] && (
                      <span className="text-secondary font-bold text-xl">✓</span>
                    )}
                  </div>
                  <p className="text-sm text-text-light">
                    {lesson.items.length} items • {lesson.quiz.length} quiz questions
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Lesson Content View */}
        {currentLesson && viewMode === 'lessons' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-text">
                {currentLesson.category}
              </h2>
              {progress[currentLesson.id] && (
                <span className="px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-semibold">
                  ✓ Completed
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentLesson.items.map((item, index) => (
                <LessonCard key={index} item={item} index={index} />
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={handleStartQuiz}
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Start Quiz
              </button>
            </div>
          </div>
        )}

        {/* Quiz View */}
        {currentLesson && viewMode === 'quiz' && currentQuestion && (
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-heading font-bold text-text">Quiz</h2>
                <span className="text-sm font-medium text-text-light">
                  Score: {quizScore.correct}/{quizScore.total}
                </span>
              </div>
              <ProgressBar
                progress={quizPercentage}
                label={`Progress: ${currentQuestionIndex + 1}/${currentLesson.quiz.length}`}
              />
            </div>

            <QuizQuestion
              key={currentQuestionIndex}
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={currentLesson.quiz.length}
              onAnswer={handleQuizAnswer}
              onAnswered={() => setHasAnsweredCurrentQuestion(true)}
            />

            {hasAnsweredCurrentQuestion && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleNextQuestion}
                  className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  {currentQuestionIndex >= currentLesson.quiz.length - 1
                    ? 'Finish Quiz'
                    : 'Next Question'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Quiz Results View */}
        {currentLesson && viewMode === 'results' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="mb-6">
                {quizPercentage >= 70 ? (
                  <div className="text-6xl mb-4">🎉</div>
                ) : (
                  <div className="text-6xl mb-4">📚</div>
                )}
                <h2 className="text-3xl font-heading font-bold text-text mb-2">
                  {quizPercentage >= 70 ? 'Congratulations!' : 'Keep Practicing!'}
                </h2>
                <p className="text-text-light">
                  {quizPercentage >= 70
                    ? 'You passed the quiz! This lesson is now marked as completed.'
                    : 'You need 70% to pass. Review the lesson and try again!'}
                </p>
              </div>

              <div className="mb-8">
                <div className="text-5xl font-heading font-bold text-primary mb-2">
                  {quizPercentage}%
                </div>
                <p className="text-text-light mb-4">
                  You got {quizScore.correct} out of {quizScore.total} questions correct
                </p>
                <ProgressBar progress={quizPercentage} />
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleRetakeQuiz}
                  className="px-6 py-3 bg-gray-200 text-text rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Retake Quiz
                </button>
                <button
                  onClick={handleBackToLessons}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Back to Lesson
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-text-light">
            Made with ❤️ for language learners
          </p>
        </div>
      </footer>
    </div>
  );
}

