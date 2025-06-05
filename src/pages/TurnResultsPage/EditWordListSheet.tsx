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
  const [editedWordHistory, setEditedWordHistory] = useState<WordHistory[]>(wordsHistory)

  const handleOnCancel = () => {
    onClose()
    setEditedWordHistory(wordsHistory)
  }

  const handleOnSave = () => {
    onSave(editedWordHistory)
  }

  const handleToggleIsCorrect = (wordHistory: WordHistory) => {
    const newWordHistory = editedWordHistory
      .map((w) => w.word === wordHistory.word ? { ...w, isCorrect: !w.isCorrect } : w)
    setEditedWordHistory(newWordHistory)
  }

  return (
    <Sheet
      isOpen={isOpen}
      onClose={handleOnCancel}
    >
      <SheetHeader
        label={"Список слов"}
        onClose={handleOnCancel}
      />
      <WordList
        editedWordHistory={editedWordHistory}
        handleToggleIsCorrect={handleToggleIsCorrect}
        onSave={handleOnSave}
        onCancel={handleOnCancel}
      />
    </Sheet>
  )
}

// ----------------------- HELPER COMPONENTS -------------------------

interface WordListProps {
  editedWordHistory: WordHistory[]
  onSave: (wordsHistory: WordHistory[]) => void
  handleToggleIsCorrect: (wordsHistory: WordHistory) => void
  onCancel: () => void
}

const WordList: React.FC<WordListProps> = ({ editedWordHistory, onSave, handleToggleIsCorrect, onCancel }) => {

  const handleOnSave = () => {
    onSave(editedWordHistory)
  }

  return (
    <>
      <ul className="list rounded-box shadow-md mb-4 overflow-y-auto max-h-[65vh]">
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
    <li className={`list-row flex justify-between items-center ${wordHistory.isCorrect ? "bg-green-100" : "bg-gray-100"}`}>
      <div>
        <div>{wordHistory.word.label}</div>
      </div>
      <div>
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
