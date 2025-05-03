export interface Team {
  _id: number;
  name: string;
  score: number;
  players: Player[];
  teamNumber: number;
}

export interface EditTeam extends Omit<Team, '_id'> {
  _id?: number;
}

export interface Player {
  _id: number;
  name: string;
  score: number;
  playerNumber: number;
  _bgColor: string;
}
