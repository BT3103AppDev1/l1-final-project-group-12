<template>
  <div id="background-image">
    <div id="container">
      <h1>Tent</h1>
      <div id="button-array">
        <button>Sign In</button>
        <button>Sign Up</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#background-image {
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url("../assets/tuitionimage.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  justify-content: center;
}

#container {
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  margin-top: 10%;
  padding: 3rem;
  color: white;
}

#container h1 {
  font-size: 10rem;
}

#button-array {
  width: 70%;
  margin-top: 7%;
  display: flex;
  justify-content: space-around;
}

#button-array button {
  background: inherit;
  background-color: rgb(100, 100, 100);
  border: none;
  padding: 1rem;
  border-radius: 1rem;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

#button-array button:hover {
  background-color: rgb(50, 50, 50);
  transition: 150ms;
}
</style>
