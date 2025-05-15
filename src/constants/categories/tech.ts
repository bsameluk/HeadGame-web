import { Category } from "@/types/categories";

export const TECH: Category = {
  name: "Технологии",
  items: [
    // Легко
    { label: "Смартфон", level: "easy" },
    { label: "Компьютер", level: "easy" },
    { label: "Интернет", level: "easy" },
    { label: "Зарядка", level: "easy" },
    { label: "Наушники", level: "easy" },
    { label: "Wi-Fi", level: "easy" },
    { label: "Камера", level: "easy" },
    { label: "Приложение", level: "easy" },
    { label: "Чат", level: "easy" },
    { label: "Видео", level: "easy" },

    // Средне
    { label: "Браузер", level: "medium" },
    { label: "Сканер", level: "medium" },
    { label: "Сервер", level: "medium" },
    { label: "Бот", level: "medium" },
    { label: "Графическая карта", level: "medium" },
    { label: "Облачное хранилище", level: "medium" },
    { label: "VPN", level: "medium" },
    { label: "Bluetooth", level: "medium" },
    { label: "Подкаст", level: "medium" },
    { label: "Дисплей", level: "medium" },

    // Сложно
    { label: "Алгоритм", level: "hard" },
    { label: "ИИ", level: "hard" },
    { label: "Блокчейн", level: "hard" },
    { label: "Роутер", level: "hard" },
    { label: "Квантовый компьютер", level: "hard" },
  ],
}
