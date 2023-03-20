<template>
  <SelectListingType
    v-show="showSelectListingModal"
    @close-modal="showSelectListingModal = false"
    @switch-student-modal="swapStudentModal"
    @switch-tutor-modal="swapTutorModal"
  />

  <NewStudentListing
    v-show="showStudentListingModal"
    @close-modal="showStudentListingModal = false"
  />

  <NewTutorListing
    v-show="showTutorListingModal"
    @close-modal="showTutorListingModal = false"
  />

  <button class="add-listing-btn" @click="showSelectListingModal = true">Add Listing</button>
</template>

<script>
import SelectListingType from "../components/SelectListingType.vue";
import NewStudentListing from "../components/NewStudentListing.vue";
import NewTutorListing from "../components/NewTutorListing.vue";

export default {
  components: { SelectListingType, NewStudentListing, NewTutorListing },
  data() {
    return {
      showSelectListingModal: false,
      showStudentListingModal: false,
      showTutorListingModal: false
    };
  },
  methods:{
    swapStudentModal() {
      this.showSelectListingModal = false;
      this.showStudentListingModal = true;
    },
    swapTutorModal() {
      this.showSelectListingModal = false;
      this.showTutorListingModal = true;
    }
  }
};
</script>

<style>
.add-listing-btn {
  background-color: #ff9040;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
  border-style: none;
  cursor: pointer;
}

.add-listing-btn:active {
  background-color: #db7c37;
}
</style>
