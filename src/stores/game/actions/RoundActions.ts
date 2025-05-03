import { Game } from "@/types/game";
import { shuffle } from "lodash";
import RoundActionsHelpers from "./Helpers/RoundActionsHelpers";
import TurnActionsHelpers from "./Helpers/TurnActionsHelpers";

// итог хода
// =? есть ещё слова?

// =YES => следующий ход
//     - осталось время?
//     =YES => тот же игрок
//     =NO => следующий игрок

// =NO => следующий раунд
//     - осталось время?
//     =YES => тот же игрок
//     =NO => следующий игрок

const startGame = (state: Game) => {
  state.status = "in_progress";
  state.currentRound = {
    roundNumber: 1,
    remainingWords: shuffle(state.settings.selectedWords),
    turnHistories: [],
  }

  const newTeamId = RoundActionsHelpers.computeNextTeamId(state);
  const newPlayerId = RoundActionsHelpers.computeNextPlayerId(state, newTeamId);
  state.currentTurn = {
    turnNumber: 1,
    _teamId: newTeamId,
    _playerId: newPlayerId,
    remainingSeconds: state.settings.secondsPerTurn,
    wordHistories: [],
    score: 0,
  }

  // init active word for turn
  TurnActionsHelpers.setNextActiveWord(state)
}

const nextTurn = (state: Game) => {
  if (!state.currentRound || !state.currentTurn) {
    return startGame(state);
  }

  const hasRemainingWords = state.currentRound.remainingWords.length > 0;
  const hasRemainingTime = state.currentTurn.remainingSeconds > 0;

  let nextTeamId: number;
  let nextPlayerId: number;
  let remainingTime: number;

  if (hasRemainingTime) {
    nextTeamId = state.currentTurn._teamId;
    nextPlayerId = state.currentTurn._playerId;
    remainingTime = state.currentTurn.remainingSeconds;
  } else {
    nextTeamId = RoundActionsHelpers.computeNextTeamId(state);
    nextPlayerId = RoundActionsHelpers.computeNextPlayerId(state, nextTeamId);
    remainingTime = state.settings.secondsPerTurn;
  }

  if (hasRemainingWords) { // same Round
    // Save turn and assign new turn
    state.currentRound.turnHistories.push(state.currentTurn);
    state.currentTurn = {
      turnNumber: state.currentTurn.turnNumber + 1,
      _teamId: nextTeamId,
      _playerId: nextPlayerId,
      remainingSeconds: remainingTime,
      wordHistories: [],
      score: 0,
    }
  } else { // new Round
    // Check if game is finished and force exit
    if (state.currentRound.roundNumber === state.settings.numberOfRounds) {
      console.error("Game is must be finished");
      return finishGame(state);
    }

    // Save turn and round
    state.currentRound.turnHistories.push(state.currentTurn);
    state.rounds.push(state.currentRound);

    // Create new round
    state.currentRound = {
      roundNumber: state.currentRound.roundNumber + 1,
      remainingWords: shuffle(state.settings.selectedWords),
      turnHistories: [],
    }
    state.currentTurn = {
      turnNumber: state.currentTurn.turnNumber + 1,
      _teamId: nextTeamId,
      _playerId: nextPlayerId,
      remainingSeconds: remainingTime,
      wordHistories: [],
      score: 0,
    }
  }

  // init active word for turn
  TurnActionsHelpers.setNextActiveWord(state)
}

const finishGame = (state: Game) => {
  if (!state.currentRound || !state.currentTurn) {
    console.error("Can not finish game: no current round or current turn");
    return
  }

  state.currentRound.turnHistories.push(state.currentTurn);
  state.rounds.push(state.currentRound);

  state.status = "finished";
  state.currentRound = null;
  state.currentTurn = null;
}

export default {
  startGame,
  nextTurn,
  finishGame,
}