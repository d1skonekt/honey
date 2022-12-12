import Vue from 'vue'
import Vuex from 'vuex'
import { createKeyForCommodities } from '@/helpers'
/**
 * @returns {AppState}
 */
const getDefaultState = () => ({
  sheetData: null,
  sizeTypes: [],
  calculatedIngredients: {},
  calculationElements: [],
  listCommodities: new Map(),
  chartSwitcher: true,
  errorMsg: null,
})

Vue.use(Vuex)

// TODO: add state save in session storage
export default new Vuex.Store({
  namespaces: true,

  state: getDefaultState(),

  getters: {
    getErrorMsg: (state) => state.errorMsg,
    getSheetData: (state) => state.sheetData,
    getSizeTypes: (state) => state.sizeTypes,
    getCalculatedIngredients: (state) => state.calculatedIngredients,
    getSingleCalculatedIngredient: (state) => (ingredient) => state.calculatedIngredients[ingredient],
    getCalculationElements: (state) => state.calculationElements,
    getSingleSizeData: (state) => (type) => state.sheetData[type],
    getSingleCommodity: (state) => (type, commodityName) => state.sheetData[type][commodityName],
    getChartSwitcher: (state) => state.chartSwitcher,
  },

  mutations: {
    /** @param {AppState} state */
    RESET_STORE(state) {
      Object.assign(state, getDefaultState())
    },

    /** @param {AppState} state  @param {CalculationElement} payload   */
    ADD_CALCULATION_DATA_ELEM(state, payload) {
      state.calculationElements.push(payload)
    },
    /** @param {AppState} state  @param {CalculationElement} payload   */
    REMOVE_CALCULATION_DATA_ELEM(state, payload) {
      const { name, size } = payload
      state.calculationElements = state.calculationElements.filter((el) => el.name !== name || el.size !== size)
    },

    /** @param {AppState} state @param {FinalListComponent} payload */
    ADD_LIST_COMPONENT(state, payload) {
      const { name, data } = payload
      state.listCommodities.set(name, data)
    },
    /** @param {AppState} state @param {string} payload */
    REMOVE_LIST_COMPONENT(state, payload) {
      state.listCommodities.delete(payload)
    },

    /** @param {AppState} state @param {string[]} payload */
    ADD_SIZE_TYPES(state, payload) {
      state.sizeTypes = payload
    },

    ADD_INGREDIENTS(state, payload) {
      state.calculatedIngredients = { ...state.calculatedIngredients, ...payload }
    },

    CLEAR_CALCULATED_INGREDIENTS(state) {
      state.calculatedIngredients = {}
    },

    TOGGLE_CHART_SWITCHER(state) {
      state.chartSwitcher = !state.chartSwitcher
    },

    /** @param {AppState} state @param {ErrorMsg | null} payload */
    SET_ERROR_MSG(state, payload) {
      state.errorMsg = payload
    },
  },

  actions: {
    resetStore({ commit }) {
      commit('RESET_STORE')
    },

    /** @param {AppVuex} param0  @param {NormalizedSheetData} payload  */
    setSheetData({ commit, state }, payload) {
      state.sheetData = payload

      const sizeTypes = Object.keys(payload)

      commit('ADD_SIZE_TYPES', [...sizeTypes])
    },

    /**@param {AppVuex} param0  @param {CalculationElement} payload */
    changeCalculationData({ commit, state }, payload) {
      const elem = state.calculationElements.find((el) => el.name === payload.name && el.size === payload.size)
      if (!elem) commit('ADD_CALCULATION_DATA_ELEM', payload)
    },
    /** @param {AppVuex} param0 @param {FinalListComponent} payload */
    changeFinalListCommodities({ commit }, payload) {
      commit('ADD_LIST_COMPONENT', payload)
    },

    calculateResult({ commit, getters, state }) {
      commit('CLEAR_CALCULATED_INGREDIENTS')

      /** @type {SimpleRecord[]} */
      const commodities = [...state.listCommodities.values()]

      commodities.forEach((commodity) => {
        const result = {}
        const ingredients = Object.keys(commodity)

        ingredients.forEach((ingredient) => {
          let ingredientValue = getters['getSingleCalculatedIngredient'](ingredient)
          if (!ingredientValue) ingredientValue = commodity[ingredient]
          else ingredientValue += commodity[ingredient]

          result[ingredient] = ingredientValue
        })

        commit('ADD_INGREDIENTS', result)
      })
    },

    /**@param {AppVuex} param0  @param {CalculationElement} payload */
    removeCommodityFromCalculations({ commit }, payload) {
      commit('REMOVE_CALCULATION_DATA_ELEM', payload)
      commit('REMOVE_LIST_COMPONENT', createKeyForCommodities(payload))
    },

    toggleChartSwitcher({ commit }) {
      commit('TOGGLE_CHART_SWITCHER')
    },

    /**@param {AppVuex} param0  @param {ErrorMsg | null} payload */
    changeErrorMsg({ commit }, payload) {
      commit('SET_ERROR_MSG', payload)
    },
  },
  modules: {},
})
