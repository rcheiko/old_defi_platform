<template>
  <div>
    <div class="body">
      <analytics-page style="filter:blur(10px);" />      
      <header style="z-index:999;">
        <div class="center-menu">
          <div class="swap-menu">
            <div v-if="!displaySwap" class="menu-inner-all">
              <div class="swap-icon" @click="displaySwap = !displaySwap">
                  <icons-swap-icon />
              </div>
              <p class="token_msg">Buy LTY</p>
              <div class="swap-menu">
                <div class="menu-input-top">
                <div class="menu-inner-left">
                  <p class="up-input">From</p>
                  <input placeholder="0,0" id="usdc" v-model="usdc_swap" type="number" step="any">              
                </div>
                <div @click="crypto.addUsdcTokenOnMetamask" class="menu-inner-right">
                  <icons-usdc-icon class="d-flex align-items-center" />
                  <label for="usdc">USDC</label>                
                </div>           
              </div>
              <div class="menu-input-bottom">
                <div class="menu-inner-left">
                  <p class="up-input">To</p>
                  <input placeholder="0,0" id="ldg" v-model="ledgity_swap" type="number" step="any">                
                </div>
                <div @click="crypto.addLDGTokenOnMetamask" class="menu-inner-right">
                  <icons-lty-token-icon class="d-flex align-items-center" />
                  <label for="ldg">$LTY</label>
                </div>
              </div>
              </div>
              <div v-if="!user.loadingButtonConnect" class="convert-token">
                <p>1 LTY = {{crypto.ledgityTokenPrice.toFixed(4)}} USDC</p>
              </div>
              <div class="button" v-if="user.isLoggedIn">
                <button v-if="crypto.usdcBalance < usdc_swap * (10 ** 6)" :disabled="crypto.usdcBalance < usdc_swap * (10 ** 6)">Deposit not enought found
                </button>
                <button
                  v-else-if="crypto.usdcTokenAllowance === 0 && (usdc_swap === 0 || usdc_swap === undefined)" :disabled="crypto.usdcTokenAllowance === 0 && (usdc_swap === 0 || usdc_swap === undefined)">Approve</button>
                <button @click="approvalUSDC"
                  v-else-if="crypto.usdcTokenAllowance < (usdc_swap * 10 ** 6)">Approve</button>
                <button
                  v-else-if="crypto.usdcTokenAllowance > 0 && (usdc_swap === 0 || usdc_swap === undefined)" :disabled="crypto.usdcTokenAllowance > 0 && (usdc_swap === 0 || usdc_swap === undefined || typeof(usdc_swap) === 'string')">Deposit</button>
                <button @click="depositUSDC"
                  v-else-if="crypto.usdcTokenAllowance >= (usdc_swap * 10 ** 6) && usdc_swap != 0">Deposit</button>
              </div>
              <div class="button" v-else>
                <button v-if="!user.isMetamaskSupported && !user.loadingButtonConnect" @click="connectWallet">Install Metamask Wallet</button>
                <button v-else-if="!user.isLoggedIn && !user.loadingButtonConnect" @click="connectWallet">Connect Wallet</button>              
              </div>
            </div>
            <div v-if="displaySwap" class="menu-inner-all">
              <div class="swap-icon" @click="displaySwap = !displaySwap">
                  <icons-swap-icon />
              </div>
              <p class="token_msg">Sell LTY</p>
              <div class="swap-menu">
                <div class="menu-input-top">
                <div class="menu-inner-left">
                  <p class="up-input">From</p>
                  <input placeholder="0,0" id="ldg" v-model="ledgity_swap" type="number" step="any">                
                </div>
                <div @click="crypto.addLDGTokenOnMetamask" class="menu-inner-right">
                    <icons-lty-token-icon class="d-flex align-items-center" />
                    <label for="ldg">$LTY</label>
                </div>
              </div>
                <div class="menu-input-bottom">
                  <div class="menu-inner-left">
                    <p class="up-input">To</p>
                    <input placeholder="0,0" id="usdc" v-model="usdc_swap" type="number" step="any">              
                  </div>   
                  <div @click="crypto.addUsdcTokenOnMetamask" class="menu-inner-right">
                    <icons-usdc-icon class="d-flex align-items-center" />
                    <label for="usdc">USDC</label>                
                  </div>           
                </div>
              </div>
              <div v-if="!user.loadingButtonConnect" class="convert-token ">
                <p>1 USDC = {{(1 / crypto.ledgityTokenPrice).toFixed(4)}} LTY</p>
              </div>
              <div class="button" v-if="user.isLoggedIn">
                <button v-if="crypto.ledgityBalance < ledgity_swap * (10 ** 6)" :disabled="crypto.ledgityBalance < ledgity_swap * (10 ** 6)">Withdraw not enought found
                </button>
                <button
                  v-else-if="crypto.ledgityTokenAllowance === 0 && (ledgity_swap === 0 || ledgity_swap === undefined)" :disabled="crypto.ledgityTokenAllowance === 0 && (ledgity_swap === 0 || ledgity_swap === undefined)">Approve</button>
                <button @click="approvalLEDGITY"
                  v-else-if="crypto.ledgityTokenAllowance < (ledgity_swap * 10 ** 6)">Approve</button>
                <button v-else-if="crypto.ledgityTokenAllowance > 0 && (ledgity_swap === 0 || ledgity_swap === undefined)" :disabled="crypto.ledgityTokenAllowance > 0 && (ledgity_swap === 0 || ledgity_swap === undefined)">Withdraw</button>
                <button @click="withdrawLEDGITY"
                  v-else-if="crypto.ledgityTokenAllowance >= (ledgity_swap * 10 ** 6) && ledgity_swap != 0">Withdraw</button>
              </div>
              <div class="button" v-else>
                <button v-if="!user.isMetamaskSupported && !user.loadingButtonConnect" @click="connectWallet">Install Metamask Wallet</button>
                <button v-else-if="!user.isLoggedIn && !user.loadingButtonConnect" @click="connectWallet">Connect Wallet</button>
              </div>
            </div>
          </div>
        </div>
        <button @click="mintUSD">MINT USDC ( TEMP )</button>
      </header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { metamaskInformations } from "@/stores/metamask-info";
import { useCryptoStore } from '@/stores/crypto'

definePageMeta({
    title: 'Ledgity - Swap',
})

const user = metamaskInformations();
const crypto = useCryptoStore();

const displaySwap = ref(false);

const usdc_swap = ref();
const ledgity_swap = ref();

watch(usdc_swap, (currentValue) => {
  if (usdc_swap.value < 0 || usdc_swap.value === "") // when we delete the zero in the input it put a null string
    usdc_swap.value = 0;
  ledgity_swap.value = crypto.ledgityTokenPrice * currentValue;
});

watch(ledgity_swap, (currentValue) => {
  if (ledgity_swap.value < 0 || ledgity_swap.value === "") // when we delete the zero in the input it put a null string
    ledgity_swap.value = 0;
  usdc_swap.value = currentValue / crypto.ledgityTokenPrice;
});

const { ready, start } = useTimeout(2500, { controls: true });

watch(ready, (currentValue, oldValue) => {
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

const approvalUSDC = async () => { // when the user approve the amount he want to DEPOSIT
  await crypto.approveUsdc(user.address, usdc_swap.value);
}

const approvalLEDGITY = async () => { // when the user approve the amount he want to WITHDRAW
  await crypto.approveLedgity(user.address, ledgity_swap.value);
}

const depositUSDC = async () => { // when the user deopsit USDC
  await crypto.depositUSDC(user.address, usdc_swap.value);
}

const withdrawLEDGITY = async () => { // when the user deopsit USDC
  await crypto.withdrawLEDGITY(user.address, ledgity_swap.value);
}

const mintUSD = async () => { // mint USD ( DELETE AT THE END )
  await crypto.mintUSDC(user.address, 100);
}
</script>

<style scoped>
p {
  margin: 0;
 }
 .body {
  position: fixed;
  width: 90%;
 }
 header {
  position:absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  height: 100vh;
  width:100vw;
 }
.center-menu {
  position: fixed;
  top: 50%; left: 60%;
  transform: translate(-50%, -50%);
}

.connect-end {
  display: flex;
  justify-content: flex-end;
}

.menu-inner-all {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 370px;
  background-color: #FFFFFF;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  flex-direction: column;
}

.menu-input-top {
  display: flex;
  width: 100%;
  padding: 2% 5% 0 5%;
  margin: 2% 0;
  border-radius: 5px;
  justify-content: space-between;
  align-items: center;
  background-color: #00000005;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.menu-input-bottom {
  display: flex;
  width: 100%;
  padding: 0 5% 2% 5%;
  border-radius: 5px;
  justify-content: space-between;
  align-items: center;
  background-color: #00000005;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.menu-inner-left {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}

.menu-inner-right {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color :#00000008;
  padding: 4% 4%;
  border-radius: 5px;
  margin: 15px;
  cursor: pointer;
}

input {
  background-color: #FAFAFA;
  border:none;
  outline:none;
  color: #8C8A9A;
  font-size: 1.1em;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* MOZILLA */
input[type=number] {
  -moz-appearance: textfield;
}

label {
  margin-left: 3px;
  flex: 3;
}
.up-input {
  color: #8C8A9A;
  font-size: 12px;
}
.token_msg {
  display: flex;
  width: 75%;
  align-items: flex-start;
}
.button {
  display: flex;
  justify-content: center;
  width: 100%;
}
button {
  border:none;
  border-radius: 5px;
  background-color: #00000005;
  margin: 20px 10% 0 10%;
  width: 100%;
  padding: 10px;
}
button:hover {
  opacity: 0.7;
}
.convert-token {
  display: flex;
  justify-content: flex-end;
  width: 75%;
  font-size: 0.8em;
  margin: 5px 0;
}

.swap-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  width: 75%;
}
.swap-icon {
  position: relative;
  cursor: pointer;
  top: 28.5%;
  height:0%;
}
</style>