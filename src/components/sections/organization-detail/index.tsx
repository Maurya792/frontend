"use client";
import React from "react";
import { useOrg } from "@/hooks/useOrg";
import OrganizationUserDetail from "./OrganizationUserDetail";
import OrganizationUserTableDetail from "./OrganizationUserTableDetail";
import Teams from "./teams";

interface OrganizationDetailProps {}
const OrganizationDetail = ({}: OrganizationDetailProps) => {
  const { userOrg } = useOrg();
  const org = userOrg?.organization;
  const users = userOrg?.organization?.users;
  return (
    <div className="bg-[#C4DFD9] py-5 px-5 mt-16 mb-5 rounded-lg">
      {org && <OrganizationUserDetail org={org} />}
      {users && (
        <OrganizationUserTableDetail
          users={users}
          orgId={userOrg.organization_id}
        />
      )}
      {org?.teams && users && (
        <Teams
          teams={org?.teams}
          users={users}
        />
      )}
    </div>
  );
};

export default OrganizationDetail;
