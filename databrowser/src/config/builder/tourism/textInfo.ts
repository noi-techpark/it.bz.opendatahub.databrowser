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
          fields: {
            text: 'Detail.{language}.MetaTitle',
          },
        },
        {
          title: 'Meta Description',
          component: CellComponent.StringCell,
          fields: {
            text: 'Detail.{language}.MetaDesc',
          },
        },
        {
          title: 'Title',
          component: CellComponent.StringCell,
          fields: {
            text: 'Detail.{language}.Title',
          },
        },
        {
          title: 'Header',
          component: CellComponent.StringCell,
          fields: {
            text: 'Detail.{language}.Header',
          },
        },
        {
          title: 'SubHeader',
          component: CellComponent.TextAreaCell,
          fields: {
            text: 'Detail.{language}.SubHeader',
          },
        },
        {
          title: 'Intro Text',
          component: CellComponent.TextAreaCell,
          fields: {
            html: 'Detail.{language}.IntroText',
          },
          params: { rows: '4' },
        },
        {
          title: 'Base Text',
          component: CellComponent.HtmlCell,
          fields: {
            html: 'Detail.{language}.BaseText',
          },
        },
        {
          title: 'Additional Text',
          component: CellComponent.TextAreaCell,
          fields: {
            text: 'Detail.{language}.AdditionalText',
          },
          params: { rows: '4' },
        },
        {
          title: 'Get There Text',
          component: CellComponent.TextAreaCell,
          fields: {
            text: 'Detail.{language}.GetThereText',
          },
          params: { rows: '4' },
        },
      ],
    },
  ],
});
