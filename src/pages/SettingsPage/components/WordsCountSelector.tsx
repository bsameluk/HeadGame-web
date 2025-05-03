const MIN_NUMBER_OF_WORDS = 30
const STEP = 10
const MAX_NUMBER_OF_STEPS = 6

const MAX_NUMBER_OF_WORDS = MIN_NUMBER_OF_WORDS + STEP * MAX_NUMBER_OF_STEPS - STEP
const STEPS = Array.from({ length: MAX_NUMBER_OF_STEPS }, (_, i) => MIN_NUMBER_OF_WORDS + STEP * i)

interface WordsCountSelectorProps {
  numberOfWords: number
  onChange: (newValue: number) => void
}

const WordsCountSelector: React.FC<WordsCountSelectorProps> = ({ numberOfWords, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold">Количество слов</h2>

      <div className="w-full max-w-xs">
        <input
          type="range"
          min={MIN_NUMBER_OF_WORDS}
          max={MAX_NUMBER_OF_WORDS}
          value={numberOfWords}
          className="range"
          step={STEP}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <div className="flex justify-between px-2.5 mt-2 text-xs">
          {STEPS.map((step) => (
            <span key={step}>{step}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WordsCountSelector
