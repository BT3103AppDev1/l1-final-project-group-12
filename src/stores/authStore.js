import { onAuthStateChanged } from "firebase/auth";
import { defineStore } from "pinia";
import { ref } from "vue";
import { auth } from "../lib/firebase-config";
import { getUserById } from "../lib/handlers/user";

/*
How to use auth system:
1. Import stuff
  - `import {storeToRefs} from "pinia";`
  - `import { useAuthStore } from "@/stores/authStore.js";`
2. Use store in your components
  - `{ user } = storeToRefs(useAuthStore());`
  - The `user` variable is a ref object, with properties as defined in the User object in "src/lib/models.js"
*/

const useAuthStore = defineStore("auth-store", () => {
  const user = ref();
  const loading = ref(true);

  onAuthStateChanged(auth, async (currUser) => {
    if (currUser) {
      const userFromFS = await getUserById(currUser.uid);
      user.value = userFromFS;
    }
    loading.value = false;
  });

  return { user, loading };
});

export { useAuthStore };
