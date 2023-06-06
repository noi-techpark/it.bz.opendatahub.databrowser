// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface OperationScheduleTimeEntry {
  Start?: string;
  End?: string;
  Monday?: boolean;
  Tuesday?: boolean;
  Wednesday?: boolean;
  Thursday?: boolean;
  Friday?: boolean;
  Saturday?: boolean;
  Sunday?: boolean;
  State?: number;
  Timecode?: number;
}

export interface OperationScheduleEntry {
  name?: string;
  start?: string;
  stop?: string;
  type?: string;
  operationScheduleTimes?: OperationScheduleTimeEntry[];
}
