<template>
  <div class="auth-container">
    <h2>{{ isLogin ? 'Connexion' : 'Inscription' }}</h2>

    <form @submit.prevent="handleSubmit">
      <div v-if="!isLogin" class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input id="username" v-model="form.username" type="text" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" required />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input id="password" v-model="form.password" type="password" required minlength="6" />
      </div>

      <button type="submit">{{ isLogin ? 'Se connecter' : "S'inscrire" }}</button>
    </form>

    <p class="toggle" @click="toggleMode">
      {{ isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter" }}
    </p>

    <p class="message" :class="{ error: errorMessage, success: successMessage }">
      {{ errorMessage || successMessage }}
    </p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const STRAPI_URL = 'http://localhost:1337';

const isLogin = ref(true);
const errorMessage = ref('');
const successMessage = ref('');

const form = reactive({
  username: '',
  email: '',
  password: '',
});

function toggleMode() {
  isLogin.value = !isLogin.value;
  errorMessage.value = '';
  successMessage.value = '';
  form.username = '';
  form.email = '';
  form.password = '';
}

async function handleSubmit() {
  errorMessage.value = '';
  successMessage.value = '';

  try {
    let response, data;

    if (isLogin.value) {
      // Connexion
      response = await fetch(`${STRAPI_URL}/api/auth/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: form.email,
          password: form.password,
        }),
      });
    } else {
      // Inscription
      response = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });
    }

    data = await response.json();

    if (!response.ok) {
      errorMessage.value = data.error?.message || JSON.stringify(data);
      return;
    }

    successMessage.value = isLogin.value
      ? `Bienvenue, ${data.user.username} ! Vous êtes connecté.`
      : `Inscription réussie, bienvenue ${data.user.username} !`;

    // Stocker le token JWT pour les requêtes authentifiées
    localStorage.setItem('jwt', data.jwt);

    // Optionnel : rediriger ou mettre à jour l'état global utilisateur ici

  } catch (error) {
    errorMessage.value = 'Erreur réseau ou serveur.';
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 320px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  font-family: Arial, sans-serif;
}
h2 {
  text-align: center;
  margin-bottom: 1rem;
}
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 0.7rem;
  background-color: #007bff;
  border: none;
  color: white;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.toggle {
  margin-top: 1rem;
  text-align: center;
  color: #007bff;
  cursor: pointer;
  user-select: none;
}
.message {
  margin-top: 1rem;
  text-align: center;
  font-weight: bold;
}
.error {
  color: red;
}
.success {
  color: green;
}
</style>
