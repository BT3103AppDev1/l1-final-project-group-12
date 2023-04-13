<script setup>
import dayjs from "dayjs";

const { listing } = defineProps(["listing"]);
</script>

<template>
  <div id="container">
    <section id="listing-details">
      <h3>Listing Details</h3>

      <div>
        <label>Date Created</label>
        <p>{{ dayjs(Date(listing.dateCreated)).format("DD/MM/YYYY") }}</p>

        <label>Subject</label>
        <p>{{ listing.subject }}</p>

        <label>Level</label>
        <p>{{ listing.level }}</p>

        <label>Region</label>
        <p>{{ listing.region }}</p>

        <label>Rates</label>
        <p>${{ listing.rates }}/hr</p>

        <label>Description</label>
        <p>{{ listing.description }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
#container {
  display: flex;
  justify-content: space-around;
  width: 40vw;
}

h3 {
  margin-bottom: 1rem;
}

#listing-details {
  width: 100%;
}

#listing-details div {
  max-height: 70vw;
  overflow: hidden;
  display: grid;
  grid-template-columns: 50% 50%;
  row-gap: 1rem;
  column-gap: 2rem;
}
</style>
