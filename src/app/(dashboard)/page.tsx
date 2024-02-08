import { HomeBanner } from "@/components/sections";
import Skeleton from "@/components/ui/skeleton";
import { Suspense } from "react";

const HomePage: React.FC = async (props) => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="container">
          <Skeleton height={"30vh"} />
             <div className="flex justify-between">
                 <Skeleton height={"30vh"} width={"100%"}/>
                 <Skeleton height={"30vh"} width={"100%"}/>
             </div>
         <Skeleton height={"30vh"} />
       </div>
        }
      >
        <HomeBanner />
      </Suspense>
    </div>
  );
};

export default HomePage;
