/**
 * Gets the current local date and time formatted for an input field.
 * @returns {string} The formatted local datetime string in 'YYYY-MM-DDTHH:MM' format.
 */
export const getLocalDateTime = () => {
  const currentDate = new Date();
  const offset = currentDate.getTimezoneOffset() * 60000; // Get timezone offset in milliseconds
  const localDate = new Date(currentDate.getTime() - offset); // Adjust time to local timezone
  return localDate.toISOString().slice(0, 16); // Format "YYYY-MM-DDTHH:MM"
};

/**
 * Formats a date string correctly for an input of type datetime-local.
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted datetime string in 'YYYY-MM-DDTHH:MM' format.
 */
export const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const isoString = date.toISOString();
  return isoString.slice(0, 16); // Format YYYY-MM-DDTHH:MM
};

/**
 * Formats a backend-provided date string into a more readable format.
 * @param {string} dateString - The date string from the backend.
 * @returns {string} The formatted date and time in a localized format.
 */
export const formatDateForDisplay = (dateString) => {
  if (!dateString) return ''; // Check if the date exists
  const date = new Date(dateString);
  return date.toLocaleString('es-ES', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
};
