<template>
  <div v-if="crypto.loading_menu === false">
    <div v-if="chartData1d">
      <graphique-lineChart v-if="buttonTimeChart === '1d' && chartData1d" :chartData="chartData1d" />
      <graphique-lineChart v-if="buttonTimeChart === '1w'" :chartData="chartData1w" />
      <graphique-lineChart v-if="buttonTimeChart === '1m'" :chartData="chartData1m" />
      <graphique-lineChart v-if="buttonTimeChart === '3m'" :chartData="chartData3m" />
      <graphique-lineChart v-if="buttonTimeChart === '6m'" :chartData="chartData6m" />
      <graphique-lineChart v-if="buttonTimeChart === 'all'" :chartData="chartDataAll" />
    </div>
    <div v-else>
      <graphique-lineChart v-if="buttonTimeChart === '1d'" />
      <graphique-lineChart v-if="buttonTimeChart === '1w'" />
      <graphique-lineChart v-if="buttonTimeChart === '1m'" />
      <graphique-lineChart v-if="buttonTimeChart === '3m'" />
      <graphique-lineChart v-if="buttonTimeChart === '6m'" />
      <graphique-lineChart v-if="buttonTimeChart === 'all'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { metamaskInformations } from "@/stores/metamask-info";
import { useCryptoStore } from '@/stores/crypto'
const crypto = useCryptoStore();

const props = defineProps({
  buttonTimeChart: {
    type: String,
    default: "1m",
  },
  historicalPrice: {
    type: Object,
    default: ""
  }
});

const user = metamaskInformations();


let chartData1d: any;
let chartData1w: any;
let chartData1m: any;
let chartData3m: any;
let chartData6m: any;
let chartDataAll: any;

if (user.stats) {

  chartData1d = ref({
    labels: user.stats.day.timestamp,
    datasets: [
      {
        label: "Price of Ledgity Token",
        backgroundColor: ["#3E54FA"],
        borderColor: "#3E54FA",
        borderWidth: 2,
        hoverBorderWidth: 3,
        stepped: true,
        data: user.stats.day.price,
      },
    ],
  });

  chartData1w = ref({
    labels: user.stats.week.timestamp,
    datasets: [
      {
        label: "Price of Ledgity Token",
        backgroundColor: ["#3E54FA"],
        borderColor: "#3E54FA",
        borderWidth: 2,
        hoverBorderWidth: 3,
        radius: 1.2,
        stepped: true,
        data: user.stats.week.price,
      },
    ],
  });

  chartData1m = ref({
    labels: user.stats._month.timestamp,
    datasets: [
      {
        label: "Price of Ledgity Token",
        backgroundColor: ["#3E54FA"],
        borderColor: "#3E54FA",
        borderWidth: 1.5,
        hoverBorderWidth: 4,
        radius: 1,
        stepped: true,
        data: user.stats._month.price,
      },
    ],
  });

  chartData3m = ref({
    labels: user.stats._3months.timestamp,
    datasets: [
      {
        label: "Price of Ledgity Token",
        backgroundColor: ["#3E54FA"],
        borderColor: "#3E54FA",
        borderWidth: 2,
        hoverBorderWidth: 4,
        radius: 1,
        stepped: true,
        data: user.stats._3months.price,
      },
    ],
  });

  chartData6m = ref({
    labels: user.stats._6months.timestamp,
    datasets: [
      {
        label: "Price of Ledgity Token",
        backgroundColor: ["#3E54FA"],
        borderColor: "#3E54FA",
        borderWidth: 1.5,
        hoverBorderWidth: 4,
        radius: 1.5,
        stepped: true,
        data: user.stats._6months.price,
      },
    ],
  });

  chartDataAll = ref({
    labels: user.stats.all.timestamp,
    datasets: [
      {
        label: "Price of Ledgity Token",
        backgroundColor: ["#3E54FA"],
        borderColor: "#3E54FA",
        borderWidth: 2.2,
        hoverBorderWidth: 4,
        radius: 1,
        stepped: true,
        data: user.stats.all.price,
      },
    ],
  });
}

</script>
