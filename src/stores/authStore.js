import { onAuthStateChanged } from "firebase/auth";
import { defineStore } from "pinia";
import { ref } from "vue";
import { auth } from "../lib/firebase-config";
import { getUserById } from "../lib/handlers/user";

const useAuthStore = defineStore("auth-store", () => {
  const user = ref();

  onAuthStateChanged(auth, async (currUser) => {
    if (currUser) {
      console.log(currUser);
      const userFromFS = await getUserById(currUser.uid);
      user.value = userFromFS;
    }
  });

  return { user };
});

export default useAuthStore;
