import { defineStore } from 'pinia'

export const metamaskInformations = defineStore('userInfo', {
    state: () => ({
        isMetamaskSupported: false,
        address: "",
        isLoggedIn: false,
        networkMetamask: false,
        errorMessage: "",
        ready: true,
        modalWallet: false,
        loadingButtonConnect: true,
        priceCapsa: null,
        projectedApy: null,
        _historicalPrice: null,
        _totalSupply: null,
        monthly_revenue: [{}],
        stats: {
            day: {
                timestamp: [],
                price: []
              },
              week: {
                timestamp: [],
                price: []
              },
              _month: {
                timestamp: [],
                price: []
              },
              _3months: {
                timestamp: [],
                price: []
              },
              _6months: {
                timestamp: [],
                price: []
              },
              all: {
                timestamp: [],
                price: []
              },
        },
        perfAllTime: 0,
        totalProfit: 0,
    }),
    actions: {
    }
})