// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later
console.log('Hello, World!');

export interface Publisher {
  id: string;
  name: string;
  url: string;
}

export interface PublisherWithPushResult extends Publisher {
  pushResult: {
    success: boolean;
    id?: string;
    error?: string;
  };
}
