
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap'}
    ]
  },
  /**
   * Customize the progress-bar color
   */
  loading: {
    color: '#fa923f',
    failedColor: 'yellow',
    height: '3px',
    duration: 5000 // 5 seconds
  },
  /**
   * Will show during initial loading of the page.
   * It's a spinner
   */
  // loadingIndicator: {
  //   name: 'circle',
  //   color: '#fa923f'
  // },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/core-components.js',
    '~/plugins/date-filter.js'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],

  /**
   * Style Resources
   */
  styleResources: {
    scss: ['~/assets/styles/*.scss']
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {

  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    extend (config, { isDev, isClient }) {
            // Fix for Prettier ES Lint  ( possible --fix option )
            config.module.rules.push(
               {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /(node_modules)/,
                options: {
                  fix: true
                }
              }
            )
            config.module.rules.push(
              {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader'
              }
            )
            config.devtool = '#source-map'
    }
  },
  /**
   * tells nuxt build if you in development mode or NOT
   */
  // dev: true,

  /**
   * environment variable here
   * e.g.
   *  baseUrl:  < this can be set to the URL of firebase >
   */
  env: {
    // you can use this baseUrl to set the base URL
    //    like for example the URL for firebase link
    baseUrl: process.env.BASE_URL || 'https://nuxt-blog-b4ca4.firebaseio.com',
    fbAPIKey: 'AIzaSyBpR9OQNee2SjOodJJEeXeBEmXmNrm0S1s'
  },

  /**
   * this will tell your root project and where node_modules and depencies are located
   */
  // rootDir: {

  // },



  /**
   * srcDir => tells nuxt the path for our Nuxt folders like the components, pages, layouts etc.
   */
  //srcDir: 'myFolder'  // this is where Nuxt will look for all Vue folders like what we've said


  /**
   * transition => very useful property for animating the switching of pages
   */
  //transition: 'page',  // => then it will look for CSS classes with the page*- prefix name
  // but it can be a javascript object
  transition: {
    name: 'fade',
    mode: 'out-in'
  },

  /**
   * router configuration
   */
  router: {

  /**
   * applying middleware to all routes
   */
  middleware: 'log'
  }
}
