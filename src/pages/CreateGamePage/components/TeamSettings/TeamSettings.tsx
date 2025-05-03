import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/stores/main";
import Sheet, { SheetHeader } from "components/Sheet";
import TeamItem, { AddTeamItem } from "./TeamItem";
import EditTeamComponent from "../EditTeamComponent/EditTeamComponent";
import { Team } from "@/types/team";
import * as gameActions from "@/stores/game/gameSlice";
import * as teamEditSheetActions from "@/stores/teamEditSheet/teamEditSheetSlice";

const TeamSettings: React.FC = () => {
  const dispatch = useDispatch()

  // Game State
  const teams = useSelector((state: RootState) => state.game.teams)

  const openEditSheet = (team?: Team) => {
    if (team) {
      dispatch(teamEditSheetActions.openForTeam({team}))
    } else {
      dispatch(teamEditSheetActions.openForNewTeam())
    }
  }

  const onDeleteTeam = (team: Team) => {
    dispatch(gameActions.removeTeam({teamId: team._id}))
  }

  // Team Edit Sheet State
  const isOpenTeamEdit = useSelector((state: RootState) => state.teamEditSheet.isOpen)
  const teamEdit = useSelector((state: RootState) => state.teamEditSheet.team)

  // Team Edit Sheet Actions
  const onCloseTeamEdit = () => {
    dispatch(teamEditSheetActions.close())
  }
  const onSaveTeamEdit = () => {
    if (!teamEdit) {
      console.error('TeamSettings: onSaveTeamEdit: teamEdit is null')
      return
    }

    if (teamEdit?._id) {
      dispatch(gameActions.updateTeam({team: teamEdit}))
    } else {
      dispatch(gameActions.addTeam({team: teamEdit}))
    }
    dispatch(teamEditSheetActions.close())
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
              onDeleteTeam={onDeleteTeam}
              onEditTeam={openEditSheet}
            />
          ))
        }
        <AddTeamItem onAddTeam={openEditSheet} />
      </div>

        <Sheet
          isOpen={isOpenTeamEdit}
          onClose={onCloseTeamEdit}
          >
          <SheetHeader
            label={teamEdit?._id ? teamEdit.name : "Создание"}
            onClose={onCloseTeamEdit}
            />
          {isOpenTeamEdit && teamEdit && (
            <EditTeamComponent
              onSave={onSaveTeamEdit}
              onCancel={onCloseTeamEdit}
            />
          )}
        </Sheet>
    </>
  )
}

export default TeamSettings;
