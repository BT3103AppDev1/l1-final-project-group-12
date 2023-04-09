<script setup>
import AddReview from "@/components/AddReview.vue";
import { getReviewsByUserId } from "@/lib/handlers/review";
import ReviewList from "@/components/ReviewList.vue";
import { ref } from "vue";

const reviewlist = ref([]);

const getReviews = async () => {
//figure out how to get the user id here
  reviewlist.value = await getReviewsByUserId("lV6MRARwFWNtfVNk9JQeL7ED5XZ2");
};

getReviews();
</script>

<template>
  <div class="body">
    <AddReview /><br>
    <ReviewList :listing="reviewlist"/>
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
