import { WordWithCategory } from "./categories.ts";
import { Team } from "./team.ts";

export interface Game {
  currentRound: Round | null;
  currentTurn: Turn | null;
  teams: Team[];
  status: "not_started" | "in_progress" | "finished";

  settings: {
    numberOfWords: number;
    secondsPerTurn: number;
    isPenaltySelected: boolean;
    selectedCategoryNames: string[];
    selectedWords: WordWithCategory[];
    numberOfRounds: number;
  };

  rounds: Round[];
}

export interface Round {
  roundNumber: number;
  remainingWords: WordWithCategory[];
  turnHistories: Turn[];
}

export interface Turn {
  turnNumber: number;
  _teamId: number;
  _playerId: number;
  remainingSeconds: number;
  wordHistories: WordHistory[];
  score: number;

  // for active turn
  activeWord?: WordWithCategory | null;
}

export interface WordHistory {
  word: WordWithCategory;
  isCorrect: boolean;
}


