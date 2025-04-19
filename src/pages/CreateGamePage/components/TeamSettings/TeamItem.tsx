import { Plus, Trash } from "lucide-react";
import { Edit } from "lucide-react"
import { Team } from "types/main"
import { getRandomColor } from "constants/colors";

interface TeamProps {
  team: Team
  onEditTeam: (team: Team) => void
  onDeleteTeam: (team: Team) => void
}
interface AddTeamItemProps {
  onAddTeam: () => void
}

const TeamItem: React.FC<TeamProps> = ({ team, onEditTeam, onDeleteTeam }) => {

  return (
    <div className="border rounded-box p-4">
      <div className="flex justify-between items-center gap-2 pb-1">
        <div className="font-bold">{team.name}</div>

        <div className="flex items-center gap-2">
          <button
            className="btn btn-sm btn-circle btn-outline btn-neutral ml-auto w-7 h-7 ml-auto"
            onClick={() => onEditTeam(team)}
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            className="btn btn-sm btn-circle btn-outline btn-neutral ml-auto w-7 h-7 ml-auto"
            onClick={() => onDeleteTeam(team)}
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1 flex-wrap">
        {team.players.map((player) => (
          <div
            key={player.playerNumber}
            className="shrink-0 px-1 py-1 text-xs rounded-[10px]"
            style={{ backgroundColor: getRandomColor() }}
          >
            #{player.playerNumber} {player.name}
          </div>
        ))}
      </div>
      {team.players.length === 0 && (
        <div className="text-sm text-gray-500 opacity-80">
          Требуется добавить игроков
        </div>
      )}
    </div>
  );
};

const AddTeamItem: React.FC<AddTeamItemProps> = ({ onAddTeam }) => {
  return (
    <div className="border rounded-box p-4">
      <div className="flex items-center gap-2">
        <div className="font-semibold opacity-50">Добавить команду</div>

        <button
          className="btn btn-sm btn-circle btn-outline btn-neutral ml-auto w-7 h-7 ml-auto"
          onClick={onAddTeam}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TeamItem;
export { AddTeamItem };
