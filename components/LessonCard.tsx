'use client';

import { LessonItem } from '@/data/lessons';

interface LessonCardProps {
  item: LessonItem;
  index: number;
}

export default function LessonCard({ item, index }: LessonCardProps) {
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'it-IT';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            {item.italian}
          </h3>
          <p className="text-sm md:text-base text-gray-600">{item.english}</p>
        </div>
        <button
          onClick={() => speak(item.italian)}
          className="ml-4 p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors duration-200 flex-shrink-0"
          aria-label="Pronounce"
          title="Click to hear pronunciation"
        >
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}


