import { Category } from "@/types/categories";

export const TRANSPORT: Category = {
  name: "Транспорт",
  items: [
    // Легко
    { label: "Машина", level: "easy" },
    { label: "Автобус", level: "easy" },
    { label: "Поезд", level: "easy" },
    { label: "Метро", level: "easy" },
    { label: "Самолёт", level: "easy" },
    { label: "Такси", level: "easy" },
    { label: "Трамвай", level: "easy" },
    { label: "Велосипед", level: "easy" },
    { label: "Корабль", level: "easy" },
    { label: "Мотоцикл", level: "easy" },

    // Средне
    { label: "Скутер", level: "medium" },
    { label: "Грузовик", level: "medium" },
    { label: "Электросамокат", level: "medium" },
    { label: "Катер", level: "medium" },
    { label: "Фургон", level: "medium" },
    { label: "Трактор", level: "medium" },
    { label: "Лифт", level: "medium" },
    { label: "Кабриолет", level: "medium" },
    { label: "Троллейбус", level: "medium" },
    { label: "Паровоз", level: "medium" },

    // Сложно
    { label: "Гидросамолёт", level: "hard" },
    { label: "Цеппелин", level: "hard" },
    { label: "Багги", level: "hard" },
    { label: "Снегоход", level: "hard" },
    { label: "Грузовой дрон", level: "hard" },
  ],
}
