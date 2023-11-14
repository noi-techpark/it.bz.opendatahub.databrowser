// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { QuickViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const odhActivityPoiQuickView: QuickViewConfig = {
  topGallery: {
    isVisible: true,
    objectMappings: {
      gallery: 'ImageGallery',
    },
  },
  elements: [
    {
      component: CellComponent.QuickViewTextInfoCard,
      objectMappings: {
        header: 'Detail.{language}.Header',
        subHeader: 'Detail.{language}.SubHeader',
        introText: 'Detail.{language}.IntroText',
      },
    },
    {
      component: CellComponent.QuickViewContactsCard,
      objectMappings: {
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
      objectMappings: {
        webcamsMediaItems: 'Webcam',
      },
    },
    {
      component: CellComponent.QuickViewMapView,
      objectMappings: {
        latitude: 'GpsPoints.position.Latitude',
        longitude: 'GpsPoints.position.Longitude',
      },
    },
    {
      component: CellComponent.QuickViewOpeningHoursView,
      listFields: {
        pathToParent: 'OperationSchedule',
        attributeName: 'operationSchedules',
        objectMappings: {
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
      objectMappings: {
        lastUpdate: '_Meta.LastUpdate',
        active: 'Active',
        odhActive: 'OdhActive',
      },
    },
  ],
};
