import { CircleArrowLeft, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import TeamSettings from "./components/TeamSettings/TeamSettings";
import { useDispatch } from "react-redux";
import * as gameActions from "@/stores/game/gameSlice";

const CreateGamePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleStartGame = () => {
    dispatch(gameActions.startGame())
    navigate("/game/turn/preview")

    // dispatch(initSelectedWords())
    // dispatch(initFirstRound({ secondsPerTurn: gameParameters.secondsPerTurn }))
    // navigate("/game")
  }

  return <div className="flex flex-col h-full p-[1rem]">
    <div className="flex justify-center relative items-center min-h-[24px] pb-3 border-b border-gray-200 box-content">
      <CircleArrowLeft
        className="w-6 h-6 text-black absolute left-0 top-0"
        onClick={() => navigate(-1)}
      />
      <h1>Создание команд</h1>
      <Link to="/create-game/settings">
        <Settings className="w-6 h-6 text-black absolute right-0 top-0" />
      </Link>
    </div>

    <TeamSettings />

    <div className="flex justify-center relative items-center pt-3 border-t border-gray-200 box-content">
      <button
        className="btn btn-primary btn-outline"
        onClick={handleStartGame}
      >
        Начать игру
      </button>
    </div>
  </div>;
};

export default CreateGamePage;
