export const debounce = <F extends (...params: any[]) => void>(
  fn: F,
  delay = 0
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  // eslint-disable-next-line func-names
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};
