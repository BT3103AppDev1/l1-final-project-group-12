<template>
    <div class="body">
        <StudentListing />
    </div>
</template>

<script>
import StudentListing from '@/components/StudentListing.vue'
export default {
    name: 'DisplayStudentListing',
    components: {
        StudentListing,
    }
}
</script>

<style scoped>
.body {
    background-color: #f6f5f6;
    height:100%;
}
</style>