const webpack = require('webpack');

module.exports = {
  mode:'universal',
  generate: {
    dir: '/Users/kairenchen/Desktop/dist'
  },
  buildDir: '/Users/kairenchen/Desktop/test/.nuxt',
  server: {
    port: 80, // default: 3000
    host: '0.0.0.0', // default: localhostff
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
    //   { rel: 'icon', type: 'image/x-icon', href: '' }
    ]
  },


  script: [
    {type: 'text/javascript'},
    // { src: '~/store/store.js' }
  ],
  css: [
    { src: '~assets/main.scss', lang: 'scss' }
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {

    plugins: [
      // 免import,build時自動判斷特別字,載入
      new webpack.ProvidePlugin(
      {
        '$': 'jquery',
        'axios':'axios',
        Vuex:'vuex',
        bus: ['~/components/bus.js', 'default']
      }
    )],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: []
}
