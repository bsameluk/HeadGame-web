import { Game, WordHistory } from "@/types/game"
import TurnActionsHelpers from "./Helpers/TurnActionsHelpers"
import { PayloadAction } from "@reduxjs/toolkit"

// -------------------------- Skip word and show next word --------------------------
const skipWord = (state: Game) => {
  if (!state.currentTurn || !state.currentRound) {
    console.error('Can not save turn results: no current turn or current round')
    return
  }
  if (!state.currentTurn.activeWord) {
    console.error('Can not skip word: no active word')
    return
  }

  TurnActionsHelpers.addOrUpdateWordHistory(state, state.currentTurn.activeWord, false)
  TurnActionsHelpers.setNextActiveWord(state)
}

// -------------------------- Submit word and show next word --------------------------
const submitWord = (state: Game) => {
  if (!state.currentTurn || !state.currentRound) {
    console.error('Can not save turn results: no current turn or current round')
    return
  }
  if (!state.currentTurn.activeWord) {
    console.error('Can not submit word: no active word')
    return
  }

  TurnActionsHelpers.addOrUpdateWordHistory(state, state.currentTurn.activeWord, true)
  TurnActionsHelpers.setNextActiveWord(state)
}

// -------------------------- Save turn results --------------------------
interface SaveTurnResultsPayload {
  remainingSeconds: number
}
const saveTurnResults = (state: Game, action: PayloadAction<SaveTurnResultsPayload>) => {
  if (!state.currentTurn || !state.currentRound) {
    console.error('Can not save turn results: no current turn or current round')
    return
  }

  if (state.currentTurn.activeWord) {
    TurnActionsHelpers.addOrUpdateWordHistory(state, state.currentTurn.activeWord, false)
    state.currentTurn.activeWord = null
  }

  state.currentTurn.remainingSeconds = action.payload.remainingSeconds
  TurnActionsHelpers.computeScoreAndRemainingWords(state)
}

// -------------------------- Update turn results --------------------------
interface UpdateTurnResultsPayload {
  wordHistories: WordHistory[]
}
const updateTurnResults = (state: Game, action: PayloadAction<UpdateTurnResultsPayload>) => {
  if (!state.currentTurn || !state.currentRound) {
    console.error('Can not update turn results: no current turn or current round')
    return
  }

  state.currentTurn.wordHistories = action.payload.wordHistories
  TurnActionsHelpers.computeScoreAndRemainingWords(state)
}


export default {
  saveTurnResults,
  updateTurnResults,

  // In active round
  skipWord,
  submitWord,
}
