<template>
  <div class="container-fluid main-container">
    <div class="title-zone">
      <h2 class="titre">
        ARCHIDIOCESE D'ABIDJAN <br> DOYENNE MONSEIGNEUR BLAISE ANOH <br> PAROISSE NOTRE DAME DE LA NATIVITE
      </h2>
    </div>
    <div class="form-zone">
      <div class="big-circle">
        <img src="/icon.png" alt="Logo" class="circle-image">
      </div>
      <div class="form-container">
        <h2 class="form-title">
          Authentification
        </h2>
        <form class="scrollable-form" @submit.prevent="submitForm">
          <div class="form-group">
            <input v-model="formData.email" type="email" placeholder="Email" required class="input-field">
          </div>
          <div class="form-group">
            <input v-model="formData.password" type="password" placeholder="Mot de passe" required class="input-field">
          </div>
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          <button type="submit" class="register-button">
            Se connecter
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
        email: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    async submitForm () {
      try {
        // Authentification via Supabase
        const { user, error } = await supabase.auth.signInWithPassword({
          email: this.formData.email,
          password: this.formData.password
        })

        if (error) {
          this.errorMessage = error.message
        } else {
          this.errorMessage = ''
          // Vérification du rôle de l'utilisateur dans la table "administrateurs"
          await this.checkAdminRole(user)
        }
      } catch (err) {
        this.errorMessage = 'Erreur lors de la connexion'
        // eslint-disable-next-line no-console
        console.error('Erreur lors de la connexion:', err.message)
      }
    },

    async checkAdminRole (user) {
      const { data, error } = await supabase
        .from('administrateurs')
        .select('role')
        .eq('email', user.email) // Utiliser l'email pour rechercher le rôle
        .single()

      if (error) {
        // eslint-disable-next-line no-console
        console.error('Erreur lors de la vérification du rôle', error)
        this.errorMessage = 'Erreur de vérification du rôle'
      } else if (data.role === 'admin') {
        this.$router.push('/dashboard') // Redirection vers le tableau de bord
      } else {
        this.errorMessage = 'Accès refusé. Vous devez être administrateur.'
      }
    }
  }
}
</script>

<style scoped>
/* Styles de la page de connexion */
</style>

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
    font-size: 16px;
    margin-top: 20px;
    color: white;
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
    margin-bottom: 70px;
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

  /* Bouton de soumission */
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

  /* Message d'erreur */
  .error-message {
    color: red;
    text-align: center;
    font-size: 0.8rem;
    margin-top: 10px;
  }

  /* Checkbox */
  .checkbox {
    font-size: 0.7rem;
  }
  .checkbox input {
    margin-right: 0.2rem;
  }
  </style>
