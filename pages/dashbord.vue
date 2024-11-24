<template>
  <div class="dashboard">
    <h1>Gestion des Adhésions</h1>

    <!-- Vérifier si l'utilisateur est authentifié et administrateur -->
    <div v-if="isAdmin">
      <!-- Table des adhésions -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénoms</th>
            <th>Age</th>
            <th>Profession</th>
            <th>Quartier</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="adhesion in adhesions" :key="adhesion.id">
            <td>{{ adhesion.id }}</td>
            <td>{{ adhesion.nom }}</td>
            <td>{{ adhesion.prenoms }}</td>
            <td>{{ adhesion.age }}</td>
            <td>{{ adhesion.profession }}</td>
            <td>{{ adhesion.quartier }}</td>
            <td>{{ adhesion.contact }}</td>
            <td>{{ adhesion.email }}</td>
            <td>
              <button class="btn btn-warning btn-sm" @click="editAdhesion(adhesion)">
                Modifier
              </button>
              <button class="btn btn-danger btn-sm" @click="deleteAdhesion(adhesion.id)">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Afficher le formulaire d'édition -->
      <ModiForm v-if="showForm" :adhesion="currentAdhesion" @close="closeForm" />

      <!-- Boutons d'export -->
      <div class="export-buttons">
        <button class="btn btn-success" @click="exportToExcel">
          Exporter en Excel
        </button>
        <button class="btn btn-danger" @click="exportToPDF">
          Exporter en PDF
        </button>
      </div>
    </div>

    <!-- Si l'utilisateur n'est pas un administrateur, affichage du message d'erreur -->
    <div v-else>
      <p>Vous devez être administrateur pour accéder à cette page.</p>
    </div>
  </div>
</template>

<script>
import { supabase } from '~/plugins/supabase'
import ModiForm from '~/components/ModiForm.vue'

export default {
  components: {
    ModiForm
  },
  data () {
    return {
      adhesions: [],
      showForm: false,
      currentAdhesion: null,
      isAdmin: false, // Définir si l'utilisateur est administrateur
      user: null // Utilisateur authentifié
    }
  },

  async mounted () {
    // Vérifier si l'utilisateur est authentifié et administrateur
    await this.checkAuthentication()
    if (this.isAdmin) {
      await this.fetchAdhesions()
    }
  },

  methods: {
    async checkAuthentication () {
      const user = supabase.auth.user()
      if (user) {
        this.user = user
        // Vérifier si l'utilisateur est un administrateur
        const { data: userData, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single()

        if (error) {
          // eslint-disable-next-line no-console
          console.error('Erreur lors de la récupération du rôle', error)
        } else {
          this.isAdmin = userData?.role === 'admin'
        }
      }
    },

    async fetchAdhesions () {
      const { data, error } = await supabase
        .from('adhesions')
        .select('*')

      if (error) {
        // eslint-disable-next-line no-console
        console.error('Erreur lors de la récupération des adhésions', error)
      } else {
        this.adhesions = data
      }
    }
  }
}
</script>
