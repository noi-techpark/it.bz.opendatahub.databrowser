export enum MediaItemType {
  IMAGE = 'IMAGE',
}

export interface MediaItem {
  type: MediaItemType;
  url: string;
  name: string;
}
