import { useNavigate } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import TimeSelector from "./components/TimeSelector";
import TogglePreference from "./components/TogglePreference";
import { RootState } from "stores/main";
import { setIsPenaltySelected } from "@/stores/gameSlice";
import { setSecondsPerTurn } from "@/stores/gameSlice";
import CategorySelector from "./components/CategorySelector";

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch()
  const selectedTime = useSelector((state: RootState) => state.game.secondsPerTurn)
  const isPenaltySelected = useSelector((state: RootState) => state.game.isPenaltySelected)
  const navigate = useNavigate();

  const handleSetSelectedTime = (time: number) => {
    dispatch(setSecondsPerTurn(time))
  }
  const handleSetIsPenaltySelected = (isPenaltySelected: boolean) => {
    dispatch(setIsPenaltySelected(isPenaltySelected))
  }

  return <div className="flex flex-col justify-between h-full">
    <div className="flex justify-center relative items-center h-[24px] mb-6">
      <CircleArrowLeft
        className="w-6 h-6 text-black absolute left-0 top-0"
        onClick={() => navigate(-1)}
      />
      <h1>Настройки</h1>
    </div>

    <div className="flex flex-col gap-6 grow-1 overflow-y-hidden">
      <TimeSelector
        selectedTime={selectedTime}
        setSelectedTime={handleSetSelectedTime}
      />
      <TogglePreference
        title="Штраф"
        description="За пропуск слова -1 балл"
        checked={isPenaltySelected}
        onChange={handleSetIsPenaltySelected}
      />
      <CategorySelector
      />
    </div>

  </div>;
};

export default SettingsPage;
