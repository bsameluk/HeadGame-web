import { useEffect, useState } from "react";
import { Edit, Plus, Save, Trash } from "lucide-react";
import { getRandomPlayerName } from "@/constants/names";
import { Player } from "@/types/team";

interface PlayerItemProps {
  player: Player
  onDeletePlayer: (player: Player) => void
  onUpdatePlayer: (_id: number, name: string) => void
}

interface AddPlayerItemProps {
  playersCount: number
  onAddPlayer: (name: string) => void
}

interface EditRowProps {
  _id?: number
  defaultName?: string
  playerNumber: number
  onAddPlayer?: (name: string) => void
  onUpdatePlayer?: (_id: number, name: string) => void
}

const PlayerItem: React.FC<PlayerItemProps> = ({ player, onDeletePlayer, onUpdatePlayer }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdatePlayer = (_id: number, name: string) => {
    onUpdatePlayer(_id, name);
    setIsEditing(false);
  }

  return (
    isEditing ? (
      <EditRow
        _id={player._id}
        defaultName={player.name}
        playerNumber={player.playerNumber}
        onUpdatePlayer={handleUpdatePlayer}
      />
    ) : (
      <li className="list-row">
        <div className="text-xl font-thin opacity-30 tabular-nums flex items-center px-0">
          #{player.playerNumber}
        </div>
        <div className="flex items-center px-0">
          <div>{player.name}</div>
        </div>
        <div className="flex items-center px-0 gap-2">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="size-[1.2em]" />
          </button>
          <button
            className="btn btn-square btn-ghost no-animation active:bg-ghost active:text-ghost-content"
            onClick={() => player._id && onDeletePlayer(player)}
          >
            <Trash className="size-[1.2em]" />
          </button>
        </div>
      </li>
    )
  )
}

const AddPlayerItem: React.FC<AddPlayerItemProps> = ({ playersCount, onAddPlayer }) => {
  const [defaultName, setDefaultName] = useState(getRandomPlayerName());

  const handleAddPlayer = (name: string) => {
    onAddPlayer(name);
    setDefaultName(getRandomPlayerName());
  }

  return (
    <ul className="list rounded-box mb-4">
      <li className="text-xs px-4 pt-[12px] -mb-[10px] opacity-60 tracking-wide">Добавить игрока:</li>
      <li className="list-row">
        <div className="text-xl font-thin opacity-30 tabular-nums flex items-center px-0">
          #{playersCount + 1}
        </div>
        <div className="flex items-center px-0">
          <input
            type="text"
            placeholder="Имя игрока"
            className="input bg-transparent border-neutral-content"
            value={defaultName}
            onChange={(e) => setDefaultName(e.target.value)}
          />
        </div>
        <div className="flex items-center px-0">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => handleAddPlayer(defaultName)}
          >
            <Plus className="size-[1.2em]" />
          </button>
        </div>
      </li>
    </ul>
  )
}

const EditRow: React.FC<EditRowProps> = ({ _id, defaultName, playerNumber, onAddPlayer, onUpdatePlayer }) => {
  const [name, setName] = useState(defaultName || "");

  useEffect(() => {
    setName(defaultName || "");
  }, [defaultName]);

  const handleAddOrUpdatePlayer = () => {
    if (_id && onUpdatePlayer) {
      onUpdatePlayer(_id, name);
    } else if (onAddPlayer) {
      onAddPlayer(name);
    }
  }

  return (
    <>
      <li className="list-row">
        <div className="text-xl font-thin opacity-30 tabular-nums flex items-center px-0">
          #{playerNumber}
        </div>
        <div className="flex items-center px-0">
          <input
            type="text"
            placeholder="Имя игрока"
            className="input bg-transparent border-neutral-content"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex items-center px-0">
          <button
            className="btn btn-square btn-ghost"
            onClick={handleAddOrUpdatePlayer}
          >
            {_id ? <Save className="size-[1.2em]" /> : <Plus className="size-[1.2em]" />}
          </button>
        </div>
      </li>
    </>
  )
}

export default PlayerItem;
export { AddPlayerItem };
