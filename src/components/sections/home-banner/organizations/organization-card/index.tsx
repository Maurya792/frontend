import {
  CoreOrganizationFragment,
  CoreOrganizationFragmentDoc,
} from "@/api/__generated__/graphql/graphql";
import { useUsers } from "@/hooks/useUsers";
import routes from "@/lib/routes";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { translate } from "@/lib/locales/translate";

export const OrganizationCard: React.FC<CoreOrganizationFragment> = (org) => {
  return (
    <div className="bg-[#C4DFD9] pt-[20px] pb-[25px] px-[20px] rounded-[10px]">
      <div>
        <Image
          alt="logo"
          src="/images/codage-logo.svg"
          width={75}
          height={75}
          className=""
        />
      </div>
      <div className="py-5">
        <h6 className="text-sm em:text-base font-semibold">
          Org Name :{" "}
          <span className="text-sm em:text-base font-normal pl-1">{org.name}</span>{" "}
        </h6>
        <h6 className="text-sm em:text-base font-semibold">
          Org Slug : <span className="font-normal">{org.slug}</span>
        </h6>
      </div>

      <div className="text-right">
        <button className=" ">
          <Link
            href={routes.org({ data: { org: org.id } })}
            className="text-sm md:text-base font-normal text-white  bg-black px-4 py-2 rounded-[5px] hover:shadow-xl"
          >
            {translate('org.details.button')}
          </Link>
        </button>
      </div>
    </div>
  );
};
