<script setup>
import AddReview from "@/components/AddReview.vue";

</script>

<template>
  <div class="body">
    <AddReview />
  </div>
</template>

<style scoped>
#content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.body {
  background-color: #f6f5f6;
  height: 100%;
}
</style>
