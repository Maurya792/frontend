import React from "react";
import { default as NextImage, ImageProps as NextImageProps } from "next/image";
const Image = React.forwardRef<HTMLImageElement, NextImageProps>(
  ({ quality, sizes, ...props }, ref) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <NextImage
        ref={ref}
        style={{
          width: '100%',
          height: 'auto',
        }}
        {...props}
        quality={quality ?? 100}
        sizes={sizes || "100vw"}
      />
      </div>
    );
  }
);
Image.displayName = "ResponsiveImage";
export default Image;
