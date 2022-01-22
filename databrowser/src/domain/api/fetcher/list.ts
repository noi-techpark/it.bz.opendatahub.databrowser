type QueryParamType = string | null | (string | null)[];

const concatFilters = (name: string, queryParam?: QueryParamType): string[] => {
  if (queryParam === undefined) {
    return [];
  }

  const params = Array.isArray(queryParam) ? queryParam : [queryParam];
  return params.map((value) => `${name}=${value}`);
};

export const buildQueryFilter = (
  queryFilters?: Record<string, QueryParamType>,
  firstChar = ''
): string => {
  if (queryFilters == null) {
    return '';
  }

  const queryParams = Object.keys(queryFilters).reduce((prev, filterName) => {
    const queryParam = queryFilters[filterName];
    return [...prev, ...concatFilters(filterName, queryParam)];
  }, [] as string[]);

  return queryParams.length > 0 ? firstChar + queryParams.join('&') : '';
};
