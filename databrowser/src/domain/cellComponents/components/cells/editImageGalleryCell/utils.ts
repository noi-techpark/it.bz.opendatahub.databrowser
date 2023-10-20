// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export const shouldResize = (isFullscreen: boolean, resize: boolean) =>
  !isFullscreen && resize;
