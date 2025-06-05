import { RootState } from "@/stores/main"
import { Round } from "@/types/game"
import { Team } from "@/types/team"
import { chain, maxBy, toPairs } from "lodash"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

interface TeamWithScore {
  totalScore: number
  scoreByRounds: { roundNumber: number, score: number }[]
}

const ResultsPage: React.FC = () => {
  const navigate = useNavigate()
  const game = useSelector((state: RootState) => state.game)

  const calcScoreByRound = (round: Round, _teamId: number) => {
    return round.turnHistories
      .filter(turn => turn._teamId === _teamId)
      .reduce((acc, turn) => {
        return acc + turn.score
      }, 0)
  }
  const calcScoreByTeam = (team: Team) => {
    const scoreByRounds = game.rounds
      .map(round => ({
        roundNumber: round.roundNumber, score: calcScoreByRound(round, team._id)
      }))
    const totalScore = chain(scoreByRounds)
      .map(score => score.score)
      .sum()
      .value()

    return {
      totalScore: totalScore,
      scoreByRounds
    }
  }

  const scoreByTeams = useMemo(() => {
    return game.teams.reduce((acc, team) => {
      acc[team._id] = calcScoreByTeam(team)
      return acc
    }, {} as Record<number, TeamWithScore>)
  }, [game.rounds])

  const winnerTeam = useMemo(() => {
    return maxBy(game.teams, team => {
      return scoreByTeams[team._id].totalScore
    })
  }, [])

  return (
    <div className="flex flex-col justify-between h-full text-center">
      <h1 className="text-3xl font-bold my-8">
        🏆 Победили {winnerTeam?.name}!
      </h1>

      <div className="flex flex-col items-center justify-center gap-4 grow w-full">
        <div className="w-full overflow-x-auto">
          <table className="min-w-max border-collapse w-full text-xs">
            <thead>
              <tr>
                <th className="border px-2 py-1">Команда</th>
                <th className="border px-2 py-1">1</th>
                <th className="border px-2 py-1">2</th>
                <th className="border px-2 py-1">3</th>
                <th className="border px-2 py-1">Итог</th>
              </tr>
            </thead>
            <tbody>
              {game.teams.map(team => {
                const teamScore = scoreByTeams[team._id]
                const allTotals = game.teams.map(t => scoreByTeams[t._id].totalScore)
                const maxTotal = Math.max(...allTotals)
                const minTotal = Math.min(...allTotals)
                let bgColor = ""
                if (teamScore.totalScore === maxTotal && maxTotal !== minTotal) {
                  bgColor = "bg-green-100"
                } else if (teamScore.totalScore === minTotal && maxTotal !== minTotal) {
                  bgColor = "bg-red-100"
                }
                return (
                  <tr key={team.teamNumber}>
                    <td className="border px-2 py-1 font-semibold">{team.name}</td>
                    {teamScore.scoreByRounds.map(score => (
                      <td key={score.roundNumber} className="border px-2 py-1">{score.score}</td>
                    ))}
                    {Array.from({ length: 3 - teamScore.scoreByRounds.length }).map((_, idx) => (
                      <td key={`empty-${idx}`} className="border px-2 py-1"></td>
                    ))}
                    <td className={`border px-2 py-1 font-bold ${bgColor}`}>{teamScore.totalScore}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>



      <div className="flex justify-between">
        <button
          className="btn btn-neutral btn-outline my-8"
          onClick={() => navigate("/")}
        >
          На главную
        </button>
      </div>
    </div>
  )
}

export default ResultsPage
