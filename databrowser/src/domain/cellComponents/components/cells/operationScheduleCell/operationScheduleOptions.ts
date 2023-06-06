// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export const operationScheduleTypeOptions = [
  { label: 'Standard', value: '1' },
  { label: 'Only day + month recurring', value: '2' },
  { label: 'Only month recurring', value: '3' },
];

export const operationScheduleTypeDefaultValue =
  operationScheduleTypeOptions[0].value;

export const getOperationScheduleTypeLabel = (value: string | undefined) =>
  operationScheduleTypeOptions.find((option) => option.value === value)?.label;

export const operationScheduleTimeStateOptions = [
  { label: 'Closed', value: 1 },
  { label: 'Open', value: 2 },
];

export const operationScheduleTimeStateDefaultValue =
  operationScheduleTimeStateOptions[1].value;

export const getOperationScheduleTimeStateLabel = (value: number | undefined) =>
  operationScheduleTimeStateOptions.find((option) => option.value === value)
    ?.label;

export const operationScheduleTimeCodeOptions = [
  { label: 'Standard opening time', value: 1 },
  { label: 'Warm meals', value: 2 },
  { label: 'Time range for pizza', value: 3 },
  { label: 'Time range for snack’s', value: 4 },
];

export const operationScheduleTimeCodeDefaultValue =
  operationScheduleTimeCodeOptions[0].value;

export const getOperationScheduleTimeCodeLabel = (value: number | undefined) =>
  operationScheduleTimeCodeOptions.find((option) => option.value === value)
    ?.label;

export const operationScheduleTimeDays = [
  { label: 'MON', key: 'Monday' },
  { label: 'TUE', key: 'Tuesday' },
  { label: 'WED', key: 'Wednesday' },
  { label: 'THU', key: 'Thursday' },
  { label: 'FRI', key: 'Friday' },
  { label: 'SAT', key: 'Saturday' },
  { label: 'SUN', key: 'Sunday' },
];
