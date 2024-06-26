export const formatNumber = (number) => {
  return number.toLocaleString('id-ID');
};

export const formatWatches = (num) => {
  if (num >= 1000000) return `${Math.floor(num / 1000000)} jt`;
  if (num >= 1000) return `${Math.floor(num / 1000)} rb`;
  return num.toString();
};