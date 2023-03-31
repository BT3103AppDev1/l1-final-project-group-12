<script setup>
import { updateTutorProfileById } from "@/lib/handlers/user";
import { validateInputs } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { user } = storeToRefs(useAuthStore());

const createTutorProfileInputs = ref({
  gender: undefined,
  education: undefined,
  experience: undefined,
  levels: undefined,
  subjects: undefined,
  region: undefined,
});

const createListingOnClick = async () => {
  try {
    validateInputs(createTutorProfileInputs.value);

    await updateTutorProfileById(user.value.id, {
      isTutor: true,
      ...createTutorProfileInputs.value,
    });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div id="modal-content">
    <h1>Create Tutor Profile</h1>

    <form @submit.prevent="createListingOnClick">
      <div id="input-container">
        <label>Subject</label>
        <input type="text" v-model="createTutorProfileInputs.subject" required />

        <label>Level</label>
        <input type="text" v-model="createTutorProfileInputs.level" required />

        <label>Region</label>
        <input type="text" v-model="createTutorProfileInputs.region" required />
      </div>

      <button type="submit">Create Profile</button>
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
