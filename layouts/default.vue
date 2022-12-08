<template>
    <div>
        <div v-if="width < 800" class="position-absolute text-center top-50 start-50 translate-middle">
            <div class="display-flex row">
                <svg width="40" height="40" viewBox="0 0 659 1156" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M439.448 128.141V641.73L219.997 770.158V256.569L439.448 128.141Z" fill="#73DAFB" />
                    <path d="M439.439 128.224L219.987 0.0625L0.62207 128.357L219.987 256.652L439.439 128.224Z"
                        fill="#53D0F9" />
                    <path
                        d="M0.62207 128.141V823.99C0.62207 870.115 25.0916 912.778 64.9056 936.066L439.468 1155.19L658.776 1026.76V770.026L439.303 898.327L219.988 770.026V256.438L0.62207 128.141Z"
                        fill="url(#paint0_linear_1466_70719)" />
                    <path d="M658.786 770.311L439.448 641.883L219.997 770.311L439.311 898.61L658.786 770.311Z"
                        fill="#75A2FC" />
                    <defs>
                        <linearGradient id="paint0_linear_1466_70719" x1="16.3069" y1="-70.2959" x2="-20.5736"
                            y2="936.851" gradientUnits="userSpaceOnUse">
                            <stop offset="0.300905" stop-color="#3EDBFA" />
                            <stop offset="1" stop-color="#7EB5FF" />
                        </linearGradient>
                    </defs>
                </svg>
                <h1 class="grow-3 mt-3">
                    Mobile is not supported
                </h1>
            </div>
        </div>
        <div v-else>
            <div v-if="crypto.loading">
                <loader />
            </div>
            <div class="shape-website">
                <navigation-navbar v-metamask />
                <div class="body">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCryptoStore } from '@/stores/crypto'
import { useWindowSize } from '@vueuse/core'

const crypto = useCryptoStore();

const { width } = useWindowSize()

</script>

<style scoped>
.shape-website {
    display: flex;
    flex-direction: row;
}

.body {
    margin-left: 10%;
    flex: auto;
    text-align: center;
    align-items: center;
    justify-items: center;
}

@media screen and (min-width: 2000px) {
    .body {
        margin-left: 150px;
    }
}

@media screen and (max-width: 1400px) {
    .body {
        margin-left: 12%;
    }
}

@media screen and (max-width: 1200px) {
    .body {
        margin-left: 15%;
    }
}

@media screen and (max-width: 900px) {
    .body {
        margin-left: 20%;
    }
}

@media screen and (max-width: 700px) {
    .body {
        margin-left: 30%;
    }
}

@media screen and (max-width: 500px) {
    .body {
        margin-left: 40%;
    }
}
</style>