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
    experience: z.preprocess((n) => parseInt(n), z.number().nonnegative()),
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
        <Field name="gender" as="select">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Field>

        <label>Education</label>
        <Field name="education" type="text" />

        <label>Experience</label>
        <Field name="experience" type="number" />

        <label>Levels</label>
        <Field name="levels" as="select">
          <option value="Primary">Primary</option>
          <option value="Secondary">Secondary</option>
          <option value="Junior College">Junior College</option>
          <option value="Others">Others</option>
        </Field>

        <label>Subjects</label>
        <Field name="subjects" as="select">
          <option value="Biology">Biology</option>
          <option value="Chinese Language">Chinese Language</option>
          <option value="Chemistry">Chemistry</option>
          <option value="English">English</option>
          <option value="Math">Math</option>
          <option value="Malay Language">Malay Language</option>
          <option value="Physics">Physics</option>
          <option value="Tamil Language">Tamil Language</option>
          <option value="Others">Others</option>
        </Field>

        <label>Region</label>
        <Field name="region" as="select">
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="Central">Central</option>
          <option value="Others">Others</option>
        </Field>
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
form select,
form button {
  padding: 0.2rem;
  font-size: 1rem;
}
</style>
