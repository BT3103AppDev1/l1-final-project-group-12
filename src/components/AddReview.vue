<template>
    <form>
        <div class="parent">
            <div id="tutor-details">
                <br>
                <div id="tutor-details-container">
                    <h2 id="tutor-name">{{ name }}</h2>
                    <br>
                    <p id="tutor-education">Education: {{ education }}</p>
                    <p id ="tutor-experience">Experience: {{ experience }} years</p>
                    <p id ="tutor-region">Region: {{ region }}</p>
                </div>
            </div>
            <div id="review-input-child">
                <br>
                <textarea type="text" id="review-input" v-model="reviewinput" placeholder="Write your review here" rows="3"
                    required> </textarea>
            </div>
            <div id="rating-input-child">
                <br>
                <div id="rating-container">
                    <br>
                    <label>RATING</label> <br>
                    <div class="parent">
                        <div class="child">
                            <input type="number" id="rating-input" maxlength="1" oninput="this.value = this.value.slice(0, 1); validity.valid || (value='');" onpaste="return false" min="0" max="5" v-model="ratinginput"
                                required />
                        </div>
                        <div class="child">
                            <h2 id="rate-number">/5</h2>
                        </div>
                    </div>
                    <br>
                </div>
                <button type="button" @click="submitReview">Submit Review</button>
            </div>
        </div>
    </form>
</template>

<script>
import { ref } from "vue";
import { useToast, TYPE } from "vue-toastification";
import { getCurrentUser } from "../lib/handlers/auth.js";
import { createReview } from "@/lib/handlers/review";
import { getAllTutors } from "@/lib/handlers/user";


const toast = useToast()
const url = window.location.href;
const parts = url.split('/');
const tutorid = parts[parts.length - 1];



const reviewFields = ref({
    dateCreated: new Date(),
    body: "",
    rating: "",
    tutorId: tutorid,
    reviewerId: "",
});

const tutordetails = ref({
    name: "",
    education:"",
    experience:""
})

const tutors = await getAllTutors()
let reviewed_tutor = ""
for (let tutor in tutors){
    if (tutors[tutor]['id'] == tutorid) {
        reviewed_tutor = tutors[tutor]
        break
    }
}
tutordetails.value.name = reviewed_tutor['telegramHandle']
tutordetails.value.education = reviewed_tutor['education']
tutordetails.value.experience = reviewed_tutor['experience']
tutordetails.value.region = reviewed_tutor['region']

export default {
    data() {
        return{
            name: tutordetails.value.name,
            education: tutordetails.value.education,
            experience: tutordetails.value.experience,
            region: tutordetails.value.region
        }
    },
    methods: {
        async submitReview() {
            const bodyValue = document.querySelector("#review-input").value;
            const ratingValue = document.querySelector("#rating-input").value;
            const user = await getCurrentUser()

            if (bodyValue == "" || ratingValue == "") {
                toast("Missing details", {
                    type: TYPE.ERROR
                })
            } else if (ratingValue < 0 || ratingValue > 5) {
                toast("Select a rating between 0 and 5", {
                    type: TYPE.ERROR
                })
            } else if (tutorid == user.uid) {
                toast("Can't review yourself! Get others to review you", {
                    type: TYPE.ERROR
                })
            } else {
                reviewFields.value.body = bodyValue;
                reviewFields.value.rating = ratingValue;
                reviewFields.value.reviewerId = user.uid;
                try {
                    createReview(reviewFields.value)
                    console.log(reviewFields.value)
                    toast("Review Submitted!", {
                        type: TYPE.SUCCESS
                    })
                    this.$emit("reviewAdded")
                } catch (e) {
                    console.error("Error adding document: ", e);
                    toast("Oops! Something went wrong...", {
                        type: TYPE.ERROR
                    })
                }
            }
        }
    },
}
</script>

<style scoped>
.parent {
    display: flex;
    justify-content: center;
}

.child {
    margin-left: 5px;
    margin-right: 5px;
}

#tutor-details {
    flex: 1;
    margin-left: 3em;
}

#tutor-details-container {
    border-radius: 16px;
    background-color: white;
    padding-top: 1em;
    padding-right: 1em;
    padding-bottom: 1em;
    padding-left: 2em;
}

#review-input-child {
    flex: 2;
    margin-left: 3em
}

#rating-input-child {
    flex: 1;
    text-align: center;
    min-width: 120px;
    margin-right: 3em
}

#rating-container {
    border-radius: 16px;
    background-color: white;
}

textarea {
    width: 80%;
    height: 90%;
    color: black;
    font-size: 14px;
    border-radius: 16px;
    /* margin: 10px; */
    border-style: none;
    text-indent: 10px;
    padding-top: 10px;
    resize: none;
}

label {
    font-weight: bold;
    font-size: 1em;
}

input {
    background-color: #f6f5f6;
    height: 2em;
    width: 2em;
    font-size: 1.5em;
    font-weight: bold;
    color: #ff9040;
    border-radius: 16px;
    /* margin: 10px; */
    border-style: none;
    text-indent: 10px;
    text-align: center;
}

#rate-number {
    font-size: 1.5em;
    font-weight: bold;
    margin-top: 10px;
}

button {
    background-color: #ff9040;
    width: 100%;
    height: 3em;
    color: white;
    font-size: 14px;
    border-radius: 16px;
    margin-top: 20px;
    border-style: none;
    cursor: pointer;
    min-width: 120px;
}
</style>