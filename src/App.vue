<template>
  <div id="app">
    <AppHeader />
    <ErrorSnackbar />
    <nav>
      <router-link to="/">Instruction</router-link> |
      <router-link to="/manual">Calculation</router-link>
    </nav>
    <router-view />
    <div class="reset-block" v-if="getSheetData">
      <button class="warning-btn reset-block__btn" @click="resetStore">
        <img src="@/assets/spin.svg" alt="reset data" />
        <span> Reset Data </span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppHeader from '@/components/AppHeader.vue'
import ErrorSnackbar from '@/components/Snackbars/ErrorSnackbar.vue'
export default {
  name: 'App',

  components: {
    AppHeader,
    ErrorSnackbar,
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
@import '@/scss/reset.scss';
@import '@/scss/buttons.scss';
@import '@/scss/colors.scss';

#app {
  min-height: 100%;
  padding: 0 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url('@/assets/hexagonal.webp');
  background-size: cover;
  position: relative;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $dark_5;

    &.router-link-exact-active {
      color: $active;
    }
  }
}

.reset-block {
  margin: 50px 0;

  &__btn {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 auto;

    img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
