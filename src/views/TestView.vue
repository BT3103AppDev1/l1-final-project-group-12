<script setup>
import ModalComponent from "@/components/global-components/ModalComponent.vue";
import { ref } from "vue";

const showModal = ref(false);
</script>

<template>
  <p>This is test, truly</p>
  <button @click="showModal = true">show modal</button>
  <ModalComponent v-show="showModal" @close-modal="showModal = false">
    <div id="content">
      <h1>Example title</h1>
      <p>example paragraph here</p>
      <button>example button</button>
    </div>
  </ModalComponent>
</template>

<style scoped>
#content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
