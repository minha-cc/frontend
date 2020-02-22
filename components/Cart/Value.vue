<template>
  <v-col>
    <v-card max-width="160" width="160">
      <v-card-title>
        <span class="text-right">{{ title }}</span>
      </v-card-title>
      <v-divider />
      <v-list-item one-line>
        <v-list-item-content :class="cartClass">
          <div class="raised mb-4">{{ value | currency }}</div>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    cartClass: {
      type: String,
      default: 'planning'
    },
    value: {
      type: Number,
      default: 0.0
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
