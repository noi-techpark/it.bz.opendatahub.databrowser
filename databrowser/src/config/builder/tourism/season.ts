// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailElements,
  PropertyConfig,
} from '../../../domain/datasetConfig/types';

export const seasonCell = (): PropertyConfig => ({
  title: 'Seasons',
  component: CellComponent.OperationScheduleCell,
  listFields: {
    pathToParent: 'OperationSchedule',
    attributeName: 'operationSchedules',
    objectMappings: {
      name: 'OperationscheduleName.{language}',
      start: 'Start',
      stop: 'Stop',
      type: 'Type',
      operationScheduleTimes: 'OperationScheduleTime',
    },
  },
});

export const seasonCategory = (): DetailElements => ({
  name: 'Season / Opening hours',
  slug: 'season-opening-hours',
  subcategories: [
    {
      name: '',
      properties: [seasonCell()],
    },
  ],
});
