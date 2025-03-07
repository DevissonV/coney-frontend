import Swal from 'sweetalert2';
import i18n from 'i18next';

/**
 * Displays a toast notification.
 * @param {Object} options - Notification options.
 * @param {'success' | 'error' | 'warning' | 'info'} options.icon - The type of notification icon.
 * @param {string} options.titleKey - Translation key for the title.
 * @param {string} options.messageKey - Translation key for the message.
 */
export const toast = ({ icon, titleKey, messageKey }) => {
  Swal.fire({
    icon,
    title: i18n.t(titleKey),
    text: i18n.t(messageKey),
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    iconColor: '#0072CE',
  });
};

/**
 * Displays an error alert.
 * @param {Object} options - Alert options.
 * @param {string} [options.messageKey='error_unexpected'] - Translation key for the error message.
 */
export const errorAlert = ({ messageKey = 'error_unexpected' }) => {
  const formattedMessage = i18n
    .t(messageKey)
    .replace(/(?:\r\n|\r|\n)/g, '<br>');
  Swal.fire({
    icon: 'error',
    title: i18n.t('error_title'),
    html: formattedMessage,
    confirmButtonText: i18n.t('ok'),
    confirmButtonColor: '#0072CE',
  });
};

/**
 * Displays a confirmation dialog before deleting an item.
 * @param {Object} options - Confirmation options.
 * @param {string} [options.titleKey='confirm_delete_title'] - Translation key for the title.
 * @param {string} [options.messageKey='confirm_delete_message'] - Translation key for the message.
 * @returns {Promise<Object>} The result of the confirmation.
 */
export const confirmDelete = async ({
  titleKey = 'confirm_delete_title',
  messageKey = 'confirm_delete_message',
}) => {
  const result = await Swal.fire({
    title: i18n.t(titleKey),
    text: i18n.t(messageKey),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: i18n.t('yes_delete'),
    cancelButtonText: i18n.t('cancel'),
  });

  if (result.isConfirmed) {
    Swal.close();
  }

  return result;
};

/**
 * Displays a confirmation dialog before reserving a ticket.
 * @param {Object} options - Confirmation options.
 * @param {string} [options.titleKey='confirm_reservation_title'] - Translation key for the title.
 * @param {string} [options.messageKey='confirm_reservation_message'] - Translation key for the message.
 * @param {number} options.ticketNumber - The ticket number to be reserved.
 * @returns {Promise<Object>} The result of the confirmation.
 */
export const confirmReservation = async ({
  titleKey = 'confirm_reservation_title',
  messageKey = 'confirm_reservation_message',
  ticketNumber,
}) => {
  const result = await Swal.fire({
    title: i18n.t(titleKey),
    text: `${i18n.t(messageKey)} ${ticketNumber}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: i18n.t('yes_reserve'),
    cancelButtonText: i18n.t('cancel'),
  });

  if (result.isConfirmed) {
    Swal.close();
  }

  return result;
};
