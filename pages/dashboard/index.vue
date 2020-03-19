<template>
  <v-container>
    <v-card outlined>
      <v-row justify="center" class="mt-2">
        <v-btn icon text color="primary" large>
          <v-icon>mdi-arrow-left-drop-circle</v-icon>
        </v-btn>
        <v-btn rounded color="primary" outlined large>02/2020</v-btn>
        <v-btn icon text color="primary" large>
          <v-icon>mdi-arrow-right-drop-circle</v-icon>
        </v-btn>
      </v-row>
      <v-divider class="mt-2" />
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
    </v-card>
    <Transaction />
  </v-container>
</template>

<script>
import Card from '@/components/Cart/Card.vue'
import Transaction from '@/components/Cart/Transaction.vue'
import * as Cart from '@/services/cart.js'

export default {
  components: {
    Card,
    Transaction
  },
  data() {
    return {
      cart: {
        income: 0.0,
        outcome: 0.0,
        essential: 0.0,
        whises: 0.0,
        savings: 0.0
      }
    }
  },
  async mounted() {
    const cart = await Cart.get('0ABaP6KUaLYJfImnzGRzXgUblx82', '202005')
    this.cart = cart.cart
  }
}
</script>
