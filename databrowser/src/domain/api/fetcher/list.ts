type QueryParamType = string | null | (string | null)[];

const concatFilters = (queryParam?: QueryParamType): string => {
  if (queryParam == null) {
    return '';
  }
  if (Array.isArray(queryParam)) {
    return queryParam.join(',');
  }
  return queryParam.toString();
};

export const buildQueryFilter = (
  queryFilters?: Record<string, QueryParamType>,
  firstChar = ''
): string => {
  if (queryFilters == null) {
    return '';
  }

  const queryParams = Object.keys(queryFilters).reduce(
    (prev, filterName) => [
      ...prev,
      `${filterName}=${concatFilters(queryFilters[filterName])}`,
    ],
    [] as string[]
  );

  return queryParams.length > 0 ? firstChar + queryParams.join('&') : '';
};
