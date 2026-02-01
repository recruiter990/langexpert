'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { languages, getLanguageByCode, getLanguageCodeForSpeech } from '@/lib/languages';
import { translateText, getCachedTranslation, setCachedTranslation } from '@/lib/translation';
import { loadUserProfile } from '@/lib/user';

type SavedTranslation = {
  id: string;
  original: string;
  translated: string;
  fromLang: string;
  toLang: string;
  timestamp: number;
};

export default function TranslatePage() {
  const profile = loadUserProfile();
  const [fromLang, setFromLang] = useState(profile?.nativeLanguage || 'en');
  const [toLang, setToLang] = useState(profile?.targetLanguage || 'it');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [savedTranslations, setSavedTranslations] = useState<SavedTranslation[]>([]);
  const [recentTranslations, setRecentTranslations] = useState<SavedTranslation[]>([]);

  useEffect(() => {
    // Load saved translations
    const saved = localStorage.getItem('saved-translations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedTranslations(parsed);
        setRecentTranslations(parsed.slice(0, 5));
      } catch (e) {
        console.error('Failed to load saved translations:', e);
      }
    }
  }, []);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsTranslating(true);

    // Check cache first
    const cached = getCachedTranslation(inputText, fromLang, toLang);
    if (cached) {
      setTranslatedText(cached);
      setIsTranslating(false);
      return;
    }

    try {
      const translated = await translateText(inputText, fromLang, toLang);
      setTranslatedText(translated);
      
      // Cache the translation
      setCachedTranslation(inputText, fromLang, toLang, translated);
      
      // Save to recent translations
      const newTranslation: SavedTranslation = {
        id: Date.now().toString(),
        original: inputText,
        translated,
        fromLang,
        toLang,
        timestamp: Date.now(),
      };
      
      const updated = [newTranslation, ...recentTranslations].slice(0, 5);
      setRecentTranslations(updated);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSwap = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const handleSpeak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = getLanguageCodeForSpeech(lang);
      speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show toast notification (you can add a toast component)
  };

  const handleSave = () => {
    if (!inputText || !translatedText) return;
    
    const newTranslation: SavedTranslation = {
      id: Date.now().toString(),
      original: inputText,
      translated: translatedText,
      fromLang,
      toLang,
      timestamp: Date.now(),
    };
    
    const updated = [newTranslation, ...savedTranslations];
    setSavedTranslations(updated);
    localStorage.setItem('saved-translations', JSON.stringify(updated));
  };

  const suggestedPhrases = [
    'Hello, how are you?',
    'Thank you very much',
    'Where is the bathroom?',
    'I don\'t understand',
    'Can you help me?',
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-heading font-bold text-text">Translator</h1>
              <Link href="/translate/sentence-builder" className="text-sm text-primary hover:underline">
                Sentence Builder
              </Link>
            </div>
            <Link href="/" className="text-primary hover:underline">Back to Home</Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Language Selector */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <select
            value={fromLang}
            onChange={(e) => setFromLang(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
            <option value="en">🇬🇧 English</option>
          </select>

          <button
            onClick={handleSwap}
            className="p-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
            title="Swap languages"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>

          <select
            value={toLang}
            onChange={(e) => setToLang(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
            <option value="en">🇬🇧 English</option>
          </select>
        </div>

        {/* Translation Interface */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Area */}
            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                {getLanguageByCode(fromLang)?.name || 'English'}
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste text here..."
                className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none font-mono"
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-text-light">
                  {inputText.length}/500 characters
                </span>
                <button
                  onClick={() => setInputText('')}
                  className="text-xs text-text-light hover:text-text"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Output Area */}
            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                {getLanguageByCode(toLang)?.name || 'Italian'}
              </label>
              <div className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg bg-gray-50 font-mono overflow-y-auto">
                {isTranslating ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="text-text">{translatedText || 'Translation will appear here...'}</div>
                )}
              </div>
              {translatedText && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleSpeak(translatedText, toLang)}
                    className="px-3 py-1 text-xs bg-secondary text-white rounded hover:bg-secondary-dark transition-colors"
                    title="Listen"
                  >
                    📢 Listen
                  </button>
                  <button
                    onClick={() => handleCopy(translatedText)}
                    className="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                    title="Copy"
                  >
                    📋 Copy
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-3 py-1 text-xs bg-accent text-white rounded hover:bg-accent-dark transition-colors"
                    title="Save"
                  >
                    ⭐ Save
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Translate Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleTranslate}
              disabled={!inputText.trim() || isTranslating}
              className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isTranslating ? 'Translating...' : 'Translate'}
            </button>
          </div>
        </div>

        {/* Suggested Phrases */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-text mb-2">Suggested Phrases:</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedPhrases.map((phrase, index) => (
              <button
                key={index}
                onClick={() => setInputText(phrase)}
                className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
              >
                {phrase}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Translations */}
        {recentTranslations.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-heading font-bold text-text mb-4">Recent Translations</h3>
            <div className="space-y-3">
              {recentTranslations.map((trans) => (
                <div key={trans.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-text-light mb-1">
                    {getLanguageByCode(trans.fromLang)?.name} → {getLanguageByCode(trans.toLang)?.name}
                  </div>
                  <div className="text-text font-medium">{trans.original}</div>
                  <div className="text-text-light">{trans.translated}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

