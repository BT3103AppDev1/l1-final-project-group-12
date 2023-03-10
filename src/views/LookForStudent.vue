<template>
    <button class="add-listing-btn" @click="showSelectListingModal = true">Add Listing</button>
  <SelectListingType v-show="showSelectListingModal" @close-modal="showSelectListingModal = false" />
</template>

<script>
import SelectListingType from "../components/SelectListingType.vue";

export default {
  components: { SelectListingType },
  data() {
    return {
      showSelectListingModal: false,
    };
  },
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