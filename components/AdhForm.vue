<template>
  <div class="container-fluid main-container">
    <div class="title-zone">
      <div class="title-circle">
        <h2 class="titre">
          ARCHIDIOCESE D'ABIDJAN <br>
          DOYENNE MONSEIGNEUR BLAISE ANOH <br>
          PAROISSE NOTRE DAME DE LA NATIVITE
        </h2>
      </div>
    </div>
    <div class="social-icons">
      <a href="https://www.facebook.com" target="_blank" class="social-icon facebook">
        <img src="/facebook-icon.png" alt="Facebook">
      </a>
      <a href="https://www.twitter.com" target="_blank" class="social-icon twitter">
        <img src="/twitter-icon.png" alt="Twitter">
      </a>
    </div>
    <div
      class="form-zone"
      style="border: 3px solid #e7340c;border-right: none;"
    >
      <div
        class="big-circle"
      >
        <img src="/icon.png" alt="Logo" class="circle-image">
      </div>
      <div class="form-container">
        <h2 class="form-title">
          Inscription
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
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '~/plugins/supabase'

export default {
  data () {
    return {
      formData: {
        nom: '',
        prenoms: '',
        age: '',
        profession: '',
        quartier: '',
        contacts: '',
        email: ''
      },
      tranchesAge: ['18-25', '26-35', '36-45', '46-55', '56+']
    }
  },
  methods: {
    async submitForm () {
      const { data, error } = await supabase
        .from('adhesions')
        .insert([
          {
            nom: this.formData.nom,
            prenoms: this.formData.prenoms,
            age: this.formData.age,
            profession: this.formData.profession,
            quartier: this.formData.quartier,
            contacts: this.formData.contacts,
            email: this.formData.email
          }
        ])

      if (error) {
        // eslint-disable-next-line no-console
        console.error('Erreur lors de la soumission:', error.message)
        alert('Erreur lors de la soumission')
      } else {
        // eslint-disable-next-line no-console
        console.log('Données soumises avec succès:', data)
        alert('Formulaire soumis avec succès !')
      }
    }
  }
}

</script>

  <style scoped>
  /* Container principal */
  .main-container {
    height: 100vh;
    background-color: rgb(21, 21, 98);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0;
    padding: 0;
  }

  /* Zone de titre */
  .title-zone {
    height: 20%;
    background-color: rgb(21, 21, 98);
    color: white;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: bold;
  }
  .titre {
    font-size: 12px;
    color: white;
    padding: 2px;
  }
 .title-circle{
  border: 3px solid #e7340c;
    border-radius: 45%;
    padding: 2px;

 }
  /* Icônes de réseaux sociaux */
  .social-icons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 8px;
    z-index: 10;
  }
  .social-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  .social-icon img {
    width: 20px;
    height: 20px;
  }
  .facebook {
    background-color: #3b5998;
  }
  .twitter {
    background-color: #1da1f2;
  }

  /* Cercle superposé */
  .big-circle {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 100px;
    background-color: white;
    border: 3px solid #e7340c;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }
  .circle-image {
    width: 70%;
    height: 70%;
    border-radius: 50%;
    object-fit: cover;
  }

  /* Zone du formulaire */
  .form-zone {
    height: 70%;
    width: 80%;
    border: 3px #e7340c;
    background-color: white;
    align-self: flex-end;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 40px 0 0 40px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  /* Conteneur de formulaire */
  .form-container {
    width: 85%;
    height: 90%;
    padding: 0.2rem;
    overflow-y: auto;
  }

  /* Titre du formulaire */
  .form-title {
    margin-top: 20px;
    text-align: center;
    color: #e7340c;
    font-size: 1.2rem;
  }

  /* Champs de saisie */
  .input-field {
    width: 100%;
    padding: 0.5rem 0;
    border: none;
    border-bottom: 3px solid #e7340c;
    font-size: 1rem;
    outline: none;
  }

  /* Tranche d'âge */
  .radio-group {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .radio-item {
    display: flex;
    align-items: center;
  }
  .radio-item input {
    margin-right: 0.5rem;
  }

  /* Bouton d'inscription */
  .register-button {
    width: 100%;
    background-color: #e7340c;
    color: white;
    padding: 0.3rem;
    border: none;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
  }
  .register-button:hover {
    background-color: darkblue;
  }

  /* Checkbox */
  .checkbox {
    font-size: 0.7rem;
  }
  .checkbox input {
    margin-right: 0.2rem;
  }
  </style>
