<template>
  <form @submit.prevent="submitForm">
    <input v-model="nom" type="text" placeholder="Nom" required>
    <input v-model="prenom" type="text" placeholder="Prénom" required>
    <input v-model="dateNaissance" type="date" required>
    <label>Baptisé : <input v-model="baptise" type="checkbox"></label>
    <input v-model="mouvement1" type="text" placeholder="Mouvement 1">
    <input v-model="mouvement2" type="text" placeholder="Mouvement 2">
    <input v-model="mouvement3" type="text" placeholder="Mouvement 3">
    <input v-model="telephone" type="tel" placeholder="Téléphone">
    <input v-model="email" type="email" placeholder="Email" required>
    <button type="submit">
      Enregistrer
    </button>
    <p v-if="errorMessage" style="color: red;">
      {{ errorMessage }}
    </p> <!-- Message d'erreur -->
  </form>
</template>

<script>
import { supabase } from '~/plugins/supabase'

export default {
  data () {
    return {
      nom: '',
      prenom: '',
      dateNaissance: '',
      baptise: false,
      mouvement1: '',
      mouvement2: '',
      mouvement3: '',
      telephone: '',
      email: '',
      errorMessage: ''
    }
  },
  methods: {
    async submitForm () {
      // Préparation des données pour insertion
      const formData = {
        nom: this.nom,
        prenom: this.prenom,
        date_naissance: this.dateNaissance,
        baptise: this.baptise,
        mouvement1: this.mouvement1,
        mouvement2: this.mouvement2,
        mouvement3: this.mouvement3,
        telephone: this.telephone,
        email: this.email
      }

      // Insertion dans la table 'jeunes' de Supabase
      const { error } = await supabase.from('jeunes').insert([formData])

      // Gestion des erreurs
      if (error) {
        this.errorMessage = `Erreur lors de l'enregistrement: ${error.message}`
      } else {
        alert('Enregistrement réussi !')
        this.resetForm()
        this.errorMessage = '' // Réinitialiser le message d'erreur
      }
    },
    resetForm () {
      this.nom = ''
      this.prenom = ''
      this.dateNaissance = ''
      this.baptise = false
      this.mouvement1 = ''
      this.mouvement2 = ''
      this.mouvement3 = ''
      this.telephone = ''
      this.email = ''
    }
  }
}
</script>

<style scoped>
/* Ajoutez vos styles ici */
</style>
