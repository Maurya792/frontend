import {
  DetailTeamFragment,
  Team_Role,
} from "@/api/__generated__/graphql/graphql";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useOrg } from "@/hooks/useOrg";
import { useTeam } from "@/hooks/useTeam";
import { getEnumKeys } from "@/lib/helpers/enum";
import { ArrayElement } from "@/types/global";
import React from "react";

const TeamUserCard: React.FC<
  ArrayElement<NonNullable<DetailTeamFragment["users"]>> & { teamId: number }
> = ({ teamId, id, name, user_organization }) => {
    const { user } = useAuth()
    const {isOwner , isAdmin} = useOrg()
  const {
    removeUserFromTeam,
    isRemovingUserFromTeam,
    updateUserOrgTeam,
    isUserOrgTeamUpdating,
  } = useTeam();
  const isEditable = Number(user?.id) !==id && (isOwner || isAdmin)
  return (
    <div>
      <div>
        <span>Name :</span>
        <span>{name}</span>
      </div>
      <div>
        <span>Role :</span>
        <select
          disabled={isUserOrgTeamUpdating || !isEditable}
          value={
            user_organization?.user_organization_teams?.find(
              (t) => t.team_id === teamId
            )?.role
          }
          onChange={async (e) => {
            await updateUserOrgTeam({
              variables: {
                data: {
                  role: e.target.value as Team_Role,
                },
                where: {
                  id: user_organization?.user_organization_teams?.find(
                    (t) => t.team_id === teamId
                  )?.id,
                },
              },
            });
          }}
        >
          { getEnumKeys(Team_Role).map((key, index) => (
            <option key={index} value={Team_Role[key]}>
              {key}
            </option>
          ))}
        </select>
      </div>
      { isEditable && <Button
        loadingLabel="Removing..."
        loading={isRemovingUserFromTeam}
        disabled={isRemovingUserFromTeam}
        onClick={async () => {
          await removeUserFromTeam({
            variables: {
              where: {
                id: user_organization?.user_organization_teams?.find(
                  (t) => t.team_id === teamId
                )?.id,
              },
            },
          });
        }}
      >
        {"Remove"}
      </Button>}
    </div>
  );
};

export default TeamUserCard;
