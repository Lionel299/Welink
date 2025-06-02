<template>

   <body>
      <div class="home">
         <div class="navbar">
            <div class="logo">
               <img src="./Image.png" alt="">
            </div>
            <div class="links">
               <a href="">Home</a>
               <a href="">About Us</a>
               <a href="">Contact Us</a>
               <a href="">Waitinglist</a>
            </div>
            <div class="btn">
               <button>Download App</button>
            </div>
         </div>
      </div>
   </body>

</template>

<script></script>

<style>

*{
   margin: 0;
   padding: 0;
}

body{
   background-color: white;
}
.navbar{
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-around;
   background-color: white;
}
img{
   height: 120px;
   width: 240px;
}

.links{
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   gap: 24px;
}
a{
   color: rgb(94, 203, 243);
   text-decoration: none;
}


button{
   padding: 12px;
   background-color: rgb(94, 203, 243);
   color: white;
   border: none;
   width: fit-content;
   border-radius: 8px;
}
</style>