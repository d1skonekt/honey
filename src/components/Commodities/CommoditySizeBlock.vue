<template>
  <div class="size-block">
    <div class="size-block__elem" v-for="(sizeType, index) in getSizeTypes" :key="`size-block__elem-${index}`">
      <div class="size-block__elem-name">{{ sizeType }}</div>
      <div class="size-block__elem-commodities">
        <CommodityElement
          class="size-block__elem-component"
          v-for="(singleCommodity, index) in getAllCommoditiesByType(sizeType)"
          :key="`formula-elem-${index}`"
          :positionSizeGroup="sizeType"
          :commodity="singleCommodity"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import CommodityElement from '@/components/Commodities/CommodityElement.vue'

export default {
  name: 'CommoditySizeBlock',
  components: { CommodityElement },

  computed: {
    ...mapGetters({
      getSizeTypes: 'getSizeTypes',
      getSingleSizeData: 'getSingleSizeData',
    }),
  },

  methods: {
    getAllCommoditiesByType(type) {
      return this.getSingleSizeData(type)
    },
  },
}
</script>

<style lang="scss">
@import '@/scss/colors.scss';

.size-block {
  width: 100%;
  max-width: 2000px;
  margin: auto;

  &__elem {
    width: 100%;
    margin: 15px 0;
    display: flex;
    justify-content: space-between;

    &-name {
      width: 10%;
      max-width: 100px;
      margin-right: 20px;
      padding: 10px;
      text-align: start;
      text-transform: capitalize;
      position: relative;
      display: flex;
      align-items: center;

      &::before {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 120px;
        height: 2px;
        background: linear-gradient(
          90deg,
          rgba(67, 101, 90, 1) 0%,
          rgba(93, 125, 125, 1) 35%,
          rgba(229, 229, 229, 1) 100%
        );
        clip-path: polygon(100% 0, 0 0, 0 100%);
      }
    }

    &-commodities {
      flex: 1 1 auto;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
  }
}
</style>
