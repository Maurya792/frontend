import React from "react";
import { default as NextImage, ImageProps as NextImageProps } from "next/image";
import ResponsiveImage from "./responsive";
import FillImage from "./fill";
import BackgroundImage from "./background";
const Image = React.forwardRef<
  HTMLImageElement,
  NextImageProps & { display?: "responsive" | "fill" | "background" }
>(({ display, ...props }, ref) => {
  return display == "background" ? (
    <BackgroundImage ref={ref} {...props} />
  ) : display === "fill" ? (
    <FillImage ref={ref} {...props} />
  ) : (
    <ResponsiveImage ref={ref} {...props} />
  );
});

Image.displayName = "Image"
export { Image };
