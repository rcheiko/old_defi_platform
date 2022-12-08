<template>
    <div v-if="user.modalWallet">
        <div class="modal-background">
            <div class="modal" ref="modal">
                <button @click="user.modalWallet = false" class="close-btn">x</button>
                <p>
                    Click Outside this modal.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { metamaskInformations } from '@/stores/metamask-info'

const user = metamaskInformations();
const modal = ref(null);

onClickOutside(modal, () => ( user.modalWallet = false ))
</script>

<style scoped>
.modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}
.modal {
    position: relative;
    display: table;
    width:400px;
    height:200px;
    background-color: white;
    padding: 50px 100px;
    border-radius: 5px;
    box-shadow: 0 10px 5px 2px rgba(0, 0, 0, 0.1);
}

.modal .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
}
</style>