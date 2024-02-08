import React from "react";
import Link from "next/link";
import Header from "@/components/header";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="bg-[#F5F7F8] ">
        <div className="container">
          <div className="flex flex-col justify-center items-center h-[90vh]">
            <h2 className="text-[#C4DFD9] text-[8em] em:text-[12em] sm:text-[15em] md:text-[18em] xl:text-[21em] font-bold leading-[1]">
              404
            </h2>
            <span className="text-[1.5em] em:text-[2em] sm:text-[2.5em] md:text-[3.5em] xl:text-[4.5em] text-[#45474B] font-medium">
              Page not found
            </span>
            <div className=" mt-5">
              <Link
                href="/"
                className="text-[1.1em] sm:text-[1.375em] bg-[#98BBA9] text-white rounded-xl py-3 px-10 hover:shadow-xl"
              >
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
