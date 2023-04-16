<script setup>
import { createListing } from "@/lib/handlers/listing";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { Form, Field } from "vee-validate";
import { toFormValidator } from "@vee-validate/zod";
import { z } from "zod";
import { useToast, TYPE } from "vue-toastification";
import { useStudentListingStore } from "@/stores/listingStore";

const toast = useToast();

const { updateStudentListings } = useStudentListingStore();

const { user } = storeToRefs(useAuthStore());

const createListingSchema = toFormValidator(
  z.object({
    subject: z.string().nonempty(),
    level: z.string().nonempty(),
    region: z.string().nonempty(),
    description: z.string().nonempty(),
    rates: z.preprocess((n) => parseInt(n), z.number().gt(0)),
  })
);

const createListingOnClick = async (inputs, { resetForm }) => {
  try {
    await createListing("student-listing", {
      userId: user.value.uid,
      dateCreated: new Date().toLocaleString(),
      ...inputs,
    });
    toast("Successfully created listing", { type: TYPE.SUCCESS });
    resetForm();
    await updateStudentListings();
  } catch (error) {
    toast("Error creating listing", { type: TYPE.ERROR });
  }
};

const onInvalidSubmit = ({ values, errors, results }) => {
  console.log(values, errors, results);
  toast("Invalid submission", { type: TYPE.ERROR });
};
</script>

<template>
  <div id="modal-content">
    <h3>Add Student Listing</h3>

    <Form
      :validation-schema="createListingSchema"
      @submit="createListingOnClick"
      @invalid-submit="onInvalidSubmit"
    >
      <div id="input-container">
        <div id="small-inputs">
          <div id="left-inputs">
            <label>Subject</label>
            <Field name="subject" as="select">
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

            <label>Level</label>
            <Field name="level" as="select">
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
              <option value="Junior College">Junior College</option>
              <option value="Others">Others</option>
            </Field>
          </div>

          <div id="right-inputs">
            <label>Region</label>
            <Field name="region" as="select">
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="Central">Central</option>
              <option value="Others">Others</option>
            </Field>

            <label>Rates</label>
            <Field name="rates" type="number" />
          </div>
        </div>

        <label>Description</label>
        <Field name="description" as="textarea" rows="4" />
      </div>

      <button type="submit">Add Listing</button>
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

#small-inputs {
  display: flex;
  gap: 1rem;
}

#left-inputs,
#right-inputs {
  width: 50%;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 1rem;
  row-gap: 1rem;
}

select {
  background-color: #f6f5f6;
  padding: 0.5rem 1rem;
  color: black;
  font-size: 1rem;
  border-radius: 1rem;
  border-style: none;
}

input {
  background-color: #f6f5f6;
  padding: 0.5rem 1rem;
  color: black;
  font-size: 1rem;
  border-radius: 1rem;
  border-style: none;
}

textarea {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  resize: none;
}

button {
  background-color: var(--tent-orange);
  padding: 1rem;
  color: white;
  font-size: 1rem;
  border-radius: 1rem;
  border-style: none;
  cursor: pointer;
}
</style>
