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
    '@nuxt/content'
  ],
  content: {
    // https://content.nuxtjs.org/api/configuration
  },
  app: {
    head: {
      title: 'leitstelle.io',
    },
    script: [
      { 
        src: 'https://cdn.usefathom.com/script.js',
        'data-spa': 'auto',
        'data-site': 'LIAAMHIM',
        'defer': true
      }
    ]
  }
})