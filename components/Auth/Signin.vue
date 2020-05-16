<template>
  <v-content>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="12">
          <v-form @submit.prevent="onSignIn" class="mt-2">
            <v-card-text>
              <v-text-field
                v-model="form.email"
                :error-messages="emailErrors"
                label="Seu email"
                name="email"
                placeholder="seu@email.com.br"
                prepend-icon="mdi-at"
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
                placeholder="Com pelo menos 6 caracteres"
                prepend-icon="mdi-lock"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn :loading="loading" type="submit" color="secondary">
                Entrar
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false,
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
      signin: 'auth/signinAsync'
    }),
    async onSignIn() {
      this.$emit('onError', null)
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.loading = true

      try {
        await this.signin({
          email: this.form.email,
          password: this.form.password
        })

        this.$router.push('/')
      } catch (error) {
        this.$emit('onError', 'Usuário ou senha inválidos.')
      }
      this.loading = false
    }
  }
}
</script>
