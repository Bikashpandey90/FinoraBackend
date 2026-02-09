const { DateTime } = require("luxon");

function formatDateTOYMD(date, format = "yyyy-MM-dd") {
    return DateTime.fromJSDate(new Date(date)).toFormat(format);
}

module.exports = {
    formatDateTOYMD
};
