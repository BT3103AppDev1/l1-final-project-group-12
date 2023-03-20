<template>
    <StudentListing/>
</template>

<script>
import StudentListing from '@/components/StudentListing.vue'
export default {
    name : 'DisplayStudentListing',
    components : {
        StudentListing,
    }
}
</script>

<style scoped>
.body{
background-color: #f6f5f6;
}
</style>