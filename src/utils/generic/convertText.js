// src/utils/generic/convertText.js

/**
 * Formatea un texto para que la primera letra sea mayúscula y el resto en minúsculas.
 * @param {string} text - El texto que se desea formatear.
 * @returns {string} - El texto formateado.
 */
export const formatName = (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };
  
/**
 * Formatea un texto completo, cada palabra con la primera letra en mayúsculas.
 * @param {string} text - El texto que se desea formatear.
 * @returns {string} - El texto con cada palabra capitalizada.
 */
  export const capitalizeEachWord = (text) => {
    if (!text) return '';
    return text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  