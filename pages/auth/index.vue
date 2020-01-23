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
            <Alert :message="message" />
            <v-card outlined>
              <v-tabs centered>
                <v-tab>
                  Entrar
                </v-tab>
                <v-tab>
                  Cadastrar
                </v-tab>
              </v-tabs>
              <Signin @onError="message = $event" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import Signin from '@/components/Auth/Signin.vue'
import Alert from '@/components/Alert.vue'
export default {
  components: {
    Signin,
    Alert
  },
  data() {
    return {
      message: null
    }
  }
}
</script>
