const { simple } = require("./helper/tools");
let var1 = null
simple({
  'If': () => {
    if(true) {
      var1 = 1
    }
  },

  'No If': () => {
    var1 = 2
  },
})

// No difference