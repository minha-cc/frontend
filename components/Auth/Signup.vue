<template>
  <v-content>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="12">
          <v-form @submit.prevent="onSignIn" class="mt-2">
            <v-card-text></v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn :loading="loading" type="submit" color="primary">
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
export default {}
</script>
