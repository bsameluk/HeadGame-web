import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { RootState } from "@/stores/main"
import EditWordListSheet from "./EditWordListSheet"
import * as gameActions from "@/stores/game/gameSlice"
import { WordHistory } from "@/types/game"
import { useNavigate } from "react-router-dom"

const TurnResultsPage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const game = useSelector((state: RootState) => state.game)
  const [isOpenEditSheet, setIsOpenEditSheet] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const currentTeam = game.teams.find(team => team._id === game.currentTurn?._teamId)
  const currentPlayer = currentTeam?.players.find(player => player._id === game.currentTurn?._playerId)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonDisabled(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const onUpdateWordsHistory = (newWordsHistory: WordHistory[]) => {
    dispatch(gameActions.updateTurnResults({
      wordHistories: newWordsHistory,
    }))
    setIsOpenEditSheet(false)
  }

  const isLastTurn = game.currentRound?.roundNumber === game.settings.numberOfRounds && game.currentRound?.remainingWords?.length === 0

  const onFinishTurn = () => {
    if (isLastTurn) {
      dispatch(gameActions.finishGame())
      navigate("/game/results")
    } else {
      dispatch(gameActions.nextTurn())
      navigate("/game/turn/preview")
    }
  }


  return (
    <>
      <div className="flex flex-col justify-between h-full text-center p-[1rem]">
        <h1 className="text-3xl font-bold my-8">
          Слов осталось: {game.currentRound?.remainingWords?.length || 0}
        </h1>

        <div className="flex flex-col items-center justify-center gap-8 grow">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl">Команда: <span className="font-semibold">{currentTeam?.name}</span></h2>
            <h2 className="text-xl">Игрок: <span className="font-semibold">{currentPlayer?.name}</span></h2>
            <h2 className="text-xl mt-8">
              Итог: <span className="font-semibold"> + {game.currentTurn?.score}</span>
            </h2>
          </div>

        </div>

        <div className="flex justify-between">
          <button
            className="btn btn-neutral btn-outline my-8"
            onClick={() => setIsOpenEditSheet(true)}
          >
            Список слов
          </button>

          <button
            className="btn btn-primary btn-outline my-8"
            onClick={onFinishTurn}
            disabled={isButtonDisabled}
          >
            {isLastTurn ? "Результаты" : "Следующий ход"}
          </button>
        </div>
      </div>

      {game.currentTurn && (
        <EditWordListSheet
          isOpen={isOpenEditSheet}
          onClose={() => setIsOpenEditSheet(false)}
          wordsHistory={game.currentTurn.wordHistories}
          onSave={onUpdateWordsHistory}
        />
      )}
    </>
  )
}

export default TurnResultsPage
