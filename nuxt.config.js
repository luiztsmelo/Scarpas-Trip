module.exports = {
  mode: 'spa',
  /*
  ** Build configuration
  */
  build: {
    vendor: ['firebase']
  },
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
  head: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { hid: 'main-desc', name: 'description', content: 'Planeje sua viagem para Escarpas do Lago de forma simples, agradável e segura!' },
      { hid: 'main-desc', property: 'og:type', content: 'article' },
      { hid: 'main-desc', property: 'og:url', content: 'http://escarpas-trip.herokuapp.com/' },
      { hid: 'main-desc', property: 'og:title', content: 'Escarpas Trip' },
      { hid: 'main-desc', property: 'og:description', content: 'Planeje sua viagem para Escarpas do Lago de forma simples, agradável e segura!' },
      /* { hid: 'main-desc', property: 'og:image', content: '' }, */
      { hid: 'main-desc', property: 'og:locale', content: 'pt_BR' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', sizes: '24x24', href: '/brand.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500,600,700,800|Damion' }
    ]
  },
  /*
  ** Plugins
  */
  plugins: [
    '~/plugins/firebase',
    '~plugins/vue-touch',
    '~plugins/vue-progressive-image',
    '~plugins/vue-google-maps',
    '~plugins/vue-numeric',
    '~plugins/vue-croppa'
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
    display: 'fullscreen',
    /* theme_color: 'rgb(4, 12, 31)', */
    lang: 'pt-br'
  },
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/pwa'
  ]
}
