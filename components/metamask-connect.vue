<template>
  <div>
    <div v-if="!user.loadingButtonConnect">
      <div v-if="user.isMetamaskSupported === true">
        <div class="py-2 px-3" v-if="user.networkMetamask === true">
          <div class="button-menu" v-if="user.isLoggedIn === false" @click="connectWallet()">
            <div class="connexion-button">
              <icons-metamask-icon />
              <button class="connexion-button-inner">connect wallet</button>
            </div>
          </div>
          <h6 v-if="user.ready === false">{{ user.errorMessage }}</h6>
          <!-- A AJOUTER PLUS TARD QUAND LE MODAL SERA FAIT -->
          <!-- <button @click="user.modalWallet = !user.modalWallet" v-if="user.isLoggedIn === true" class="connected">
          my wallet
        </button> -->
        </div>
        <div v-else class="button-menu py-2 px-3">
          <p @click="crypto.changeNetwork" class="connexion-button mb-0">You are on the wrong network</p>
        </div>
      </div>
      <button v-if="user.isMetamaskSupported === false" class="connected" style="color: crimson;">
        You need to install Metamask
      </button>
    </div>
    <!-- SHIMMER START -->
    <div v-else class="button-menu py-2 px-3">
      <div class="loading-data">
      </div>
    </div>
    <!-- SHIMMER END -->
  </div>
</template>

<script setup lang="ts">
import { metamaskInformations } from "@/stores/metamask-info";
import { useCryptoStore } from '@/stores/crypto'

const user = metamaskInformations();
const crypto = useCryptoStore();

const { ready, start } = useTimeout(2500, { controls: true });

watch(ready, (currentValue) => {
  user.ready = currentValue
});

const connectWallet = async () => { // when the user try to connect
  await (window as any).ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(async () => { // if the user connect
      user.isLoggedIn = true;

      await (window as any).ethereum.request({ method: 'eth_accounts' })
        .then(async (response: any) => {
          user.address = response[0];
          await crypto.balanceTokenLedgity(user.address);
          await crypto.checkAllowance(user.address);
        })
        .catch((err: any) => {
          console.log("ERROR :", err);
        });
    })
    .catch(() => { // if the user cancel the connexion
      user.errorMessage = "You have cancelled your connexion."
      start();
    });
};
</script>

<style scoped>
h6 {
  margin: 0;
}

.button-menu {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 10px;
}

.connexion-button {
  display: flex;
  align-items: center;
  color: #272727;
  padding: 5px;
  background-color: #e4e6e9;
  border-radius: 10px;
  cursor: pointer;
}

.connexion-button-inner {
  border: none;
  background-color: #e4e6e9;
}

.connected {
  color: #272727;
  border: none;
  padding: 0.3% 2%;
  background-color: #fff;
}

.connexion-button:hover {
  opacity: 0.8;
}

.loading-data {
  background-color: #f5f6f8;
  height: 35px;
  width: 156.28px;
  border-radius: 10px;
}

.loading-data::before {
  content: "";
  display: block;
  position: relative;
  background-color: #fdfdfd;
  height: 35px;
  width: 50px;
  left: -50px;
  transform: skew(20deg);
  animation: load 2s linear infinite;
}

@keyframes load {
  to {
    transform: translateX(400px) skew(20deg);
  }
}
</style>
