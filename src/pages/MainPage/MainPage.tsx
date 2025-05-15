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

      <h1 style={{ fontFamily: "Creepster", letterSpacing: "2px", color: "white" }} className="text-4xl mt-10">
        𝔚𝔢𝔩𝔠𝔬𝔪𝔢, 𝔤𝔞𝔫𝔤𝔰𝔱𝔢𝔯!
      </h1>

      <div className="mb-10">
        <button className="btn p-5 btn btn-primary" onClick={onCreateGame}>Создать игру</button>
      </div>
    </div>
  );
};

export default MainPage;
