const { DateTime } = require("luxon");

function formatDateTOYMD(date, format = "dd MMM yyyy") {
  const dt = DateTime.fromJSDate(new Date(date));
  if (format === "yyyy-MM-dd") {
    return dt.toFormat("yyyy-MM-dd");
  } else if (format === "dd/MM/yyyy") {
    return dt.toFormat("dd/MM/yyyy");
  } else if (format === "dd MMM yyyy") {
    return dt.toFormat("dd LLL yyyy"); // 👉 17 Apr 2026
  }
  return dt.toFormat("dd LLL yyyy");
}
module.exports = {
  formatDateTOYMD,
};
