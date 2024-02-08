const regexMapping = [
  {
    source: /\s\s+/g,
    newValue: " ",
  },
  {
    source: /-+/g,
    newValue: "-",
  },
  {
    source: /[.:\s-]/g,
    newValue: "-",
  },
  {
    source: /&/g,
    newValue: "and",
  },
  {
    source: /[^a-zA-Z_0-9-]/g,
    newValue: "",
  },
  {
    source: /_+/g,
    newValue: "_",
  },
  {
    source: /^_/g,
    newValue: "",
  },
];

export const slugify = (value: string) => {
  let finalString = value;
  finalString = finalString.toLowerCase().trim();
  regexMapping.forEach((i) => {
    finalString = finalString.replace(i.source, i.newValue);
  });
  return finalString;
};
