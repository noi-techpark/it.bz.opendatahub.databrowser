// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { DetailElements } from '../../../domain/datasetConfig/types';

export const textInfoCategory = (): DetailElements => ({
  name: 'Text information',
  slug: 'text-information',
  subcategories: [
    {
      name: 'General data',
      properties: [
        {
          title: 'Meta Title',
          component: CellComponent.StringCell,
          propertyMappings: {
            text: 'Detail.{language}.MetaTitle',
          },
        },
        {
          title: 'Meta Description',
          component: CellComponent.StringCell,
          propertyMappings: {
            text: 'Detail.{language}.MetaDesc',
          },
        },
        {
          title: 'Title',
          component: CellComponent.StringCell,
          propertyMappings: {
            text: 'Detail.{language}.Title',
          },
        },
        {
          title: 'Header',
          component: CellComponent.StringCell,
          propertyMappings: {
            text: 'Detail.{language}.Header',
          },
        },
        {
          title: 'SubHeader',
          component: CellComponent.TextAreaCell,
          propertyMappings: {
            text: 'Detail.{language}.SubHeader',
          },
        },
        {
          title: 'Intro Text',
          component: CellComponent.TextAreaCell,
          propertyMappings: {
            html: 'Detail.{language}.IntroText',
          },
          params: { rows: '4' },
        },
        {
          title: 'Base Text',
          component: CellComponent.HtmlCell,
          propertyMappings: {
            html: 'Detail.{language}.BaseText',
          },
        },
        {
          title: 'Additional Text',
          component: CellComponent.TextAreaCell,
          propertyMappings: {
            text: 'Detail.{language}.AdditionalText',
          },
          params: { rows: '4' },
        },
        {
          title: 'Get There Text',
          component: CellComponent.TextAreaCell,
          propertyMappings: {
            text: 'Detail.{language}.GetThereText',
          },
          params: { rows: '4' },
        },
      ],
    },
  ],
});
