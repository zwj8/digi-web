const files = require.context('./global', false, /\.js$/)
const modules = []

files.keys().forEach(key => {
  // modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
  modules.push(...files(key).default)
})

export default modules
