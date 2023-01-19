import { useFileDialog } from '@vueuse/core';
import { FileType } from './types';

const filesAccepted = (type: FileType) => {
  if (type === 'image') {
    return 'image/*';
  }

  if (type === 'pdf') {
    return 'application/pdf';
  }

  return '*';
};

export const isFileTypeAccepted = (
  configuredType: FileType,
  typeToCheck: string
) => {
  if (configuredType === 'file') {
    return true;
  }
  if (configuredType === 'image') {
    return typeToCheck.startsWith('image/');
  }
  if (configuredType === 'pdf') {
    return typeToCheck === 'application/pdf';
  }
  return false;
};

export const useFileDialogForType = (options?: {
  multiple?: boolean;
  type?: FileType;
}) => {
  const multiple = options?.multiple ?? false;
  const type = options?.type ?? 'file';
  const accept = filesAccepted(type);
  return useFileDialog({ multiple, accept });
};
