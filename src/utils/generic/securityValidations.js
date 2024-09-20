// Detecta patrones SQL comunes para prevenir inyecciones SQL
export const hasSQLInjectionPatterns = (value) => {
    const sqlPatterns = /(select|insert|delete|update|drop|truncate|exec|union|from|where)/i;
    return sqlPatterns.test(value);
  };
  
  // Valida si el campo contiene caracteres peligrosos o maliciosos
  export const containsDangerousCharacters = (value) => {
    const dangerousCharacters = /['";\-]/g; // Escapamos correctamente el guión "-"
    return dangerousCharacters.test(value);
  };
  
  // Escapa caracteres peligrosos para evitar inyecciones SQL
  export const escapeDangerousCharacters = (value) => {
    return value.replace(/['";\-]/g, ''); // Remueve los caracteres peligrosos
  };
  
  // Validación completa de seguridad
  export const validateSecureInput = (input) => {
    const forbiddenPattern = /['";\-\-\s]/g; // Escapamos el guión "-" y doble guión "--"
    return !forbiddenPattern.test(input);
  };
  