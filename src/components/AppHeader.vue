<template>
  <header class="app-header">
    <div class="logo">
      <img src="@/assets/logo.png" />
    </div>
    <div class="locales">
      <div class="flag locales__ua" @click="setLocale('ua')">
        <img src="@/assets/Ukraine-flag.svg" />
      </div>
      <div class="flag locales__en" @click="setLocale('en')">
        <img src="@/assets/USA-flag.svg" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',

  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale
    },
  },
}
</script>

<style lang="scss">
.app-header {
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
}

.logo {
  width: 200px;
  display: flex;

  img {
    width: 100%;
    height: auto;
  }
}

.flag {
  cursor: pointer;
  img {
    width: 40px;
    height: 30px;
  }
}
</style>
