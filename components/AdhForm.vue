<template>
  <div class="container">
    <!-- Zone de titre -->
    <div class="zone1">
      <h2 class="titre">
        ARCHIDIOCESE D'ABIDJAN <br>
        DOYENNE MONSEIGNEUR BLAISE ANOH <br>
        PAROISSE NOTRE DAME DE LA NATIVITE
      </h2>
    </div>

    <!-- Icônes de réseaux sociaux -->
    <div class="social-icons">
      <a href="https://www.facebook.com" target="_blank" class="social-icon facebook">
        <img src="/facebook-icon.png" alt="Facebook">
      </a>
      <a href="https://www.twitter.com" target="_blank" class="social-icon twitter">
        <img src="/twitter-icon.png" alt="Twitter">
      </a>
    </div>

    <!-- Zone du formulaire avec cercle superposé -->
    <div class="arc">
      <!-- Cercle superposé -->
      <div class="big-circle">
        <img src="/icon.png" alt="Logo" class="circle-image">
      </div>

      <!-- Formulaire -->
      <div class="form-container">
        <h2 class="form-title">
          Inscription
        </h2>
        <form @submit.prevent="submitForm">
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
/* Styles généraux */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #007bff;
  padding: 20px;
  position: relative; /* Ajouté pour positionner .arc correctement */
}

/* Titre */
.zone1 {
  text-align: center;
  margin-bottom: 20px;
}

.titre {
  font-size: 18px;
  color: white;
  font-weight: bold;
}

/* Icônes de réseaux sociaux */
.social-icons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 20px; /* Ajouté pour espacer les icônes du titre */
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

/* Conteneur formulaire */
.arc {
  position: absolute;
  bottom: 0;
  right: 0;
  background: white;
  width: 90%;
  max-width: 400px;
  border-radius: 40px 0 0 40px; /* Plus de bord arrondi haut et bas à droite */
  padding: 40px 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
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
  border: 2px solid #007bff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.circle-image {
  width: 70%;
  height: 70%;
  border-radius: 50%;
  object-fit: cover;
}

/* Formulaire */
.form-container {
  text-align: center;
  z-index: 1;
}

.form-title {
  margin-top: 20px;
  font-size: 20px;
  color: #333;
}

.input-field {
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-bottom: 2px solid #00c0c0;
  outline: none;
  font-size: 14px;
}

.input-field:focus {
  border-bottom: 2px solid #009999;
}

.radio-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.radio-item {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
}

.register-button {
  background-color: #00c0c0;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.register-button:hover {
  background-color: #009999;
}

/* Media query spécifique pour un écran de 360x740 pixels */
@media (max-width: 360px) and (max-height: 740px) {
  .arc {
    width: 100%;
    padding: 30px 15px;
    border-radius: 30px 0 0 30px;
  }

  .form-title {
    font-size: 18px;
  }

  .input-field {
    font-size: 14px;
  }

  .register-button {
    font-size: 16px;
  }
}

/* Autres media queries pour différentes tailles d'écran */
@media (max-width: 320px) {
  .arc {
    width: 100%;
    padding: 30px 10px;
    border-radius: 30px 0 0 30px;
  }

  .form-title {
    font-size: 16px;
  }

  .input-field {
    font-size: 12px;
  }

  .register-button {
    font-size: 14px;
  }
}

@media (min-width: 321px) and (max-width: 480px) {
  .arc {
    width: 95%;
    padding: 35px 15px;
    border-radius: 35px 0 0 35px;
  }

  .form-title {
    font-size: 18px;
  }

  .input-field {
    font-size: 13px;
  }

  .register-button {
    font-size: 15px;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .arc {
    width: 90%;
    padding: 40px 20px;
    border-radius: 40px 0 0 40px;
  }

  .form-title {
    font-size: 20px;
  }

  .input-field {
    font-size: 14px;
  }

  .register-button {
    font-size: 16px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .arc {
    width: 85%;
    padding: 45px 25px;
    border-radius: 45px 0 0 45px;
  }

  .form-title {
    font-size: 22px;
  }

  .input-field {
    font-size: 15px;
  }

  .register-button {
    font-size: 17px;
  }
}

@media (min-width: 1025px) {
  .arc {
    width: 80%;
    padding: 50px 30px;
    border-radius: 50px 0 0 50px;
  }

  .form-title {
    font-size: 24px;
  }

  .input-field {
    font-size: 16px;
  }

  .register-button {
    font-size: 18px;
  }
}
</style>
