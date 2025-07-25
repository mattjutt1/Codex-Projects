import 'dotenv/config';
import { Theme } from './types';

const PATTERNS_BASE = process.env.PATTERNS_BASE_URL;
if (!PATTERNS_BASE) {
  throw new Error('PATTERNS_BASE_URL not set in .env');
}

/**
 * Core list of available mood themes with palettes and pattern libraries.
 */
export const themes: Theme[] = [
  {
    id: 'energize',
    name: 'Energize',
    description: 'Vibrant oranges and yellows to boost energy.',
    palette: {
      primary: '#FF5722',
      secondary: '#FFC107',
      accent: '#FFEB3B',
      background: '#FFF3E0',
      text: '#212121',
    },
    patterns: Array.from({ length: 10 }, (_, i) =>
      `${PATTERNS_BASE}/energize/${i + 1}.png`
    ),
  },
  {
    id: 'calm',
    name: 'Calm',
    description: 'Soft blues and greens for a soothing vibe.',
    palette: {
      primary: '#4FC3F7',
      secondary: '#AED581',
      accent: '#81C784',
      background: '#E0F7FA',
      text: '#263238',
    },
    patterns: Array.from({ length: 10 }, (_, i) =>
      `${PATTERNS_BASE}/calm/${i + 1}.png`
    ),
  },
  {
    id: 'nostalgia',
    name: 'Nostalgia',
    description: 'Warm sepias and muted tones for comfort.',
    palette: {
      primary: '#A1887F',
      secondary: '#D7CCC8',
      accent: '#FFAB91',
      background: '#EFEBE9',
      text: '#5D4037',
    },
    patterns: Array.from({ length: 10 }, (_, i) =>
      `${PATTERNS_BASE}/nostalgia/${i + 1}.png`
    ),
  },
  {
    id: 'fresh',
    name: 'Fresh',
    description: 'Crisp whites and pastel greens for renewal.',
    palette: {
      primary: '#C5E1A5',
      secondary: '#E6EE9C',
      accent: '#FFCC80',
      background: '#F1F8E9',
      text: '#33691E',
    },
    patterns: Array.from({ length: 10 }, (_, i) =>
      `${PATTERNS_BASE}/fresh/${i + 1}.png`
    ),
  },
];

/**
 * Returns all available themes.
 */
export function getThemes(): Theme[] {
  return themes;
}

/**
 * Finds a theme by its id.
 */
export function getThemeById(id: string): Theme | undefined {
  return themes.find((t) => t.id === id);
}