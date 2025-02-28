export const formatThaiDate = (isoString: string) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Bangkok",
  }).format(date);
};
