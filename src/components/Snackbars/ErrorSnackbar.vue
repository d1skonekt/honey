<template>
  <div class="error-snackbar" v-if="getErrorMsg">
    <div class="error-snackbar__close" @click="closeError">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path
          fill="#ffffff"
          d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
        />
      </svg>
    </div>
    <h3 class="error-snackbar__title">{{ getErrorMsg.title }}</h3>
    <h4 class="error-snackbar__description">{{ getErrorMsg.description }}</h4>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ErrorSnackbar',

  computed: {
    ...mapGetters({
      getErrorMsg: 'getErrorMsg',
    }),
  },

  methods: {
    ...mapActions({
      changeErrorMsg: 'changeErrorMsg',
    }),

    closeError() {
      this.changeErrorMsg(null)
    },
  },
}
</script>

<style lang="scss">
@import '@/scss/colors.scss';

.error-snackbar {
  position: absolute;
  bottom: 40px;
  right: 40px;
  width: 300px;
  padding: 15px 25px;
  text-align: start;
  color: white;
  background-color: $warning;

  &__close {
    width: 10px;
    height: 10px;
    cursor: pointer;

    position: absolute;
    right: 7px;
    top: 7px;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 5px;
  }

  h4 {
    font-size: 1rem;
    line-height: 1.1rem;
  }
}
</style>
