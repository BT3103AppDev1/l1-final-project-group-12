<script setup>
import ModalComponent from "@/components/ModalComponent.vue";
import { ref } from "vue";

const showModal = ref(false);
</script>

<template>
  <p>This is test, truly</p>
  <button @click="showModal = true">show modal</button>
  <ModalComponent v-show="showModal" @close-modal="showModal = false" />
</template>

<style scoped></style>
