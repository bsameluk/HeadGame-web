import { chain, max } from "lodash";
import { Game } from "@/types/game";
import { sortBy } from "lodash";

const computeNextTeamId = (state: Game) : number => {
  const sortedTeams = sortBy(state.teams, 'teamNumber');
  const currentTeamIndex = sortedTeams.findIndex(({_id}) => _id === state.currentTurn?._teamId);
  const currentTeam = sortedTeams[currentTeamIndex];
  if (!currentTeam) {
    return sortedTeams[0]._id;
  }
  const maxTeamNumber = max(sortedTeams.map(team => team.teamNumber));
  if (currentTeam.teamNumber === maxTeamNumber) {
    return sortedTeams[0]._id;
  }

  return sortedTeams[currentTeamIndex + 1]._id;
}

const computeNextPlayerId = (state: Game, teamId: number) : number => {
  const sortedTeams = sortBy(state.teams, 'teamNumber');
  const currentTeam = sortedTeams.find(team => team._id === teamId);
  if (!currentTeam) {
    console.error('Can not compute next player id: no current team')
    return sortedTeams[0].players[0]._id;
  }
  if (!state.currentRound) {
    console.error('Can not compute next player id: no current round')
    return currentTeam.players[0]._id;
  }

  // find last player turn
  const lastPlayerTurn = chain(state.rounds)
    .map(round => round.turnHistories)
    .flatten()
    .concat(state.currentRound.turnHistories)
    .filter(turn => turn._teamId == teamId)
    .sortBy('turnNumber')
    .last()
    .value()
  const lastPlayer = currentTeam.players.find(player => player._id === lastPlayerTurn?._playerId);

  // if no last player turn, return first player
  if (!lastPlayer) {
    console.warn('Can not compute next player id: no last player')
    return currentTeam.players[0]._id;
  }

  // if last player is the last player, return first player
  const maxPlayerNumber = max(currentTeam.players.map(player => player.playerNumber));
  if (lastPlayer.playerNumber === maxPlayerNumber) {
    return currentTeam.players[0]._id;
  }

  // find next player
  const nextPlayer = currentTeam.players
    .find(player => player.playerNumber === lastPlayer.playerNumber + 1);

  // if no next player, return first player
  if (!nextPlayer) {
    console.error('Can not compute next player id: no next player')
    return currentTeam.players[0]._id;
  }

  return nextPlayer._id;
}

export default {
  computeNextTeamId,
  computeNextPlayerId,
}