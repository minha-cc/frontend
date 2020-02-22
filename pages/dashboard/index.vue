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
            <v-col>
              <v-card max-width="160" width="160">
                <v-card-title>
                  <span class="text-right">Entradas</span>
                </v-card-title>
                <v-divider />
                <v-list-item one-line>
                  <v-list-item-content class="income">
                    <div class="raised mb-4">R$9.000,00</div>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col>
              <v-card max-width="160" width="160">
                <v-card-title class="outcome">
                  Saídas
                </v-card-title>
                <v-divider />
                <v-list-item one-line>
                  <v-list-item-content class="outcome">
                    <div class="raised mb-4">R$9.000,00</div>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-spacer />
        <v-col sm="6" lg="6">
          <v-row>
            <v-col>
              <v-card max-width="160" width="160">
                <v-card-title>
                  <span class="text-right">Essenciais (50%)</span>
                </v-card-title>
                <v-divider />
                <v-list-item one-line>
                  <v-list-item-content class="planning">
                    <div class="raised mb-4">R$9.000,00</div>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col>
              <v-card max-width="160" width="160">
                <v-card-title>
                  <span class="text-right">Desejos (30%)</span>
                </v-card-title>
                <v-divider />
                <v-list-item one-line>
                  <v-list-item-content class="planning">
                    <div class="raised mb-4">R$9.000,00</div>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col>
              <v-card max-width="160" width="160">
                <v-card-title>
                  <span class="text-right">Investimentos (20%)</span>
                </v-card-title>
                <v-divider />
                <v-list-item one-line>
                  <v-list-item-content class="planning">
                    <div class="raised mb-4">R$9.000,00</div>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
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
                :menu-props="{ top: true, offsetY: true }"
                :error="validationErrors.transactionType"
                name="type"
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
              small
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
  </v-container>
</template>

<script>
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
      transactionTypes: [
        'Açougue',
        'Alimentação',
        'Aplicação',
        'Bar/ restaurante',
        'Supermercado'
      ],
      selectedTransaction: null,
      dateMask: '##/##/####',
      transactions: [
        {
          id: '1',
          date: '22/01/2020',
          description: 'café da manhã',
          value: '9,40',
          transactionType: 'Alimentação',
          actions: {
            disabled: true,
            saveBtnDisabled: true,
            editBtnDisabled: false,
            deleteBtnDisabled: false
          }
        },
        {
          id: '2',
          date: '22/01/2020',
          description: 'supermercado',
          value: '203,51',
          transactionType: 'Supermercado',
          actions: {
            disabled: true,
            saveBtnDisabled: true,
            editBtnDisabled: false,
            deleteBtnDisabled: false
          }
        },
        {
          id: '3',
          date: '23/01/2020',
          description: 'supermercado',
          value: '25,40',
          transactionType: 'Supermercado',
          actions: {
            disabled: true,
            saveBtnDisabled: true,
            editBtnDisabled: false,
            deleteBtnDisabled: false
          }
        },
        {
          id: '4',
          date: '23/01/2020',
          description: 'supermercado',
          value: '5,30',
          transactionType: 'Supermercado',
          actions: {
            disabled: true,
            saveBtnDisabled: true,
            editBtnDisabled: false,
            deleteBtnDisabled: false
          }
        }
      ]
    }
  },
  methods: {
    createTransaction() {
      const transaction = {
        id: this.generateUUID(),
        date: '',
        description: '',
        value: '',
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
      this.selectedTransaction = transaction
      this.transactions.unshift(transaction)
    },
    saveTransaction(editedTransaction) {
      this.selectedTransaction = editedTransaction
      if (!this.validate()) return

      editedTransaction.actions = {
        disabled: true,
        saveBtnDisabled: true,
        editBtnDisabled: false,
        deleteBtnDisabled: false
      }
      this.transactions.map((transaction) =>
        transaction.id === editedTransaction.id
          ? { ...this.transactions, ...editedTransaction }
          : transaction
      )
      this.editing = false
    },
    editTransaction(transactionToEdit) {
      this.editing = true
      this.selectedTransaction = Object.assign({}, transactionToEdit)
      this.selectedTransaction.newTransaction = false
      transactionToEdit.actions = {
        disabled: false,
        saveBtnDisabled: false,
        editBtnDisabled: true,
        deleteBtnDisabled: true
      }
    },
    removeTransaction(transaction) {
      this.transactions.splice(this.transactions.indexOf(transaction), 1)
      this.editing = false
    },
    cancelTransaction(transactionToCancel) {
      if (transactionToCancel.newTransaction) {
        this.transactions.splice(
          this.transactions.indexOf(transactionToCancel),
          1
        )
      } else {
        this.selectedTransaction.actions = {
          disabled: true,
          saveBtnDisabled: true,
          editBtnDisabled: false,
          deleteBtnDisabled: false
        }
        this.transactions = this.transactions.map((transaction) =>
          transaction.id === this.selectedTransaction.id
            ? this.selectedTransaction
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
      if (this.selectedTransaction.date === '') {
        this.validationErrors.date = true
        valid = false
      }
      if (this.selectedTransaction.description === '') {
        this.validationErrors.description = true
        valid = false
      }
      if (this.selectedTransaction.transactionType === '') {
        this.validationErrors.transactionType = true
        valid = false
      }
      if (this.selectedTransaction.value === '') {
        this.validationErrors.value = true
        valid = false
      }
      return valid
    }
  }
}
</script>
<style scoped>
.v-card .v-card__title {
  justify-content: flex-end;
  font-size: 0.9em;
  height: 30px;
  padding: 1px 10px 10px 10px;
  font-weight: lighter;
}
.v-list-item__content {
  font-weight: bolder;
  text-align: right;
}
.v-list-item__content.income {
  color: #4caf50;
}
.v-list-item__content.outcome {
  color: #f44336;
}
.v-list-item__content.planning {
  color: var(--v-primary-base);
}
.v-input {
  font-size: 12px;
}
</style>
