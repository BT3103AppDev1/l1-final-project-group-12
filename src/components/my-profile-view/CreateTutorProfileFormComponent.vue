<script setup>
import { updateTutorProfileById } from "@/lib/handlers/user";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { toFormValidator } from "@vee-validate/zod";
import { z } from "zod";
import { Form, Field } from "vee-validate";
import { useToast, TYPE } from "vue-toastification";

const toast = useToast();

const { user } = storeToRefs(useAuthStore());

const updateTutorProfileSchema = toFormValidator(
  z.object({
    gender: z.string().nonempty(),
    education: z.string().nonempty(),
    experience: z.string().nonempty(),
    levels: z.string().nonempty(),
    subjects: z.string().nonempty(),
    region: z.string().nonempty(),
  })
);

const updateTutorProfileOnClick = async (inputs, { resetForm }) => {
  try {
    await updateTutorProfileById(user.value.uid, { isTutor: true, ...inputs });
    toast("Successfully update tutor profile", { type: TYPE.SUCCESS });
    resetForm();
  } catch (error) {
    console.log(error);
    toast("Error updating tutor profile", { type: TYPE.ERROR });
  }
};

const onInvalidSubmit = ({ values, errors, results }) => {
  console.log(values, errors, results);
  toast("Invalid submission", { type: TYPE.ERROR });
};
</script>

<template>
  <div id="modal-content">
    <h1>Create Tutor Profile</h1>

    <Form
      :validation-schema="updateTutorProfileSchema"
      @submit="updateTutorProfileOnClick"
      @invalid-submit="onInvalidSubmit"
    >
      <div id="input-container">
        <label>Gender</label>
        <Field name="gender" type="text" />

        <label>Education</label>
        <Field name="education" type="text" />

        <label>Experience</label>
        <Field name="experience" type="text" />

        <label>Levels</label>
        <Field name="levels" type="text" />

        <label>Subjects</label>
        <Field name="subjects" type="text" />

        <label>Region</label>
        <Field name="region" type="text" />
      </div>

      <button type="submit">Create Profile</button>
    </Form>
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
