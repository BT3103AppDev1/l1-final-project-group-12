import { onAuthStateChanged } from "firebase/auth";
import { defineStore } from "pinia";
import { ref } from "vue";
import { auth } from "../lib/firebase-config";

/**
 * How to use auth system:
 * 1. Import stuff
 *   - `import { storeToRefs } from "pinia";`
 *   - `import { useAuthStore } from "@/stores/authStore.js";`
 * 2. Use store in your components
 *   - `{ user, loading } = storeToRefs(useAuthStore());`
 *   - The `user` variable is a ref object, with properties as defined in the User object in firebase
 * 3. Accessing wrapped values in ref objects
 *   - `user.value` will return the firebase User object
 *   - `loading.value` will return a boolean
 *   - Refer to vue documentation on refs to find out more (https://vuejs.org/api/reactivity-core.html#ref)
 */
const useAuthStore = defineStore("auth-store", () => {
  const user = ref();
  const loading = ref(true);

  onAuthStateChanged(auth, async (currUser) => {
    if (currUser) {
      user.value = currUser;
    }
    loading.value = false;
  });

  const setUser = (currUser) => {
    user.value = currUser;
    loading.value = false;
  };

  return { user, loading, setUser };
});

export { useAuthStore };
