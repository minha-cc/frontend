<template>
  <v-card outlined>
    <v-container>
      <v-row justify="center">
        <v-btn icon text color="primary" large>
          <v-icon>mdi-arrow-left-drop-circle</v-icon>
        </v-btn>
        <v-btn rounded color="primary" outlined large>01/2020</v-btn>
        <v-btn icon text color="primary" large>
          <v-icon>mdi-arrow-right-drop-circle</v-icon>
        </v-btn>
      </v-row>
      <v-divider class="mt-2" />
      <v-row>
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
      <v-divider />
      <v-row class="font-weight-light">
        <v-col cols="12" md="12" class="ml-2">
          Transações do mês
        </v-col>
      </v-row>
      <v-scale-transition group>
        <v-row
          v-for="transaction in transactions"
          :key="transaction.id"
          class="ml-2"
        >
          <v-col cols="12" md="2">
            <v-text-field
              v-model="transaction.date"
              label="Data da transação"
              placeholder="dd/mm/aaaa"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="transaction.description"
              label="Descrição"
              placeholder="Supermercado, almoço, material escolar, salário"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="transaction.transactionType"
              :items="transactionTypes"
              :menu-props="{ top: true, offsetY: true }"
              placeholder=" "
              label="Tipo de transação"
            >
            </v-select>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              v-model="transaction.value"
              label="Valor"
              prefix="R$"
              required
            >
            </v-text-field>
          </v-col>
          <v-col class="d-flex justify-center align-center">
            <v-btn text icon x-small>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              @click="removeTransaction(transaction)"
              icon
              x-small
              class="ml-1"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-scale-transition>
      <v-row>
        <v-col>
          <v-fab-transition>
            <v-btn
              @click="createTransaction"
              fab
              color="primary"
              small
              absolute
              bottom
              right
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      date: '',
      description: '',
      transactionTypes: [
        'Açougue',
        'Alimentação',
        'Aplicação',
        'Bar/ restaurante',
        'Supermercado'
      ],
      transactions: [
        {
          id: '1',
          date: '22/01/2020',
          description: 'café da manhã',
          value: '9,40',
          transactionType: 'Alimentação'
        },
        {
          id: '2',
          date: '22/01/2020',
          description: 'supermercado',
          value: '203,51',
          transactionType: 'Supermercado'
        },
        {
          id: '3',
          date: '23/01/2020',
          description: 'supermercado',
          value: '25,40',
          transactionType: 'Supermercado'
        },
        {
          id: '4',
          date: '23/01/2020',
          description: 'supermercado',
          value: '5,30',
          transactionType: 'Supermercado'
        }
      ]
    }
  },
  methods: {
    createTransaction() {
      const transaction = {
        id: 0,
        date: 'dd/mm/aaaa',
        description: '',
        value: '0,00',
        transactionType: ''
      }

      this.transactions.push(transaction)
    },
    removeTransaction(transaction) {
      this.transactions.splice(this.transactions.indexOf(transaction), 1)
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
