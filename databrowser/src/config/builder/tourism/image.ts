import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailElements,
  PropertyConfig,
} from '../../../domain/datasetConfig/types';

export const imageGalleryCell = (): PropertyConfig => ({
  title: '',
  component: CellComponent.EditImageGalleryCell,
  listFields: {
    attributeName: 'images',
    pathToParent: 'ImageGallery',
    fields: {
      alt: 'ImageAltText.{language}',
      src: 'ImageUrl',
      name: 'ImageName',
      width: 'Width',
      height: 'Height',
      title: 'ImageTitle.{language}',
      description: 'ImageDesc.{language}',
      copyright: 'CopyRight',
      license: 'License',
      listPosition: 'ListPosition',
      source: 'ImageSource',
      isInGallery: 'IsInGallery',
    },
  },
});

export const imageGalleryCategory = (): DetailElements => ({
  name: 'Images',
  slug: 'images',
  subcategories: [
    {
      name: '',
      properties: [imageGalleryCell()],
    },
  ],
});

export const imageTableCell = (): PropertyConfig => ({
  title: 'Image',
  component: CellComponent.ImageCell,
  class: 'w-40',
  fields: {
    src: 'ImageGallery.0.ImageUrl',
  },
});

export const mainImageCell = (): PropertyConfig => ({
  title: 'Main Image',
  component: CellComponent.ImageCell,
  fields: { src: 'ImageGallery.0.ImageUrl' },
});

export const logoCell = (): PropertyConfig => ({
  title: 'Logo',
  component: CellComponent.ImageEditCell,
  fields: { src: 'ContactInfos.{language}.LogoUrl' },
});

export const logoTableCell = (): PropertyConfig => ({
  title: 'Logo',
  component: CellComponent.ImageCell,
  class: 'w-40',
  fields: { src: 'ContactInfos.{language}.LogoUrl' },
});

export const logoWithMainImageCells = (): PropertyConfig[] => [
  logoCell(),
  mainImageCell(),
];
