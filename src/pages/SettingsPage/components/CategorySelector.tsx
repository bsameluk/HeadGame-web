import { categories } from "@/constants/categories";
import { BarChartHorizontal, Check, X } from "lucide-react";

interface CategorySelectorProps {
  selectedCategoryNames: string[]
  onChange: (categoryName: string) => void
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategoryNames, onChange }) => {

  return (
    <div className="flex flex-col">
      <h2 className="font-bold pb-2">Выберите категории (выбрано {selectedCategoryNames.length})</h2>
      <div className="grid grid-cols-3 gap-4 pt-2">
        {categories.map((category) => (
          <div
            key={category.name}
            style={{transition: 'opacity 0.2s ease'}}
            className={`flex flex-col items-center gap-2 ${selectedCategoryNames.includes(category.name) ? 'opacity-100' : 'opacity-30'}`}
            onClick={() => onChange(category.name)}
          >
            <div
              className={`relative cursor-pointer flex flex-col items-center p-3 border rounded-[40px]`}
            >
              {
                selectedCategoryNames.includes(category.name) &&
                <span className="absolute -top-1 -right-1 rounded-full w-4 h-4 flex items-center justify-center bg-white border">
                  <Check className="w-3 h-3 text-green-500" />
                </span>
              }
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
