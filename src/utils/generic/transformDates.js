
// Obtener la fecha y hora actual formateada para la zona horaria local
export const getLocalDateTime = () => {
  const currentDate = new Date();
  const offset = currentDate.getTimezoneOffset() * 60000; // obtener la diferencia de zona horaria en milisegundos
  const localDate = new Date(currentDate.getTime() - offset); // ajustar el tiempo a la zona local
  return localDate.toISOString().slice(0, 16); // Formato "YYYY-MM-DDTHH:MM"
};

// Función para formatear correctamente la fecha para un input datetime-local
export const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const isoString = date.toISOString();
  return isoString.slice(0, 16); // Formato YYYY-MM-DDTHH:MM
};

// Funcion para formatar la fecha que tiene desde el back en formato a un formato las legible
export const formatDateForDisplay = (dateString) => {
  if (!dateString) return ''; // Verificar si existe la fecha
  const date = new Date(dateString);
  return date.toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
};