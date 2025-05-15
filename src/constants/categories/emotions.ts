import { Category } from "@/types/categories"

export const EMOTIONS: Category = {
  name: "Эмоции и чувства",
  items: [
    // Легко
    { label: "Радость", level: "easy" },
    { label: "Злость", level: "easy" },
    { label: "Грусть", level: "easy" },
    { label: "Страх", level: "easy" },
    { label: "Удивление", level: "easy" },
    { label: "Счастье", level: "easy" },
    { label: "Любовь", level: "easy" },
    { label: "Ненависть", level: "easy" },
    { label: "Скука", level: "easy" },
    { label: "Интерес", level: "easy" },

    // Средне
    { label: "Разочарование", level: "medium" },
    { label: "Вина", level: "medium" },
    { label: "Смущение", level: "medium" },
    { label: "Тоска", level: "medium" },
    { label: "Эйфория", level: "medium" },
    { label: "Облегчение", level: "medium" },
    { label: "Обида", level: "medium" },
    { label: "Гордость", level: "medium" },
    { label: "Сожаление", level: "medium" },
    { label: "Умиротворение", level: "medium" },

    // Сложно
    { label: "Ностальгия", level: "hard" },
    { label: "Экзальтация", level: "hard" },
    { label: "Амбивалентность", level: "hard" },
    { label: "Ревность", level: "hard" },
    { label: "Трепет", level: "hard" },
  ],
}
