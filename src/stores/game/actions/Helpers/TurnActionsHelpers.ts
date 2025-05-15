import { Game, WordHistory } from "@/types/game"
import { Turn } from "@/types/game"
import { WordWithCategory } from "@/types/categories"
import { shuffle } from "lodash"

// -------------------------- Set next active word --------------------------
const setNextActiveWord = (state: Game) => {
  if (!state.currentTurn || !state.currentRound) {
    console.error('Can not save turn results: no current turn or current round')
    return
  }

  const correctWordLabelsInTurn: string[] = state.currentTurn.wordHistories
    .filter(({ isCorrect }) => isCorrect)
    .map(({ word }) => word.label) || [];

  let remainingWords: WordWithCategory[] = []

  if (state.currentRound.remainingWords.length > 1) {
    remainingWords = state.currentRound.remainingWords
      .filter(word => !correctWordLabelsInTurn.includes(word.label) && word.label != state.currentTurn?.activeWord?.label)
  } else {
    remainingWords = state.currentRound.remainingWords
      .filter(word => !correctWordLabelsInTurn.includes(word.label))
  }

  state.currentTurn.activeWord = shuffle(remainingWords)[0]
}

// -------------------------- Add or update word history --------------------------
const addOrUpdateWordHistory = (state: Game, word: WordWithCategory, isCorrect: boolean) => {
  if (!state.currentTurn || !state.currentRound) {
    console.error('Can not add or update word history: no current turn or current round')
    return
  }

  const index = state.currentTurn.wordHistories.findIndex(w => w.word.label === word.label)
  if (index !== -1) {
    state.currentTurn.wordHistories[index] = { word, isCorrect }
  } else {
    state.currentTurn.wordHistories.push({ word, isCorrect })
  }
}

// -------------------------- Calculate score and remaining words --------------------------
const computeScoreAndRemainingWords = (state: Game) => {
  if (!state.currentTurn || !state.currentRound) {
    console.error('Can not update word histories: no current turn or current round')
    return
  }

  const score = state.currentTurn.wordHistories.reduce((score: number, wordHistory: WordHistory) => {
    if (wordHistory.isCorrect) {
      score += 1
    } else if (state.settings.isPenaltySelected) {
      score -= 1
    }
    return score
  }, 0)

  state.currentRound.remainingWords = _calculateRemainingWords(state)
  state.currentTurn.score = score
}

const _calculateRemainingWords = (state: Game) => {
  if (!state.currentRound) {
    return [];
  }

  // WORDS FROM CURRENT TURN
  const correctWordLabelsInTurn: string[] = state.currentTurn?.wordHistories
    ?.filter(({ isCorrect }) => isCorrect)
    ?.map(({ word }) => word.label) || [];

  // WORDS FROM PREVIOUS TURNS
  const correctWordLabelsInRound: string[] = state.currentRound.turnHistories
    .map( (turn: Turn) => turn.wordHistories)
    .flat()
    .filter(({ isCorrect }) => isCorrect)
    ?.map(({ word }) => word.label) || [];

  // ALL CORRECT WORDS
  const correctWordLabels = [...correctWordLabelsInTurn, ...correctWordLabelsInRound];

  // REMAINING WORDS
  const newRemainingWords = state.settings.selectedWords.filter( (word: WordWithCategory) => {
    return !correctWordLabels.includes(word.label);
  })

  return shuffle(newRemainingWords);
}

export default {
  setNextActiveWord,
  addOrUpdateWordHistory,
  computeScoreAndRemainingWords,
}