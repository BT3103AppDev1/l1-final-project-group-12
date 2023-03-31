<script setup>
import { getAllListings } from "@/lib/handlers/listing";
import TutorListingComponent from "@/components/global-components/TutorListingComponent.vue";
import StudentListingComponent from "@/components/global-components/StudentListingComponent.vue";
import { ref } from "vue";

const studentListings = ref([]);
const tutorListings = ref([]);

const getListings = async () => {
  studentListings.value = await getAllListings("student-listing");
  tutorListings.value = await getAllListings("tutor-listing");
};

getListings();
</script>

<template>
  <div id="listings-container">
    <section id="student-listings-contianer">
      <h1>Student Listings</h1>
      <div class="student-listing-cards" v-for="studentListing in studentListings">
        <StudentListingComponent :listing="studentListing" />
      </div>
    </section>

    <section id="tutor-listings-contianer">
      <h1>Tutor Listings</h1>
      <div class="tutor-listing-cards" v-for="tutorListing in tutorListings">
        <TutorListingComponent :listing="tutorListing" />
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
  margin-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
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
</style>
