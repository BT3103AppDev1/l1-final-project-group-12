<script setup>
import ModalComponent from "@/components/global-components/ModalComponent.vue";
import CreateTutorProfileFormComponent from "@/components/my-profile-view/CreateTutorProfileFormComponent.vue";
import { getUserById } from "@/lib/handlers/user";
import { getCurrentUser } from "@/lib/handlers/auth";
import { onBeforeMount, ref } from "vue";

const showModal = ref(false);
const currUserDetails = ref();

onBeforeMount(async () => {
  const currUser = await getCurrentUser();
  currUserDetails.value = await getUserById(currUser.uid);
});
</script>

<template>
  <button @click="showModal = true">show modal</button>

  <p>{{ currUserDetails }}</p>

  <ModalComponent v-show="showModal" @close-modal="showModal = false">
    <CreateTutorProfileFormComponent />
  </ModalComponent>
</template>

<style scoped></style>
