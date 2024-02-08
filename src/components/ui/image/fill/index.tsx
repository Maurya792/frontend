import React from "react";
import { default as NextImage, ImageProps as NextImageProps } from "next/image";
const Image = React.forwardRef<HTMLImageElement, NextImageProps>(
  ({ quality, sizes, ...props }, ref) => {
    return (
      <div
        style={{
          display: "grid",
          gridGap: "8px",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, auto))",
        }}
      >
        <div style={{ position: "relative", height: "400px" }}>
          <NextImage
            ref={ref}
            fill
            style={{
              ...props.style,
              objectFit: props.style?.objectFit ?? "cover", // cover, contain, none
            }}
            {...props}
            quality={quality ?? 100}
            sizes={sizes || "(min-width: 808px) 50vw, 100vw"}
          />
        </div>
      </div>
    );
  }
);
Image.displayName = "FillImage";
export default Image;
