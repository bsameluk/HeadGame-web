import { useState } from "react"
import Sheet, { SheetHeader } from "@/components/Sheet"
import { WordHistory } from "@/types/game"

interface EditWordListSheetProps {
  isOpen: boolean
  onClose: () => void
  wordsHistory: WordHistory[]
  onSave: (wordsHistory: WordHistory[]) => void
}

const EditWordListSheet: React.FC<EditWordListSheetProps> = ({ isOpen, onClose, wordsHistory, onSave }) => {
  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
    >
      <SheetHeader
        label={"Список слов"}
        onClose={onClose}
      />
      <WordList
        wordsHistory={wordsHistory}
        onSave={onSave}
        onCancel={onClose}
      />
    </Sheet>
  )
}

// ----------------------- HELPER COMPONENTS -------------------------

interface WordListProps {
  wordsHistory: WordHistory[]
  onSave: (wordsHistory: WordHistory[]) => void
  onCancel: () => void
}

const WordList: React.FC<WordListProps> = ({ wordsHistory, onSave, onCancel }) => {
  const [editedWordHistory, setEditedWordHistory] = useState<WordHistory[]>(wordsHistory)

  const handleOnSave = () => {
    onSave(editedWordHistory)
  }

  const handleToggleIsCorrect = (wordHistory: WordHistory) => {
    const newWordHistory = editedWordHistory
      .map((w) => w.word === wordHistory.word ? { ...w, isCorrect: !w.isCorrect } : w)
    setEditedWordHistory(newWordHistory)
  }

  return (
    <>
      <ul className="list rounded-box shadow-md mb-4 overflow-y-auto max-h-[50vh]">
        {editedWordHistory.map((wordHistory) => (
          <WordItem
            key={wordHistory.word.label}
            wordHistory={wordHistory}
            toggleIsCorrect={handleToggleIsCorrect}
          />
        ))}
      </ul>

      <div className="flex justify-between">
        <button className="btn btn-secondary btn-outline" onClick={() => onCancel()}>Отменить</button>
        <button className="btn btn-primary btn-outline" onClick={() => handleOnSave()}>Сохранить</button>
      </div>
    </>
  )
}

interface WordItemProps {
  wordHistory: WordHistory
  toggleIsCorrect: (wordHistory: WordHistory) => void
}

const WordItem: React.FC<WordItemProps> = ({ wordHistory, toggleIsCorrect }) => {
  return (
    <li className="list-row flex justify-between items-center">
      <div className="flex items-center px-0">
        <div>{wordHistory.word.label}</div>
      </div>
      <div className="flex items-center px-0 gap-2">
        <input
          type="checkbox"
          className="toggle toggle-neutral"
          checked={wordHistory.isCorrect}
          onChange={() => toggleIsCorrect(wordHistory)}
        />
      </div>
    </li>
  )
}

export default EditWordListSheet