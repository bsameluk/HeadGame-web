import { Category } from "@/types/categories";

export const CLOTHES: Category = {
  name: "Одежда",
  items: [
    // Легко
    { label: "Футболка", level: "easy" },
    { label: "Штаны", level: "easy" },
    { label: "Куртка", level: "easy" },
    { label: "Шапка", level: "easy" },
    { label: "Обувь", level: "easy" },
    { label: "Юбка", level: "easy" },
    { label: "Платье", level: "easy" },
    { label: "Носки", level: "easy" },
    { label: "Кроссовки", level: "easy" },
    { label: "Шарф", level: "easy" },

    // Средне
    { label: "Кофта", level: "medium" },
    { label: "Пальто", level: "medium" },
    { label: "Брюки", level: "medium" },
    { label: "Ботинки", level: "medium" },
    { label: "Пиджак", level: "medium" },
    { label: "Ремень", level: "medium" },
    { label: "Галстук", level: "medium" },
    { label: "Туфли", level: "medium" },
    { label: "Комбинезон", level: "medium" },
    { label: "Кепка", level: "medium" },

    // Сложно
    { label: "Шёлковый халат", level: "hard" },
    { label: "Корсет", level: "hard" },
    { label: "Кюлоты", level: "hard" },
    { label: "Пончо", level: "hard" },
    { label: "Фрак", level: "hard" },
  ],
}
