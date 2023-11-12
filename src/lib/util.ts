export const secToString = (ms: number) => {
  const hours = Math.floor(ms / 60 / 60);
  const minutes = Math.floor(ms / 60) - hours * 60;
  const seconds = ms % 60;

  return `${hours}h ${minutes}m`;
};

export const numFromStr = (str: string) => {
  return Number(str.replace(/^\D+/g, "").replace(/\D+$/g, ""));
};

export const commaNumber = (num: number) => {
  // https://stackoverflow.com/a/2901298/8748307
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
