import { Game } from '@/types/game'
import { createSlice } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'
import SettingsActions from './actions/SettingsActions'
import RoundActions from './actions/RoundActions'
import TeamActions from './actions/TeamActions'
import TurnActions from './actions/TurnActions'
import { defaultTeams } from '@/constants/teams'
import { getAllCategoryNames } from '@/constants/categories'

const initialState: Game = {
  currentRound: null,
  currentTurn: null,
  teams: cloneDeep(defaultTeams),
  status: "not_started",
  settings: {
    numberOfWords: 5,
    secondsPerTurn: 10,
    isPenaltySelected: false,
    selectedCategoryNames: [],
    selectedWords: [],
    numberOfRounds: 3,
  },

  rounds: [],
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    createGame: () => {
      const state = cloneDeep(initialState)

      // Select all categories by default
      SettingsActions.setSelectedCategories(state, getAllCategoryNames())

      return state
    },
    // Settings actions
    setSecondsPerTurn:    SettingsActions.setSecondsPerTurn,
    setIsPenaltySelected: SettingsActions.setIsPenaltySelected,
    setNumberOfWords:     SettingsActions.setNumberOfWords,
    toggleCategory:       SettingsActions.toggleCategory,

    // Round actions
    startGame:  RoundActions.startGame,
    nextTurn:   RoundActions.nextTurn,
    finishGame: RoundActions.finishGame,

    // Turn actions
    skipWord:   TurnActions.skipWord,
    submitWord: TurnActions.submitWord,
    saveTurnResults:    TurnActions.saveTurnResults,
    updateTurnResults:  TurnActions.updateTurnResults,

    // Team actions
    addTeam:    TeamActions.addTeam,
    removeTeam: TeamActions.removeTeam,
    updateTeam: TeamActions.updateTeam,
  },
})

// Action creators are generated for each case reducer function
export const {
  createGame,

  setSecondsPerTurn,
  setIsPenaltySelected,
  setNumberOfWords,
  toggleCategory,

  startGame,
  nextTurn,
  finishGame,

  skipWord,
  submitWord,
  saveTurnResults,
  updateTurnResults,

  addTeam,
  removeTeam,
  updateTeam,
} = gameSlice.actions
export default gameSlice.reducer
