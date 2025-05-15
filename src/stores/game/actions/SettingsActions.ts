import { getAllWords } from "@/constants/categories";
import { WordWithCategory } from "@/types/categories";
import { Game } from "@/types/game";
import { PayloadAction } from "@reduxjs/toolkit";
import { shuffle, xor } from "lodash";

// ------------------ SET SECONDS PER TURN ------------------
interface SetSecondsPerTurnPayload {
  secondsPerTurn: number
}
const setSecondsPerTurn = (state: Game, action: PayloadAction<SetSecondsPerTurnPayload>) => {
  state.settings.secondsPerTurn = action.payload.secondsPerTurn;
}

// ------------------ SET IS PENALTY SELECTED ------------------
interface SetIsPenaltySelectedPayload {
  isPenaltySelected: boolean
}
const setIsPenaltySelected = (state: Game, action: PayloadAction<SetIsPenaltySelectedPayload>) => {
  state.settings.isPenaltySelected = action.payload.isPenaltySelected;
}

// ------------------ SET NUMBER OF WORDS ------------------
interface SetNumberOfWordsPayload {
  numberOfWords: number
}
const setNumberOfWords = (state: Game, action: PayloadAction<SetNumberOfWordsPayload>) => {
  state.settings.numberOfWords = action.payload.numberOfWords;
  state.settings.selectedWords = initNewSelectedWords(state.settings.selectedCategoryNames, state.settings.numberOfWords);
}

// ------------------ TOGGLE CATEGORY ------------------
interface ToggleCategoryPayload {
  categoryName: string
}
const toggleCategory = (state: Game, action: PayloadAction<ToggleCategoryPayload>) => {
  state.settings.selectedCategoryNames = xor(state.settings.selectedCategoryNames, [action.payload.categoryName]);
  state.settings.selectedWords = initNewSelectedWords(state.settings.selectedCategoryNames, state.settings.numberOfWords);
}

// ------------------ SET SELECTED CATEGORIES (ONLY ON INIT) ------------------
const setSelectedCategories = (state: Game, selectedCategoryNames: string[]) => {
  state.settings.selectedCategoryNames = selectedCategoryNames;
  state.settings.selectedWords = initNewSelectedWords(selectedCategoryNames, state.settings.numberOfWords);
}

// ------------------ HELPER FUNCTIONS ------------------

const initNewSelectedWords = (selectedCategoryNames: string[], numberOfWords: number) : WordWithCategory[] => {

  const easyWords = getAllWords().filter((word) => word.level === "easy")
  const shuffledWords = shuffle(easyWords)
  const filteredWords = shuffledWords.filter((word) => {
    return selectedCategoryNames.includes(word.categoryName)
  })

  return filteredWords.slice(0, numberOfWords)
}

export default {
  setSecondsPerTurn,
  setIsPenaltySelected,
  setNumberOfWords,
  toggleCategory,
  setSelectedCategories,
};

