export const getHour = (timestamp) => {
  const date = new Date(timestamp);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const paddedMinutes = String(minutes).padStart(2, '0');

  const hourIn24Format =`${hours}:${paddedMinutes}`;
  
  return hourIn24Format;
}
