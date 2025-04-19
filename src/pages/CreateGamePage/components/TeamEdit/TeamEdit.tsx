import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// local imports
import PlayerItem from "./PlayerItem";
import { AddPlayerItem } from "./PlayerItem";
import { RootState } from "stores/main";
import { addPlayerByName, changeName,
  deletePlayer, updatePlayerName } from "stores/teamEditSheetSlice";
import { Player } from "@/types/main";

interface TeamEditProps {
  onSave: () => void
  onCancel: () => void
}

const TeamEdit: React.FC<TeamEditProps> = ({ onSave, onCancel }) => {
  const dispatch = useDispatch()
  const teamEdit = useSelector((state: RootState) => state.teamEditSheet.team)
  const listRef = useRef<HTMLUListElement>(null)

  const handleOnChangeName = (name: string) => {
    dispatch(changeName(name))
  }
  const handleAddPlayer = (name: string) => {
    dispatch(addPlayerByName(name))

    // scroll to bottom when players are updated
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight
      }
    }, 1)
  }
  const handleUpdatePlayer = (_id: number, name: string) => {
    dispatch(updatePlayerName({ _id, name }))
  }
  const handleDeletePlayer = (player: Player) => {
    dispatch(deletePlayer(player))
  }

  return (
    <>
      <label className="input w-full bg-transparent rounded-box shadow-md mb-4">
        <span className="label">Название:</span>
        <input
          type="text"
          placeholder=""
          value={teamEdit.name}
          onChange={(e) => handleOnChangeName(e.target.value)}
        />
      </label>

      <ul ref={listRef} className="list rounded-box shadow-md mb-4 overflow-y-auto max-h-[50vh]">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Игроки</li>

        {teamEdit.players.map((player) => (
          <PlayerItem
            key={player._id}
            player={player}
            onUpdatePlayer={handleUpdatePlayer}
            onDeletePlayer={handleDeletePlayer}
          />
        ))}
        <AddPlayerItem
          playersCount={teamEdit.players.length}
          onAddPlayer={handleAddPlayer}
        />
      </ul>

      <div className="flex justify-between">
        <button className="btn btn-secondary btn-outline" onClick={() => onCancel()}>Отменить</button>
        <button className="btn btn-primary btn-outline" onClick={() => onSave()}>Сохранить</button>
      </div>
    </>
  )
}

export default TeamEdit;