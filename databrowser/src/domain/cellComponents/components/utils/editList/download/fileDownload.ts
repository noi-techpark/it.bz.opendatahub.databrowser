// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export const downloadFile = (src?: string, title?: string) => {
  if (src == null) {
    console.error('File has no src, cannot download');
    return;
  }
  const link = document.createElement('a');
  link.href = src;
  link.target = '_blank';
  link.download = title ?? 'databrowser-download';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
