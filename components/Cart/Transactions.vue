<template>
  <v-card outlined class="mt-2">
    <v-row class="font-weight-light">
      <v-col cols="12" md="12" class="ml-2">
        Transações do mês
      </v-col>
    </v-row>
    <v-form>
      <v-scale-transition group>
        <v-row
          v-for="transaction in transactions"
          :key="transaction.id"
          class="ml-2"
        >
          <v-col cols="12" md="2">
            <v-text-field
              v-model="transaction.date"
              :disabled="transaction.disableFields"
              v-mask="dateMask"
              :error="validationErrors.date"
              name="date"
              label="Data da transação"
              placeholder="dd/mm/aaaa"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="transaction.description"
              :disabled="transaction.disableFields"
              :error="validationErrors.description"
              name="description"
              label="Descrição"
              placeholder="Supermercado, almoço, material escolar, salário"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="transaction.transactionType"
              :disabled="transaction.disableFields"
              :menu-props="{ top: true, offsetY: true }"
              :error="validationErrors.transactionType"
              :items="transactionTypes"
              item-text="description"
              item-value="id"
              placeholder=" "
              label="Tipo de transação"
              required
            >
            </v-select>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              v-model="transaction.value"
              :disabled="transaction.disableFields"
              :error="validationErrors.value"
              name="value"
              label="Valor"
              prefix="R$"
              placeholder="0,00"
              required
            >
            </v-text-field>
          </v-col>
          <v-col class="d-flex justify-center align-center">
            <template v-if="actions.showSaveGroup">
              <v-btn
                @click="saveTransaction(transaction)"
                :disabled="transaction.disableFields"
                icon
                x-small
                class="ml-1"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>

              <v-btn
                @click="cancelTransaction(transaction)"
                :disabled="transaction.disableFields"
                icon
                x-small
                class="ml-1"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
            <template v-else>
              <v-btn
                @click="editTransaction(transaction)"
                :disabled="actions.disableSaveGroup"
                icon
                x-small
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                @click="removeTransaction(transaction)"
                :disabled="actions.disableSaveGroup"
                icon
                x-small
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-col>
        </v-row>
      </v-scale-transition>
    </v-form>
    <v-row>
      <v-col>
        <v-fab-transition>
          <v-btn
            @click="createTransaction"
            :disabled="actions.disableNew"
            fab
            color="primary"
            big
            bottom
            right
            fixed
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import * as TransactionType from '@/services/firestore/transactionType.js'
import * as Transaction from '@/services/firestore/transaction.js'
import { mapGetters } from 'vuex'

export default {
  props: {
    referencePeriod: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      transactions: [],
      transactionTypes: [],
      actions: {
        disableNew: false,
        showSaveGroup: false,
        disableSaveGroup: false
      },
      validationErrors: {
        date: false,
        description: false,
        transactionType: false,
        value: false
      },
      editingTransaction: null,
      dateMask: '##/##/####'
    }
  },

  computed: {
    ...mapGetters({ currentUser: 'auth/getCurrentUser' })
  },

  watch: {
    referencePeriod(newValue) {
      this.transactions = []
      this.listeningTransactions()
    }
  },

  mounted() {
    this.getTransactionTypes()
    this.listeningTransactions()
  },

  methods: {
    createTransaction() {
      const transaction = Transaction.empty(
        this.currentUser.uid,
        this.referencePeriod
      )
      this.editingTransaction = transaction
      this.validationErrors = {
        date: false,
        description: false,
        transactionType: false,
        value: false
      }
      this.actions = {
        disableNew: true,
        showSaveGroup: true,
        disableSaveGroup: false
      }
    },

    async saveTransaction(transaction) {
      this.editingTransaction = transaction
      if (!this.validate()) return

      try {
        this.editingTransaction.disableFields = true
        this.editingTransaction.newTransaction = false
        await Transaction.save(
          this.currentUser.uid,
          this.referencePeriod,
          this.editingTransaction
        )
        this.actions = {
          disableNew: false,
          showSaveGroup: false,
          disableSaveGroup: false
        }
      } catch (error) {
        this.$emit('onError', 'Ocorreu um erro ao criar a transação')
      }
    },

    async cancelTransaction(transaction) {
      if (transaction.newTransaction) {
        await this.removeTransaction(transaction)
      }
      transaction.disableFields = true
      this.actions = {
        disableNew: false,
        showSaveGroup: false,
        disableSaveGroup: false
      }
    },

    async removeTransaction(transaction) {
      try {
        await Transaction.remove(
          this.currentUser.uid,
          this.referencePeriod,
          transaction
        )
      } catch (error) {
        console.log(error)
        this.$emit('onError', 'Ocorreu um erro ao remover a transação')
      }
      this.actions = {
        disableNew: false,
        showSaveGroup: false,
        disableSaveGroup: false
      }
    },

    editTransaction(transaction) {
      this.editingTransaction = transaction
      this.editingTransaction.disableFields = false
      this.actions = {
        disableNew: true,
        showSaveGroup: true,
        disableSaveGroup: false
      }
    },

    async getTransactionTypes() {
      this.transactionTypes = await TransactionType.get()
      console.log(this.transactionTypes)
    },

    listeningTransactions() {
      Transaction.transactionReference(
        this.currentUser.uid,
        this.referencePeriod
      ).onSnapshot((snaphost) => {
        snaphost.docChanges().forEach((change) => {
          const data = change.doc.data()
          data.id = change.doc.id
          if (change.type === 'added') {
            this.transactions.unshift(data)
          }
          if (change.type === 'removed') {
            this.transactions.splice(
              this.transactions.findIndex((obj) => obj.id === data.id),
              1
            )
          }
          if (change.type === 'modified') {
            this.transactions = this.transactions.map((obj) =>
              obj.id === data.id ? { ...data } : { ...obj }
            )
          }
        })
      })
    },

    validate() {
      let valid = true
      if (this.editingTransaction.date === '') {
        this.validationErrors.date = true
        valid = false
      }
      if (this.editingTransaction.description === '') {
        this.validationErrors.description = true
        valid = false
      }
      if (this.editingTransaction.transactionType === '') {
        this.validationErrors.transactionType = true
        valid = false
      }
      if (this.editingTransaction.value === '') {
        this.validationErrors.value = true
        valid = false
      }
      return valid
    }
  }
}
</script>
