<template>
  <div>
    <h1>Providers proposant le service : {{ service }}</h1>
    <ul v-if="providers.length">
        
      <li v-for="provider in providers" :key="provider.id">
        {{ provider.Name }}  - {{ providers.Description }}
      </li>
    </ul>
    <p>Nombre de providers : {{ providers.length }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'


const providers = ref([])
const route = useRoute()
const service = ref(route.params.service)

async function fetchProviders(serviceName) {
     if (!serviceName) {
    providers.value = []
    return
  }
  try {
     const url = `http://localhost:1337/api/services?filters[skill][$eq]=${encodeURIComponent(serviceName)}&populate=providers`
    const res = await fetch(url);
    console.log("--------->",res);
    const data = await res.json()

    providers.value = data.data[0]?.attributes?.providers || [] 
  } catch (error) {
    console.error('Erreur récupération providers:', error)
    providers.value = []
  }
}

onMounted(() => {
  fetchProviders(service.value)
})


watch(() => route.params.service, (newService) => {
  service.value = newService
  fetchProviders(newService)
})
</script>
