import { Team } from "./team";

export interface TeamEditState {
  isOpen: boolean
  team: EditTeam | null
}

export interface EditTeam extends Omit<Team, '_id' | 'teamNumber'> {
  _id?: number;
}
