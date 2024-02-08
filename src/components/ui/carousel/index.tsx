"use client";
import React, { PropsWithChildren} from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel: React.FC<PropsWithChildren<Settings>> = ({
  children,
  ...props
}) => {
  return (
    //@ts-ignore
    <Slider {...props}>
        {children}
    </Slider>
  );
};

export default Carousel;
