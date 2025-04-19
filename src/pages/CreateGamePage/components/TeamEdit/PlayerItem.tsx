import { useEffect, useState } from "react";
import { Player } from "../../../../types/main";
import { Edit, Plus, Save, Trash } from "lucide-react";
import { getRandomPlayerName } from "../../../../constants/names";

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
            className="btn btn-square btn-ghost"
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
    <EditRow
      defaultName={defaultName}
      playerNumber={playersCount + 1}
      onAddPlayer={handleAddPlayer}
    />
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
        {/* <label className="input bg-transparent">
          <span className="label">Имя:</span>
          <input
            type="text"
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label> */}
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
  )
}

export default PlayerItem;
export { AddPlayerItem };