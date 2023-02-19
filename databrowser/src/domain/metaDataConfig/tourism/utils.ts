export const parseFilterQuery = (filterQuery?: string) => {
  const cleanFilterQuery = filterQuery?.replace('?', '') ?? '';
  const filterQueryParams = new URLSearchParams(cleanFilterQuery);
  return Object.fromEntries(filterQueryParams);
};
