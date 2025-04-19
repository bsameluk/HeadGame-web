import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

const MainPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-between h-[100%] text-center">
      <div className="flex justify-end">
        <Link to="/settings">
          <Settings className="w-6 h-6 text-gray-500" />
        </Link>
      </div>

      <div>
        <h1>Добро пожаловать, банда!</h1>
      </div>

      <div className="mb-10">
        <Link to="/create-game">
          <button className="btn p-5 btn-outline btn-primary">Создать игру</button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
