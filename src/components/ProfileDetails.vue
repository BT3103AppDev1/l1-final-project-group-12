<template>

<br>
    <div class = "outer-details"> 

        <div class = "details">
            <h1>Profile Details </h1>
            <br>
            <!--Email: {{email}}
            <br><br>
            -->
            phoneNumber: {{phonenum}}
            <br><br>    
            telegramHandle: {{telegramHandle}}
            <br><br>
            <button @click="showModal = true">Update Details</button>
            <ModalComponent v-show="showModal" @close-modal="showModal = false">
                <div id ="content">
                    <h3> Update Profile Details</h3>
                    <br>
                    <br>
                    <!--
                    New Email:
                    <input v-model = "newemail" placeholder="Enter new email">
                    <br> <br>
                    -->
                    New Phone Number:
                    <input type = "number" v-model = "newphoneno" placeholder="Enter new phone number">
                    <br> <br>
                    New Telegram Handle:
                    <input v-model = "newtelehandle" placeholder="Enter new telegram handle">
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

        <div class = "details" v-if="isTutor">
            <h1> Tutor Details </h1>
            <br>
            Education: {{education}}
            <br><br>
            Experience: {{experience}}
            <br> <br>
            <button @click="showModal2 = true" id = "updateTutorButton"> Update details </button>
            <br> <br>
            <ModalComponent v-show="showModal2" @close-modal="showModal2 = false">
                <div id ="content">
                    <h3> Update Tutor Details </h3>
                    <br>
                    <br>
                    <div id="qualification">
                    <label for="qualification">Highest education</label><br />
                    <select v-model = "newedu" id="qualification1" name="qualification">
                        <option value="secondary">Secondary</option>
                        <option value="post-secondary">Post-Secondary</option>
                        <option value="Diploma/Professional Qualification">Diploma/Professional Qualification</option>
                        <option value="University">University</option>
                    </select>
                    </div>
                    <br> <br>
                    New Experience:
                    <input v-model = "newexp" placeholder="Enter years of experience">
                    <br> <br>                  
                    <!--
                    New Password:
                    <input v-model = "newpassword" placeholder="Enter new password">
                    <br> <br>
                    -->
                    <button id = "update-tutor" @click="updateTutorDetails"> Save </button>
                </div>
            </ModalComponent>

                
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
import {getUserById, updateUserById, updateTutorProfileById} from "../lib/handlers/user.js"
import ModalComponent from "@/components/ModalComponent.vue";
import {useAuthStore} from "@/stores/authStore";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue"
import { useToast, TYPE } from "vue-toastification";

const toast = useToast()

const showModal = ref(false) //profile
const showModal2 = ref(false) //tutor
const {user} = storeToRefs(useAuthStore());
const currUserDetails = ref();
const newemail = ref()
const id = ref()
const listings = ref()
const newphoneno = ref()
const newtelehandle = ref()
const email = ref()
const phonenum = ref()
const telegramHandle = ref()
const isTutor = ref()
const newedu = ref()
const newexp = ref()
const education = ref()
const experience = ref()


onMounted( async() => {
    let user5 = await getCurrentUser()
    console.log(user5)
    id.value = user5.uid
    let user6= await getUserById(id.value)
    console.log(user6)
    email.value = user5.email
    phonenum.value = user6.phoneNumber
    telegramHandle.value = user6.telegramHandle
    isTutor.value = user6.isTutor
    education.value = user6.education
    experience.value = user6.experience
    //listings.value = getListingById(String(id.value))
    //console.log(listings)
    console.log(currUserDetails.value)
    newemail.value = ""
    newtelehandle.value = telegramHandle.value
    newphoneno.value = phonenum.value
    newedu.value = education.value
    newexp.value = experience.value
}
)

const updateProfileDetails = async() => {


        if (newphoneno.value.toString().length == 8) {
            if (newtelehandle.value.toString().length >=5) {
                updatePhoneNumber();
                updateTelegramHandle();
                showModal.value = false
                toast("Profile Details saved!", {
                    type: TYPE.SUCCESS
                })
            } else {
                toast("Invalid telegram handle length, should be at least 5", {type : TYPE.ERROR})
            }
/*
            if (newemail.value != "") {
                updateEmail();
            }   
            */
        } else {
                toast("Invalid phone length, should be of length 8", {
                    type: TYPE.ERROR
                })
        }
}

const updateTutorDetails = async() => {

    if (newexp.value =="") {
        toast("Experience field empty", {
                    type: TYPE.ERROR
                })

    } else {
        if (newedu.value != "") {   
            updateEducation();
            
        }

        if (newexp.value !="") {
            updateExperience();
        }

        showModal2.value = false
        toast("Tutor details saved!", {
                    type: TYPE.SUCCESS
                })
    }
}

const updatePhoneNumber = async () => {
    /*
    console.log(newphoneno.value)
    console.log(user.value.id)
    console.log(typeof(newphoneno.value))
    */
    updateUserById(String(id.value), { phoneNumber : newphoneno.value })
    phonenum.value = newphoneno.value
    //newphoneno.value = ""

    //check for valid phone eg. len = 8, all integer, 
}

const updateTelegramHandle = async() => {
    /*
    console.log(newtelehandle.value)
    console.log(user.value.id)
    */
    updateUserById(String(id.value), { telegramHandle : newtelehandle.value })
    telegramHandle.value = newtelehandle.value
    //newtelehandle.value = ""
    //checks?
}

const updateEmail =  async() => {
    /*
    console.log(newemail.value)
    console.log(user.value.id)
    */
    updateUserById(String(id.value), { email : newemail.value })
    email.value = newemail.value
    //newemail.value = ""
    //check for valid email eg contain .com
}

const updateEducation =  async() => {
    /*
    console.log(newedu.value)
    console.log(user.value.id)
    */
    updateTutorProfileById(String(id.value), { education : newedu.value })
    education.value = newedu.value
    //newedu.value = ""
}

const updateExperience =  async() => {
    /*
    console.log(newexp.value)
    console.log(user.value.id)
    */
    updateTutorProfileById(String(id.value), { experience : newexp.value })
    experience.value = newexp.value
    //newexp.value = ""
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
