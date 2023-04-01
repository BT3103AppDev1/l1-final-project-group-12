<script setup>
import { createListing } from "@/lib/handlers/listing";
import { validateInputs } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { user } = storeToRefs(useAuthStore());

const createListingInputs = ref({
  subject: undefined,
  level: undefined,
  region: undefined,
  description: undefined,
  rates: undefined,
});

const createListingOnClick = async () => {
  try {
    validateInputs(createListingInputs.value);

    await createListing("student-listing", {
      userId: user.value.uid,
      dateCreated: new Date().toLocaleString(),
      ...createListingInputs.value,
    });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div id="modal-content">
    <h1>Add Student Listing</h1>

    <form @submit.prevent="createListingOnClick">
      <div id="input-container">
        <label>Subject</label>
        <input type="text" v-model="createListingInputs.subject" required />

        <label>Level</label>
        <input type="text" v-model="createListingInputs.level" required />

        <label>Region</label>
        <input type="text" v-model="createListingInputs.region" required />

        <label>Description</label>
        <input type="text" v-model="createListingInputs.description" required />
      </div>

      <button type="submit">Add Listing</button>
    </form>
  </div>
</template>

<style scoped>
#modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

#input-container {
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 1rem;
  row-gap: 1rem;
  align-items: center;
}

form input,
form button {
  padding: 0.2rem;
  font-size: 1rem;
}
</style>
