<template>
  <v-app id="auth">
    <v-content>
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-layout justify-center>
              <v-img
                :src="require('~/assets/images/minha-cc-logo.png')"
                aspect-ratio="1"
                max-width="238"
                max-height="87"
              />
            </v-layout>
            <v-alert
              v-model="hasError"
              transition="fade-transition"
              text
              outlined
              color="error"
              border="left"
              dismissible
            >
              Usuário ou senha inválidos.
            </v-alert>
            <v-card outlined>
              <v-tabs centered>
                <v-tab>
                  Entrar
                </v-tab>
                <v-tab>
                  Cadastrar
                </v-tab>
              </v-tabs>
              <v-form @submit.prevent="onSignIn" class="mt-8">
                <v-card-text>
                  <v-text-field
                    v-model="form.email"
                    :error-messages="emailErrors"
                    label="Seu email"
                    name="email"
                    placeholder="Email"
                    prepend-icon="mdi-account"
                    type="email"
                    autofocus
                  />
                  <v-text-field
                    v-model="form.password"
                    @click:append="showPassword = !showPassword"
                    :error-messages="passwordErrors"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    class="mt-4"
                    label="Sua senha"
                    name="password"
                    placeholder="Pelo menos 6 caracteres"
                    prepend-icon="mdi-lock"
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
import { required, email, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  layout: 'signin',
  data() {
    return {
      loading: false,
      hasError: false,
      showPassword: false,
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.form.email.$dirty) return errors
      !this.$v.form.email.required && errors.push('Email é obrigatório.')
      !this.$v.form.email.email && errors.push('Email deve ser válido')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.form.password.$dirty) return errors
      !this.$v.form.password.required && errors.push('Senha é obrigatório.')
      !this.$v.form.password.minLength &&
        errors.push('Senha deve ter pelo menos 6 caracteres')
      return errors
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  },
  methods: {
    ...mapActions({
      signIn: 'auth/signInAsync'
    }),
    async onSignIn() {
      this.$v.$touch()
      if (this.$v.$invalid) return

      this.loading = true

      try {
        await this.signIn({
          email: this.form.email,
          password: this.form.password
        })

        this.$router.push('/dashboard')
      } catch (error) {
        this.hasError = true
      }
      this.loading = false
    }
  }
}
</script>
