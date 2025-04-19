import { getRandomTeamName } from '@/constants/names'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { cloneDeep, max } from 'lodash'
import { Player, Team } from 'types/main'

export interface TeamEditState {
  isOpen: boolean
  team: Team
}

const initialState: TeamEditState = {
  isOpen: false,
  team: {
    _id: undefined,
    name: "",
    score: 0,
    players: [],
  },
}

export const teamEditSheetSlice = createSlice({
  name: 'teamEditSheet',
  initialState,
  reducers: {
    close: () => cloneDeep(initialState),
    openForNewTeam: (state) => {
      state.isOpen = true
      state.team.name = getRandomTeamName()
    },
    openForTeam: (state, action: PayloadAction<Team>) => {
      state.team = cloneDeep(action.payload)
      state.isOpen = true
    },
    changeName: (state, action: PayloadAction<string>) => {
      state.team.name = action.payload
    },
    addPlayerByName: (state, action: PayloadAction<string>) => {
      const maxId = max(state.team.players.map(p => p._id)) || 0
      const newPlayer = {
        _id: maxId + 1,
        name: action.payload,
        score: 0,
        playerNumber: state.team.players.length + 1
      }
      state.team.players.push(newPlayer)
    },
    updatePlayerName: (state, action: PayloadAction<{ _id: number, name: string }>) => {
      const index = state.team.players.findIndex(player => player._id === action.payload._id)
      if (index !== -1) {
        state.team.players[index].name = action.payload.name
      }
    },
    deletePlayer: (state, action: PayloadAction<Player>) => {
      state.team.players = state.team.players.filter(player => player._id !== action.payload._id)
      state.team.players = updatePlayerNumbers(state.team.players) // sync player numbers
    },
  },
})

const updatePlayerNumbers = (players: Player[]) => {
  return players.map((player, index) => {
    player.playerNumber = index + 1
    return player
  })
}

// Action creators are generated for each case reducer function
export const {
  close,
  openForNewTeam,
  openForTeam,
  changeName,
  addPlayerByName,
  updatePlayerName,
  deletePlayer
} = teamEditSheetSlice.actions
export default teamEditSheetSlice.reducer