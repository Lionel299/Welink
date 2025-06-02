<template>
  <div class="auth-container">
    <h2>Inscription</h2>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="nom">Nom</label>
        <input id="nom" v-model="form.nom" type="text" required />
      </div>

      <div class="form-group">
        <label for="prenom">Prénom</label>
        <input id="prenom" v-model="form.prenom" type="text" required />
      </div>

      <div class="form-group">
        <label for="telephone">Numéro de téléphone</label>
        <input id="telephone" v-model="form.telephone" type="tel" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" required />
      </div>

      <button type="submit">Envoyer</button>
    </form>

    <p class="message" :class="{ error: errorMessage, success: successMessage }">
      {{ errorMessage || successMessage }}
    </p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const STRAPI_URL = 'http://localhost:1337';

const errorMessage = ref('');
const successMessage = ref('');

const form = reactive({
  nom: '',
  prenom: '',
  telephone: '',
  email: '',
});

async function handleSubmit() {
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const response = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          nom: form.nom,
          prenom: form.prenom,
          telephone: form.telephone,
          email: form.email,
        },
      }),
    });

    const data = await response.json();
    console.log('Réponse Strapi:', data);

    if (!response.ok) {
      errorMessage.value = data.error?.message || JSON.stringify(data);
      return;
    }

    successMessage.value = `Utilisateur créé avec succès : ${data.data.nom} ${data.data.prenom}`;
    // Réinitialiser le formulaire
    form.nom = '';
    form.prenom = '';
    form.telephone = '';
    form.email = '';
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