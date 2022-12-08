<template>
  <div class="analytics-card-up">


    <div v-if="performanceAllTime" class="analytics-card-inner">
      <p class="analytics-card-inside">Performance</p>
      <h4 class="analytics-card-inside statsNumber">{{ performanceAllTime.toFixed(2) }}%</h4>
    </div>
    <div v-if="!performanceAllTime" class="analytics-card-inner-loading">
      <div class="loading-data">
        <p class="analytics-card-inside"></p>
        <h4 class="analytics-card-inside statsNumber"></h4>
      </div>
    </div>


    <div v-if="crypto.ledgityTokenPrice" class="analytics-card-inner">
      <p class="analytics-card-inside">Token Price</p>
      <h4 class="analytics-card-inside statsNumber">
        ${{ crypto.ledgityTokenPrice.toFixed(2) }}</h4>
    </div>
    <div v-else class="analytics-card-inner-loading">
      <div class="loading-data">
        <p class="analytics-card-inside">Token Price</p>
        <h4 class="analytics-card-inside statsNumber"></h4>
      </div>
    </div>


    <div v-if="totalValueLocked" class="analytics-card-inner">
      <p class="analytics-card-inside">TVL</p>
      <h4 class="analytics-card-inside statsNumber">
        ${{ totalValueLocked.toLocaleString('en-US', { maximumFractionDigits: 2 }) }}
      </h4>
    </div>

    <div v-else class="analytics-card-inner-loading">
      <p class="analytics-card-inside">TVL</p>
      <h4 class="analytics-card-inside statsNumber"></h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCryptoStore } from '@/stores/crypto'

defineProps({
  performanceAllTime: {
    type: Number,
    default: 0,
  },
});

const crypto = useCryptoStore();

const requestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
};

const { data: priceCapsa } = await useFetch(
  "https://api.capsa.finance/stats/price",
  requestOptions
);

const { data: _totalSupply } = await useFetch(
  "https://api.capsa.finance//stats/supply-plain",
  requestOptions
);

const totalValueLocked = ref(_totalSupply.value * priceCapsa.value.price)

</script>

<style scoped>
.analytics-card-up {
  display: flex;
  justify-content: space-between;
  margin-left: 1%;
}

.analytics-card-inner {
  display: flex;
  flex-direction: column;
  flex: auto;
  background-color: #f5f6f8;
  margin: 1% 1%;
  padding: 15px;
  border-radius: 5px;
  overflow: hidden;
}

.analytics-card-inside {
  display: flex;
  justify-content: flex-start;
}

p {
  margin: 0;
}

h4 {
  margin: 0;
}

.statsNumber {
  margin-top: 8px;
  font-weight: 500;
}

.analytics-card-inner-loading {
  display: flex;
  flex-direction: column;
  flex: auto;
  background-color: #f5f6f8;
  margin: 1% 1%;
  border-radius: 5px;
  overflow: hidden;
}

.loading-data {
  background-color: #f5f6f8;
  height: 86.15px;
  height: -webkit-fill-available;
}

.loading-data::before {
  content: "";
  display: block;
  position: relative;
  background-color: #fdfdfd;
  height: 100%;
  width: 150px;
  left: -50px;
  transform: skew(20deg);
  animation: load 1s linear infinite;
}

@keyframes load {
  to {
    transform: translateX(450px) skew(20deg);
  }
}
</style>