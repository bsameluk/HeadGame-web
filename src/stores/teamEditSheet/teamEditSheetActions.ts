import { getRandomColor } from "@/constants/colors"
import { getRandomTeamName } from "@/constants/names"
import { Team } from "@/types/team"
import { TeamEditState } from "@/types/teamEditSheet"
import { PayloadAction } from "@reduxjs/toolkit"
import { max } from "lodash"

// ------------------ Open for new team ------------------
const openForNewTeam = (state: TeamEditState) => {
  state.isOpen = true

  state.team = {
    name:     getRandomTeamName(),
    score:    0,
    players:  [],
  }
}

// ------------------ Open for team ------------------
interface OpenForTeamPayload {
  team: Team
}
const openForTeam = (state: TeamEditState, action: PayloadAction<OpenForTeamPayload>) => {
  state.isOpen = true
  state.team = {
    _id:      action.payload.team._id,
    name:     action.payload.team.name,
    score:    action.payload.team.score,
    players:  action.payload.team.players
  }
}

// ------------------ Change name ------------------
interface ChangeNamePayload {
  name: string
}
const changeName = (state: TeamEditState, action: PayloadAction<ChangeNamePayload>) => {
  if (!state.team) {
    console.error('TeamEditSheet: changeName: team is null')
    return
  }

  state.team.name = action.payload.name
}

// ------------------ Add player by name ------------------
interface AddPlayerByNamePayload {
  name: string
}
const addPlayerByName = (state: TeamEditState, action: PayloadAction<AddPlayerByNamePayload>) => {
  if (!state.team) {
    console.error('TeamEditSheet: addPlayerByName: team is null')
    return
  }

  const maxId = max(state.team.players.map(player => player._id)) || 0
  state.team.players.push({
    _id:          maxId + 1,
    name:         action.payload.name,
    score:        0,
    _bgColor:     getRandomColor(),
    playerNumber: state.team.players.length + 1,
  })
}

// ------------------ Update player name ------------------
interface UpdatePlayerNamePayload {
  _id: number
  name: string
}
const updatePlayerName = (state: TeamEditState, action: PayloadAction<UpdatePlayerNamePayload>) => {
  if (!state.team) {
    console.error('TeamEditSheet: updatePlayerName: team is null')
    return
  }

  const player = state.team.players.find(player => player._id === action.payload._id)
  if (!player) {
    console.error('TeamEditSheet: updatePlayerName: player not found')
    return
  }

  player.name = action.payload.name
}

// ------------------ Delete player ------------------
interface DeletePlayerPayload {
  _id: number
}
const deletePlayer = (state: TeamEditState, action: PayloadAction<DeletePlayerPayload>) => {
  if (!state.team) {
    console.error('TeamEditSheet: deletePlayer: team is null')
    return
  }

  state.team.players = state.team.players.filter(player => player._id !== action.payload._id)
}

export default {
  openForNewTeam,
  openForTeam,
  changeName,
  addPlayerByName,
  updatePlayerName,
  deletePlayer,
}
