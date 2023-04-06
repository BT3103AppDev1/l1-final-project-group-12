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
            <button @click="showModal2 = true">show create tutor profile modal</button>
            <ModalComponent v-show="showModal2" @close-modal="showModal2 = false">
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
                <option value="none">Select a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <br />
            <!-- dropdown selection for highest qualification -->
            <div id="qualification">
              <label for="qualification">Highest qualification</label><br />
              <select id="qualification1" name="qualification" v-model="inputs.qualification">
                <option value="none">Highest qualification</option>
                <option value="secondary">Secondary</option>
                <option value="post-secondary">Post-Secondary</option>
                <option value="secondary">Diploma/Professional Qualification</option>
                <option value="post-secondary">University</option>
              </select>
            </div>
            <!-- checkbox for subjects taught -->
            <div id="subjects">
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
            <br />
            <!-- checkbox for levels taught -->
            <div id="levels">
              <label for="levels">Levels taught</label><br />
              <form action="/action_page.php">
                <input type="checkbox" id="primary" name="primary" value="primary" v-model="inputs.primary"/>
                <label for="primary"> Primary</label><br />
                <input type="checkbox" id="secondary" name="secondary" value="secondary" v-model="inputs.secondary"/>
                <label for="secondary"> Secondary</label><br />
                <input type="checkbox" id="jc" name="jc" value="jc" v-model="inputs.jc"/>
                <label for="jc"> Junior College</label><br /><br />
              </form>
            </div>
            <!-- input box for location of tutor -->
            <div id="location">
              <label for="location">Location</label><br />
              <input type="text" id="location1" name="location" placeholder="Location" v-model="inputs.location"/><br />
            </div>
            <br />
            <!-- input box for contact number -->
            <div id="contact">
              <label for="contact">Contact Number</label><br />
              <input type="text" id="contact1" name="contact" placeholder="Contact" v-model="inputs.contact"/><br />
            </div>
            <!-- input box for telegram @ -->
            <div id="tele">
              <label for="tele">Telegram</label><br />
              <input type="text" id="tele1" name="tele" placeholder="Telegram @" v-model="inputs.tele"/><br />
            </div>
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
// import TutorProfileModal from "@/components/TutorProfileModal.vue"
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { updateTutorProfileById } from "../lib/handlers/user.js";
import { useAuthStore } from "../stores/authStore.js";
import { useToast } from "vue-toastification";

export default {
    components: {
        ModalComponent,
    },
    data() {
        return {
            user : "",
            showModal : false,
            showModal2 : false,
            newemail: "",
            newpassword: "",
            inputs: {
                name: "",
                gender: "",
                qualification: "",
                english: "",
                math: "",
                science: "",
                primary: "",
                secondary: "",
                jc: "",
                location: "",
                contact: "",
                tele: ""
                },
            toast : useToast()
        }
    },
    async mounted(){
        let $vm = this;
        $vm.user = await getCurrentUser();
        let studentListing = await getListingById("student-listing", String($vm.user.id))
        console.log(studentListing); //set up listings to be done.
    },
    methods: {
        saveTutorProfile() {
            // fetches all the inputs and stores them as variables to be pushed to firebase
            let name = this.inputs.name
            // alert(name)

            let gender = this.inputs.gender;

            let qualification = this.inputs.qualification;

            // alert(this.inputs.value.english + "\n" + this.inputs.value.math)
            // console.log(this.inputs.value.math)
            // checkbox options for subjects taught, returns a boolean for if the option was checked
            const subjects = [];
            if (this.inputs.english) {
            subjects.push("English");
            }
            if (this.inputs.math) {
            subjects.push("Math");
            }
            if (this.inputs.science) {
            subjects.push("Science");
            }

            // checkbox options for levels taught, returns a boolean for if the option was checked
            const levels = [];
            if (this.inputs.primary) {
            levels.push("Primary");
            }
            if (this.inputs.secondary) {
            levels.push("Secondary");
            }
            if (this.inputs.jc) {
            levels.push("Junior College");
            }

            let location = this.inputs.location;

            let contact = this.inputs.contact;

            let tele = this.inputs.tele;

            updateTutorProfileById(this.user.id, {
                isTutor: true,
                education: qualification,
                levels: levels,
                subjects: subjects,
                region: location,
            });
            this.showModal2 = false;
            this.toast.success('Successfully updated tutor profile.', { timeout: 3000 });
        }
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

#content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* everything below is tutor profile css */
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
  height: 20px;
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
</style>
