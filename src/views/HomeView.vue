<template>
  <div id="background-image">
    <nav>
      <router-link to="/auth">Sign In/Up</router-link>
    </nav>
    <div id="container">
      <h1>Tent</h1>
    </div>
  </div>
</template>

<style scoped>
#background-image {
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),
    url("../assets/tuitionimage.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  justify-content: center;
}

nav {
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: end;
  box-sizing: border-box;
  padding: 1.5rem 1.5rem 0 0;
}

nav a {
  color: white;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline 2px;
}

#container {
  display: flex;
  width: 50%;
  justify-content: center;
  margin-top: 15%;
  padding: 3rem;
  color: white;
}

#container h1 {
  font-size: 5rem;
}
</style>
