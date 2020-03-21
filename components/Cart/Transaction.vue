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
              item-value="description"
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
import { mapActions } from 'vuex'
import { generateUUID } from '@/plugins/uuid'
import * as Cart from '@/services/firestore/cart.js'

export default {
  props: {
    transactions: {
      type: Array,
      default: null
    },
    transactionTypes: {
      type: Array,
      default: null
    },
    currentUser: {
      type: Object,
      default: null
    },
    referencePeriod: {
      type: String,
      default: null
    }
  },

  data() {
    return {
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
  methods: {
    ...mapActions({
      updateCart: 'cart/updateCart'
    }),
    createTransaction() {
      const transaction = {
        id: generateUUID(),
        date: '',
        description: '',
        value: null,
        transactionType: '',
        newTransaction: true,
        disableFields: false
      }
      this.editingTransaction = transaction
      this.transactions.unshift(transaction)
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

    async saveTransaction(selectedTransactionToSave) {
      this.editingTransaction = selectedTransactionToSave
      if (!this.validate()) return

      try {
        await Cart.save(
          this.currentUser.uid,
          this.referencePeriod,
          selectedTransactionToSave
        )

        this.transactions.map((transaction) =>
          transaction.id === this.editingTransaction.id
            ? { ...this.transactions, ...this.editingTransaction }
            : transaction
        )
        this.updateCart({
          income: this.income + this.editingTransaction.value,
          outcome: 0,
          essential_expenses: 0,
          personal_wishes: 0,
          savings: 0
        })
      } catch (error) {
        this.$emit('onError', 'Ocorreu um erro ao criar a transação')
      }
    },
    editTransaction(selectedTransactiontoEdit) {
      this.editingTransaction = Object.assign({}, selectedTransactiontoEdit)
      this.editingTransaction.newTransaction = false
      selectedTransactiontoEdit.disableFields = false
      this.actions = {
        disableNew: true,
        showSaveGroup: true,
        disableSaveGroup: false
      }
    },
    removeTransaction(selectedTransationToRemove) {
      this.transactions.splice(
        this.transactions.indexOf(selectedTransationToRemove),
        1
      )
    },
    cancelTransaction(selectedTransactionToCancel) {
      selectedTransactionToCancel.disableFields = true
      this.actions = {
        disableNew: false,
        showSaveGroup: false,
        disableSaveGroup: false
      }
      if (selectedTransactionToCancel.newTransaction) {
        this.transactions.splice(
          this.transactions.indexOf(selectedTransactionToCancel),
          1
        )
      } else {
        this.transactions = this.transactions.map((transaction) =>
          transaction.id === selectedTransactionToCancel.id
            ? selectedTransactionToCancel
            : transaction
        )
      }
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
