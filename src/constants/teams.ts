import { Player, Team } from "@/types/team";
import { shuffle } from "lodash";
import { getRandomColor } from "./colors";

// Women Players
const Veronika: Player = {
  _id: 1,
  name: "Veronika",
  score: 0,
  playerNumber: 1,
  _bgColor: getRandomColor(),
}
const Iro: Player = {
  _id: 2,
  name: "Iro",
  score: 0,
  playerNumber: 2,
  _bgColor: getRandomColor(),
}
const Lera: Player = {
  _id: 3,
  name: "Lera",
  score: 0,
  playerNumber: 3,
  _bgColor: getRandomColor(),
}

// Men Players
const Mykhailo: Player = {
  _id: 4,
  name: "Mykhailo",
  score: 0,
  playerNumber: 1,
  _bgColor: getRandomColor(),
}
const Bohdan: Player = {
  _id: 5,
  name: "Bohdan",
  score: 0,
  playerNumber: 2,
  _bgColor: getRandomColor(),
}
const Illya: Player = {
  _id: 6,
  name: "Illya",
  score: 0,
  playerNumber: 3,
  _bgColor: getRandomColor(),
}

const getRandomTeams = (teams: Team[]) => {
  const shuffledTeams = shuffle(teams).map((team, index) => ({
    ...team,
    teamNumber: index + 1,
  }))

  return shuffledTeams
}

const getRandomPlayers = (players: Player[]) => {
  const shuffledPlayers = shuffle(players).map((player, index) => ({
    ...player,
    playerNumber: index + 1,
  }))

  return shuffledPlayers
}

export const defaultTeams: Team[] = getRandomTeams([
  {
    _id: 1,
    name: "Вумэн момэнт",
    score: 0,
    teamNumber: 1,
    players: getRandomPlayers([Veronika, Iro, Lera]),
  },
  {
    _id: 2,
    name: "Мэнтос",
    score: 0,
    teamNumber: 2,
    players: getRandomPlayers([Mykhailo, Bohdan, Illya]),
  },
])





