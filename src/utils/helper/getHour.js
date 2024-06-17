export const getHour = (timestamp) => {
  const date = new Date(timestamp);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const paddedHours = String(hours).padStart(2, '0')
  const paddedMinutes = String(minutes).padStart(2, '0');

  const hourIn24Format =`${paddedHours}:${paddedMinutes}`;
  
  return hourIn24Format;
}
