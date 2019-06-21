import * as Helper from 'eventa/build/utils/dateTime'

export const MINUTE = 'minute'
export const HOUR = 'hour'
export const DAY = 'day'
export const WEEK = 'week'
export const MONTH = 'month'
export const YEAR = 'year'

export const PARTITIONS_SIZES = {
  [MINUTE]: 60000,
  [HOUR]: 3600000,
  [DAY]: 86400000,
  [WEEK]: 604800000,
  [MONTH]: date => Helper.getMonthLength(date.getFullYear(), date.getMonth()),
  [YEAR]: date => {
    const year = date.getFullYear()
    let sum = 0
    for (let i = 0; i < 12; i++) {
      sum += Helper[DAY] * Helper.getMonthLength(year, i)
    }
    return sum
  }
}
