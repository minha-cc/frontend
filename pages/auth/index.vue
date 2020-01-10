
<template>
  <v-app id="auth">
    <v-content>
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-layout justify-center>
              <v-img src="minha-cc-logo.png" aspect-ratio="1" max-width="238" max-height="87" />
            </v-layout>
            <v-card outlined>
              <v-form @submit.prevent="signIn">
                <v-card-text>
                  <v-text-field
                    v-model="email"
                    label="Seu email"
                    name="login"
                    prepend-icon="mdi-account"
                    type="email"
                    autofocus
                    required
                  />
                  <v-text-field
                    v-model="password"
                    label="Sua senha"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    required
                  />
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn :loading="loading" type="submit" color="primary">
                    Entrar
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import { firebaseAuth } from '@/plugins/firebase'

export default {
  data () {
    return {
      email: '',
      password: '',
      loading: false
    }
  },
  methods: {
    async signIn () {
      this.loading = true
      try {
        await firebaseAuth.signInWithEmailAndPassword(this.email, this.password)
      } catch (error) {
      }
      this.loading = false
    }
  }
}
</script>
