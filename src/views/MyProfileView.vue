<script setup>
import ModalComponent from "@/components/global-components/ModalComponent.vue";
import CreateTutorProfileFormComponent from "@/components/my-profile-view/CreateTutorProfileFormComponent.vue";
import ListingCardComponent from "@/components/my-profile-view/ListingCardComponent.vue";
import { getListingsByQuery } from "@/lib/handlers/listing";
import { getUserById } from "@/lib/handlers/user";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { user } = storeToRefs(useAuthStore());

const currUserDetails = ref();
const currUserStudentListings = ref([]);
const currUserTutorListings = ref([]);

const showModal = ref(false);
const isLoaded = ref(false);

const getCurrUserDetails = async () => {
  currUserDetails.value = await getUserById(user.value.uid);
  isLoaded.value = true;
};

const getCurrUserListings = async () => {
  currUserStudentListings.value = await getListingsByQuery("student-listing", {
    userId: user.value.uid,
  });
  currUserTutorListings.value = await getListingsByQuery("tutor-listing", {
    userId: user.value.uid,
  });
};

getCurrUserDetails();
getCurrUserListings();
</script>

<template>
  <div id="container" v-if="isLoaded">
    <section id="side-bar">
      <div class="profile">
        <h2>User Profile</h2>

        <div class="fields">
          <label>Email</label>
          <p>{{ currUserDetails.email }}</p>

          <label>Telegram Handle</label>
          <p>{{ currUserDetails.telegramHandle }}</p>

          <label>Phone Number</label>
          <p>{{ currUserDetails.phoneNumber }}</p>
        </div>

        <button>Update user profile</button>
      </div>

      <div class="profile">
        <h2>Tutor Profile</h2>

        <div class="fields">
          <label>Subjects</label>
          <p>{{ currUserDetails.subjects }}</p>

          <label>Gender</label>
          <p>{{ currUserDetails.gender }}</p>

          <label>Experience</label>
          <p>{{ currUserDetails.experience }}</p>

          <label>Education</label>
          <p>{{ currUserDetails.education }}</p>

          <label>Region</label>
          <p>{{ currUserDetails.region }}</p>
        </div>

        <button @click="showModal = true">Update tutor profile</button>
      </div>
    </section>

    <section id="listings-section">
      <div class="listings">
        <h2>Student Listings</h2>
        <ListingCardComponent :listing="listing" v-for="listing in currUserStudentListings" />
      </div>
      <div class="listings">
        <h2>Tutor Listings</h2>
        <ListingCardComponent :listing="listing" v-for="listing in currUserTutorListings" />
      </div>
    </section>
  </div>

  <div v-else></div>

  <ModalComponent v-show="showModal" @close-modal="showModal = false">
    <CreateTutorProfileFormComponent />
  </ModalComponent>
</template>

<style scoped>
#container {
  display: flex;
  gap: 2rem;
}

#side-bar {
  position: sticky;
  width: 30%;
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.fields {
  display: grid;
  grid-template-columns: 50% 50%;
  row-gap: 0.5rem;
}

#side-bar button {
  border: none;
  background-color: var(--tent-orange);
  color: white;
  padding: 0.5rem 0;
  font-size: 1rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: scale 150ms ease-in-out;
}

#side-bar button:hover {
  scale: 102%;
}

#listings-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.listings {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
