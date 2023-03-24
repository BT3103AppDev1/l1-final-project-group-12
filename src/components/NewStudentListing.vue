<template>
  <div class="modal-overlay">
    <form class="modal">
      <h6 class="title">I am a student, looking for a tutor.</h6>
      <div class="modal-body">
        <div class="modal-child">
          <div id="label1">
            <label for="level">Level</label> <br /><br />
            <select v-model="selected" id="level" required>
              <option>Primary</option>
              <option>Secondary</option>
              <option>Junior College</option>
              <option>Others</option>
            </select>
          </div>
          <br />

          <div id="label3">
            <label for="Location">Location</label> <br /><br />
            <select v-model="selected" id="location" required>
              <option>North</option>
              <option>South</option>
              <option>East</option>
              <option>West</option>
              <option>Central</option>
              <option>Others</option>
            </select>
          </div>
          <br />
        </div>

        <div class="modal-child">
          <div id="label2">
            <label for="subject">Subject</label> <br /><br />
            <select v-model="selected" id="subject" required>
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
          </div>
          <br />

          <div id="label4">
            <label for="Rates">Rates</label> <br /><br />
            <input
              type="number"
              id="rates"
              min="0"
              v-model="rates"
              placeholder="Enter your rates"
              required
            />
          </div>
        </div>
      </div>

      <div class="modal-description">
        <div id="description">
          <label for="Description">Description and contact method</label><br /><br />
          <textarea
            type="text"
            id="desc"
            class="modal-description-input"
            v-model="description"
            placeholder="Description and contact method"
            rows="4"
            required
          >
          </textarea>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="button" @click="savestudentlisting">Add Listing</button>
      </div>
    </form>

    <div class="close" @click="$emit('close-modal')">
      <img class="close-img" src="src\assets\close-icon.png" alt="" />
    </div>
  </div>
</template>

<script>
import { db } from "../lib/firebase-config";
import { collection, addDoc } from "firebase/firestore";

export default {
  methods: {
    // save listing to firebase
    async savestudentlisting() {
      let level = document.getElementById("level").value;
      let subject = document.getElementById("subject").value;
      let location = document.getElementById("location").value;
      let rates = document.getElementById("rates").value;
      let desc = document.getElementById("desc").value;

      const data = {
        level: level,
        subject: subject,
        location: location,
        rates: rates,
        description: desc,
        dateCreated: new Date(),
        // tutorId:
      };

      try {
        const docRef = await addDoc(collection(db, "student-listing"), data);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  height: fit-content;
  height: fit-content;
  margin-top: 5%;
  padding: 60px 0;
  border-radius: 20px;
  min-width: 500px;
}

.modal-body {
  display: flex;
  margin-top: 5%;
}

.modal-child {
  flex: 1;
}

.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.title {
  font-weight: bold;
  font-size: 28px;
  color: #ff9040;
  text-align: left;
  margin-left: 60px;
  margin-right: 60px;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

button {
  background-color: #ff9040;
  width: 40%;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 20px;
  border-style: none;
  cursor: pointer;
  margin-left: 20px;
  margin-right: 20px;
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

.modal-description-input {
  background-color: #f6f5f6;
  width: 80%;
  color: black;
  font-size: 14px;
  border-radius: 16px;
  /* margin: 10px; */
  border-style: none;
  text-indent: 10px;
  padding-top: 10px;
}

select {
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
