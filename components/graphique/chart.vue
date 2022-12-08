<template>
  <div>
    <graphique-lineChart v-if="buttonTimeChart === '1d'" :chartData="chartData1d" />
    <graphique-lineChart v-if="buttonTimeChart === '1w'" :chartData="chartData1w" />
    <graphique-lineChart v-if="buttonTimeChart === '1m'" :chartData="chartData1m" />
    <graphique-lineChart v-if="buttonTimeChart === '3m'" :chartData="chartData3m" />
    <graphique-lineChart v-if="buttonTimeChart === '6m'" :chartData="chartData6m" />
    <graphique-lineChart v-if="buttonTimeChart === 'all'" :chartData="chartDataAll" />
  </div>
</template>

<script setup lang="ts">
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

const chartData1d = ref({
  labels: props.historicalPrice.day.timestamp,
  datasets: [
    {
      label: "Price of Ledgity Token",
      backgroundColor: ["#3E54FA"],
      borderColor: "#3E54FA",
      borderWidth: 2,
      hoverBorderWidth: 3,
      data: props.historicalPrice.day.price,
    },
  ],
});

const chartData1w = ref({
  labels: props.historicalPrice.week.timestamp,
  datasets: [
    {
      label: "Price of Ledgity Token",
      backgroundColor: ["#3E54FA"],
      borderColor: "#3E54FA",
      borderWidth: 2,
      hoverBorderWidth: 3,
      radius: 1.2,
      data: props.historicalPrice.week.price,
    },
  ],
});

const chartData1m = ref({
  labels: props.historicalPrice._month.timestamp,
  datasets: [
    {
      label: "Price of Ledgity Token",
      backgroundColor: ["#3E54FA"],
      borderColor: "#3E54FA",
      borderWidth: 1.5,
      hoverBorderWidth: 4,
      radius: 1,
      // stepped: true, // FOR PORTFOLIO
      data: props.historicalPrice._month.price,
    },
  ],
});

const chartData3m = ref({
  labels: props.historicalPrice._3months.timestamp,
  datasets: [
    {
      label: "Price of Ledgity Token",
      backgroundColor: ["#3E54FA"],
      borderColor: "#3E54FA",
      borderWidth: 2,
      hoverBorderWidth: 4,
      radius: 1,
      // stepped: true, // FOR PORTFOLIO
      data: props.historicalPrice._3months.price,
    },
  ],
});

const chartData6m = ref({
  labels: props.historicalPrice._6months.timestamp,
  datasets: [
    {
      label: "Price of Ledgity Token",
      backgroundColor: ["#3E54FA"],
      borderColor: "#3E54FA",
      borderWidth: 1.5,
      hoverBorderWidth: 4,
      radius: 1.5,
      // stepped: true, // FOR PORTFOLIO
      data: props.historicalPrice._6months.price,
    },
  ],
});

const chartDataAll = ref({
  labels: props.historicalPrice.all.timestamp,
  datasets: [
    {
      label: "Price of Ledgity Token",
      backgroundColor: ["#3E54FA"],
      borderColor: "#3E54FA",
      borderWidth: 2.2,
      hoverBorderWidth: 4,
      radius: 1,
      // stepped: true, // FOR PORTFOLIO
      data: props.historicalPrice.all.price,
    },
  ],
});
</script>
