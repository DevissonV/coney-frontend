export const getToken = () => {
    try {
      return localStorage.getItem("token") || null;
    } catch (error) {
      console.error("Error al obtener el token del almacenamiento:", error);
      return null;
    }
  };