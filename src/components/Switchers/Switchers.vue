<template>
  <div class="switchers">
    <div class="switchers__chart">
      <span class="switchers__chart__title">Chart module:</span>
      <label class="switch">
        <input type="checkbox" :checked="getChartSwitcher" @click="toggleChartSwitcher" />
        <span class="slider round"></span>
      </label>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Switchers',

  computed: {
    ...mapGetters({
      getChartSwitcher: 'getChartSwitcher',
    }),
  },

  methods: {
    ...mapActions({
      toggleChartSwitcher: 'toggleChartSwitcher',
    }),
  },
}
</script>

<style lang="scss">
@import '@/scss/colors.scss';

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $dark_1;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: $active;
}

input:focus + .slider {
  box-shadow: 0 0 1px $active;
}

input:checked + .slider:before {
  -webkit-transform: translateX(22px);
  -ms-transform: translateX(22px);
  transform: translateX(22px);
}

.slider.round {
  border-radius: 30px;
}

.slider.round:before {
  border-radius: 50%;
}

.switchers__chart {
  display: flex;
  justify-content: center;
  align-items: center;

  &__title {
    margin-right: 10px;
  }
}
</style>
