import { onAuthStateChanged } from "firebase/auth";
import { defineStore } from "pinia";
import { ref } from "vue";
import { auth } from "../lib/firebase-config";
import { getUserById } from "../lib/handlers/user";

/**
 * How to use auth system:
 * 1. Import stuff
 *   - `import { storeToRefs } from "pinia";`
 *   - `import { useAuthStore } from "@/stores/authStore.js";`
 * 2. Use store in your components
 *   - `{ user, loading } = storeToRefs(useAuthStore());`
 *   - The `user` variable is a ref object, with properties as defined in the User object in "src/lib/models.js"
 * 3. Accessing wrapped values in ref objects
 *   - `user.value` will return the User object
 *   - `loading.value` will return a boolean
 *   - Refer to vue documentation on refs to find out more (https://vuejs.org/api/reactivity-core.html#ref)
 */
const useAuthStore = defineStore("auth-store", () => {
  const user = ref();
  const loading = ref(true);

  onAuthStateChanged(auth, async (currUser) => {
    if (currUser) {
      user.value = await getUserById(currUser.uid);
    }
    loading.value = false;
  });

  return { user, loading };
});

export { useAuthStore };
