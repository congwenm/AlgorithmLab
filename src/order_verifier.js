import surgeonkit from 'surgeonkit'
import _ from 'lodash' 

const greaterThanOrEqualTo = (unit1, unit2) => unit2 >= unit1

const lessThanOrEqualTo = (unit1, unit2) => unit2 <= unit1

export const ascendingVerifier = (arr) => {
  return surgeonkit.every(2)(arr, greaterThanOrEqualTo).every(t => t)
}

export const descendingVerifier = (arr) => {
  return surgeonkit.every(2)(arr, lessThanOrEqualTo).every(t => t)
}