"use client";

import { useAccessToken } from "@/hooks/useAccessToken";
import { Suspense, useEffect } from "react";
import { Organizations } from "./organizations";
import Link from "next/link";
import { useUsers } from "@/hooks/useUsers";
import Image from "next/image";
import routes from "@/lib/routes";

export const HomeBanner: React.FC = (props) => {
  // const { data: user, error } = await getUser({ id: 1 });
  const { user } = useUsers();
  useAccessToken();

  // useEffect(() => {
  //   if (user) {
  //     document.body.classList.add("bodyOverflow");
  //   } else {
  //     document.body.classList.remove("bodyOverflow");
  //   }
  // }, [user]);



  return (
    <div className="pt-6 sm:pt-10 pb-20 bg-[#F5F7F8] ">
      <div className="container">
        {/* top  */}
        <div className="block md:flex justify-between items-center bg-white pl-[20px] sm:pl-[37px] py-[20px] px-[20px] sm:px-0 rounded-lg my-5">
          <div className="max-w-full md:max-w-[60%] lg:max-w-[55%] text-center sm:text-left">
            {user ? (
              <span className="text-[24px] em:text-[28px] sm:text-[30px] md:text-[34px] xl:text-[42px] font-semibold capitalize">
                Welcome Back, {user.name} !{" "}
              </span>
            ) : (
              <span className="text-[30px] md:text-[34px] xl:text-[42px] font-semibold capitalize">
                Welcome to Time Tracker{" "}
              </span>
            )}
            <p className="text-sm sm:text-base font-normal leading-[26px] sm:leading-[28px] mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book-
            </p>
          </div>
          <div className="max-w-[60%] md:max-w-[30%] ml-auto mr-auto md:mr-0 mt-5 md:mt-0">
            <Image
              alt="Woman-chatting-image"
              src="/images/Remote work.svg"
              width={671}
              height={456}
              className=""
            />
          </div>
        </div>

        {/* middle  */}
        <div className="block sm:flex justify-between items-center pt-5 em:pt-10">

          <button className="mt-6 sm:mt-0 ml-auto mr-0 block">
            {user && (
              <Link
                href="/orgs/create/"
                className="py-3 px-3 sm:px-5 bg-[#98BBA9] rounded-[5px] text-sm sm:text-base md:text-lg text-white font-medium hover:shadow-xl flex items-center"
              >
                <span className="pr-2"> <Image className="" src="/images/Vector.png" alt="Profile Image" width={25} height={25} /> </span>Add Organization

              </Link>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
