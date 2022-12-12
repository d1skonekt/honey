<template>
  <div class="manual">
    <Switchers />
    <div class="manual-data" v-if="getSheetData">
      <CommoditySizeBlock />
      <CalculationBlock />
      <FinalBlock />
    </div>

    <div class="manual-load" v-else>
      <h3 class="manual-load__title">Please load data with correct field</h3>
      <AppFileReader />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppFileReader from '@/components/AppFileReader.vue'
import FinalBlock from '@/components/FinalBlock/FinalBlock.vue'
import Switchers from '@/components/Switchers/Switchers.vue'
import CalculationBlock from '@/components/Calculation/CalculationBlock.vue'
import CommoditySizeBlock from '@/components/Commodities/CommoditySizeBlock.vue'

export default {
  name: 'ManualView',
  data() {
    return {}
  },

  components: {
    FinalBlock,
    Switchers,
    AppFileReader,
    CalculationBlock,
    CommoditySizeBlock,
  },

  created() {
    this.resetStore()
  },

  computed: {
    ...mapGetters({
      getSheetData: 'getSheetData',
    }),
  },

  methods: {
    ...mapActions({
      resetStore: 'resetStore',
    }),
  },
}
</script>

<style lang="scss">
.manual-load {
  margin: 20px 0;
  &__title {
    margin-bottom: 10px;
  }
}
</style>
