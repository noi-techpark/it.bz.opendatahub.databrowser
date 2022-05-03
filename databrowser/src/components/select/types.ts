export enum SelectSize {
  sm = 'sm',
  md = 'md',
}

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  selected?: boolean;
}
