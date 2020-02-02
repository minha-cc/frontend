<template>
  <v-content>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="12">
          <v-form @submit.prevent="onSignup" class="mt-2">
            <v-card-text>
              <v-text-field
                v-model="form.username"
                :error-messages="usernameErrors"
                label="Seu nome"
                name="username"
                placeholder="Nome"
                prepend-icon="mdi-account"
                type="text"
                autofocus
              />
              <v-text-field
                v-model="form.email"
                :error-messages="emailErrors"
                class="mt-4"
                label="Seu email"
                name="email"
                placeholder="seu@email.com"
                prepend-icon="mdi-at"
                type="email"
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
                Cadastrar
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
        username: '',
        email: '',
        password: ''
      }
    }
  },
  computed: {
    usernameErrors() {
      const errors = []
      if (!this.$v.form.username.$dirty) return errors
      !this.$v.form.username.required && errors.push('Nome é obrigatório.')
      return errors
    },
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
      username: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  },
  methods: {
    ...mapActions({
      signup: 'auth/signupAsync'
    }),
    async onSignup() {
      this.$emit('onError', null)
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.loading = true

      try {
        await this.signup({
          username: this.form.username,
          email: this.form.email,
          password: this.form.password
        })

        this.$router.push('/dashboard')
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          this.$emit(
            'onError',
            'Esse email já está cadastrado no nosso sistema.'
          )
        } else {
          this.$emit('onError', 'Não conseguimos criar seu usuário.')
        }
      }
      this.loading = false
    }
  }
}
</script>
