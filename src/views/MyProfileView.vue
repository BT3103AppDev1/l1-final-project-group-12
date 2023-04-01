<script setup>
import ModalComponent from "@/components/global-components/ModalComponent.vue";
import CreateTutorProfileFormComponent from "@/components/my-profile-view/CreateTutorProfileFormComponent.vue";
import { getUserById } from "@/lib/handlers/user";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { user } = storeToRefs(useAuthStore());

const currUserDetails = ref();
const showModal = ref(false);

const getCurrUserDetails = async () => {
  currUserDetails.value = await getUserById(user.value.uid);
};

getCurrUserDetails();
</script>

<template>
  <button @click="showModal = true">show modal</button>

  <p>{{ currUserDetails }}</p>

  <ModalComponent v-show="showModal" @close-modal="showModal = false">
    <CreateTutorProfileFormComponent />
  </ModalComponent>
</template>

<style scoped></style>
