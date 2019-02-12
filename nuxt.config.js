module.exports = {
  /* mode: 'spa', */
  /* serverMiddleware: ['~/api/index.js'], */
  modern: 'server', /* The Node.js server will check browser version based on the user agent and serve the corresponding modern or legacy bundle. */
  /* ________________________________________ BUILD ________________________________________ */
  build: {
    postcss: {
      preset: {
        stage: 0
      }
    },
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        if (!isClient) {
          config.externals.splice(0, 0, function (context, request, callback) {
            if (/^vue2-google-maps($|\/)/.test(request)) {
              callback(null, false)
            } else {
              callback()
            }
          })
        }
      }
    }
    /* analyze: true */
  },
  /* ________________________________________ CSS ________________________________________ */
  css: [
    '@/assets/css/normalize.css',
    '@/assets/css/main.css'
  ],
  /* _______________________________________ HEAD ________________________________________ */
  head: {
    title: 'Escarpas Trip: Encontre tudo para sua viagem a Capitólio',
    meta: [
      { name: 'application-name', content: 'Escarpas Trip' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Reserve acomodações e passeios diretamente com o proprietário. Encontre os melhores restaurantes da cidade, e veja quais serão os próximos eventos. Inspire-se com coisas interessantes a se fazer em Capitólio. Crie um roteiro personalizado. Tudo isso de forma simples, agradável e segura.' },
      // Add to home screen
      { name: 'mobile-web-app-capable', content: 'yes' },
      // Twitter
      { name: 'twitter:title', content: 'Escarpas Trip' },
      // Schema.org
      { itemprop: 'name', content: 'Escarpas Trip' },
      { itemprop: 'description', content: 'Reserve acomodações e passeios diretamente com o proprietário. Encontre os melhores restaurantes da cidade, e veja quais serão os próximos eventos. Inspire-se com coisas interessantes a se fazer em Capitólio. Crie um roteiro personalizado. Tudo isso de forma simples, agradável e segura.' },
      // Facebook / Open Graph
      { property: 'og:site_name', content: 'Escarpas Trip' },
      { property: 'fb:app_id', content: '798658706980670' },
      { property: 'og:url', content: 'https://www.escarpastrip.com/' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Escarpas Trip' },
      { property: 'og:description', content: 'Reserve acomodações e passeios diretamente com o proprietário. Encontre os melhores restaurantes da cidade, e veja quais serão os próximos eventos. Inspire-se com coisas interessantes a se fazer em Capitólio. Crie um roteiro personalizado. Tudo isso de forma simples, agradável e segura.' },
      { property: 'og:image', content: '/static/brand-128.png' },
      { property: 'og:locale', content: 'pt-BR' },
      // MOBILE THEMES
      { name: 'theme-color', content: '#161616' },
      { name: 'msapplication-navbutton-color', content: '#161616' },
      { name: 'apple-mobile-web-app-status-bar-style', content: '#161616' },
      // Google
      { name: 'google-site-verification', content: 'IavBb3pz5krBr8BWBDH8LcwCr2IOEwOifb6h7n3d2jU' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', sizes: '24x24', href: '/brand.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700' }
    ],
    __dangerouslyDisableSanitizers: ['script'],
    script: [
      { innerHTML: '{ "@context": "http://schema.org", "@type": "Organization", "url": "https://www.escarpastrip.com/", "logo": "https://firebasestorage.googleapis.com/v0/b/escarpas-trip.appspot.com/o/utils%2Fbrand-512.png?alt=media&token=a13bf7e0-e31d-4b77-9d43-e32e6095c42b" }', type: 'application/ld+json' }
    ]
  },
  /* ________________________________________ PLUGINS ________________________________________ */
  plugins: [
    { src: '~/plugins/firebase' },
    { src: '~/plugins/vue-progressive-image', ssr: false },
    { src: '~/plugins/vue-google-maps', ssr: false },
    { src: '~/plugins/vue-croppa', ssr: false },
    { src: '~/plugins/vue-autosize', ssr: false },
    { src: '~/plugins/vue-awesome-swiper', ssr: false },
    { src: '~/plugins/v-money', ssr: false },
    { src: '~/plugins/scroll', ssr: false },
    { src: '~/plugins/vue-js-modal', ssr: false },
    { src: '~/plugins/vue-star-rating', ssr: false },
    { src: '~/plugins/vue-airbnb-style-datepicker', ssr: false },
    { src: '~/plugins/vue-multiselect', ssr: false },
    { src: '~/plugins/localStorage.js', ssr: false }
  ],
  router: {
    middleware: ['isMobile'] /* Only dev: update isMobile store on page changes */
  },
  /* _________________________________________ LOADINGS __________________________________________ */
  loading: false,
  /* loadingIndicator: {
    name: 'pulse',
    color: '#dedede',
    background: 'white'
  }, */
  /* _______________________________________ APP MANIFEST _______________________________________ */
  manifest: {
    name: 'Escarpas Trip',
    ogTitle: 'Escarpas Trip',
    description: 'Planeje sua viagem para Capitólio de forma simples, agradável e segura.',
    ogDescription: 'Planeje sua viagem para Capitólio de forma simples, agradável e segura.',
    display: 'fullscreen',
    lang: 'pt-br',
    iconSrc: './static/brand.png'
  },
  icon: {
    iconSrc: '~/static/brand.png'
  },
  /* _________________________________________ SITEMAP _________________________________________ */
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://www.escarpastrip.com',
    cacheTime: 1000 * 60 * 15,
    generate: false
  },
  /* ________________________________________ MODULES ________________________________________ */
  modules: [
    [ '@nuxtjs/google-analytics', { id: 'UA-132478182-1' } ],
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/axios'
  ]
}
