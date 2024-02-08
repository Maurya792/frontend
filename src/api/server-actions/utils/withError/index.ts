import { translate } from "@/lib/locales/translate";
type ErrorData = { message: string } & Record<string, unknown>;
type ServerResponse<T = any> = {
  data: T | null;
  error: ErrorData | null;
};
export function withError<Fn extends (...args: any[]) => any>(cb: Fn) {
  return async (
    ...args: Parameters<Fn>
  ): Promise<ServerResponse<Awaited<ReturnType<typeof cb>>>> => {
    try {
      const res = await cb(...args);
      return { data: res, error: null };
    } catch (err) {
      return {
        data: null,
        error: {
          message:
            (err as { message: string }).message || translate("errors.server"),
        },
      };
    }
  };
}
