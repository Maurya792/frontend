import jwt from "jsonwebtoken";
import PersonalizeView from "@/components/views/personalize-view";
import { verifyAccount } from "@/api/server-actions/auth-actions";
import routes from "@/lib/routes";
import Link from "next/link";

const VerifyAccountPage = async ({
  searchParams,
}: {
  searchParams: { token?: string };
}) => {
  let isVerified = false;
  let email;
  if (searchParams?.token) {
    const user = jwt.decode(searchParams.token) as any;
    email = user?.username;
    const res = await verifyAccount({ token: searchParams?.token as string });
    isVerified = !!res?.isSuccess
  }
  return (
    <div>
      <div>
        {isVerified ? (
          <div className="text-white text-lg text-left">
            <span>Congratulations! your account has been successfully activated.
            <br /> Please return to {" "}</span>
            <Link href={routes.login(email ? { query: { email } } : undefined)}>
              login screen.
            </Link>
            .
          </div>
        ) : (
          <div className="text-white text-lg text-left">
            Oops, Looks like your account verification link has been expired!{" "}
            <br /> Please try again by{" "}
            <Link
              href={routes.register(email ? { query: { email } } : undefined)}
            >
              {" "}
              creating a new account{" "}
            </Link>
            .
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyAccountPage;
