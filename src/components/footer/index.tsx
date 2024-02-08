import React from 'react'

import Link from 'next/link';

const footer_data = {
    navList: [
        {
            items: "Company",
            subItems: [
                { name: "Explore", url: "/explore" },
                { name: "Events", url: "/events" },
                { name: "About Us", url: "/aboutus" },
                { name: "Contact Us", url: "/contactus" }
            ]
        }
    ],
    bottomList: {
        copyright: "@2023 All rights reserved to Time tracker.",
        privacypolicy: "Privacy Policy",
        termsandcondition: "Terms & Condition"
    }
}

const Footer = () => {

    const { navList, bottomList } = footer_data;

    return (
        <div className='max-w-[90%] xl:max-w-[1280px] mx-auto px-4'>
            <div className=' mt-[100px] mb-[30px]'>
                <div className='bg-[#393939] rounded-t-[10px] font-Poppins'>
                    <div className='flex flex-col lg:flex-row justify-between items-center py-[30px] em:py-[60px] lg:py-[70px] max-w-[95%] lg:max-w-[90%] xl:max-w-[80%] mx-auto'>
                        <div className='flex flex-col items-center lg:items-start'>
                            {/* <Image src={app_logo} alt='logo' /> */}
                            <p className='text-white text-xs font-normal pt-[4px]'> Make and share posts with your logo </p>
                        </div>

                        <ul className='py-8 lg:py-0'>
                            {Array.isArray(navList) && navList.map((i, index) => {
                                return (
                                    <div key={index}>
                                        {/* <li className='text-white font-[600]'> {i?.items} </li> */}
                                        <ul className='flex flex-col sm:flex-row [&>li]:px-[20px] [&>a>li]:pt-[10px] sm:[&>a>li]:pt-[0px] items-center'>
                                            {Array.isArray(i?.subItems) && i?.subItems?.map((i, index) => {
                                                return (
                                                    <Link href={String(i?.url)} key={index}>
                                                        <li key={index} className='text-white font-normal text-[15px] cursor-pointer px-6  lg:px-4'> {i?.name} </li>
                                                    </Link>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )
                            })}
                        </ul>

                    </div>
                </div>

                <div className='bg-white rounded-b-[10px] mt-[5px]'>
                    <div className='flex flex-col md:flex-row justify-between items-center max-w-[80%] lg:max-w-[50%] mx-auto  text-black text-xs'>
                        <p className='pt-2 md:pt-0 text-center'> {bottomList?.copyright} </p>
                        <p className='py-4 md:py-0 text-center'> {bottomList?.privacypolicy} </p>
                        <p className='pb-2 md:pb-0 text-center'> {bottomList?.termsandcondition} </p>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Footer