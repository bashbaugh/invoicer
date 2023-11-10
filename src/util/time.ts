export const secToString = (ms: number) => {
  const hours = Math.floor(ms / 60 / 60);
  const minutes = Math.floor(ms / 60) - hours * 60;
  const seconds = ms % 60;

  return `${hours}h ${minutes}m`;
};
