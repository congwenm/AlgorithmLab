const { simple } = require("../helper/tools");
const expand = n => [...Array(n).keys()]

const STATUSES = {
  ACTIVE: 'active',
  IN_PROGRESS: 'in_progress',
  DONE: 'done'
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
  status: STATUSES.DONE
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

const precomputedHashMatcher = {
  status: [STATUSES.DONE, STATUSES.ACTIVE],
  first_name: ['Peter']
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

const precomputedIndexFilters = {
  or: [`status:${STATUSES.DONE}`, `status:${STATUSES.ACTIVE}`],
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
      precomputedIndexFilters.or.some(filter => item.stringIndex.includes(filter)) &&
        precomputedIndexFilters.regular.every(filter => item.stringIndex.includes(filter))
    )
  },
  // 'index filter': () => {
  //   return indexedData.filter(item => item.index[`status:${STATUSES.DONE}`])
  // },
  'index filter (pre computed)': () => {
    return indexedData.filter(item =>
      precomputedIndexFilters.or.some(filter => item.index[filter]) &&
        precomputedIndexFilters.regular.every(filter => item.index[filter])
    )
  }
})

