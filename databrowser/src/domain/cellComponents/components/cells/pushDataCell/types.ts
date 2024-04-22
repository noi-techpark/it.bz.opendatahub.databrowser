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
    date?: string;
    error?: string;
  };
}

export interface OdhPushResponse {
  Id: string;
  Publisher: string;
  Date: string;
  Result: {
    Response: string;
    HttpStatusCode: string;
    Service: string;
    Success: boolean;
  };
  PushObject?: {
    Id: string;
    Type: string;
  };
}

export type OdhPushResponseMany = Record<string, OdhPushResponse>;
