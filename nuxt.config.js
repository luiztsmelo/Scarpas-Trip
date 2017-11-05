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
      { hid: 'description', name: 'description', content: 'Planeje sua viagem para Escarpas do Lago de forma simples, agradável e segura.' },
      { name: 'google-site-verification', content: 'IavBb3pz5krBr8BWBDH8LcwCr2IOEwOifb6h7n3d2jU' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', sizes: '24x24', href: '/brand.png' }
    ]
  },
  /*
  ** Plugins
  */
  plugins: [
    '~/plugins/firebase',
    '~plugins/vue-progressive-image',
    '~plugins/vue-google-maps',
    '~plugins/vue-numeric',
    '~plugins/vue-croppa',
    '~plugins/vue-autosize',
    '~plugins/webfontloader',
    '~plugins/vue-awesome-swiper'
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
    lang: 'pt-br'
  },
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/pwa'
  ]
}
