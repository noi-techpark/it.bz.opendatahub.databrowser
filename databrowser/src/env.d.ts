// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: CC0-1.0

/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv
  extends Readonly<Record<string, string | boolean | undefined>> {
  readonly VITE_APP_KEYCLOAK_URL: string;
  readonly VITE_APP_KEYCLOAK_REALM: string;
  readonly VITE_APP_KEYCLOAK_CLIENT_ID: string;
  readonly VITE_APP_KEYCLOAK_REDIRECT_URI: string;
  readonly VITE_APP_IMAGE_UPLOAD_URL: string;
  readonly VITE_APP_FILE_UPLOAD_URL: string;
  readonly VITE_APP_ODH_LOOKUP_BASE_URL: string;
  readonly VITE_APP_HOTJAR_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
