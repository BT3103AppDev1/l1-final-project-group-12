<template>
    <div class="body">
        <TutorListing />
    </div>
</template>

<script>
import TutorListing from '@/components/TutorListing.vue'
export default {
    name : 'DisplayStudentListing',
    components : {
        TutorListing,
    }
}
</script>

<style scoped>
.body {
    background-color: #f6f5f6;
    height:100%;
}
</style>