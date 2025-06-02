<template>
  <div class="auth-container">
    <h2>Connexion</h2>

    <form @submit.prevent="handleSubmit" class="auth-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" required />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input id="password" v-model="form.password" type="password" required />
      </div>

      <button type="submit" class="btn-submit">Se connecter</button>
    </form>

    <p class="toggle-text">
      Pas encore de compte ?
      <button @click="goToSignUp" class="btn-toggle">Créer un compte</button>
    </p>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const STRAPI_URL = 'http://localhost:1337'

const errorMessage = ref('')
const successMessage = ref('')

const form = reactive({
  email: '',
  password: '',
  username: '', // optionnel ici si tu ne l'utilises pas dans login
})

async function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await fetch(`${STRAPI_URL}/api/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: form.email,
        password: form.password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      errorMessage.value = data.error?.message || JSON.stringify(data)
      return
    }

    successMessage.value = `Bienvenue, ${data.user.username} ! Vous êtes connecté.`

    localStorage.setItem('jwt', data.jwt)

    // Redirection ou autre logique ici

  } catch (error) {
    errorMessage.value = 'Erreur réseau ou serveur.'
  }
}

function goToSignUp() {
  router.push({ name: 'SignUp' })
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}

input[type='email'],
input[type='password'] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.btn-submit {
  padding: 10px;
  background-color: #007bff;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
}

.btn-submit:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 15px;
  text-align: center;
}

.success-message {
  color: green;
  margin-top: 15px;
  text-align: center;
}

.toggle-text {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
}

.btn-toggle {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  padding: 0 5px;
  font-size: 14px;
}

.btn-toggle:hover {
  color: #0056b3;
}
</style>