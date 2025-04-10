import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

const MainPage: React.FC = () => {
  return <div className="flex flex-col justify-between h-[100%] text-center">

    <div className="flex justify-end mt-2">
      <Link to="/settings">
        <Settings />
      </Link>
    </div>

    <div>
      <h1>Welcome to the game</h1>
    </div>

    <div className="mb-10">
      <button className="btn btn-outline btn-secondary">Secondary</button>
      {/* <CircleBtn>
        Create new game
      </CircleBtn> */}
      {/* <Button>
        <h2>Settings</h2>
      </Button> */}
    </div>

  </div>;
};

export default MainPage;
