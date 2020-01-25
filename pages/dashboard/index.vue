<template>
  <v-card outlined>
    <v-container>
      <v-row justify="center">
        <v-btn icon text color="secondary" large>
          <v-icon>mdi-arrow-left-drop-circle</v-icon>
        </v-btn>
        <v-btn rounded color="secondary" outlined large>01/2020</v-btn>
        <v-btn icon text color="secondary" large>
          <v-icon>mdi-arrow-right-drop-circle</v-icon>
        </v-btn>
      </v-row>
      <v-divider class="mt-2" />
      <v-row>
        <v-col sm="4" lg="4">
          <v-row>
            <v-col>
              <v-card max-width="140" width="140">
                <v-card-title class="income">
                  <v-icon color="white" small>mdi-trending-up</v-icon>
                  <span class="ml-1">Entradas</span>
                </v-card-title>
                <v-list-item one-line>
                  <v-list-item-content>
                    <div class="raised mb-4">R$9.000,00</div>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col>
              <v-card max-width="140" width="140">
                <v-card-title class="outcome">
                  <v-icon color="white" small>mdi-trending-down</v-icon>
                  <span class="ml-1">Saídas</span>
                </v-card-title>
                <v-list-item one-line>
                  <v-list-item-content>
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
              <v-card max-width="140" width="140">
                <v-card-title class="secondary">
                  <span class="ml-1">Essenciais</span>
                </v-card-title>
                <v-list-item one-line>
                  <v-list-item-content>
                    <div class="raised mb-4">R$9.000,00</div>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col>
              <v-card max-width="140" width="140">
                <v-card-title class="secondary">
                  <span class="ml-1">Desejos</span>
                </v-card-title>
                <v-list-item one-line>
                  <v-list-item-content>
                    <div class="raised mb-4">R$9.000,00</div>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col>
              <v-card max-width="140" width="140">
                <v-card-title class="secondary">
                  <span class="ml-1">Investimentos</span>
                </v-card-title>
                <v-list-item one-line>
                  <v-list-item-content>
                    <div class="raised mb-4">R$9.000,00</div>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider />
      <v-row>
        <v-col sm="12" lg="12">
          <v-data-table
            :headers="headers"
            :items="desserts"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Transações do mês</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template>
                    <v-btn color="primary" dark class="mb-2">
                      New Item
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.name"
                              label="Dessert name"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.calories"
                              label="Calories"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.fat"
                              label="Fat (g)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.carbs"
                              label="Carbs (g)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.protein"
                              label="Protein (g)"
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      editedItem: {
        name: 'Nome',
        calories: 'Calorias',
        fat: 'fat',
        carbs: 'carbs',
        protein: 'proteína'
      }
    }
  }
}
</script>
<style scoped>
.v-card .v-card__title {
  color: #fff;
  font-size: 0.9em;
  height: 30px;
  padding: 1px 10px 10px 10px;
  font-weight: bolder;
}
.income {
  background-color: #4caf50;
}
.outcome {
  background-color: #f44336;
}
</style>
