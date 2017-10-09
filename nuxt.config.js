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
      { rel: 'icon', type: 'image/png', sizes: '24x24', href: '/icon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Arizonia' }
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
    name: 'Scarpas Trip',
    theme_color: 'black',
    lang: 'pt-br'
  },
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/pwa'
  ]
}
