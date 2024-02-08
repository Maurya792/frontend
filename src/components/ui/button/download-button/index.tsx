"use client"

import { isIOS } from "@/lib/helpers/isIos";
import Link from "next/link";
import React, { useState } from "react";
import { useEffectOnce } from "usehooks-ts";

const DownloadAppButton : React.FC<{className? : string}>= ({ className }) => {
  const [isIos, setIsIos] = useState(true);
  useEffectOnce(() => {
    setIsIos(isIOS());
  });
  return (
    <Link
      href={
        isIos
          ? "/packages/ios/codage-crm.dmg"
          : "/packages/windows/codage-crm.exe"
      }
      download
      className={className}
    >
      Download App
    </Link>
  );
};

export default DownloadAppButton;
