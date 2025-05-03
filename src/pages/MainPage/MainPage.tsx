import { createGame } from "@/stores/game/gameSlice";
import { Settings } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { useAppDispatch } from "@/stores/store";

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCreateGame = () => {
    dispatch(createGame());
    navigate('/create-game');
  }

  return (
    <div className="flex flex-col justify-between h-[100%] text-center" >
      {/* <div className="flex justify-end">
        <Link to="/settings">
          <Settings className="w-6 h-6 text-white" />
        </Link>
      </div> */}

      <div className="mb-auto mt-[3vh]">
        <h1>Добро пожаловать, банда!</h1>
      </div>

      <div className="mb-10">
        <button className="btn p-5 btn btn-primary" onClick={onCreateGame}>Создать игру</button>
      </div>
    </div>
  );
};

export default MainPage;
