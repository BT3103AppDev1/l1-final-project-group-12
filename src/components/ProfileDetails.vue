<template>
    <br>
    <div class="outer-details">

        <div class="details">
            <h1>Profile Details </h1>
            <br>
            <!--Email: {{email}}
            <br><br>
            -->
            Phone Number: {{ phonenum }}
            <br><br>
            Telegram Handle: {{ telegramHandle }}
            <br><br>
            <button @click="showModal = true">Update Details</button>
            <ModalComponent v-show="showModal" @close-modal="showModal = false">
                <div id="content">
                    Leave blank if you are not updating that field
                    <br>
                    <br>
                    <!--
                    New Email:
                    <input v-model = "newemail" placeholder="Enter new email">
                    <br> <br>
                    -->
                    New Phone Number:
                    <input type="number" v-model="newphoneno" placeholder="Enter new phone number">
                    <br> <br>
                    New Telegram Handle:
                    <input v-model="newtelehandle" placeholder="Enter new telegram handle">
                    <br> <br>
                    <!--
                    New Password:
                    <input v-model = "newpassword" placeholder="Enter new password">
                    <br> <br>
                    -->
                    <button id="update-profile" @click="updateProfileDetails"> Save </button>
                </div>
            </ModalComponent>

            <br> <br>
        </div>
    </div>
    <br>
    <div class="outer-details">

        <div class="details" v-if="isTutor">
            <h1> Tutor Details </h1>
            <br>
            Education: {{ education }}
            <br><br>
            Experience: {{ experience }}
            <br> <br>
            <button @click="showModal2 = true" id="updateTutorButton"> Update details </button>
            <br> <br>
            <ModalComponent v-show="showModal2" @close-modal="showModal2 = false">
                <div id="content">
                    Leave blank if you are not updating that field
                    <br>
                    <br>
                    <div id="qualification">
                        <label for="qualification">Highest education</label><br />
                        <select v-model="newedu" id="qualification1" name="qualification">
                            <option value="none">Not changing</option>
                            <option value="secondary">Secondary</option>
                            <option value="post-secondary">Post-Secondary</option>
                            <option value="Diploma/Professional Qualification">Diploma/Professional Qualification</option>
                            <option value="University">University</option>
                        </select>
                    </div>
                    <br> <br>
                    New Experience:
                    <input v-model="newexp" placeholder="Enter years of experience">
                    <br> <br>
                    <!--
                    New Password:
                    <input v-model = "newpassword" placeholder="Enter new password">
                    <br> <br>
                    -->
                    <button id="update-tutor" @click="updateTutorDetails"> Save </button>
                </div>
            </ModalComponent>


        </div>
        <div class="details" v-else>
            <h1> Tutor Profile </h1>
            <br>
            To become a tutor, you must set up a tutor profile.
            <br><br>
            <button> Apply to be tutor (Replace with Bryan's create new tutor functionality) </button>
            <!-- to be repalced with bryan's create new tutor functionality -->
            <br> <br>
        </div>
    </div>
    <br>

    <div class="outer-details">
        <div class="details">
            <h1> Your Listings </h1>
            <br>

        </div>
    </div>
</template>

<script setup>
import { getCurrentUser } from "../lib/handlers/auth.js"
import { getListingById } from "../lib/handlers/listing.js"
import { getUserById, updateUserById, updateTutorProfileById } from "../lib/handlers/user.js"
import ModalComponent from "@/components/ModalComponent.vue";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue"
import { useToast, TYPE } from "vue-toastification";

const toast = useToast()

const showModal = ref(false) //profile
const showModal2 = ref(false) //tutor
const { user } = storeToRefs(useAuthStore());
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


onMounted(async () => {
    let user5 = await getCurrentUser()
    console.log(user5)
    id.value = user5.uid
    let user6 = await getUserById(id.value)
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

const updateProfileDetails = async () => {

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
            toast("Please use a valid phone number!", {
            type: TYPE.ERROR
          })
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

const updateTutorDetails = async () => {
    if (newedu.value != "") {
        if (newedu.value != "none") {
            updateEducation();
        }
    }
    if (newexp.value != "") {
        updateExperience();
    }


}

const updatePhoneNumber = async () => {
    /*
    console.log(newphoneno.value)
    console.log(user.value.id)
    console.log(typeof(newphoneno.value))
    */
    updateUserById(String(id.value), { phoneNumber: newphoneno.value })
    phonenum.value = newphoneno.value
    newphoneno.value = ""

    //check for valid phone eg. len = 8, all integer, 
    //if checks, remember to integrate the toast!
    toast("Updated Phone Number!", {
        type: TYPE.SUCCESS
    })
}

const updateTelegramHandle = async () => {
    /*
    console.log(newtelehandle.value)
    console.log(user.value.id)
    */
    updateUserById(String(id.value), { telegramHandle: newtelehandle.value })
    telegramHandle.value = newtelehandle.value
    newtelehandle.value = ""
    //checks?
    //if checks, remember to integrate the toast!
    toast("Updated Telegram!", {
        type: TYPE.SUCCESS
    })
}

const updateEmail = async () => {
    /*
    console.log(newemail.value)
    console.log(user.value.id)
    */
    updateUserById(String(id.value), { email: newemail.value })
    email.value = newemail.value
    newemail.value = ""
    //check for valid email eg contain .com
    //if checks, remember to integrate the toast!
    toast("Updated Email!", {
        type: TYPE.SUCCESS
    })
}

const updateEducation = async () => {
    /*
    console.log(newedu.value)
    console.log(user.value.id)
    */
    updateTutorProfileById(String(id.value), { education: newedu.value })
    education.value = newedu.value
    newedu.value = ""
    //if checks, remember to integrate the toast!
    toast("Updated Education!", {
        type: TYPE.SUCCESS
    })
}

const updateExperience = async () => {
    /*
    console.log(newexp.value)
    console.log(user.value.id)
    */
    updateTutorProfileById(String(id.value), { experience: newexp.value })
    experience.value = newexp.value
    newexp.value = ""
    //if checks, remember to integrate the toast!
    toast("Updated Experience!", {
        type: TYPE.SUCCESS
    })
}



</script>


<style scoped>
.outer-details {
    display: flex;
    justify-content: center;
}


.details {
    width: 50em;
    background-color: white;
    border-radius: 16px;
    padding: 2em;
}

button {
    background: var(--tent-orange);
    color: white;
    border: none;
    font-size: 1rem;
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 1rem;
    cursor: pointer;
}

button:hover {
    background: rgb(220, 120, 66);
    transition: background 150ms;
}

input {
    background-color: #f6f5f6;
    width: 60%;
    height: 40px;
    color: black;
    font-size: 14px;
    border-radius: 16px;
    /* margin: 10px; */
    border-style: none;
    text-indent: 10px;
}
</style>
