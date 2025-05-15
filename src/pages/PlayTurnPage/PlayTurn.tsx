import { RootState } from "@/stores/main"
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as gameActions from "@/stores/game/gameSlice"
import { useNavigate } from "react-router-dom"

const PlayTurn: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const game = useSelector((state: RootState) => state.game)

  const [countdown, setCountdown] = useState(game.currentTurn?.remainingSeconds || 0)

  const currentWord = useMemo(() => {
    return game.currentTurn?.activeWord
  }, [game.currentTurn?.activeWord])


  const onTurnEnd = () => {
    dispatch(gameActions.saveTurnResults({
      remainingSeconds: countdown,
    }))
    navigate("/game/turn/results")
  }

  // When countdown is finished
  useEffect(() => {
    if (countdown === 0) {
      onTurnEnd()
      return
    }

    const interval = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)
    return () => clearTimeout(interval)
  }, [countdown])

  // When words are finished
  useEffect(() => {
    !currentWord && onTurnEnd()
  }, [currentWord])

  return currentWord && (
    <div className="flex flex-col justify-between h-full text-center">
      <h1 className="text-3xl font-bold my-8">
        Отсчет начался!
      </h1>
      <div className="flex justify-center items-center">
        {/* <span className="countdown font-mono text-6xl">
          <span aria-live="polite" aria-label={countdown.toString()}>{countdown}</span>

        </span> */}
        <span className="countdown font-mono text-6xl">
          {countdown}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 grow">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl">Категория: <span className="">{currentWord.categoryName}</span></h2>

          <h2 className="text-3xl font-semibold my-5">
            {currentWord.label}
          </h2>
        </div>

      </div>

      <div className="flex justify-between">
        <button
          className="btn btn-neutral btn-outline my-8"
          onClick={() => dispatch(gameActions.skipWord())}
        >
          Пропустить
        </button>

        <button
          className="btn btn-primary btn-outline my-8"
          onClick={() => dispatch(gameActions.submitWord())}
        >
          Правильно!
        </button>
      </div>
    </div>
  )
}

export default PlayTurn
