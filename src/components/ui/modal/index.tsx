"use client";
import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSearchParams } from "next/dist/client/components/navigation";
import { modalContext } from "./context";
type ChildFn = (args: { close: () => void }) => React.ReactNode;
export default function Modal({
  children,
}: {
  children: React.ReactNode | ChildFn;
}) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();
  const params = useParams();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current && e.target !== wrapper.current) {
        if (onDismiss) {
          onDismiss();
          document.body.style.overflow = "auto";
        }
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onDismiss();
        document.body.style.overflow = "auto";
      }
    },
    [onDismiss]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <modalContext.Provider value={{ close: onDismiss }}>
      <div
        ref={overlay}
        className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/80"
        onClick={onClick}
      >
        <div
          ref={wrapper}
          className="fixed top-[30%] left-0 right-0 w-[250px] em:w-[400px] sm:w-[600px] md:w-[700px] lg:w-[800px] py-10 px-5 bg-[#C4DFD9] rounded-lg mx-auto"
        >
          {typeof children == "function"
            ? children({ close: onDismiss })
            : children}
        </div>
      </div>
    </modalContext.Provider>
  );
}
