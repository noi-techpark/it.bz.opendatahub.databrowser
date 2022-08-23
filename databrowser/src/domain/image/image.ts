export const resizeImageWidth = (
  width: number,
  src?: string,
  isFullscreen?: boolean
) => {
  if (src == null) {
    return src;
  }

  const resizedImageUrl = width == null ? src : `${src}&width=${width}`;

  return isFullscreen === true ? src : resizedImageUrl;
};
