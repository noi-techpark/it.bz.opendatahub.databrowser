export const pageSizeOptions: { value: string; label: string }[] = [
  {
    value: '25',
    label: '25',
  },
  {
    value: '50',
    label: '50',
  },
  {
    value: '75',
    label: '75',
  },
  {
    value: '100',
    label: '100',
  },
];

export const validPageSizes = pageSizeOptions.map((option) => option.value);

export const defaultPageSize = pageSizeOptions[0].value;

export const defaultPageNumber = 1;

export const defaultLanguage = 'en';

export const defaultQueryParameters = {
  pagesize: defaultPageSize.toString(),
  pagenumber: defaultPageNumber.toString(),
  language: defaultLanguage,
};
