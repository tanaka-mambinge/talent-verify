export const formatDate = (
  date: string,
  format: "mm/dd/yyyy" | "yyyy-mm-dd" = "yyyy-mm-dd"
) => {
  if (!date) return "";

  if (format === "yyyy-mm-dd") {
    return date.split("T")[0];
  } else if (format === "mm/dd/yyyy") {
    const [year, month, day] = date.split("T")[0].split("-");
    return `${month}/${day}/${year}`;
  }
};
