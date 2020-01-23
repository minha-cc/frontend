<template>
  <v-content>
    <v-container>
      <v-alert
        v-model="hasMessage"
        :color="color"
        transition="fade-transition"
        text
        outlined
        border="left"
        dismissible
      >
        {{ message }}
      </v-alert>
    </v-container>
  </v-content>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: 'error'
    }
  },
  data() {
    return {
      hasMessage: false
    }
  },
  watch: {
    message(value) {
      this.hasMessage = value !== null
    }
  }
}
</script>
