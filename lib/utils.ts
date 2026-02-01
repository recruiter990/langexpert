import { lessons, Lesson } from '@/data/lessons';

export function getLevelLessons(level: number): Lesson[] {
  return lessons.filter((lesson) => lesson.level === level);
}

export function calculateLevelProgress(level: number, progress: Record<string, boolean>): number {
  const levelLessons = lessons.filter((lesson) => lesson.level === level);
  if (levelLessons.length === 0) return 0;
  
  const completed = levelLessons.filter((lesson) => progress[lesson.id]).length;
  return Math.round((completed / levelLessons.length) * 100);
}

export function calculateOverallProgress(progress: Record<string, boolean>): number {
  if (lessons.length === 0) return 0;
  const completed = lessons.filter((lesson) => progress[lesson.id]).length;
  return Math.round((completed / lessons.length) * 100);
}

export function isLevelUnlocked(level: number, progress: Record<string, boolean>): boolean {
  if (level === 1) return true;
  
  const previousLevel = level - 1;
  const previousLevelLessons = lessons.filter((lesson) => lesson.level === previousLevel);
  
  if (previousLevelLessons.length === 0) return true;
  
  // Check if at least 70% of previous level is completed
  const completed = previousLevelLessons.filter((lesson) => progress[lesson.id]).length;
  const percentage = (completed / previousLevelLessons.length) * 100;
  
  return percentage >= 70;
}

