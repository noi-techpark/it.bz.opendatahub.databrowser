export const downloadImage = (src?: string, title?: string) => {
  if (src == null) {
    console.error('Image has no src, cannot download');
    return;
  }
  const link = document.createElement('a');
  link.href = src;
  link.target = '_blank';
  link.download = title ?? 'image';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
