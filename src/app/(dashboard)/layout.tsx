import Header from "@/components/header";
import { ReactNode, Suspense } from "react";
export default async function RootLayout({
  children,
  modal
}: {
  children: ReactNode
  modal: ReactNode
}) {
  return (
    <Suspense>
      <Header />
      {children}
      {modal}
      {/* <Footer /> */}
    </Suspense>
  );
}
