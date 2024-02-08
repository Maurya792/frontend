import React from "react";
import { default as NextImage, ImageProps as NextImageProps } from "next/image";
const Image = React.forwardRef<HTMLImageElement, NextImageProps>(
  ({ quality, sizes, ...props }, ref) => {
    return (
      <NextImage
        ref={ref}
        placeholder="blur"
        fill
        style={{
          ...props.style,
          objectFit: "cover",
        }}
        {...props}
        quality={quality ?? 100}
        sizes={sizes || "100vw"}
      />
    );
  }
);
Image.displayName = "BackgroundImage";
export default Image;
