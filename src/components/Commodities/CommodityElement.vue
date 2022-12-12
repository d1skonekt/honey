<template>
  <div class="commodity-elem">
    <button @click="changeCalculationData({ size: positionSizeGroup, name: commodity.name })">
      <span>
        <img class="commodity-elem__icon" src="@/assets/honey.svg" alt="">
      </span>
      <span>{{ commodity.name }}</span>
      
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CommodityElement',
  props: {
    commodity: {
      type: Object,
      required: true,
    },
    positionSizeGroup: {
      type: String,
      required: true,
    },
  },

  methods: {
    ...mapActions({
      changeCalculationData: 'changeCalculationData',
    }),
  },
}
</script>

<style lang="scss">
@import '@/scss/colors.scss';

.commodity-elem {
  display: flex;
  padding: 5px 10px;
  border-bottom: 1px solid $dark_4;
  border-right: 1px solid $dark_4;
  border-bottom-right-radius: 15px;

  button {
    text-transform: capitalize;
  }

  &__icon {
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }
}
</style>
