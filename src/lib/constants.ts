function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
export const NEXT_PUBLIC_API_HOST = assertValue(
  process.env.NEXT_PUBLIC_API_HOST,
  "Missing environment variable: NEXT_PUBLIC_API_HOST"
);
export const NEXT_PUBLIC_DASHBOARD_HOST = assertValue(
  process.env.NEXT_PUBLIC_DASHBOARD_HOST,
  "Missing environment variable: NEXT_PUBLIC_DASHBOARD_HOST"
);
export const NEXT_PUBLIC_GRAPHQL_API = NEXT_PUBLIC_API_HOST + "/graphql";
const hostName = assertValue(
  process.env.NEXT_PUBLIC_VERCEL_URL ||
    process.env.NEXT_PUBLIC_APP_HOST ||
    "http://localhost:3000",
    "Missing environment variable: NEXT_PUBLIC_APP_HOST"
)
export const NEXT_PUBLIC_APP_HOST = hostName?.startsWith("http")?hostName : `https://${hostName}`
export const TOKEN_NAME = "_ch_tt-web-utk";
export const LAST_LOGIN_INFO_KEY =
  process.env.LAST_LOGIN_INFO_KEY ?? "_tt__last_login_info";
