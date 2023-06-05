// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export const getRandomElementsFromArray = <T>(
  array: T[],
  numberOfRandomElementsToExtract = 1
) => {
  const elements: T[] = [];

  const getRandomElement = (arr: T[]): T[] => {
    if (elements.length < numberOfRandomElementsToExtract) {
      const index = Math.floor(Math.random() * arr.length);
      const element = arr.splice(index, 1)[0];

      elements.push(element);

      return getRandomElement(arr);
    } else {
      return elements;
    }
  };

  return getRandomElement([...array]);
};
