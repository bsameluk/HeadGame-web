export interface GameParams {
  teams: Team[];
  selectedCategoryNames: string[];
  secondsPerTurn: number;
  isPenaltySelected: boolean;
}

export interface Team {
  _id?: number;
  name: string;
  score: number;
  players: Player[];
}

export interface Player {
  _id?: number;
  name: string;
  score: number;
  playerNumber: number;
}

export interface Category {
  name: string;
  items: CategoryItem[];
}

export interface CategoryItem {
  name: string;
  level: 'easy' | 'medium' | 'hard';
}