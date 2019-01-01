const pkg = require('./package');
// const dataSciencePosts = require('data/data.js')
import {dataSciencePosts, intro2pythonPosts} from './data/data.js';

export default dataSciencePosts;
module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page<meta name="theme-color" content="#ffffff">
  */
  head: {
    title: "Oleg Nagornyy",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Oleg Nagornyy's personal web site" },
      { name: 'theme-color', content: '#ffffff'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon.png', sizes: '180x180'},
      { rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#5bbad5'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: 'blue',
    height: '2px'
  },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/styles/main.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/ga.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/markdownit'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  generate: {
    routes: function () {
      const dataScienceUrls = dataSciencePosts.map((post) => {
        return "/data-science/" + post.id;
      })
      const intro2pythonUrls = intro2pythonPosts.map((post) => {
        return "/intro2python/" + post.id;
      })
      return dataScienceUrls.concat(intro2pythonUrls);
    }
  },

  /*
  ** Build configuration
  */
  build: {

    /*
    ** You can extend webpack config here
    */
    // extend(config, ctx) {
    //   // Run ESLint on save
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/,
    //       options: {
    //       	fix: true
    //       }
    //     })
    //   }
    // }
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
        test: /\.ipynb$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
        })
      }
    }
  },
}
