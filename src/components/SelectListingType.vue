<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modal">
        <h6 class="title">I am a ....</h6>

        <button @click="$emit('switch-student-modal')">
            <h6 class="btn-title">Student</h6>
            <p>looking for a tutor</p>
        </button>

        <button>
            <h6 class="btn-title">Tutor</h6>
            <p>looking for a student</p>
        </button>

      </div>
      <div class="close" @click="$emit('close-modal')">
        <img class="close-img" src="src\assets\close-icon.png" alt="" />
      </div>
    </div>
</template>

<script>
export default {};
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
  opacity: 90%;
}

.modal {
  text-align: center;
  background-color: white;
  height: 60%;
  width: 50%;
  margin-top: 5%;
  padding: 60px 0;
  border-radius: 20px;
  min-width: 500px;
}
.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
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
</style>