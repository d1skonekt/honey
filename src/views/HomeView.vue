<template>
  <div class="home">
    <div class="instruction">
      <h2 class="instruction__title">{{ $t('instruction-title') }}</h2>
      <h3 class="instruction__example">
        <span>{{ $t('instruction-example') }}</span>
        <span class="instruction__example-icon">
          <a href="/files/example.xlsx" download>
            <img src="@/assets/sheet-icon.png" />
          </a>
        </span>
      </h3>
      <ul class="instruction__points">
        <li>{{ $t('instruction-point-1') }}</li>
        <li>{{ $t('instruction-point-2') }}</li>
        <li>{{ $t('instruction-point-3') }}</li>
        <li>{{ $t('instruction-point-4') }}</li>
        <li>{{ $t('instruction-point-5') }}</li>
        <li>{{ $t('instruction-point-6') }}</li>
        <li>{{ $t('instruction-point-7') }}</li>
        <li>{{ $t('instruction-point-8') }}</li>
        <li>{{ $t('instruction-point-9') }}</li>
      </ul>
      <div class="instruction__video">
        <video controls>
          <source src="/files/example.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'HomeView',

  data() {
    return {
      load: false,
    }
  },

  components: {},

  created() {
    this.resetStore()
  },

  methods: {
    ...mapActions({
      resetStore: 'resetStore',
    }),
  },
}
</script>

<style lang="scss">
.instruction {
  &__title {
    font-size: 30px;
    margin-bottom: 30px;
  }

  &__example {
    display: flex;
    align-items: center;
  }

  &__example-icon {
    width: 30px;
    margin-left: 20px;
    cursor: pointer;

    img {
      width: 100%;
    }
  }

  &__points {
    padding-left: 15px;
    max-width: 1200px;
    text-align: start;
    line-height: 1.5rem;

    li {
      list-style-type: circle;
    }
  }

  &__video {
    margin-top: 30px;
    max-width: 800px;
  }
}
</style>
