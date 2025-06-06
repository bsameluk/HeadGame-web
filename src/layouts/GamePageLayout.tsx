import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/main";

const GamePageLayout: React.FC = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate()
  const game = useSelector((state: RootState) => state.game)

  useEffect(() => {
    if (game.status === "finished") {
      // navigate("/game/results")
    }
  }, [game.status])

  return (
    children ?? <Outlet />
  );
};

export default GamePageLayout;
