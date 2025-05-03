import { Game } from "@/types/game"
import { Team } from "@/types/team"
import { EditTeam } from "@/types/teamEditSheet"
import { PayloadAction } from "@reduxjs/toolkit"
import { max } from "lodash"

// ------------------ ADD TEAM ------------------
interface AddTeamPayload {
  team: EditTeam
}
const addTeam = (state: Game, action: PayloadAction<AddTeamPayload>) => {
  const _maxTeamId = max(state.teams.map(team => team._id)) || 0

  state.teams.push({
    ...action.payload.team,
    _id:        _maxTeamId + 1,
    teamNumber: state.teams.length + 1,
  })
}

// ------------------ UPDATE TEAM ------------------
interface UpdateTeamPayload {
  team: EditTeam
}
const updateTeam = (state: Game, action: PayloadAction<UpdateTeamPayload>) => {

  state.teams = state.teams.map((team) => {
    if (team._id === action.payload.team._id) {
      return {
        ...action.payload.team,
        _id: team._id,
        teamNumber: team.teamNumber,
      }
    }
    return team
  })
}

// ------------------ REMOVE TEAM ------------------
interface RemoveTeamPayload {
  teamId: number
}
const removeTeam = (state: Game, action: PayloadAction<RemoveTeamPayload>) => {
  state.teams = state.teams.filter(team => team._id !== action.payload.teamId)
  state.teams = updateTeamNumbers(state.teams)
}

// ------------------ HELPER FUNCTIONS ------------------

const updateTeamNumbers = (teams: Team[]) => {
  return teams.map((team, index) => {
    team.teamNumber = index + 1
    return team
  })
}

export default {
  addTeam,
  removeTeam,
  updateTeam,
}
