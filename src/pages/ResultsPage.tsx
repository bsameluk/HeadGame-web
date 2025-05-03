import { RootState } from "@/stores/main"
import { Round } from "@/types/game"
import { Team } from "@/types/team"
import { chain } from "lodash"
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

  return (
    <div className="flex flex-col justify-between h-full text-center">
      <h1 className="text-3xl font-bold my-8">
        Победила дружба!
      </h1>

      <div className="flex flex-col items-center justify-center gap-8 grow">
        <div className="flex flex-col gap-4">
          {
            game.teams.map(team => (
              <div key={team.teamNumber}>
                <h2 className="text-xl">Команда: <span className="font-semibold">{team.name}</span></h2>
                <h2 className="text-xl">Итог: <span className="font-semibold">{scoreByTeams[team._id].totalScore}</span></h2>
                <hr />
                <div className="flex flex-col gap-2">
                  {
                    scoreByTeams[team._id].scoreByRounds.map(score => (
                      <div key={score.roundNumber}>{score.roundNumber} раунд: {score.score}</div>
                    ))
                  }
                </div>
              </div>
            ))
          }
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
