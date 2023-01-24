export const withOdhBaseUrl = (path: string) =>
  `${import.meta.env.VITE_APP_ODH_LOOKUP_BASE_URL}${path}`;

export const DEFAULT_DATE_FORMAT = 'dd.MM.yyyy';
export const DEFAULT_DATE_TIME_FORMAT = 'dd.MM.yyyy HH:mm';
