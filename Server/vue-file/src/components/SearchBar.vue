<template>
  <div class="searchbar-container">
    <input
      type="text"
      v-model="searchTerm"
      placeholder="Rechercher un service..."
      @input="filterOptions"
      @focus="showDropdown = true"
      @blur="hideDropdown"
      @keyup.enter.prevent="onSearch"
      class="search-input"
    />
    <button @click="onSearch" :disabled="!selectedService" class="btn-search">Search</button>


    <ul v-if="showDropdown && filteredOptions.length" class="dropdown-list">
      <li
        v-for="option in filteredOptions"
        :key="option"
        @mousedown.prevent="selectOption(option)"
        class="dropdown-item"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const selectedService = ref('')
const searchTerm = ref('')
const showDropdown = ref(false)

// Liste statique d'options (tu peux aussi la récupérer dynamiquement)
const services = [
  'backend developer',
  'frontend developer',
  'fullstack developer',
]       
const filteredOptions = ref([...services])

function filterOptions() {
  const term = searchTerm.value.toLowerCase()
  filteredOptions.value = services.filter(service =>
    service.toLowerCase().includes(term)
  )
}

function selectOption(option) {
  selectedService.value = option
  searchTerm.value = option
  showDropdown.value = false
}

function onSearch() {
  if (!selectedService.value) return
  router.push({ name: 'providers', params: { service: selectedService.value } })
    .catch(err => {
      if (err.name !== 'NavigationDuplicated') console.error(err)
    })
}

function hideDropdown() {
  // Petite temporisation pour laisser le clic se faire avant de cacher
  setTimeout(() => {
    showDropdown.value = false
  }, 150)
}

</script>

<style scoped>
.searchbar-container {
  position: relative;
  max-width: 300px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.dropdown-list {
  position: absolute;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  margin: 0;
  padding: 0;
  list-style: none;
}

.dropdown-item {
  padding: 8px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #007bff;
  color: white;
}

.btn-search {
  padding: 8px 12px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
}

.btn-search:hover {
  background-color: #0056b3;
}
</style>
