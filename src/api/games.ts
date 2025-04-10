import { createApiCall } from "./requests";

export interface Game {
  id: number;
  name: string;
  numOfWords: number;
  secodsPerRound: number;
}

export interface Category {
  name: string;
}

export interface CreateGameRequest {
  name: string;
  number_of_words: number;
  seconds_per_round: number;
}

export interface LoadGameResponse {
  game: Game;
  categories: Category[];
}

// export const loadGames = createApiCall<
//   void,
//   Game[]
// >('GET', '/games');

// export const createGame = createApiCall<
//   CreateGameRequest,
//   Game
// >('POST', '/games');

// export const loadGame = createApiCall<
//   number,
//   LoadGameResponse
// >('GET', (id) => `/games/${id}`);