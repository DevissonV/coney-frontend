import { jwtDecode } from 'jwt-decode';

// Decodificar el token
let decodedToken = null;
if (tokens) {
  try {
    decodedToken = jwtDecode(tokens);
    console.log('Decoded token:', decodedToken);
  } catch (error) {
    console.error('Error decoding token:', error);
  }
}
