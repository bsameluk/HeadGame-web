import { Category } from "@/types/categories";

export const FAMILY_AND_RELATIONS: Category = {
  name: "Родня и отношения",
  items: [
    // Легко
    { label: "Мама", level: "easy" },
    { label: "Папа", level: "easy" },
    { label: "Бабушка", level: "easy" },
    { label: "Дедушка", level: "easy" },
    { label: "Брат", level: "easy" },
    { label: "Сестра", level: "easy" },
    { label: "Друг", level: "easy" },
    { label: "Подруга", level: "easy" },
    { label: "Жена", level: "easy" },
    { label: "Муж", level: "easy" },

    // Средне
    { label: "Тёща", level: "medium" },
    { label: "Свекровь", level: "medium" },
    { label: "Зять", level: "medium" },
    { label: "Невестка", level: "medium" },
    { label: "Кумовья", level: "medium" },
    { label: "Племянник", level: "medium" },
    { label: "Крестник", level: "medium" },
    { label: "Бывшая", level: "medium" },
    { label: "Ревность", level: "medium" },
    { label: "Любовница", level: "medium" },

    // Сложно
    { label: "Пасынок", level: "hard" },
    { label: "Свахи", level: "hard" },
    { label: "Троюродная сестра", level: "hard" },
    { label: "Двоюродный брат", level: "hard" },
    { label: "Гражданский брак", level: "hard" },
  ],
}
