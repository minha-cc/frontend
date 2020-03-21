<template>
  <v-container>
    <v-card outlined>
      <v-row justify="center" class="mt-2">
        <v-btn icon text color="primary" large>
          <v-icon>mdi-arrow-left-drop-circle</v-icon>
        </v-btn>
        <v-btn rounded color="primary" outlined large>
          {{ referencePeriod | formatDate('MM/YYYY') }}
        </v-btn>
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
    <Transaction
      :transactions="transactions"
      :transactionTypes="transactionTypes"
      :referencePeriod="referencePeriod | formatDate('YYYYMM')"
      :currentUser="currentUser"
    />
  </v-container>
</template>

<script>
import Card from '@/components/Cart/Card.vue'
import Transaction from '@/components/Cart/Transaction.vue'
import * as Cart from '@/services/firestore/cart.js'
import * as TransactionType from '@/services/firestore/transactionType.js'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  components: {
    Card,
    Transaction
  },

  filters: {
    formatDate(value, format) {
      return moment(value).format(format)
    }
  },

  data() {
    return {
      cart: {
        income: 0.0,
        outcome: 0.0,
        essential: 0.0,
        whises: 0.0,
        savings: 0.0
      },
      transactions: [],
      transactionTypes: [],
      referencePeriod: moment()
    }
  },

  computed: {
    ...mapGetters({ currentUser: 'auth/getCurrentUser' })
  },

  async mounted() {
    this.transactionTypes = await TransactionType.get()
    const cart = await Cart.get(
      this.currentUser.uid,
      this.referencePeriod.format('YYYYMM')
    )
    this.cart = cart.cart
    this.transactions = cart.transactions
  }
}
</script>
