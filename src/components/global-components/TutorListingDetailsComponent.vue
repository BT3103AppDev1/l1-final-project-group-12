<script setup>
import dayjs from "dayjs";
import { ref } from "vue";
import { getUserById } from "../../lib/handlers/user";

const { listing } = defineProps(["listing"]);
const tutor = ref();

const getTutor = async () => {
  try {
    tutor.value = await getUserById(listing.userId);
  } catch (error) {}
};

getTutor();
</script>

<template>
  <div id="container">
    <section id="listing-details">
      <h3>Listing Details</h3>

      <div>
        <label>Date Created</label>
        <p>{{ dayjs(Date(listing.dateCreated)).format("DD/MM/YYYY") }}</p>

        <label>Subject</label>
        <p>{{ listing.subject }}</p>

        <label>Level</label>
        <p>{{ listing.level }}</p>

        <label>Region</label>
        <p>{{ listing.region }}</p>

        <label>Rates</label>
        <p>${{ listing.rates }}/hr</p>

        <label>Description</label>
        <p>{{ listing.description }}</p>
      </div>
    </section>

    <section id="tutor-details">
      <h3>Tutor Details</h3>
      <div v-if="tutor !== undefined">
        <label>Email</label>
        <p>{{ tutor.email }}</p>

        <label>Phone Number</label>
        <p>{{ tutor.phoneNumber }}</p>

        <label>Telegram Handle</label>
        <p>{{ tutor.telegramHandle }}</p>

        <label>Gender</label>
        <p>{{ tutor.gender }}</p>

        <label>Education</label>
        <p>{{ tutor.education }}</p>

        <label>Experience</label>
        <p>{{ tutor.experience }}</p>

        <!-- <router-link as="a" :to="`/review/${tutor.id}`">Go to tutor's profile</router-link> -->
      </div>
      <button id="tutor-profile-btn" @click="$router.push({path: `/review/${tutor.id}`})">View Tutor Reviews</button>
    </section>
  </div>
</template>

<style scoped>
#container {
  display: flex;
  justify-content: space-around;
  width: 40vw;
}

h3 {
  margin-bottom: 1rem;
}

#listing-details div {
  max-height: 70vw;
  overflow: hidden;
  display: grid;
  grid-template-columns: 50% 50%;
  row-gap: 1rem;
  column-gap: 2rem;
}

#tutor-details div {
  max-height: 70vw;
  overflow: hidden;
  display: grid;
  grid-template-columns: 50% 50%;
  row-gap: 1rem;
  column-gap: 2rem;
}

#tutor-profile-btn {
  background-color: var(--tent-orange);
  width: 80%;
  padding: 1rem;
  color: white;
  font-size: 1rem;
  border-radius: 1rem;
  border-style: none;
  cursor: pointer;
  margin: 1rem;
}
</style>
