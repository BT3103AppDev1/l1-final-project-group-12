<script setup>
import { createListing } from "@/lib/handlers/listing";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { Form, Field } from "vee-validate";
import { toFormValidator } from "@vee-validate/zod";
import { z } from "zod";
import { useToast, TYPE } from "vue-toastification";
import { useTutorListingStore } from "@/stores/listingStore";

const toast = useToast();

const { updateTutorListings } = useTutorListingStore();

const { user } = storeToRefs(useAuthStore());

const createListingSchema = toFormValidator(
  z.object({
    subject: z.string().nonempty(),
    level: z.string().nonempty(),
    region: z.string().nonempty(),
    description: z.string().nonempty(),
    rates: z.preprocess((n) => parseInt(n), z.number().nonnegative()),
  })
);

const createListingOnClick = async (inputs, { resetForm }) => {
  try {
    await createListing("tutor-listing", {
      userId: user.value.uid,
      dateCreated: new Date().toLocaleString(),
      ...inputs,
    });
    toast("Successfully created listing", { type: TYPE.SUCCESS });
    resetForm();
    await updateTutorListings();
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
    <h3>Add Tutor Listing</h3>

    <Form
      :validation-schema="createListingSchema"
      @submit="createListingOnClick"
      @invalid-submit="onInvalidSubmit"
    >
      <div id="input-container">
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

        <label>Region</label>
        <Field name="region" as="select">
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="Central">Central</option>
          <option value="Others">Others</option>
        </Field>

        <label>Description</label>
        <Field name="description" as="textarea" />

        <label>Rates</label>
        <Field name="rates" type="number" />
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
