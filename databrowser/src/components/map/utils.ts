// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * @returns The coordinates of Bolzano / Bozen as default
 */
export const getDefaultCoordinates = () => ({
  lat: 46.499692084332345,
  lng: 11.355074470529834,
});

/**
 * @returns The default attribution control with mentions of OpenDataHub, OpenStreetMap and Carto
 */
export const getDefaultAttribution = () =>
  '<a target="_blank" href="https://www.opendatahub.com">OpenDataHub.com</a> | Map tiles by <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> and <a href="https://carto.com/" target="_blank">Carto</a>';
