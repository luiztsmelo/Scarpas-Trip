module.exports = {
  /*
  ** Build configuration
  */
  build: {},
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
  head: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:200,300,400,500,600,700,800,900' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#ffffff' },
  /*
  ** Customize app manifest
  */
  manifest: {
    name: 'Escarpas Trip',
    display: 'fullscreen',
    theme_color: 'rgb(0, 10, 23)',
    lang: 'pt-br',
    icons: [{
      src: '/static/brand64.png',
      sizes: '64x64',
      type: 'image/png'
    }, {
      src: '/static/brand128.png',
      sizes: '128x128',
      type: 'image/png'
    }, {
      src: '/static/brand256.png',
      sizes: '256x256',
      type: 'image/png'
    }, {
      src: '/static/brand512.png',
      sizes: '5126x512',
      type: 'image/png'
    }]
  },
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/pwa'
  ]
}
