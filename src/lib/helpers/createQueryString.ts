import { ReadonlyURLSearchParams } from "next/navigation";

export const createQueryString = (
  args: { [value: string]: string },
  searchParams?: ReadonlyURLSearchParams | null
) => {
  const params = new URLSearchParams(searchParams ?? "");
  Object.entries(args).forEach(([key, value]) => {
    params.set(key, value);
  });

  return params.toString();
};
