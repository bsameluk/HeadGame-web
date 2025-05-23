import { useNavigate } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "stores/main";
import { toggleCategory, setNumberOfWords, setSecondsPerTurn, setIsPenaltySelected } from "@/stores/game/gameSlice";
import TimeSelector from "./components/TimeSelector";
import TogglePreference from "./components/TogglePreference";
import CategorySelector from "./components/CategorySelector";
import WordsCountSelector from "./components/WordsCountSelector";

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch()
  const selectedTime = useSelector((state: RootState) => state.game.settings.secondsPerTurn)
  const isPenaltySelected = useSelector((state: RootState) => state.game.settings.isPenaltySelected)
  const numberOfWords = useSelector((state: RootState) => state.game.settings.numberOfWords)
  const selectedCategoryNames = useSelector((state: RootState) => state.game.settings.selectedCategoryNames);
  const navigate = useNavigate();

  const handleSetSelectedTime = (time: number) => {
    dispatch(setSecondsPerTurn({ secondsPerTurn: time }))
  }
  const handleSetIsPenaltySelected = (isPenaltySelected: boolean) => {
    dispatch(setIsPenaltySelected({ isPenaltySelected }))
  }

  const handleSetWordsCount = (numberOfWords: number) => {
    dispatch(setNumberOfWords({ numberOfWords }))
  }

  const handleToggleCategory = (categoryName: string) => {
    dispatch(toggleCategory({ categoryName }))
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex justify-center relative items-center h-[24px] mb-6">
        <CircleArrowLeft
          className="w-6 h-6 text-black absolute left-0 top-0"
          onClick={() => navigate(-1)}
        />
        <h1>Настройки</h1>
      </div>

      <div className="flex flex-col gap-6 grow-1 overflow-y-auto">
        <TimeSelector
          selectedTime={selectedTime}
          setSelectedTime={handleSetSelectedTime}
        />
        <WordsCountSelector
          numberOfWords={numberOfWords}
          onChange={handleSetWordsCount}
        />

        <TogglePreference
          title="Штраф"
          description="За пропуск слова -1 балл"
          checked={isPenaltySelected}
          onChange={handleSetIsPenaltySelected}
        />
        <CategorySelector
          selectedCategoryNames={selectedCategoryNames}
          onChange={handleToggleCategory}
        />
      </div>
    </div>
  )
};

export default SettingsPage;
