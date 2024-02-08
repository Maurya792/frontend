import React from "react";
import { OrganizationCard } from "./organization-card";
import {
  CoreOrganizationFragment,
} from "@/api/__generated__/graphql/graphql";
import Image from "next/image";

export const Organizations: React.FC<{
  data: CoreOrganizationFragment[];
}> = ({ data }) => {
  return (
    <div className="">
      <div className="">
       
      <div className="py-0 md:py-7 mt-[20px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {data.map((org, index) =>
        <OrganizationCard key={index} {...org}/>
      )}
      </div>

      </div>
      
    </div>
  );
};
