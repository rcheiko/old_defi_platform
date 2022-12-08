<template>
  <div>
    <div>
      <div class="connect-end">
        <metamask-connect style="flex: auto; text-align: end"/>
      </div>
      <header>
        <div class="analytics-card-up">
          <div class="analytics-card-inner">
            <p class="analytics-card-inside">Portfolio Value</p>
            <h4 v-if="crypto.ledgityBalance && crypto.ledgityTokenPrice" class="analytics-card-inside statsNumber">${{((crypto.ledgityBalance * crypto.ledgityTokenPrice) / (10 ** 6)).toFixed(2)}}</h4>
            <h4 v-else class="analytics-card-inside statsNumber">$NaN</h4>
          </div>
          <div class="analytics-card-inner">
            <p class="analytics-card-inside">Total Profit</p>
            <h4 v-if="user.totalProfit" class="analytics-card-inside statsNumber">${{(user.totalProfit / 10 ** 6).toFixed(2)}}</h4>
            <h4 v-else class="analytics-card-inside statsNumber">$NaN</h4>
          </div>
          <div class="analytics-card-inner">
            <p class="analytics-card-inside">Performance All Time</p>
            <h4 v-if="user.perfAllTime" class="analytics-card-inside statsNumber">{{user.perfAllTime.toFixed(3)}}%</h4>
            <h4 v-else class="analytics-card-inside statsNumber">NaN%</h4>
          </div>
          <div class="analytics-card-inner">
            <p class="analytics-card-inside">LEDGITY Balance</p>
            <h4 v-if="crypto.ledgityBalance" class="analytics-card-inside statsNumber">{{(crypto.ledgityBalance / (10 ** 6))}}</h4>
            <h4 v-else class="analytics-card-inside statsNumber">NaN</h4>
          </div>
        </div>
        <div class="analytics-card-down">
          <div class="analytics-card-chart">
            <div class="analytics-top-card">
              <div class="info-chart">
                <h5>Portfolio Value</h5>
                <p v-if="crypto.ledgityBalance && crypto.ledgityTokenPrice" style="padding: 2% 0">${{((crypto.ledgityBalance * crypto.ledgityTokenPrice) / (10 ** 6)).toFixed(2)}}</p>
                <p v-else style="padding: 2% 0">$NaN</p>
                <div style="font-size: 0.8em;">
                  <p v-if="buttonActive['1d']"> Past day</p>
                  <p v-if="buttonActive['1w']"> Past week</p>
                  <p v-if="buttonActive['1m']"> Past month</p>
                  <p v-if="buttonActive['3m']"> Past 3 months</p>
                  <p v-if="buttonActive['6m']"> Past 6 months</p>
                  <p v-if="buttonActive['all']"> All Time</p>
                </div>
              </div>
              <div class="chart-time">
                <button @click="(buttonTimeChart = '1d'), setActiveButton('1d')" class="button-time"
                  :class="{ active: buttonActive['1d'] }">
                  1d
                </button>
                <button @click="(buttonTimeChart = '1w'), setActiveButton('1w')" class="button-time"
                  :class="{ active: buttonActive['1w'] }">
                  1w
                </button>
                <button @click="(buttonTimeChart = '1m'), setActiveButton('1m')" class="button-time"
                  :class="{ active: buttonActive['1m'] }">
                  1m
                </button>
                <button @click="(buttonTimeChart = '3m'), setActiveButton('3m')" class="button-time"
                  :class="{ active: buttonActive['3m'] }">
                  3m
                </button>
                <button @click="(buttonTimeChart = '6m'), setActiveButton('6m')" class="button-time"
                  :class="{ active: buttonActive['6m'] }">
                  6m
                </button>
                <button @click="(buttonTimeChart = 'all'), setActiveButton('all')" class="button-time"
                  :class="{ active: buttonActive['all'] }">
                  all
                </button>
              </div>
            </div>
            <div>
              <graphique-chart-portfolio :historicalPrice="historicalPrice" :buttonTimeChart="buttonTimeChart" />
            </div>
          </div>
          <div class="analytics-card-inner-monthly-revenue">
            <h5 style="text-align:start;">Monthly Revenue</h5>
            <div class="flex-performance">
              <p>Month</p> <!-- PORTFOLIO PRICE -->            
              <p>Performance</p> <!-- PORTFOLIO PRICE -->            
              <p>Profits</p> <!-- PORTFOLIO PRICE -->            
            </div>
            <div style="font-size:0.7em;" class="flex-performance"  v-for="result in user.monthly_revenue">
              <p>{{result['month']}} {{result['year']}}</p>
              <p v-if="result['purcentage']">{{result['purcentage'].toFixed(3)}}%</p>
              <p v-if="result['performance']">${{(result['performance'] / 10 ** 6).toFixed(2)}}</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { metamaskInformations } from "@/stores/metamask-info";
import { useCryptoStore } from '@/stores/crypto'

definePageMeta({
    title: 'Ledgity - Portfolio',
})

const user = metamaskInformations();
const crypto = useCryptoStore();

const monthlyRevenue = ref({
  month: {},
  performance: {},
  profits: {},
})

const historicalPrice = ref(null);

const buttonActive = ref({
  "1d": false,
  "1w": false,
  "1m": true,
  "3m": false,
  "6m": false,
  "all": false,
});

const buttonTimeChart = ref("1m");

const setActiveButton = async (time: string) => {
  for (const key in buttonActive.value) {
    buttonActive.value[key] = false;
  }
  buttonActive.value[time] = true;
};

</script>

<style scoped>
.connect-end {
  display: flex;
  justify-content: flex-end;
}

.analytics-card-up {
  display: flex;
  justify-content: space-between;
  margin-left: 1%;
}

.analytics-card-down {
  display: flex;
  justify-content: space-between;
}

.analytics-card-inner {
  display: flex;
  flex-direction: column;
  flex: auto;
  background-color: #f5f6f8;
  margin: 1% 1%;
  padding: 15px;
  border-radius: 5px;
}

.analytics-card-chart {
  display: flex;
  flex-direction: column;
  flex: 2;
  background-color: #f5f6f8;
  margin: 2%;
  padding: 15px;
  border-radius: 5px;
}

.analytics-card-inner-monthly-revenue {
  display: flex;
  flex-direction: column;
  flex: 2;
  background-color: #f5f6f8;
  margin: 2%;
  padding: 1.5%;
  border-radius: 5px;
}

.analytics-card-inside {
  display: flex;
  justify-content: flex-start;
}

.analytics-top-card {
  display: flex;
  flex-direction: row;
}

.info-chart {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.chart-time {
  display: flex;
  flex-wrap: wrap;
  flex: auto;
  justify-content: flex-end;
  align-items: center;
}

.button-time {
  margin: 0px 5px;
  padding: 0 5px;
  border: none;
  background-color: #f5f6f8;
  color: #55546d;
}

h4 {
  margin: 0;
}

p,
h5 {
  color: #55546d;
  margin: 0;
}

h5 {
  color: #55546d;
  margin: 0;
}

.statsNumber {
  margin-top: 8px;
  font-weight: 500;
}


.active {
  background-color: #3e54fa;
  border-radius: 4px;
  color: white;
}

.flex-performance {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 2%;
}
</style>