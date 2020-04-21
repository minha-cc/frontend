<template>
  <v-col>
    <v-card max-width="160" width="160" height="110px">
      <v-card-title>
        <span class="text-right">{{ title }}</span>
      </v-card-title>
      <v-divider />
      <v-list-item one-line>
        <v-list-item-content :class="valueClass">
          <div class="mb-4">{{ percentage | toPercentage }}</div>
          <div :class="{ small_font: percentage != null }" class="mb-4">
            {{ value | currency }}
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-col>
</template>

<script>
export default {
  filters: {
    toPercentage(value) {
      if (value !== null) {
        return `${Number(value.toFixed(1))}%`
      }
    }
  },

  props: {
    title: {
      type: String,
      default: null
    },
    valueClass: {
      type: String,
      default: 'planning'
    },
    value: {
      type: Number,
      default: 0.0
    },
    percentage: {
      type: Number,
      default: null
    }
  }
}
</script>

<style scoped>
.v-card .v-card__title {
  justify-content: flex-end;
  font-size: 0.8em;
  height: 30px;
  padding: 1px 10px 0px 10px;
  font-weight: lighter;
}
.v-list-item__content {
  font-weight: bolder;
  text-align: right;
  font-size: 20px;
}
div.small_font {
  font-size: 12px;
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
  font-size: 10px;
}
</style>
