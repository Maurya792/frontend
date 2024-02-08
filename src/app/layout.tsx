import { RootWrapper } from "@/components/wrappers";
import { getSession } from "@/lib/helpers/session";
import "@/styles/globals.css";

import { ReactNode, Suspense } from "react";
export default async function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang="en">
      <body className="  text-black selection:bg-teal-300 !font-Mont">
        <RootWrapper session={session!}>
          <Suspense>
            <main>
              {children}
              {modal}
            </main>
          </Suspense>
        </RootWrapper>
      </body>
    </html>
  );
}
