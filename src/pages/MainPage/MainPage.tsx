import { createGame } from "@/stores/game/gameSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import hatIcon from "assets/images/hat.png"
import "./styles.css"

const MainPage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onCreateGame = () => {
    dispatch(createGame())
    navigate('/create-game')
  }

  return (
    <div className="main-page-container flex flex-col justify-between h-[100%] text-center">
      <div className="title-container mt-10">
        <div className="title-line">
          <h1 className="title text-4xl">Shlyapka</h1>
          <img className="hat-icon" src={hatIcon} alt="hat" />
        </div>
      </div>

      <div className="mb-10">
        <button className="btn p-5 btn btn-primary" onClick={onCreateGame}>Создать игру</button>
      </div>
    </div>
  )
}

export default MainPage
