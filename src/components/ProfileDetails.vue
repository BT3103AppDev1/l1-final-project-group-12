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
            <button class = "updatebn" @click="showModal = true">Update Details</button>
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
                    <button class = "updatebn"  @click="updateProfileDetails"> Save </button>
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
            <button class = "updatebn" @click="showModal2 = true" id = "updateTutorButton"> Update details </button>
            <br> <br>
            <ModalComponent v-show="showModal2" @close-modal="showModal2 = false">
                <div id ="content">
                    <h3> Update Tutor Details </h3>
                    <br>
                    <br>
                    <div>
                    <label for="qualification">Highest education</label><br />
                    <select v-model = "newedu" id="edulevel" name="qualification">
                        <option value="Secondary">Secondary</option>
                        <option value="Post-Secondary">Post-Secondary</option>
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
                        <button class = "updatebn" id = "update-tutor" @click="updateTutorDetails"> Save </button>
                </div>
            </ModalComponent>
        </div>
        <div class = "detail" v-else>
            <div class ="details">
            <h1> Tutor Profile </h1>
            <br>
            To become a tutor, you must set up a tutor profile.
            <br><br>
            <button class="createprofilebn" @click="showModal3 = true">Create Tutor Profile</button>
            <br><br>
            </div>
            <ModalComponent v-show="showModal3" @close-modal="showModal3 = false">
                <div id="content">
                <!-- modal header -->
                <header class="modal-header">
                    <slot name="header"> Set up tutor profile </slot>
                </header>

                <!-- modal body -->
                <section class="modal-body">
                    <slot name="form">
                    <form>
                        <!-- input box for name of tutor -->
                        <div id="name">
                        <label for="name">Name</label><br />
                        <input type="text" id="name1" name="name" placeholder="Name" v-model="inputs.name" /><br />
                        </div>
                        <!-- dropdown selection for gender of tutor -->
                        <div id="gender">
                        <label for="gender">Gender</label><br />
                        <select id="gender1" name="gender" v-model="inputs.gender">
                            <option value="">Select a gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        </div>
                        <br />
                        <!-- dropdown selection for highest qualification -->
                        <div id="qualification">
                        <label for="qualification">Highest qualification</label><br />
                        <select id="qualification1" name="qualification" v-model="inputs.qualification">
                            <option value="">Highest qualification</option>
                            <option value="Secondary">Secondary</option>
                            <option value="Post-secondary">Post-Secondary</option>
                            <option value="Diploma/Professional Qualification">Diploma/Professional Qualification</option>
                            <option value="University">University</option>
                        </select>
                        </div>
                        <!-- checkbox for subjects taught -->
                        <!-- <div id="subjects">
                        <label for="subjects">Subjects teaching</label><br />
                        <form action="/action_page.php">
                            <input type="checkbox" id="english" name="english" value="english" v-model="inputs.english"/>
                            <label for="english"> English</label><br />
                            <input type="checkbox" id="math" name="math" value="math" v-model="inputs.math"/>
                            <label for="math"> Mathematics</label><br />
                            <input type="checkbox" id="science" name="science" value="science" v-model="inputs.science"/>
                            <label for="science"> Science</label><br /><br />
                        </form>
                        </div>
                        <br /> -->
                        <!-- checkbox for levels taught -->
                        <!-- <div id="levels">
                        <label for="levels">Levels taught</label><br />
                        <form action="/action_page.php">
                            <input type="checkbox" id="primary" name="primary" value="primary" v-model="inputs.primary"/>
                            <label for="primary"> Primary</label><br />
                            <input type="checkbox" id="secondary" name="secondary" value="secondary" v-model="inputs.secondary"/>
                            <label for="secondary"> Secondary</label><br />
                            <input type="checkbox" id="jc" name="jc" value="jc" v-model="inputs.jc"/>
                            <label for="jc"> Junior College</label><br /><br />
                        </form>
                        </div> -->
                        <!-- dropdown for location of tutor -->
                        <div id="location">
                        <label for="location">Region</label><br />
                        <select id="location1" name="location" v-model="inputs.location">
                            <option value="">Select region</option>
                            <option value="North">North</option>
                            <option value="East">East</option>
                            <option value="West">West</option>
                            <option value="South">South</option>
                            <option value="Central">Central</option>
                        </select><br />
                        </div>
                        <br />
                        <!-- input box for contact number -->
                        <!-- <div id="contact">
                        <label for="contact">Contact Number</label><br />
                        <input type="text" id="contact1" name="contact" placeholder="Contact" v-model="inputs.contact"/><br />
                        </div> -->
                        <!-- input box for telegram @ -->
                        <!-- <div id="tele">
                        <label for="tele">Telegram</label><br />
                        <input type="text" id="tele1" name="tele" placeholder="Telegram @" v-model="inputs.tele"/><br />
                        </div> -->
                    </form>
                    </slot>
                </section>

                <!-- modal footer -->
                <footer class="modal-footer">
                    <button type="button" class="create-profile-button" @click="saveTutorProfile">
                    Create Tutor Profile
                    </button>
                </footer>
                </div>
            </ModalComponent>
            <br> <br>
        </div>
    </div>
    <br>

    <div class="outer-details">
        <div class="details">
            <h1> Your Listings </h1>
            <br>
            <div class = "perlisting" v-for = "item in listings"> 
                Type: Student Listing    
                <img class="close-img" style = "float:right" src="src\assets\close-icon.png" alt="" @click = "showCancelDetails([item.level, item.subject, item.location, item.description, item.rates,item.dateCreated.seconds])"/>
                <button style = "float:right" @click = "showListingDetailStudent([item.level, item.subject, item.location, item.description, item.rates,item.dateCreated.seconds])"> edit</button> <!-- NEED A EDIT ICON-->
                <br>
                Level: {{item.level}}
                <br>
                Subject: {{item.subject}}
                <br>
                Location: {{item.location}}
                <br>
                Description: {{item.description}}
                <br>
                Rates: {{item.rates}}
                <br>
            </div>

            <ModalComponent v-show = "showConfirmDelete" @close-modal = "showConfirmDelete = false">
                Are you sure you want to delete the listing?
                <br>
                Level: {{deleteDetails[0]}}
                <br>
                Subject: {{deleteDetails[1]}}
                <br>
                Location: {{deleteDetails[2]}}
                <br>
                Description: {{deleteDetails[3]}}
                <br>
                Rates: {{deleteDetails[4]}}
                <br><br>

                <button @click = "deleteListing(deleteDetails[5])"> Delete </button>
           
            </ModalComponent>

            <ModalComponent v-show="showIndividualListingModal" @close-modal="showIndividualListingModal = false">
            <div class = "perlisting">     
                Type: Student Listing
                <br>
                Level: <select v-model="newstulevel"  required>
                        <option>Primary</option>
                        <option>Secondary</option>
                        <option>Junior College</option>
                        <option>Others</option>
                        </select>
                <br>

                Subject: 
                <select v-model="newstusubject" required>
              <option>Biology</option>
              <option>Chinese Language</option>
              <option>Chemistry</option>
              <option>English</option>
              <option>Math</option>
              <option>Malay Language</option>
              <option>Physics</option>
              <option>Tamil Language</option>
              <option>Others</option>
            </select>
                <br>

                Location: 
                <select v-model="newstulocation"  required>
                <option>North</option>
                <option>South</option>
                <option>East</option>
                <option>West</option>
                <option>Central</option>
                <option>Others</option>
                </select>
                <br>
                Description: 
                <br>
                <textarea type="text"  v-model="newstudesc"
            placeholder="Description and contact method" rows="4" required>
                </textarea>
                <br>
                Rates: 
                <input type="number"  min="0" v-model="newsturates" placeholder="Enter your rates" required />
                <br>
                
            </div>
            <button @click = editStudentListing(listingDetailStudent[5]) > Save </button>
            </ModalComponent>
            <div class = "perlistings" v-for = "item in tutorlistings">
                Type: Tutor Listing
                <br>
                Level: {{item.level}}
                <br>
                Subject: {{item.subject}}
                <br>
                Location: {{item.location}}
                <br>
                Rates: {{item.rates}}
            </div>

                
        </div>
    </div>
</template>

<script setup> 
import {getCurrentUser} from "../lib/handlers/auth.js"
import {getAllListings, updateListingById, getListingById} from "../lib/handlers/listing.js"
import {getUserById, updateUserById, updateTutorProfileById} from "../lib/handlers/user.js"
import ModalComponent from "@/components/ModalComponent.vue";
import {useAuthStore} from "@/stores/authStore";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue"
import { useToast, TYPE } from "vue-toastification";
import {db} from "../lib/firebase-config.js"
import { documentId, getFirestore } from "firebase/firestore"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"


const toast = useToast()

const showModal = ref(false) //profile
const showModal2 = ref(false) //tutor
const showModal3 = ref(false) //create tutor profile modal
const {user} = storeToRefs(useAuthStore());
const currUserDetails = ref();
const newemail = ref()
const id = ref()
const listings = ref()
const tutorlistings = ref()
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
const showIndividualListingModal = ref(false)
const listingDetailStudent = ref([0,0,0,0,0,0]);
const newstulevel = ref()
const newstusubject = ref()
const newstulocation = ref()
const newstudesc = ref()
const newsturates = ref()
const showConfirmDelete = ref(false)
const deleteDetails = ref([0,0,0,0,0,0])

const inputs = ref({
  name: "",
  gender: "",
  qualification: "",
//   english: "",
//   math: "",
//   science: "",
//   primary: "",
//   secondary: "",
//   jc: "",
  location: ""
//   contact: "",
//   tele: ""
});

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
   //listings.value = await getListingById("student-listing", String(id.value))
    let array = []
    let allDocuments = await getAllListings("student-listing")
    allDocuments.forEach((docs) => {
        if (docs.UserID == id.value) {
            array.push(docs)
            //console.log(docs.dateCreated.seconds)
        }
    })  
    let array2 = []
    if (isTutor.value) {
        let allDocuments2 = await getAllListings("tutor-listing")
        allDocuments2.forEach((docs) => {
            if (docs.UserID == id.value) {
                array2.push(docs)
            }
        }) 

    }

    listings.value = array
    tutorlistings.value = array2
    //console.log(listings.value)
    newemail.value = email.value
    newtelehandle.value = telegramHandle.value
    newphoneno.value = phonenum.value
    newedu.value = education.value
    newexp.value = experience.value
}
)

const updateProfileDetails = async () => {


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
    updateUserById(String(id.value), { phoneNumber: newphoneno.value })
    phonenum.value = newphoneno.value
    //newphoneno.value = ""

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
    //newtelehandle.value = ""
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
    //newemail.value = ""
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
    //newedu.value = ""
}

const updateExperience = async () => {
    /*
    console.log(newexp.value)
    console.log(user.value.id)
    */
    updateTutorProfileById(String(id.value), { experience: newexp.value })
    experience.value = newexp.value
    //newexp.value = ""
}
const showListingDetailStudent = async (details) =>{
    listingDetailStudent.value = details
    console.log(details)
    newstulevel.value = details[0]
    newstusubject.value = details[1]
    newstulocation.value = details[2]
    newstudesc.value = details[3]
    newsturates.value = details[4]
    showIndividualListingModal.value = true
}

const showCancelDetails = async(details) => {
    deleteDetails.value = details
    showConfirmDelete.value= true
}

const  deleteListing = async (timeCreated) => {
    console.log(collection(db,"student-listing"))

    const querySnap = await getDocs(collection(db, "student-listing"));
    querySnap.forEach(async (x) => {
        let a = await getListingById("student-listing", x.id)
        if (a.dateCreated.seconds == timeCreated){          
            for (let i = 0, len = listings.value.length; i < len;i++){
                if(listings.value[i].dateCreated.seconds == timeCreated) {
                    listings.value.splice(i,1)
                    break

                } 
            }
            await deleteDoc(doc(db, "student-listing",x.id))
            showConfirmDelete.value = false
            toast("Listing deleted!", {
                    type: TYPE.SUCCESS
                })
        }
      
    //console.log(doc.id)
    //console.log(doc)
    });
  

}
const editStudentListing = async (timeCreated) => {
    for (let i = 0, len = listings.value.length; i < len;i++){
        if(listings.value[i].dateCreated.seconds == timeCreated) {
            console.log(timeCreated)
            console.log(listings.value[i])
            //updateListingById("student-listing", )
        } 
    }

}
function saveTutorProfile() {
  // fetches all the inputs and stores them as variables to be pushed to firebase
  // *backend not yet functional, imported updateTutorProfileById with fields filled out, missing user id*
  let name = inputs.value.name;

  let gender = inputs.value.gender;

  let qualification = inputs.value.qualification;

  // checkbox options for subjects taught, returns a boolean for if the option was checked
//   const subjects = [];
//   if (inputs.value.english) {
//     subjects.push("English");
//   }
//   if (inputs.value.math) {
//     subjects.push("Math");
//   }
//   if (inputs.value.science) {
//     subjects.push("Science");
//   }

  // checkbox options for levels taught, returns a boolean for if the option was checked
//   const levels = [];
//   if (inputs.value.primary) {
//     levels.push("Primary");
//   }
//   if (inputs.value.secondary) {
//     levels.push("Secondary");
//   }
//   if (inputs.value.jc) {
//     levels.push("Junior College");
//   }

  let location = inputs.value.location;

  updateTutorProfileById(String(id.value), {
    name: name,
    isTutor: true,
    gender: gender,
    education: qualification,
    region: location,
  });
  showModal3.value = false;
  toast.success('Successfully updated tutor profile.', { timeout: 3000 });
}



</script>


<style scoped>
.outer-details {
    display: flex;
    justify-content: center;
    
}


.details{
width  : 50em;
outline: 1px solid black;
border-radius: 10px;
text-align: center;
overflow: auto;
padding-left: 10px;
padding-top: 10px;
background-color:  #f6f5f6;
}

.updatebn, .createprofilebn {
    background-color: #ff9040;
    width: 40%;
    height: 3em;
    color: white;
    font-size: 14px;
    border-radius: 16px;
    border-style: none;
    cursor: pointer;
    display: block;
    margin-left: auto;
    margin-right: auto;
    min-width: 160px;

}

.perlisting,.perlistings{
    border: black solid 1px;
    margin-bottom: 3%;
    border-radius: 8px;
    text-align: center;
}
.perlisting{
    background-color: beige;
}
.perlistings{
    background-color: antiquewhite;
}



/* everything below is tutor profile modal css */
#content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.modal-header {
  font-weight: bold;
  font-size: 2rem;
  color: #ff9040;
  text-align: left;
  margin-left: 2rem;
  margin-bottom: 1rem;
}
.modal-header,
.modal-body {
  padding-left: 3rem;
  padding-right: 3rem;
}

#name,
#name1,
#contact,
#contact1 {
  float: left;
  margin-right: 80px;
  margin-bottom: 50px;
  border-radius: 8px;
  width: 230px;
  height: 20px;
  padding: 2px;
}

#gender,
#gender1 {
  float: left;
  border-radius: 8px;
  margin-bottom: 50px;
  width: 200px;
  height: 28px;
  padding: 2px;
}

#qualification,
#qualification1 {
  float: left;
  margin-right: 80px;
  margin-bottom: 50px;
  border-radius: 8px;
  width: 230px;
  height: 28px;
  padding: 2px;
}

#subjects {
  float: left;
  border-radius: 8px;
  margin-bottom: 60px;
  width: 200px;
  height: 28px;
  padding: 2px;
}
#levels {
  float: left;
  margin-right: 80px;
  margin-bottom: 70px;
  border-radius: 8px;
  width: 230px;
  height: 28px;
  padding: 2px;
}

#location,
#location1,
#tele,
#tele1 {
  float: left;
  margin-bottom: 50px;
  border-radius: 8px;
  width: 230px;
  height: 28px;
  padding: 2px;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: center;
  display: grid;
}
.create-profile-button,
.create-profile-button:hover {
  color: white;
  background: #ff9040;
  border: 1px solid #ff9040;
  border-radius: 2px;
  margin-top: 1rem;
  padding-top: 10px;
  padding-right: 40px;
  padding-bottom: 10px;
  padding-left: 40px;
  text-align: center;
  border-radius: 8px;
}

.create-profile-button:hover {
  background: darkorange;
  border: 1px solid darkorange;
}


label {
    text-align: left ;
    display: inline-block;

}

.close{
    text-align: right;
}

input,#edulevel {
  background-color: #f6f5f6;
  height: 40px;
  color: black;
  font-size: 14px;
  border-radius: 16px;
  border-style: none;
  text-indent: 10px;
}

</style>
