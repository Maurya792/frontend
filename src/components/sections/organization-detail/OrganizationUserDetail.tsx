import {
  DetailOrganizationFragment,
  User_Organization,
} from "@/api/__generated__/graphql/graphql";
import routes from "@/lib/routes";
import Link from "next/link";
import React from "react";
import Image from "next/image";

interface OrganizationUserDetailProps {
  org: DetailOrganizationFragment;
}
const OrganizationUserDetail = ({ org }: OrganizationUserDetailProps) => {
  return (
    <div className="">
      <div className="">
        <div className=" block em:flex items-baseline">
          <h3 className="text-[16px] sm:text-[18px] lg:text-[22px] font-semibold"> Current Organization :{" "}</h3>
          <span className="font-medium pl-0 em:pl-1"> {org?.name}</span>
        </div>
      </div>
      <div className="pt-3 pb-5"> 
        <Link
          href={routes.dashboard({ data: { org: org?.slug as string } })}
          target="_blank"
          className="font-semibold text-base sm:text-lg block em:flex items-center"
        >
          DashBoard Url :{" "}
          <p className="font-medium text-base pl-0 em:pl-2 flex items-center group hover:opacity-80 underline">
            {routes.dashboard({ data: { org: org?.slug as string } })}
            <span className="pl-1 hidden group-hover:block">
               <Image className="" src="/images/link.png" alt="Profile Image" width={15} height={15} />
            </span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default OrganizationUserDetail;
