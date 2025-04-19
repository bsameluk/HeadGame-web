import { categories } from "@/constants/categories";
import { RootState } from "@/stores/main";
import { BarChartHorizontal, Check, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCategory } from "@/stores/gameSlice";

const CategorySelector: React.FC = () => {
  const dispatch = useDispatch()
  const selectedCategoryNames = useSelector((state: RootState) => state.game.selectedCategoryNames);

  const handleToggleCategory = (categoryName: string) => {
    dispatch(toggleCategory(categoryName))
  };

  return (
    <div className="overflow-y-hidden flex flex-col">
      <h2 className="font-bold pb-2">Выберите категории (выбрано {selectedCategoryNames.length})</h2>
      <div className="grid grid-cols-3 gap-4 pt-2 overflow-y-auto">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col items-center gap-2"
            onClick={() => handleToggleCategory(category.name)}
          >
            <div
              className={`relative cursor-pointer flex flex-col items-center p-3 border rounded-[40px]
                ${selectedCategoryNames.includes(category.name) ? 'opacity-100' : 'opacity-20'}`}
            >
              <span className="absolute -top-2 -right-2 rounded-full w-5 h-5 flex items-center justify-center bg-white border">
                {selectedCategoryNames.includes(category.name)
                  ? <Check className="w-4 h-4 text-green-500" />
                  : <X className="w-4 h-4 text-red-500" />
                }
              </span>
              <BarChartHorizontal className="w-4 h-4" />
            </div>
            <span className="text-[14px] text-center">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
