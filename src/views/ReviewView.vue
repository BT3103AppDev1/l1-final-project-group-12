<script setup>
import AddReview from "@/components/AddReview.vue";
import { getReviewsByUserId } from "@/lib/handlers/review";
import ReviewList from "@/components/ReviewList.vue";
import { ref } from "vue";

const reviewlist = ref([]);

const url = window.location.href;
const parts = url.split('/');
const tutorid = parts[parts.length - 1];
console.log(tutorid)

const getReviews = async () => {
  reviewlist.value = await getReviewsByUserId(tutorid);
  console.log(reviewlist.value)
};

getReviews();
</script>

<template>
  <div class="body">
    <AddReview @reviewAdded="change" /><br>
    <div v-for="review in reviewlist">
      <ReviewList :listing="review" />
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      refreshComp: 0
    }
  },
  methods: {
    change() {
      this.refreshComp += 1
    }
  }
}
</script>

<style scoped>
#content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.body {
  background-color: #f6f5f6;
  overflow: auto;
}
</style>
