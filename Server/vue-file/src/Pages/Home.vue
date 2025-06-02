<template>
    <body>
        <section class="one">
            <div class="globe">
                <div class="col">
                    <div class="h">
                        <h1 style="color: white;">CONNECT TO WORKERS IN THE WORLD AND WORK TOGETHER ON YOUR
                            PROJECT</h1>
                    </div>
                    <div class="search">
                        <div class="choose">
                            <button class="find-provider" :class="{ active: current === 'a' }"
                                @click="current = 'a'">Find providers</button>
                            <button class="browse-jobs" :class="{ active: current === 'b' }"
                                @click="current = 'b'">Browse jobs</button>

                            <div class="content" v-if="current === 'a'">
                                <!-- Barre de recherche -->
                              <SearchBar />
                            </div>


                            <div class="provider" v-show="current === 'b'">
                                <!-- Contenu b simple -->
                                <h3>Find your dream job and integrate the community.</h3>
                                <button class="btn3">Apply as a provider</button>
                            </div>
                        </div>
                    </div>
                    <div class="p">
                        <p style="color: white; font-size: 20px;"><span>Welink</span> gives you the opportunity to work
                            with professionals in the numeric
                            milieu on your project. </p>
                    </div>
                </div>
                <div class="r" style="width: 40vw;"></div>
            </div>
        </section>
        <section class="two">
            <div class="text">
                <h1>WELCOME TO THE WELINK COMMUNITY</h1>
                <p style="font-size: 20px;">Here you can find the right person you need for your project.</p>
                <P style="font-size: 20px;">Choose over hundreds of qualified professionals to accompany you towards the
                    accomplishment of your
                    project.</P>
            </div>
            <div class="video">
                <video loop autoplay class="video-ops" muted width="600">
                    <source src="./video.mp4" type="video/mp4" />
                </video>
            </div>

        </section>
        <section class="three">
            <h1 style="text-align: center;">Welink is good for you</h1>
            <div class="row" :class="{ paused: isPaused }" @mouseleave="reset" @touchend="reset">
                <div class="card" v-for="(carte, i) in cartesDouble" :key="i" :class="{ active: activeIndex === i }"
                    @click="togglePause(i)"> {{ carte.titre }} </div>

            </div>
        </section>
    </body>

</template>

<script setup>
import { ref, computed } from 'vue';
import SearchBar from '@/components/SearchBar.vue';

const current = ref('a');

const cartes = ref([
  { titre: "Carte 1" },
  { titre: "Carte 2" },
  { titre: "Carte 3" },
  { titre: "Carte 4" },
]);

const isPaused = ref(false);
const activeIndex = ref(null);

// On duplique les cartes pour un défilement fluide en boucle
const cartesDouble = computed(() => [...cartes.value, ...cartes.value]);

function togglePause(index) {
  if (isPaused.value && activeIndex.value === index) {
    // Si déjà en pause sur cette carte, relance le défilement
    isPaused.value = false;
    activeIndex.value = null;
  } else {
    // Sinon, pause et agrandit la carte cliquée
    isPaused.value = true;
    activeIndex.value = index;
  }
}
</script>


<style>
body {
    margin: 12px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
}

h1 {
    font-weight: 500;
    font-size: 28px;
}

.row {
    display: flex;
    flex-direction: row;
    gap: 12px;
    display: flex;
    width: max-content;
    animation: scroll-left 20s linear infinite;
    will-change: transform;
}

.row.paused {
    animation-play-state: paused;
}

.card {
    min-width: 480px;
    height: 120px;
    margin: 0 12px;
    margin-top: 24px;
    padding: 12px;
    gap: 8px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    transition: height 0.3s, box-shadow 0.3s;
    cursor: pointer;
}

.card.active {
    height: 180px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    z-index: 2;
}

.globe {
    background-image: url('./Image_fx (5).jpg');
    height: 620px;
    background-size: cover;
    border-radius: 16px;
    margin-top: 32px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.col {
    width: 40vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.two {
    display: flex;
    flex-direction: row;
    margin-top: 64px;
    gap: 64px;
}

.text {
    background-color: rgb(0, 123, 255);
    height: 320px;
    width: 600px;
    border-radius: 12px;
    color: white;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.video-ops {
    border-radius: 12px;
}

.three {
    margin-top: 64px;
}

@keyframes scroll-left {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

button.active {
    background-color: #007BFF;
    color: white;
    border-color: #007BFF;
}

.search {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 320px;
    width: 600px;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.2);
    /* semi-transparent */
    backdrop-filter: blur(16px);
    /* effet blur permanent */
    -webkit-backdrop-filter: blur(16px);
    /* support Safari */

}


.search-input {
    background-color: rgb(56, 55, 55);
    border: none;
    width: 480px;
    height: 48px;
    border-radius: 12px;
    padding: 6px;
    box-sizing: border-box;
    padding-left: 12px;
}

.find-provider {
    border: none;
    width: 240px;
    height: 48px;
    border-radius: 8px 0px 0px 8px;
}

.browse-jobs {
    border: none;
    width: 240px;
    height: 48px;
    border-radius: 0px 8px 8px 0px;
}

.provider {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 12px;
    gap: 16px;
}

.btn3 {
    border: none;
    width: 240px;
    height: 32px;
    border-radius: 8px;
    position: relative;
    z-index: 2;
}

.search-input {
  width: 480px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 150px;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  z-index: 10;
}

li {
  padding: 6px 10px;
  cursor: pointer;
}

li:hover {
  color: #f0f0f0;
}
.content {
  margin-top: 15px;
  height: fit-content;
  width: 300px;
  font-family: Arial, sans-serif;
  position: relative;
}
</style>