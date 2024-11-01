export default {
  // Global page headers
  head: {
    title: 'recensement',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Votre description ici' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS
  css: [
    // Incluez ici vos fichiers CSS globaux si nécessaire
  ],

  // Plugins to run before rendering page
  plugins: ['~/plugins/supabase.js'],

  // Auto import components
  components: true,

  // Modules for dev and build
  buildModules: [
    '@nuxtjs/eslint-module'
  ],

  // Modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content'
  ],

  // Axios module configuration
  axios: {
    baseURL: '/'
  },

  // PWA module configuration
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration
  content: {},

  // Build configuration
  build: {
    // Custom build configurations, if needed
  },

  // Netlify-specific: Environment variables for Supabase
  publicRuntimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseKey: process.env.SUPABASE_KEY || ''
  }
}
