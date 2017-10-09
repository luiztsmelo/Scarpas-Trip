module.exports = {
  /* mode: 'spa', */
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
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Engagement' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  loadingIndicator: {
    name: 'pulse',
    color: '#0D0D0D',
    background: 'white'
  },
  /*
  ** Customize app manifest
  */
  manifest: {
    name: 'Scarpas Trip',
    theme_color: '#3B8070',
    lang: 'pt-br'
  },
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/pwa'
  ]
}
