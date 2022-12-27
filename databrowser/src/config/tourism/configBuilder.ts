import { CellComponent } from '../../domain/cellComponents/types';

export const IMAGE_GALLERY_CONFIG = {
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
    },
  },
} as const;
