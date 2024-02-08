import clsx from "clsx";
import React from "react";
const skeleton = "mt-8 animate-pulse rounded";
const activeAndTitles = "bg-neutral-800 dark:bg-neutral-300";
const items = "bg-neutral-400 dark:bg-neutral-700";
const defaultHeight = "2em";
const defaultWidth = "auto";
const Skeleton: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    heading?: boolean;
    height?: number | string;
    width?: number | string;
  }
> = ({ className, heading, height, width, ...props }) => {
  return (
    <div className="container">
           <div
             className={clsx("h-auto",skeleton, heading ? activeAndTitles : items, className)}
            style={{
              height: typeof height !== "undefined" ? height : defaultHeight,
              width: typeof width !== "undefined" ? width : defaultWidth,
              ...props.style,
            }}
            {...props}
    />
    </div>
  
  );
};

export default Skeleton;
