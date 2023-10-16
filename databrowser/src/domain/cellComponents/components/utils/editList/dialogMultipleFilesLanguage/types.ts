// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { FileEntry } from '../../../cells/eventDocumentCell/types';

export interface FileEntryWithLanguageAvailability extends FileEntry {
  available?: boolean;
  disableAvailabilityChange?: boolean;
}

type MultipleFileLanguages = {
  name?: string;
  src?: string;
  data: FileEntryWithLanguageAvailability[];
};

export type FileLanguageUpdate = {
  documentName?: string;
  available?: boolean;
  language?: string;
};

export type MultipleFilesLanguages = Array<MultipleFileLanguages>;
