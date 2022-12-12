<template>
  <div class="calc-card">
    <div class="calc-card__remove" @click="remove" title="Remove product">
      <img alt="trash icon" src="@/assets/trash-solid.svg" />
    </div>
    <h5 class="calc-card__info">
      <span class="calc-card__info-name"> {{ calculationItem.name }}</span>
      <span class="calc-card__info-size"> {{ calculationItem.size }} size</span>
    </h5>

    <div class="calc-card__graph" v-if="getChartSwitcher">
      <canvas class="calc-card__graph-wrapper" ref="chart"></canvas>
    </div>
    <ul class="calc-card__ingredients" v-else>
      <li class="calc-card__ingredient" v-for="(ingredient, index) in getFormulaItemsName" :key="`ingredient-${index}`">
        <span>{{ ingredient }} :</span>
        <span>{{ getIngredients[ingredient] }}</span>
      </li>
    </ul>

    <div class="calc-card__counter counter">
      <span class="counter__decrement" :class="{ disable: disableDecrement }" @click="changeCount(-1)">&minus;</span>
      <input class="counter__input" type="number" min="1" step="1" v-model.lazy="count" @change="handleChange" />
      <span class="counter__increment" @click="changeCount(1)">+</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { Chart } from 'chart.js/auto'
import { createKeyForCommodities } from '@/helpers'
import { GET_CONFIG } from '@/constants/chart'

export default {
  name: 'CalculationCard',

  data() {
    return {
      count: 1,
    }
  },

  props: {
    calculationItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters({
      getSingleCommodity: 'getSingleCommodity',
      getChartSwitcher: 'getChartSwitcher',
    }),
    getIngredients() {
      return this.getSingleCommodity(this.calculationItem.size, this.calculationItem.name).ingredients
    },
    getFormulaItemsName() {
      return Object.keys(this.getIngredients)
    },

    disableDecrement() {
      return this.count === 1 ? true : false
    },
  },

  methods: {
    ...mapActions({
      changeFinalListCommodities: 'changeFinalListCommodities',
      removeCommodity: 'removeCommodityFromCalculations',
    }),

    handleChange(event) {
      const { value } = event.target
      if (!this.count && isNaN(value)) this.count = 1
      this.count = Math.floor(value)
    },

    changeCount(val) {
      this.count += val
      if (this.count < 1) this.count = 1
    },

    remove() {
      this.removeCommodity(this.calculationItem)
    },

    createChart() {
      const labels = Object.keys(this.getIngredients)
      const chartData = Object.values(this.getIngredients)

      new Chart(this.$refs.chart, GET_CONFIG(chartData, labels))
    },
  },

  watch: {
    count: {
      handler(newVal) {
        /** @type {FinalListComponent} payload */
        const payload = { name: createKeyForCommodities(this.calculationItem), data: {} }
        this.getFormulaItemsName.forEach((el) => {
          payload.data[el] = this.getIngredients[el] * newVal
        })

        this.changeFinalListCommodities(payload)
      },

      immediate: true,
    },
    getChartSwitcher: {
      handler(newVal) {
        this.$nextTick(() => {
          if (this.getChartSwitcher) {
            this.createChart()
          }
        })
      },

      immediate: true,
    },
  },
}
</script>

<style lang="scss">
@import '@/scss/colors.scss';

.calc-card {
  position: relative;
  min-width: 250px;
  padding: 20px;
  margin: 10px 0;
  color: white;
  border-radius: 15px;
  box-shadow: 7px 7px 3px 0px rgba(0, 0, 0, 0.15);
  background-color: $dark_2;
  background-image: url('@/assets/hexagon.svg');
  background-repeat: no-repeat;
  background-size: 40%;
  background-position: bottom 10px left 10px;

  &__info {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    text-align: start;
    max-width: 80%;

    &-name {
      text-transform: capitalize;
      border-bottom: 1px solid $dark_1;
      padding-bottom: 5px;
      margin-bottom: 5px;
    }
  }

  &__ingredient {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;

    span {
      &:nth-child(1) {
        margin-right: 40px;
        text-transform: capitalize;
      }
    }
  }

  &__graph-wrapper {
    width: 300px;
    height: 300px;
  }

  &__remove {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 15px;
    height: 17px;
    cursor: pointer;
  }
}

.counter {
  margin-top: 40px;
  display: flex;
  justify-content: center;

  &__input {
    height: 30px;
    width: 50px;
    background-color: $bg;
    padding: 0 5px;
  }

  &__increment,
  &__decrement {
    color: black;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    background-color: $dark_1;
    cursor: pointer;
  }

  &__increment {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  &__decrement {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;

    &.disable {
      cursor: default;
      pointer-events: none;
      opacity: 0.5;
    }
  }
}
</style>
