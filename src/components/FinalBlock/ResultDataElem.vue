<template>
  <div class="result__data-elem">
    <span class="result__data-elem-name">{{ itemName }} :</span>
    <span class="result__data-elem-value">{{ itemValue }}</span>
  </div>
</template>

<script>
export default {
  name: 'ResultDataElem',

  props: {
    itemName: {
      type: String,
      required: true,
    },

    itemValue: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import '@/scss/colors.scss';

.result {
  &__data-elem {
    max-width: 300px;
    margin: 10px auto;
    display: flex;
    justify-content: space-between;
  }

  &__data-elem-name {
    border-bottom: 1px solid $dark_4;
  }
}
</style>
