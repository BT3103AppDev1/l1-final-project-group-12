<template>

<br>
    <div class = "outer-details"> 

        <div class = "details">
            <h1>Profile Details </h1>
            <br>
            Email: {{user.email}}
            <br> <br>
            Password : {{user.password}}
            <br><br>
            <button @click="showModal = true">Update Details</button>
            <ModalComponent v-show="showModal" @close-modal="showModal = false">
                <div id ="content">
                    Leave blank if you are not updating that field
                    <br>
                    New Email:
                    <input v-model = "newemail" placeholder="Enter new email">
                    <br>
                    New Password:
                    <input v-model = "newpassword" placeholder="Enter new password">
                </div>
            </ModalComponent>
            
            <br> <br>
        </div>
    </div>
    <br>
    <div class = "outer-details">

        <div class = "details" v-if="user.isTutor">
            <h1> Tutor Details </h1>
            <br>
            phoneNumber: {{user.phoneNumber}}
            <br><br>    
            telegramHandle: {{user.telegramHandle}}
            <br><br>
            gender: {{user.gender}}
            <br><br>
            education: {{user.education}}
            <br><br>
            experience: {{user.experience}}
            <br> <br>
            <button id = "updateTutorButton"> Update details </button>
            <br> <br>

                
        </div>
        <div class = "details" v-else>
            <h1> Tutor Profile </h1>
            <br>
            To become a tutor, you must set up a tutor profile.
            <br><br>
            <button> Apply to be tutor (Replace with Bryan's create new tutor functionality) </button> <!-- to be repalced with bryan's create new tutor functionality -->
            <br> <br>
        </div>
    </div>
    <br>

    <div class = "outer-details">
        <div class = "details">
            <h1> Your Listings </h1>
            <br>

        </div>
    </div>
</template>

<script> 
import {getCurrentUser} from "../lib/handlers/auth.js"
import {getListingById} from "../lib/handlers/listing.js"
import ModalComponent from "@/components/ModalComponent.vue";


export default {
    data() {
        return {
            user : "",
            showModal : false,
            newemail: "",
            newpassword: ""
        }
    },
    async mounted(){
        let $vm = this;
        $vm.user = await getCurrentUser();
        let studentListing = await getListingById("student-listing", String($vm.user.id))
        console.log(studentListing); //set up listings to be done.
    }
}

</script>


<style scoped>
.outer-details{
    display: flex;
    justify-content: center;
}


.details{
width  : 50em;
outline: 1px solid black;
}
</style>
