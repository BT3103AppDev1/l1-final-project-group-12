<script setup>
import { ref } from "vue";
import SignInFormComponent from "@/components/auth-view/SignInFormComponent.vue";
import SignUpFormComponent from "@/components/auth-view/SignUpFormComponent.vue";

const mode = ref("sign-in");

/**
 * Changes mode of the current form
 * @param {("sign-in"|"sign-up")} newMode
 */
const changeModeOnClick = (newMode) => {
  mode.value = newMode;
};
</script>

<template>
  <div id="background-image">
    <div id="left-section">
      <h1 id="tent-title">Tent</h1>

      <div id="mode-buttons">
        <button @click="changeModeOnClick('sign-in')" :class="{ currentMode: mode === 'sign-in' }">
          Sign In
        </button>
        <button @click="changeModeOnClick('sign-up')" :class="{ currentMode: mode === 'sign-up' }">
          Sign Up
        </button>
      </div>

      <SignInFormComponent v-show="mode === 'sign-in'" />

      <SignUpFormComponent v-show="mode === 'sign-up'" />
    </div>
  </div>
</template>

<style scoped>
#background-image {
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url("/tuitionimage.jpg");
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
  min-width: 350px;
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

.currentMode {
  font-weight: bold;
  text-decoration: underline;
}
</style>
