const { DateTime } = require("luxon");

// Map short language codes to full BCP 47 locale tags for proper formatting
const LOCALE_MAP = {
    ar: "ar-SA",
};

module.exports = function (dateObj, locale) {
    const dt = DateTime.fromJSDate(dateObj);
    if (locale) {
        const resolvedLocale = LOCALE_MAP[locale] || locale;
        return dt.setLocale(resolvedLocale).toLocaleString(DateTime.DATE_MED);
    }
    return dt.toLocaleString(DateTime.DATE_MED);
};
