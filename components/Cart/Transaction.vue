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
              :disabled="transaction.actions.disabled"
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
              :disabled="transaction.actions.disabled"
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
              :disabled="transaction.actions.disabled"
              :items="transactionTypes"
              :item-value="transactionTypes.description"
              :item-text="transactionTypes.description"
              :menu-props="{ top: true, offsetY: true }"
              :error="validationErrors.transactionType"
              placeholder=" "
              label="Tipo de transação"
              required
            >
            </v-select>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              v-model="transaction.value"
              :disabled="transaction.actions.disabled"
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
            <template v-if="editing">
              <v-btn
                @click="saveTransaction(transaction)"
                :disabled="transaction.actions.saveBtnDisabled"
                icon
                x-small
                class="ml-1"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>

              <v-btn
                @click="cancelTransaction(transaction)"
                :disabled="transaction.actions.saveBtnDisabled"
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
                :disabled="transaction.actions.editBtnDisabled"
                icon
                x-small
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                @click="removeTransaction(transaction)"
                :disabled="transaction.actions.deleteBtnDisabled"
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
            :disabled="editing"
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
import { db } from '@/plugins/firebase'

export default {
  data() {
    return {
      canAdd: true,
      editing: false,
      validationErrors: {
        date: false,
        description: false,
        transactionType: false,
        value: false
      },
      transactionTypes: [{ description: '1' }, { description: '2' }],
      editingTransaction: null,
      dateMask: '##/##/####',
      transactions: []
    }
  },
  async mounted() {
    const transactionTypesRef = db.collection('transactionTypes')
    const transactionTypesSnapshot = await transactionTypesRef.get()
    transactionTypesSnapshot.forEach((doc) =>
      this.transactionTypes.push(doc.data())
    )
    console.log(this.transactionTypes)
  },
  methods: {
    ...mapActions({
      updateCart: 'cart/updateCart'
    }),
    createTransaction() {
      const transaction = {
        id: this.generateUUID(),
        date: '',
        description: '',
        value: 0,
        transactionType: '',
        newTransaction: true,
        actions: {
          disabled: false,
          saveBtnDisabled: false,
          editBtnDisabled: true,
          deleteBtnDisabled: true
        }
      }
      this.editing = true
      this.editingTransaction = transaction
      this.transactions.unshift(transaction)
      this.validationErrors = {
        date: false,
        description: false,
        transactionType: false,
        value: false
      }
    },
    saveTransaction(selectedTransactionToSave) {
      this.editingTransaction = selectedTransactionToSave
      if (!this.validate()) return

      selectedTransactionToSave.actions = {
        disabled: true,
        saveBtnDisabled: true,
        editBtnDisabled: false,
        deleteBtnDisabled: false
      }
      this.transactions.map((transaction) =>
        transaction.id === this.editingTransaction.id
          ? { ...this.transactions, ...this.editingTransaction }
          : transaction
      )
      this.editing = false
      this.updateCart({
        income: this.income + this.editingTransaction.value,
        outcome: 0,
        essential_expenses: 0,
        personal_wishes: 0,
        savings: 0
      })
    },
    editTransaction(selectedTransactiontoEdit) {
      this.editing = true
      this.editingTransaction = Object.assign({}, selectedTransactiontoEdit)
      this.editingTransaction.newTransaction = false
      selectedTransactiontoEdit.actions = {
        disabled: false,
        saveBtnDisabled: false,
        editBtnDisabled: true,
        deleteBtnDisabled: true
      }
    },
    removeTransaction(selectedTransationToRemove) {
      this.transactions.splice(
        this.transactions.indexOf(selectedTransationToRemove),
        1
      )
      this.editing = false
    },
    cancelTransaction(selectedTransactionToCancel) {
      if (selectedTransactionToCancel.newTransaction) {
        this.transactions.splice(
          this.transactions.indexOf(selectedTransactionToCancel),
          1
        )
      } else {
        this.selectedTransactionToCancel.actions = {
          disabled: true,
          saveBtnDisabled: true,
          editBtnDisabled: false,
          deleteBtnDisabled: false
        }
        this.transactions = this.transactions.map((transaction) =>
          transaction.id === this.selectedTransactionToCancel.id
            ? this.selectedTransactionToCancel
            : transaction
        )
      }
      this.editing = false
    },
    generateUUID() {
      let d = new Date().getTime()
      if (
        typeof performance !== 'undefined' &&
        typeof performance.now === 'function'
      ) {
        d += performance.now()
      }
      const newGuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function(c) {
          const r = (d + Math.random() * 16) % 16 | 0
          d = Math.floor(d / 16)
          return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
        }
      )
      return newGuid
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
