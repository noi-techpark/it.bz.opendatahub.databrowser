// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

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

interface Image {
  width?: number | string;
  height?: number | string;
}

export const getResolutionAsText = ({ width, height }: Image) => {
  if (width == null && height == null) {
    return '';
  }

  return `${width} x ${height} px`;
};
