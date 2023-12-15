// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export const relatedContentTypeOptions = [
  { label: 'Accommodation', value: 'acco' },
  { label: 'Event', value: 'event' },
  { label: 'Activity Poi', value: 'odhactivitypoi' },
  { label: 'Webcam', value: 'webcam' },
];

export const relatedContentTypeDefaultValue =
  relatedContentTypeOptions[0].value;

export const getRelatedContentTypeLabel = (value: string | undefined) =>
  relatedContentTypeOptions.find((option) => option.value === value)?.label;
