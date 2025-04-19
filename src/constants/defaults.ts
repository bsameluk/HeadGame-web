import { Player, Team } from "@/types/main";

// Women Players
const Veronika: Player = {
  _id: 1,
  name: "Veronika",
  score: 0,
  playerNumber: 1,
}
const Iro: Player = {
  _id: 2,
  name: "Iro",
  score: 0,
  playerNumber: 2,
}
const Lera: Player = {
  _id: 3,
  name: "Lera",
  score: 0,
  playerNumber: 3,
}

// Men Players
const Mykhailo: Player = {
  _id: 4,
  name: "Mykhailo",
  score: 0,
  playerNumber: 1,
}
const Bohdan: Player = {
  _id: 5,
  name: "Bohdan",
  score: 0,
  playerNumber: 2,
}
const Illya: Player = {
  _id: 6,
  name: "Illya",
  score: 0,
  playerNumber: 3,
}

export const defaultTeams: Team[] = [
  {
    _id: 1,
    name: "Вумэн момэнт",
    score: 0,
    players: [Veronika, Iro, Lera],
  },
  {
    _id: 2,
    name: "Мэнтос",
    score: 0,
    players: [Mykhailo, Bohdan, Illya],
  },
]





