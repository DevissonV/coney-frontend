import Swal from 'sweetalert2';
import i18n from 'i18next'; 

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
    iconColor: '#0072CE'
  });
};

export const errorAlert = ({ messageKey = 'error_unexpected' }) => {
  const formattedMessage = i18n.t(messageKey).replace(/(?:\r\n|\r|\n)/g, '<br>');
  Swal.fire({
    icon: 'error',
    title: i18n.t('error_title'), 
    html: formattedMessage,
    confirmButtonText: i18n.t('ok'),
    confirmButtonColor: '#0072CE'
  });
};


