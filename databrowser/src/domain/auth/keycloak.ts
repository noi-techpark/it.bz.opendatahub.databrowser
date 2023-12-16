// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
  url: import.meta.env.VITE_APP_KEYCLOAK_URL,
  realm: import.meta.env.VITE_APP_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_APP_KEYCLOAK_CLIENT_ID,
});

keycloak
  .init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: import.meta.env.VITE_APP_KEYCLOAK_REDIRECT_URI,
    pkceMethod: 'S256',
  })
  .then(() => {
    setInterval(() => {
      keycloak.updateToken(70).catch(() => {
        if (keycloak.token) {
          // Application has still an invalid token. Let's clear it.
          keycloak.clearToken();
        }
      });
    }, 6000);
  });
