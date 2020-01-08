
<template>
  <v-app id="auth">
    <v-content>
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-layout justify-center>
              <v-img :src="require('assets/images/minha-cc-logo.png')" aspect-ratio="1" max-width="140" max-height="34" />
            </v-layout>
            <v-card outlined class="mt-4">
              <v-card-text>
                <v-form>
                  <v-text-field label="Seu email" name="login" prepend-icon="mdi-account" type="text" />
                  <v-text-field
                    id="password"
                    label="Sua senha"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary">Entrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  }
}
</script>
