import {
  QuickViewConfig,
  QuickViewSectionComponent,
} from '../../../domain/datasetConfig/types';

export const odhActivityPoiQuickView: QuickViewConfig = {
  topGallery: {
    isVisible: true,
    fields: {
      gallery: 'ImageGallery',
    },
  },
  elements: [
    {
      component: QuickViewSectionComponent.INFO,
      fields: {
        header: 'Detail.{language}.Header',
        subHeader: 'Detail.{language}.SubHeader',
        introText: 'Detail.{language}.IntroText',
      },
    },
    {
      component: QuickViewSectionComponent.CONTACTS,
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
      component: QuickViewSectionComponent.WEBCAMS,
      fields: {
        webcamsMediaItems: 'Webcam',
      },
    },
    {
      component: QuickViewSectionComponent.MAP,
      fields: {
        gpsInfo: 'GpsInfo',
      },
    },
    {
      component: QuickViewSectionComponent.OPENING_HORUS,
      fields: {
        scheduleData: 'OperationSchedule',
      },
    },
    {
      component: QuickViewSectionComponent.RECORD_INFO,
      fields: {
        lastUpdate: '_Meta.LastUpdate',
        active: 'Active',
        odhActive: 'OdhActive',
      },
    },
  ],
};
