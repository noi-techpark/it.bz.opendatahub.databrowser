// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailElements,
  PropertyConfig,
} from '../../../domain/datasetConfig/types';

export const imageGalleryCell = (
  { resizeImages } = { resizeImages: true }
): PropertyConfig => ({
  title: '',
  component: CellComponent.EditImageGalleryCell,
  listFields: {
    attributeName: 'images',
    pathToParent: 'ImageGallery',
    objectMappings: {
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
  params: { resizeImages: resizeImages + '' },
});

export const imageGalleryCategory = (
  { resizeImages } = { resizeImages: true }
): DetailElements => ({
  name: 'Images',
  slug: 'images',
  subcategories: [
    {
      name: '',
      properties: [imageGalleryCell({ resizeImages })],
    },
  ],
});

export const imageTableCell = (): PropertyConfig => ({
  title: 'Image',
  component: CellComponent.ImageCell,
  class: 'w-40',
  objectMappings: {
    src: 'ImageGallery.0.ImageUrl',
  },
});

export const mainImageCell = (): PropertyConfig => ({
  title: 'Main Image',
  component: CellComponent.ImageCell,
  objectMappings: { src: 'ImageGallery.0.ImageUrl' },
});

export const logoCell = (): PropertyConfig => ({
  title: 'Logo',
  component: CellComponent.ImageEditCell,
  objectMappings: { src: 'ContactInfos.{language}.LogoUrl' },
  params: {
    width: '40%',
  },
});

export const logoTableCell = (): PropertyConfig => ({
  title: 'Logo',
  component: CellComponent.ImageCell,
  class: 'w-40',
  objectMappings: { src: 'ContactInfos.{language}.LogoUrl' },
});

export const logoWithMainImageCells = (): PropertyConfig[] => [
  logoCell(),
  mainImageCell(),
];
