import { Category } from "@/types/categories";

export const FOOD: Category = {
  name: "Еда",
  items: [
    // Легко
    { label: "Пицца", level: "easy" },
    { label: "Бургер", level: "easy" },
    { label: "Картошка", level: "easy" },
    { label: "Яблоко", level: "easy" },
    { label: "Морковь", level: "easy" },
    { label: "Суп", level: "easy" },
    { label: "Рис", level: "easy" },
    { label: "Огурец", level: "easy" },
    { label: "Курица", level: "easy" },
    { label: "Хлеб", level: "easy" },

    // Средне
    { label: "Том Ям", level: "medium" },
    { label: "Шаверма", level: "medium" },
    { label: "Борщ", level: "medium" },
    { label: "Роллы", level: "medium" },
    { label: "Гаспачо", level: "medium" },
    { label: "Сырники", level: "medium" },
    { label: "Оливье", level: "medium" },
    { label: "Пельмени", level: "medium" },
    { label: "Тирамису", level: "medium" },
    { label: "Хумус", level: "medium" },

    // Сложно
    { label: "Паэлья", level: "hard" },
    { label: "Фо Бо", level: "hard" },
    { label: "Киш", level: "hard" },
    { label: "Кимчи", level: "hard" },
    { label: "Блины с икрой", level: "hard" },
  ],
}
