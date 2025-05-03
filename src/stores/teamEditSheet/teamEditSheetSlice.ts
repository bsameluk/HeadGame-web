import { createSlice } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'
import { TeamEditState } from '@/types/teamEditSheet'

import actions from './teamEditSheetActions'

const initialState: TeamEditState = {
  isOpen: false,
  team: null,
}

export const teamEditSheetSlice = createSlice({
  name: 'teamEditSheet',
  initialState,
  reducers: {
    close: () => cloneDeep(initialState),

    openForNewTeam:   actions.openForNewTeam,
    openForTeam:      actions.openForTeam,
    changeName:       actions.changeName,
    addPlayerByName:  actions.addPlayerByName,
    updatePlayerName: actions.updatePlayerName,
    deletePlayer:     actions.deletePlayer,
  },
})

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
