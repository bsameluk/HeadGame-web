import { useEffect } from "react"
import { useState } from "react"

const COLORS_DICS = {
  1: "rgb(106 216 135)",
  2: "#FFC9A6",
  3: "rgb(229 150 155)"
}

interface CountdownToStartProps {
  onCountdownEnd: () => void
}

const CountdownToStart: React.FC<CountdownToStartProps> = ({ onCountdownEnd }) => {
  const [countdown, setCountdown] = useState(3)

  const currentColor = COLORS_DICS[countdown as keyof typeof COLORS_DICS] || "rgb(229 150 155)"

  useEffect(() => {
    if (countdown === 0) {
      onCountdownEnd()
      return
    }
    const interval = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)
    return () => clearTimeout(interval)
  }, [countdown])

  return (
    <div className="flex items-center justify-center h-full w-full text-center">
      <div
        style={{ backgroundColor: currentColor, height: `${countdown*320}px`, width: `${countdown*320}px` }}
        className={`
          absolute
          rounded-full
          flex items-center justify-center
          transition-all duration-300
        `}
      >
        <h1 className="text-white text-4xl font-bold">{countdown}</h1>
      </div>
    </div>
  )
}

export default CountdownToStart
