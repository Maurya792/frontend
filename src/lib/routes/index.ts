import { ReadonlyURLSearchParams } from "next/navigation";
import { createQueryString } from "../helpers/createQueryString";
import { NEXT_PUBLIC_DASHBOARD_HOST } from "../constants";
type RouteArgs<T = null> = { query?: Record<string, string>; data?: T } | null;

const getAugmentedLink = (
  path: string,
  query?: Record<string, string>,
  searchParams?: ReadonlyURLSearchParams | null
) =>
  !query
    ? path
    : `${path}${
        createQueryString(query, searchParams).length > 0
          ? `?${createQueryString(query, searchParams)}`
          : ""
      }`;

const routes = {
  register: (args?: RouteArgs, searchParams?: ReadonlyURLSearchParams | null) =>
    getAugmentedLink("/register", args?.query, searchParams),
  login: (args?: RouteArgs, searchParams?: ReadonlyURLSearchParams | null) =>
    getAugmentedLink("/login", args?.query, searchParams),
  home: (args?: RouteArgs, searchParams?: ReadonlyURLSearchParams | null) =>
    getAugmentedLink("/", args?.query, searchParams),
  forgotPassword: (
    args?: RouteArgs,
    searchParams?: ReadonlyURLSearchParams | null
  ) => getAugmentedLink("/forgot-password", args?.query, searchParams),
  dashboard: (
    args?: RouteArgs<{ org: string }>,
    searchParams?: ReadonlyURLSearchParams | null
  ) =>
    getAugmentedLink(
      `${NEXT_PUBLIC_DASHBOARD_HOST}/${args?.data?.org}`,
      args?.query,
      searchParams
    ),
 
};
export default routes;
