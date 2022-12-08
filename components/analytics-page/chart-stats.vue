<template>
    <div class="analytics-card-chart">
        <div class="analytics-top-card">
            <div class="info-chart">
                <h5>Ledgity</h5>
                <p v-if="crypto.ledgityTokenPrice">${{ crypto.ledgityTokenPrice.toFixed(2) }}</p>
                <div v-else class="loading-data">
                    <p style="opacity: 0;">$ NaN</p>                
                </div>
                <div class="stats-past-months">

                    <!-- perf purcentage + or - for 1 day START -->
                    <div v-if="perfPurcentage.day.purcentage >= 0 && buttonActive['1d']">
                        +${{ perfPurcentage.day.price.toFixed(4) }}
                        <svg width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.32361 0.660156L4.50464 4.43781H0.142582L2.32361 0.660156Z" fill="#00CE99" />
                        </svg>
                        <span v-if="buttonActive['1d']">
                            <span style="color: #00ce99"> {{ perfPurcentage.day.purcentage.toFixed(3) }}%</span> Past
                            day</span>
                    </div>
                    <div v-else-if="perfPurcentage.day.purcentage < 0 && buttonActive['1d']">
                        -${{ -perfPurcentage.day.price.toFixed(4) }}
                        <svg width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.32361 0.660156L4.50464 4.43781H0.142582L2.32361 0.660156Z" fill="#ed8d72" />
                        </svg>
                        <span v-if="buttonActive['1d']">
                            <span style="color: #ed8d72">
                                {{ perfPurcentage.day.purcentage.toFixed(3) }}%
                            </span>
                            Past day
                        </span>
                    </div>
                    <!-- perf purcentage + or - for 1 day END -->

                    <!-- perf purcentage + or - for 1 week START -->
                    <div v-if="perfPurcentage.week.purcentage >= 0 && buttonActive['1w']">
                        +${{ perfPurcentage.week.price.toFixed(4) }}
                        <svg width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.32361 0.660156L4.50464 4.43781H0.142582L2.32361 0.660156Z" fill="#00CE99" />
                        </svg>
                        <span v-if="buttonActive['1w']"><span style="color: #00ce99">
                                {{ perfPurcentage.week.purcentage.toFixed(3) }}%</span> Past week</span>
                    </div>
                    <div v-else-if="perfPurcentage.week.purcentage < 0 && buttonActive['1w']">
                        -${{ -perfPurcentage.week.price.toFixed(4) }}
                        <svg width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.32361 0.660156L4.50464 4.43781H0.142582L2.32361 0.660156Z" fill="#ed8d72" />
                        </svg>
                        <span v-if="buttonActive['1w']"><span style="color: #ed8d72">
                                {{ perfPurcentage.week.purcentage.toFixed(3) }}%</span> Past week</span>
                    </div>
                    <!-- perf purcentage + or - for 1 weeks END -->

                    <!-- perf purcentage + or - for 1 month START  -->
                    <div v-if="perfPurcentage._month.purcentage >= 0 && buttonActive['1m']">
                        +${{ perfPurcentage._month.price.toFixed(4) }}
                        <svg width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.32361 0.660156L4.50464 4.43781H0.142582L2.32361 0.660156Z" fill="#00CE99" />
                        </svg>
                        <span v-if="buttonActive['1m']"><span style="color: #00ce99">
                                {{ perfPurcentage._month.purcentage.toFixed(3) }}%</span> Past month</span>
                    </div>
                    <div v-else-if="perfPurcentage._month.purcentage < 0 && buttonActive['1m']">
                        -${{ -perfPurcentage._month.price.toFixed(4) }}
                        <svg width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.32361 0.660156L4.50464 4.43781H0.142582L2.32361 0.660156Z" fill="#ed8d72" />
                        </svg>
                        <span v-if="buttonActive['1m']"><span style="color: #ed8d72">
                                {{ perfPurcentage._month.purcentage.toFixed(3) }}%</span> Past month</span>
                    </div>
                    <!-- perf purcentage + or - for 1 month END -->

                    <!-- perf purcentage + or - for 3 months START -->
                    <div v-if="perfPurcentage._3months.purcentage >= 0 && buttonActive['3m']">
                        +${{ perfPurcentage._3months.price.toFixed(4) }}
                        <svg width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.32361 0.660156L4.50464 4.43781H0.142582L2.32361 0.660156Z" fill="#00CE99" />
                        </svg>
                        <span v-if="buttonActive['3m']"><span style="color: #00ce99">
                                {{ perfPurcentage._3months.purcentage.toFixed(3) }}%</span> Past 3 months</span>
                    </div>
                    <div v-else-if="perfPurcentage._3months.purcentage < 0 && buttonActive['3m']">
                        -${{ -perfPurcentage._3months.price.toFixed(4) }}
                        <svg width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.32361 0.660156L4.50464 4.43781H0.142582L2.32361 0.660156Z" fill="#ed8d72" />
                        </svg>
                        <span v-if="buttonActive['3m']"><span style="color: #ed8d72">
                                {{ perfPurcentage._3months.purcentage.toFixed(3) }}%</span> Past 3 months</span>
                    </div>
                    <!-- perf purcentage + or - for 3 months END -->

                    <!-- perf purcentage + or - for 6 months START -->
                    <div v-if="perfPurcentage._6months.purcentage >= 0 && buttonActive['6m']">
                        +${{ perfPurcentage._6months.price.toFixed(4) }}
                        <svg width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.32361 0.660156L4.50464 4.43781H0.142582L2.32361 0.660156Z" fill="#00CE99" />
                        </svg>
                        <span v-if="buttonActive['6m']"><span style="color: #00ce99">
                                {{ perfPurcentage._6months.purcentage.toFixed(3) }}%</span> Past 6 months</span>
                    </div>
                    <div v-else-if="perfPurcentage._6months.purcentage < 0 && buttonActive['6m']">
                        -${{ -perfPurcentage._6months.price.toFixed(4) }}
                        <svg width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.32361 0.660156L4.50464 4.43781H0.142582L2.32361 0.660156Z" fill="#ed8d72" />
                        </svg>
                        <span v-if="buttonActive['6m']"><span style="color: #ed8d72">
                                {{ perfPurcentage._6months.purcentage.toFixed(3) }}%</span> Past 6 months</span>
                    </div>
                    <!-- perf purcentage + or - for 6 months END -->

                    <!-- perf purcentage + or - for all time START -->
                    <div v-if="perfPurcentage.all.purcentage >= 0 && buttonActive['all']">
                        +${{ perfPurcentage.all.price.toFixed(4) }}
                        <svg width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.32361 0.660156L4.50464 4.43781H0.142582L2.32361 0.660156Z" fill="#00CE99" />
                        </svg>
                        <span v-if="buttonActive['all']"><span style="color: #00ce99">
                                {{ performanceAllTime.toFixed(2) }}%</span> All time</span>
                    </div>
                    <div v-else-if="perfPurcentage.all.purcentage < 0 && buttonActive['all']">
                        -${{ -perfPurcentage.all.price.toFixed(4) }}
                        <svg width="7" height="7" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.32361 0.660156L4.50464 4.43781H0.142582L2.32361 0.660156Z" fill="#ed8d72" />
                        </svg>
                        <span v-if="buttonActive['all']"><span style="color: #ed8d72">
                                {{ performanceAllTime.toFixed(2) }}%</span> All time</span>
                    </div>
                    <!-- perf purcentage + or - for all time END -->
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
            <graphique-chart :historicalPrice="historicalPrice" :buttonTimeChart="buttonTimeChart" />
            <div class="under-chart">
                <div>
                    <p>Projected APY</p>
                    <h5 v-if="projectedApy.projected_apy >= 0" style="color: #00ce99">
                        {{ projectedApy.projected_apy.toFixed(2) }}%
                    </h5>
                    <h5 v-else style="color: #ed8d72">
                        {{ projectedApy.projected_apy.toFixed(2) }}%
                    </h5>
                </div>
                <div>
                    <p>Past Week Yield</p>
                    <h5 v-if="projectedApy.last_week_performance >= 0" style="color: #00ce99">
                        {{ projectedApy.last_week_performance.toFixed(3) }}%
                    </h5>
                    <h5 v-else style="color: #ed8d72">
                        {{ projectedApy.last_week_performance.toFixed(3) }}%
                    </h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCryptoStore } from '@/stores/crypto'

const crypto = useCryptoStore();

defineProps({
    performanceAllTime: {
        type: Number,
        default: 0,
    },
});
const emit = defineEmits(['update:performanceAllTime']);

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

const requestOptions = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
};


const { data: projectedApy } = await useFetch(
    "https://api.capsa.finance//stats/projected-apy",
    requestOptions
);
const { data: _historicalPrice } = await useFetch(
    "https://api.capsa.finance//stats/historical-price",
    requestOptions
);
await emit('update:performanceAllTime', (_historicalPrice.value.price[_historicalPrice.value.price.length - 1] - _historicalPrice.value.price[0]) / _historicalPrice.value.price[0] * 100);

const historicalPrice = {
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
}

let timeFormat: any;
const today: any = new Date();
const oneDayAgo: any = today - 1000 * 60 * 60 * 24;
const oneWeekAgo: any = today - 1000 * 60 * 60 * 24 * 7;
const oneMonthAgo: any = today - 1000 * 60 * 60 * 24 * 30;
const threeMonthsAgo: any = today - 1000 * 60 * 60 * 24 * 30 * 3;
const sixMonthsAgo: any = today - 1000 * 60 * 60 * 24 * 30 * 6;

for (let i = 0; i <= _historicalPrice.value.price.length - 1; i++) {

    let hours = new Date(_historicalPrice.value.timestamp[i] * 1000).getHours();
    let day = new Date(_historicalPrice.value.timestamp[i] * 1000).getDay();

    if (_historicalPrice.value.timestamp[i] * 1000 >= oneDayAgo) { // history of price and timestamp for 1 days
        historicalPrice.day.price.push(_historicalPrice.value.price[i]);
        timeFormat = new Date(_historicalPrice.value.timestamp[i] * 1000).toISOString().slice(0, 19).replace('T', ' ');
        historicalPrice.day.timestamp.push(timeFormat);
    }
    if (_historicalPrice.value.timestamp[i] * 1000 >= oneWeekAgo) { // history of price and timestamp for 1 week
        historicalPrice.week.price.push(_historicalPrice.value.price[i]);
        timeFormat = new Date(_historicalPrice.value.timestamp[i] * 1000).toISOString().slice(0, 19).replace('T', ' ');
        historicalPrice.week.timestamp.push(timeFormat);
    }
    if (_historicalPrice.value.timestamp[i] * 1000 >= oneMonthAgo) { // history of price and timestamp for 1 month
        historicalPrice._month.price.push(_historicalPrice.value.price[i]);
        timeFormat = new Date(_historicalPrice.value.timestamp[i] * 1000).toISOString().slice(0, 19).replace('T', ' ');
        historicalPrice._month.timestamp.push(timeFormat);
    }
    if (_historicalPrice.value.timestamp[i] * 1000 >= threeMonthsAgo && hours % 3 == 0) { // history of price and timestamp for 3 months
        historicalPrice._3months.price.push(_historicalPrice.value.price[i]);
        timeFormat = new Date(_historicalPrice.value.timestamp[i] * 1000).toISOString().slice(0, 19).replace('T', ' ');
        historicalPrice._3months.timestamp.push(timeFormat);
    }
    if (_historicalPrice.value.timestamp[i] * 1000 >= sixMonthsAgo && hours % 6 == 0) { // history of price and timestamp for 6 months
        historicalPrice._6months.price.push(_historicalPrice.value.price[i]);
        timeFormat = new Date(_historicalPrice.value.timestamp[i] * 1000).toISOString().slice(0, 19).replace('T', ' ');
        historicalPrice._6months.timestamp.push(timeFormat);
    }
    if (hours === 0 && day % 3 == 0) {
        historicalPrice.all.price.push(_historicalPrice.value.price[i]);
        timeFormat = new Date(_historicalPrice.value.timestamp[i] * 1000).toISOString().slice(0, 19).replace('T', ' ');
        historicalPrice.all.timestamp.push(timeFormat);
    }
}

const perfPurcentage = ref({ // Perfomance In Purcentage and in $
    day: {
        purcentage: (historicalPrice.day.price[historicalPrice.day.price.length - 1] - historicalPrice.day.price[0]) / historicalPrice.day.price[0] * 100,
        price: historicalPrice.day.price[historicalPrice.day.price.length - 1] - historicalPrice.day.price[0]
    },
    week: {
        purcentage: (historicalPrice.week.price[historicalPrice.week.price.length - 1] - historicalPrice.week.price[0]) / historicalPrice.week.price[0] * 100,
        price: historicalPrice.week.price[historicalPrice.week.price.length - 1] - historicalPrice.week.price[0]
    },
    _month: {
        purcentage: (historicalPrice._month.price[historicalPrice._month.price.length - 1] - historicalPrice._month.price[0]) / historicalPrice._month.price[0] * 100,
        price: historicalPrice._month.price[historicalPrice._month.price.length - 1] - historicalPrice._month.price[0]
    },
    _3months: {
        purcentage: (historicalPrice._3months.price[historicalPrice._3months.price.length - 1] - historicalPrice._3months.price[0]) / historicalPrice._3months.price[0] * 100,
        price: historicalPrice._3months.price[historicalPrice._3months.price.length - 1] - historicalPrice._3months.price[0]
    },
    _6months: {
        purcentage: (historicalPrice._6months.price[historicalPrice._6months.price.length - 1] - historicalPrice._6months.price[0]) / historicalPrice._6months.price[0] * 100,
        price: historicalPrice._6months.price[historicalPrice._6months.price.length - 1] - historicalPrice._6months.price[0]
    },
    all: {
        purcentage: (historicalPrice.all.price[historicalPrice.all.price.length - 1] - historicalPrice.all.price[0]) / historicalPrice.all.price[0] * 100,
        price: historicalPrice.all.price[historicalPrice.all.price.length - 1] - historicalPrice.all.price[0]
    }
})
</script>

<style scoped>
.analytics-card-chart {
    display: flex;
    flex-direction: column;
    flex: 5;
    background-color: #f5f6f8;
    margin: 2%;
    padding: 15px;
    border-radius: 5px;
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

.stats-past-months {
    display: flex;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 0.8em;
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

.under-chart {
    display: flex;
    flex-direction: row;
    margin: 3% 15% 1% 15%;
    justify-content: space-around;
    align-items: center;
}

.active {
    background-color: #3e54fa;
    border-radius: 4px;
    color: white;
}

p,
h5 {
    color: #55546d;
    margin: 0;
}

.loading-data {
  background-color: #f5f6f8;
  height: -webkit-fill-available;
}

.loading-data::before {
  content: "";
  display: block;
  position: relative;
  background-color: #fdfdfd;
  height: 100%;
  width: 10px;
  transform: skew(20deg);
  animation: load 1s linear infinite;
}

@keyframes load {
  to {
    transform: translateX(50px) skew(20deg);
  }
}
</style>