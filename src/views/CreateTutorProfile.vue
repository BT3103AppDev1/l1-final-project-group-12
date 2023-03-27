<script setup>
import ModalComponent from "@/components/ModalComponent.vue";
import { ref } from "vue";
import updateTutorProfileById from "@/lib/handlers/user.js"

const showModal = ref(false);

function saveTutorProfile() {
  // fetches all the inputs and stores them as variables to be pushed to firebase
  // *backend not yet functional, imported updateTutorProfileById with fields filled out, missing user id*
  let name = document.getElementById("name1").value

  let gender = document.getElementById("gender1").value

  let qualification = document.getElementById("qualification1").value

  // checkbox options for subjects taught, returns a boolean for if the option was checked
  const subjects = []
  let english = document.getElementById("english").checked
  if (english) {
    levels.push("English")
  }
  let math = document.getElementById("math").checked
  if (math) {
    levels.push("Math")
  }
  let science = document.getElementById("science").checked
  if (science) {
    levels.push("Science")
  }

  // checkbox options for levels taught, returns a boolean for if the option was checked
  const levels = []
  let primary = document.getElementById("primary").checked
  if (primary) {
    levels.push("Primary")
  }
  let secondary = document.getElementById("secondary").checked
  if (secondary) {
    levels.push("Secondary")
  }
  let jc = document.getElementById("jc").checked
  if (jc) {
    levels.push("Junior College")
  }

  let location = document.getElementById("location1").value

  let contact = document.getElementById("contact1").value

  let tele = document.getElementById("tele1").value

  // alert("Your name is: " + name + "\nYour gender is: " + gender)

  updateTutorProfileById(id, {
    isTutor : true,
    education : qualification,
    levels : levels,
    subjects : subjects,
    region : location
  })
  showModal.value = false
}
</script>

<template>
  <p>Tutor Profile Modal Preview</p>
  <p>Note: no backend yet, only fetches input values as variables</p>
  <!-- <button @click="showModal = true">show modal</button>
  <ModalComponent v-show="showModal" @close-modal="showModal = false">
    <div id="content">
      <h1>Example title</h1>
      <p>example paragraph here</p>
      <button>example button</button>
    </div>
  </ModalComponent> -->
  <button @click="showModal = true">show create tutor profile modal</button>

  <ModalComponent v-show="showModal" @close-modal="showModal = false">
    <div id="content">

      <!-- modal header -->
      <header class="modal-header">
          <slot name="header">
            Set up tutor profile
          </slot>
      </header>
      
      <!-- modal body -->
      <section class="modal-body">
        <slot name ="form">
          <form>
            <!-- input box for name of tutor -->
            <div id="name">
              <label for="name">Name</label><br>
              <input type="text" id="name1" name="name" placeholder="Name"><br>
            </div>
            <!-- dropdown selection for gender of tutor -->
            <div id="gender">
              <label for="gender">Gender</label><br>
              <select id="gender1" name="gender">
                <option value="none">Select a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <br>
            <!-- dropdown selection for highest qualification -->
            <div id="qualification">
              <label for="qualification">Highest qualification</label><br>
              <select id="qualification1" name="qualification">
                <option value="none">Highest qualification</option>
                <option value="secondary">Secondary</option>
                <option value="post-secondary">Post-Secondary</option>
                <option value="secondary">Diploma/Professional Qualification</option>
                <option value="post-secondary">University</option>
              </select>
            </div>
            <!-- checkbox for subjects taught -->
            <div id="subjects">
              <label for="subjects">Subjects teaching</label><br>
              <form action="/action_page.php">
                <input type="checkbox" id="english" name="english" value="english">
                <label for="english"> English</label><br>
                <input type="checkbox" id="math" name="math" value="math">
                <label for="math"> Mathematics</label><br>
                <input type="checkbox" id="science" name="science" value="science">
                <label for="science"> Science</label><br><br>
              </form>
            </div>
            <br>
            <!-- checkbox for levels taught -->
            <div id="levels">
              <label for="levels">Levels taught</label><br>
              <form action="/action_page.php">
                <input type="checkbox" id="primary" name="primary" value="primary">
                <label for="primary"> Primary</label><br>
                <input type="checkbox" id="secondary" name="secondary" value="secondary">
                <label for="secondary"> Secondary</label><br>
                <input type="checkbox" id="jc" name="jc" value="jc">
                <label for="jc"> Junior College</label><br><br>
              </form>
            </div>
            <!-- input box for location of tutor -->
            <div id="location">
              <label for="location">Location</label><br>
              <input type="text" id="location1" name="location" placeholder="Location"><br>
            </div>
            <br>
            <!-- input box for contact number -->
            <div id="contact">
              <label for="contact">Contact Number</label><br>
              <input type="text" id="contact1" name="contact" placeholder="Contact"><br>
            </div>
            <!-- input box for telegram @ -->
            <div id="tele">
              <label for="tele">Telegram</label><br>
              <input type="text" id="tele1" name="tele" placeholder="Telegram @"><br>
            </div>
          </form>
        </slot>
      </section>

      <!-- modal footer -->
      <footer class="modal-footer">
        <!-- <button type="button" class="create-profile-button" @click="showModal = false"> -->
        <button type="button" class="create-profile-button" @click=saveTutorProfile>
          Create Tutor Profile
        </button>
      </footer>
    </div>
  </ModalComponent> 
</template>

<style scoped>
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
.modal-header, .modal-body {
  padding-left: 3rem;
  padding-right: 3rem;
}

#name, #name1, #contact, #contact1 {
  float:left; 
  margin-right: 80px;
  margin-bottom: 50px;
  border-radius: 8px;
  width:230px; 
  height: 20px;
  padding: 2px;
}

#gender, #gender1 {
  float:left;
  border-radius: 8px;
  margin-bottom: 50px;  
  width:200px;
  height: 28px;
  padding: 2px;
}

#qualification, #qualification1 {
  float:left;
  margin-right: 80px;
  margin-bottom: 50px;
  border-radius: 8px;
  width:230px; 
  height: 28px;
  padding: 2px;
}

#subjects {
  float:left;
  border-radius: 8px;
  margin-bottom: 60px;
  width:200px;
  height: 28px;
  padding: 2px;
}
#levels {
  float:left;
  margin-right: 80px;
  margin-bottom: 70px;
  border-radius: 8px;
  width:230px; 
  height: 28px;
  padding: 2px;
}

#location, #location1 , #tele, #tele1 {
  float:left;
  margin-bottom: 50px;
  border-radius: 8px;
  width:230px; 
  height: 20px;
  padding: 2px;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: center;
  display: grid;  
}
.create-profile-button, .create-profile-button:hover {
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
