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
    <div id="description">
      <h3>Description</h3>
      <p>{{ listing.description }}</p>
    </div>

    <div id="sections">
      <section class="details">
        <h3>Listing Details</h3>

        <div id="fields">
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
        </div>
      </section>

      <section class="details">
        <h3>Tutor Details</h3>

        <button @click="$router.push(`/tutor/${listing.userId}`)">Go to tutor's profile</button>

        <div id="fields" v-if="tutor !== undefined">
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
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  width: 40vw;
  gap: 2rem;
}

h3 {
  margin-bottom: 1rem;
}

#sections {
  display: flex;
  gap: 1rem;
}

.details {
  width: 50%;
  max-height: 70vw;
}

#fields {
  overflow: hidden;
  display: grid;
  grid-template-columns: auto 100%;
  row-gap: 1rem;
  column-gap: 2rem;
  margin-bottom: 1rem;
}

#description {
  width: 100%;
  display: block;
  overflow-wrap: break-word;
}

.details button {
  text-decoration: none;
  background-color: var(--tent-orange);
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  transition: scale 150ms ease-in-out;
}

.details button:hover {
  scale: 102%;
}
</style>
