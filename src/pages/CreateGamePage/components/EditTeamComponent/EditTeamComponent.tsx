import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// local imports
import { RootState } from "@/stores/main";
import PlayerItem from "./PlayerItem";
import { AddPlayerItem } from "./PlayerItem";
import * as teamEditSheetActions from "@/stores/teamEditSheet/teamEditSheetSlice";
import { Player } from "@/types/team";

interface EditTeamComponentProps {
  onSave: () => void
  onCancel: () => void
}

const EditTeamComponent: React.FC<EditTeamComponentProps> = ({ onSave, onCancel }) => {
  const dispatch = useDispatch()
  const teamEdit = useSelector((state: RootState) => state.teamEditSheet.team)
  const listRef = useRef<HTMLUListElement>(null)

  const handleOnChangeName = (name: string) => {
    dispatch(teamEditSheetActions.changeName({ name }))
  }
  const handleAddPlayer = (name: string) => {
    dispatch(teamEditSheetActions.addPlayerByName({ name }))

    // scroll to bottom when players are updated
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight
      }
    }, 1)
  }
  const handleUpdatePlayer = (_id: number, name: string) => {
    dispatch(teamEditSheetActions.updatePlayerName({ _id, name }))
  }
  const handleDeletePlayer = (player: Player) => {
    dispatch(teamEditSheetActions.deletePlayer(player))
  }

  if (!teamEdit) {
    console.error('TeamEdit: teamEdit is null')
    return null
  }

  return (
    <div className="flex flex-col overflow-y-hidden">
      <div className="flex-shrink-0 shadow-sm">
        <label className="input w-full bg-transparent rounded-box mb-3 outline-none no-outline border-[silver]">
          <span className="label">Название:</span>
          <input
            type="text"
            placeholder=""
            value={teamEdit.name}
            onChange={(e) => handleOnChangeName(e.target.value)}
            />
        </label>
      </div>

      <ul ref={listRef} className="list rounded-box overflow-y-auto flex-grow-1">
        <li className="px-4 pt-[18px] -mb-[10px] text-xs opacity-60 tracking-wide">Игроки:</li>

        {teamEdit.players.map((player) => (
          <PlayerItem
            key={player._id}
            player={player}
            onUpdatePlayer={handleUpdatePlayer}
            onDeletePlayer={handleDeletePlayer}
          />
        ))}
        {teamEdit.players.length === 0 && (
          <li className="text-xs p-2 opacity-80 tracking-wide text-center">Игроков нет</li>
        )}
      </ul>
      <AddPlayerItem
        playersCount={teamEdit.players.length}
        onAddPlayer={handleAddPlayer}
      />

      <div className="flex justify-between">
        <button className="btn btn-secondary btn-outline" onClick={() => onCancel()}>Отменить</button>
        <button className="btn btn-primary btn-outline" onClick={() => onSave()}>Сохранить</button>
      </div>
    </div>
  )
}

export default EditTeamComponent;
