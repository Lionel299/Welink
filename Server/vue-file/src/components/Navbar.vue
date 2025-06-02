<template>

   <div class="navbar">
      <div class="logo">
         <img src="./Image.png" alt="">
      </div>
      <div class="buttons">
         <router-link to="/login"><button class="btn">Log in</button></router-link>
         <router-link to="/signup"><button class="btn2">Sign Up</button> </router-link>
      </div>
   </div>

</template>

<script setup>


</script>

<style>
* {
   margin: 0;
   padding: 0;
}

body {
   background-color: white;
}

.navbar {
   display: flex;
   flex-direction: row;
   align-items: center;
   gap: 760px;
   background-color: white;
   width: 100vw;
   height: 80px;
   position: sticky;
   top: 0;
   z-index: 1000;
}

img {
   height: 120px;
   width: 240px;
}

button {
   font-size: large;
}

button:hover {
   cursor: pointer;
}

.buttons {
   display: flex;
   flex-direction: row;
   gap: 32px;
   align-items: center;
}

.btn {
   border: none;
   background-color: white;
   color: rgb(67, 67, 67);
}

.btn:hover {
   color: rgb(0, 115, 255);
}

.btn2 {

   border: none;
   width: 96px;
   height: 48px;
   padding: 8px;
   color: white;
   background-color: rgb(0, 115, 255);
   border-radius: 16px;
}

.btn2:hover {
   background-color: rgb(0, 64, 255);
}
</style>