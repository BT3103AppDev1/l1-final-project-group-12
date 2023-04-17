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

// gets reviews from database
const getReviews = async () => {
  reviewlist.value = await getReviewsByUserId(tutorid);
  console.log(reviewlist.value)
};

getReviews();

const change = async() => {
  getReviews();
}
</script>

<template>
  <div class="body">
    <AddReview @reviewAdded="change" :currentTutorId = "currentTutorId"/><br>
    <div v-for="review in reviewlist">
      <ReviewList :listing="review" />
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      refreshComp: 0,
      currentTutorId : this.generateId()
    }
  },
  methods: {
    generateId() {
      let url = window.location.href;
      let parts = url.split('/');
      let tutorid = parts[parts.length - 1];
      console.log(tutorid)
      return tutorid

    }  
  },

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
  min-height: 100%;
}
</style>
