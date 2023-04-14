<script setup>
import ListingComponent from "./ListingComponent.vue";
import ModalComponent from "./ModalComponent.vue";
import StudentListingDetailsComponent from "./StudentListingDetailsComponent.vue";
import { ref } from "vue";

const { listing } = defineProps(["listing"]);
const showModal = ref(false);
</script>

<template>
  <ListingComponent @click="showModal = true">
    <div>
      <h3>{{ listing.subject }} ({{ listing.level }})</h3>
      <p>{{ listing.region }}</p>
    </div>

    <h1>${{ listing.rates }}<span>/hr</span></h1>
  </ListingComponent>

  <ModalComponent v-show="showModal" @close-modal="showModal = false">
    <StudentListingDetailsComponent :listing="listing" />
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
