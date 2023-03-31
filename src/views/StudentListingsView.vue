<script setup>
import ModalComponent from "@/components/global-components/ModalComponent.vue";
import CreateStudentListingFormComponent from "@/components/student-listings-view/CreateStudentListingFormComponent.vue";
import { getAllListings } from "@/lib/handlers/listing";
import { ref } from "vue";

const showModal = ref(false);

const allStudentListings = ref([]);

const getAllStudentListings = async () => {
  allStudentListings.value = await getAllListings("student-listing");
};

getAllStudentListings();
</script>

<template>
  <button @click="showModal = true">show modal</button>

  <p>{{ allStudentListings }}</p>

  <ModalComponent v-show="showModal" @close-modal="showModal = false">
    <CreateStudentListingFormComponent />
  </ModalComponent>
</template>

<style scoped></style>
