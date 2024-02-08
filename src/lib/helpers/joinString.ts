export const joinString = (args: (string | null | undefined)[]) =>
  args.filter((i) => i && !!(i.length > 0)).join(" ");
