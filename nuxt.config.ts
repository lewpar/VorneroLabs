import Aura from '@primeuix/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [ "~/assets/global.css" ],

  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  app: {
    baseURL: "/VorneroLabs/"
  },

  modules: [
        '@primevue/nuxt-module'
    ],
    primevue: {
        options: {
            theme: {
                preset: Aura
            }
        }
    }
})
