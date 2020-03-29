<template>
  <v-container>
    <v-card outlined>
      <v-row justify="center" class="mt-2">
        <v-btn @click="previousMonth" text color="primary" large>
          <v-icon>mdi-arrow-left-drop-circle</v-icon>
        </v-btn>
        <v-btn rounded color="primary" outlined large>
          {{ referencePeriod | formatDate('MM/YYYY') }}
        </v-btn>
        <v-btn @click="nextMonth" text color="primary" large>
          <v-icon>mdi-arrow-right-drop-circle</v-icon>
        </v-btn>
      </v-row>
      <v-divider class="mt-2" />
      <Cards :referencePeriod="referencePeriod | formatDate('YYYYMM')" />
    </v-card>
    <Transactions :referencePeriod="referencePeriod | formatDate('YYYYMM')" />
  </v-container>
</template>

<script>
import Cards from '@/components/Cart/Cards.vue'
import Transactions from '@/components/Cart/Transactions.vue'
import moment from 'moment'

export default {
  components: {
    Cards,
    Transactions
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

  methods: {
    previousMonth() {
      this.referencePeriod.subtract(1, 'M')
      this.$forceUpdate()
    },
    nextMonth() {
      this.referencePeriod.add(1, 'M')
      this.$forceUpdate()
    }
  }
}
</script>
