export const booleanOrStringToBoolean = (
  value?: boolean | string,
  defaultValue = true
): boolean => {
  // If value is a boolean, return it
  if (typeof value === 'boolean') {
    return value;
  }
  // If value is a string, return the boolean value of the string
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  // Return default value
  return defaultValue;
};
