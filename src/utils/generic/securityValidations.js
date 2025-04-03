/**
 * Checks if the given value contains SQL injection patterns.
 *
 * @param {string} value - The string to be checked for SQL injection patterns.
 * @returns {boolean} - Returns true if the value contains SQL injection patterns, otherwise false.
 */
export const hasSQLInjectionPatterns = (value) => {
  const sqlPatterns =
    /(select|insert|delete|update|drop|truncate|exec|union|from|where)/i;
  return sqlPatterns.test(value);
};

/**
 * Checks if the given value contains any dangerous characters.
 *
 * Dangerous characters include: single quote ('), double quote ("), semicolon (;), and hyphen (-).
 *
 * @param {string} value - The string to be checked for dangerous characters.
 * @returns {boolean} - Returns true if the value contains any dangerous characters, otherwise false.
 */
export const containsDangerousCharacters = (value) => {
  const dangerousCharacters = /['";-]/g;

  return dangerousCharacters.test(value);
};

/**
 * Escapes dangerous characters from the given string.
 *
 * This function removes characters that could potentially be used in
 * injection attacks, such as single quotes, double quotes, semicolons,
 * and hyphens.
 *
 * @param {string} value - The string to be sanitized.
 * @returns {string} - The sanitized string with dangerous characters removed.
 */
export const escapeDangerousCharacters = (value) => {
  return value.replace(/['";-]/g, '');
};

/**
 * Validates if the input string is secure by checking for forbidden characters.
 * Forbidden characters include single quotes ('), double quotes ("), semicolons (;),
 * double hyphens (--), and whitespace characters.
 *
 * @param {string} input - The input string to validate.
 * @returns {boolean} - Returns true if the input is secure (does not contain forbidden characters), otherwise false.
 */
export const validateSecureInput = (input) => {
  const forbiddenPattern = /['";\-\-\s]/g; // Escapamos el guión "-" y doble guión "--"
  return !forbiddenPattern.test(input);
};
