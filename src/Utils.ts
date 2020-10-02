export function convertMsTimeToMin(value) {
  return Math.round(value.getTime() / (1000 * 60));
}
