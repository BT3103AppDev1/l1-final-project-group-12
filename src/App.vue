<template>
<StudentListing/>
</template>

<script>
import { RouterView } from "vue-router";
import  StudentListing  from "./components/StudentListing.vue";

export default {
  name: 'App',
  components: {
    StudentListing
  },
  data(){
  }

}
</script>

<style scoped>
</style>
