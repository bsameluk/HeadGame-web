import { useState } from "react"

import CountdownToStart from "./CountdownToStart"
import PlayTurn from "./PlayTurn"

const PlayTurnPage: React.FC = () => {
  const [showPreviewCountdown, setShowPreviewCountdown] = useState(true)

  return showPreviewCountdown ? (
    <CountdownToStart onCountdownEnd={() => setShowPreviewCountdown(false)} />
  ) : (
    <PlayTurn />
  )
}

export default PlayTurnPage
