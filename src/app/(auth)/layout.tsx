import AuthLayoutBottomView from '@/components/views/auth-layout-bottom-view'
import React, { PropsWithChildren } from 'react'
import Image from 'next/image'


const AuthLayout : React.FC<PropsWithChildren>= ({ children,...props }) => {
  return (
    // children
    <div className="bg-black bg-center bg-cover bg-no-repeat">
      {/* <Image
        display="background"
        src={loginBG}
        alt="Login"
        style={{ zIndex: -999 }}
      /> */}
      <div className="max-w-[90%] xl:max-w-[1100px] mx-auto my-0 px-4 font-Mont flex flex-col justify-center items-center h-[100vh]">
        <div className="">
          <div className="">
          <div className="">
        <div className="">
          {/* <h2 className="font-Poppins text-[30px] leading-[45px] font-semibold text-[#fff] text-center mb-[20px] md:mb-[40px] ">
            Time<span className="font-light"> Tracker.</span>
          </h2> */}
          <div className='flex justify-center mb-[20px] md:mb-[30px]'>
          <Image className="w-[150px] em:w-[170px] sm:w-[200px]" src="/images/Time Tracker..svg" alt="Profile Image" width={200} height={100} />
          </div>
         
          <div className="flex flex-col justify-between items-center ">
            <div className="flex flex-col lg:flex-row justify-center  rounded-[12px] max-w-[1280px]">
              <div className="w-full lg:w-[49%]  bg-center bg-cover bg-no-repeat  px-[30px] em:px-[50px] md:px-[80px] py-[30px] em:py-[50px] md:py-[100px] rounded-t-[10px] lg:rounded-l-[10px] rounded-tr-[10px] lg:rounded-tr-[0px] relative hidden lg:flex items-center bg-[#F4FFF7]">
                <div className="z-50">
                   <Image alt="Woman-chatting-image" src='/images/Woman chatting online.svg' width={456} height={456} className=""/>
                </div>
              </div>
              <div className="w-full lg:w-[51%] bg-[#5E8575] p-[30px] em:p-[30px] lg:p-[80px] rounded-tl-[10px] lg:rounded-tl-[0px]  lg:rounded-r-[10px] rounded-bl-[10px] lg:rounded-bl-[0px] rounded-[10px] lg:rounded-0 flex flex-col items-center justify-center ">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
            <AuthLayoutBottomView />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout