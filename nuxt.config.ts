// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxtjs/i18n',
  ],
  css: [
    'maplibre-gl/dist/maplibre-gl.css',
    'assets/main.css'

  ],
  content: {
    // https://content.nuxtjs.org/api/configuration
  },
  app: {
    head: {
      title: 'leitstelle.io',
      script: [
        {
          type: 'text/javascript',
          src: 'https://cdn.usefathom.com/script.js',
          'data-spa': 'auto',
          'data-site': 'LIAAMHIM',
          'defer': true
        }
      ]
    },
  },
  i18n: {
    vueI18n: './i18n.config.ts',
    lazy: true,
    langDir: 'lang',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    defaultLocale: 'de',
    locales: [
      {
        code: 'de',
        name: 'Deutsch',
        file: 'de'
      },
      {
        code: 'en',
        name: 'English',
        file: 'en'
      }
    ],
  },
})