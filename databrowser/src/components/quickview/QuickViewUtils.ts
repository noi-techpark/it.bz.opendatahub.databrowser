export const getValueOfLocale = (
  currentLocale: string,
  obj: Record<string, unknown>
) => {
  // Note: function can be moved as utils
  const fallbackLocale = 'en';

  return obj?.[currentLocale] || obj?.[fallbackLocale];
};

export const getTextValue = (value?: String) => {
  // Note: function can be moved as utils
  return value ?? '/';
};
