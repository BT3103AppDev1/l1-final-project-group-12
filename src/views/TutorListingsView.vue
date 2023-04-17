<script setup>
import ModalComponent from "@/components/global-components/ModalComponent.vue";
import CreateTutorListingFormComponent from "@/components/tutor-listings-view/CreateTutorListingFormComponent.vue";
import TutorListingComponent from "@/components/global-components/TutorListingComponent.vue";
import { ref, computed } from "vue";
import { useTutorListingStore } from "@/stores/listingStore";
import { storeToRefs } from "pinia";

const showModal = ref(false);

const filters = ref({
  level: "",
  subject: "",
  region: "",
});

const { updateTutorListings } = useTutorListingStore();
const { tutorListings } = storeToRefs(useTutorListingStore());

const resetFilters = () => {
  filters.value = {
    level: "",
    subject: "",
    region: "",
  };
};

const predicate = (value, condition) => {
  if (condition === "") return true;
  return value.toUpperCase().includes(condition.toUpperCase());
};

const filteredTutorListings = computed(() => {
  return tutorListings.value.filter(
    (listing) =>
      predicate(listing.level, filters.value.level) &&
      predicate(listing.subject, filters.value.subject) &&
      predicate(listing.region, filters.value.region)
  );
});

updateTutorListings();
</script>

<template>
  <div id="container">
    <section id="left-section">
      <button id="add-listing-button" @click="showModal = true">+ Add Listing</button>

      <div id="filter-form">
        <h3>Filter Listings</h3>

        <button id="reset-filter-button" @click="resetFilters">Reset Filters</button>

        <label>Level</label>
        <select name="level" v-model="filters.level">
          <option>Primary</option>
          <option>Secondary</option>
          <option>Junior College</option>
          <option>Others</option>
        </select>

        <label>Subject</label>
        <select name="subject" v-model="filters.subject">
          <option>Biology</option>
          <option>Chinese Language</option>
          <option>Chemistry</option>
          <option>English</option>
          <option>Math</option>
          <option>Malay Language</option>
          <option>Physics</option>
          <option>Tamil Language</option>
          <option>Others</option>
        </select>

        <label>Region</label>
        <select name="region" v-model="filters.region">
          <option>North</option>
          <option>South</option>
          <option>East</option>
          <option>West</option>
          <option>Central</option>
          <option>Others</option>
        </select>
      </div>
    </section>

    <section id="listings-section">
      <h1>Tutor Listings</h1>

      <TutorListingComponent v-for="listing in filteredTutorListings" :listing="listing" />
    </section>
  </div>

  <ModalComponent v-show="showModal" @close-modal="showModal = false">
    <CreateTutorListingFormComponent />
  </ModalComponent>
</template>

<style scoped>
#container {
  height: 100%;
  display: flex;
  align-items: start;
  gap: 2rem;
}

#listings-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

#listings-section h1 {
  font-size: 2rem;
}

#left-section {
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 160px;
}

#add-listing-button,
#reset-filter-button {
  background-color: var(--tent-orange);
  color: white;
  border: none;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 1rem;
  cursor: pointer;
  transition: scale 150ms ease-in-out;
}

#reset-filter-button {
  padding: 0.8rem;
  font-size: 1rem;
}

#add-listing-button:hover,
#reset-filter-button:hover {
  scale: 102%;
}

#filter-form {
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

#filter-form h3 {
  font-size: 1.2rem;
}

#filter-form input {
  font-size: 1rem;
}

select {
  background-color: #f6f5f6;
  padding: 0.5rem 1rem;
  color: black;
  font-size: 1rem;
  border-radius: 1rem;
  border-style: none;
}
</style>
