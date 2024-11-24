<!-- components/ButtonLogout.vue -->
<template>
  <div v-if="isLoggedIn">
    <button @click="logout">
      Se déconnecter
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    async logout () {
      await this.$supabase.auth.signOut()
      this.$store.commit('clearSession') // Supprimer la session du store
      this.$router.push('/login') // Rediriger vers la page de connexion
    }
  }
}
</script>
