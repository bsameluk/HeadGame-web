import { RootState } from "@/stores/main"
import { useMemo } from "react"
// import { Team, Player } from "@/types/gameParameters"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const PreviewRoundPage: React.FC = () => {
  const navigate = useNavigate()
  const game = useSelector((state: RootState) => state.game)

  const currentTeam = useMemo(() => {
    return game.teams.find(team => team._id === game.currentTurn?._teamId)
  }, [game.teams, game.currentTurn])

  const currentPlayer = useMemo(() => {
    return currentTeam?.players.find(player => player._id === game.currentTurn?._playerId)
  }, [currentTeam, game.currentTurn])

  if (!game.currentRound || !game.currentTurn || !currentTeam || !currentPlayer) {
    console.error('PreviewRoundPage: Current round, team or player not found')
    return
  }

  return (
    <div className="flex flex-col justify-between h-full text-center p-[1rem]">
      <h1 className="text-3xl font-bold my-8">
        Раунд {game.currentRound.roundNumber}
      </h1>

      <div className="flex flex-col items-center justify-center gap-8 grow">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl">Команда: <span className="font-semibold">{currentTeam.name}</span></h2>
          <h2 className="text-xl flex justify-center items-center">
            {/* Игрок: <span className="font-semibold">{currentPlayer.name}</span> */}
            <span>Игрок:</span>
            <div
              key={currentPlayer.playerNumber}
              className="shrink-0 px-1 py-1 text-xl rounded-[10px] ml-2"
              style={{ backgroundColor: currentPlayer._bgColor, boxShadow: '1px 2px 4px 0 #909090' }}
            >
              {currentPlayer.name}
            </div>
          </h2>
          <h2 className="text-xl">Время: <span className="font-semibold">{game.currentTurn.remainingSeconds} сек</span></h2>
        </div>

      </div>

      <div className="">
        <button
          className="btn btn-primary btn-outline w-full my-8"
          onClick={() => navigate("/game/turn/play")}
        >
          Начать
        </button>
      </div>
    </div>
  )
}

export default PreviewRoundPage
