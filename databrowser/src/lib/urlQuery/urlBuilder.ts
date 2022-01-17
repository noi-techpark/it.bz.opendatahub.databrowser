export function buildUrlWithQuery(url: string, queryParams: object): string {
  const searchParams = new URLSearchParams(url);

  Object.entries(queryParams).map((query) =>
    searchParams.set(query[0], query[1])
  );
  return searchParams.toString();
}
