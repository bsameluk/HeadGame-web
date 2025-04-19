import { useDispatch, useSelector } from "react-redux";

import { Team } from "types/main";
import { RootState } from "stores/main";
import Sheet, { SheetHeader } from "components/Sheet";
import { close, openForNewTeam, openForTeam } from "stores/teamEditSheetSlice";
import { addTeam, deleteTeam, updateTeam } from "stores/gameSlice";
import TeamItem, { AddTeamItem } from "./TeamItem";
import TeamEdit from "../TeamEdit/TeamEdit";
import { useEffect } from "react";

interface TeamSettingsProps {
}

const TeamSettings: React.FC<TeamSettingsProps> = () => {
  const dispatch = useDispatch()

  // Game State
  const teams = useSelector((state: RootState) => state.game.teams)

  useEffect(() => {
    console.log(teams)
  }, [teams])

  // Game Actions
  const handleAddTeam = () => {
    dispatch(openForNewTeam())
  }
  const handleEditTeam = (team: Team) => {
    dispatch(openForTeam(team))
  }
  const handleDeleteTeam = (team: Team) => {
    dispatch(deleteTeam(team))
  }

  // Team Edit Sheet State
  const isOpenTeamEdit = useSelector((state: RootState) => state.teamEditSheet.isOpen)
  const teamEdit = useSelector((state: RootState) => state.teamEditSheet.team)

  // Team Edit Sheet Actions
  const onCloseTeamEdit = () => {
    dispatch(close())
  }
  const onSaveTeamEdit = () => {
    if (teamEdit._id) {
      dispatch(updateTeam(teamEdit))
    } else {
      dispatch(addTeam(teamEdit))
    }
    dispatch(close())
  }

  return (
    <>
      <h2 className="font-bold my-3">Команды:</h2>
      <div className="grow-1 flex flex-col gap-4 overflow-y-auto pb-3">
        {
          teams.map((team) => (
            <TeamItem
              key={team._id}
              team={team}
              onDeleteTeam={handleDeleteTeam}
              onEditTeam={handleEditTeam}
            />
          ))
        }
        <AddTeamItem onAddTeam={handleAddTeam} />
      </div>

      <Sheet
        isOpen={isOpenTeamEdit}
        onClose={onCloseTeamEdit}
      >
        <SheetHeader
          label={teamEdit._id ? teamEdit.name : "Создание"}
          onClose={onCloseTeamEdit}
        />
        {teamEdit && <TeamEdit
          onSave={onSaveTeamEdit}
          onCancel={onCloseTeamEdit}
        />}
      </Sheet>
    </>
  )
}

export default TeamSettings;
