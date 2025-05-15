import { Category } from "@/types/categories";

export const MUSIC: Category = {
  name: "Музыка",
  items: [
    // Легко
    { label: "Гитара", level: "easy" },
    { label: "Песня", level: "easy" },
    { label: "Певец", level: "easy" },
    { label: "Клавиши", level: "easy" },
    { label: "Барабаны", level: "easy" },
    { label: "Ритм", level: "easy" },
    { label: "Нота", level: "easy" },
    { label: "Концерт", level: "easy" },
    { label: "Хор", level: "easy" },
    { label: "Колонка", level: "easy" },

    // Средне
    { label: "Скрипка", level: "medium" },
    { label: "Саксофон", level: "medium" },
    { label: "Симфония", level: "medium" },
    { label: "Мелодия", level: "medium" },
    { label: "Акустика", level: "medium" },
    { label: "Балет", level: "medium" },
    { label: "Ди-джей", level: "medium" },
    { label: "Хип-хоп", level: "medium" },
    { label: "Оперный певец", level: "medium" },
    { label: "Тональность", level: "medium" },

    // Сложно
    { label: "Контрабас", level: "hard" },
    { label: "Цимбалы", level: "hard" },
    { label: "Гобой", level: "hard" },
    { label: "Канон", level: "hard" },
    { label: "Тетрахорд", level: "hard" },
  ],
}
