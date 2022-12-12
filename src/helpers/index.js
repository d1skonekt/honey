export * from './transformers'

/**
 * @param {CalculationElement} elem
 * @returns {string}
 */
export const createKeyForCommodities = (elem) => {
  const { size, name } = elem
  return `${size}-${name}`
}
