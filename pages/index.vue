<template>
  <div>
    <analytics-page />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Ledgity - Analytics',
})
</script>

<style scoped>
.connect-end {
  display: flex;
  justify-content: flex-end;
}

.analytics-card-down {
  display: flex;
  justify-content: space-between;
}

.analytics-card-inner-camembert {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2;
  background-color: #f5f6f8;
  margin: 2%;
  padding: 1.5%;
  border-radius: 5px;
}
</style>
