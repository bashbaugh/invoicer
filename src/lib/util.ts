export const secToString = (ms: number) => {
  const hours = Math.floor(ms / 60 / 60);
  const minutes = Math.floor(ms / 60) - hours * 60;
  const seconds = ms % 60;

  return `${hours}h ${minutes}m`;
};

export const numFromStr = (str: string) => {
  return Number(str.replace(/^\D+/g, "").replace(/\D+$/g, ""));
};
