import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { GameParams, Team } from '../types/main'
import { defaultTeams } from '@/constants/defaults'
import { cloneDeep, xor } from 'lodash'
import { categories } from '@/constants/categories'

const initialState: GameParams = {
  secondsPerTurn: 60,
  isPenaltySelected: false,
  teams: cloneDeep(defaultTeams),
  selectedCategoryNames: categories.map((category) => category.name),
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addTeam: (state, action: PayloadAction<Team>) => {
      const newTeam = cloneDeep(action.payload)
      newTeam._id ||= state.teams.length + 1
      state.teams.push(newTeam)
    },
    updateTeam: (state, action: PayloadAction<Team>) => {
      state.teams = state.teams.map((team) =>
        team._id === action.payload._id ? action.payload : team
      )
    },
    deleteTeam: (state, action: PayloadAction<Team>) => {
      state.teams = state.teams.filter((team) => team._id !== action.payload._id)
    },
    setSecondsPerTurn: (state, action: PayloadAction<number>) => {
      state.secondsPerTurn = action.payload
    },
    setIsPenaltySelected: (state, action: PayloadAction<boolean>) => {
      state.isPenaltySelected = action.payload
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategoryNames = xor(state.selectedCategoryNames, [action.payload])
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  addTeam,
  updateTeam,
  deleteTeam,
  setSecondsPerTurn,
  setIsPenaltySelected,
  toggleCategory,
} = gameSlice.actions
export default gameSlice.reducer