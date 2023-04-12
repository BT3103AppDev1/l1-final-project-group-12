<template>
    <div class="body">
        <ProfileDetails />
    </div>
</template>

<script>
import ProfileDetails from '@/components/ProfileDetails.vue'
export default {
    name: 'UserProfileView',
    components: {
        ProfileDetails,
    }
}
</script>

<style scoped>
.body {
    background-color: #f6f5f6;
    height: 100%;
    overflow:auto
}
</style>
