<template>
  <v-app light>
    <v-app-bar app dense flat color="primary">
      <v-img
        :src="require('~/assets/images/reversed-minha-cc-logo.png')"
        class="ml-8"
        max-width="105"
        max-height="24"
      />
      <v-spacer />
      <h4>Olá, {{ currentUser.username }}</h4>
      <v-avatar color="white" size="36" class="ml-4">
        <span class="primary--text headline">
          {{ firstLetterName }}
        </span>
      </v-avatar>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({ currentUser: 'auth/getCurrentUser' }),
    firstLetterName() {
      if (this.currentUser.username) {
        return this.currentUser.username.charAt(0).toUpperCase()
      }
      return null
    }
  }
}
</script>
<style scoped>
h4 {
  color: #fff;
}
</style>
