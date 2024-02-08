import {
  DetailTeamFragment,
  DetailUserFragment,
} from "@/api/__generated__/graphql/graphql";
import React from "react";
import Team from "./team";
import CreateTeamForm from "./create-team-form";
import { useOrg } from "@/hooks/useOrg";

const Teams: React.FC<{
  users?: DetailUserFragment[];
  teams: DetailTeamFragment[];
}> = ({ teams, users }) => {
  const { orgId } = useOrg();
  return (
    <div>
      <div>Teams</div>
      <CreateTeamForm orgId={orgId!} />
      <div>
        {users &&
          teams
            .slice()
            .sort((a, b) => b?.id - a?.id)
            .map(
              (team) =>
                team && <Team key={team.id} {...team} orgUsers={users} />
            )}
      </div>
    </div>
  );
};

export default Teams;
