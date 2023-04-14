import { defineStore } from "pinia";
import { ref } from "vue";
import { getAllListings } from "../lib/handlers/listing";

const useStudentListingStore = defineStore("student-listing-store", () => {
  const studentListings = ref([]);
  const loading = ref(true);

  const updateStudentListings = async () => {
    try {
      loading.value = true;
      studentListings.value = await getAllListings("student-listing");
      loading.value = false;
    } catch (error) {
      console.error("ERROR: student listings store", error);
    }
  };

  return { studentListings, updateStudentListings, loading };
});

const useTutorListingStore = defineStore("tutor-listing-store", () => {
  const tutorListings = ref([]);
  const loading = ref(true);

  const updateTutorListings = async () => {
    try {
      loading.value = true;
      tutorListings.value = await getAllListings("tutor-listing");
      loading.value = false;
    } catch (error) {
      console.error("ERROR: tutor listings store", error);
    }
  };

  return { tutorListings, updateTutorListings, loading };
});

export { useStudentListingStore, useTutorListingStore };
