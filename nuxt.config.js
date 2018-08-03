const pkg = require('./package')
const bodyParser = require('body-parser')

const dbconn = {
  baseUrl: process.env.YOUTHKOREA_BASEURL || 'https://nuxt-blog-b6bb5.firebaseio.com',
  fbAPIKey: process.env.YOUTHKOREA_FBAPIKEY || 'AIzaSyBJgWepzRa5Ae1j3y2z47hb_-bt623XOgs'
}

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Righteous'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   페이지 이동간의 로딩바를 설정 할 수 있음
   https://ko.nuxtjs.org/api/configuration-loading#loading-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0  
   */
  loading: {
    color: '#75a9ff',
    height: '3px',
    duration: 5000
  },
  //상단의 mode 가 spa인 경우, 페이지가 로딩되는 동안 보여줄 로딩바를 설정할 수 있음
  //https://nuxtjs.org/api/configuration-loading-indicator/
  // loadingIndicator: {
  //   name: 'circle',
  //   color: '#3B8070',
  //   background: 'white'
  // },

  /*
   ** Global CSS
   */
  css: ['~/assets/styles/main.css'],

  /*
   ** Plugins to load before mounting the App
   전역 component를 등록함으로써, 페이지별로 import할 필요가 없게됨
   */
  plugins: ['~plugins/core-components.js', '~plugins/date-filter.js', '~plugins/const.js'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    //npm install --save @nuxtjs/axios
    //https://axios.nuxtjs.org/options.html
    '@nuxtjs/axios',
    '@nuxtjs/vuetify'
  ],
  axios: {
    baseURL: dbconn.baseUrl,
    credentials: false
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  //클라이언트와 서버 측면에서 공유할 환경 변수들
  //https://ko.nuxtjs.org/api/configuration-env#env-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0
  env: {
    baseUrl: dbconn.baseUrl,
    fbAPIKey: dbconn.fbAPIKey
  },

  dev: (process.env.NODE_ENV !== 'production'),

  router: {
    middleware: 'log'
  },

  serverMiddleware: [bodyParser.json(), '~/api']
}
