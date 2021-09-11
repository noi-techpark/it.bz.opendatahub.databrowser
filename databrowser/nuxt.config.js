export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'databrowser',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/renderer.web-component.import.ts' },
    { src: '~/plugins/generic.web-component.import.ts' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  alias: {
    '@wc': '~/../web-components',
  },

  // Authentication
  auth: {
    strategies: {
      keycloak: {
        scheme: 'oauth2',
        endpoints: {
          authorization:
            process.env.KEYCLOAK_AUTHORIZATION_URI ||
            'https://auth.opendatahub.testingmachine.eu/auth/realms/noi/protocol/openid-connect/auth',
          token:
            process.env.KEYCLOAK_TOKEN_URI ||
            'https://auth.opendatahub.testingmachine.euauth/realms/noi/protocol/openid-connect/token',
          userInfo: process.env.KEYCLOAK_USERINFO_URI,
          logout:
            process.env.KEYCLOAK_LOGOUT_URI ||
            'https://auth.opendatahub.testingmachine.eu/auth/realms/noi/protocol/openid-connect/logout',
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          name: 'Authorization',
          maxAge: 1800,
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        responseType: 'token',
        grantType: 'authorization_code',
        clientId: process.env.KEYCLOAK_CLIENT_ID || 'odh-databrowser',
        scope: ['profile', 'email'],
        codeChallengeMethod: 'S256',
        redirectUri: process.env.KEYCLOAK_REDIRECT_URI,
      },
    },
  },
};
