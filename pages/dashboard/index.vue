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
            <Cart :value="income" title="Entradas" value-class="income" />
            <Cart :value="outcome" title="Saídas" value-class="outcome" />
          </v-row>
        </v-col>
        <v-spacer />
        <v-col sm="6" lg="6">
          <v-row>
            <Cart
              :value="essential_expenses"
              title="Essenciais (50%)"
              value-class="planning"
            />
            <Cart
              :value="personal_whises"
              title="Desejos (30%)"
              value-class="planning"
            />
            <Cart
              :value="savings"
              title="Investimentos (20%)"
              value-class="planning"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <Transactions />
  </v-container>
</template>

<script>
import { uuid } from '@/plugins/uuid'
export default {
  components: {
    Cart,
    Transactions
  },
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
      transactionTypes: [
        'Açougue',
        'Alimentação',
        'Aplicação',
        'Bar/ restaurante',
        'Supermercado'
      ],
      editingTransaction: null,
      dateMask: '##/##/####',
      transactions: []
    }
  },
  methods: {
    ...mapActions({
      updateCart: 'cart/updateCart'
    }),
    createTransaction() {
      const transaction = {
        id: uuid(),
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
