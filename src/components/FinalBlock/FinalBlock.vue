<template>
  <div class="result__wrap">
    <div class="result__header-btn">
      <button class="simple-btn result__header-btn-clc" :disabled="!checkCommodities" @click="calculateResult">
        <img src="@/assets/calculator.svg" />
        <span>Calculate</span>
      </button>
    </div>
    <div class="result__data" v-if="resultData.length">
      <h2 class="result__data-title">Final result:</h2>
      <div class="result__data-wrapp">
        <ResultDataElem
          v-for="(item, index) in resultData"
          :key="`data-elem-${index}`"
          :itemName="item"
          :itemValue="getSingleCalculatedIngredient(item)"
        />
      </div>

      <div class="result__data-btns">
        <button class="result__data-download" @click="download">
          <img class="bounce" src="@/assets/angles-down-solid.svg" />
          <span>Download</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { utils, writeFile } from 'xlsx'
import ResultDataElem from '@/components/FinalBlock/ResultDataElem.vue'
import { normalizeJSONforDownload } from '@/helpers/transformers'

export default {
  name: 'FinalBlock',
  components: {
    ResultDataElem,
  },

  data() {
    return {
      fileName: 'ingredients',
      fileExtension: {
        xlsx: 'xlsx',
      },
    }
  },

  computed: {
    ...mapGetters({
      getCalculationElements: 'getCalculationElements',
      getCalculatedIngredients: 'getCalculatedIngredients',
      getSingleCalculatedIngredient: 'getSingleCalculatedIngredient',
    }),

    checkCommodities() {
      return this.getCalculationElements.length
    },

    resultData() {
      return Object.keys(this.getCalculatedIngredients)
    },
  },

  methods: {
    ...mapActions({
      calculateResult: 'calculateResult',
      resetStore: 'resetStore',
    }),

    download() {
      const data = normalizeJSONforDownload(this.getCalculatedIngredients)
      const workSheet = utils.json_to_sheet(data)
      const workBook = utils.book_new()

      utils.book_append_sheet(workBook, workSheet, this.fileName)
      const fullFileName = `${this.fileName}.${this.fileExtension.xlsx}`
      writeFile(workBook, fullFileName)
    },
  },
}
</script>

<style lang="scss">
@import '@/scss/buttons.scss';
@import '@/scss/colors.scss';

.result {
  &__header-btn {
    margin: 15px 25px;
    display: flex;
    justify-content: center;

    &-clc {
      display: flex;
      align-items: center;

      img {
        margin-right: 10px;
      }
    }
  }

  &__data-wrapp {
    margin-bottom: 40px;
  }

  &__data-download {
    margin: 0 auto;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    border-radius: 15px;
    color: $active;
    background-color: $active_2;

    img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }
}

.bounce {
  animation: bounce 2s ease infinite;
}
@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(5px);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-15px);
  }
}
</style>
