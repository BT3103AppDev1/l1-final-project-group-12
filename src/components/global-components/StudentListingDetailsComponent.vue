<script setup>
import dayjs from "dayjs";
import { ref } from "vue";
import { getUserById } from "../../lib/handlers/user";

const { listing } = defineProps(["listing"]);
const student = ref();

const getStudent = async () => {
  try {
    student.value = await getUserById(listing.userId);
  } catch (error) {}
};

getStudent();
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
        <h3>Student Details</h3>
        <div id="fields" v-if="student !== undefined">
          <label>Email</label>
          <p>{{ student.email }}</p>

          <label>Phone Number</label>
          <p>{{ student.phoneNumber }}</p>

          <label>Telegram Handle</label>
          <p>{{ student.telegramHandle }}</p>
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
</style>
