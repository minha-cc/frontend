<template>
  <v-content>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-layout justify-center>
            <v-img
              :src="require('~/assets/images/minha-cc-logo.png')"
              aspect-ratio="1"
              max-width="224"
              max-height="54"
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
              <v-tabs-slider></v-tabs-slider>
              <v-tab-item>
                <Signin @onError="message = $event" />
              </v-tab-item>
              <v-tab-item>
                <Signup @onError="message = $event" />
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>
<script>
import Signin from '@/components/Auth/Signin.vue'
import Signup from '@/components/Auth/Signup.vue'
import Alert from '@/components/Alert.vue'
export default {
  layout: 'auth',
  components: {
    Signin,
    Signup,
    Alert
  },
  data() {
    return {
      message: null
    }
  }
}
</script>
