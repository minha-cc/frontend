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
      <Cards :referencePeriod="referencePeriod | formatDate('YYYYMM')" />
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
import Cards from '@/components/Cart/Cards.vue'
import Transaction from '@/components/Cart/Transaction.vue'
import * as TransactionType from '@/services/firestore/transactionType.js'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  components: {
    Cards,
    Transaction
  },

  filters: {
    formatDate(value, format) {
      return moment(value).format(format)
    }
  },

  data() {
    return {
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
  }
}
</script>
