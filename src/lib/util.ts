import next from "next";

/** Convert a number of seconds to "__h __m" */
export const secToString = (sec: number) => {
  const hours = Math.floor(sec / 60 / 60);
  const minutes = Math.floor(sec / 60) - hours * 60;

  return `${hours}h ${minutes}m`;
};

export const numFromStr = (str: string) => {
  return Number(str.replace(/^\D+/g, "").replace(/\D+$/g, ""));
};

export const commaNumber = (num: number) => {
  // https://stackoverflow.com/a/2901298/8748307
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/** Parse a string with markdown-format links */
export const parseMdLinks = (
  str: string
): Array<{
  text: string;
  href?: string;
}> => {
  const segments = [];

  const regex = /\[(.+?)\]\((.+?)\)/;
  let match;
  let nextStr = str;
  while ((match = regex.exec(nextStr))) {
    const [full, text, href] = match;
    const index = nextStr.indexOf(full);
    const before = nextStr.slice(0, index); // Before match
    nextStr = nextStr.slice(index + full.length); // After match

    segments.push({
      text: before,
      href: undefined,
    });
    segments.push({
      text,
      href,
    });
  }

  // No more matches, push remainder of string
  segments.push({
    text: nextStr,
    href: undefined,
  });

  return segments;
};
