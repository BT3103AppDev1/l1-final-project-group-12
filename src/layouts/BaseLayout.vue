<script setup>
import { useRouter } from "vue-router";
import { logOut } from "../lib/handlers/auth";

const router = useRouter();

const logOutOnClick = async () => {
  await logOut();
  router.push("/auth");
};
</script>

<template>
  <nav>
    <router-link to="/home" custom v-slot="{ navigate }">
      <h1
        class="hover-underline-animation"
        @click="navigate"
        @keypress.enter="navigate"
        role="link"
      >
        Tent
      </h1>
    </router-link>

    <div id="navbar-buttons">
      <router-link class="hover-underline-animation" to="/student-listings">
        Look for students
      </router-link>
      <router-link class="hover-underline-animation" to="/tutor-listings">
        Look for tutors
      </router-link>
      <router-link class="hover-underline-animation" to="/profile"> My profile </router-link>
      <p class="hover-underline-animation" @click="logOutOnClick">Log out</p>
    </div>
  </nav>

  <div id="container">
    <router-view />
  </div>
</template>

<style scoped>
nav {
  background-color: var(--tent-orange);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

nav h1 {
  cursor: pointer;
}

.hover-underline-animation {
  display: inline-block;
  position: relative;
}

.hover-underline-animation::after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: white;
  transform-origin: bottom right;
  transition: transform 150ms ease-out;
}

.hover-underline-animation:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

#navbar-buttons {
  justify-self: end;
  display: flex;
  gap: 1rem;
}

#navbar-buttons a,
#navbar-buttons p {
  color: white;
  text-decoration: none;
  border: none;
  background-color: inherit;
  cursor: pointer;
}

#container {
  height: 100%;
  margin-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
