/**
 * Defines the structure of a visual theme used for mood‑boosting decor.
 */
export interface Theme {
  /** Unique identifier for the theme */
  id: string;
  /** Display name */
  name: string;
  /** Brief description of the theme mood */
  description: string;
  /** Color palette for UI and decor accents */
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  /** Array of pattern asset URLs or local paths */
  patterns: string[];
}