import { QuickViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const odhActivityPoiQuickView: QuickViewConfig = {
  topGallery: {
    isVisible: true,
    fields: {
      gallery: 'ImageGallery',
    },
  },
  elements: [
    {
      component: CellComponent.QuickViewTextInfoCard,
      fields: {
        header: 'Detail.{language}.Header',
        subHeader: 'Detail.{language}.SubHeader',
        introText: 'Detail.{language}.IntroText',
      },
    },
    {
      component: CellComponent.QuickViewContactsCard,
      fields: {
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
      fields: {
        webcamsMediaItems: 'Webcam',
      },
    },
    {
      component: CellComponent.QuickViewMapView,
      fields: {
        gpsInfo: 'GpsInfo',
      },
    },
    {
      component: CellComponent.QuickViewOpeningHoursView,
      listFields: {
        pathToParent: 'OperationSchedule',
        attributeName: 'operationSchedules',
        fields: {
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
      fields: {
        lastUpdate: '_Meta.LastUpdate',
        active: 'Active',
        odhActive: 'OdhActive',
      },
    },
  ],
};
