"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import routes from "@/lib/routes";
import { translate } from "@/lib/locales/translate";
import { signOut, useSession } from "next-auth/react";
import { CLIENT_TOKEN_INFO } from "@/api/lib/apollo/apollo-client/tokens/client-token";
import { useEffectOnce } from "usehooks-ts";
import { isIOS } from "@/lib/helpers/isIos";
import { usePathname } from "next/navigation";
const Header = () => {
  const path = usePathname()
  const { data } = useSession();
  const user = data?.user;
  const [isIos, setIsIos] = useState(true);
  useEffectOnce(() => {
    setIsIos(isIOS());
  });
  return (
    <div className="shadow-navbar">
      <div className="container">
        <div className="py-[15px] sm:py-[20px]">
          <div className="flex justify-between items-center">
            <Link href={routes.home()}>
              {/* <Image src={app_logo} alt="logo" className="" /> */}
              {/* <h3 className="text-[32px] sm:text-[40px] font-bold">LOGO</h3> */}
              <Image
                className="w-[150px] em:w-[170px] sm:w-[200px]"
                src="/images/Time Tracker.-1.svg"
                alt="Profile Image"
                width={200}
                height={100}
              />
            </Link>
            <div className="flex items-center justify-between">
              <div className="relative">
                <ul className="hidden md:flex items-center font-Poppins [&>a>li]:text-base [&>a>li]:text-black  [&>a>li]:font-medium  after:[&>a>li]:absolute  after:[&>a>li]:w-full after:[&>a>li]:h-[3px] after:[&>a>li]:left-[1.2em] after:[&>a>li]:bottom-[0.8em]">
                  <Link href="/" className="relative">
                    <li className="after:content-[''] after:bg-navBottomLine after:absolute after:top-2 after:w-full after:inline-block after:object-cover hover:opacity-70 mx-[20px]">
                      Home
                    </li>
                  </Link>
                  <span className="relative">
                    <li className="after:content-[''] after:bg-navBottomLine after:absolute after:top-2 after:w-full after:inline-block after:object-cover mx-[20px] hover:opacity-70">
                      <Link
                        href={
                          isIos
                            ? "/packages/ios/codage-crm.dmg"
                            : "/packages/windows/codage-crm.exe"
                        }
                        download
                      >
                        Download App
                      </Link>
                    </li>
                  </span>

                  {!user?.id ? (
                    <Link href={routes.login()}>
                      <li className="text-black font-medium ml-[20px] cursor-pointer hover:opacity-70">
                        {translate("signIn")}
                      </li>
                    </Link>
                  ) : (
                    <span
                      onClick={() => {
                        signOut({ redirect: path !== '/' });
                        CLIENT_TOKEN_INFO.authToken = null;
                      }}
                      className="text-black font-medium ml-[20px] cursor-pointer hover:opacity-70"
                    >
                      {translate("signOut")}
                    </span>
                  )}
                  {/* <Image
                  src={search_icon}
                  alt="search-icon"
                  className="w-[18px] h-[17px]"
                /> */}
                </ul>
              </div>
              <Link className=" cursor-pointer ml-[35px]" href="/profile">
                <Image
                  className=""
                  src="/images/userIcon.png"
                  alt="Profile Image"
                  width={35}
                  height={35}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
