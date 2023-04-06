<template>
    <form>
        <div class="parent">
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
                            <input type="number" maxlength="1" min="0" max="5" v-model="ratinginput" required />
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
import { useToast, TYPE } from "vue-toastification";

const toast = useToast()

export default {
methods: {
    async submitReview() {
        try {
          toast("Review Submitted!", {
            type: TYPE.SUCCESS
          })
        } catch (e) {
          console.error("Error adding document: ", e);
          toast("Oops! Something went wrong...", {
            type: TYPE.ERROR
          })
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