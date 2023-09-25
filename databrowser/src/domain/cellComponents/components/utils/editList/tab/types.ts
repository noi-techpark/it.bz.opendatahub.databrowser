// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { FileEntry } from '../../../cells/eventDocumentCell/types';

interface FileEntryWithLanguageAvailability extends FileEntry {
  available: boolean;
}

type MultipleFileLanguages = {
  name: string;
  data: FileEntryWithLanguageAvailability[];
};

export type MultipleFilesLanguages = Array<MultipleFileLanguages>;
