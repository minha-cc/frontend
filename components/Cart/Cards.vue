<template>
  <v-row class="ml-2 mr-2">
    <v-col sm="4" lg="4">
      <v-row>
        <Card :value="cart.income" title="Entradas" value-class="income" />
        <Card :value="cart.outcome" title="Saídas" value-class="outcome" />
      </v-row>
    </v-col>
    <v-spacer />
    <v-col sm="6" lg="6">
      <v-row>
        <Card
          :value="cart.essential"
          title="Essenciais (50%)"
          value-class="planning"
        />
        <Card
          :value="cart.whises"
          title="Desejos (30%)"
          value-class="planning"
        />
        <Card
          :value="cart.savings"
          title="Investimentos (20%)"
          value-class="planning"
        />
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import Card from '@/components/Cart/Card.vue'
import { mapGetters } from 'vuex'
import * as Cart from '@/services/firestore/cart.js'

export default {
  components: {
    Card
  },

  props: {
    referencePeriod: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      cart: Cart.createEmptyCart(),
      changedCard: null
    }
  },

  computed: {
    ...mapGetters({ currentUser: 'auth/getCurrentUser' })
  },

  watch: {
    referencePeriod(newValue) {
      this.listeningCart()
    }
  },

  mounted() {
    this.getCart()
    this.listeningCart()
  },

  methods: {
    async getCart() {
      this.cart = await Cart.get(this.currentUser.uid, this.referencePeriod)
    },

    listeningCart() {
      Cart.cartReference(this.currentUser.uid, this.referencePeriod).onSnapshot(
        (doc) => {
          this.cart = doc.data()
        }
      )
    }
  }
}
</script>
