export function preparePhoneNumber(str) {
  return str.charAt(0) === "+" ? str.substring(1) : str;
}

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

export const mapToSelectList = (items, idField = "id", labelField = "label") =>
  items?.map((item) => ({
    value: item[idField],
    label: item[labelField],
  })) || [];
