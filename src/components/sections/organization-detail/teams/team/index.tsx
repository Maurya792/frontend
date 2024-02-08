import {
  DetailTeamFragment,
  DetailUserFragment,
  Team_Role,
} from "@/api/__generated__/graphql/graphql";
import { Button } from "@/components/ui/button";
import { useTeam } from "@/hooks/useTeam";
import { translate } from "@/lib/locales/translate";
import React, { ReactNode, useState } from "react";
import { toast } from "react-toastify";
import TeamUserCard from "./team-user-card";
import Select, {
  ActionMeta,
  MultiValue,
  OnChangeValue,
  SingleValue,
} from "react-select";
import { useAuth } from "@/hooks/useAuth";
import { useOrg } from "@/hooks/useOrg";

interface TeamProps extends DetailTeamFragment {
  orgUsers?: DetailUserFragment[];
}

// const Team = ({ name, users, id, orgUser }: { name?: string, users?: DetailTeamFragment[], id?: number, orgUser?: DetailUserFragment[] }) => {
const Team: React.FC<TeamProps> = ({ name, users, id, orgUsers, ...props }) => {
  const { user } = useAuth();
  const { isOwner, isAdmin } = useOrg();
  const { deleteTeam, joinTeam, isJoiningTeam, isDeletingTeam } = useTeam();
  const [selectedUsers, setSelectedUsers] = useState<typeof orgUsers>([]);
  const handleSelectChange: (
    newValue: MultiValue<{
      value: number | undefined;
      label: string | null | undefined;
    }>,
    actionMeta: ActionMeta<{
      value: number | undefined;
      label: string | null | undefined;
    }>
  ) => void = (e) => {
    setSelectedUsers(
      orgUsers?.filter((i) =>
        e.find((v) => String(v.value) === String(i.user_organization?.id))
      )
    );
  };

  return (
    <div className="border-2 flex ">
      <div className="w-full flex items-center space-x-3">
        <h2>{name?.toString()}</h2>
        <div>
          <div>
            {(isOwner || isAdmin) && (
              <div className="flex">
                <Select
                  isMulti={true}
                  onChange={handleSelectChange}
                  isLoading={isJoiningTeam}
                  options={orgUsers
                    ?.filter(
                      (i) =>
                        !users?.find((u) => u.id === i.id) &&
                        i.id !== Number(user?.id)
                    )
                    ?.map((user) => ({
                      value: user.user_organization?.id,
                      label: user.name,
                    }))}
                  value={selectedUsers?.map((user) => ({
                    label: user.name,
                    value: user.user_organization?.id,
                  }))}
                />
                <Button
                  loadingLabel="Adding User..."
                  loading={isJoiningTeam}
                  disabled={isJoiningTeam}
                  onClick={async () => {
                    const responses = await Promise.all(
                      (selectedUsers || []).map(async (i) => {
                        const res = await joinTeam({
                          variables: {
                            data: {
                              role: Team_Role.Member,
                              team: { connect: { id } },
                              user_organization: {
                                connect: {
                                  id: i.user_organization?.id,
                                },
                              },
                            },
                          },
                        });
                        return res;
                      })
                    );
                    setSelectedUsers([]);
                  }}
                >
                  {"Add User"}
                </Button>
              </div>
            )}
            <div>Members</div>
          </div>
          <div>
            {users?.map((i) => (
              <TeamUserCard {...i} key={i.id} teamId={id} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          loadingLabel="Deleting..."
          disabled={isDeletingTeam}
          loading={isDeletingTeam}
          onClick={async () => {
            await deleteTeam({
              variables: {
                where: {
                  id,
                },
              },
            });
          }}
        >
          delete
        </Button>
      </div>
    </div>
  );
};

export default Team;
