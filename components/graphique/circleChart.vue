<template>
  <div>
    <graphique-doughnutChart :chartData="dataCircle" />
  </div>
</template>

<script setup lang="ts">
const purcentage = ref({
  fUSDC: 1.5,
  aBTC: 6.854,
  aUSDC: 37.697,
  aAlt: 53.948,
});

const dataCircle = ref({
  labels: [
    `Cefi - Arbitrage - Altcoin`,
    `Cefi - Arbitrage - USDC`,
    `Cefi - Arbitrage - BTC`,
    `Fund Wallet - USDC`,
  ],
  datasets: [
    {
      cutout: 80,
      backgroundColor: ["#3E54FA", "#00CE99", "#E43B7C", "#26619c"],
      hoverOffset: 2,
      borderJoinStyle: 'miter',
      data: [
        purcentage.value["aAlt"],
        purcentage.value["aUSDC"],
        purcentage.value["aBTC"],
        purcentage.value["fUSDC"],
      ],
    },
  ],
});
</script>
