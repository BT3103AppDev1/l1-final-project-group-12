<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signUp } from "@/lib/handlers/auth";
import { Form, Field } from "vee-validate";
import { toFormValidator } from "@vee-validate/zod";
import { z } from "zod";
import { useToast, TYPE } from "vue-toastification";

const toast = useToast();
const router = useRouter();
const buttonDisabled = ref(false);

const signUpSchema = toFormValidator(
  z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
    phoneNumber: z.preprocess((n) => parseInt(n), z.number().nonnegative()),
    telegramHandle: z.string().startsWith("@"),
  })
);

const redirect = () => {
  const redirectPath = router.currentRoute.value.query.redirect;
  router.push(redirectPath ? redirectPath : { name: "home" });
};

const signUpOnSubmit = async (inputs, { resetForm }) => {
  try {
    buttonDisabled.value = true;
    await signUp(inputs.email, inputs.password, inputs.phoneNumber, inputs.telegramHandle);
    redirect();
  } catch (error) {
    toast("Invalid submission", { type: TYPE.ERROR });
  } finally {
    resetForm();
    buttonDisabled.value = false;
  }
};

const onInvalidSubmit = ({ values, errors, results }) => {
  console.log(values, errors, results);
  toast("Invalid submission", { type: TYPE.ERROR });
};
</script>

<template>
  <Form
    :validation-schema="signUpSchema"
    @submit="signUpOnSubmit"
    @invalid-submit="onInvalidSubmit"
  >
    <label>Email</label>
    <Field name="email" type="text" />

    <label>Password</label>
    <Field name="password" type="password" />

    <label>Phone Number</label>
    <Field name="phoneNumber" type="text" />

    <label>Telegram Handle</label>
    <Field name="telegramHandle" type="text" />

    <button type="submit" :disabled="buttonDisabled">
      {{ buttonDisabled ? "loading..." : "Sign Up" }}
    </button>
  </Form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

form label {
  margin-bottom: 0.3rem;
}

form input {
  padding: 0.3rem 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 1rem;
}

form button {
  background: var(--tent-orange);
  color: white;
  border: none;
  font-size: 1.5rem;
  padding: 0.5rem;
  margin-top: 1rem;
  border-radius: 1rem;
  cursor: pointer;
}

form button:hover {
  background: rgb(220, 120, 66);
  transition: background 150ms;
}
</style>
