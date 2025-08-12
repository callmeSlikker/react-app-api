export function formatThaiDate(date: Date): string {
  // Get UTC time in ms
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  // Add 7 hours for Bangkok timezone offset
  const thaiTime = new Date(utc + 7 * 3600000);

  const pad = (n: number) => (n < 10 ? "0" + n : n);

  return (
    thaiTime.getFullYear() +
    "-" +
    pad(thaiTime.getMonth() + 1) +
    "-" +
    pad(thaiTime.getDate()) +
    " " +
    pad(thaiTime.getHours()) +
    ":" +
    pad(thaiTime.getMinutes()) +
    ":" +
    pad(thaiTime.getSeconds())
  );
}
