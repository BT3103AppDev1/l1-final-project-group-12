<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signIn, signUp } from "@/lib/handlers/auth";

const mode = ref("sign-in");
const router = useRouter();

const inputs = ref({
  email: "",
  password: "",
  phoneNumber: "",
  telegramHandle: "",
});

const buttonDisabled = ref(false);

/**
 * Changes mode of the current form
 * @param {("sign-in"|"sign-up")} newMode
 */
const changeModeOnClick = (newMode) => {
  mode.value = newMode;
};

const signInOnSubmit = async () => {
  buttonDisabled.value = true;
  const error = await signIn(inputs.value.email, inputs.value.password);
  buttonDisabled.value = false;
  inputs.value = {
    email: "",
    password: "",
    phoneNumber: "",
    telegramHandle: "",
  };
  if (error === undefined) router.push("/home");
};

const signUpOnSubmit = async () => {
  buttonDisabled.value = true;
  const error = await signUp(
    inputs.value.email,
    inputs.value.password,
    inputs.value.phoneNumber,
    inputs.value.telegramHandle
  );
  buttonDisabled.value = false;
  inputs.value = {
    email: "",
    password: "",
    phoneNumber: "",
    telegramHandle: "",
  };
  if (error === undefined) router.push("/home");
};
</script>

<template>
  <div id="background-image">
    <div id="left-section">
      <h1 id="tent-title">Tent</h1>

      <div id="mode-buttons">
        <button @click="changeModeOnClick('sign-in')">Sign In</button>
        <button @click="changeModeOnClick('sign-up')">Sign Up</button>
      </div>

      <form @submit.prevent="signInOnSubmit" v-show="mode === 'sign-in'">
        <label>Email</label>
        <input type="text" v-model="inputs.email" />

        <label>Password</label>
        <input type="text" v-model="inputs.password" />

        <button type="submit" :disabled="buttonDisabled">
          {{ buttonDisabled ? "loading..." : "Sign In" }}
        </button>
      </form>

      <form @submit.prevent="signUpOnSubmit" v-show="mode === 'sign-up'">
        <label>Email</label>
        <input type="text" v-model="inputs.email" />

        <label>Password</label>
        <input type="text" v-model="inputs.password" />

        <label>Phone Number</label>
        <input type="text" v-model="inputs.phoneNumber" />

        <label>Telegram Handle</label>
        <input type="text" v-model="inputs.telegramHandle" />

        <button type="submit" :disabled="buttonDisabled">
          {{ buttonDisabled ? "loading..." : "Sign Up" }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
#background-image {
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),
    url("../assets/tuitionimage.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

#left-section {
  width: 50%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  color: white;

  padding: 5rem;
  padding-top: 2rem;
  box-sizing: border-box;
}

@media screen and (min-width: 1440px) {
  #left-section {
    width: 30%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    color: white;

    padding: 5rem;
    padding-top: 2rem;
    box-sizing: border-box;
  }
}

@media screen and (min-width: 2000px) {
  #left-section {
    width: 20%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    color: white;

    padding: 5rem;
    padding-top: 2rem;
    box-sizing: border-box;
  }
}

#tent-title {
  font-size: 5rem;
}

#mode-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

#mode-buttons button {
  background-color: inherit;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

#mode-buttons button:hover {
  color: gray;
  transition: color 150ms;
}

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
