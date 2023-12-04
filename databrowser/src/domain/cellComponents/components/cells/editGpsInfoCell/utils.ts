// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later
import { PointPosition } from '../../../../../components/map/types';

export const getMappedDataFromMap = (data: PointPosition) => {
  return {
    Latitude: data.latitude,
    Longitude: data.longitude,
    Gpstype: data.gpsType,
    Altitude: data.altitude,
    AltitudeUnitofMeasure: data.unitMeasureAltitude,
  };
};
