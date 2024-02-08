import { authOptions } from "@/api/lib/auth/auth-options";
import { redirect } from "next/navigation";
import { getSession } from "./session";

export const withSSRAuth = <T extends unknown>(
  Component: React.FC<T>
): React.FC<T> => {
  const AuthComponent: typeof Component = async (props) => {
    const session = await getSession();
    if (!session) {
      redirect(authOptions.pages?.signIn ?? "/login");
    }
    //@ts-ignore
    return <Component {...props} />;
  };


  return AuthComponent;
};
