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
    'assets/main.css'
  ],
  content: {},
  app: {
    head: {
      title: 'Leitstelle',
      htmlAttrs: {
        class: 'bg-night',
      },
      meta: [
        {name: 'theme-color', content: '#12122a'},
        {property: 'og:site_name', content: 'Leitstelle'},
        {property: 'og:image', content: 'https://leitstelle.io/images/og-leitstelle.jpg'},
        {name: 'twitter:card', content: 'summary_large_image'},
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
        {rel: 'icon', type: 'image/svg+xml', href: '/logo-pixel.svg'},
        {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
        {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
        {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
        {rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#8e2a22'},
        {rel: 'manifest', href: '/site.webmanifest'},
        {rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/PixelifySans-SemiBold.woff2', crossorigin: ''},
      ],
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
    // Absolute canonical, hreflang and og:url links for link previews
    baseUrl: 'https://leitstelle.io',
    vueI18n: './i18n.config.ts',
    lazy: true,
    langDir: 'lang',
    strategy: 'prefix_and_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    defaultLocale: 'de',
    locales: [
      {
        code: 'de',
        iso: 'de-DE',
        name: 'Deutsch',
        file: 'de'
      },
      {
        code: 'en',
        iso: 'en-GB',
        name: 'English',
        file: 'en'
      }
    ],
  },
})
