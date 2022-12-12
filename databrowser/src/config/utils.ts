export const withOdhBaseUrl = (path: string) =>
  `${import.meta.env.VITE_APP_ODH_LOOKUP_BASE_URL}/${path}`;
