<template>
    <div class="modal-overlay">
      <div class="modal">
              <div class="close" @click="$emit('close-modal')"> 
         <img class="close-img" src="src\assets\close-icon.png" alt="" />
       </div> 
        <h2 class="title">Student Details</h2>
        <br><br>
        <img src = "/src/assets/empty_photo_user.png" id = "picture">
        <div id = content>
          <br>
          <h3 id ="rates"> Rates : <br> ${{data[4]}}/hr </h3>
          <h3> Education: {{ data[0] }} </h3>
          <h3> Subject: {{ data[1] }} </h3>
          <h3> Location: {{ data[2] }} </h3>
          <h3> Description: {{ data[3] }}</h3>
          <br>  
          <button id = "applyBN"> Apply to be Tutor </button>
        </div>
        
      </div>
      <div class="close" @click="$emit('close-modal')"> 
         <img class="close-img" src="src\assets\close-icon.png" alt="" />
       </div> 
    </div>
</template>

<script>

export default {
  name : 'IndividualListing',
  data() {
    return {
      test : "asd"
    }
  },
  props: {
      data : [String, String, String, String, Number]
  }
}
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
  opacity: 100%;
}

.modal {
  text-align: center;
  background-color: white;
  height: 30%;
  width: 40%;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
  min-width: 500px;
}
.close {
  margin: -6% 1% 0 16px;
  cursor: pointer;
  float:right
}

.close-img {
  width: 30px;
   
}

.check {
  width: 150px;
}

.title {
  font-weight: bold;
  font-size: 28px;
  color: #ff9040;
  text-align: left;
  margin-left: 60px;
}

.btn-title {
  font-weight: bold;
  font-size: 28px;
  margin: 20px 0;
  color: white;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

button {
  background-color: #ff9040;
  width: 40%;
  height: 80%;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 20px;
  border-style: none;
  cursor: pointer;
  margin-left: 20px;
  margin-right: 20px;
}
#picture {
  float:left;
  margin-left : 5em;
}
#content{
  text-align: left;
  margin-left:15em;
}
#rates{
  float:right;
  margin-right: 5em;
  color:#ff9040;
  font-size: 200%
}
#applyBN{
  padding-top:1em;
  padding-bottom:1em;
  font-size : 150%;
  border-radius: 1em;

}

</style>