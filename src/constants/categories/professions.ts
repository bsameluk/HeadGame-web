import { Category } from "@/types/categories";

export const PROFESSIONS: Category = {
  name: "Профессии",
  items: [
    // Легко
    { label: "Врач", level: "easy" },
    { label: "Учитель", level: "easy" },
    { label: "Полицейский", level: "easy" },
    { label: "Повар", level: "easy" },
    { label: "Шофёр", level: "easy" },
    { label: "Программист", level: "easy" },
    { label: "Медсестра", level: "easy" },
    { label: "Певец", level: "easy" },
    { label: "Фермер", level: "easy" },
    { label: "Продавец", level: "easy" },

    // Средне
    { label: "Юрист", level: "medium" },
    { label: "Архитектор", level: "medium" },
    { label: "Журналист", level: "medium" },
    { label: "Маркетолог", level: "medium" },
    { label: "Актёр", level: "medium" },
    { label: "Фотограф", level: "medium" },
    { label: "Бухгалтер", level: "medium" },
    { label: "Психолог", level: "medium" },
    { label: "Инженер", level: "medium" },
    { label: "Слесарь", level: "medium" },

    // Сложно
    { label: "Криптограф", level: "hard" },
    { label: "Геодезист", level: "hard" },
    { label: "Режиссёр монтажа", level: "hard" },
    { label: "Судмедэксперт", level: "hard" },
    { label: "Танатопрактик", level: "hard" },
  ],
}
