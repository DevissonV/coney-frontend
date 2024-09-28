import { useEffect } from 'react'
import useAuthStore from '../stores/auth/useAuthStore'

const useAuth = () => {
  const token = useAuthStore((state) => state.token)
  const setUser = useAuthStore((state) => state.setUser)
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    if (token) {
      // Simula la validación de un token (podrías hacer una llamada al backend aquí)
      setUser({ email: 'user@example.com' }) // Aquí debería ir la lógica real para setear el usuario
    }
  }, [token, setUser])

  return { token, logout }
}

export default useAuth
