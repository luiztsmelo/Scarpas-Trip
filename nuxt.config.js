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
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Customize app manifest
  */
  manifest: {
    name: 'Escarpas Trip',
    theme_color: 'black',
    lang: 'pt-br',
    icons: [{
      src: './static/brand64.png',
      sizes: '64x64',
      type: 'image/png'
    }, {
      src: './static/brand128.png',
      sizes: '128x128',
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
