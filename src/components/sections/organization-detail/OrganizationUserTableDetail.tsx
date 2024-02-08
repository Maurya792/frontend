"use client";
import {
  DetailUserFragment,
  User_Invitation_Status,
  User_Role,
} from "@/api/__generated__/graphql/graphql";
import { updateUserOrg } from "@/api/server-actions/org-actions";
import UserInviteForm from "@/components/forms/user-invite-form";
import { useUserOrg } from "@/hooks/useUserOrg";
import { getEnumKeys } from "@/lib/helpers/enum";
import { getObjectDiff } from "@/lib/helpers/getObjectDiff";
import { translate } from "@/lib/locales/translate";
import { ArrayElement } from "@/types/global";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowsProp,
} from "@mui/x-data-grid";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { NEXT_PUBLIC_DASHBOARD_HOST } from "@/lib/constants";
import moment from "moment";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import Image from "next/image";
import { useOrg } from "@/hooks/useOrg";

const OrganizationUserTableDetail = ({
  users,
  orgId,
}: {
  users: DetailUserFragment[];
  orgId: number;
}) => {
  const { isAdmin, isOwner } = useOrg();
  const { inviteUser, deleteUser } = useUserOrg();
  const [valuSearch, setValuSearch] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  let rows: GridRowsProp<ArrayElement<typeof users>> = users
    .filter((org: DetailUserFragment) =>
      Object.values(org).some(
        (field) =>
          String(field)?.toLowerCase()?.includes(valuSearch) ||
          field?.toLocaleString().includes(valuSearch) ||
          org.user_organization?.role.toLowerCase()?.includes(valuSearch) ||
          org.user_organization?.invitation_status?.includes(valuSearch)
      )
    )
    .map((user) => ({
      ...user,
    }));
  const removeUserCol: GridColDef<ArrayElement<typeof rows>> = {
    field: "remove",
    headerName: "Remove",
    renderCell: (params) => (
      <strong key={params.row.id}>
        {params.row.user_organization?.role === User_Role.User ? (
          <button
            className="bg-red-600 rounded-full text-white px-[9px] py-[4px] text-[12px]"
            style={{ marginLeft: 16 }}
            onClick={async () => {
              const res = await deleteUser({
                variables: {
                  data: {
                    user_id_organization_id: {
                      organization_id: Number(
                        params.row.user_organization?.organization_id
                      ),
                      user_id: Number(params.id),
                    },
                  },
                },
              });
              if (res.data) {
                toast.success(translate("org.user.delete", params.row.name!));
              }
              if (res.errors) {
              }
            }}
          >
            X
          </button>
        ) : (
          " "
        )}
      </strong>
    ),
  };
  const columns: GridColDef<ArrayElement<typeof rows>>[] = users
    ? [
        { field: "name", headerName: "Name", minWidth: 250 },
        { field: "username", headerName: "Username", minWidth: 350 },
        {
          field: "role",
          headerName: "User Role",
          valueGetter: (context) => {
            return context.row.user_organization?.role?.toUpperCase();
          },
          valueSetter: (context) => {
            if (!context.row.user_organization) return context.row;
            return {
              ...context.row,
              user_organization: {
                ...context.row.user_organization,
                role: context.value,
              },
            };
          },
          type: "singleSelect",
          valueOptions: getEnumKeys(User_Role).filter((i) => i !== "Owner"),
          editable: true,
          minWidth: 150,
        },
        {
          field: "invitationStatus",
          headerName: "User Invitation Status",
          type: "actions",
          getActions: (params) => {
            const isInvited =
              params.row.user_organization?.invitation_status ===
                User_Invitation_Status.Invited &&
              (!params.row.user_organization?.last_invited ||
                moment().diff(
                  params.row.user_organization?.last_invited,
                  "days"
                ) < 7);
            return [
              <GridActionsCellItem
                key={1}
                disabled={
                  params.row.user_organization?.invitation_status ===
                    User_Invitation_Status.Connected || isInvited
                }
                icon={
                  <div>{params.row.user_organization?.invitation_status}</div>
                }
                onClick={async () => {
                  try {
                    const res = await inviteUser({
                      variables: {
                        data: {
                          orgId,
                          redirectUrl: `${NEXT_PUBLIC_DASHBOARD_HOST}/join-org`,
                          username: params.row.username,
                        },
                      },
                    });
                    if (res.data?.inviteUser.isSuccess) {
                      toast.success(
                        translate("org.user.delete", params.row.name!)
                      );
                    }
                    if (res.data?.inviteUser.errors) {
                      res.data?.inviteUser.errors.forEach((err) => {
                        toast.error(err.message);
                      });
                    }
                  } catch (error) {
                    toast.error(
                      error instanceof Error
                        ? error.message
                        : "Something went wrong"
                    );
                  }
                }}
                label="Delete"
              />,
            ];
          },
          minWidth: 250,
        },
        ...(isOwner || isAdmin ? [removeUserCol] : []),
      ]
    : [];

  const processRowUpdate = useCallback(
    async (newRow: DetailUserFragment, oldRow: DetailUserFragment) => {
      const diff = getObjectDiff(newRow, oldRow);
      if (!diff.user_organization || !newRow.user_organization) {
        return oldRow;
      }
      const res = await updateUserOrg(newRow.user_organization.id, {
        role: User_Role[
          diff.user_organization.role as unknown as keyof typeof User_Role
        ],
      });
      toast.success(translate("user.update.success", newRow.name!));
      return newRow;
    },
    []
  );

  const handleProcessRowUpdateError = useCallback((error: any) => {
    toast.error(error.message);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value.replace(/\s/g, "");
    setValuSearch(value);
  };

  return (
    <div className="">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <Box>
          <div className="rounded-lg py-8 em:py-10 px-4 em:px-8  mx-auto my-5 bg-[#98BBA9] relative">
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={handleClose}
            >
              <Image
                className=""
                src="/images/delete-cross.png"
                alt="Profile Image"
                width={15}
                height={15}
              />
            </div>
            <UserInviteForm
              inviteUser={inviteUser}
              orgId={orgId}
              onSuccess={() => {
                setOpen(false);
              }}
            />
          </div>
        </Box>
      </Modal>
      <div className="py-8">
        <div className="w-full overflow-hidden">
          <div className="block sm:flex justify-between items-center">
            <h2 className="text-xl font-medium ">Users</h2>
            {(isAdmin || isOwner) && <div className="mt-6 sm:mt-0 block em:flex">
              <div>
                <input
                  type="text"
                  onChange={handleSearch}
                  className="py-2 px-5 rounded-[5px] text-base sm:text-lg  font-medium outline-none mr-5 placeholder:text-black placeholder:font-medium"
                  placeholder="Search..."
                />
              </div>

              <button
                className="py-2 px-5 bg-[#98BBA9] rounded-[5px] text-base sm:text-lg text-white font-medium hover:shadow-xl mt-4 em:mt-0"
                onClick={() => setOpen(true)}
              >
                Invite User
              </button>

              {/* <button className="">{user && <Link href="/orgs/create/" className="py-2 px-5 bg-[#98BBA9] rounded-[5px] text-lg text-white font-medium hover:shadow-xl">Invite User</Link>}</button> */}
            </div>}
          </div>
          <div className="mt-3">
            <DataGrid
              rows={rows}
              columns={columns}
              className="!border-[transparent] border-b-black text-black !font-Mont !font-medium"
              processRowUpdate={processRowUpdate}
              onProcessRowUpdateError={handleProcessRowUpdateError}
              isCellEditable={(params) => {
                return !(
                  !(params.row as ArrayElement<typeof users>)
                    .user_organization ||
                  (params.row as ArrayElement<typeof users>).user_organization
                    ?.role === User_Role.Owner
                );
              }}
              autoHeight={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationUserTableDetail;
