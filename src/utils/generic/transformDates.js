import dayjs from 'dayjs';

/**
 * Gets the current local date and time formatted for an input field.
 * @returns {string} The formatted local datetime string in 'YYYY-MM-DDTHH:mm' format.
 */
export const getLocalDateTime = () => {
  return dayjs().format('YYYY-MM-DDTHH:mm');
};

/**
 * Formats a date string correctly for an input of type datetime-local.
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted datetime string in 'YYYY-MM-DDTHH:mm' format.
 */
export const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  return dayjs(dateString).format('YYYY-MM-DDTHH:mm');
};

/**
 * Formats a backend-provided date string into a more readable format.
 * @param {string} dateString - The date string from the backend.
 * @returns {string} The formatted date and time in a localized format (dd/mm/yyyy HH:mm).
 */
export const formatDateForDisplay = (dateString) => {
  if (!dateString) return '';
  return dayjs(dateString).format('DD/MM/YYYY HH:mm');
};
