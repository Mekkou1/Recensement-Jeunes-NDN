<template>
  <div class="form-container">
    <h2 class="form-title">
      Modification de l'Adhésion
    </h2>
    <form class="scrollable-form" @submit.prevent="submitForm">
      <div class="form-group">
        <input v-model="formData.nom" type="text" placeholder="Nom" required class="input-field">
      </div>
      <div class="form-group">
        <input v-model="formData.prenoms" type="text" placeholder="Prénoms" required class="input-field">
      </div>
      <div class="form-group">
        <p class="section-title">
          Tranche d'âge
        </p>
        <div class="radio-group">
          <div v-for="(age, index) in tranchesAge" :key="index" class="radio-item">
            <input :id="`age-${index}`" v-model="formData.age" type="radio" :value="age" required>
            <label :for="`age-${index}`">{{ age }}</label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <input v-model="formData.profession" type="text" placeholder="Profession" required class="input-field">
      </div>
      <div class="form-group">
        <input v-model="formData.quartier" type="text" placeholder="Quartier" required class="input-field">
      </div>
      <div class="form-group">
        <input v-model="formData.contacts" type="tel" placeholder="Contacts" required class="input-field">
      </div>
      <div class="form-group">
        <input v-model="formData.email" type="email" placeholder="Email" required class="input-field">
      </div>
      <div class="checkbox">
        <input id="terms" type="checkbox" required>
        <label for="terms">J'accepte que mes données soient collectées et utilisées dans le cadre de cette activité</label>
      </div>
      <button class="register-button">
        Mettre à jour
      </button>
      <button type="button" class="cancel-button" @click="closeForm">
        Annuler
      </button>
    </form>
  </div>
</template>

<script>
import { supabase } from '~/plugins/supabase'

export default {
  props: {
    adhesion: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      formData: { ...this.adhesion },
      tranchesAge: ['18-25', '26-35', '36-45', '46-55', '56+']
    }
  },
  methods: {
    async submitForm () {
      // eslint-disable-next-line no-unused-vars
      const { data, error } = await supabase
        .from('adhesions')
        .update(this.formData)
        .match({ id: this.formData.id })

      if (error) {
        alert('Erreur lors de la mise à jour de l\'adhésion')
      } else {
        alert('Adhésion mise à jour avec succès')
        this.$emit('close')
      }
    },
    closeForm () {
      this.$emit('close')
    }
  }
}
</script>
