const COLORS = [
    // Жёлтые (пастельные, светлые)
  "#FFE066", // мягкий жёлтый
  "#FFF4B1", // очень мягкий лимонный
  "#FFDF8A", // пастельный янтарный

  // Синие (пастельные)
  "#A7C7E7", // нежный голубой
  "#8FD3F4", // мягкий небесно-голубой
  "#D1ECFC", // айс-голубой, очень светлый

  // Зелёные (пастельные, мятные)
  "#81D8AE", // светлый мятный
  "#B6E8C9", // мягкий пастельный зелёный
  "#95E2C5", // пастельная мята

  // Тёплые (пастельные персики и розовые)
  "#FFB3B1", // пастельный розовый
  "#FFC9A6", // мягкий персиковый
  "#FFD8A8"  // очень мягкий оранжевый (ближе к бежевому)
]

export const getRandomColor = () => {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}
