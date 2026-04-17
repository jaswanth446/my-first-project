/**
 * music track interface
 */
export interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  audioUrl: string;
}

/**
 * Game state interface
 */
export interface GameState {
  score: number;
  highScore: number;
  isGameOver: boolean;
  isPaused: boolean;
}
