/**
 * @param {Commodity[]} commodities
 * @returns {NormalizedSheetData}
 */
const normalizeBySize = (commodities) => {
  const sizeTypes = commodities.map((commodity) => commodity.size)
  /** @type {string[]} */
  const uniqTypes = [...new Set(sizeTypes)]
  const result = {}

  uniqTypes.forEach((size) => {
    result[size] = {}
    commodities.forEach((commodity) => {
      if (commodity.size === size) result[size][commodity.name] = commodity
    })
  })

  return result
}

/** @param {string} str  @returns {string} */
const tlc = (str) => str.toLowerCase()

/**
 * @param {SheetData} data
 * @returns {NormalizedSheetData}
 */
export const normalizeSheetJSON = (data) => {
  const newData = structuredClone(data)

  const result = newData.map((sheetDataElem) => {
    const { name, size } = sheetDataElem
    const ingredients = {}
    delete sheetDataElem.name
    delete sheetDataElem.size

    const values = Object.values(sheetDataElem)

    values.forEach((el, index) => {
      if (isNaN(el)) ingredients[tlc(el)] = values[index + 1]
    })

    return { name: tlc(name), size: tlc(size), ingredients }
  })

  return normalizeBySize(result)
}

/**
 * @param {SimpleRecord} json
 * @returns {NormalizedJSONforDownload}
 */
export const normalizeJSONforDownload = (json) => {
  const result = []
  for (const key in json) {
    result.push({ name: key.toLowerCase(), grams: json[key], 'kilo-grams': json[key] / 1000 })
  }

  return result
}
