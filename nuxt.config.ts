// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["@/assets/scss/theme.scss"],
  build: {
    transpile: ["chart.js", "@ethersproject", "ethers", "swiper"],
  },
  modules: [
    '@vueuse/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore', // import { defineStore } from 'pinia'
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      }
    ],
  ],
  vite: {
    optimizeDeps: {
        include: ["bn.js", "js-sha3", "hash.js", "aes-js", "scrypt-js", "bech32"]
    },
  },
  /*env: {
    NUXT_PUBLIC_CHAIN_ID: process.env.NUXT_PUBLIC_CHAIN_ID,
    NUXT_PUBLIC_LDG_CONTRACT_ADDRESS: process.env.NUXT_PUBLIC_LDG_CONTRACT_ADDRESS,
    NUXT_PUBLIC_LDG_TOKEN_ADDRESS: process.env.NUXT_PUBLIC_LDG_TOKEN_ADDRESS,
    NUXT_PUBLIC_USDC_TOKEN_ADDRESS: process.env.NUXT_PUBLIC_USDC_TOKEN_ADDRESS,
    NUXT_PUBLIC_PROVIDER_WEBSOCKET: process.env.NUXT_PUBLIC_PROVIDER_WEBSOCKET,
    NUXT_API_KEY_FIREBASE: process.env.NUXT_API_KEY_FIREBASE,
  },*/
  runtimeConfig: {
    firebaseApiKey: process.env.NUXT_API_KEY_FIREBASE,
    public: {
      chainId: process.env.NUXT_PUBLIC_CHAIN_ID,
      ldgContractAddress: process.env.NUXT_PUBLIC_LDG_CONTRACT_ADDRESS,
      ldgTokenAddress: process.env.NUXT_PUBLIC_LDG_TOKEN_ADDRESS,
      usdcTokenAddress: process.env.NUXT_PUBLIC_USDC_TOKEN_ADDRESS,
      providerWebsocket: process.env.NUXT_PUBLIC_PROVIDER_WEBSOCKET,
    }
  },
  loading: {
    color: 'blue'
  },
  typescript: {
    shim: false
  },
})
