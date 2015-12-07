export function convertSecondsToTime (seconds) {
  return {
    h: Math.floor(seconds / 3600),
    m: Math.floor((seconds % 3600) / 60),
    s: seconds % 3600 % 60,
  }
}
