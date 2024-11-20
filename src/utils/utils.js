/**
 * Prepares a phone number by removing the leading "+" if present.
 * @param {string} str - The phone number string.
 * @returns {string} - The phone number without the leading "+".
 */
export function preparePhoneNumber(str) {
  return str.charAt(0) === "+" ? str.substring(1) : str;
}

/**
 * Converts a date string into a formatted string in the specified locale.
 * Optionally includes the time.
 * @param {string} dateString - The date string to be converted.
 * @param {boolean} [includeTime=false] - Whether to include the time in the output.
 * @param {string} [locale="ru-RU"] - The locale for formatting (default is Russian).
 * @returns {string} - The formatted date string.
 */
export function convertDate(dateString, includeTime = false, locale = "ru-RU") {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(locale);
  const formattedTime = date.toLocaleString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return includeTime ? `${formattedDate} ${formattedTime}` : formattedDate;
}

/**
 * Formats a Date object into an ISO 8601 string with timezone offset.
 * @param {Date} date - The Date object to format.
 * @returns {string} - The ISO-formatted date string, including timezone offset.
 */
export function formatDateToISO(date) {
  if (!(date instanceof Date)) return "";

  const tzOffset = -date.getTimezoneOffset(); // Timezone offset in minutes
  const sign = tzOffset >= 0 ? "+" : "-";
  const pad = (num) => String(num).padStart(2, "0");

  const offsetHours = Math.floor(Math.abs(tzOffset) / 60);
  const offsetMinutes = Math.abs(tzOffset) % 60;

  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    "." +
    String(date.getMilliseconds()).padStart(3, "0") +
    sign +
    pad(offsetHours) +
    ":" +
    pad(offsetMinutes)
  );
}

/**
 * Sorts an array of objects by a specific field.
 * Supports sorting nested fields using dot notation.
 * @param {Array} arr - The array to sort.
 * @param {string} field - The field to sort by (e.g., "fieldName" or "nested.fieldName").
 * @param {string} [order="asc"] - The sort order ("asc" for ascending, "desc" for descending).
 * @returns {Array} - The sorted array.
 */
export function sortByField(arr, field, order = "asc") {
  const getValue = (obj, path) =>
    path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
  return arr.sort((a, b) => {
    const fieldA = getValue(a, field);
    const fieldB = getValue(b, field);

    if (fieldA === undefined || fieldA === null) return 1;
    if (fieldB === undefined || fieldB === null) return -1;

    let comparison = 0;
    if (typeof fieldA === "string" && typeof fieldB === "string") {
      comparison = fieldA.toLowerCase().localeCompare(fieldB.toLowerCase());
    } else {
      comparison = fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
    }

    return order === "asc" ? comparison : -comparison;
  });
}

/**
 * Maps an array of objects to a select list format with `value` and `label` fields.
 * @param {Array} items - The array of items to map.
 * @param {string} [idField="id"] - The field to use for the `value` property.
 * @param {string} [labelField="label"] - The field to use for the `label` property.
 * @returns {Array} - An array of objects with `value` and `label` properties.
 */
export const mapToSelectList = (items, idField = "id", labelField = "label") =>
  items?.map((item) => ({
    value: item[idField],
    label: item[labelField],
  })) || [];
