<script setup>
import TutorListingComponent from "@/components/global-components/TutorListingComponent.vue";
import StudentListingComponent from "@/components/global-components/StudentListingComponent.vue";
import { useStudentListingStore, useTutorListingStore } from "@/stores/listingStore";
import { storeToRefs } from "pinia";

const { updateStudentListings } = useStudentListingStore();
const { updateTutorListings } = useTutorListingStore();

const { studentListings } = storeToRefs(useStudentListingStore());
const { tutorListings } = storeToRefs(useTutorListingStore());

const getListings = async () => {
  await updateStudentListings();
  await updateTutorListings();
};

getListings();
</script>

<template>
  <div id="listings-container">
    <section id="student-listings-container">
      <h1>Student Listings</h1>

      <div class="listing-cards">
        <StudentListingComponent
          v-for="studentListing in studentListings"
          :listing="studentListing"
        />
      </div>
    </section>

    <section id="tutor-listings-container">
      <h1>Tutor Listings</h1>

      <div class="listing-cards">
        <TutorListingComponent v-for="tutorListing in tutorListings" :listing="tutorListing" />
      </div>
    </section>
  </div>
</template>

<style scoped>
#listings-container {
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  gap: 2rem;
}

section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

section h1 {
  text-align: center;
}

.listing-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
