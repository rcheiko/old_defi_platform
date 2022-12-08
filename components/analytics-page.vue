<template>
    <div>
        <div>
            <div class="connect-end">
                <metamask-connect style="flex: auto; text-align: end" />
            </div>
            <header>
                <analytics-page-top-stats :performanceAllTime="performanceAllTime" />
                <div class="analytics-card-down">
                    <div class="analytics-card-inner-camembert">
                        <graphique-circleChart />
                    </div>
                    <analytics-page-chart-stats v-model:performanceAllTime="performanceAllTime" />
                </div>
            </header>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { Ref } from 'vue'

const performanceAllTime: Ref<number> = ref();
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
  