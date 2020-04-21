<template>
  <v-row class="ml-1">
    <v-col sm="5" lg="5">
      <v-row>
        <Card :value="cart.income" title="ENTRADAS" value-class="income" />
        <Card :value="cart.outcome" title="SAÍDAS" value-class="outcome" />
      </v-row>
    </v-col>
    <v-spacer />
    <v-col sm="7" lg="7">
      <v-row>
        <Card
          :value="cart.essential.value"
          :percentage="cart.essential.percentage"
          title="ESSENCIAIS (50%)"
          value-class="planning"
        />
        <Card
          :value="cart.whises.value"
          :percentage="cart.whises.percentage"
          title="DESEJOS (30%)"
          value-class="planning"
        />
        <Card
          :value="cart.savings.value"
          :percentage="cart.savings.percentage"
          title="INVESTIMENTOS (20%)"
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
      cart: this.emptyCart(),
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
    this.listeningCart()
  },

  methods: {
    listeningCart() {
      Cart.cartReference(this.currentUser.uid, this.referencePeriod).onSnapshot(
        (doc) => {
          this.cart = doc.data()
          if (doc.data() === undefined) {
            this.cart = this.emptyCart()
          } else {
            this.cart = doc.data()
          }
        }
      )
    },

    emptyCart() {
      return {
        income: 0.0,
        outcome: 0.0,
        essential: { value: 0.0, percentage: 10.0 },
        whises: { value: 0.0, percentage: 0.0 },
        savings: { value: 0.0, percentage: 0.0 }
      }
    }
  }
}
</script>
