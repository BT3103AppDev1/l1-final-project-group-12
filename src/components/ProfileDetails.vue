<template>

<br>
    <div class = "outer-details"> 

        <div class = "details">
            <h1>Profile Details </h1>
            <br>
            Email: {{user.email}}
            <br><br>
            phoneNumber: {{user.phoneNumber}}
            <br><br>    
            telegramHandle: {{user.telegramHandle}}
            <br><br>
            <button @click="showModal = true">Update Details</button>
            <ModalComponent v-show="showModal" @close-modal="showModal = false">
                <div id ="content">
                    Leave blank if you are not updating that field
                    <br>
                    <br>
                    New Email:
                    <input v-model = "newemail" placeholder="Enter new email">
                    <br> <br>
                    New Phone Number:
                    <input v-model = "newphoneno" placeholder="Enter new email">
                    <br> <br>
                    New Telegram Handle:
                    <input v-model = "newtelehandle" placeholder="Enter new email">
                    <br> <br>                  
                    <!--
                    New Password:
                    <input v-model = "newpassword" placeholder="Enter new password">
                    <br> <br>
                    -->
                    <button id = "update-profile" @click="updateProfileDetails"> Save </button>
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

<script setup> 
import {getCurrentUser} from "../lib/handlers/auth.js"
import {getListingById} from "../lib/handlers/listing.js"
import {getUserById, updateUserById} from "../lib/handlers/user.js"
import ModalComponent from "@/components/ModalComponent.vue";
import {useAuthStore} from "@/stores/authStore";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue"

const showModal = ref(false)
const {user} = storeToRefs(useAuthStore());
const currUserDetails = ref();
const newemail = ref()
const id = ref()
const listings = ref()
const newphoneno = ref()
const newtelehandle = ref()

const getCurrUserDetails = async() => {
    currUserDetails.value = await getUserById(user.value.id);
}

onMounted( async() => {
    await getCurrUserDetails();
    id.value = user.value.id
    //listings.value = getListingById(String(id.value))
    //console.log(listings)
    console.log(currUserDetails.value)
}
)

const updateProfileDetails = async() => {
    if (newtelehandle.value != "") {
        updateTelegramHandle();
    }
    if (newphoneno.value != "") {
        updatePhoneNumber();
    }
    if (newemail.value != "") {
        updateEmail();
    }
}

const updatePhoneNumber = async () => {
    console.log(newphoneno.value)
    console.log(user.value.id)
    updateUserById(String(id.value), { phoneNumber : newphoneno.value })
    newphoneno.value = ""
    showModal.value = false
    //check for valid phone eg. len = 8, all integer, 
}

const updateTelegramHandle = async() => {
    console.log(newtelehandle.value)
    console.log(user.value.id)
    updateUserById(String(id.value), { telegramHandle : newtelehandle.value })
    showModal.value = false
    newtelehandle.value = ""
    //checks?
}

const updateEmail =  async() => {
    console.log(newemail.value)
    console.log(user.value.id)
    updateUserById(String(id.value), { email : newemail.value })
    showModal.value = false
    newemail.value = ""
    //check for valid email eg contain .com
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
