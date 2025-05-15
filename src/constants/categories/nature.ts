import { Category } from "@/types/categories";

export const NATURE: Category = {
  name: "Природа",
  items: [
    // Легко
    { label: "Солнце", level: "easy" },
    { label: "Дождь", level: "easy" },
    { label: "Дерево", level: "easy" },
    { label: "Цветок", level: "easy" },
    { label: "Река", level: "easy" },
    { label: "Озеро", level: "easy" },
    { label: "Камень", level: "easy" },
    { label: "Трава", level: "easy" },
    { label: "Снег", level: "easy" },
    { label: "Облака", level: "easy" },

    // Средне
    { label: "Гора", level: "medium" },
    { label: "Вулкан", level: "medium" },
    { label: "Песок", level: "medium" },
    { label: "Лес", level: "medium" },
    { label: "Шторм", level: "medium" },
    { label: "Скала", level: "medium" },
    { label: "Туман", level: "medium" },
    { label: "Землетрясение", level: "medium" },
    { label: "Молния", level: "medium" },
    { label: "Наводнение", level: "medium" },

    // Сложно
    { label: "Гейзер", level: "hard" },
    { label: "Тундра", level: "hard" },
    { label: "Лиана", level: "hard" },
    { label: "Мангровые деревья", level: "hard" },
    { label: "Карстовая пещера", level: "hard" },
  ],
}
