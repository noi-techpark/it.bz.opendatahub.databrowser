// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ComputedRef, computed } from 'vue';
import { useDatasetConfigStore } from './datasetConfigStore';
import { storeToRefs } from 'pinia';

// export interface TableViewColumn {
//   title: string;
//   // Defined if there is exactly one field
//   field?: string;
// }

// export const useTableViewColumns = (): ComputedRef<TableViewColumn[]> => {
//   const { tableView } = storeToRefs(useDatasetConfigStore());

//   return computed(() => {
//     const elements = tableView.value?.elements ?? [];

//     return elements.map(({ title, fields }) => {
//       const values = Object.values(fields ?? {});
//       const field = values.length === 1 ? values[0] : undefined;
//       return { title, field };
//     });
//   });
// };
