/**
 * @typedef SimpleRecord
 * @type {Record<string, number>}
 */

/**
 * @typedef Commodity
 * @type {object}
 * @property {string} name
 * @property {string} size
 * @property {Record<string, number>} ingredients
 */

/**
 * @typedef NormalizedSheetData
 * @type {Record<string, Record<string, Commodity>>}
 */

/**
 * @typedef ElementForDownload
 * @type {object}
 * @property {string} name
 * @property {number} value
 */

/**
 * @typedef NormalizedJSONforDownload
 * @type {ElementForDownload[]}
 */

/**
 * @typedef CalculationElement
 * @type {object}
 * @property {string} size
 * @property {string} name
 */

/**
 * @typedef ErrorMsg
 * @type {object}
 * @property {string} title
 * @property {string} description
 */

/**
 * @typedef AppState
 * @type {object}
 * @property {string[]} sizeTypes
 * @property {SimpleRecord} calculatedIngredients
 * @property {NormalizedSheetData | null} sheetData
 * @property {CalculationElement[]} calculationElements
 * @property {Map<string,Record<string,number>>} listCommodities
 * @property {boolean}chartSwitcher
 * @property {ErrorMsg | null}errorMsg
 *
 */

/**
 * @typedef FinalListComponent
 * @type {object}
 * @property {string} name
 * @property {Record<string,number>} data
 */

/**
 * @typedef {Array<CalculationElement & Record<string,any>>} SheetData
 * @type {object}
 */

/**
 * @typedef AppVuex
 * @type {object}
 * @property {import("vuex").Commit} commit
 * @property {AppState} state
 */
