<script setup>
import ListingComponent from "./ListingComponent.vue";
import ModalComponent from "./ModalComponent.vue";
import { ref } from "vue";

const props = defineProps(["listing"]);
const showModal = ref(false);
</script>

<template>
  <ListingComponent @click="showModal = true">
    <div>
      <h3>{{ props.listing.subject }} ({{ props.listing.level }})</h3>
      <p>{{ props.listing.region }}</p>
      <p>Experience: {{ props.listing.experience }}</p>
      <p>Gender: {{ props.listing.gender }}</p>
    </div>

    <h1>${{ props.listing.rates }}<span>/hr</span></h1>
  </ListingComponent>

  <ModalComponent v-show="showModal" @close-modal="showModal = false">
    {{ props.listing }}
  </ModalComponent>
</template>

<style scoped>
h1 {
  color: var(--tent-orange);
  font-size: 2rem;
}

h1 span {
  font-size: 1.3rem;
}
</style>
