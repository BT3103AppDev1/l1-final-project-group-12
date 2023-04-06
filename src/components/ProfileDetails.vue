<template>

<br>
    <div class = "outer-details"> 

        <div class = "details">
            <h1> Profile Details </h1>
            <br>
            <!--Email: {{email}}
            <br><br>
            -->
            Phone Number: {{phonenum}}
            <br><br>    
            Telegram Handle: {{telegramHandle}}
            <br><br>
            <button class ="update_Profile_btn" @click="showModal = true">Update Details</button>
            <ModalComponent v-show="showModal" @close-modal="showModal = false">
                <div id ="content">
                   <h3> Leave blank if you are not updating that field</h3>
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
                    <h3>Leave blank if you are not updating that field</h3>
                    <br>
                    <br>
                    <div id="qualification">
                    <label for="qualification">Highest education</label><br />
                    <select v-model = "newedu" id="qualification1" name="qualification">
                        <option value="none">Not changing</option>
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
                    <div class="modal-footer">
                        <button type="button" class="button" @click=" updateTutorDetails">Save</button>
                    </div>
            
                </div>
            </ModalComponent>
        </div>
        <div class = "details" v-else>
            <h1> Tutor Profile </h1>
            <br>
            To become a tutor, you must set up a tutor profile.
            <br><br>
            <button class="tutor_apply_btn"> Apply to be tutor (Replace with Bryan's create new tutor functionality) </button> <!-- to be repalced with bryan's create new tutor functionality -->
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
    newtelehandle.value = ""
    newphoneno.value = ""
    newedu.value = ""
    newexp.value = ""
}
)

const updateProfileDetails = async() => {

    if (newphoneno.value != "") {
        if (newphoneno.value.toString().length == 8) {
            updatePhoneNumber();
            if (newtelehandle.value != "") {
                updateTelegramHandle();
            }
            if (newemail.value != "") {
                updateEmail();
            }   
        } else {
            console.log("number not len 8, tele handle wont be processed as well")
            //show fail toast
        }
    } else {
        if (newtelehandle.value != "") {
                updateTelegramHandle();
            }
            if (newemail.value != "") {
                updateEmail();
            }   
    }
}

const updateTutorDetails = async() => {
    if (newedu.value != "") {   
        if (newedu.value != "none"){
            updateEducation();
        }
    }
    if (newexp.value !="") {
        updateExperience();
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
    newphoneno.value = ""

    //check for valid phone eg. len = 8, all integer, 
}

const updateTelegramHandle = async() => {
    /*
    console.log(newtelehandle.value)
    console.log(user.value.id)
    */
    updateUserById(String(id.value), { telegramHandle : newtelehandle.value })
    telegramHandle.value = newtelehandle.value
    newtelehandle.value = ""
    //checks?
}

const updateEmail =  async() => {
    /*
    console.log(newemail.value)
    console.log(user.value.id)
    */
    updateUserById(String(id.value), { email : newemail.value })
    email.value = newemail.value
    newemail.value = ""
    //check for valid email eg contain .com
}

const updateEducation =  async() => {
    /*
    console.log(newedu.value)
    console.log(user.value.id)
    */
    updateTutorProfileById(String(id.value), { education : newedu.value })
    education.value = newedu.value
    newedu.value = ""
}

const updateExperience =  async() => {
    /*
    console.log(newexp.value)
    console.log(user.value.id)
    */
    updateTutorProfileById(String(id.value), { experience : newexp.value })
    experience.value = newexp.value
    newexp.value = ""
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
border-radius: 10px;
overflow: auto;
padding-left: 10px;
padding-top: 10px;
background-color:  #f6f5f6;

}
.update_Profile_btn {
    background-color: #ff9040;
    width: 25%;
    height: 3em;
    color: white;
    font-size: 14px;
    border-radius: 16px;
    margin-top: 20px;
    border-style: none;
    cursor: pointer;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.tutor_apply_btn {
    background-color: #ff9040;
    width:45%;
    height: 4em;
    color: white;
    font-size: 14px;
    border-radius: 16px;
    margin-top: 20px;
    border-style: none;
    cursor: pointer;
    display: block;
    margin-left: auto;
    margin-right: auto;

}
#update-profile {
    background-color: #ff9040;
    width:40%;
    height: 3em;
    color: white;
    font-size: 14px;
    border-radius: 16px;
    margin-top: 10px;
    border-style: none;
    cursor: pointer;
    display: block;
    margin-left: auto;
    margin-right: auto;

}


</style>
