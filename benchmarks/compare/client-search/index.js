const { simple } = require("../helper/tools");
const expand = n => [...Array(n).keys()]

const STATUSES = {
  ACTIVE: 'active',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
  CANCELLED: 'cancelled'
};

const sample = [{
  last_name: 'Scholler',
  first_name: 'Peter',
  status: STATUSES.ACTIVE
}, {
  last_name: 'Swanson',
  first_name: 'Joe',
  status: STATUSES.IN_PROGRESS
}, {
  last_name: 'Griffin',
  first_name: 'Peter',
  status: STATUSES.DONE
},
{
  last_name: 'Griffin',
  first_name: 'Lois',
  status: STATUSES.CANCELLED
}]
const data = expand(1000 * 10 ).flatMap(() => sample)

const indexedData = data.map(item => {
  return Object.assign(item, {
    index: {
      [`last_name:${item.last_name}`]: true,
      [`first_name:${item.first_name}`]: true,
      [`status:${item.status}`]: true
    }
  })
})

const stringIndexedData = data.map(item => {
  return Object.assign(item, {
    stringIndex: [`last_name:${item.last_name}`, `first_name:${item.first_name}`, `status:${item.status}`].join(', ')
  })
})


// NOTE: used!
const precomputedHashMatcher = {
  status: [STATUSES.DONE, STATUSES.ACTIVE],
  first_name: ['Peter']
  // first_name: ['Peter', 'Joe', 'Lois']
}

const precomputedHashFilterFn = item =>
  Object.entries(precomputedHashFilterFn).every((key, values) => {
    return values.includes(item[key])
  })

// const precomputedHashFilterFn2 = (item) => {
//   for(const key in precomputedHashMatcher) {
//     const values = precomputedHashMatcher[key];
//     if (!values.includes( item[key])) {
//       return false;
//     }
//   }
//   return true;
// }

// NOTE: used!
const precomputedIndexFilters = {
  or: [
    // groupings
    [`status:${STATUSES.DONE}`, `status:${STATUSES.ACTIVE}`]
  ],
  regular: [`first_name:Peter`]
}


/**
 * Return DONE subjects with lastname Peter,
 * TODO: precomputed always faster.
 */
simple({
  'manual filter': () => {
    return data.filter(precomputedHashFilterFn)
  },
  // 'string index filter': () => {
  //   return stringIndexedData.filter(item => item.stringIndex.includes(`status:${STATUSES.DONE}`) )
  // },
  'string index filter (pre computed)': () => {
    return stringIndexedData.filter(item =>
      precomputedIndexFilters.or.every(
        groupFilters => groupFilters.some(
          filter => item.stringIndex.includes(filter)
        )
      ) &&
        precomputedIndexFilters.regular.every(filter => item.stringIndex.includes(filter))
    )
  },
  // 'index filter': () => {
  //   return indexedData.filter(item => item.index[`status:${STATUSES.DONE}`])
  // },
  'index filter (pre computed)': () => {
    return indexedData.filter(item =>
      precomputedIndexFilters.or.every(
        groupFilters => groupFilters.some(
          filter => item.index[filter]
        )
      ) &&
        precomputedIndexFilters.regular.every(filter => item.index[filter])
    )
  }
})

// Results for --->   status = ['DONE', 'ACTIVE'] && first_name = 'PETER'
// manual filter                      x 229 ops/sec ±1.49% (80 runs sampled)
// string index filter (pre computed) x 188 ops/sec ±0.73% (82 runs sampled)
// index filter (pre computed)        x 458 ops/sec ±0.51% (85 runs sampled)
