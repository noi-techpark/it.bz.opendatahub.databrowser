import Keycloak from 'keycloak-js';

export const keycloak = Keycloak({
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
      keycloak.updateToken(70).catch((reason) => {
        if (keycloak.token) {
          // Application has still an invalid token. Let's clear it.
          keycloak.clearToken();
        }
      });
    }, 6000);
  });
