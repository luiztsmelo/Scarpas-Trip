module.exports = {
  /*
  ** Build configuration
  */
  build: {
    vendor: ['firebase', 'supports-webp', 'card-validator', 'gerador-validador-cpf']
    /* analyze: true */
  },
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
  head: {
    title: 'Escarpas Trip: Casas, Passeios, Atrações, Eventos e Restaurantes em Capitólio e Região',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Planeje sua viagem a Capitólio e região de forma simples, agradável e segura.' },
      { name: 'google-site-verification', content: 'IavBb3pz5krBr8BWBDH8LcwCr2IOEwOifb6h7n3d2jU' },
      // MOBILE THEMES
      // Chrome, Firefox OS and Opera
      { name: 'theme-color', content: '#fff' },
      // Windows Phone
      { name: 'msapplication-navbutton-color', content: '#fff' },
      // iOS Safari
      { name: 'apple-mobile-web-app-status-bar-style', content: '#fff' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', sizes: '24x24', href: '/brand.png' }
    ],
    __dangerouslyDisableSanitizers: ['script'],
    script: [
      { innerHTML: '{ "@context": "http://schema.org", "@type": "Organization", "url": "https://www.escarpastrip.com/", "logo": "https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fbrand-512.png?alt=media&token=a13bf7e0-e31d-4b77-9d43-e32e6095c42b" }', type: 'application/ld+json' }
    ]
  },
  /*
  ** Plugins
  */
  plugins: [
    { src: '~plugins/firebase' },
    { src: '~/plugins/vuex-persistedstate', ssr: false },
    { src: '~plugins/vue-progressive-image', ssr: false },
    { src: '~plugins/vue-google-maps', ssr: false },
    { src: '~plugins/vue-croppa', ssr: false },
    { src: '~plugins/vue-autosize', ssr: false },
    { src: '~plugins/webfontloader', ssr: false },
    { src: '~plugins/vue-awesome-swiper', ssr: false },
    { src: '~plugins/v-money', ssr: false },
    { src: '~plugins/v-calendar', ssr: false },
    { src: '~plugins/scroll', ssr: false },
    { src: '~plugins/vue-js-modal', ssr: false }
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: false,
  loadingIndicator: {
    name: './components/loading.html'
  },
  /*
  ** Customize app manifest
  */
  manifest: {
    name: 'Escarpas Trip',
    ogTitle: 'Escarpas Trip',
    description: 'Planeje sua viagem para Capitólio de forma simples, agradável e segura.',
    ogDescription: 'Planeje sua viagem para Capitólio de forma simples, agradável e segura.',
    display: 'fullscreen',
    lang: 'pt-br',
    iconSrc: './static/brand.png'
  },
 /*
  ** Sitemap
  */
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://www.escarpastrip.com',
    cacheTime: 1000 * 60 * 15,
    generate: false, // Enable me when using nuxt generate
    routes: [
      '/eventos/',
      '/eventos/:id',
      {
        url: '/page/2',
        changefreq: 'daily',
        priority: 1,
        lastmodISO: '2017-06-30T13:30:00.000Z'
      }
    ]
  },
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/axios'
  ]
}
