import { DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogFooter } from "../../../components/Dialog";
import { useState } from "react";

interface SelectCategoriesProps {
  isOpen: boolean,
  onClose: () => void,
  categories: string[],
  selectedCategories: string[],
  onSelect: (categories: string[]) => void,
}

const SelectCategories: React.FC<SelectCategoriesProps> = ({ isOpen, onClose, categories, onSelect }) => {
  const [_selectedCategories, setSelectedCategories] = useState<string[]>(selectedCategories);

  const addCategory = (category: string) => {
    setSelectedCategories([..._selectedCategories, category]);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>

      <DialogContent>
        <DialogTitle>Select categories</DialogTitle>
        <DialogDescription>
          Select the categories you want to play with
          <div className="flex flex-col gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`
                  w-full h-12 bg-blue-600 text-white text-base font-medium rounded-xl hover:bg-blue-700 transition-colors
                  ${_selectedCategories.includes(category) ? 'bg-blue-700' : ''}
                `}
                onClick={() => addCategory(category)}
              >
                <p>{category}</p>
              </button>
            ))}
          </div>
        </DialogDescription>
      </DialogContent>
      <DialogFooter>
        <DialogFooter>
          <button className="w-full h-12 bg-blue-600 text-white text-base font-medium rounded-xl hover:bg-blue-700 transition-colors">
            <p>Save</p>
          </button>
        </DialogFooter>
      </DialogFooter>
    </Dialog>
  );
}

export default SelectCategories;