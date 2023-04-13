<script setup>
import ModalComponent from "@/components/global-components/ModalComponent.vue";
import CreateStudentListingFormComponent from "@/components/student-listings-view/CreateStudentListingFormComponent.vue";
import StudentListingComponent from "@/components/global-components/StudentListingComponent.vue";
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useStudentListingStore } from "@/stores/listingStore";

const showModal = ref(false);

const filters = ref({
  level: "",
  subject: "",
  region: "",
});

const { updateStudentListings } = useStudentListingStore();
const { studentListings } = storeToRefs(useStudentListingStore());

const predicate = (value, condition) => {
  if (condition === "") return true;
  return value.toUpperCase().includes(condition.toUpperCase());
};

const filteredStudentListings = computed(() => {
  return studentListings.value.filter(
    (listing) =>
      predicate(listing.level, filters.value.level) &&
      predicate(listing.subject, filters.value.subject) &&
      predicate(listing.region, filters.value.region)
  );
});

updateStudentListings();
</script>

<template>
  <div id="container">
    <section id="left-section">
      <button @click="showModal = true">+ Add Listing</button>

      <div id="filter-form">
        <h3>Filter Listings</h3>

        <label>Level</label>
        <input name="level" type="text" v-model="filters.level" />

        <label>Subject</label>
        <input name="subject" type="text" v-model="filters.subject" />

        <label>Region</label>
        <input name="region" type="text" v-model="filters.region" />
      </div>
    </section>

    <section id="listings-section">
      <h1>Student Listings</h1>

      <StudentListingComponent v-for="listing in filteredStudentListings" :listing="listing" />
    </section>
  </div>

  <ModalComponent v-show="showModal" @close-modal="showModal = false">
    <CreateStudentListingFormComponent />
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
}

#left-section button {
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

#left-section button:hover {
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
</style>
