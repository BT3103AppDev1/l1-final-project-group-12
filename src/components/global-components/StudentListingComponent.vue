<script setup>
import ListingComponent from "@/components/global-components/ListingComponent.vue";

const props = defineProps(["listing"]);
</script>

<template>
  <ListingComponent>
    <div>
      <p>{{ props.listing.subject }} ({{ props.listing.level }})</p>
      <p>{{ props.listing.region }}</p>
    </div>

    <h1>${{ props.listing.rates }}<span>/hr</span></h1>
  </ListingComponent>
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
