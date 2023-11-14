// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { QuickViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const odhActivityPoiQuickView: QuickViewConfig = {
  topGallery: {
    isVisible: true,
    objectMapping: {
      gallery: 'ImageGallery',
    },
  },
  elements: [
    {
      component: CellComponent.QuickViewTextInfoCard,
      objectMapping: {
        header: 'Detail.{language}.Header',
        subHeader: 'Detail.{language}.SubHeader',
        introText: 'Detail.{language}.IntroText',
      },
    },
    {
      component: CellComponent.QuickViewContactsCard,
      objectMapping: {
        companyName: 'ContactInfos.{language}.CompanyName',
        givenName: 'ContactInfos.{language}.Givenname',
        surname: 'ContactInfos.{language}.Surname',
        address: 'ContactInfos.{language}.Address',
        city: 'ContactInfos.{language}.City',
        zipCode: 'ContactInfos.{language}.ZipCode',
        countryName: 'ContactInfos.{language}.CountryName',
        email: 'ContactInfos.{language}.Email',
        phoneNumber: 'ContactInfos.{language}.Phonenumber',
        url: 'ContactInfos.{language}.Url',
      },
    },
    {
      component: CellComponent.QuickViewWebcamsView,
      objectMapping: {
        webcamsMediaItems: 'Webcam',
      },
    },
    {
      component: CellComponent.QuickViewMapView,
      objectMapping: {
        latitude: 'GpsPoints.position.Latitude',
        longitude: 'GpsPoints.position.Longitude',
      },
    },
    {
      component: CellComponent.QuickViewOpeningHoursView,
      arrayMapping: {
        pathToParent: 'OperationSchedule',
        attributeName: 'operationSchedules',
        objectMapping: {
          name: 'OperationscheduleName.{language}',
          start: 'Start',
          stop: 'Stop',
          type: 'Type',
          operationScheduleTimes: 'OperationScheduleTime',
        },
      },
    },
    {
      component: CellComponent.QuickViewRecordInfoView,
      objectMapping: {
        lastUpdate: '_Meta.LastUpdate',
        active: 'Active',
        odhActive: 'OdhActive',
      },
    },
  ],
};
