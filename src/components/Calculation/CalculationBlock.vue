<template>
  <div class="calc-block">
    <h2 v-if="!quantityCalculationElements">For calculating need add commodities</h2>
    <h2 v-else>Calculate ingredients</h2>
    <div class="calc-block__cards" v-if="quantityCalculationElements">
      <CalculationCard
        v-for="(item, index) in getCalculationElements"
        :key="`calc-block__card-${index}`"
        :calculationItem="item"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import CalculationCard from '@/components/Calculation/CalculationCard.vue'

export default {
  name: 'CalculationBlock',
  components: {
    CalculationCard,
  },

  computed: {
    ...mapGetters({
      getCalculationElements: 'getCalculationElements',
    }),

    quantityCalculationElements() {
      return this.getCalculationElements.length
    },
  },
}
</script>

<style lang="scss">
.calc-block {
  margin-bottom: 10px;

  h2 {
    margin-bottom: 10px;
  }

  &__cards {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}
</style>
