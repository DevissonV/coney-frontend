import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

/**
 * Instancia de Axios para realizar solicitudes HTTP sin autenticación.
 * Esta instancia no incluye configuraciones adicionales de base URL o headers.
 */
export const publicAxios = axios.create()

/**
 * Instancia de Axios para realizar solicitudes HTTP con autenticación.
 * Incluye configuraciones de base URL y headers personalizados.
 * Los interceptores están configurados para manejar aspectos como la renovación de tokens y la gestión de errores de autenticación.
 */
export const privateAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
})
